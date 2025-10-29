import Button from '@/components/Button'
import FotoBtn from '@/components/FotoBtn'
import MiniLogo from '@/components/MiniLogo'
import { ThemedText } from '@/components/ThemedText'
import { Paleta } from '@/constants/Colors'
import { useServicios } from '@/hooks/useServicios'
import { Servicio } from '@/lib/api'
import { formatDate } from '@/utils/date-utils'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DetalleDeCargaScreen=() => {
    const { id }=useLocalSearchParams()
    const idString=id as string
    const [servicio, setServicio]=useState<Servicio>()
    const { isPending, data: servicios, isError, error }=useServicios()



    const handleButton=(id: string) => {
        router.push({ pathname: "/gastos", params: { id } })
    }
    useEffect(() => {
        const getServicios=() => {
            if (isPending||!servicios) return
            const res=servicios.filter((item) => item.id===id)
            setServicio(res[0])
        }
        if (idString) getServicios()
    }, [])

    //console.log("SERVICIO", servicio?.fotos_servicios[0]?.url)
    return (
        <>
            <View style={{ height: "15%", marginBottom: 0 }}>
                <MiniLogo />
            </View>
            <ThemedText
                type='subtitle'
                style={{ textAlign: "center", marginBottom: 0, paddingBottom: 0, fontSize: 16 }}
            >
                Detalle de Carga
            </ThemedText>
            <View
                style={{
                    height: "100%",
                    marginBottom: 0,
                    marginHorizontal: 10
                }}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Semama N°: {servicio?.semana}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 4,
                                alignItems: "center",
                                marginVertical: 5
                            }}
                        >
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 13,
                                    fontWeight: "bold"
                                }}
                            >
                                Broker :{servicio?.broker}{" "}
                            </Text>
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 13,
                                    fontWeight: "bold"
                                }}
                            >
                                Tabla :{servicio?.plataforma}
                            </Text>
                        </View>

                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Orden ID : {servicio?.orden}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            fecha de carga :{" "}
                            {servicio&&formatDate(servicio?.fecha_carga as string)}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            fecha de entrega :{" "}
                            {servicio&&formatDate(servicio?.fecha_entrega as string)}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start"
                        }}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Ruta :{servicio?.ruta}
                        </Text>
                        <Text style={{ fontSize: 10 }} adjustsFontSizeToFit>
                            origen: {servicio?.origen}
                        </Text>
                        <Text style={{ fontSize: 10 }} adjustsFontSizeToFit>
                            destino: {servicio?.destino}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Chofer : {servicio?.chofer}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Vehículo : {servicio?.vehiculo}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Millas : {servicio?.millas}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Despachador : {servicio?.despachador}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Peso : {servicio?.peso} lbs.
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Observaciones : {servicio?.observaciones}
                        </Text>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontSize: 12,
                                fontWeight: "bold"
                            }}
                        >
                            Información de Pago : {servicio?.estatus_pago}
                        </Text>
                        {servicio?.estatus_pago==='no cobrado'&&(<View>
                            <Text style={{ fontSize: 10 }}>forma de pago{servicio.forma_de_pago}</Text>
                            <Text style={{ fontSize: 10 }}>inf. de pago{servicio.info_pago}</Text>

                        </View>)}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 4,
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: 10
                            }}
                        >
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 13,
                                    fontWeight: "bold"
                                }}
                            >
                                Ingreso :{servicio?.precio_de_servicio} $
                            </Text>
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 13,
                                    fontWeight: "bold"
                                }}
                            >
                                Gastos :{servicio?.precio_mano_de_obra} $
                            </Text>
                        </View>
                        <View
                            style={{

                                height: 50,
                                padding: 5,

                            }}
                        >
                            <Button title='Detalle de Gastos' onPress={() => { handleButton(servicio?.id as string) }} variant='outline' size='small' />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                        <FotoBtn uri={servicio?.bol} name="BOL" />
                        <FotoBtn uri={servicio?.pod} name="POD" />
                        <FotoBtn uri={servicio?.rc} name="RC" />
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        {servicio?.fotos_servicios.length!==0&&(servicio?.fotos_servicios.map(foto => {
                            //console.log(foto.url)
                            return <FotoBtn uri={foto.url} key={foto.id} name="carga" />
                        }))}
                    </View>

                </View>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 16,
        backgroundColor: Paleta.card,
        borderRadius: 12,
        marginBottom: 12,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2
    },
    completedContainer: {
        opacity: 0.7
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Paleta.primary,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2
    },
    checkboxChecked: {
        backgroundColor: Paleta.primary
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Paleta.text,
        marginBottom: 4
    },
    completedTitle: {
        textDecorationLine: "line-through",
        color: Paleta.textSecondary
    },
    description: {
        fontSize: 14,
        color: Paleta.textSecondary,
        marginBottom: 8
    },
    completedText: {
        color: Paleta.textSecondary
    },
    metaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
    },
    dateTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8
    },
    dateTime: {
        fontSize: 12,
        color: Paleta.textSecondary,
        marginLeft: 4,
        marginRight: 8
    },
    overdue: {
        color: Paleta.danger
    },
    badgesContainer: {
        flexDirection: "row",
        gap: 8
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "stretch",
        aspectRatio: 1
    },
})


export default DetalleDeCargaScreen

