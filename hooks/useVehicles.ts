import { fetchVehicles } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useVehicles=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['vehiculos'],
        queryFn: fetchVehicles,
        staleTime: 1000*60*60,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}