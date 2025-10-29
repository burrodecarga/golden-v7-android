import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'

export interface TextLogoPrps {
    altura?: number
}
const TextLogo=({ altura=0.07 }: TextLogoPrps) => {
    const windowHeight=Dimensions.get('window').height
    const imgUri='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//logo.png' as const

    return (
        <View style={{ height: windowHeight*altura }}>
            <Image source={{ uri: imgUri }} style={{ width: '100%', height: '100%', resizeMode: 'center', backgroundColor: '#f7f7f8', margin: 0, padding: 0 }} />
        </View>
    )
}

export default TextLogo