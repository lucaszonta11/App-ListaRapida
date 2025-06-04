import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      router.push({
        pathname: './',
        params: { newTask: taskTitle.trim() }
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={24} color={theme.colors.text.secondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Digite a nova tarefa"
            placeholderTextColor={theme.colors.text.secondary}
            value={taskTitle}
            onChangeText={setTaskTitle}
            autoFocus
            multiline
            maxLength={100}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !taskTitle.trim() && styles.buttonDisabled]}
          onPress={handleAddTask}
          disabled={!taskTitle.trim()}
        >
          <Ionicons name="add-circle-outline" size={24} color={theme.colors.white} style={styles.buttonIcon} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 100,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
    paddingVertical: theme.spacing.sm,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.text.disabled,
  },
  buttonIcon: {
    marginRight: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.body.fontSize,
  },
}); 