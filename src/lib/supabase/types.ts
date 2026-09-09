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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      estimator_rates: {
        Row: {
          base_rate_sqft: number
          effective_from: string | null
          floor_multiplier: Json
          id: string
          is_active: boolean | null
          location: string | null
          location_multiplier: number | null
          package: string
          stage_breakdown: Json
        }
        Insert: {
          base_rate_sqft: number
          effective_from?: string | null
          floor_multiplier: Json
          id?: string
          is_active?: boolean | null
          location?: string | null
          location_multiplier?: number | null
          package: string
          stage_breakdown: Json
        }
        Update: {
          base_rate_sqft?: number
          effective_from?: string | null
          floor_multiplier?: Json
          id?: string
          is_active?: boolean | null
          location?: string | null
          location_multiplier?: number | null
          package?: string
          stage_breakdown?: Json
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          id: string
          is_published: boolean | null
          question: string
          sort_order: number | null
          topic: string | null
        }
        Insert: {
          answer: string
          id?: string
          is_published?: boolean | null
          question: string
          sort_order?: number | null
          topic?: string | null
        }
        Update: {
          answer?: string
          id?: string
          is_published?: boolean | null
          question?: string
          sort_order?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          estimate_payload: Json | null
          full_name: string
          id: string
          internal_notes: string | null
          location: string | null
          message: string | null
          page_path: string | null
          phone: string
          service_type: string | null
          source: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          estimate_payload?: Json | null
          full_name: string
          id?: string
          internal_notes?: string | null
          location?: string | null
          message?: string | null
          page_path?: string | null
          phone: string
          service_type?: string | null
          source?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          estimate_payload?: Json | null
          full_name?: string
          id?: string
          internal_notes?: string | null
          location?: string | null
          message?: string | null
          page_path?: string | null
          phone?: string
          service_type?: string | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      material_categories: {
        Row: {
          body: string | null
          highlights: string[] | null
          id: string
          image_path: string | null
          is_published: boolean | null
          name: string
          promise: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          body?: string | null
          highlights?: string[] | null
          id?: string
          image_path?: string | null
          is_published?: boolean | null
          name: string
          promise: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          body?: string | null
          highlights?: string[] | null
          id?: string
          image_path?: string | null
          is_published?: boolean | null
          name?: string
          promise?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt_text: string
          caption: string | null
          id: string
          image_path: string
          project_id: string | null
          sort_order: number | null
        }
        Insert: {
          alt_text: string
          caption?: string | null
          id?: string
          image_path: string
          project_id?: string | null
          sort_order?: number | null
        }
        Update: {
          alt_text?: string
          caption?: string | null
          id?: string
          image_path?: string
          project_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          body: string | null
          building_type: string | null
          built_up_area_sqft: number | null
          cover_image_path: string | null
          created_at: string | null
          floors: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          location: string
          project_type: string
          slug: string
          summary: string | null
          title: string
          year_completed: number | null
        }
        Insert: {
          body?: string | null
          building_type?: string | null
          built_up_area_sqft?: number | null
          cover_image_path?: string | null
          created_at?: string | null
          floors?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          location: string
          project_type: string
          slug: string
          summary?: string | null
          title: string
          year_completed?: number | null
        }
        Update: {
          body?: string | null
          building_type?: string | null
          built_up_area_sqft?: number | null
          cover_image_path?: string | null
          created_at?: string | null
          floors?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          location?: string
          project_type?: string
          slug?: string
          summary?: string | null
          title?: string
          year_completed?: number | null
        }
        Relationships: []
      }
      service_areas: {
        Row: {
          id: string
          intro: string | null
          is_published: boolean | null
          name: string
          slug: string
        }
        Insert: {
          id?: string
          intro?: string | null
          is_published?: boolean | null
          name: string
          slug: string
        }
        Update: {
          id?: string
          intro?: string | null
          is_published?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          hero_image_path: string | null
          id: string
          is_published: boolean | null
          name: string
          promise: string
          slug: string
          sort_order: number | null
          sub_services: string[] | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          hero_image_path?: string | null
          id?: string
          is_published?: boolean | null
          name: string
          promise: string
          slug: string
          sort_order?: number | null
          sub_services?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          hero_image_path?: string | null
          id?: string
          is_published?: boolean | null
          name?: string
          promise?: string
          slug?: string
          sort_order?: number | null
          sub_services?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          id: string
          is_published: boolean | null
          location: string | null
          project_type: string | null
          quote: string
          sort_order: number | null
        }
        Insert: {
          author_name: string
          id?: string
          is_published?: boolean | null
          location?: string | null
          project_type?: string | null
          quote: string
          sort_order?: number | null
        }
        Update: {
          author_name?: string
          id?: string
          is_published?: boolean | null
          location?: string | null
          project_type?: string | null
          quote?: string
          sort_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
