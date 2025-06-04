import React from 'react'
import { Slot } from 'expo-router';
import FlashMessage from 'react-native-flash-message';
import '../config/firebase';

export default function App() {
  return (
    <>
      <Slot />
      <FlashMessage position="top" />
    </>
  );
}
