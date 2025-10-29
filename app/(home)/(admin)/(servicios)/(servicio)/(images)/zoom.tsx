import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const FotoZoom=() => {
    const { uri }=useLocalSearchParams()

    return (
        <>
            <TouchableOpacity onPress={() => router.back()} className='p-4'>
                <Ionicons name='chevron-back' size={24} />
            </TouchableOpacity>
            <ImageZoom uri={uri as string} />

        </>
    )
}

export default FotoZoom

const styles=StyleSheet.create({})