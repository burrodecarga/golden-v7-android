import GastoItem from '@/components/gastos/GastosItem'
import Loading from '@/components/Loading'
import MiniLogo from '@/components/MiniLogo'
import { ThemedText } from '@/components/ThemedText'
import { useServicios } from '@/hooks/useServicios'
import { Servicio } from '@/lib/api'
import { Gasto } from '@/utils/types'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const ListadoDeGastosScreen=() => {
    const { data: servicios, isLoading }=useServicios()
    const { id }=useLocalSearchParams()
    const [renderizar, setRenderizar]=useState(false)
    const [servicio, setServicio]=useState<Servicio>()
    const [gastos, setGastos]=useState<Gasto[]>([])
    const [orden, setOrden]=useState<string|null>('0000')




    useEffect(() => {
        //console.log('ENTRANDO AL USEEFECT')
        if (id&&servicios) {
            //console.log('CON ID Y SERVICIOS', id, servicios)
            const res=servicios.filter((item) => item.id===id)
            setServicio(res[0])
            setOrden(res[0].orden)
            //console.log('SERVICIOS', servicio?.gastos_servicios, servicio)
            servicio?.gastos_servicios.map((gasto: any) => {
                // console.log('GASTO EN MAP', gasto, typeof gasto)
                setGastos(prev => [gasto, ...prev])
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderizar, id])




    useEffect(() => {

        setRenderizar(!renderizar)
    }, [])


    if (isLoading===true) {
        <Loading />
    }

    //console.log('GASTOS xx', orden, gastos)

    return (
        <>

            <View style={{ height: '15%', marginBottom: 0 }}>
                <MiniLogo />
            </View>
            <ThemedText type='subtitle' style={{ textAlign: 'center', marginBottom: 0, paddingBottom: 0 }}>Detalle de Gastos</ThemedText>
            <View style={{ height: '60%', marginBottom: 0 }}>
                <FlatList
                    data={gastos}
                    keyExtractor={item => item.id!.toString()}
                    renderItem={({ item }) => <GastoItem item={item} />}
                    ListEmptyComponent={() => <View><Text>No hay registros</Text></View>}

                />
            </View>

        </>
    )
}


export default ListadoDeGastosScreen

const styles=StyleSheet.create({})