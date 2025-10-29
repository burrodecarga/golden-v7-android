import { Servicio } from '@/lib/api'
import React from 'react'
import { Text, View } from 'react-native'
import { DateData } from 'react-native-calendars'

interface Props {
    servicio: Servicio, filtro?: DateData, selected?: string
}
const Detalle=({ servicio, filtro, selected }: Props) => {

    return (
        <>

            <View className='p-3 mx-3 my-2 border rounded border-1 border-slate-400'>

                <View className='flex flex-row items-center justify-between gap-2 overflow-hidden'>
                    <View>
                        <Text>Orden:{servicio.orden}</Text>
                        <Text>Origen:{servicio.origen}</Text>
                        <Text>Destino:{servicio.destino}</Text>
                        <Text>Chofer:{servicio.chofer}</Text>
                        <Text>Vehículo:{servicio.vehiculo}</Text>
                    </View>
                    <View>
                        <Text>Precio:{servicio.precio_de_servicio}$</Text>
                        <Text>Status:{servicio.estatus_servicio}</Text>
                        <Text>Pago:{servicio.estatus_pago}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Detalle