import { Image, StyleSheet } from 'react-native'
import React from 'react'

const MiniLogo=() => {
    const imgUri='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//logo.png'
    return (

        <Image source={{ uri: imgUri }} style={{ width: '100%', height: '100%', resizeMode: 'center', backgroundColor: '#f7f7f8', margin: 0, padding: 0 }} />

    )
}

const styles=StyleSheet.create({
    container: {
        marginVertical: 0
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
        paddingHorizontal: 16
    },

    username: {
        fontWeight: "bold",
        marginLeft: 8
    },
    imageContainer: {
        width: "100%",
        height: 200
    },
    image: {
        width: "100%",
        resizeMode: "contain",
        aspectRatio: 1
    },
    content: {
        padding: 16,
        textAlign: "justify"
    },

    footer: {
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})


export default MiniLogo