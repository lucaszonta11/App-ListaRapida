import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { LogBox, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignorar warnings específicos se necessário
  }, []);

  console.log('setLoading(false) chamado');

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#f4511e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Lista Rápida',
            headerRight: () => (
              <Ionicons 
                name="add-circle-outline" 
                size={24} 
                color="#f4511e" 
                style={{ marginRight: 16 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: 'Nova Tarefa',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
} 