import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ResumenesLayout=() => {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name='index' />
            <Stack.Screen name='by_chofer' />
            <Stack.Screen name='by_plataforma' />
            <Stack.Screen name='by_vehiculo' />
        </Stack>
    )
}

export default ResumenesLayout