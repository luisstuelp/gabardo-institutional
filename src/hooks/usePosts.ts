import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPublishedPosts, fetchPostBySlug } from '@/services/posts';
import { useToast } from '@/hooks/use-toast';
import { PostFormData } from '@/schemas/post';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ['posts', 'published'],
    queryFn: fetchPublishedPosts,
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (post: PostFormData) => {
      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível criar o post.' }));
        throw new Error(error.error ?? 'Não foi possível criar o post.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post created successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to create post",
        description: message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, post }: { id: string; post: PostFormData }) => {
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível atualizar o post.' }));
        throw new Error(error.error ?? 'Não foi possível atualizar o post.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post updated successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to update post",
        description: message,
        variant: "destructive",
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'admin-request' }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível excluir o post.' }));
        throw new Error(error.error ?? 'Não foi possível excluir o post.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post deleted successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to delete post",
        description: message,
        variant: "destructive",
      });
    },
  });
}