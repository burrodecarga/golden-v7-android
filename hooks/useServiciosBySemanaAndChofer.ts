import { fetchServiciosBySemanaChofer } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useServiciosBySemanaAndChofer=(semana: number, chofer: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({

        queryKey: ['serviciosBySemanaAndChofer', semana, chofer],
        queryFn: ({ queryKey }) => fetchServiciosBySemanaChofer(semana, chofer),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}