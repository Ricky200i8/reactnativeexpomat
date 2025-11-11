import React, { useState } from "react";
import { View } from "react-native";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import '@/global.css';
export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (data: any) => {
    setTimeout(() => alert(`Login exitoso para ${data.email}`), 800);
  };

  const handleRegister = (data: any) => {
    setTimeout(() => alert(`Registro exitoso para ${data.username}`), 800);
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      {isLogin ? (
        <LoginForm onSuccess={handleLogin} onToggle={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSuccess={handleRegister} onToggle={() => setIsLogin(true)} />
      )}
    </View>
  );
}
