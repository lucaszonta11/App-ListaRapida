export const theme = {
  colors: {
    primary: '#f4511e',
    secondary: '#2196F3',
    success: '#4CAF50',
    warning: '#FFA000',
    error: '#f44336',
    background: {
      primary: '#f7f7f7',
      secondary: '#ffffff',
      tertiary: '#f0f0f0'
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#888888',
      inverse: '#ffffff'
    },
    border: '#e0e0e0',
    overlay: 'rgba(0, 0, 0, 0.5)'
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
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8
    }
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28
    },
    body: {
      fontSize: 16,
      lineHeight: 24
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20
    },
    caption: {
      fontSize: 12,
      lineHeight: 16
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24
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

// Ícones para cada categoria
export const categoriaIcons = {
  pessoal: 'person-outline',
  trabalho: 'briefcase-outline',
  estudo: 'book-outline',
  todos: 'apps-outline'
} as const;

// Cores para cada categoria
export const categoriaColors = {
  pessoal: '#4CAF50',
  trabalho: '#2196F3',
  estudo: '#9C27B0',
  todos: '#666666'
} as const; 