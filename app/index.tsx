import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useTarefasFirebase } from '../hooks/useTarefasFirebase';
import { Button } from '../components/Button';
import { Tarefa } from '../types/Tarefa';
import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

type TarefaSecao = {
  title: string;
  data: Tarefa[];
};

export default function Home() {
  const router = useRouter();
  const { 
    tarefas, 
    loading, 
    error, 
    adicionarTarefa, 
    concluirTarefa, 
    excluirTarefa,
    categoriaFiltro,
    setCategoriaFiltro
  } = useTarefasFirebase();
  const [refreshing, setRefreshing] = useState(false);

  // Agrupar tarefas por categoria
  const tarefasPorCategoria = tarefas.reduce((acc, tarefa) => {
    const categoria = tarefa.categoria;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(tarefa);
    return acc;
  }, {} as Record<Tarefa['categoria'], Tarefa[]>);

  // Criar seções para a FlatList
  const secoes: TarefaSecao[] = Object.entries(tarefasPorCategoria).map(([categoria, tarefas]) => ({
    title: categoria.charAt(0).toUpperCase() + categoria.slice(1),
    data: tarefas
  }));

  const onRefresh = async () => {
    setRefreshing(true);
    // O Firebase já atualiza automaticamente, mas podemos adicionar lógica adicional aqui
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExcluir = async (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            const sucesso = await excluirTarefa(id);
            if (sucesso) {
              showMessage({
                message: 'Tarefa excluída com sucesso!',
                type: 'success'
              });
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Tarefa }) => (
    <View style={styles.tarefaItem}>
      <View style={styles.tarefaInfo}>
        <Text style={[
          styles.tarefaTitulo,
          item.concluida && styles.tarefaConcluida
        ]}>
          {item.titulo}
        </Text>
        <Text style={styles.tarefaData}>
          {new Date(item.criadaEm).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.tarefaAcoes}>
        <Button
          title={item.concluida ? '✓' : '○'}
          onPress={() => concluirTarefa(item.id)}
          style={item.concluida ? styles.botaoConcluido : styles.botaoPendente}
        />
        <Button
          title="Detalhes"
          onPress={() => router.push({
            pathname: '/tarefa/[id]',
            params: { id: item.id }
          })}
          style={styles.botaoDetalhes}
        />
        <Button
          title="×"
          onPress={() => handleExcluir(item.id)}
          style={styles.botaoExcluir}
        />
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: TarefaSecao }) => (
    <View style={styles.secaoHeader}>
      <Text style={styles.secaoTitulo}>{section.title}</Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button 
          title="Tentar novamente" 
          onPress={() => window.location.reload()} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista Rápida</Text>
        <View style={styles.filtros}>
          <Button
            title="Todos"
            onPress={() => setCategoriaFiltro('todos')}
            style={{ ...styles.botaoFiltro, ...(categoriaFiltro === 'todos' ? styles.botaoFiltroAtivo : {}) }}
            textStyle={categoriaFiltro === 'todos' ? styles.filtroTextoAtivo : styles.filtroTexto}
          />
          <Button
            title="Pessoal"
            onPress={() => setCategoriaFiltro('pessoal')}
            style={{ ...styles.botaoFiltro, ...(categoriaFiltro === 'pessoal' ? styles.botaoFiltroAtivo : {}) }}
            textStyle={categoriaFiltro === 'pessoal' ? styles.filtroTextoAtivo : styles.filtroTexto}
          />
          <Button
            title="Trabalho"
            onPress={() => setCategoriaFiltro('trabalho')}
            style={{ ...styles.botaoFiltro, ...(categoriaFiltro === 'trabalho' ? styles.botaoFiltroAtivo : {}) }}
            textStyle={categoriaFiltro === 'trabalho' ? styles.filtroTextoAtivo : styles.filtroTexto}
          />
          <Button
            title="Estudo"
            onPress={() => setCategoriaFiltro('estudo')}
            style={{ ...styles.botaoFiltro, ...(categoriaFiltro === 'estudo' ? styles.botaoFiltroAtivo : {}) }}
            textStyle={categoriaFiltro === 'estudo' ? styles.filtroTextoAtivo : styles.filtroTexto}
          />
        </View>
      </View>

      <FlatList
        data={secoes}
        renderItem={({ item }) => (
          <FlatList
            data={item.data}
            renderItem={renderItem}
            keyExtractor={tarefa => tarefa.id}
            ListHeaderComponent={() => renderSectionHeader({ section: item })}
          />
        )}
        keyExtractor={section => section.title}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma tarefa encontrada
            </Text>
          </View>
        }
      />

      <Button
        title="Nova Tarefa"
        onPress={() => router.push('/nova-tarefa')}
        style={styles.botaoNovaTarefa}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  botaoFiltro: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    minWidth: 100,
    transitionProperty: 'background-color',
    transitionDuration: '0.2s',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#f4511e',
  },
  filtroTexto: {
    color: '#888',
    fontWeight: 'bold',
  },
  filtroTextoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secaoHeader: {
    backgroundColor: '#f8f8f8',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tarefaItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tarefaInfo: {
    flex: 1,
  },
  tarefaTitulo: {
    fontSize: 16,
    marginBottom: 4,
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  tarefaData: {
    fontSize: 12,
    color: '#888',
  },
  tarefaAcoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoConcluido: {
    backgroundColor: '#4CAF50',
    padding: 8,
    minWidth: 40,
    borderRadius: 8,
  },
  botaoPendente: {
    backgroundColor: '#FFA000',
    padding: 8,
    minWidth: 40,
    borderRadius: 8,
  },
  botaoExcluir: {
    backgroundColor: '#f44336',
    padding: 8,
    minWidth: 40,
    borderRadius: 8,
  },
  botaoDetalhes: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
  },
  botaoNovaTarefa: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    left: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  errorText: {
    color: '#f44336',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
}); 