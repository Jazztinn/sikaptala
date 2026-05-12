import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const AI_API_KEY = Deno.env.get('AI_API_KEY') ?? Deno.env.get('GEMINI_API_KEY') ?? Deno.env.get('GOOGLE_API_KEY') ?? ''
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

const AVAILABLE_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-flash-latest',
  'gemini-1.5-pro',
  'gemini-pro-latest',
]

const FAST_MODELS = AVAILABLE_MODELS.slice(0, 3)
const FULL_MODELS = ['gemini-1.5-pro', 'gemini-pro-latest', 'gemini-1.5-flash', 'gemini-2.0-flash']
const VALID_MODES = new Set(['fast', 'auto', 'default'])
const VALID_PURPOSES = new Set(['chat', 'title', 'transcription'])

const STRUCTURED_CHAT_SCHEMA = {
  type: 'OBJECT',
  properties: {
    message: { type: 'STRING' },
    taskActions: {
      type: 'OBJECT',
      properties: {
        createTasks: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              title: { type: 'STRING' },
              isCompleted: { type: 'BOOLEAN' },
              description: { type: 'STRING' },
            },
          },
        },
        askQuestions: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              question: { type: 'STRING' },
              options: { type: 'ARRAY', items: { type: 'STRING' } },
            },
          },
        },
      },
    },
  },
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

function normalizeMode(mode: unknown) {
  return VALID_MODES.has(String(mode)) ? String(mode) : 'default'
}

function normalizePurpose(purpose: unknown) {
  return VALID_PURPOSES.has(String(purpose)) ? String(purpose) : 'chat'
}

function normalizeSystemPrompt(systemPrompt: unknown) {
  return typeof systemPrompt === 'string' ? systemPrompt.trim() : ''
}

function normalizeAttachments(attachments: unknown) {
  return Array.isArray(attachments)
    ? attachments.flatMap((attachment) => {
        if (!attachment || typeof attachment !== 'object') return []
        const value = attachment as Record<string, unknown>
        if (typeof value.mime !== 'string' || typeof value.data !== 'string') return []

        return [{
          name: typeof value.name === 'string' ? value.name : '',
          mime: value.mime,
          data: value.data,
        }]
      })
    : []
}

function normalizeMessages(messages: unknown) {
  return Array.isArray(messages)
    ? messages.flatMap((message) => {
        if (!message || typeof message !== 'object') return []
        const value = message as Record<string, unknown>
        if (value.role !== 'assistant' && value.role !== 'user') return []

        return [{
          role: value.role,
          text: typeof value.text === 'string' ? value.text : '',
          attachments: normalizeAttachments(value.attachments),
        }]
      })
    : []
}

function getAttachmentParts(attachments: Array<{ mime: string; data: string }>) {
  return attachments.map((attachment) => ({
    inline_data: {
      mime_type: attachment.mime,
      data: attachment.data,
    },
  }))
}

function getMessageParts(message: { role: string; text: string; attachments: Array<{ mime: string; data: string }> }) {
  const parts: Array<Record<string, unknown>> = []
  const text = typeof message.text === 'string' ? message.text.trim() : ''

  if (text) {
    parts.push({ text })
  }

  if (message.role !== 'assistant') {
    parts.push(...getAttachmentParts(message.attachments))
  }

  return parts
}

function buildContents(messages: Array<{ role: string; text: string; attachments: Array<{ mime: string; data: string }> }>, userMessage: string, attachments: Array<{ mime: string; data: string }>) {
  const history = messages.flatMap((message) => {
    const parts = getMessageParts(message)
    if (!parts.length) return []

    return [{
      role: message.role === 'assistant' ? 'model' : 'user',
      parts,
    }]
  })

  const nextParts: Array<Record<string, unknown>> = []
  const text = typeof userMessage === 'string' ? userMessage.trim() : ''
  const attachmentParts = getAttachmentParts(attachments)

  if (text) {
    nextParts.push({ text })
  } else if (attachmentParts.length > 0) {
    nextParts.push({ text: 'Describe the attached file(s).' })
  }

  nextParts.push(...attachmentParts)

  if (!nextParts.length) return history
  return [...history, { role: 'user', parts: nextParts }]
}

function extractCandidateText(data: any) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part: any) => (typeof part.text === 'string' ? part.text : ''))
    .join('') || ''
}

function normalizeStructuredChatResponse(rawText: string) {
  try {
    const parsed = JSON.parse(rawText)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Structured response was not an object')
    }

    const message = typeof parsed.message === 'string' ? parsed.message.trim() : ''
    const taskActions = {
      createTasks: Array.isArray(parsed.createTasks) ? parsed.createTasks : [],
      askQuestions: Array.isArray(parsed.askQuestions) ? parsed.askQuestions : [],
    }

    if (parsed.generateSummary && typeof parsed.generateSummary === 'object') {
      ;(taskActions as any).generateSummary = parsed.generateSummary
    }

    return { text: message || 'Done.', taskActions }
  } catch {
    return {
      text: typeof rawText === 'string' ? rawText : '',
      taskActions: {
        createTasks: [],
        askQuestions: [],
      },
    }
  }
}

