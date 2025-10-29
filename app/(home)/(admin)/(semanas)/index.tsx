import Loading from '@/components/Loading'
import ListadoDeServiciosSemana from '@/components/servicios/ListadoDeServiciosSemana'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { semanaDeAno } from '@/constants/constantes'
import { useServicios } from '@/hooks/useServicios'
import { useUserInfo } from '@/lib/userContext'
import { SEMANAS } from '@/utils/date-utils'
import { Redirect, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'

const SemanasPublicScreen=() => {
    const { role, session, profile }=useUserInfo()
    const { data: servicios, error, isLoading, isFetching, isPending }=useServicios()
    const [isEnabled, setIsEnabled]=useState(false)
    const [title, setTitle]=useState('Viendo actividades por realizar')
    const numSemana=semanaDeAno()+1

    const [ver, setVer]=useState(numSemana+1)
    let SEMANA=numSemana
    //console.log(numSemana)
    if (error) {
        Alert.alert('Error en servidor', 'Se regresará a Inicio')
        return <Redirect href="/(home)/(admin)/(servicios)" />
    }

    const handleButton=(id: string) => {
        router.push({ pathname: "/(home)/(admin)/(semanas)/resumenes", params: { id } })
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


    return (


        <View className='flex-1'>
            <View className='flex-1 mx-auto bg-white'>
                <View className='p-3 bg-blue-400'>
                    <ThemedText type='subtitle' style={{ textAlign: 'center', fontSize: 11 }}>{profile?.username?.toUpperCase()}</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', gap: 5 }}>
                    <TouchableOpacity

                        style={{
                            backgroundColor: ver===SEMANA? primary:'#c5c5c5',
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80,
                            marginHorizontal: 10
                        }}
                        onPress={() => {
                            setVer(prev => SEMANA)

                        }} >
                        <Text
                            style={{ textAlign: "center", color: ver===SEMANA? 'white':'black', fontSize: 11 }}                        >
                            Semana {SEMANA}
                        </Text>
                    </TouchableOpacity>

                    <FlatList
                        data={SEMANAS}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item}
                                style={{
                                    backgroundColor: ver===item? primary:'#c5c5c5',
                                    paddingHorizontal: 4,
                                    paddingVertical: 8,
                                    borderRadius: 5,
                                    marginVertical: 10,
                                    width: 80,
                                    marginHorizontal: 10
                                }}
                                onPress={() => {
                                    setVer(prev => item)

                                }} >
                                <Text
                                    style={{ textAlign: "center", color: ver===item? 'white':'black', fontSize: 11 }}                        >
                                    Semana {item}
                                </Text>
                            </TouchableOpacity>
                        )
                        }
                    />



                </View>

                <View className='mx-2'>
                    <TouchableOpacity
                        style={{
                            backgroundColor: primary,
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            handleButton(String(ver))
                        }

                        }
                    >
                        <Text
                            style={{ textAlign: "center", color: 'white', fontSize: 11 }}                        >
                            Resúmenes
                        </Text>
                    </TouchableOpacity>
                </View>


                <FlatList
                    data={servicios}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item }) => <ListadoDeServiciosSemana items={item} ver={ver} />}
                    ListEmptyComponent={() => <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>No Tiene actividades registradas</Text></View>}
                />
            </View>
        </View>

    )
}

export default SemanasPublicScreen