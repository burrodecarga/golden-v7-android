import { Paleta } from '@/constants/Colors'
import { formatDate } from '@/utils/date-utils'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface GastoItemProps {
    item: {
        created_at?: string
        fecha?: string|null
        id?: string
        monto?: number|null
        servicio_id?: string|null
        tipo?: string|null
    }
}
const GastoItem=({ item }: GastoItemProps) => {
    return (
        <TouchableOpacity style={styles.container} onLongPress={() => { router.replace(`/servicios/${item.id}`) }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'center', gap: 5 }}>
                <Text style={{ fontSize: 12 }}>Fecha</Text>
                <Text style={{ fontSize: 10, }}><Ionicons name='calendar-number-outline' size={14} /> {item.fecha&&formatDate(item.fecha as string)}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12 }}>Tipo de Gasto</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='newspaper-outline' size={14} />  {item.tipo} </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12 }}>Monto de Gasto</Text>
                <Text style={{ fontSize: 10 }}><Ionicons name='clipboard-outline' size={14} />  {item.monto} $</Text>
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

export default GastoItem