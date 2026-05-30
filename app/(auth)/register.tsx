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

import { signUpWithEmail } from '../../src/hooks/useAuth'
import { colors } from '../../src/theme'

export default function RegisterScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      await signUpWithEmail(name.trim(), email.trim(), password)
      setSuccess(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao criar conta.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 16 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: `${colors.secondary}1A`,
              borderWidth: 1,
              borderColor: `${colors.secondary}40`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="check-circle" size={38} color={colors.secondary} />
          </View>
          <Text
            style={{
              fontFamily: 'Anybody_800ExtraBold',
              fontSize: 22,
              color: colors.onSurface,
              textAlign: 'center',
            }}
          >
            Conta criada!
          </Text>
          <Text
            style={{
              fontFamily: 'WorkSans_400Regular',
              fontSize: 14,
              color: colors.onSurfaceVariant,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            Verifique seu e-mail para confirmar a conta e depois faça login.
          </Text>
          <Pressable
            onPress={() => router.replace('/(auth)/login')}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 16,
              paddingHorizontal: 32,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontFamily: 'Anybody_700Bold',
                fontSize: 15,
                color: colors.onPrimary,
                letterSpacing: 0.8,
              }}
            >
              IR PARA O LOGIN
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
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
          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 32 }}
            hitSlop={8}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.onSurfaceVariant} />
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                color: colors.onSurfaceVariant,
              }}
            >
              Voltar
            </Text>
          </Pressable>

          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily: 'Anybody_800ExtraBold',
                fontSize: 26,
                color: colors.onSurface,
                marginBottom: 8,
              }}
            >
              Criar conta
            </Text>
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                color: colors.onSurfaceVariant,
                lineHeight: 20,
              }}
            >
              Salve seus favoritos, acompanhe palpites e muito mais.
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {/* Name */}
            <View>
              <Text style={labelStyle}>Nome</Text>
              <TextInput
                style={inputStyle}
                placeholder="Seu nome"
                placeholderTextColor={`${colors.onSurfaceVariant}60`}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

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
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor={`${colors.onSurfaceVariant}60`}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
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

            {/* Confirm password */}
            <View>
              <Text style={labelStyle}>Confirmar senha</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={[inputStyle, { paddingRight: 48 }]}
                  placeholder="Repita a senha"
                  placeholderTextColor={`${colors.onSurfaceVariant}60`}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                />
                <Pressable
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: 14, top: 14 }}
                  hitSlop={8}
                >
                  <MaterialIcons
                    name={showConfirm ? 'visibility-off' : 'visibility'}
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
          </View>

          {/* Register button */}
          <Pressable
            onPress={handleRegister}
            disabled={isLoading}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 32,
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
                CRIAR CONTA
              </Text>
            )}
          </Pressable>

          {/* Login link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
            <Text
              style={{
                fontFamily: 'WorkSans_400Regular',
                fontSize: 14,
                color: colors.onSurfaceVariant,
              }}
            >
              Já tem conta?
            </Text>
            <Pressable onPress={() => router.replace('/(auth)/login')}>
              <Text
                style={{
                  fontFamily: 'Anybody_700Bold',
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
                Fazer login
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
