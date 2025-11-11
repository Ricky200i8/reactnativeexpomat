import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    username: z.string().min(3, "Nombre demasiado corto"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: (data: RegisterForm) => void;
  onToggle: () => void;
}

export default function RegisterForm({ onSuccess, onToggle }: RegisterFormProps) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  return (
    <View>
      <Text className="text-3xl font-bold mb-8 text-center">Register</Text>

      {/* Username */}
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value, onBlur } }) => (
          <View className="mb-4">
            <Text className="text-sm mb-1">Username</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Tu nombre"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.username && <Text className="text-red-500 mt-1">{String(errors.username.message)}</Text>}
          </View>
        )}
      />

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

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, onBlur } }) => (
          <View className="mb-4">
            <Text className="text-sm mb-1">Confirm Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Confirma tu contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.confirmPassword && <Text className="text-red-500 mt-1">{String(errors.confirmPassword.message)}</Text>}
          </View>
        )}
      />

      <TouchableOpacity
        className={`mt-2 rounded-lg px-4 py-3 items-center ${isSubmitting ? "bg-gray-300" : "bg-blue-600"}`}
        onPress={handleSubmit(onSuccess)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <ActivityIndicator /> : <Text className="text-white font-medium">Sign Up</Text>}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
        <TouchableOpacity onPress={onToggle}>
          <Text className="text-blue-600 font-medium">Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
