import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTarefasFirebase } from '../hooks/useTarefasFirebase'
import { Button } from '../components/Button'
import { Tarefa } from '../types/Tarefa'

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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Tarefa</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título da tarefa"
          maxLength={100}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {(['pessoal', 'trabalho', 'estudo'] as const).map((cat) => (
            <Button
              key={cat}
              title={cat.charAt(0).toUpperCase() + cat.slice(1)}
              onPress={() => setCategoria(cat)}
              style={categoria === cat ? styles.botaoCategoriaAtivo : styles.botaoCategoria}
            />
          ))}
        </View>

        <View style={styles.acoes}>
          <Button
            title="Cancelar"
            onPress={() => router.back()}
            style={styles.botaoCancelar}
          />
          <Button
            title="Salvar"
            onPress={handleSalvar}
            style={styles.botaoSalvar}
          />
        </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  form: {
    gap: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  categorias: {
    flexDirection: 'row',
    gap: 8
  },
  botaoCategoria: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  botaoCategoriaAtivo: {
    flex: 1,
    backgroundColor: '#007AFF'
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#666'
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: '#4CAF50'
  }
}) 