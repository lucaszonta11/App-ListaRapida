import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { Tarefa } from '../types/Tarefa'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  tarefa: Tarefa
  aoConcluir: () => void
  aoExcluir: () => void
}

export default function TarefaItem({ tarefa, aoConcluir, aoExcluir }: Props) {
  const getCategoriaColor = (categoria: Tarefa['categoria']) => {
    switch (categoria) {
      case 'pessoal':
        return '#4CAF50'
      case 'trabalho':
        return '#2196F3'
      case 'estudo':
        return '#9C27B0'
      default:
        return '#666'
    }
  }

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.content}
        onPress={aoConcluir}
      >
        <View style={[styles.checkbox, tarefa.concluida && styles.checkboxCompleted]}>
          {tarefa.concluida && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.titulo, tarefa.concluida && styles.tituloConcluido]}>
            {tarefa.titulo}
          </Text>
          <View style={[styles.categoria, { backgroundColor: getCategoriaColor(tarefa.categoria) }]}>
            <Text style={styles.categoriaText}>
              {tarefa.categoria.charAt(0).toUpperCase() + tarefa.categoria.slice(1)}
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable 
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed
        ]}
        onPress={aoExcluir}
      >
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f4511e',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#f4511e',
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  categoria: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoriaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonPressed: {
    backgroundColor: '#ffeeee',
  },
}); 