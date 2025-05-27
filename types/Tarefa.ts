export type Tarefa = {
  id: string
  titulo: string
  concluida: boolean
  criadaEm: number
  categoria: 'pessoal' | 'trabalho' | 'estudo'
} 