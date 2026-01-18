export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string | null
          full_name: string
          id: string
          is_default: boolean | null
          phone: string
          pincode: string
          state: string
          user_id: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string | null
          full_name: string
          id?: string
          is_default?: boolean | null
          phone: string
          pincode: string
          state: string
          user_id?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string | null
          full_name?: string
          id?: string
          is_default?: boolean | null
          phone?: string
          pincode?: string
          state?: string
          user_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          product_name: string
          quantity: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          product_name: string
          quantity: number
        }
        Update: {
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          product_name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          payment_id: string | null
          razorpay_order_id: string | null
          shipping_address: Json | null
          status: string | null
          total: number
          user_id: string | null
          address_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          payment_id?: string | null
          razorpay_order_id?: string | null
          shipping_address?: Json | null
          status?: string | null
          total: number
          user_id?: string | null
          address_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          payment_id?: string | null
          razorpay_order_id?: string | null
          shipping_address?: Json | null
          status?: string | null
          total?: number
          user_id?: string | null
          address_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          doctor_note: string | null
          featured: boolean | null
          how_to_use: Json | null
          id: string
          ideal_for: string[] | null
          image: string | null
          ingredients: string | null
          name: string
          net_qty: string | null
          nutrition: Json | null
          original_price: number | null
          price: number
          short_description: string | null
          slug: string
          stock: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          doctor_note?: string | null
          featured?: boolean | null
          how_to_use?: Json | null
          id: string
          ideal_for?: string[] | null
          image?: string | null
          ingredients?: string | null
          name: string
          net_qty?: string | null
          nutrition?: Json | null
          original_price?: number | null
          price: number
          short_description?: string | null
          slug: string
          stock?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          doctor_note?: string | null
          featured?: boolean | null
          how_to_use?: Json | null
          id?: string
          ideal_for?: string[] | null
          image?: string | null
          ingredients?: string | null
          name?: string
          net_qty?: string | null
          nutrition?: Json | null
          original_price?: number | null
          price?: number
          short_description?: string | null
          slug?: string
          stock?: number | null
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

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type Product = Tables<'products'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Address = Tables<'addresses'>
