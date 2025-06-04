import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { useTarefasFirebase } from '../hooks/useTarefasFirebase'
import { Ionicons } from '@expo/vector-icons'
import { Tarefa } from '../types/Tarefa'

export default function Nova() {
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState<Tarefa['categoria']>('pessoal')
  const { adicionarTarefa } = useTarefasFirebase()

  const categorias: Tarefa['categoria'][] = ['pessoal', 'trabalho', 'estudo']

  async function salvar() {
    if (!titulo.trim()) return
    const sucesso = await adicionarTarefa(titulo, categoria)
    if (sucesso) {
      router.replace('./')
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite a nova tarefa"
            placeholderTextColor="#666"
            value={titulo}
            onChangeText={setTitulo}
            autoFocus
            multiline
            maxLength={100}
          />
        </View>

        <View style={styles.categoriasContainer}>
          <Text style={styles.categoriasTitulo}>Categoria:</Text>
          <View style={styles.categorias}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoriaButton,
                  categoria === cat && styles.categoriaButtonSelected
                ]}
                onPress={() => setCategoria(cat)}
              >
                <Text style={[
                  styles.categoriaText,
                  categoria === cat && styles.categoriaTextSelected
                ]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !titulo.trim() && styles.buttonDisabled]}
          onPress={salvar}
          disabled={!titulo.trim()}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Adicionar Tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 100,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  categoriasContainer: {
    marginBottom: 20,
  },
  categoriasTitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriaButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  categoriaButtonSelected: {
    backgroundColor: '#f4511e',
  },
  categoriaText: {
    color: '#666',
    fontSize: 14,
  },
  categoriaTextSelected: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
}); 