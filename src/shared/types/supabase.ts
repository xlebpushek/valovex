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
      lobbies: {
        Row: {
          attachers: string[]
          attachers_limit: number
          attachers_ready: string[]
          banned_agents: string[]
          banned_maps: string[]
          created_at: string
          creator: string
          defenders: string[]
          defenders_limit: number
          defenders_ready: string[]
          game_mode: Database["public"]["Enums"]["game_mods"]
          invite_code: string
          observers: string[]
          votes: Json
          voting_side: Database["public"]["Enums"]["voting_sides"]
          voting_time: Database["public"]["Enums"]["voting_times"]
        }
        Insert: {
          attachers?: string[]
          attachers_limit?: number
          attachers_ready?: string[]
          banned_agents?: string[]
          banned_maps?: string[]
          created_at?: string
          creator: string
          defenders?: string[]
          defenders_limit?: number
          defenders_ready?: string[]
          game_mode?: Database["public"]["Enums"]["game_mods"]
          invite_code: string
          observers?: string[]
          votes?: Json
          voting_side: Database["public"]["Enums"]["voting_sides"]
          voting_time?: Database["public"]["Enums"]["voting_times"]
        }
        Update: {
          attachers?: string[]
          attachers_limit?: number
          attachers_ready?: string[]
          banned_agents?: string[]
          banned_maps?: string[]
          created_at?: string
          creator?: string
          defenders?: string[]
          defenders_limit?: number
          defenders_ready?: string[]
          game_mode?: Database["public"]["Enums"]["game_mods"]
          invite_code?: string
          observers?: string[]
          votes?: Json
          voting_side?: Database["public"]["Enums"]["voting_sides"]
          voting_time?: Database["public"]["Enums"]["voting_times"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_to_array: {
        Args: {
          table_name: string
          column_name: string
          value: string
          condition_column: string
          condition_value: string
        }
        Returns: undefined
      }
    }
    Enums: {
      game_mods:
        | "swiftplay"
        | "standard"
        | "deathmatch"
        | "escalation"
        | "team_deathmatch"
        | "spike_rush"
      voting_sides: "attachers" | "defenders"
      voting_times: "5" | "10" | "15" | "20" | "30"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
