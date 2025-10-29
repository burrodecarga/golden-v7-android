import CargaItem from '@/components/CargaItem'
import Loading from '@/components/Loading'
import MiniLogo from '@/components/MiniLogo'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { useServiciosBySemanaAndVehiculo } from '@/hooks/useServiciosBySemanaAndVehiculo'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SemanaByChoferScreen=() => {
    const { semana, vehiculo }=useLocalSearchParams()
    const { data: servicios, error, isLoading }=useServiciosBySemanaAndVehiculo(Number(semana), vehiculo as string)
    const [totalIngresos, setTotalIngresos]=useState(0)
    const [totalGastos, setTotalGastos]=useState(0)
    const [totalCobrado, setTotalCobrado]=useState(0)
    const [ver, setVer]=useState<'cobrado'|'no cobrado'|'todos'>('todos')
    const [titulo, setTitulo]=useState('Todas las Cargas')



    if (isLoading) {
        return <Loading />
    }
    console.log(servicios)

    return (
        <>
            <View style={{ height: "10%", marginBottom: 0 }}>
                <MiniLogo />
            </View>
            <ThemedText
                type='subtitle'
                style={{ textAlign: "center", marginBottom: 0, paddingBottom: 0 }}
            >
                {titulo}
            </ThemedText>
            <View style={{ height: "60%", marginBottom: 0 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginHorizontal: 30,
                        borderWidth: 0.5,
                        borderColor: primary,
                        borderRadius: 5,
                        padding: 5
                    }}
                    data={servicios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CargaItem item={item} ver={ver} />}
                />
            </View>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: "#f7f7f8",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1/4,
                        marginHorizontal: 30,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10,
                        gap: 10
                    }}
                >
                    <View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: primary,
                                paddingHorizontal: 4,
                                paddingVertical: 3,
                                borderRadius: 5,
                                marginVertical: 10
                            }}
                            onPress={() => {
                                setVer(prev => 'todos')
                                setTitulo('Todas las cargas')
                            }} >
                            <Text
                                style={{ textAlign: "center", color: "white", fontSize: 12 }}
                            >
                                Todas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: primary,
                                paddingHorizontal: 4,
                                paddingVertical: 3,
                                borderRadius: 5,
                                marginVertical: 10
                            }}
                            onPress={() => {
                                setVer(prev => 'cobrado')
                                setTitulo('Cargas no cobradas')
                            }

                            }
                        >
                            <Text
                                style={{ textAlign: "center", color: "white", fontSize: 12 }}
                            >
                                Cargas No Cobradas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: primary,
                                paddingHorizontal: 4,
                                paddingVertical: 3,
                                borderRadius: 5,
                                marginVertical: 10
                            }}
                            onPress={() => {
                                setVer(prev => 'no cobrado')
                                setTitulo('Cargas cobradas')
                            }

                            }
                        >
                            <Text
                                style={{ textAlign: "center", color: "white", fontSize: 12 }}
                            >
                                Cargas Cobradas
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default SemanaByChoferScreen

const styles=StyleSheet.create({})