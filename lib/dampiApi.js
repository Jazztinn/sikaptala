"use client";

import { CHAT_SYSTEM_PROMPT } from "@/constants/dampiAi.js";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const API_PROXY = (
  process.env.NEXT_PUBLIC_AI_PROXY_URL ||
  process.env.NEXT_PUBLIC_VITE_AI_PROXY_URL ||
  ""
).replace(/\/$/, "");

function normalizeMode(mode) {
  return mode === "fast" || mode === "auto" ? mode : "default";
}

function normalizeSystemPrompt(systemPrompt) {
  if (typeof systemPrompt !== "string") {
    return CHAT_SYSTEM_PROMPT;
  }

  const trimmed = systemPrompt.trim();
  return trimmed || CHAT_SYSTEM_PROMPT;
}

function normalizeAttachments(attachments = []) {
  return attachments.flatMap((attachment) => {
    if (
      !attachment ||
      typeof attachment.mime !== "string" ||
      typeof attachment.data !== "string"
    ) {
      return [];
    }

    return [
      {
        name: attachment.name,
        mime: attachment.mime,
        data: attachment.data
      }
    ];
  });
}

function normalizeMessages(messages = []) {
  return messages.flatMap((message) => {
    if (!message || (message.role !== "assistant" && message.role !== "user")) {
      return [];
    }

    return [
      {
        role: message.role,
        text: typeof message.text === "string" ? message.text : "",
        attachments: normalizeAttachments(message.attachments)
      }
    ];
  });
}

function createFallbackText(userMessage = "") {
  const message = String(userMessage || "").trim();

  if (!message) {
    return "Kumusta. I can help with child health questions, visit planning, and symptom notes.";
  }

  if (/\b(fever|lagnat|ubo|cough|rash|suka|vomit|diarrhea|pain)\b/i.test(message)) {
    return "I can help you organize the symptom details. Tell me the child's age, when it started, the severity, and any red flags like breathing trouble, dehydration, or unusual sleepiness.";
  }

  return "I’m ready to help. If the AI backend is not configured yet, I’ll still keep the chat flow working while you finish setup.";
}

async function invokeSupabaseAi(payload) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.functions.invoke("ai-chat", {
    body: payload
  });

  if (error) {
    throw new Error(error.message || "Supabase ai-chat function failed.");
  }

  return data;
}

async function callChatApi(payload) {
  if (API_PROXY) {
    const response = await fetch(`${API_PROXY}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  return invokeSupabaseAi(payload);
}

async function streamChatApi(payload, onEvent, signal) {
  if (API_PROXY) {
    const response = await fetch(`${API_PROXY}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Streaming is not supported by this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let finalData = null;

    const emitLines = (text) => {
      buffer += text;
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || "";

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return;
        }

        const event = JSON.parse(trimmed);

        if (event.type === "text") {
          onEvent?.(event);
        } else if (event.type === "done") {
          finalData = event.data;
        } else if (event.type === "error") {
          throw new Error(event.error || "Chat request failed");
        }
      });
    };

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      emitLines(decoder.decode(value, { stream: true }));
    }

    emitLines(decoder.decode());

    if (buffer.trim()) {
      emitLines("\n");
    }

    if (!finalData) {
      throw new Error("Stream ended without a final response.");
    }

    return finalData;
  }

  const data = await invokeSupabaseAi(payload);
  if (typeof data?.text === "string" && data.text) {
    onEvent?.({ type: "text", text: data.text });
  }
  return data;
}

export async function callDampiChat(messages, userMessage, config = {}) {
  const payload = {
    messages: normalizeMessages(messages),
    userMessage: typeof userMessage === "string" ? userMessage : "",
    attachments: normalizeAttachments(config.attachments),
    mode: normalizeMode(config.mode),
    purpose: config.purpose === "title" ? "title" : "chat",
    systemPrompt:
      config.purpose === "title" ? "" : normalizeSystemPrompt(config.systemPrompt)
  };

  try {
    const data = await callChatApi(payload);
    return config.purpose === "title" ? data.text : data;
  } catch {
    const text = createFallbackText(userMessage);
    return config.purpose === "title" ? "New Chat" : { text };
  }
}

export async function transcribeDampiAudio(attachment) {
  const payload = {
    messages: [],
    userMessage:
      "Transcribe this audio exactly. Return only the spoken words. If there is no clear speech, return an empty string.",
    attachments: normalizeAttachments([attachment]),
    mode: "fast",
    purpose: "transcription",
    systemPrompt: ""
  };

  try {
    const data = await callChatApi(payload);
    return typeof data?.text === "string" ? data.text.trim() : "";
  } catch {
    return "";
  }
}

export async function streamDampiChat(messages, userMessage, config = {}) {
  const payload = {
    messages: normalizeMessages(messages),
    userMessage: typeof userMessage === "string" ? userMessage : "",
    attachments: normalizeAttachments(config.attachments),
    mode: normalizeMode(config.mode),
    purpose: "chat",
    systemPrompt: normalizeSystemPrompt(config.systemPrompt)
  };

  try {
    return await streamChatApi(payload, config.onEvent, config.signal);
  } catch {
    const text = createFallbackText(userMessage);
    onFallbackStream(text, config.onEvent);
    return { text };
  }
}

function onFallbackStream(text, onEvent) {
  const tokens = String(text).split(" ");
  tokens.forEach((token, index) => {
    window.setTimeout(() => {
      onEvent?.({
        type: "text",
        text: `${index === 0 ? "" : " "}${token}`
      });
    }, index * 35);
  });
}
