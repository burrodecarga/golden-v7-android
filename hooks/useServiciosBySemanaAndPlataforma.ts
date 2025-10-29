import { fetchServiciosBySemanaPlataforma } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useServiciosBySemanaAndPlataforma=(semana: number, plataforma: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosBySemanaAndPlataforma', semana, plataforma],
        queryFn: ({ queryKey }) => fetchServiciosBySemanaPlataforma(queryKey[1] as number, queryKey[2] as string),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}