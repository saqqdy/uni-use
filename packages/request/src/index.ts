// import { isRef, ref } from 'vue-demi'
import axios from 'axios'
import wrapper from 'axios-series'
// import type { Ref } from 'vue-demi'
import type {
	AxiosInstance,
	AxiosResponse,
	CancelToken,
	// CancelTokenSource,
	InternalAxiosRequestConfig
} from 'axios'
import { ref, shallowRef } from '@vue/reactivity'

// type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
// type Combination = 'overwrite' | 'chain'

// const payloadMapping: Record<string, string> = {
// 	json: 'application/json',
// 	text: 'text/plain',
//   }

export interface UseRequestRequestOptions<D = any> extends InternalAxiosRequestConfig<D> {
	['use-request']?: any
	unique?: boolean
	orderly?: boolean
	// requestOptions?: UseRequestRequestOptions
	cancelToken?: CancelToken
	type?: string
	error?: boolean
}

export interface UseRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
	unique?: boolean
	orderly?: boolean
	refetch?: boolean
	immediate?: boolean
	setHeaders?(instance: AxiosInstance): void
	onRequest?(
		config: InternalAxiosRequestConfig
		// requestOptions: UseRequestRequestOptions
	): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
	onRequestError?(error: any): void
	onResponse?(
		res: AxiosResponse<any>
		// requestOptions: UseRequestRequestOptions
	): AxiosResponse<any> | Promise<AxiosResponse<any>>
	onResponseError?(error: any): void
	onError?(error: any): void
	onCancel?(error: any): void
}

let instance: AxiosInstance, axiosSeries: any
const defaultOptions = {
	unique: false,
	orderly: true,
	refetch: false,
	immediate: true
}

function useRequest<T = any>(config: UseRequestConfig<T>) {
	config = Object.assign(defaultOptions, config)
	// const {
	// 	unique,
	// 	orderly,
	// 	setHeaders,
	// 	onRequest,
	// 	onRequestError,
	// 	onResponse,
	// 	onResponseError,
	// 	onError
	// 	// onCancel
	// } = config
	// const { refetch } = config

	const data = shallowRef(null)
	const error = shallowRef(null)
	const isFetching = ref(false)

	// const execute = ref(null)

	// if (!instance) instance = axios.create()
	// if (!axiosSeries)
	// 	axiosSeries = wrapper(instance, {
	// 		unique,
	// 		orderly
	// 	})

	// if (setHeaders) setHeaders(instance)

	// if (onRequest) {
	// 	instance.interceptors.request.use(onRequest, (err: any) => {
	// 		onRequestError && onRequestError(err)
	// 		onError && onError(err)
	// 		return Promise.reject(err)
	// 	})
	// }

	// if (onResponse) {
	// 	instance.interceptors.response.use(onResponse, (err: any) => {
	// 		onResponseError && onResponseError(err)
	// 		onError && onError(err)
	// 		return Promise.reject(err)
	// 	})
	// }

	// /**
	//  * request
	//  */
	// function request(config: UseRequestRequestOptions) {
	// 	return axiosSeries(config)
	// }

	/**
	 * create request
	 */
	function createRequest() {
		return ''
	}

	return {
		instance,
		data,
		error,
		//
		createRequest
		// request
	}
}

export default useRequest
