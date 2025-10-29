import { useResumenPlataformas } from '@/hooks/useResumenPlataformas'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Loading from '../Loading'
import CargaPlataformaSemanalItem from './CargaPlataformaSemanalItem'

export interface ResumenPlataformasProps {
    nombre: string|null
    semana: number|null
    total_gastos: number|null
    total_ingreso: number|null
    total_mano_de_obra: number|null
}
const ResumenSemanalPlataformas=() => {
    const { data: semanas, isLoading }=useResumenPlataformas()

    if (isLoading) {
        return <Loading />
    }



    return (
        <View style={{ marginHorizontal: 10, padding: 5 }}>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>Resumen de Ingresos y egresos</Text>
            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>de Plataformas por semana</Text>
            <FlatList

                showsVerticalScrollIndicator={false}
                data={semanas}
                keyExtractor={item => item.nombre!+item.semana!}
                renderItem={({ item }) => <CargaPlataformaSemanalItem item={item} />}
            />
            <View style={{ flex: 1, height: 300 }} />
        </View>
    )
}

export default ResumenSemanalPlataformas

