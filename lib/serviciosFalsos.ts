import { faker } from '@faker-js/faker'

interface FakerServicio {
    activo: number|null
    bol: string|null
    broker: string|null
    carga: string|null
    chofer: string|null
    chofer_id: string|null
    created_at: string
    despachador: string|null
    destino: string|null
    estatus_pago: string|null
    estatus_servicio: string|null
    fecha_carga: string|null
    fecha_entrega: string|null
    forma_de_pago: string|null
    gasto_estimado: number|null
    id: string
    info_pago: string|null
    millas: number|null
    num_descargas: number|null
    observaciones: string|null
    orden: string|null
    origen: string|null
    peso: number|null
    plataforma: string|null
    pod: string|null
    precio_de_servicio: number|null
    precio_mano_de_obra: number|null
    rc: string|null
    ruta: string|null
    tipo_de_carga: string|null
    vehiculo: string|null
    vehiculo_id: string|null
}

const activar=() => (
    {
        activo: faker.helpers.arrayElement([0, 1, 2]),
        bol: faker.image.avatar(),
        broker: faker.person.fullName,
        carga: faker.helpers.arrayElement(['vehículo', 'palet', 'materiales']),
        chofer: faker.helpers.arrayElement(['antonio', 'jose', 'ramon']),
        chofer_id: faker.string.uuid,
        despachador: faker.person.fullName,
        destino: faker.word,
        estatus_pago: faker.helpers.arrayElement(['cobardo', 'nomina', 'en proceso']),
        estatus_servicio: faker.helpers.arrayElement(['programado', 'realizado', 'en proceso']),
        fecha_carga: faker.date.recent,
        fecha_entrega: faker.date.future,
        forma_de_pago: faker.helpers.arrayElement(['efectivo', 'cheque', 'pasarela']),
        gasto_estimado: faker.number.int(5000),
        info_pago: faker.string.alphanumeric(30),
        millas: faker.number.int(1000),
        num_descargas: 1,
        observaciones: "",
        orden: faker.number.int(6000),
        origen: faker.company,
        peso: faker.number.int(1000),
        plataforma: faker.helpers.arrayElement(['efectivo', 'cheque', 'pasarela']),
        pod: "",
        precio_de_servicio: 0,
        precio_mano_de_obra: 0,
        rc: "",
        ruta: "",
        tipo_de_carga: "",
        vehiculo: "",
        vehiculo_id: ""
    })

activar()
//console.log(activar)