function isComplexPrompt(text: string) {
  if (!text) return false
  const wordCount = text.trim().split(/\s+/).length
  if (wordCount > 80) return true

  return /\b(explain|analyze|compare|summarize|essay|detail|research|step.by.step|write me)\b/i.test(text)
}

function isSymptomLogRequest(userMessage: string, systemPrompt: string) {
  const combined = `${userMessage}\n${systemPrompt}`
  return combined.includes('Given a parent\'s description of their child\'s symptoms, return ONLY a single JSON object') ||
    combined.includes('Create the final review payload for a quick chat symptom log') ||
    combined.includes('Extract only symptom-log facts from the latest parent message') ||
    combined.includes('Use the parent\'s initial description, the child\'s profile, the parent\'s exam answers')
}

function getModelsForMode(mode: string, prompt: string, purpose: string) {
  if (purpose === 'title') return FAST_MODELS
  if (mode === 'fast') return FAST_MODELS
  if (mode === 'auto') return isComplexPrompt(prompt) ? FULL_MODELS : FAST_MODELS
  return AVAILABLE_MODELS
}

function getGenerationConfig(mode: string, prompt: string, purpose: string, systemPrompt = '') {
  if (purpose === 'title') {
    return { maxOutputTokens: 20, temperature: 0.3 }
  }

  if (purpose === 'transcription') {
    return { maxOutputTokens: 500, temperature: 0 }
  }

  const useFastProfile = mode === 'fast' || (mode === 'auto' && !isComplexPrompt(prompt))
  const isSymptomLog = isSymptomLogRequest(prompt, systemPrompt)

  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: (useFastProfile && !isSymptomLog) ? 600 : 2048,
    temperature: useFastProfile ? 0.5 : 0.8,
  }

  if (purpose === 'chat') {
    generationConfig.responseMimeType = 'application/json'
    if (!isSymptomLog) {
      generationConfig.responseSchema = STRUCTURED_CHAT_SCHEMA
    }
  }

  return generationConfig
}

async function callGeminiApi(model: string, payload: Record<string, unknown>) {
  if (!AI_API_KEY) {
    throw new Error('AI_API_KEY is not configured for the ai-chat function.')
  }

  const url = `${GEMINI_API_URL}/${model}:generateContent?key=${AI_API_KEY}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    const data = await response.json()
    if (!response.ok) {
      const message = data?.error?.message || 'AI provider error'
      throw new Error(message)
    }

    const text = extractCandidateText(data)
    if (!text) {
      throw new Error('No text in AI response')
    }

    return { text, model }
  } finally {
    clearTimeout(timeoutId)
  }
}

async function callModelWithFallback(messages: any[], userMessage: string, systemPrompt: string, mode: string, purpose: string, attachments: any[]) {
  const models = getModelsForMode(mode, userMessage, purpose)
  const generationConfig = getGenerationConfig(mode, userMessage, purpose, systemPrompt)

  const payload: Record<string, unknown> = {
    contents: buildContents(messages, userMessage, attachments),
    generationConfig,
    safetySettings: [
      { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DEROGATORY_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_VIOLENCE', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUAL_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_MEDICAL', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  }

  if (systemPrompt) {
    payload.systemInstruction = { parts: [{ text: systemPrompt }] }
  }

  let lastError: Error | null = null

  for (const model of models) {
    try {
      return await callGeminiApi(model, payload)
    } catch (error) {
      lastError = error as Error
      console.warn(`Model ${model} failed: ${lastError.message}`)
    }
  }

  throw lastError || new Error('All configured models failed')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method Not Allowed' }, 405)
  }

  try {
    const body = await req.json()
    const messages = normalizeMessages(body?.messages)
    const userMessage = typeof body?.userMessage === 'string' ? body.userMessage : ''
    const attachments = normalizeAttachments(body?.attachments)
    const mode = normalizeMode(body?.mode)
    const purpose = normalizePurpose(body?.purpose)
    const systemPrompt = purpose === 'chat' ? normalizeSystemPrompt(body?.systemPrompt) : ''

    const result = await callModelWithFallback(
      messages,
      userMessage,
      systemPrompt,
      mode,
      purpose,
      attachments,
    )

    if (purpose === 'title' || purpose === 'transcription') {
      return jsonResponse({ text: result.text, model: result.model })
    }

    return jsonResponse({ ...normalizeStructuredChatResponse(result.text), model: result.model })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI chat function failed'
    return jsonResponse({ error: message }, 500)
  }
})
