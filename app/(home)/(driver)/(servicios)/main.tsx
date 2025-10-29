import Loading from '@/components/Loading'
import DetalleDeServicio from '@/components/servicios/DetalleDeServicio'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { useServiciosByChoferId } from '@/hooks/useServiciosByChoferId'
import { useUserInfo } from '@/lib/userContext'
import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'



const DriverScreen=() => {
    const { role, session, profile, loading }=useUserInfo()
    const [ver, setVer]=useState(0)
    if (loading) {
        return <Loading />
    }

    if (!session) {
        return <Loading />
    }
    const { data: servicios }=useServiciosByChoferId(profile?.id!)

    //console.log(servicios)
    return (
        <View style={{ marginHorizontal: 20 }}>
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

                        }

                        }
                    >
                        <Text
                            style={{ textAlign: "center", color: 'white', fontSize: 11 }}                        >
                            Resúmenes
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className='mx-10'>

                    <FlatList
                        data={servicios}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        renderItem={({ item }) => <DetalleDeServicio items={item} ver={ver} />}
                        ListEmptyComponent={() => <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text>No Tiene servicios registrados</Text></View>}
                    />
                </View>
            </View>
        </View>
    )
}

export default DriverScreen