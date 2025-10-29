import { primary } from '@/constants/Colors'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading=() => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color={primary} />
        </View>
    )
}

export default Loading