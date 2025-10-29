import { fetchServiciosBySemanaVehiculo } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useServiciosBySemanaAndVehiculo=(semana: number, vehiculo: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosBySemanaAndVehiculo', semana, vehiculo],
        queryFn: ({ queryKey }) => fetchServiciosBySemanaVehiculo(queryKey[1] as number, queryKey[2] as string),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}