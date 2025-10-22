
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "@/lib/schemas"

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      console.log("Login data:", data)
      Alert.alert("Éxito", "Login exitoso")
    } catch (error) {
      Alert.alert("Error", "Hubo un error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (

      <View className="flex-1 p-5 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center text-black">Iniciar Sesión</Text>

        <View className="w-full">
          {/* Email Input */}
          <View className="mb-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`h-12 border rounded-lg px-4 text-base text-black ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="tu@email.com"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              )}
            />
            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email.message}</Text>}
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`h-12 border rounded-lg px-4 text-base text-black ${
                    errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Contraseña"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  editable={!isLoading}
                />
              )}
            />
            {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className={`h-12 bg-blue-500 rounded-lg justify-center items-center mt-5 ${isLoading ? "opacity-60" : ""}`}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold">Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
  )
}
