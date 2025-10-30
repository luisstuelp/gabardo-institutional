import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPublishedPosts, fetchPostBySlug, createPost, updatePost, deletePost } from '@/services/posts';
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
    mutationFn: (post: PostFormData) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: PostFormData }) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}