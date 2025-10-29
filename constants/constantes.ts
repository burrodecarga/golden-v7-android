import * as Haptics from 'expo-haptics'
import { Dimensions } from "react-native"


export const WIDTH=Dimensions.get("screen").width
export const HEIGTH=Dimensions.get("screen").height
export const SEMANA=['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado']
export const MESES=["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

export const getLunes=() => {
    let lunes=0
    const fecha=new Date()
    const dia=fecha.getDay()
    switch (dia) {
        case 0: lunes=fecha.getDate()+1
            break
        case 1: lunes=fecha.getDate()+0
            break
        case 2: lunes=fecha.getDate()-1
            break
        case 3: lunes=fecha.getDate()-2
            break
        case 4: lunes=fecha.getDate()-3
            break
        case 5: lunes=fecha.getDate()+4
            break
        case 6: lunes=fecha.getDate()-5
            break
    }
    const ano=fecha.getFullYear()
    const mes=fecha.getMonth()
    //console.log(mes)
    return new Date(ano, mes, lunes, 12)

}


export const getSemanaEnMes=() => {
    const fecha=new Date()
    const year=fecha.getFullYear()
    const month=fecha.getMonth()
    const daysNum=32-new Date(year, month, 32).getDate(),
        fDayO=new Date(year, month, 1).getDay(),
        fDay=fDayO? (fDayO-1):6,
        weeksNum=Math.ceil((daysNum+fDay)/7)
    return weeksNum
}

export const semanaDeAno=(): number => {
    const date=new Date()
    const startOfYear: Date=new Date(date.getFullYear(), 0, 1)
    //console.log(date, startOfYear)
    startOfYear.setDate(startOfYear.getDate()+(startOfYear.getDay()%7))
    const res: any=Number(date)-Number(startOfYear)
    return Math.round((res)/(7*24*3600*1000))+1

}

export const getColoresRandom=() => ('#'+(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, '0'))

export const delay=(time=100) => {
    setTimeout(() => {
        return true
    }, time)
}

export const handleMov=() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export const servicioVacio={
    activo: null,
    ano: null,
    bol: null,
    broker: null,
    carga: null,
    chofer: null,
    chofer_id: null,
    created_at: null,
    despachador: null,
    destino: null,
    dia: null,
    dia_de_semana: null,
    estatus_pago: null,
    estatus_servicio: null,
    fecha_carga: null,
    fecha_entrega: null,
    forma_de_pago: null,
    gasto_estimado: null,
    id: null,
    info_pago: null,
    millas: null,
    num_descargas: null,
    observaciones: null,
    orden: null,
    origen: null,
    peso: null,
    plataforma: null,
    pod: null,
    precio_de_servicio: null,
    precio_mano_de_obra: null,
    rc: null,
    ruta: null,
    semana: null,
    tipo_de_carga: null,
    vehiculo: null,
    vehiculo_id: null,
}