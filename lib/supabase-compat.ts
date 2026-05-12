"use client";

// Compatibility wrapper for migrated components from /impor
// Maps old getSupabaseBrowserClient() calls to new createSupabaseBrowserClient()

import { createSupabaseBrowserClient } from './supabase/browser';

export function getSupabaseBrowserClient() {
  return createSupabaseBrowserClient();
}
