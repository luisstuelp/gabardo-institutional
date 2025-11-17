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
      admin_audit_logs: {
        Row: {
          id: string
          created_at: string | null
          actor_id: string | null
          actor_email: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          action: string
          route: string | null
          method: string | null
          entity_type: string | null
          entity_id: string | null
          description: string | null
          metadata: Json
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          actor_id?: string | null
          actor_email?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          action: string
          route?: string | null
          method?: string | null
          entity_type?: string | null
          entity_id?: string | null
          description?: string | null
          metadata?: Json
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          actor_id?: string | null
          actor_email?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          action?: string
          route?: string | null
          method?: string | null
          entity_type?: string | null
          entity_id?: string | null
          description?: string | null
          metadata?: Json
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      midia_metrics: {
        Row: {
          id: string
          midia_id: string | null
          views: number
          external_clicks: number
          shares: number
          last_viewed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          midia_id?: string | null
          views?: number
          external_clicks?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          midia_id?: string | null
          views?: number
          external_clicks?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'midia_metrics_midia_id_fkey'
            columns: ['midia_id']
            referencedRelation: 'midia'
            referencedColumns: ['id']
          }
        ]
      }
      midia: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          id: string
          published_date: string | null
          source: string
          thumbnail: string | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          published_date?: string | null
          source: string
          thumbnail?: string | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          published_date?: string | null
          source?: string
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published: boolean | null
          featured: boolean | null
          category: string | null
          tags: string[] | null
          author: string | null
          read_time: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          featured?: boolean | null
          category?: string | null
          tags?: string[] | null
          author?: string | null
          read_time?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          featured?: boolean | null
          category?: string | null
          tags?: string[] | null
          author?: string | null
          read_time?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      post_metrics: {
        Row: {
          id: string
          post_id: string | null
          views: number
          external_clicks: number
          shares: number
          last_viewed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          post_id?: string | null
          views?: number
          external_clicks?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string | null
          views?: number
          external_clicks?: number
          shares?: number
          last_viewed_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'post_metrics_post_id_fkey'
            columns: ['post_id']
            referencedRelation: 'posts'
            referencedColumns: ['id']
          }
        ]
      }
      quotes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: Database['public']['Enums']['quote_status']
          name: string
          company: string | null
          email: string
          phone: string
          vehicle_category: string
          vehicle_brand: string
          vehicle_model: string
          vehicle_year: string
          vehicle_value: string
          vehicle_observation: string | null
          origin_state: string
          origin_city: string
          destination_state: string
          destination_city: string
          route_observation: string | null
          message: string | null
          privacy_accepted: boolean
          raw_data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: Database['public']['Enums']['quote_status']
          name: string
          company?: string | null
          email: string
          phone: string
          vehicle_category: string
          vehicle_brand: string
          vehicle_model: string
          vehicle_year: string
          vehicle_value: string
          vehicle_observation?: string | null
          origin_state: string
          origin_city: string
          destination_state: string
          destination_city: string
          route_observation?: string | null
          message?: string | null
          privacy_accepted?: boolean
          raw_data?: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: Database['public']['Enums']['quote_status']
          name?: string
          company?: string | null
          email?: string
          phone?: string
          vehicle_category?: string
          vehicle_brand?: string
          vehicle_model?: string
          vehicle_year?: string
          vehicle_value?: string
          vehicle_observation?: string | null
          origin_state?: string
          origin_city?: string
          destination_state?: string
          destination_city?: string
          route_observation?: string | null
          message?: string | null
          privacy_accepted?: boolean
          raw_data?: Json
        }
        Relationships: []
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
      page_metrics: {
        Row: {
          id: string | null
          page_path: string | null
          views: number | null
          last_viewed_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Relationships: []
      }
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
      quote_status: "new" | "in_progress" | "completed" | "archived"
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
