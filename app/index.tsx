import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTarefas } from '../hooks/useTarefas';
import TarefaItem from '../components/TarefaItem';
import { Tarefa } from '../types/Tarefa';

export default function Home() {
  const { tarefas, concluirTarefa, excluirTarefa, categoriaFiltro, setCategoriaFiltro } = useTarefas();

  const categorias: ('todos' | Tarefa['categoria'])[] = ['todos', 'pessoal', 'trabalho', 'estudo'];

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirTarefa(id), style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista Rápida</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('./nova')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtrosContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filtroButton,
                categoriaFiltro === cat && styles.filtroButtonSelected
              ]}
              onPress={() => setCategoriaFiltro(cat)}
            >
              <Text style={[
                styles.filtroText,
                categoriaFiltro === cat && styles.filtroTextSelected
              ]}>
                {cat === 'todos' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            aoConcluir={() => concluirTarefa(item.id)}
            aoExcluir={() => handleDeleteTask(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="list" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filtrosContainer: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtroButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  filtroButtonSelected: {
    backgroundColor: '#f4511e',
  },
  filtroText: {
    color: '#666',
    fontSize: 14,
  },
  filtroTextSelected: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
}); 