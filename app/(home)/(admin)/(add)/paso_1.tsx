import Button from "@/components/Button"
import Loading from "@/components/Loading"
import TextLogo from "@/components/TextLogo"
import { ThemedText } from "@/components/ThemedText"
import ThemeTextInput from "@/components/ThemedTextInput"
import { bggray, primary } from "@/constants/Colors"
import { HEIGTH, semanaDeAno } from "@/constants/constantes"
import { URL_FOTO_DEF } from "@/constants/Images"
import { useChoferes } from "@/hooks/useChoferes"
import { usePlataformas } from "@/hooks/usePlataformas"
import { useVehicles } from "@/hooks/useVehicles"
import { addServicio } from "@/lib/api"
import { ServicioNoId } from "@/utils/types"
import DateTimePicker from "@react-native-community/datetimepicker"
import { router } from "expo-router"
import React, { useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from "react-native"

interface DataProp {
    id: string
    name: string
}

const AddModalScreen=() => {
    const [loading, setLoading]=useState(false)
    const [fecha, setFecha]=useState("")
    const [fechaDespacho, setFechaDespacho]=useState(new Date())
    const [fechaEntrega, setFechaEntrega]=useState("")
    const [hora, setHora]=useState("")
    const [data1, setData1]=useState<DataProp[]>([])
    const [data2, setData2]=useState<DataProp[]>([])
    const [data3, setData3]=useState<DataProp[]>([])
    const [date, setDate]=useState(new Date())
    const [showPicker, setShowPicker]=useState(false)
    const [render, setRender]=useState(false)
    const [paso, setPaso]=useState(1)

    const onChange=(event: any, selectedDate: any) => {
        const currentDate=selectedDate||date
        setShowPicker(Platform.OS==="ios") // Hide picker on Android after selection
        setDate(currentDate)
        setFechaDespacho(currentDate)
        setFechaEntrega(currentDate.toLocaleDateString())
        setFecha(currentDate.toLocaleDateString())
        handleChange("fecha_carga", currentDate)
        handleChange("fecha_entrega", currentDate)
        handleChange("ano", currentDate.getFullYear().toString())
        handleChange("dia", currentDate.getDate().toString())
        handleChange("dia_de_semana", currentDate.getDay().toString())
        handleChange("semana", numSemana.toString())
        //console.log('FECHAS', currentDate, selectedDate)
    }

    const { data: plataformas, isLoading: cargaPlataforma }=usePlataformas()
    const { data: vehiculos, isLoading: cargandoVehiculo }=useVehicles()
    const { data: choferes, isLoading: cargandoChofer }=useChoferes()
    const hoy=new Date()
    const numSemana=semanaDeAno()+1


    const [form, setForm]=useState<ServicioNoId>({
        activo: 0,
        bol: URL_FOTO_DEF,
        broker: "broker",
        carga: "carga",
        chofer: "",
        chofer_id: "",
        despachador: "pedro almendarez",
        destino: "sprinfield los simpson ",
        estatus_pago: "no cobrado",
        estatus_servicio: "en proceso",
        fecha_carga: hoy.toISOString().split('T')[0],
        fecha_entrega: hoy.toISOString().split('T')[0],
        forma_de_pago: "efectivo",
        gasto_estimado: 1200,
        info_pago: "",
        millas: 300,
        num_descargas: 1,
        observaciones: "sólo datos de carga",
        orden: "56743",
        origen: "texas",
        peso: 750,
        plataforma: "tql",
        pod: URL_FOTO_DEF,
        precio_de_servicio: 12000,
        precio_mano_de_obra: 3000,
        rc: URL_FOTO_DEF,
        ruta: "tx-sp",
        tipo_de_carga: "vehículo",
        vehiculo: "",
        vehiculo_id: "",
        dia: hoy.getDate(),
        ano: hoy.getFullYear(),
        dia_de_semana: hoy.getDay(),
        semana: numSemana
    })

    const handleChangePlataforma=(value: string) => {
        handleChange("plataforma", value)
    }
    const handleChangeVehicle=(id: string, value: string) => {
        handleChange("vehiculo", value)
        handleChange("vehiculo_id", id)
    }
    const handleChangeChofer=(id: string, value: string) => {
        handleChange("chofer", value)
        handleChange("chofer_id", id)
    }

    const handleChange=(name: string, text: string): void => {
        setForm((prev) => ({
            ...prev,
            [name]: text
        }))
    }

    const crearBorrador=async () => {
        //console.log('GUARDAR BORRADOR', form.fecha_entrega, form.fecha_carga)
        const mensajes=[]
        if (form.orden==="") mensajes.push("orden es obligatorio")
        if (form.ruta==="") mensajes.push("ruta es obligatorio")
        if (form.broker==="") mensajes.push("broker es obligatorio")
        // if (form.plataforma==="") mensajes.push("plataforma es obligatorio")
        if (form.origen==="") mensajes.push("origen es obligatorio")
        if (form.destino==="") mensajes.push("destino es obligatorio")
        if (form.precio_de_servicio===0)
            mensajes.push("el precio es obligatorio")
        if (form.forma_de_pago==="")
            mensajes.push("forma de pago es obligatorio")
        // if (form.chofer==="") mensajes.push("chofer es obligatorio")
        // if (form.vehiculo==="") mensajes.push("vehiculo es obligatorio")

        if (mensajes.length!==0) {
            Alert.alert(
                "Error, todos los campos deben ser rellenados",
                JSON.stringify(mensajes, null, 2)
            )
            mensajes.length=0
            return
        }

        setPaso(2)
        // console.log("INSERTANDO")
        // try {
        //     console.log('FECHAS', form.fecha_carga, form.fecha_entrega)
        //     setLoading(true)
        //     const res=await addServicio(form).then(r => {
        //         console.log(r)
        //         setLoading(false)
        //         Alert.alert('Registro de Carga', 'Servicio Registrado Correctamente')
        //         router.replace('/')
        //     })
        // } catch (error: any) {
        //     Alert.alert(error.message)
        // } finally {
        //     setLoading(false)
        // }
    }

    const guardaBorrador=async () => {
        const mensajes=[]
        if (form.orden==="") mensajes.push("orden es obligatorio")
        if (form.ruta==="") mensajes.push("ruta es obligatorio")
        if (form.broker==="") mensajes.push("broker es obligatorio")
        if (form.plataforma==="") mensajes.push("plataforma es obligatorio")
        if (form.origen==="") mensajes.push("origen es obligatorio")
        if (form.destino==="") mensajes.push("destino es obligatorio")
        if (form.precio_de_servicio===0)
            mensajes.push("el precio es obligatorio")
        if (form.forma_de_pago==="")
            mensajes.push("forma de pago es obligatorio")
        if (form.chofer==="") mensajes.push("chofer es obligatorio")
        if (form.vehiculo==="") mensajes.push("vehiculo es obligatorio")

        if (mensajes.length!==0) {
            Alert.alert(
                "Error, todos los campos deben ser rellenados",
                JSON.stringify(mensajes, null, 2)
            )
            mensajes.length=0
            return
        }
        //console.log("INSERTANDO")
        //console.log(JSON.stringify(form, null, 2))
        try {
            //console.log('FECHAS', form.fecha_carga, form.fecha_entrega)
            setLoading(true)
            const res=await addServicio(form).then(r => {
                //console.log(r)
                setLoading(false)
                Alert.alert('Registro de Carga', 'Servicio Registrado Correctamente')
                router.replace('/')
            })
        } catch (error: any) {
            Alert.alert(error.message)
        } finally {
            setLoading(false)
            router.back()
        }
    }


    if (loading) {
        return <Loading />
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView
                showsVerticalScrollIndicator
                style={{ display: paso===1? "flex":"none" }}
            >
                <TextLogo altura={0.07} />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#f7f7f8",
                        marginHorizontal: 20,
                        height: "auto"
                    }}
                >
                    <ThemedText type='subtitle' style={{ margin: "auto", fontSize: 16 }}>
                        Crear Carga paso 1
                    </ThemedText>
                    <View>
                        <View className='flex-row items-center justify-between gap-2'>
                            <View
                                style={{
                                    backgroundColor: "#f7f7f8",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 4
                                }}
                            >
                                <View className='flex-col flex-1 gap-2 border border-gray-300 rounded justify-items-center'>
                                    <Text className='px-1'>fecha salida</Text>
                                    <Text className='px-2'>{date.toLocaleDateString()}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View>
                                        <Button onPress={() => setShowPicker(true)} title='fecha' />
                                        {showPicker&&(
                                            <DateTimePicker
                                                testID='dateTimePicker'
                                                value={date}
                                                mode='date'
                                                display='default'
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>ruta</Text>
                                <ThemeTextInput
                                    style={{ color: "black" }}
                                    icon='arrow-redo-circle-outline'
                                    value={form.ruta}
                                    onChangeText={(text) => handleChange("ruta", text)}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", gap: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <Text>orden</Text>
                                    <ThemeTextInput
                                        style={{ color: "black" }}
                                        icon='albums-outline'
                                        value={form.orden}
                                        onChangeText={(text) => handleChange("orden", text)}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>broker</Text>
                                    <ThemeTextInput
                                        style={{ color: "black" }}
                                        icon='briefcase-outline'
                                        value={form.broker}
                                        onChangeText={(text) => handleChange("broker", text)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <ScrollView>
                                <View>
                                    <Text>origen</Text>
                                    <ThemeTextInput
                                        style={{ color: "black" }}
                                        icon='locate-outline'
                                        value={form.origen}
                                        onChangeText={(text) => handleChange("origen", text)}
                                    />
                                </View>
                                <View>
                                    <Text>destino</Text>
                                    <ThemeTextInput
                                        style={{ color: "black" }}
                                        icon='location-outline'
                                        value={form.destino}
                                        onChangeText={(text) => handleChange("destino", text)}
                                    />
                                </View>
                                <View>
                                    <Text>carga</Text>
                                    <ThemeTextInput
                                        style={{ color: "black" }}
                                        icon='archive-outline'
                                        value={form.carga}
                                        onChangeText={(text) => handleChange("carga", text)}
                                    />
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 4
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text>precio</Text>
                                        <ThemeTextInput
                                            keyboardType='numeric'
                                            style={{ color: "black" }}
                                            icon='mail-open-outline'
                                            value={form.precio_de_servicio.toString()}
                                            onChangeText={(text) =>
                                                handleChange("precio_de_servicio", text)
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text>forma de pago</Text>
                                        <ThemeTextInput
                                            style={{ color: "black" }}
                                            icon='newspaper-outline'
                                            value={form.forma_de_pago}
                                            onChangeText={(text) =>
                                                handleChange("forma_de_pago", text)
                                            }
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 5,
                                        marginTop: 20
                                    }}
                                >
                                    <Button
                                        onPress={() => crearBorrador()}
                                        disabled={loading}
                                        title='Siguiente'
                                    />
                                    <Button
                                        onPress={() => router.back()}
                                        disabled={loading}
                                        title='Cancelar'
                                        style={{ backgroundColor: "red" }}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ScrollView
                showsVerticalScrollIndicator
                style={{ display: paso===2? "flex":"none" }}
            >
                <TextLogo altura={0.07} />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#f7f7f8",
                        marginHorizontal: 20,
                        height: HEIGTH*0.5
                    }}
                >
                    <ThemedText type='subtitle' style={{ margin: "auto", fontSize: 16 }}>
                        Crear Carga Paso 2
                    </ThemedText>

                    <View className='flex-1'>
                        <View className='mt-4'>
                            <Text className='text-xl font-bold text-center uppercase'>
                                seleccione plataforma
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ gap: 4 }}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {plataformas&&
                                        plataformas.map((p) => (
                                            <Button
                                                variant='outline'
                                                title={p.nombre!}
                                                onPress={() => handleChangePlataforma(p.nombre!)}
                                                key={p.id}
                                                size='medium'
                                                style={{
                                                    backgroundColor:
                                                        form.plataforma===p.nombre!? primary:bggray
                                                }}
                                                textStyle={{
                                                    color:
                                                        form.plataforma===p.nombre!? "white":"black"
                                                }}
                                            />
                                        ))}
                                </ScrollView>
                            </View>
                        </View>

                        <View className='mt-4'>
                            <Text className='text-xl font-bold text-center uppercase'>
                                seleccione vehículo
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ gap: 4 }}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {vehiculos&&
                                        vehiculos.map((p) => (
                                            <Button
                                                variant='outline'
                                                title={p.name!}
                                                onPress={() => handleChangeVehicle(p.id, p.name!)}
                                                key={p.id}
                                                size='medium'
                                                style={{
                                                    backgroundColor:
                                                        form.vehiculo===p.name!? primary:bggray
                                                }}
                                                textStyle={{
                                                    color: form.vehiculo===p.name!? "white":"black"
                                                }}
                                            />
                                        ))}
                                </ScrollView>
                            </View>
                        </View>
                        <View className='mt-4'>
                            <Text className='text-xl font-bold text-center uppercase'>
                                seleccione chofer
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ gap: 4 }}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {choferes&&
                                        choferes.map((p) => (
                                            <Button
                                                variant='outline'
                                                title={p.username!}
                                                onPress={() =>
                                                    handleChangeChofer(p.id, p.username!)
                                                }
                                                key={p.id}
                                                size='medium'
                                                style={{
                                                    backgroundColor:
                                                        form.chofer===p.username!? primary:bggray
                                                }}
                                                textStyle={{
                                                    color: form.chofer===p.username!? "white":"black"
                                                }}
                                            />
                                        ))}
                                </ScrollView>
                            </View>
                        </View>
                        <ScrollView>
                            <View className='flex-row flex-1 gap-1 mt-10'>
                                <Button
                                    onPress={() => setPaso(1)}
                                    disabled={loading}
                                    title='Anterior'
                                />
                                <Button
                                    onPress={() => guardaBorrador()}
                                    disabled={loading}
                                    title='guardar'
                                />
                                <Button
                                    onPress={() => router.back()}
                                    disabled={loading}
                                    title='Cancelar'
                                    style={{ backgroundColor: "red" }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddModalScreen
