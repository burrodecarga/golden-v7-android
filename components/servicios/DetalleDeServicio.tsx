import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { APIServicio } from '@/lib/servicios/api_servicios'
import { supabase } from '@/lib/supabase'
import { formatDate, formatTime } from '@/utils/date-utils'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Switch, View } from 'react-native'
import Button from '../Button'

export interface CargaItemProps {
    items: APIServicio
    ver?: number
}

const DetalleDeServicio=({ items, ver }: CargaItemProps) => {
    const [loading, setLoading]=useState(false)
    const [checked, setChecked]=useState(false)
    const id=items.id

    //console.log(items.id, ver)

    if (items.position!==ver) {
        return null
    }

    const registrarSalida=async (item: APIServicio, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=item.observaciones!+', registro de salida: '+formatDate(new Date())+' hora:'+formatTime(new Date())
        setLoading(true)
    }

    const registrarLLegada=async (item: APIServicio, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=item.observaciones!+', registro de llegada: '+formatDate(new Date())+' hora:'+formatTime(new Date())
        setLoading(true)
        const { data, error }=await supabase
            .from('servicios')
            .update({ observaciones: newObsercacion, estatus_servicio: 'en proceso', activo: 2 })
            .eq('id', id)
            .select()
        if (error) {
            Alert.alert('ERROR', error.message)
            return []
        }
    }

    const registrarCobro=async (id: string) => {
        setLoading(true)
        let pago='registro de pago con cheque '
        if (checked) {
            pago='registro de pago en efectivo'
        }
        let info='registro de forma de pago '+new Date().toLocaleDateString()+pago

        try {

            const { data, error }=await supabase
                .from('servicios')
                .update({ estatus_pago: 'por certificar', 'info_pago': info, 'forma_de_pago': pago, estatus_servicio: 'realizado', activo: 3 })
                .eq('id', id)
                .select()
            if (error) {
                Alert.alert('ERROR', error.message)
                return []
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }





    return (

        <View>
            <View>
                <ThemedText type='subtitle'>Orden #:{items?.orden}</ThemedText>
                <ThemedText type='subtitle'>Ruta:{items?.ruta}</ThemedText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
                    <ThemedText type='subtitle'>Destino:</ThemedText>
                    <ThemedText type='default'>{items?.destino}</ThemedText>

                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'baseline', gap: 2 }}>
                    <ThemedText type='subtitle'>Observaciones:</ThemedText>
                    <ThemedText numberOfLines={4} adjustsFontSizeToFit style={{ textAlign: 'justify', lineHeight: 13 }}>{items?.observaciones}XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYMMMMMMMMMMM Bergacion Mochuelo BBBBBBBbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</ThemedText>
                </View>
            </View>
            <View style={{ gap: 18 }}>

                {items.position===0&&<ThemedButton icon='locate-outline' onPress={() => registrarSalida(items, id)} disabled={items.position===0}>Registrar Salida</ThemedButton>}
                {items.position===1&&<ThemedButton icon='location-outline' onPress={() => registrarLLegada(items, id)} disabled={items.position===1}>Registrar llegada</ThemedButton>}
                <ThemedButton icon='location-outline' onPress={() => router.push({ pathname: "/", params: { id, doc: 'BOL' } })} disabled={items.position===3}>Registrar Gasto</ThemedButton>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ThemedButton icon='logo-usd' onPress={() => registrarCobro(id)} disabled={items.position===3}> Registrar cobro</ThemedButton>
                    <View style={{ backgroundColor: primary, paddingHorizontal: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'space-between' }}>
                        <ThemedText style={{ color: 'white' }}>{checked? 'Efectivo':'Cheque'}</ThemedText>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={checked? '#f5dd4b':'#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setChecked(!checked)}
                            value={checked}
                        />
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginVertical: 20 }}>
                <Button title='BOL' onPress={() => router.push({ pathname: "/upload", params: { id, doc: 'BOL' } })} />
                <Button title='POD' onPress={() => router.push({ pathname: "/upload", params: { id, doc: 'POD' } })} />
                <Button title='RC' onPress={() => router.push({ pathname: "/upload", params: { id, doc: 'RC' } })} />
            </View>
        </View>

    )
}


const styles=StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})



export default DetalleDeServicio