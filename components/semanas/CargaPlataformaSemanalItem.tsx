import { Paleta } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../Button'

interface CargaPlataformaItemProps {
    item: {
        nombre: string|null
        semana: number|null
        total_gastos: number|null
        total_ingreso: number|null
        total_mano_de_obra: number|null
    }
    ver?: 'cobrado'|'no cobrado'|'todos'
}
const CargaPlataformaSemanalItem=({ item, ver }: CargaPlataformaItemProps) => {


    return (
        <View style={styles.container} key={item.nombre+'-'+item.semana}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name='calendar-number-outline' size={14} />
                    <Text style={{ fontSize: 12 }}>Semama N° {item.semana}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons name='planet-outline' size={14} />
                    <Text style={{ fontSize: 13, marginLeft: 10, fontWeight: 'bold' }}>{item.nombre?.toLocaleUpperCase()}</Text>
                </View>

                <Button title='ver detalles' variant='outline' size='small' onPress={() => router.push({ pathname: '/(home)/(admin)/(semanas)/by_plataforma', params: { 'semana': item.semana, 'plataforma': item.nombre } })} style={{ marginVertical: 5 }} />

            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons name='add-circle-outline' size={14} color='green' />
                    <Text style={{ fontSize: 12 }}>Total Ingreso : </Text>
                    <Text style={{ fontSize: 12 }}>{item.total_ingreso}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons name='add-circle-outline' size={14} color='red' />
                    <Text style={{ fontSize: 12 }}>Total Gastos Reportados : </Text>
                    <Text style={{ fontSize: 12 }}>{item.total_gastos}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons name='add-circle-outline' size={14} color='red' />
                    <Text style={{ fontSize: 12 }}>Total Gastos Estimado : </Text>
                    <Text style={{ fontSize: 12 }}>{item.total_mano_de_obra}</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        padding: 16,
        height: 160,
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
        borderWidth: 1,
        borderColor: '#c5c5c5'
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

export default CargaPlataformaSemanalItem