import { useQuery } from '@tanstack/react-query'
import { getServicioByChoferId } from '../lib/servicios/api_servicios'

export const useServiciosByChoferId=(chofer: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosByChofer', chofer],
        queryFn: ({ queryKey }) => getServicioByChoferId(queryKey[1]),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}