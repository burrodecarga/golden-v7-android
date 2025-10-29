import { Database } from "@/db_types"
import { supabase } from "@/lib/supabase"

export interface ServicioRow {
    Servicio: {
        activo?: number|null
        allDay?: boolean|null
        ano?: number|null
        backgroundColor?: string|null
        bol?: string|null
        broker?: string|null
        carga?: string|null
        chofer?: string|null
        chofer_id?: string|null
        created_at?: string
        despachador?: string|null
        destino?: string|null
        dia?: number|null
        dia_de_semana?: number|null
        editable?: boolean|null
        end?: string|null
        estatus_pago?: string|null
        estatus_servicio?: string|null
        fecha_carga?: string|null
        fecha_entrega?: string|null
        forma_de_pago?: string|null
        gasto_estimado?: number|null
        id: string
        info_pago?: string|null
        millas?: number|null
        num_descargas?: number|null
        observaciones?: string|null
        orden?: string|null
        origen?: string|null
        peso?: number|null
        plataforma?: string|null
        pod?: string|null
        position?: number|null
        precio_de_servicio?: number|null
        precio_mano_de_obra?: number|null
        rc?: string|null
        ruta?: string|null
        semana?: number|null
        start?: string|null
        textColor?: string|null
        tipo_de_carga?: string|null
        title?: string|null
        vehiculo?: string|null
        vehiculo_id?: string|null
    }
}

const SERVICIO=
    `    activo, 
          allDay, 
          ano, 
          backgroundColor, 
          bol, 
          broker, 
          carga, 
          chofer, 
          chofer_id, 
          created_at,
          despachador, 
          destino, 
          dia, 
          dia_de_semana, 
          editable: boolean 
          end, 
          estatus_pago, 
          estatus_servicio, 
          fecha_carga, 
          fecha_entrega, 
          forma_de_pago, 
          gasto_estimado, 
          id,
          info_pago, 
          millas, 
          num_descargas, 
          observaciones, 
          orden, 
          origen, 
          peso, 
          plataforma, 
          pod, 
          position, 
          precio_de_servicio, 
          precio_mano_de_obra, 
          rc, 
          ruta, 
          semana, 
          start, 
          textColor, 
          tipo_de_carga, 
          title, 
          vehiculo, 
          vehiculo_id
    `

const SERVICIO_RELACIONES=`activo, 
          allDay, 
          ano, 
          backgroundColor, 
          bol, 
          broker, 
          carga, 
          chofer, 
          chofer_id, 
          created_at,
          despachador, 
          destino, 
          dia, 
          dia_de_semana, 
          editable, 
          end, 
          estatus_pago, 
          estatus_servicio, 
          fecha_carga, 
          fecha_entrega, 
          forma_de_pago, 
          gasto_estimado, 
          id,
          info_pago, 
          millas, 
          num_descargas, 
          observaciones, 
          orden, 
          origen, 
          peso, 
          plataforma, 
          pod, 
          position, 
          precio_de_servicio, 
          precio_mano_de_obra, 
          rc, 
          ruta, 
          semana, 
          start, 
          textColor, 
          tipo_de_carga, 
          title, 
          vehiculo, 
          vehiculo_id
    ,
fotos_servicios ( 
created_at,
fecha,
id,
observacion,
servicio_id,
ubicacion,
url
 ),
 gastos_servicios(
created_at,
fecha,
id,
monto,
servicio_id,
tipo,url)
`
const SERVICIO_INICIAL={
    activo: 0,
    allDay: true,
    ano: 0,
    backgroundColor: '',
    bol: '',
    broker: '',
    carga: '',
    chofer: '',
    chofer_id: '',
    despachador: '',
    destino: '',
    dia: 0,
    dia_de_semana: 0,
    editable: true,
    end: '',
    estatus_pago: '',
    estatus_servicio: '',
    fecha_carga: '',
    fecha_entrega: '',
    forma_de_pago: '',
    gasto_estimado: 0,
    info_pago: '',
    millas: 0,
    num_descargas: 0,
    observaciones: '',
    orden: '',
    origen: '',
    peso: 0,
    plataforma: '',
    pod: '',
    position: 0,
    precio_de_servicio: 0,
    precio_mano_de_obra: 0,
    rc: '',
    ruta: '',
    semana: 0,
    start: '',
    textColor: '',
    tipo_de_carga: '',
    title: '',
    vehiculo: '',
    vehiculo_id: '',
}


export const GetAllServicios=async () => {
    const { data, error }=await supabase.from("servicios").select(SERVICIO_RELACIONES).order("semana", {
        ascending: false,
    })
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}


export type APIServicios=Awaited<ReturnType<typeof GetAllServicios>>
export type APIServicio=APIServicios[number]
export type APIServicioRow=Database["public"]["Tables"]["servicios"]["Row"]
export type Fotos_Servicios=
    Database["public"]["Tables"]["fotos_servicios"]["Row"]


export const getServiciosPorSemana=async (semana: number) => {
    const { data, error }=await supabase.from("servicios").select(SERVICIO_RELACIONES).eq('semana', semana)
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export type NumSemanas=Awaited<ReturnType<typeof getServiciosPorSemana>>
export type NumSemana=NumSemanas[number]

export const getServicioByChoferId=async (id: string) => {
    let { data, error }=await supabase
        .from('servicios')
        .select(SERVICIO_RELACIONES)
        // Filters
        .eq('chofer_id', id)


    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}
