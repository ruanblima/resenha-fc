import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { signInWithEmail } from '../../src/hooks/useAuth'
import { colors } from '../../src/theme'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    if (!email || !password) {
      setError('Preencha e-mail e senha.')
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      await signInWithEmail(email.trim(), password)
      router.replace('/(tabs)')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao fazer login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: `${colors.primary}1A`,
                borderWidth: 1,
                borderColor: `${colors.primary}33`,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <MaterialIcons name="emoji-events" size={38} color={colors.primary} />
            </View>
            <Text
              style={{
                fontFamily: 'Anybody_800ExtraBold',
                fontSize: 26,
                color: colors.primary,
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              RESENHA SCORE
            </Text>
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                color: colors.onSurfaceVariant,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              Acompanhe a Copa do Mundo 2026{'\n'}em tempo real
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {/* Email */}
            <View>
              <Text style={labelStyle}>E-mail</Text>
              <TextInput
                style={inputStyle}
                placeholder="seu@email.com"
                placeholderTextColor={`${colors.onSurfaceVariant}60`}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <View>
              <Text style={labelStyle}>Senha</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={[inputStyle, { paddingRight: 48 }]}
                  placeholder="Sua senha"
                  placeholderTextColor={`${colors.onSurfaceVariant}60`}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: 14 }}
                  hitSlop={8}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    color={colors.onSurfaceVariant}
                  />
                </Pressable>
              </View>
            </View>

            {/* Error */}
            {error && (
              <Text
                style={{
                  fontFamily: 'WorkSans_400Regular',
                  fontSize: 13,
                  color: colors.error,
                  textAlign: 'center',
                }}
              >
                {error}
              </Text>
            )}

            {/* Forgot password */}
            <Pressable onPress={() => {}} style={{ alignSelf: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: 'WorkSans_400Regular',
                  fontSize: 13,
                  color: colors.primary,
                }}
              >
                Esqueceu a senha?
              </Text>
            </Pressable>
          </View>

          {/* Login button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 20,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Anybody_700Bold',
                  fontSize: 15,
                  color: colors.onPrimary,
                  letterSpacing: 0.8,
                }}
              >
                ENTRAR
              </Text>
            )}
          </Pressable>

          {/* Divider */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: `${colors.outlineVariant}60` }} />
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 13,
                color: colors.onSurfaceVariant,
              }}
            >
              ou
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: `${colors.outlineVariant}60` }} />
          </View>

          {/* Skip login */}
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            style={{
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: `${colors.outlineVariant}60`,
              marginBottom: 32,
            }}
          >
            <Text
              style={{
                fontFamily: 'Anybody_700Bold',
                fontSize: 14,
                color: colors.onSurfaceVariant,
                letterSpacing: 0.5,
              }}
            >
              CONTINUAR SEM CONTA
            </Text>
          </Pressable>

          {/* Register link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                color: colors.onSurfaceVariant,
              }}
            >
              Não tem conta?
            </Text>
            <Pressable onPress={() => router.push('/(auth)/register')}>
              <Text
                style={{
                  fontFamily: 'Anybody_700Bold',
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
                Criar conta
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const labelStyle = {
  fontFamily: 'WorkSans_400Regular' as const,
  fontSize: 13,
  color: colors.onSurfaceVariant,
  marginBottom: 6,
}

const inputStyle = {
  backgroundColor: colors.surfaceHigh,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: `${colors.outlineVariant}60`,
  paddingHorizontal: 14,
  paddingVertical: 14,
  fontFamily: 'WorkSans_400Regular' as const,
  fontSize: 15,
  color: colors.onSurface,
}
