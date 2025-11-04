export type ContactStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export const contactStatusLabels: Record<ContactStatus, string> = {
  new: 'Nova',
  in_progress: 'Em andamento',
  completed: 'Concluída',
  archived: 'Arquivada',
};
