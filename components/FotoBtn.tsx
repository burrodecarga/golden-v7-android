import { RelativePathString, router } from 'expo-router'
import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ExternalPathString } from 'expo-router'

export interface FotoProps {
    id: string,
    name: string,
    uri: string|null|undefined
    size?: number
}

export interface FotoProps1 {
    uri: string|null|undefined
    size?: number
    name?: string,
    pathname?: any
}

const xpath='/(home)/(admin)/(servicios)/(servicio)/(images)/zoom' as RelativePathString
const imgUri='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//logo.png'

const FotoBtn=({ uri=imgUri, size=32, name='Reserva', pathname=xpath }: FotoProps1) => {

    const windowWidth=Dimensions.get('window').width
    const windowHeight=Dimensions.get('window').height

    return (
        <TouchableOpacity
            onLongPress={() => router.push({ pathname: pathname!, params: { uri: uri } })}
            style={styles.container}
        >
            <View style={{ alignItems: 'center', width: 100, height: 100 }}>
                <ThemedText type='subtitle' style={{ fontSize: 12 }}>{name}</ThemedText>
                {uri&&<Image source={{ uri }} style={[styles.image, { height: 80, width: 80 }]} />}

            </View>
        </TouchableOpacity>
    )
}

export default FotoBtn

const styles=StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f8',
        height: 100,
        width: 100
    },
    image: {
        marginTop: 2,
        backgroundColor: 'white',
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderColor: 'gray',
        borderRadius: 6,
        borderWidth: 1,
        padding: 10

    }
})