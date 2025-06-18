import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTarefasFirebase } from '../hooks/useTarefasFirebase'
import { Button } from '../components/Button'
import { Tarefa } from '../types/Tarefa'
import { theme, categoriaConfig } from './theme'
import { Ionicons } from '@expo/vector-icons'

export default function NovaTarefa() {
  const router = useRouter()
  const { adicionarTarefa, loading } = useTarefasFirebase()
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState<Tarefa['categoria']>('pessoal')

  const handleSalvar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, digite um título para a tarefa')
      return
    }

    const sucesso = await adicionarTarefa(titulo.trim(), categoria)
    if (sucesso) {
      router.back()
    } else {
      Alert.alert('Erro', 'Não foi possível criar a tarefa')
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="create-outline" size={32} color={theme.colors.primary} />
          <Text style={styles.titulo}>Nova Tarefa</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Digite o título da tarefa"
              placeholderTextColor={theme.colors.text.disabled}
              maxLength={100}
              autoFocus
              multiline
            />
            <Text style={styles.contador}>
              {titulo.length}/100
            </Text>
          </View>

          <View style={styles.categoriasContainer}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categorias}>
              {Object.entries(categoriaConfig).map(([key, config]) => (
                <Button
                  key={key}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  onPress={() => setCategoria(key as Tarefa['categoria'])}
                  style={{
                    ...styles.botaoCategoria,
                    ...(categoria === key ? { 
                      backgroundColor: config.color,
                      ...theme.shadows.medium
                    } : {})
                  }}
                  textStyle={{
                    ...styles.botaoCategoriaTexto,
                    ...(categoria === key ? styles.botaoCategoriaTextoAtivo : {})
                  }}
                  icon={config.icon as keyof typeof Ionicons.glyphMap}
                />
              ))}
            </View>
          </View>

          <View style={styles.preview}>
            <Text style={styles.previewLabel}>Preview</Text>
            <View style={[
              styles.previewCard,
              { backgroundColor: categoriaConfig[categoria].backgroundColor }
            ]}>
              <View style={styles.previewHeader}>
                <Ionicons 
                  name={categoriaConfig[categoria].icon as any} 
                  size={20} 
                  color={categoriaConfig[categoria].color} 
                />
                <Text style={[
                  styles.previewCategoria,
                  { color: categoriaConfig[categoria].color }
                ]}>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </Text>
              </View>
              <Text style={styles.previewTitulo} numberOfLines={2}>
                {titulo || 'Título da tarefa'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.acoes}>
          <Button
            title="Cancelar"
            onPress={() => router.back()}
            style={styles.botaoCancelar}
            icon="close-outline"
          />
          <Button
            title="Salvar"
            onPress={handleSalvar}
            style={styles.botaoSalvar}
            icon="checkmark-outline"
            disabled={!titulo.trim()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  titulo: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  form: {
    gap: theme.spacing.lg,
  },
  inputContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  contador: {
    ...theme.typography.caption,
    color: theme.colors.text.disabled,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
  categoriasContainer: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  categorias: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  botaoCategoria: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
  },
  botaoCategoriaTexto: {
    ...theme.typography.button,
    color: theme.colors.text.secondary,
  },
  botaoCategoriaTextoAtivo: {
    color: theme.colors.text.inverse,
  },
  preview: {
    gap: theme.spacing.sm,
  },
  previewLabel: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  previewCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  previewCategoria: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  previewTitulo: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  acoes: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: theme.colors.text.disabled,
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
}) 