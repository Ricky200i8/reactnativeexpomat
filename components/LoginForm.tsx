import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
type LoginForm = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (data: LoginForm) => void;
  onToggle: () => void;
}

export default function LoginForm({ onSuccess, onToggle }: LoginFormProps) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <View>
      <Text className="text-3xl font-bold mb-8 text-center">Login</Text>

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <View className="mb-4">
            <Text className="text-sm mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="usuario@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.email && <Text className="text-red-500 mt-1">{String(errors.email.message)}</Text>}
          </View>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <View className="mb-4">
            <Text className="text-sm mb-1">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Tu contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.password && <Text className="text-red-500 mt-1">{String(errors.password.message)}</Text>}
          </View>
        )}
      />

      <TouchableOpacity
        className={`mt-2 rounded-lg px-4 py-3 items-center ${isSubmitting ? "bg-gray-300" : "bg-blue-600"}`}
        onPress={handleSubmit(onSuccess)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <ActivityIndicator /> : <Text className="text-white font-medium">Login</Text>}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-600">¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={onToggle}>
          <Text className="text-blue-600 font-medium">Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
