/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

export type JobApplicationStatus = 'new' | 'in_review' | 'contacted' | 'rejected' | 'hired' | 'archived';

export interface JobApplicationRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: JobApplicationStatus;
  name: string;
  email: string;
  phone: string | null;
  position_interest: string | null;
  message: string;
  resume_filename: string;
  resume_size_bytes: number | null;
  privacy_accepted: boolean;
  raw_data: Record<string, unknown>;
}

const TABLE = 'job_applications';
const client = supabase as any;

export async function fetchJobApplications(status?: JobApplicationStatus) {
  let query = client.from(TABLE).select('*').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as JobApplicationRecord[];
}

export async function fetchJobApplicationById(id: string) {
  const { data, error } = await client.from(TABLE).select('*').eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as JobApplicationRecord;
}

export async function updateJobApplicationStatus(id: string, status: JobApplicationStatus) {
  const { data, error } = await client
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as JobApplicationRecord;
}

export async function deleteJobApplication(id: string) {
  const { error } = await client.from(TABLE).delete().eq('id', id);

  if (error) {
    throw error;
  }
}
