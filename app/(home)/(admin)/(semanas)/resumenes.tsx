import Button from '@/components/Button'
import MiniLogo from '@/components/MiniLogo'
import ResumenSemanalChoferes from '@/components/semanas/ResumenSemanalChoferes'
import ResumenSemanalPlataformas from '@/components/semanas/ResumenSemanalPlataformas'
import ResumenSemanalVehiculos from '@/components/semanas/ResumenSemanalVehiculos'
import { handleMov, HEIGTH } from '@/constants/constantes'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResumenesSemanaScreen=() => {
    const [isActive, setIsActive]=useState('Choferes')
    const [display, setDisplay]=useState(0)



    const handleBoton=(tipo: string) => {
        handleMov()
        setIsActive(tipo)

        if (tipo==='Choferes') {
            setDisplay(0)
        }
        if (tipo==='Vehículos') {
            setDisplay(1)
        }
        if (tipo==='Plataformas') {
            setDisplay(2)
        }
    }

    return (
        <SafeAreaView style={styles.bg}>
            <View style={{ height: HEIGTH*0.1 }}>
                <MiniLogo />
            </View>
            <View style={{ flexDirection: 'row', gap: 0, padding: 8, justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.4, borderTopColor: '#c5c5c5', borderBottomWidth: 0.4, borderBlockColor: '#c5c5c5', }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 4 }}>
                    <Button title='Regresar' onPress={() => router.back()} variant={isActive==='Regresar'? 'primary':'outline'} size='small' />
                    <Button title='Choferes' onPress={() => { handleBoton('Choferes') }} variant={isActive==='Choferes'? 'primary':'outline'} size='small' />
                    <Button title='Vehículos' onPress={() => { handleBoton('Vehículos') }} variant={isActive==='Vehículos'? 'primary':'outline'} size='small' />
                    <Button title='Plataformas' onPress={() => { handleBoton('Plataformas') }} variant={isActive==='Plataformas'? 'primary':'outline'} size='small' />
                </ScrollView>
            </View>

            <View style={{ height: '70%', marginVertical: 5, display: display===0? 'flex':'none' }}>
                <ResumenSemanalChoferes />
            </View>
            <View style={{ height: '70%', marginVertical: 5, display: display===1? 'flex':'none' }}>
                <ResumenSemanalVehiculos />
            </View>
            <View style={{ height: '70%', marginVertical: 5, display: display===2? 'flex':'none' }}>
                <ResumenSemanalPlataformas />
            </View>
        </SafeAreaView>

    )
}

export default ResumenesSemanaScreen

const styles=StyleSheet.create({
    bg: {
        backgroundColor: '#f7f7f8',
        flex: 1,
        justifyContent: 'flex-start'


    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
        marginTop: 0,
        padding: 0

    },
})