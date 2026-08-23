export interface Permissao {
  id: string;
  nome: string;
  descricao?: string;
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface Role {
  id: string;
  nome: string;
  descricao?: string;
  permissoes: Permissao[];
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface Cargo {
  id: string;
  nome: string;
  descricao?: string;
  nivel_hierarquico: number;
  salario_base?: number;
  departamento_id?: string;
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  rg?: string;
  telefone?: string;
  celular?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  data_nascimento?: Date | string;
  data_admissao?: Date | string;
  data_demissao?: Date | string;
  ativo: boolean;
  avatar_url?: string;
  cargo_id?: string;
  cargo?: Cargo;
  role_id?: string;
  role?: Role;
  departamento_id?: string;
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface Sessao {
  id: string;
  user_id: string;
  user?: User;
  token: string;
  ip_address?: string;
  user_agent?: string;
  data_inicio: Date | string;
  data_expiracao?: Date | string;
  ativa: boolean;
}

export interface Departamento {
  id: string;
  nome: string;
  descricao?: string;
  responsavel_id?: string;
  responsavel?: User;
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface Empresa {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  site?: string;
  logo_url?: string;
  criado_em: Date | string;
  atualizado_em?: Date | string;
}

export interface Auditoria {
  id: string;
  user_id?: string;
  user?: User;
  acao: string;
  entidade: string;
  entidade_id?: string;
  dados_anteriores?: Record<string, unknown>;
  dados_novos?: Record<string, unknown>;
  ip_address?: string;
  criado_em: Date | string;
}

export type TipoStatus = "ativo" | "inativo" | "pendente" | "cancelado" | "concluido";

export interface Paginacao<T> {
  dados: T[];
  pagina: number;
  por_pagina: number;
  total: number;
  total_paginas: number;
}

export interface RespostaAPI<T> {
  sucesso: boolean;
  dados?: T;
  mensagem?: string;
  erros?: string[];
}
