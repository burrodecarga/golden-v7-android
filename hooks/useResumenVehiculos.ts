import { fetchVehiculoSemanas } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useResumenVehiculos=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['vehiculosBySemanas'],
        queryFn: fetchVehiculoSemanas,
        staleTime: 1000*60//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}