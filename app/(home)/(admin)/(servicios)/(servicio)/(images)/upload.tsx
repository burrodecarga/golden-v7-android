import Button from "@/components/Button"
import Loading from "@/components/Loading"
import Card from "@/components/ui/Card"
import { logo, primary } from "@/constants/Colors"
import { WIDTH } from "@/constants/constantes"
import { useServiciosById } from "@/hooks/useServiciosById"
import { updateServicioByBol, updateServicioByPod, updateServicioByRc } from "@/lib/api"
import { supabase } from "@/lib/supabase"
import { Feather } from "@expo/vector-icons"
import { useQueryClient } from "@tanstack/react-query"
import { ImageBackground } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const UploadImageScreen=() => {
    const { id, doc }=useLocalSearchParams()
    const { data: servicio, isLoading }=useServiciosById(id as string)
    const [image, setImage]=useState("")
    const [subiendo, setSubiendo]=useState(false)
    const color=primary
    const queryClient=useQueryClient()
    //console.log(JSON.stringify(servicio, null, 2))
    const handlePickImage=async () => {
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images']
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleSubmit=async (image: string) => {
        try {
            setSubiendo(true)
            let publicUrl=""
            if (image) {
                const fileExt=image.split(".").pop()
                const fileName=image.replace(/^.*[\\\/]/, "")
                const filePath=`${Date.now()}.${fileExt}`

                const formData=new FormData()
                const photo={
                    uri: image,
                    name: fileName,
                    type: `image/${fileExt}`
                } as unknown as Blob
                formData.append("file", photo)

                console.log(photo)

                const { error }=await supabase.storage
                    .from("documentos")
                    .upload(filePath, formData)
                if (error) throw error

                const { data }=supabase.storage.from("documentos").getPublicUrl(filePath)
                publicUrl=data.publicUrl




                if (doc=='BOL') {
                    updateServicioByBol(id as string, publicUrl)
                }
                if (doc=='POD') {
                    updateServicioByPod(id as string, publicUrl)
                }
                if (doc=='RC') {
                    updateServicioByRc(id as string, publicUrl)
                }


                queryClient.invalidateQueries({
                    queryKey: ['servicios']
                })

                await queryClient.refetchQueries({ queryKey: ['servicios'] })
                await queryClient.invalidateQueries()

                //console.log('URL', publicUrl)
                router.replace('/')


                Alert.alert('Servicio de carga guardado', `se guardo correctamente`)

            }

        } catch (error: any) {
            Alert.alert("Server Error", error.message)
        } finally {
            setSubiendo(false)
        }
    }


    if (isLoading||subiendo) {
        return <Loading />
    }
    return (
        <View
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1, backgroundColor: '#fff'
            }}
        >
            <Text>{doc}</Text>
            <Card style={{ marginTop: 20, width: WIDTH*0.8 }}>

                <View style={styles.row}>
                    <TouchableOpacity onPress={handlePickImage}>
                        <Feather name='image' size={24} color={color} />
                    </TouchableOpacity>
                    <Button
                        title='guardar'
                        onPress={() => {
                            handleSubmit(image)
                            setImage('')
                        }}
                    />
                    <Button
                        title='cancelar'
                        onPress={() => {
                            setImage('')
                            router.replace("/(main)")
                        }}
                    />
                </View>
                {image&&(
                    <ImageBackground source={{ uri: image }} style={styles.image}>
                        <TouchableOpacity onPress={() => setImage("")}>
                            <Feather name='x' size={24} color='red' />
                        </TouchableOpacity>
                    </ImageBackground>
                )}
            </Card>
        </View>
    )
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: logo
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        height: 100,
        width: 100,
        alignItems: "flex-end",
        padding: 8
    }
})

export default UploadImageScreen
