export const theme = {
  colors: {
    primary: '#f4511e',
    secondary: '#2196F3',
    success: '#4CAF50',
    warning: '#FFA000',
    error: '#f44336',
    background: {
      primary: '#f8f9fa',
      secondary: '#ffffff',
      tertiary: '#f1f3f5'
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
      disabled: '#adb5bd',
      inverse: '#ffffff'
    },
    border: '#dee2e6',
    overlay: 'rgba(0, 0, 0, 0.5)',
    // Cores específicas para categorias
    category: {
      pessoal: '#4CAF50',
      trabalho: '#2196F3',
      estudo: '#9C27B0',
      todos: '#6c757d'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 4
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 8,
      elevation: 8
    }
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      letterSpacing: -0.5
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
      letterSpacing: -0.25
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      letterSpacing: 0
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  },
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      easeIn: 'ease-in'
    }
  }
} as const;

// Ícones para cada categoria com cores correspondentes
export const categoriaConfig = {
  pessoal: {
    icon: 'person-outline',
    color: theme.colors.category.pessoal,
    backgroundColor: `${theme.colors.category.pessoal}15`
  },
  trabalho: {
    icon: 'briefcase-outline',
    color: theme.colors.category.trabalho,
    backgroundColor: `${theme.colors.category.trabalho}15`
  },
  estudo: {
    icon: 'book-outline',
    color: theme.colors.category.estudo,
    backgroundColor: `${theme.colors.category.estudo}15`
  },
  todos: {
    icon: 'apps-outline',
    color: theme.colors.category.todos,
    backgroundColor: `${theme.colors.category.todos}15`
  }
} as const; 