import { fetchPlataformaSemanas } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useResumenPlataformas=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['plataformasBySemanas'],
        queryFn: fetchPlataformaSemanas,
        staleTime: 1000*60*60,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}