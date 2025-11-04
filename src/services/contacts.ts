/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

export type ContactStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export interface ContactMessageRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: ContactStatus;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  sector: string | null;
  interest: string | null;
  subject: string;
  message: string;
  privacy_accepted: boolean;
  raw_data: Record<string, unknown>;
}

const TABLE = 'contact_messages';
const client = supabase as any;

export async function fetchContacts(status?: ContactStatus) {
  let query = client.from(TABLE).select('*').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as ContactMessageRecord[];
}

export async function fetchContactById(id: string) {
  const { data, error } = await client.from(TABLE).select('*').eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as ContactMessageRecord;
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const { data, error } = await client
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ContactMessageRecord;
}
