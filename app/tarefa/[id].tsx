import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTarefasFirebase } from '../../hooks/useTarefasFirebase'
import { Button } from '../../components/Button'
import { useEffect, useState } from 'react'
import { Tarefa } from '../../types/Tarefa'
import { theme, categoriaConfig } from '../theme'
import { Ionicons } from '@expo/vector-icons'

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  if (error || !tarefa) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>
          {error || 'Tarefa não encontrada'}
        </Text>
        <Button 
          title="Voltar" 
          onPress={() => router.back()} 
          style={styles.errorButton}
          icon="arrow-back-outline"
        />
      </View>
    )
  }

  const categoria = categoriaConfig[tarefa.categoria]
  const dataFormatada = new Date(tarefa.criadaEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

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
      <View style={[styles.header, { backgroundColor: categoria.backgroundColor }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={categoria.color} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.categoriaHeader}>
            <Ionicons name={categoria.icon as any} size={24} color={categoria.color} />
            <Text style={[styles.categoriaText, { color: categoria.color }]}>
              {tarefa.categoria.charAt(0).toUpperCase() + tarefa.categoria.slice(1)}
            </Text>
          </View>
          
          <Text style={styles.titulo}>{tarefa.titulo}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.text.secondary} />
              <Text style={styles.metaText}>{dataFormatada}</Text>
            </View>
            
            <View style={[
              styles.statusBadge,
              { backgroundColor: tarefa.concluida ? theme.colors.success + '15' : theme.colors.warning + '15' }
            ]}>
              <Ionicons 
                name={tarefa.concluida ? 'checkmark-circle' : 'time'} 
                size={16} 
                color={tarefa.concluida ? theme.colors.success : theme.colors.warning} 
              />
              <Text style={[
                styles.statusText,
                { color: tarefa.concluida ? theme.colors.success : theme.colors.warning }
              ]}>
                {tarefa.concluida ? 'Concluída' : 'Pendente'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.acoes}>
          <Button 
            title={tarefa.concluida ? 'Marcar como Pendente' : 'Marcar como Concluída'}
            onPress={handleConcluir}
            style={{
              ...styles.botaoAcao,
              backgroundColor: tarefa.concluida ? theme.colors.warning : theme.colors.success
            }}
            icon={tarefa.concluida ? 'time-outline' : 'checkmark-outline'}
          />
          
          <Button 
            title="Excluir Tarefa"
            onPress={handleExcluir}
            style={styles.botaoExcluir}
            icon="trash-outline"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    zIndex: 1,
    padding: theme.spacing.xs,
  },
  headerContent: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  categoriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  categoriaText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  titulo: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  acoes: {
    gap: theme.spacing.md,
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  botaoExcluir: {
    backgroundColor: theme.colors.error,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: theme.colors.error,
  },
}) 