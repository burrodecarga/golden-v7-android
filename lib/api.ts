import { Database } from "@/db_types"
import { GastoDeServicioNoID, ServicioNoId } from "@/utils/types"
import { supabase } from "./supabase"

export const SERVICIO_SEMANA=
  `id,
activo,
bol,
broker,
carga,
chofer,
chofer_id,
created_at,
despachador,
destino,
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
precio_de_servicio,
precio_mano_de_obra,
rc,
ruta,
tipo_de_carga,
vehiculo,
vehiculo_id,
ano,
dia_de_semana,
semana,
fotos_servicios ( 
created_at,
fecha,
id,
observacion,
servicio_id,
ubicacion,
url)`

export const fetchUsers=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}



export type Users=Awaited<ReturnType<typeof fetchUsers>>
export type User=Users[number]

export const fetchContacts=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const getProfile=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type Contacts=Awaited<ReturnType<typeof fetchContacts>>
export type Contact=Contacts[number]

export const fetchMessages=async (userId: string, contactId: string) => {
  const { data, error }=await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${contactId},receiver_id.eq.${contactId}`)
    .order("created_at", { ascending: false })
  if (error) {
    console.log("error", error.message)
    return []
  } else {
    return data
  }
}

export type Messages=Awaited<ReturnType<typeof fetchMessages>>
export type Message=Messages[number]

export const downloadAvatar=async (path: string): Promise<string> => {
  try {
    const { data, error }=await supabase.storage
      .from("avatars")
      .download(path)
    if (error) throw error
    const fr=new FileReader()
    fr.readAsDataURL(data)
    return new Promise((resolve) => {
      fr.onload=() => {
        resolve(fr.result as string)
      }
    })
  } catch (err) {
    console.log("error", err)
    return ""
  }
}

export type Profile=Database["public"]["Tables"]["profiles"]["Row"]

export const fetchVehicles=async () => {
  const { data, error }=await supabase.from("vehicles").select(`
  id,
  name,
  document,
  fotos_vehiculos ( foto )
`)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type Vehicles=Awaited<ReturnType<typeof fetchVehicles>>
export type Fotos_Vehiculos=
  Database["public"]["Tables"]["fotos_vehiculos"]["Row"]
//export type Vehicle=Vehicles[number]

export const fetchServicios=async () => {
  const { data, error }=await supabase.from("servicios").select(`
id,
activo,
bol,
broker,
carga,
chofer,
chofer_id,
created_at,
despachador,
destino,
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
precio_de_servicio,
precio_mano_de_obra,
rc,
ruta,
tipo_de_carga,
vehiculo,
vehiculo_id,
ano,
dia_de_semana,
semana,
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
`).order("semana", {
    ascending: false,
  })
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}


export const fetchServiciosByActivo=async (activo: number) => {
  const { data, error }=await supabase.from("servicios").select(`
id,
activo,
bol,
broker,
carga,
chofer,
chofer_id,
created_at,
despachador,
destino,
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
precio_de_servicio,
precio_mano_de_obra,
rc,
ruta,
tipo_de_carga,
vehiculo,
vehiculo_id,
ano,
dia_de_semana,
semana,
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
`).eq('activo', activo).order("semana", {
    ascending: false,
  })
  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log('BAck', data)
    return data
  }
}

export const fetchServicioById=async (id: string) => {
  const { data, error }=await supabase.from("servicios").select(`
id,
activo,
bol,
broker,
carga,
chofer,
chofer_id,
created_at,
despachador,
destino,
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
precio_de_servicio,
precio_mano_de_obra,
rc,
ruta,
tipo_de_carga,
vehiculo,
vehiculo_id,
ano,
dia_de_semana,
semana,
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
`).eq('id', id).order("semana", {
    ascending: false,
  }).limit(1)
  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log("EXITO", data)
    return data
  }
}

export type ServicioByID=Awaited<ReturnType<typeof fetchServicioById>>
export type Servicios=Awaited<ReturnType<typeof fetchServicios>>
export type Servicio=Servicios[number]
export type ServicioRow=Database["public"]["Tables"]["servicios"]["Row"]
export type Fotos_Servicios=
  Database["public"]["Tables"]["fotos_servicios"]["Row"]

export const addServicio=async (datos: ServicioNoId) => {
  //console.log(datos)
  const { data, error }=await supabase
    .from("servicios")
    .insert(datos)
    .select()

  if (error) {
    console.log("error", error.message)

    throw error.cause
  } else {
    //console.log("EXITO", data)
    return data
  }
}



export const fetchSemana=async (semana: number) => {
  const { data, error }=await supabase.from("servicios").select('*').eq('semana', semana)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type NumSemanas=Awaited<ReturnType<typeof fetchSemana>>
export type NumSemana=NumSemanas[number]



export const fetchSemanas=async () => {
  const { data, error }=await supabase.from("resultado_por_semana_y_dia").select('*')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}
export type Semanas=Awaited<ReturnType<typeof fetchSemanas>>
export type Semana=Semanas[number]


export const fetchAllUsers=async () => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type AllUsers=Awaited<ReturnType<typeof fetchAllUsers>>
export type AllUser=AllUsers[number]


export const fetchAllChofer=async () => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
    .eq('role', 'chofer')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const fetchPlataformas=async () => {
  const { data, error }=await supabase.from("plataformas").select('*')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}
export type Plataformas=Awaited<ReturnType<typeof fetchPlataformas>>
export type Plataforma=Plataformas[number]


export const fetchChoferSemanas=async () => {
  const { data, error }=await supabase.from("resultado_semanal_por_chofer").select('*')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}
export type ChoferSemanas=Awaited<ReturnType<typeof fetchChoferSemanas>>
export type ChoferSemana=Plataformas[number]


export const fetchVehiculoSemanas=async () => {
  const { data, error }=await supabase.from("resultado_semanal_por_vehiculo").select('*')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}
export type VehiculoSemanas=Awaited<ReturnType<typeof fetchVehiculoSemanas>>
export type VehiculoSemana=Plataformas[number]

export const fetchPlataformaSemanas=async () => {
  const { data, error }=await supabase.from("resultado_semanal_por_plataforma").select('*')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}
export type PlataformaSemanas=Awaited<ReturnType<typeof fetchPlataformaSemanas>>
export type PlataformaSemana=Plataformas[number]


export const updateServicioByBol=async (id: string, bol: string) => {
  const { data, error }=await supabase
    .from('servicios')
    .update({ 'bol': bol })
    .eq('id', id)
    .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const updateServicioByPod=async (id: string, pod: string) => {
  const { data, error }=await supabase
    .from('servicios')
    .update({ 'pod': pod })
    .eq('id', id)
    .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}


export const updateServicioByRc=async (id: string, rc: string) => {
  const { data, error }=await supabase
    .from('servicios')
    .update({ 'rc': rc })
    .eq('id', id)
    .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const getServicioById=async (id: string) => {
  let { data, error }=await supabase
    .from('servicios')
    .select("*")
    // Filters
    .eq('id', id)


  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const getServicioByChoferId=async (id: string) => {
  let { data, error }=await supabase
    .from('servicios')
    .select("*")
    // Filters
    .eq('chofer_id', id)


  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}



export const uploadImagen=async (filePath: string, formData: FormData) => {
  const { error }=await supabase.storage
    .from("documentos")
    .upload(filePath, formData)

  if (error) throw error

  const { data }=supabase.storage.from("documentos").getPublicUrl(filePath)
  return data.publicUrl
}

export const uploadImage=async (filePath: string, formData: FormData) => {
  const { error }=await supabase.storage
    .from("documentos")
    .upload(filePath, formData)

  if (error) {
    throw new Error(error.message)
  }
}


export const addGastoDeServicio=async (datos: GastoDeServicioNoID) => {
  const { data, error }=await supabase
    .from('gastos_servicios')
    .insert(
      datos
    )
    .select()

  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log('GANO')
    return data
  }
}


export const fetchServiciosBySemana=async (semana: number) => {
  const { data, error }=await supabase.from("servicios").select(`(*), gastos_servicios(*),fotos_servicios(*)`).eq('semana', semana).order("semana", {
    ascending: false,
  })

  if (error) {
    console.log("error", error)
    return []
  } else {
    console.log('GANO')
    return data
  }
}


export const fetchServiciosBySemanaChofer=async (semana: number, chofer: string) => {
  const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('chofer', chofer).order("semana", {
    ascending: false,
  })

  if (error) {
    console.log("error", error)
    return []
  } else {
    console.log('GANO')
    return data
  }
}

export const fetchServiciosBySemanaVehiculo=async (semana: number, vehiculo: string) => {
  const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('vehiculo', vehiculo).order("semana", {
    ascending: false,
  })

  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log('GANO')
    return data
  }
}

export const fetchServiciosBySemanaPlataforma=async (semana: number, plataforma: string) => {
  const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('plataforma', plataforma).order("semana", {
    ascending: false,
  })

  if (error) {
    console.log("error", error)
    return []
  } else {
    //console.log('GANO')
    return data
  }
}





