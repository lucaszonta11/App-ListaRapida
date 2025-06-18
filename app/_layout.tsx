import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "./theme"; //

export default function Layout() {
  useEffect(() => {
    LogBox.ignoreLogs(["Warning: ..."]);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Navegação com stack e telas definidas */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Tela inicial */}
        <Stack.Screen
          name="index"
          options={{
            title: "Lista Rápida",
            headerRight: () => (
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 16 }}
              />
            ),
          }}
        />

        {/* Tela de adicionar tarefa como modal */}
        <Stack.Screen
          name="add"
          options={{
            title: "Nova Tarefa",
            presentation: "modal", // Abre como modal
          }}
        />
      </Stack>
    </>
  );
}
