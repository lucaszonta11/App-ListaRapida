import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../app/theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function Button({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled,
  icon
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={20} 
          color={theme.colors.text.inverse} 
          style={styles.icon}
        />
      )}
      <Text style={[
        styles.text,
        disabled && styles.textDisabled,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.text.disabled,
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
  textDisabled: {
    color: theme.colors.text.inverse,
    opacity: 0.7,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
}); 