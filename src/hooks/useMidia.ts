import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMidia, createMidia, updateMidia, deleteMidia } from '@/services/midia';
import { useToast } from '@/hooks/use-toast';
import { MidiaFormData } from '@/schemas/midia';

export function useMidia() {
  return useQuery({
    queryKey: ['midia'],
    queryFn: fetchMidia,
  });
}

export function useCreateMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (midia: MidiaFormData) => createMidia(midia),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create media",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, midia }: { id: string; midia: MidiaFormData }) => updateMidia(id, midia),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update media",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteMidia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete media",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}