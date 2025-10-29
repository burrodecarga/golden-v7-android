import { useQuery } from '@tanstack/react-query'
import { GetAllServicios } from '../lib/servicios/api_servicios'

export const useServicios=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['servicios'],
        queryFn: GetAllServicios,
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}