import { useState, useEffect } from 'react'
import { Tarefa } from '../types/Tarefa'
import { db } from '../config/firebase'
import { ref, onValue, push, set, update, remove, off } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useTarefasFirebase() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoriaFiltro, setCategoriaFiltro] = useState<'todos' | Tarefa['categoria']>('todos')

  // Carregar tarefas do Firebase
  useEffect(() => {
    const tarefasRef = ref(db, 'tarefas')
    
    const onValueChange = onValue(tarefasRef, snapshot => {
      try {
        const dados = snapshot.val()
        console.log('onValue chamado', dados)
        if (dados) {
          const tarefasArray = Object.entries(dados).map(([id, tarefa]: [string, any]) => ({
            id,
            ...tarefa,
            criadaEm: Number(tarefa.criadaEm)
          }))
          setTarefas(tarefasArray)
        } else {
          setTarefas([])
        }
      } catch (err) {
        setError('Erro ao carregar tarefas')
      } finally {
        setLoading(false)
      }
    }, (err) => {
      setError('Erro ao conectar ao banco: ' + err?.message)
      setLoading(false)
    })

    return () => off(tarefasRef, 'value', onValueChange)
  }, [])

  // Salvar categoria do filtro localmente
  useEffect(() => {
    AsyncStorage.setItem('categoriaFiltro', categoriaFiltro)
  }, [categoriaFiltro])

  // Carregar categoria do filtro ao iniciar
  useEffect(() => {
    AsyncStorage.getItem('categoriaFiltro').then(value => {
      if (value) setCategoriaFiltro(value as Tarefa['categoria'] | 'todos')
    })
  }, [])

  async function adicionarTarefa(titulo: string, categoria: Tarefa['categoria']) {
    try {
      setLoading(true)
      const novaTarefa: Omit<Tarefa, 'id'> = {
        titulo,
        concluida: false,
        criadaEm: Date.now(),
        categoria
      }
      
      const tarefasRef = ref(db, 'tarefas')
      const novaRef = push(tarefasRef)
      await set(novaRef, novaTarefa)
      
      setLoading(false)
      return true
    } catch (err) {
      setError('Erro ao adicionar tarefa')
      setLoading(false)
      return false
    }
  }

  async function editarTarefa(id: string, dados: Partial<Tarefa>) {
    try {
      setLoading(true)
      await update(ref(db, `tarefas/${id}`), dados)
      setLoading(false)
      return true
    } catch (err) {
      setError('Erro ao editar tarefa')
      setLoading(false)
      return false
    }
  }

  async function concluirTarefa(id: string) {
    try {
      setLoading(true)
      const tarefa = tarefas.find(t => t.id === id)
      if (tarefa) {
        await update(ref(db, `tarefas/${id}`), {
          concluida: !tarefa.concluida
        })
      }
      setLoading(false)
      return true
    } catch (err) {
      setError('Erro ao atualizar tarefa')
      setLoading(false)
      return false
    }
  }

  async function excluirTarefa(id: string) {
    try {
      setLoading(true)
      await remove(ref(db, `tarefas/${id}`))
      setLoading(false)
      return true
    } catch (err) {
      setError('Erro ao excluir tarefa')
      setLoading(false)
      return false
    }
  }

  const tarefasFiltradas = categoriaFiltro === 'todos' 
    ? tarefas 
    : tarefas.filter(t => t.categoria === categoriaFiltro)

  return {
    tarefas: tarefasFiltradas,
    loading,
    error,
    adicionarTarefa,
    editarTarefa,
    concluirTarefa,
    excluirTarefa,
    categoriaFiltro,
    setCategoriaFiltro
  }
} 