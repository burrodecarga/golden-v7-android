import { fetchAllChofer } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useChoferes=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['choferes'],
        queryFn: fetchAllChofer,
        staleTime: 1000*60,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}