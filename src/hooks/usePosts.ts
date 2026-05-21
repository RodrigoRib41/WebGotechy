import { useCallback, useEffect, useState } from 'react';
import { blogService } from '../lib/supabase';
import type { BlogPost } from '../types/blog';

interface UsePostsState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

/** Lista de TODOS los posts (admin). */
export function useAllPosts() {
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const posts = await blogService.getAllPosts();
      setState({ posts, loading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setState({ posts: [], loading: false, error: msg });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/** Lista de posts publicados (público). */
export function usePublishedPosts() {
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    blogService
      .getPublishedPosts()
      .then((posts) => {
        if (active) setState({ posts, loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (!active) return;
        const msg = e instanceof Error ? e.message : 'Error desconocido';
        setState({ posts: [], loading: false, error: msg });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** Un post por id (admin, edición). */
export function usePostById(id: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPost(null);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    blogService
      .getPostById(id)
      .then((p) => {
        if (!active) return;
        setPost(p);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Error desconocido');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return { post, loading, error };
}
