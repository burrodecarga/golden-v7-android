import { FAB } from '@/components/FAB'
import Loading from '@/components/Loading'
import Detalle from '@/components/servicios/Detalle'
import { primary } from '@/constants/Colors'
import { semanaDeAno } from '@/constants/constantes'
import { useServicios } from '@/hooks/useServicios'
import { APIServicio } from '@/lib/servicios/api_servicios'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'

const AddScreen=() => {
    const hoy=new Date()
    const initial=hoy.toISOString().split('T')[0]
    const numSemana=semanaDeAno()+1
    const [filtro, setFiltro]=useState<DateData>()
    const [selected, setSelected]=useState(hoy.toISOString().split('T')[0])
    const { data: servicios, error, isLoading, isFetching, isPending }=useServicios()
    if (error) {
        Alert.alert('error', 'ha ocurrido un error en la carga de los servicios')
    }

    if (isLoading) {
        return <Loading />
    }


    const filtrados=servicios?.filter((s: APIServicio) => s.fecha_carga===selected)

    //console.warn(JSON.stringify(servicios, null, 2))
    useEffect(() => {
        setSelected(initial)
    }, [])
    return (
        <View className='flex-1 bg-white'>
            <Text className='p-2 text-xl font-bold text-center'>Servicios por Día</Text>
            <FAB onPress={() => router.push('/(home)/(admin)/(add)/paso_1')} iconName='add' />
            <Calendar
                onDayPress={day => {
                    console.log('selected day', day)
                    setFiltro(day)
                    setSelected(day.dateString)
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedColor: primary }
                }}
            />
            <FlatList
                data={filtrados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Detalle servicio={item} filtro={filtro} selected={selected} />}
                ListEmptyComponent={() => (<View className='items-center justify-center flex-1 p-6 bg-red-200' >
                    {filtro?.dateString!==undefined? <Text className='text-sm uppercase'>{`No Tiene Servicios registrados para el ${filtro?.dateString}`} </Text>:
                        <Text className='text-sm uppercase'>{`No Tiene Servicios registrados para el ${hoy.toISOString().split('T')[0]}`} </Text>
                    }

                </View>)}

                ListHeaderComponent={() => <View className='p-3 mx-3 my-2 border rounded border-1 border-slate-400 bg-dark-primary'>
                    <Text className='text-sm text-center text-white'>Servicios Registrados para el día: {selected}</Text>
                    <Text className='text-white text-center text-sm]'>Número de Servicios: {filtrados?.length}</Text>
                </View>}
            />

        </View>
    )
}

export default AddScreen