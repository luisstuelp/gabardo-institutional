export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      midia: {
        Row: {
          author_id: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          published_date: string | null
          read_time: string | null
          source: string
          thumbnail: string | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          published_date?: string | null
          read_time?: string | null
          source: string
          thumbnail?: string | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          published_date?: string | null
          read_time?: string | null
          source?: string
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      midia_metrics: {
        Row: {
          created_at: string
          external_clicks: number
          id: string
          last_viewed_at: string | null
          midia_id: string | null
          shares: number
          updated_at: string
          views: number
        }
        Insert: {
          created_at?: string
          external_clicks?: number
          id?: string
          last_viewed_at?: string | null
          midia_id?: string | null
          shares?: number
          updated_at?: string
          views?: number
        }
        Update: {
          created_at?: string
          external_clicks?: number
          id?: string
          last_viewed_at?: string | null
          midia_id?: string | null
          shares?: number
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "midia_metrics_midia_id_fkey"
            columns: ["midia_id"]
            referencedRelation: "midia"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          author: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          featured: boolean | null
          excerpt: string | null
          id: string
          published: boolean | null
          read_time: string | null
          slug: string
          title: string
          category: string | null
          tags: string[] | null
          seo_description: string | null
          seo_keywords: string[] | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          author?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          featured?: boolean | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          read_time?: string | null
          slug: string
          title: string
          category?: string | null
          tags?: string[] | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          author?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          featured?: boolean | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          read_time?: string | null
          slug?: string
          title?: string
          category?: string | null
          tags?: string[] | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      post_metrics: {
        Row: {
          created_at: string
          external_clicks: number
          id: string
          last_viewed_at: string | null
          post_id: string | null
          shares: number
          updated_at: string
          views: number
        }
        Insert: {
          created_at?: string
          external_clicks?: number
          id?: string
          last_viewed_at?: string | null
          post_id?: string | null
          shares?: number
          updated_at?: string
          views?: number
        }
        Update: {
          created_at?: string
          external_clicks?: number
          id?: string
          last_viewed_at?: string | null
          post_id?: string | null
          shares?: number
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_metrics_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
