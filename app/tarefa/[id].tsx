import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTarefasFirebase } from '../../hooks/useTarefasFirebase'
import { Button } from '../../components/Button'
import { useEffect, useState } from 'react'
import { Tarefa } from '../../types/Tarefa'

export default function DetalhesTarefa() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { tarefas, loading, error, editarTarefa, excluirTarefa } = useTarefasFirebase()
  const [tarefa, setTarefa] = useState<Tarefa | null>(null)

  useEffect(() => {
    const tarefaEncontrada = tarefas.find(t => t.id === id)
    if (tarefaEncontrada) {
      setTarefa(tarefaEncontrada)
    }
  }, [tarefas, id])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error || !tarefa) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error || 'Tarefa não encontrada'}
        </Text>
        <Button 
          title="Voltar" 
          onPress={() => router.back()} 
        />
      </View>
    )
  }

  const handleExcluir = async () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            const sucesso = await excluirTarefa(id)
            if (sucesso) {
              router.back()
            }
          }
        }
      ]
    )
  }

  const handleConcluir = async () => {
    const sucesso = await editarTarefa(id, { concluida: !tarefa.concluida })
    if (!sucesso) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{tarefa.titulo}</Text>
        <Text style={styles.categoria}>Categoria: {tarefa.categoria}</Text>
        <Text style={styles.data}>
          Criada em: {new Date(tarefa.criadaEm).toLocaleDateString()}
        </Text>
        <Text style={[
          styles.status,
          tarefa.concluida ? styles.concluida : styles.pendente
        ]}>
          {tarefa.concluida ? 'Concluída' : 'Pendente'}
        </Text>
      </View>

      <View style={styles.acoes}>
        <Button 
          title={tarefa.concluida ? 'Marcar como Pendente' : 'Marcar como Concluída'}
          onPress={handleConcluir}
        />
        <Button 
          title="Excluir Tarefa"
          onPress={handleExcluir}
          style={styles.botaoExcluir}
        />
        <Button 
          title="Voltar"
          onPress={() => router.back()}
          style={styles.botaoVoltar}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 24
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  categoria: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4
  },
  data: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center'
  },
  concluida: {
    backgroundColor: '#e6ffe6',
    color: '#008000'
  },
  pendente: {
    backgroundColor: '#fff3e6',
    color: '#ff8c00'
  },
  acoes: {
    gap: 12
  },
  botaoExcluir: {
    backgroundColor: '#ff4444'
  },
  botaoVoltar: {
    backgroundColor: '#666'
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  }
}) 