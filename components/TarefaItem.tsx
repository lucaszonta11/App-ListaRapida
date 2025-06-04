import { View, Text, TouchableOpacity, StyleSheet, Pressable, Animated } from 'react-native'
import { Tarefa } from '../types/Tarefa'
import { Ionicons } from '@expo/vector-icons'
import { theme, categoriaIcons, categoriaColors } from '../app/theme'
import { useEffect, useRef } from 'react'

type Props = {
  tarefa: Tarefa
  aoConcluir: () => void
  aoExcluir: () => void
}

export default function TarefaItem({ tarefa, aoConcluir, aoExcluir }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };

  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: theme.animation.duration.fast,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: theme.animation.duration.fast,
        useNativeDriver: true
      })
    ]).start(() => {
      aoExcluir();
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      <Pressable 
        style={styles.content}
        onPress={aoConcluir}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={[
          styles.checkbox,
          tarefa.concluida && styles.checkboxCompleted,
          { borderColor: categoriaColors[tarefa.categoria] }
        ]}>
          {tarefa.concluida && (
            <Ionicons 
              name="checkmark" 
              size={16} 
              color={theme.colors.text.inverse} 
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={[
            styles.titulo,
            tarefa.concluida && styles.tituloConcluido
          ]}>
            {tarefa.titulo}
          </Text>
          <View style={styles.metaInfo}>
            <View style={[
              styles.categoria,
              { backgroundColor: categoriaColors[tarefa.categoria] }
            ]}>
              <Ionicons 
                name={categoriaIcons[tarefa.categoria]} 
                size={12} 
                color={theme.colors.text.inverse} 
                style={styles.categoriaIcon}
              />
              <Text style={styles.categoriaText}>
                {tarefa.categoria.charAt(0).toUpperCase() + tarefa.categoria.slice(1)}
              </Text>
            </View>
            <Text style={styles.data}>
              {new Date(tarefa.criadaEm).toLocaleDateString()} {new Date(tarefa.criadaEm).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable 
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed
        ]}
        onPress={handleDelete}
      >
        <Ionicons 
          name="trash-outline" 
          size={24} 
          color={theme.colors.error} 
        />
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.round,
    borderWidth: 2,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.disabled,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  categoria: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
  },
  categoriaIcon: {
    marginRight: theme.spacing.xs,
  },
  categoriaText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '500',
  },
  data: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  deleteButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  deleteButtonPressed: {
    backgroundColor: theme.colors.background.tertiary,
  },
}); 