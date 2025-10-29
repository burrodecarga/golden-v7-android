import { WIDTH } from '@/constants/constantes'
import { APIServicio } from '@/lib/servicios/api_servicios'
import { ESTADO, formatDate } from '@/utils/date-utils'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FotoBtn from '../FotoBtn'

export interface CargaItemProps {
    items: APIServicio
    ver?: number
}

const ListadoDeServiciosChofer=({ items, ver }: CargaItemProps) => {

    if (items.position!==ver) {
        return null
    }

    return (
        <View>
            <View className='items-center justify-center p-2 mx-2 bg-slate-400'>

                <Text style={{ fontSize: 17, fontWeight: 'semibold' }}>Servicios asignado a {items.chofer}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'semibold' }}>Estado del servicio {ESTADO[ver]}</Text>
            </View>
            <View className='flex-row items-center justify-between p-2 py-2 mx-2 bg-slate-400'>
                <Text style={{ fontSize: 16 }}>Semama N° {items.semana}</Text>
                <Text style={{ fontSize: 16 }}>{formatDate(items.fecha_carga as string)}</Text>
            </View>
            <View className='flex-1 p-2 mx-2 my-0 border-2 border-slate-400' key={items.id}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f7f7f8', width: WIDTH*0.9 }}>
                    <Text style={{ fontSize: 16 }}>Orden # {items.orden}</Text>
                    <Text style={{ fontSize: 16 }}>Broker: {items.broker}</Text>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#f7f7f8', width: WIDTH*0.9 }}>
                    <Text style={{ fontSize: 14 }} adjustsFontSizeToFit={true} numberOfLines={2}>Ruta: {items.ruta}</Text>
                    <Text style={{ fontSize: 14 }} adjustsFontSizeToFit={true} numberOfLines={2}>Orígen : {items.origen}</Text>
                    <Text style={{ fontSize: 14 }} adjustsFontSizeToFit={true} numberOfLines={2}>Destino : {items.destino}</Text>
                    {items.observaciones&&<Text style={{ fontSize: 14 }} adjustsFontSizeToFit={true} numberOfLines={2}>observaciones : {items.observaciones}</Text>}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f7f7f8', width: WIDTH*0.9, }}>
                    <Text style={{ fontSize: 16 }}>Monto a Cobrar : {items.precio_de_servicio} $</Text>
                    <Text style={{ fontSize: 13 }}>{items.forma_de_pago}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f7f7f8', width: WIDTH*0.9, }}>
                    <Text style={{ fontSize: 16 }}>Gasto Estimado : {items.gasto_estimado} $</Text>
                    <Text style={{ fontSize: 16 }}>Gasto  : xxx $</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#f7f7f8', width: WIDTH*0.9 }}>
                    <Text style={{ fontSize: 16 }} adjustsFontSizeToFit={true} numberOfLines={2}>Estatus de Pago: {items.estatus_pago}</Text>
                    {items.info_pago&&<Text style={{ fontSize: 14 }} adjustsFontSizeToFit={true} numberOfLines={2}>observaciones : {items.info_pago}</Text>}
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#f7f7f8', width: WIDTH*0.9, }}>
                    <Text style={{ fontSize: 16 }}>Tipo de Carga : {items.tipo_de_carga} </Text>
                    <Text style={{ fontSize: 16 }}>Despachador : {items.despachador} </Text>
                </View>
                <View className='m-auto'>

                    <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                        <FotoBtn uri={items.bol} name="BOL" />
                        <FotoBtn uri={items.pod} name="POD" />
                        <FotoBtn uri={items.rc} name="RC" />
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        {items.fotos_servicios.length!==0&&(items.fotos_servicios.map(foto => {
                            //console.log(foto.url)
                            return <FotoBtn uri={foto.url} key={foto.id} name="carga" />
                        }))}
                    </View>


                </View>

                <TouchableOpacity onPress={

                    () => {
                        const id=String(items.id)
                        router.push({
                            pathname: '/(home)/(driver)/(servicios)/(servicio)/[id]', params: { id }

                        })
                    }} className='flex flex-row items-center justify-between px-4 py-3 my-1'>
                    <Text style={{ fontSize: 16 }}>Ver detalles</Text>
                    <Ionicons name='eye-outline' size={24} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ListadoDeServiciosChofer