import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Alert, Platform } from 'react-native';
import { useTarefasFirebase } from '../hooks/useTarefasFirebase';
import { Button } from '../components/Button';
import { Tarefa } from '../types/Tarefa';
import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import { theme, categoriaConfig } from './theme';
import { TarefaItem } from '../components/TarefaItem';
import { Ionicons } from '@expo/vector-icons';

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
  const secoes: TarefaSecao[] = Object.entries(tarefasPorCategoria)
    .filter(([categoria]) => categoriaFiltro === 'todos' || categoria === categoriaFiltro)
    .map(([categoria, tarefas]) => ({
      title: categoria.charAt(0).toUpperCase() + categoria.slice(1),
      data: tarefas
    }));

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExcluir = async (id: string) => {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');
      if (confirmar) {
        await excluirTarefa(id);
        showMessage({
          message: 'Tarefa excluída com sucesso!',
          type: 'success',
        });
      }
    } else {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir esta tarefa?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              await excluirTarefa(id);
              showMessage({
                message: 'Tarefa excluída com sucesso!',
                type: 'success',
              });
            }
          }
        ]
      );
    }
  };

  const renderItem = ({ item }: { item: Tarefa }) => (
    <TarefaItem
      tarefa={item}
      onToggleComplete={concluirTarefa}
      onDelete={handleExcluir}
      onPress={() => router.push({
        pathname: '/tarefa/[id]',
        params: { id: item.id }
      })}
    />
  );

  const renderSectionHeader = ({ section }: { section: TarefaSecao }) => {
    const categoria = categoriaConfig[section.title.toLowerCase() as keyof typeof categoriaConfig];
    return (
      <View style={[styles.secaoHeader, { backgroundColor: categoria.backgroundColor }]}>
        <Ionicons name={categoria.icon as any} size={20} color={categoria.color} />
        <Text style={[styles.secaoTitulo, { color: categoria.color }]}>
          {section.title}
        </Text>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <Button 
          title="Tentar novamente" 
          onPress={() => window.location.reload()} 
          style={styles.errorButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista Rápida</Text>
        <View style={styles.filtros}>
          {Object.entries(categoriaConfig).map(([key, config]: [string, typeof categoriaConfig[string]]) => (
            <Button
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              onPress={() => setCategoriaFiltro(key as Tarefa['categoria'])}
              style={{
                ...styles.botaoFiltro,
                ...(categoriaFiltro === key ? { backgroundColor: config.color } : {})
              }}
              textStyle={{
                ...styles.filtroTexto,
                ...(categoriaFiltro === key ? styles.filtroTextoAtivo : {})
              }}
              icon={config.icon as keyof typeof Ionicons.glyphMap}
            />
          ))}
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
            contentContainerStyle={styles.listaContainer}
          />
        )}
        keyExtractor={section => section.title}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="list-outline" size={48} color={theme.colors.text.disabled} />
            <Text style={styles.emptyText}>
              Nenhuma tarefa encontrada
            </Text>
            <Text style={styles.emptySubtext}>
              Toque no botão + para adicionar uma nova tarefa
            </Text>
          </View>
        }
      />

      <Button
        title="Nova Tarefa"
        onPress={() => router.push('/nova-tarefa')}
        style={styles.botaoNovaTarefa}
        icon="add-circle-outline"
      />
    </View>
  );
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
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    ...theme.shadows.small,
  },
  titulo: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  botaoFiltro: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
    minWidth: 100,
  },
  filtroTexto: {
    ...theme.typography.button,
    color: theme.colors.text.secondary,
  },
  filtroTextoAtivo: {
    color: theme.colors.text.inverse,
  },
  listaContainer: {
    padding: theme.spacing.md,
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  secaoTitulo: {
    ...theme.typography.h3,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.text.disabled,
    textAlign: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  errorButton: {
    backgroundColor: theme.colors.error,
  },
  botaoNovaTarefa: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    left: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    ...theme.shadows.medium,
  },
}); 