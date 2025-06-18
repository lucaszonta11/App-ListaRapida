import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, categoriaConfig } from '../app/theme';
import { Tarefa } from '../types/Tarefa';

interface TarefaItemProps {
  tarefa: Tarefa;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: () => void;
}

export function TarefaItem({ tarefa, onToggleComplete, onDelete, onPress }: TarefaItemProps) {
  const categoria = categoriaConfig[tarefa.categoria];
  const dataFormatada = new Date(tarefa.criadaEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: categoria.backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.checkbox, tarefa.concluida && styles.checkboxChecked]}
          onPress={() => onToggleComplete(tarefa.id)}
        >
          {tarefa.concluida && (
            <Ionicons name="checkmark" size={16} color={theme.colors.text.inverse} />
          )}
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={[
            styles.title,
            tarefa.concluida && styles.titleChecked
          ]}>
            {tarefa.titulo}
          </Text>
          
          <View style={styles.meta}>
            <View style={styles.categoria}>
              <Ionicons 
                name={categoria.icon as any} 
                size={14} 
                color={categoria.color} 
              />
              <Text style={[styles.categoriaText, { color: categoria.color }]}>
                {tarefa.categoria.charAt(0).toUpperCase() + tarefa.categoria.slice(1)}
              </Text>
            </View>
            
            <Text style={styles.data}>{dataFormatada}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(tarefa.id)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.round,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
  info: {
    flex: 1,
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  titleChecked: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.disabled,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  categoriaText: {
    ...theme.typography.caption,
    fontWeight: '500',
  },
  data: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  deleteButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
}); 