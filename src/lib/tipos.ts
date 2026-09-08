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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      andamentos: {
        Row: {
          descricao: string | null
          id: string
          id_chamada: string
          id_tecnico_atualizou: string | null
          motivo: string
          quando: string
        }
        Insert: {
          descricao?: string | null
          id?: string
          id_chamada: string
          id_tecnico_atualizou?: string | null
          motivo: string
          quando?: string
        }
        Update: {
          descricao?: string | null
          id?: string
          id_chamada?: string
          id_tecnico_atualizou?: string | null
          motivo?: string
          quando?: string
        }
        Relationships: [
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "count_chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "join_chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "minhas_chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "minhas_chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "andamentos_id_tecnico_atualizou_fkey"
            columns: ["id_tecnico_atualizou"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      chamadas: {
        Row: {
          categoria: string
          client_id: string | null
          contando_desde: string | null
          conteudo_hash: string | null
          continuar_contagem: boolean
          data_atendeu: string | null
          data_criacao: string
          data_finalizacao: string | null
          descricao: string
          email_requerente: string
          id: string
          ip_requerente: string | null
          numero_tecnicos: number
          prazo_final: string | null
          prioridade: number
          requerente: string
          segundos_restantes: number | null
          status: number
          titulo: string
        }
        Insert: {
          categoria: string
          client_id?: string | null
          contando_desde?: string | null
          conteudo_hash?: string | null
          continuar_contagem?: boolean
          data_atendeu?: string | null
          data_criacao?: string
          data_finalizacao?: string | null
          descricao: string
          email_requerente: string
          id?: string
          ip_requerente?: string | null
          numero_tecnicos?: number
          prazo_final?: string | null
          prioridade?: number
          requerente: string
          segundos_restantes?: number | null
          status?: number
          titulo: string
        }
        Update: {
          categoria?: string
          client_id?: string | null
          contando_desde?: string | null
          conteudo_hash?: string | null
          continuar_contagem?: boolean
          data_atendeu?: string | null
          data_criacao?: string
          data_finalizacao?: string | null
          descricao?: string
          email_requerente?: string
          id?: string
          ip_requerente?: string | null
          numero_tecnicos?: number
          prazo_final?: string | null
          prioridade?: number
          requerente?: string
          segundos_restantes?: number | null
          status?: number
          titulo?: string
        }
        Relationships: []
      }
      contratos: {
        Row: {
          arquivo: string | null
          data_fim: string
          data_inicio: string
          empresa: string
          id: string
          periodo: number | null
          renovado: boolean
          servico: string
          valor_mensal: number | null
        }
        Insert: {
          arquivo?: string | null
          data_fim: string
          data_inicio: string
          empresa: string
          id?: string
          periodo?: number | null
          renovado?: boolean
          servico: string
          valor_mensal?: number | null
        }
        Update: {
          arquivo?: string | null
          data_fim?: string
          data_inicio?: string
          empresa?: string
          id?: string
          periodo?: number | null
          renovado?: boolean
          servico?: string
          valor_mensal?: number | null
        }
        Relationships: []
      }
      logs_usuarios: {
        Row: {
          created_at: string
          descricao: string
          gravidade: number
          id: number
          maquina_id: string
          nome_usuario: string
          titulo: string
          tratado: boolean
        }
        Insert: {
          created_at?: string
          descricao: string
          gravidade: number
          id?: number
          maquina_id: string
          nome_usuario: string
          titulo: string
          tratado: boolean
        }
        Update: {
          created_at?: string
          descricao?: string
          gravidade?: number
          id?: number
          maquina_id?: string
          nome_usuario?: string
          titulo?: string
          tratado?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "logs_usuarios_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_usuarios_nome_usuario_fkey"
            columns: ["nome_usuario"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["nome_computador"]
          },
        ]
      }
      maquina_cpus: {
        Row: {
          clock_max_ghz: number | null
          fabricante: string | null
          id_processador: string | null
          maquina_id: string
          nome: string | null
          nucleos: number | null
          processadores_logicos: number | null
          soquete: string | null
        }
        Insert: {
          clock_max_ghz?: number | null
          fabricante?: string | null
          id_processador?: string | null
          maquina_id: string
          nome?: string | null
          nucleos?: number | null
          processadores_logicos?: number | null
          soquete?: string | null
        }
        Update: {
          clock_max_ghz?: number | null
          fabricante?: string | null
          id_processador?: string | null
          maquina_id?: string
          nome?: string | null
          nucleos?: number | null
          processadores_logicos?: number | null
          soquete?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_cpus_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: true
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_dados_brutos: {
        Row: {
          coletado_em: string | null
          conexoes: Json | null
          maquina_id: string
          usuarios_locais: Json | null
        }
        Insert: {
          coletado_em?: string | null
          conexoes?: Json | null
          maquina_id: string
          usuarios_locais?: Json | null
        }
        Update: {
          coletado_em?: string | null
          conexoes?: Json | null
          maquina_id?: string
          usuarios_locais?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_dados_brutos_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: true
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_gpus: {
        Row: {
          data_driver: string | null
          id: string
          maquina_id: string | null
          nome: string | null
          processador_video: string | null
          resolucao: string | null
          status: string | null
          taxa_atualizacao: number | null
          versao_driver: string | null
          vram_gb: number | null
        }
        Insert: {
          data_driver?: string | null
          id?: string
          maquina_id?: string | null
          nome?: string | null
          processador_video?: string | null
          resolucao?: string | null
          status?: string | null
          taxa_atualizacao?: number | null
          versao_driver?: string | null
          vram_gb?: number | null
        }
        Update: {
          data_driver?: string | null
          id?: string
          maquina_id?: string | null
          nome?: string | null
          processador_video?: string | null
          resolucao?: string | null
          status?: string | null
          taxa_atualizacao?: number | null
          versao_driver?: string | null
          vram_gb?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_gpus_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_hds: {
        Row: {
          id: number
          livre: string
          maquina_id: string
          modelo: string
          p_usado: string
          tipo: string
          total: string
          usado: string
        }
        Insert: {
          id?: number
          livre: string
          maquina_id: string
          modelo: string
          p_usado: string
          tipo: string
          total: string
          usado: string
        }
        Update: {
          id?: number
          livre?: string
          maquina_id?: string
          modelo?: string
          p_usado?: string
          tipo?: string
          total?: string
          usado?: string
        }
        Relationships: [
          {
            foreignKeyName: "maquina_hds_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_monitores: {
        Row: {
          ativo: boolean | null
          fabricante: string | null
          id: string
          maquina_id: string | null
          modelo: string | null
          numero_serie: string | null
        }
        Insert: {
          ativo?: boolean | null
          fabricante?: string | null
          id?: string
          maquina_id?: string | null
          modelo?: string | null
          numero_serie?: string | null
        }
        Update: {
          ativo?: boolean | null
          fabricante?: string | null
          id?: string
          maquina_id?: string | null
          modelo?: string | null
          numero_serie?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_monitores_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquina_rams: {
        Row: {
          capacidade: string
          id: number
          maquina_id: string
          slot: string
          tipo: string
          velocidade: string
          velocidade_atual: string
        }
        Insert: {
          capacidade?: string
          id?: number
          maquina_id: string
          slot?: string
          tipo?: string
          velocidade?: string
          velocidade_atual?: string
        }
        Update: {
          capacidade?: string
          id?: number
          maquina_id?: string
          slot?: string
          tipo?: string
          velocidade?: string
          velocidade_atual?: string
        }
        Relationships: [
          {
            foreignKeyName: "maquina_rams_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas: {
        Row: {
          arquitetura: string | null
          criado_em: string | null
          dominio: string | null
          fabricante: string | null
          familia_sistema: string | null
          id: string
          ip_interno: string | null
          ip_publico: string | null
          modelo: string | null
          nome_computador: string
          placa_mae_fabricante: string | null
          placa_mae_produto: string | null
          placa_mae_serial: string | null
          sistema_operacional: string | null
          ultimo_visto: string | null
          usuario_atual: string | null
          versao_so: string | null
        }
        Insert: {
          arquitetura?: string | null
          criado_em?: string | null
          dominio?: string | null
          fabricante?: string | null
          familia_sistema?: string | null
          id?: string
          ip_interno?: string | null
          ip_publico?: string | null
          modelo?: string | null
          nome_computador: string
          placa_mae_fabricante?: string | null
          placa_mae_produto?: string | null
          placa_mae_serial?: string | null
          sistema_operacional?: string | null
          ultimo_visto?: string | null
          usuario_atual?: string | null
          versao_so?: string | null
        }
        Update: {
          arquitetura?: string | null
          criado_em?: string | null
          dominio?: string | null
          fabricante?: string | null
          familia_sistema?: string | null
          id?: string
          ip_interno?: string | null
          ip_publico?: string | null
          modelo?: string | null
          nome_computador?: string
          placa_mae_fabricante?: string | null
          placa_mae_produto?: string | null
          placa_mae_serial?: string | null
          sistema_operacional?: string | null
          ultimo_visto?: string | null
          usuario_atual?: string | null
          versao_so?: string | null
        }
        Relationships: []
      }
      maquinas_programas: {
        Row: {
          id: string
          maquina_id: string
          programa_id: number
        }
        Insert: {
          id?: string
          maquina_id: string
          programa_id: number
        }
        Update: {
          id?: string
          maquina_id?: string
          programa_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "maquinas_programas_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquinas_programas_programa_id_fkey"
            columns: ["programa_id"]
            isOneToOne: false
            referencedRelation: "programas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas_programas_flags: {
        Row: {
          created_at: string
          id: number
          maquina_id: string
          permitiu: boolean
          programa_id: number
          tecnico_permitiu: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          maquina_id?: string
          permitiu?: boolean
          programa_id: number
          tecnico_permitiu?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          maquina_id?: string
          permitiu?: boolean
          programa_id?: number
          tecnico_permitiu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maquinas_programas_flags_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquinas_programas_flags_programa_id_fkey"
            columns: ["programa_id"]
            isOneToOne: false
            referencedRelation: "programas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquinas_programas_flags_tecnico_permitiu_fkey"
            columns: ["tecnico_permitiu"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes_contratos: {
        Row: {
          contrato_id: string
          criada_em: string
          dias_restantes: number
          id: string
          lida: boolean
          mensagem: string
          titulo: string
        }
        Insert: {
          contrato_id: string
          criada_em?: string
          dias_restantes: number
          id?: string
          lida?: boolean
          mensagem: string
          titulo: string
        }
        Update: {
          contrato_id?: string
          criada_em?: string
          dias_restantes?: number
          id?: string
          lida?: boolean
          mensagem?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_contratos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      programas: {
        Row: {
          flag: boolean
          id: number
          nome: string
          publisher: string | null
          versao: string | null
        }
        Insert: {
          flag?: boolean
          id?: number
          nome?: string
          publisher?: string | null
          versao?: string | null
        }
        Update: {
          flag?: boolean
          id?: number
          nome?: string
          publisher?: string | null
          versao?: string | null
        }
        Relationships: []
      }
      programas_blacklist: {
        Row: {
          id: number
          id_tecnico: string | null
          nome: string
        }
        Insert: {
          id?: number
          id_tecnico?: string | null
          nome?: string
        }
        Update: {
          id?: number
          id_tecnico?: string | null
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "programas_blacklist_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      tabela_tempo: {
        Row: {
          id: number
          prioridade: number | null
          tempo: number
        }
        Insert: {
          id?: number
          prioridade?: number | null
          tempo: number
        }
        Update: {
          id?: number
          prioridade?: number | null
          tempo?: number
        }
        Relationships: []
      }
      tecnico_chamadas: {
        Row: {
          created_at: string
          id: string
          id_chamada: string
          id_tecnico: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          id_chamada: string
          id_tecnico?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          id_chamada?: string
          id_tecnico?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "count_chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "join_chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "minhas_chamadas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_chamada_fkey"
            columns: ["id_chamada"]
            isOneToOne: false
            referencedRelation: "minhas_chamadas_andamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      tecnicos: {
        Row: {
          cargo: string | null
          email: string
          id: string
          nome: string
          online: boolean
        }
        Insert: {
          cargo?: string | null
          email: string
          id: string
          nome?: string
          online?: boolean
        }
        Update: {
          cargo?: string | null
          email?: string
          id?: string
          nome?: string
          online?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      chamadas_andamento: {
        Row: {
          categoria: string | null
          contando_desde: string | null
          continuar_contagem: boolean | null
          data_atendeu: string | null
          data_criacao: string | null
          data_finalizacao: string | null
          descricao: string | null
          email_requerente: string | null
          id: string | null
          id_tecnico: string | null
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number | null
          requerente: string | null
          segundos_restantes: number | null
          status: number | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      count_chamadas: {
        Row: {
          categoria: string | null
          contando_desde: string | null
          continuar_contagem: boolean | null
          data_atendeu: string | null
          data_criacao: string | null
          data_finalizacao: string | null
          descricao: string | null
          email_requerente: string | null
          id: string | null
          id_tecnico: string | null
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number | null
          requerente: string | null
          segundos_restantes: number | null
          status: number | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      count_chamadas_abertas: {
        Row: {
          id_tecnico: string | null
          total: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      count_chamadas_atrasadas: {
        Row: {
          id_tecnico: string | null
          total: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      count_chamadas_fechadas: {
        Row: {
          total: number | null
        }
        Relationships: []
      }
      count_chamadas_fechadas_atraso: {
        Row: {
          total: number | null
        }
        Relationships: []
      }
      count_chamadas_paradas: {
        Row: {
          total: number | null
        }
        Relationships: []
      }
      count_chamadas_pausadas: {
        Row: {
          id_tecnico: string | null
          total: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      join_chamadas_andamento: {
        Row: {
          categoria: string | null
          contando_desde: string | null
          continuar_contagem: boolean | null
          data_atendeu: string | null
          data_criacao: string | null
          data_finalizacao: string | null
          descricao: string | null
          email_requerente: string | null
          id: string | null
          id_tecnico: string | null
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number | null
          requerente: string | null
          segundos_restantes: number | null
          status: number | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      minhas_chamadas: {
        Row: {
          categoria: string | null
          contando_desde: string | null
          continuar_contagem: boolean | null
          data_atendeu: string | null
          data_criacao: string | null
          data_finalizacao: string | null
          descricao: string | null
          email_requerente: string | null
          id: string | null
          id_tecnico: string | null
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number | null
          requerente: string | null
          segundos_restantes: number | null
          status: number | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      minhas_chamadas_andamento: {
        Row: {
          categoria: string | null
          contando_desde: string | null
          continuar_contagem: boolean | null
          data_atendeu: string | null
          data_criacao: string | null
          data_finalizacao: string | null
          descricao: string | null
          email_requerente: string | null
          id: string | null
          id_tecnico: string | null
          ip_requerente: string | null
          prazo_final: string | null
          prioridade: number | null
          requerente: string | null
          segundos_restantes: number | null
          status: number | null
          titulo: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_chamadas_id_tecnico_fkey"
            columns: ["id_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      adicionar_tecnico_chamada: {
        Args: { p_id_chamada: string; p_id_tecnico?: string }
        Returns: {
          created_at: string
          id: string
          id_chamada: string
          id_tecnico: string | null
        }
        SetofOptions: {
          from: "*"
          to: "tecnico_chamadas"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      criar_andamento: {
        Args: {
          p_descricao?: string
          p_id_chamada: string
          p_id_tecnico: string
          p_motivo: string
        }
        Returns: {
          descricao: string | null
          id: string
          id_chamada: string
          id_tecnico_atualizou: string | null
          motivo: string
          quando: string
        }
        SetofOptions: {
          from: "*"
          to: "andamentos"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      criar_chamada:
        | {
            Args: {
              p_categoria: string
              p_client_id: string
              p_descricao: string
              p_email: string
              p_ip?: string
              p_requerente: string
              p_titulo: string
            }
            Returns: string
          }
        | {
            Args: {
              p_categoria: string
              p_client_id: string
              p_descricao: string
              p_email: string
              p_ip: string
              p_prioridade: string
              p_requerente: string
              p_titulo: string
            }
            Returns: string
          }
      criar_contrato:
        | {
            Args: {
              p_arquivo: string
              p_data_fim: string
              p_data_inicio: string
              p_empresa: string
              p_servico: string
            }
            Returns: {
              arquivo: string | null
              data_fim: string
              data_inicio: string
              empresa: string
              id: string
              periodo: number | null
              renovado: boolean
              servico: string
              valor_mensal: number | null
            }
            SetofOptions: {
              from: "*"
              to: "contratos"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: {
              p_arquivo: string
              p_data_fim: string
              p_data_inicio: string
              p_empresa: string
              p_servico: string
              p_valor_mensal?: number
            }
            Returns: {
              arquivo: string | null
              data_fim: string
              data_inicio: string
              empresa: string
              id: string
              periodo: number | null
              renovado: boolean
              servico: string
              valor_mensal: number | null
            }
            SetofOptions: {
              from: "*"
              to: "contratos"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      inserir_tecnico_chamada: {
        Args: { p_id_chamada: string; p_id_tecnico: string }
        Returns: {
          created_at: string
          id: string
          id_chamada: string
          id_tecnico: string | null
        }
        SetofOptions: {
          from: "*"
          to: "tecnico_chamadas"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      renovar_contratos: { Args: never; Returns: undefined }
      tratar_contrato: {
        Args: { p_contrato_id: string }
        Returns: {
          arquivo: string | null
          data_fim: string
          data_inicio: string
          empresa: string
          id: string
          periodo: number | null
          renovado: boolean
          servico: string
          valor_mensal: number | null
        }
        SetofOptions: {
          from: "*"
          to: "contratos"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      upsert_maquina_inventario: { Args: { payload: Json }; Returns: undefined }
      verificar_chamadas_atrasadas: { Args: never; Returns: number }
      verificar_vencimento_contratos: { Args: never; Returns: undefined }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
