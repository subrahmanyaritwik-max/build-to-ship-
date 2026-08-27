-- ========================================================
-- Supabase Database Schema for Student Fundamentals Application
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- 1. Create app_store table for centralized JSON state management
CREATE TABLE IF NOT EXISTS public.app_store (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Disable RLS or create permissive policy for API access
ALTER TABLE public.app_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read and write on app_store" 
ON public.app_store 
FOR ALL 
USING (true) 
WITH CHECK (true);
