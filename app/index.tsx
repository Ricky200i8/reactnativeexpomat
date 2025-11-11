// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from '@/components/textField';
import "@/global.css";

export default function App() {
  return (

      <SafeAreaView className="flex-1 bg-gray-100">
        <LoginScreen />
      </SafeAreaView>

  );
}
