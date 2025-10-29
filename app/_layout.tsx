import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'


import { useColorScheme } from '@/hooks/use-color-scheme'
import { AuthProvider, useUserInfo } from '@/lib/userContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const unstable_settings={
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme=useColorScheme()

  const SessionLayout=() => {
    const { session, profile, loading }=useUserInfo()
    //console.log('BDC-Profile', profile)

    let isAuthenticated=false

    if (session) {
      isAuthenticated=true
    }
    return (
      <ThemeProvider value={colorScheme==='dark'? DarkTheme:DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name='(auth)' />
          </Stack.Protected>

          <Stack.Protected guard={!!isAuthenticated}>
            <Stack.Screen name='(home)' options={{ headerShown: false, }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>

    )
  }

  const queryClient=new QueryClient()
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SessionLayout />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
