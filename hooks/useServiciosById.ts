import { fetchServicioById } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useServiciosById=(id: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosById', id],
        queryFn: ({ queryKey }) => fetchServicioById(queryKey[1] as string),
        staleTime: 100,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}