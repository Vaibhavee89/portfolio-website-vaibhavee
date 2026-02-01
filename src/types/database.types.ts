export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          full_description: string | null
          image_url: string | null
          tags: string[]
          live_link: string | null
          github_link: string | null
          display_order: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description: string
          full_description?: string | null
          image_url?: string | null
          tags: string[]
          live_link?: string | null
          github_link?: string | null
          display_order?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          full_description?: string | null
          image_url?: string | null
          tags?: string[]
          live_link?: string | null
          github_link?: string | null
          display_order?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          display_order?: number
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          icon_name: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon_name: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon_name?: string
          display_order?: number
          created_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          name: string
          issuer: string
          date: string
          icon_name: string
          credential_url: string | null
          description: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          issuer: string
          date: string
          icon_name: string
          credential_url?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          issuer?: string
          date?: string
          icon_name?: string
          credential_url?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
        }
      }
      education: {
        Row: {
          id: string
          title: string
          period: string
          description: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          period: string
          description: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          period?: string
          description?: string
          display_order?: number
          created_at?: string
        }
      }
      work_experience: {
        Row: {
          id: string
          title: string
          organisation: string
          period: string
          badge: string
          description: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organisation: string
          period: string
          badge: string
          description: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          organisation?: string
          period?: string
          badge?: string
          description?: string
          display_order?: number
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          date: string
          read_time: string
          dev_to_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id: string
          title: string
          excerpt: string
          date: string
          read_time: string
          dev_to_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          date?: string
          read_time?: string
          dev_to_url?: string
          display_order?: number
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          image_url: string
          alt_text: string
          caption: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          alt_text: string
          caption: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          alt_text?: string
          caption?: string
          display_order?: number
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
  }
}
