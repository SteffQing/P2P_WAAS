export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

declare global {
  type Database = {
    graphql_public: {
      Tables: {
        [_ in never]: never;
      };
      Views: {
        [_ in never]: never;
      };
      Functions: {
        graphql: {
          Args: {
            operationName?: string;
            query?: string;
            variables?: Json;
            extensions?: Json;
          };
          Returns: Json;
        };
      };
      Enums: {
        [_ in never]: never;
      };
      CompositeTypes: {
        [_ in never]: never;
      };
    };
    public: {
      Tables: {
        _prisma_migrations: {
          Row: {
            applied_steps_count: number;
            checksum: string;
            finished_at: string | null;
            id: string;
            logs: string | null;
            migration_name: string;
            rolled_back_at: string | null;
            started_at: string;
          };
          Insert: {
            applied_steps_count?: number;
            checksum: string;
            finished_at?: string | null;
            id: string;
            logs?: string | null;
            migration_name: string;
            rolled_back_at?: string | null;
            started_at?: string;
          };
          Update: {
            applied_steps_count?: number;
            checksum?: string;
            finished_at?: string | null;
            id?: string;
            logs?: string | null;
            migration_name?: string;
            rolled_back_at?: string | null;
            started_at?: string;
          };
          Relationships: [];
        };
        Ad: {
          Row: {
            createdAt: string;
            crypto: Database["public"]["Enums"]["AssetType"];
            deletedAt: string | null;
            id: string;
            maxAmount: number;
            merchantId: string;
            minAmount: number;
            paymentMethods:
              | Database["public"]["Enums"]["TransferMethod"][]
              | null;
            rate: number;
            timeout: number;
            tradeType: Database["public"]["Enums"]["TradeType"];
            volume: number;
          };
          Insert: {
            createdAt?: string;
            crypto: Database["public"]["Enums"]["AssetType"];
            deletedAt?: string | null;
            id: string;
            maxAmount?: number;
            merchantId: string;
            minAmount?: number;
            paymentMethods?:
              | Database["public"]["Enums"]["TransferMethod"][]
              | null;
            rate: number;
            timeout: number;
            tradeType: Database["public"]["Enums"]["TradeType"];
            volume: number;
          };
          Update: {
            createdAt?: string;
            crypto?: Database["public"]["Enums"]["AssetType"];
            deletedAt?: string | null;
            id?: string;
            maxAmount?: number;
            merchantId?: string;
            minAmount?: number;
            paymentMethods?:
              | Database["public"]["Enums"]["TransferMethod"][]
              | null;
            rate?: number;
            timeout?: number;
            tradeType?: Database["public"]["Enums"]["TradeType"];
            volume?: number;
          };
          Relationships: [
            {
              foreignKeyName: "Ad_merchantId_fkey";
              columns: ["merchantId"];
              isOneToOne: false;
              referencedRelation: "Merchant";
              referencedColumns: ["id"];
            }
          ];
        };
        Balance: {
          Row: {
            amount: number;
            assetType: Database["public"]["Enums"]["AssetType"];
            frozen: number;
            id: string;
            userId: string;
            walletAddress: string | null;
          };
          Insert: {
            amount?: number;
            assetType: Database["public"]["Enums"]["AssetType"];
            frozen?: number;
            id: string;
            userId: string;
            walletAddress?: string | null;
          };
          Update: {
            amount?: number;
            assetType?: Database["public"]["Enums"]["AssetType"];
            frozen?: number;
            id?: string;
            userId?: string;
            walletAddress?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: "Balance_userId_fkey";
              columns: ["userId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            },
            {
              foreignKeyName: "Balance_walletAddress_fkey";
              columns: ["walletAddress"];
              isOneToOne: false;
              referencedRelation: "Wallet";
              referencedColumns: ["address"];
            }
          ];
        };
        Bank: {
          Row: {
            accountName: string;
            accountNumber: string;
            bankName: string;
            deletedAt: string | null;
            id: string;
            transferMethod: Database["public"]["Enums"]["TransferMethod"];
            userId: string;
          };
          Insert: {
            accountName: string;
            accountNumber: string;
            bankName: string;
            deletedAt?: string | null;
            id: string;
            transferMethod?: Database["public"]["Enums"]["TransferMethod"];
            userId: string;
          };
          Update: {
            accountName?: string;
            accountNumber?: string;
            bankName?: string;
            deletedAt?: string | null;
            id?: string;
            transferMethod?: Database["public"]["Enums"]["TransferMethod"];
            userId?: string;
          };
          Relationships: [
            {
              foreignKeyName: "Bank_userId_fkey";
              columns: ["userId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            }
          ];
        };
        Dispute: {
          Row: {
            createdAt: string;
            disputedBy: string;
            id: string;
            reason: string;
            resolution: string | null;
            status: Database["public"]["Enums"]["DisputeStatus"];
            teamId: string | null;
            tradeId: string | null;
            transactionId: string | null;
          };
          Insert: {
            createdAt?: string;
            disputedBy: string;
            id: string;
            reason: string;
            resolution?: string | null;
            status?: Database["public"]["Enums"]["DisputeStatus"];
            teamId?: string | null;
            tradeId?: string | null;
            transactionId?: string | null;
          };
          Update: {
            createdAt?: string;
            disputedBy?: string;
            id?: string;
            reason?: string;
            resolution?: string | null;
            status?: Database["public"]["Enums"]["DisputeStatus"];
            teamId?: string | null;
            tradeId?: string | null;
            transactionId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: "Dispute_teamId_fkey";
              columns: ["teamId"];
              isOneToOne: false;
              referencedRelation: "Team";
              referencedColumns: ["id"];
            },
            {
              foreignKeyName: "Dispute_tradeId_fkey";
              columns: ["tradeId"];
              isOneToOne: false;
              referencedRelation: "Trade";
              referencedColumns: ["id"];
            },
            {
              foreignKeyName: "Dispute_transactionId_fkey";
              columns: ["transactionId"];
              isOneToOne: false;
              referencedRelation: "Transaction";
              referencedColumns: ["id"];
            }
          ];
        };
        Merchant: {
          Row: {
            depositHash: string;
            id: string;
            notice: string;
            securityDeposit: number;
            userId: string;
          };
          Insert: {
            depositHash: string;
            id: string;
            notice: string;
            securityDeposit: number;
            userId: string;
          };
          Update: {
            depositHash?: string;
            id?: string;
            notice?: string;
            securityDeposit?: number;
            userId?: string;
          };
          Relationships: [
            {
              foreignKeyName: "Merchant_userId_fkey";
              columns: ["userId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            }
          ];
        };
        Team: {
          Row: {
            id: string;
          };
          Insert: {
            id: string;
          };
          Update: {
            id?: string;
          };
          Relationships: [];
        };
        Trade: {
          Row: {
            adId: string;
            amount: number;
            createdAt: string;
            customerId: string;
            fiatAmount: number;
            id: string;
            paymentMethod: Database["public"]["Enums"]["TransferMethod"];
            status: Database["public"]["Enums"]["Status"];
          };
          Insert: {
            adId: string;
            amount: number;
            createdAt?: string;
            customerId: string;
            fiatAmount: number;
            id: string;
            paymentMethod: Database["public"]["Enums"]["TransferMethod"];
            status?: Database["public"]["Enums"]["Status"];
          };
          Update: {
            adId?: string;
            amount?: number;
            createdAt?: string;
            customerId?: string;
            fiatAmount?: number;
            id?: string;
            paymentMethod?: Database["public"]["Enums"]["TransferMethod"];
            status?: Database["public"]["Enums"]["Status"];
          };
          Relationships: [
            {
              foreignKeyName: "Trade_adId_fkey";
              columns: ["adId"];
              isOneToOne: false;
              referencedRelation: "Ad";
              referencedColumns: ["id"];
            },
            {
              foreignKeyName: "Trade_customerId_fkey";
              columns: ["customerId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            }
          ];
        };
        Transaction: {
          Row: {
            amount: number;
            createdAt: string;
            crypto: Database["public"]["Enums"]["AssetType"];
            hash: string | null;
            id: string;
            status: Database["public"]["Enums"]["Status"];
            transactionType: Database["public"]["Enums"]["TransactionType"];
            userId: string;
          };
          Insert: {
            amount: number;
            createdAt?: string;
            crypto?: Database["public"]["Enums"]["AssetType"];
            hash?: string | null;
            id: string;
            status?: Database["public"]["Enums"]["Status"];
            transactionType?: Database["public"]["Enums"]["TransactionType"];
            userId: string;
          };
          Update: {
            amount?: number;
            createdAt?: string;
            crypto?: Database["public"]["Enums"]["AssetType"];
            hash?: string | null;
            id?: string;
            status?: Database["public"]["Enums"]["Status"];
            transactionType?: Database["public"]["Enums"]["TransactionType"];
            userId?: string;
          };
          Relationships: [
            {
              foreignKeyName: "Transaction_userId_fkey";
              columns: ["userId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            }
          ];
        };
        User: {
          Row: {
            completionTime: number;
            contact: string | null;
            id: string;
            name: string;
            successRate: number;
            totalTrades: number;
          };
          Insert: {
            completionTime?: number;
            contact?: string | null;
            id: string;
            name: string;
            successRate?: number;
            totalTrades?: number;
          };
          Update: {
            completionTime?: number;
            contact?: string | null;
            id?: string;
            name?: string;
            successRate?: number;
            totalTrades?: number;
          };
          Relationships: [];
        };
        Wallet: {
          Row: {
            address: string;
            network: Database["public"]["Enums"]["Network"];
            userId: string | null;
          };
          Insert: {
            address: string;
            network: Database["public"]["Enums"]["Network"];
            userId?: string | null;
          };
          Update: {
            address?: string;
            network?: Database["public"]["Enums"]["Network"];
            userId?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: "Wallet_userId_fkey";
              columns: ["userId"];
              isOneToOne: false;
              referencedRelation: "User";
              referencedColumns: ["id"];
            }
          ];
        };
      };
      Views: {
        [_ in never]: never;
      };
      Functions: {
        [_ in never]: never;
      };
      Enums: {
        AssetType:
          | "USDT"
          | "BTC"
          | "ETH"
          | "USDC"
          | "TRX"
          | "LTC"
          | "SOL"
          | "BNB"
          | "POL"
          | "AVAX";
        DisputeStatus: "OPEN" | "ASSIGNED" | "RESOLVED" | "CLOSED";
        Network: "BTC" | "LTC" | "EVM" | "SOL" | "TRX";
        Status: "Unpaid" | "Pending" | "Completed" | "Cancelled";
        TradeType: "Buy" | "Sell";
        TransactionType: "Withdraw" | "Deposit";
        TransferMethod: "BankTransfer" | "Opay" | "Palmpay" | "Kuda";
      };
      CompositeTypes: {
        [_ in never]: never;
      };
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
s;
