import Loading from '@/components/Loading'
import CargaChoferSemanalItem from '@/components/semanas/CargaChoferSemanalItem'
import { useResumenChoferes } from '@/hooks/useResumenChoferes'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export interface ResumenChoferesProps {
    chofer: string|null
    semana: number|null
    total_gastos: number|null
    total_ingreso: number|null
    total_mano_de_obra: number|null
}
const ResumenSemanalChoferes=() => {
    const { data: semanas, isLoading }=useResumenChoferes()

    if (isLoading) {
        return <Loading />
    }



    return (
        <View style={{ marginHorizontal: 10, padding: 5 }}>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>Resumen de Ingresos y egresos</Text>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>de Choferes por semana</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={semanas}
                renderItem={({ item }) => <CargaChoferSemanalItem item={item} />}
                ListEmptyComponent={() => <View><Text>No hay registros</Text></View>}
            />
        </View>
    )
}

export default ResumenSemanalChoferes

const styles=StyleSheet.create({})