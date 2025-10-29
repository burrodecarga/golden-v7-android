import { semanaDeAno } from "@/constants/constantes"
import { router } from "expo-router"
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from "react"
import { Alert } from "react-native"
import { URL_FOTO_DEF } from "../constants/Images"
import { Profile } from "./api"
import { supabase } from "./supabase"

// definir context para guardar el session y el profile

export interface useServiceInfo {
	form: {
		activo: number,
		bol: string,
		broker: string,
		carga: string,
		chofer: string,
		chofer_id: string,
		despachador: string,
		destino: string,
		estatus_pago: string,
		estatus_servicio: string,
		fecha_carga: string,
		fecha_entrega: string,
		forma_de_pago: string,
		gasto_estimado: number,
		info_pago: string,
		millas: number,
		num_descargas: number,
		observaciones: string,
		orden: string,
		origen: string,
		peso: number,
		plataforma: string,
		pod: string,
		precio_de_servicio: number,
		precio_mano_de_obra: number,
		rc: string,
		ruta: string,
		tipo_de_carga: string,
		vehiculo: string,
		vehiculo_id: string,
		dia: number,
		ano: number,
		dia_de_semana: number,
		semana: number
	}
	saveInfo?: (name: string, value: string) => void
	getInfo?: () => Promise<void>
}

const InitialForm={
	activo: 0,
	bol: URL_FOTO_DEF,
	broker: "",
	carga: "",
	chofer: "",
	chofer_id: "",
	despachador: "",
	destino: "",
	estatus_pago: "no cobrado",
	estatus_servicio: "programado",
	fecha_carga: "",
	fecha_entrega: "",
	forma_de_pago: "",
	gasto_estimado: 0,
	info_pago: "",
	millas: 0,
	num_descargas: 1,
	observaciones: "",
	orden: "",
	origen: "",
	peso: 0,
	plataforma: "",
	pod: URL_FOTO_DEF,
	precio_de_servicio: 0,
	precio_mano_de_obra: 0,
	rc: URL_FOTO_DEF,
	ruta: "",
	tipo_de_carga: "",
	vehiculo: "",
	vehiculo_id: "",
	dia: 1,
	ano: 2025,
	dia_de_semana: 0,
	semana: 1

}


const ServiveContext=createContext<useServiceInfo>({
	form: InitialForm,
})

// crear un provider donde vamos a tener la logica para escuchar cambios de la session
export function AuthProvider({ children }: { children: ReactNode }) {

	const [useServiceInfo, setuseServiceInfo]=useState<useServiceInfo>({
		form: InitialForm,

	})

	const [numSemana, setNumSemana]=useState(1)
	const [loading, setLoading]=useState(false)


	const getProfile=async () => {
		if (!useServiceInfo.session) return
		const { data, error }=await supabase
			.from("profiles")
			.select("*")
			.eq("id", useServiceInfo.session.user.id)
		if (error) {
			console.log(error)
		} else {
			setuseServiceInfo({ ...useServiceInfo, profile: data[0], role: data[0].role, userId: useServiceInfo.session.user.id })
		}
	}

	useEffect(() => {
		async function fetchSession() {

			const { error, data }=await supabase.auth.getSession()
			if (error) {
				throw error
			}
			if (data.session) {
				setuseServiceInfo({ ...useServiceInfo, session: data.session })
			} else {
				router.replace('/(auth)/login')
			}
			setLoading(false)
		}
		fetchSession()

		const { data: authListener }=supabase.auth.onAuthStateChange(async (_event, session) => {

			setuseServiceInfo({
				session,
				profile: null,
				numSemana: 1,
				role: null,
				userId: '000000',
				vehiculos: undefined
			})

			setLoading(false)
			//console.log('SESSION', session)
			if (session) {
				getProfile()
				router.replace('/')
			} else {
				router.replace('/(auth)/login')
			}
		})
		//console.log(useServiceInfo)
		return () => authListener.subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])








	const saveProfile=async (
		updatedProfile: Profile,
		avatarUpdated: boolean
	) => {
		console.log("SAVE PROFILE")
		setLoading(true)

		try {
			if (updatedProfile.avatar_url&&avatarUpdated) {
				const { avatar_url }=updatedProfile

				const fileExt=avatar_url.split(".").pop()
				const fileName=avatar_url.replace(/^.*[\\\/]/, "")
				const filePath=`${Date.now()}.${fileExt}`

				const formData=new FormData()
				const photo={
					uri: avatar_url,
					name: fileName,
					type: `image/${fileExt}`
				} as unknown as Blob
				formData.append("file", photo)

				const { error }=await supabase.storage
					.from("avatars")
					.upload(filePath, formData)
				if (error) throw error
				updatedProfile.avatar_url=filePath
			}
			const { error }=await supabase
				.from("profiles")
				.update(updatedProfile)
				.eq("id", useServiceInfo?.profile?.id!)
			if (error) {
				throw error
			} else {
				console.log("PROFILE SAVED")
				getProfile()
			}
		} catch (error: any) {
			Alert.alert("Server Error", error.message)
		}

		setLoading(false)
	}

	useEffect(() => {
		if (!useServiceInfo.session) return
		getProfile()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useServiceInfo.session])

	useEffect(() => {
		setNumSemana(semanaDeAno()+1)

	}, [])

	return (
		<ServiveContext.Provider
			value={{ ...useServiceInfo, loading, saveProfile, getProfile, numSemana }}
		>
			{children}
		</ServiveContext.Provider>
	)
}

// crear un hook reutilizable que utilice el context
export function useuseServiceInfo() {
	return useContext(ServiveContext)
}
