import { CPRIMARY } from '@/constants/Colors'
import { semanaDeAno } from '@/constants/constantes'
import { URL_FOTO_DEF } from "@/constants/Images"
import { ServicioNoId } from "@/utils/types"
import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'


const PrimerPasoScreen=() => {
    const currentDate=dayjs().format('YYYY-MM-DD')
    const maxDate=dayjs().add(14, 'day').format('YYYY-MM-DD')
    const hoy=new Date()
    const numSemana=semanaDeAno()+1


    const [selectedDate, setSelectedDate]=useState(currentDate)
    const [fecha, setFecha]=useState("")
    const [fechaDespacho, setFechaDespacho]=useState(new Date())
    const [fechaEntrega, setFechaEntrega]=useState("")
    const [date, setDate]=useState(new Date())


    const [form, setForm]=useState<ServicioNoId>({
        activo: 0,
        bol: URL_FOTO_DEF,
        broker: "",
        carga: "",
        chofer: "",
        chofer_id: "",
        despachador: "pedro almendarez",
        destino: "sprinfield los simpson ",
        estatus_pago: "no cobrado",
        estatus_servicio: "en proceso",
        fecha_carga: "",
        fecha_entrega: "",
        forma_de_pago: "",
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


    const onChange=(selectedDate: any) => {
        const currentDate=selectedDate
        setDate(currentDate)
        setFechaDespacho(currentDate)
        setFechaEntrega(currentDate.toString())
        setFecha(currentDate.toString())
        handleChange("fecha_carga", currentDate)
        handleChange("fecha_entrega", currentDate)
        handleChange("ano", currentDate)
        handleChange("dia", currentDate.getDate().toString())
        handleChange("dia_de_semana", currentDate.getDay().toString())
        handleChange("semana", numSemana.toString())
    }



    const onChangeDate=useCallback((day: string) => {
        setSelectedDate(day)
        //console.log(selectedDate)
        handleChange('fecha_carga', selectedDate)
        handleChange('fecha_entrega', selectedDate)
    }, [])

    const handleChange=useCallback((name: string, value: string) => {
        //console.log(name, value)
        setForm((prevState) => ({
            ...prevState,
            slot: {
                ...prevState,
                [name]: value
            }
        }))
        //console.log(form)
    }, [])


    return (
        <ScrollView className=''>

            <Calendar minDate={currentDate} maxDate={maxDate}
                onDayPress={day => {
                    setSelectedDate(day.dateString)
                    handleChange('fecha_carga', selectedDate)
                    onChange(selectedDate)
                    //console.log(form)
                }}
                markedDates={{
                    [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: CPRIMARY }
                }}
                theme={{
                    selectedDayTextColor: 'red',
                    selectedDayBackgroundColor: CPRIMARY,
                    arrowColor: CPRIMARY
                }}
            />
            <View className='items-center justify-center bg-gray-400' >

                <Text>fecha carga:{fechaDespacho.toString()}</Text>
                <Text>{form.fecha_entrega}</Text>
            </View>
        </ScrollView>
    )
}

export default PrimerPasoScreen