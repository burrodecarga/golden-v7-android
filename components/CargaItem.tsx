import { Paleta } from '@/constants/Colors'
import { Servicio } from '@/lib/api'
import { formatDate } from '@/utils/date-utils'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CargaItemProps {
    item: Servicio
    ver?: 'cobrado'|'no cobrado'|'todos'
}
const CargaItem=({ item, ver }: CargaItemProps) => {
    if (ver!=='todos') {
        //console.log(ver)

        if (item.estatus_pago==ver) {
            return null
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { router.push(`/(drawer)/(home)/(tabs)/cargas/carga/${item.id}`) }}>

            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'center' }}>
                <Ionicons name='calendar-number-outline' size={14} />
                <Text style={{ fontSize: 12 }}>Orden # {item.orden}</Text>
                <Text style={{ fontSize: 12 }}>Semama N° {item.semana}</Text>
                <Text style={{ fontSize: 10 }}>{formatDate(item.fecha_carga as string)}</Text>
                <Text style={{ fontSize: 6 }}>Plataforma {item.plataforma}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12 }}>Ingreso</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='add-circle-outline' size={14} /> - {item.precio_de_servicio} $</Text>
                <Text style={{ fontSize: 8 }}>gasto Estimado</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='remove-circle-outline' size={14} /> - {item.gasto_estimado} $</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }} >
                <Text style={{ fontSize: 12 }}>Ruta/Chofer</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='map-outline' size={14} /> - {item.ruta}</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='person-circle-outline' size={14} /> - {item.chofer}</Text>
                <Text style={{ fontSize: 8 }}><Ionicons name='car-outline' size={14} /> - {item.vehiculo}</Text>


            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Paleta.card,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    completedContainer: {
        opacity: 0.7,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Paleta.primary,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: Paleta.primary,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Paleta.text,
        marginBottom: 4,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: Paleta.textSecondary,
    },
    description: {
        fontSize: 14,
        color: Paleta.textSecondary,
        marginBottom: 8,
    },
    completedText: {
        color: Paleta.textSecondary,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    dateTime: {
        fontSize: 12,
        color: Paleta.textSecondary,
        marginLeft: 4,
        marginRight: 8,
    },
    overdue: {
        color: Paleta.danger,
    },
    badgesContainer: {
        flexDirection: 'row',
        gap: 8,
    },
})

export default CargaItem