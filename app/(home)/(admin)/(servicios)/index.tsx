import Loading from '@/components/Loading'
import ListadoDeServicios from '@/components/servicios/ListadoDeServicios'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { useServicios } from '@/hooks/useServicios'
import { useUserInfo } from '@/lib/userContext'
import { Redirect, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'

const PublicScreen=() => {
    const { role, session, profile }=useUserInfo()
    const { data: servicios, error, isLoading, isFetching, isPending }=useServicios()
    const [isEnabled, setIsEnabled]=useState(false)
    const [title, setTitle]=useState('Viendo actividades por realizar')
    const [ver, setVer]=useState<0|1|2|3>(0)
    //console.log(servicios)
    if (error) {
        Alert.alert('Error en servidor', 'Se regresará a Inicio')
        return <Redirect href="/(home)/(admin)/(servicios)" />
    }


    if (isFetching) {
        return <Loading />
    }

    if (isLoading) {
        return <Loading />
    }

    if (isPending) {
        return <Loading />
    }

    //console.log('SERVICIOS NUEVOS', servicios)
    const verResumenes=(semana: string) => {
        router.push({ pathname: "/(home)/(admin)/(semanas)/resumenes", params: { semana } })
    }


    return (
        <View className='flex-1'>
            <View className='flex-1 mx-auto bg-white'>
                <View className='p-3 bg-blue-400'>
                    <ThemedText type='subtitle' style={{ textAlign: 'center', fontSize: 11 }}>{profile?.username?.toUpperCase()}</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', gap: 5 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===0? primary:'#c5c5c5',
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer(prev => 0)

                        }} >
                        <Text
                            style={{ textAlign: "center", color: ver===0? 'white':'black', fontSize: 11 }}                        >
                            Programadas
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===1? primary:'#c5c5c5',
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer(prev => 1)

                        }

                        }
                    >
                        <Text
                            style={{ textAlign: "center", color: ver===1? 'white':'black', fontSize: 11 }}
                        >
                            Activa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===2? primary:'#c5c5c5',
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer(prev => 2)

                        }

                        }
                    >
                        <Text
                            style={{ textAlign: "center", color: ver===2? 'white':'black', fontSize: 11 }}                        >
                            procesando
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===3? primary:'#c5c5c5',
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer(prev => 3)
                        }

                        }
                    >
                        <Text
                            style={{ textAlign: "center", color: ver===3? 'white':'black', fontSize: 11 }}                        >
                            Realizadas
                        </Text>
                    </TouchableOpacity>
                </View>



                <FlatList
                    data={servicios}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item }) => <ListadoDeServicios items={item} ver={ver} />}
                    ListEmptyComponent={() => <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>No Tiene actividades registradas</Text></View>}
                />
            </View>
        </View>
    )
}

export default PublicScreen