export type JobApplicationStatus = 'new' | 'in_review' | 'contacted' | 'rejected' | 'hired' | 'archived';

export const jobApplicationStatusLabels: Record<JobApplicationStatus, string> = {
  new: 'Nova',
  in_review: 'Em Análise',
  contacted: 'Contactado',
  rejected: 'Rejeitado',
  hired: 'Contratado',
  archived: 'Arquivada',
};

export const jobApplicationStatusColors: Record<JobApplicationStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  in_review: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
};
