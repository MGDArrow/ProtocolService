/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { IDate } from './types';

export type Json = IDate;

export interface Database {
  public: {
    Tables: {
      BISHOPS: {
        Row: {
          date_angel     : Json | null;
          date_birth     : Json | null;
          date_death     : Json | null;
          date_ordination: Json | null;
          date_tonsure   : Json | null;
          email          : string | null;
          hidden         : boolean | null;
          id             : number;
          name_father    : string | null;
          name_first     : string | null;
          name_monk      : string | null;
          name_second    : string | null;
          photo          : string | null;
          title          : string | null;
          website        : string | null;
        };
        Insert: {
          date_angel?     : Json | null;
          date_birth?     : Json | null;
          date_death?     : Json | null;
          date_ordination?: Json | null;
          date_tonsure?   : Json | null;
          email?          : string | null;
          hidden?         : boolean | null;
          id?             : number;
          name_father?    : string | null;
          name_first?     : string | null;
          name_monk?      : string | null;
          name_second?    : string | null;
          photo?          : string | null;
          title?          : string | null;
          website?        : string | null;
        };
        Update: {
          date_angel?     : Json | null;
          date_birth?     : Json | null;
          date_death?     : Json | null;
          date_ordination?: Json | null;
          date_tonsure?   : Json | null;
          email?          : string | null;
          hidden?         : boolean | null;
          id?             : number;
          name_father?    : string | null;
          name_first?     : string | null;
          name_monk?      : string | null;
          name_second?    : string | null;
          photo?          : string | null;
          title?          : string | null;
          website?        : string | null;
        };
        Relationships: [];
      };
      GIFTS: {
        Row: {
          count: number;
          id   : number;
          name : string;
        };
        Insert: {
          count?: number;
          id?   : number;
          name  : string;
        };
        Update: {
          count?: number;
          id?   : number;
          name? : string;
        };
        Relationships: [];
      };
      HISTORY: {
        Row: {
          bishop_id  : number | null;
          count      : number | null;
          create_date: string | null;
          gift       : number | null;
          id         : number;
          priest_id  : number | null;
          secular_id : number | null;
        };
        Insert: {
          bishop_id?  : number | null;
          count?      : number | null;
          create_date?: string | null;
          gift?       : number | null;
          id?         : number;
          priest_id?  : number | null;
          secular_id? : number | null;
        };
        Update: {
          bishop_id?  : number | null;
          count?      : number | null;
          create_date?: string | null;
          gift?       : number | null;
          id?         : number;
          priest_id?  : number | null;
          secular_id? : number | null;
        };
        Relationships: [
          {
            foreignKeyName    : 'HISTORY_bishop_id_fkey';
            columns           : ['bishop_id'];
            isOneToOne        : false;
            referencedRelation: 'BISHOPS';
            referencedColumns : ['id'];
          },
          {
            foreignKeyName    : 'HISTORY_gift_fkey';
            columns           : ['gift'];
            isOneToOne        : false;
            referencedRelation: 'GIFTS';
            referencedColumns : ['id'];
          },
          {
            foreignKeyName    : 'HISTORY_priest_id_fkey';
            columns           : ['priest_id'];
            isOneToOne        : false;
            referencedRelation: 'PRIESTS';
            referencedColumns : ['id'];
          },
          {
            foreignKeyName    : 'HISTORY_secular_id_fkey';
            columns           : ['secular_id'];
            isOneToOne        : false;
            referencedRelation: 'SECULARS';
            referencedColumns : ['id'];
          },
        ];
      };
      PRIESTS: {
        Row: {
          date_birth : Json | null;
          date_deacon: Json | null;
          date_death : Json | null;
          date_priest: Json | null;
          hidden     : boolean | null;
          id         : number;
          name_father: string | null;
          name_first : string | null;
          name_monk  : string | null;
          name_second: string | null;
          title      : string | null;
        };
        Insert: {
          date_birth? : Json | null;
          date_deacon?: Json | null;
          date_death? : Json | null;
          date_priest?: Json | null;
          hidden?     : boolean | null;
          id?         : number;
          name_father?: string | null;
          name_first? : string | null;
          name_monk?  : string | null;
          name_second?: string | null;
          title?      : string | null;
        };
        Update: {
          date_birth? : Json | null;
          date_deacon?: Json | null;
          date_death? : Json | null;
          date_priest?: Json | null;
          hidden?     : boolean | null;
          id?         : number;
          name_father?: string | null;
          name_first? : string | null;
          name_monk?  : string | null;
          name_second?: string | null;
          title?      : string | null;
        };
        Relationships: [];
      };
      SECULARS: {
        Row: {
          date_birth : Json | null;
          hidden     : boolean | null;
          id         : number;
          name_father: string | null;
          name_first : string | null;
          name_second: string | null;
          title      : string | null;
        };
        Insert: {
          date_birth? : Json | null;
          hidden?     : boolean | null;
          id?         : number;
          name_father?: string | null;
          name_first? : string | null;
          name_second?: string | null;
          title?      : string | null;
        };
        Update: {
          date_birth? : Json | null;
          hidden?     : boolean | null;
          id?         : number;
          name_father?: string | null;
          name_first? : string | null;
          name_second?: string | null;
          title?      : string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
  Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
    Row: infer R;
  }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
    PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I;
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U;
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
