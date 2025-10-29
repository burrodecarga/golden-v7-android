export interface ServicioNoId {
    activo: number
    bol: string
    broker: string
    carga: string
    chofer: string
    chofer_id: string
    despachador: string
    destino: string
    estatus_pago: string
    estatus_servicio: string
    fecha_carga: string
    fecha_entrega: string
    forma_de_pago: string
    gasto_estimado: number
    info_pago: string
    millas: number
    num_descargas: number
    observaciones: string
    orden: string
    origen: string
    peso: number
    plataforma: string
    pod: string
    precio_de_servicio: number
    precio_mano_de_obra: number
    rc: string
    ruta: string
    tipo_de_carga: string
    vehiculo: string
    vehiculo_id: string
    ano: number
    dia: number
    dia_de_semana: number
    semana: number
}
export interface Gasto {
    created_at?: string
    fecha?: string|null
    id?: string
    monto?: number|null
    servicio_id?: string|null
    tipo?: string|null
}

export interface ServicioSiId {
    id?: string
    activo?: number|undefined|null
    bol?: string|null
    broker: string
    carga: string
    chofer: string
    chofer_id: string
    despachador: string
    destino: string
    estatus_pago: string
    estatus_servicio: string
    fecha_carga: string
    fecha_entrega: string
    forma_de_pago: string
    gasto_estimado: number
    info_pago: string
    millas: number
    num_descargas: number
    observaciones: string
    orden: string
    origen: string
    peso: number
    plataforma: string
    pod: string
    precio_de_servicio: number
    precio_mano_de_obra: number
    rc: string
    ruta: string
    tipo_de_carga: string
    vehiculo: string
    vehiculo_id: string
}

export interface GastoDeServicioNoID {
    created_at?: string
    fecha?: string
    id?: string
    monto: number
    servicio_id: string
    tipo: string
    url: string
}

export interface ProfileProps {
    id?: string
    updated_at?: Date
    username?: string
    full_name: string
    avatar_url?: string
    website?: string
    first_name: string
    last_name: string
    phone: string
    birthday?: Date
    driver_license_url?: string
    medical_certificate_url?: string
    social_security_url?: string
    work_permit_url?: string
    w_9_url?: string
    role: string
    activo: number
}
