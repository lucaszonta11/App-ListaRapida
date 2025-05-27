import { useState, useEffect } from 'react'
import { Tarefa } from '../types/Tarefa'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()
const chave = 'tarefas'

export function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [categoriaFiltro, setCategoriaFiltro] = useState<'todos' | Tarefa['categoria']>('todos')

  // Carregar tarefas ao iniciar
  useEffect(() => {
    try {
      const dados = storage.getString(chave)
      if (dados) {
        let tarefasCarregadas: Tarefa[] = JSON.parse(dados)
        // Corrige tarefas antigas sem categoria
        tarefasCarregadas = tarefasCarregadas.map(t =>
          t.categoria ? t : { ...t, categoria: 'pessoal' }
        )
        setTarefas(tarefasCarregadas)
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    }
  }, [])

  // Salvar tarefas quando houver mudanças
  useEffect(() => {
    try {
      storage.set(chave, JSON.stringify(tarefas))
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error)
    }
  }, [tarefas])

  function adicionarTarefa(titulo: string, categoria: Tarefa['categoria']) {
    const nova: Tarefa = {
      id: Date.now().toString(),
      titulo,
      concluida: false,
      criadaEm: Date.now(),
      categoria
    }
    setTarefas(prevTarefas => [nova, ...prevTarefas])
  }

  function concluirTarefa(id: string) {
    setTarefas(prevTarefas => 
      prevTarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    )
  }

  function excluirTarefa(id: string) {
    setTarefas(prevTarefas => prevTarefas.filter(t => t.id !== id))
  }

  const tarefasFiltradas = categoriaFiltro === 'todos' 
    ? tarefas 
    : tarefas.filter(t => t.categoria === categoriaFiltro)

  return { 
    tarefas: tarefasFiltradas, 
    adicionarTarefa, 
    concluirTarefa, 
    excluirTarefa,
    categoriaFiltro,
    setCategoriaFiltro
  }
} 