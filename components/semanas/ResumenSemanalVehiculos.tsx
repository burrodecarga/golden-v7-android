import { useResumenVehiculos } from '@/hooks/useResumenVehiculos'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Loading from '../Loading'
import CargaVehiculoSemanalItem from './CargaVehiculoSemanalItem'

export interface ResumenVehiculosProps {
    name: string|null
    semana: number|null
    total_gastos: number|null
    total_ingreso: number|null
    total_mano_de_obra: number|null
}
const ResumenSemanalVehiculos=() => {
    const { data: semanas, isLoading }=useResumenVehiculos()

    if (isLoading) {
        return <Loading />
    }



    return (
        <View style={{ marginHorizontal: 10, padding: 5 }}>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>Resumen de Ingresos y egresos</Text>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>de Vehículos por semana</Text>
            <FlatList

                showsVerticalScrollIndicator={false}
                data={semanas}
                keyExtractor={item => item.name!+item.semana!}
                renderItem={({ item }) => <CargaVehiculoSemanalItem item={item} />}
            />
            <View style={{ flex: 1, height: 300 }} />
        </View>
    )
}

export default ResumenSemanalVehiculos

const styles=StyleSheet.create({})