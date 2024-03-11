// import { isRef, ref } from 'vue-demi'
import axios from 'axios'
import wrapper from 'axios-series'
import until from 'use-until'
import type { ComputedRef, Ref } from 'vue-demi'
import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	CancelToken,
	// CancelTokenSource,
	InternalAxiosRequestConfig
} from 'axios'
import { ref, shallowRef } from 'vue-demi'
import to from 'await-to-done'

/**
 * Void function
 */
export type Fn = () => void

/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>

/**
 * Maybe it's a ref, or a plain value, or a getter function
 *
 * ```ts
 * type MaybeRefOrGetter<T> = (() => T) | T | Ref<T> | ComputedRef<T>
 * ```
 */
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

// type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
// type Combination = 'overwrite' | 'chain'

// const payloadMapping: Record<string, string> = {
// 	json: 'application/json',
// 	text: 'text/plain',
//   }

export interface UseRequestReturn<T> {
	/**
	 * Indicates if the fetch request has finished
	 */
	isFinished: Ref<boolean>

	/**
	 * The statusCode of the HTTP fetch response
	 */
	statusCode: Ref<number | null>
	statusText: Ref<string>

	/**
	 * The raw response of the fetch response
	 */
	response: Ref<AxiosResponse<any> | undefined>

	/**
	 * Any fetch errors that may have occurred
	 */
	error: Ref<any>

	/**
	 * The fetch response body on success, may either be JSON or text
	 */
	data: Ref<T | null>

	/**
	 * Indicates if the request is currently being fetched.
	 */
	isFetching: Ref<boolean>

	/**
	 * Indicates if the fetch request is able to be aborted
	 */
	canAbort?: ComputedRef<boolean>

	/**
	 * Indicates if the fetch request was aborted
	 */
	// aborted: Ref<boolean>

	/**
	 * Abort the fetch request
	 */
	// abort: Fn

	/**
	 * request main function
	 */
	request: <T = any, R = AxiosResponse<T>, D = any>(
		config: UseRequestRequestOptions<D> // InternalAxiosRequestConfig<T> & UseRequestConfig
	) => Promise<R>

	/**
	 * Manually call the fetch
	 * (default not throwing error)
	 */
	// execute: (throwOnFailed?: boolean) => Promise<any>

	/**
	 * Fires after the fetch request has finished
	 */
	// onResponse: EventHookOn<Response>

	/**
	 * Fires after a fetch request error
	 */
	// onError: EventHookOn

	/**
	 * Fires after a fetch has completed
	 */
	// onFinally: EventHookOn
}

// type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
// type Combination = 'overwrite' | 'chain'

export interface UseRequestRequestOptions<D = any> extends InternalAxiosRequestConfig<D> {
	// ['use-request']?: any
	unique?: boolean
	orderly?: boolean
	// requestOptions?: UseRequestRequestOptions
	cancelToken?: CancelToken
	signal?: AbortSignal
	type?: string
	error?: boolean
}

export interface UseRequestConfig {
	unique?: boolean
	orderly?: boolean

	cancelToken?: CancelToken
	signal?: AbortSignal
	type?: string
	error?: boolean

	refetch?: boolean
	immediate?: boolean
	setHeaders?(instance: AxiosInstance): void
	beforeRequest?(
		config: InternalAxiosRequestConfig
		// requestOptions: UseRequestRequestOptions
	): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
	afterRequest?(
		res: AxiosResponse<any>
		// requestOptions: UseRequestRequestOptions
	): AxiosResponse<any> | Promise<AxiosResponse<any>>
	updateDataOnError?: boolean
	onRequestError?(error: any): void
	onResponseError?(error: any): void
	onError?(error: any): void
	onCancel?(error: any): void
}

let instance: AxiosInstance, axiosSeries: ReturnType<typeof wrapper>
const defaultOptions = {
	unique: true,
	orderly: true,
	refetch: false,
	immediate: true
}

// function useRequest<T = any>(
// 	config: InternalAxiosRequestConfig<T> & UseRequestConfig
// ): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>>
// function useRequest<T = any>(
// 	config: InternalAxiosRequestConfig<T>,
// 	options: UseRequestConfig
// ): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>>
function useRequest<T = any>(
	url: string,
	config: InternalAxiosRequestConfig<T> & UseRequestConfig,
	options?: UseRequestConfig
): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>> {
	config = Object.assign({}, defaultOptions, config)
	const {
		unique,
		orderly,
		immediate,
		// setHeaders,
		beforeRequest,
		afterRequest,
		// updateDataOnError = false,
		// onRequestError,
		onResponseError,
		onError
		// onCancel
	} = options || config || {}
	// const { refetch } = config

	// console.log(afterRequest)

	const data = shallowRef<any>(null)
	const error = shallowRef<Error | null>(null)
	const isFetching = ref<boolean>(false)
	const isFinished = ref<boolean>(false)
	const statusCode = ref<number | null>(null)
	const statusText = ref<string>('')
	const response = shallowRef<AxiosResponse<any> | undefined>()

	// const execute = ref(null)

	if (!instance) {
		instance = axios.create({ timeout: 10000 })
		// instance.interceptors.response.use(
		// 	res => {
		// 		response.value = res
		// 		statusCode.value = res.status
		// 		statusText.value = res.statusText
		// 		return res
		// 	},
		// 	(err: any) => Promise.reject(err)
		// )
	}
	// if (beforeRequest || onRequestError) {
	// 	instance.interceptors.request.clear()
	// 	instance.interceptors.request.use(
	// 		config => {
	// 			// isFetching.value = true
	// 			// console.log(6000, isFetching.value, isFinished.value)
	// 			return beforeRequest ? beforeRequest(config) : config
	// 			// return config
	// 		},
	// 		(err: any) => {
	// 			// error.value = err
	// 			onRequestError && onRequestError(err)
	// 			return Promise.reject(err)
	// 		}
	// 	)
	// }
	// if (onResponseError) {
	// 	instance.interceptors.response.clear()
	// 	instance.interceptors.response.use(
	// 		res => {
	// 			// response.value = res
	// 			// statusCode.value = res.status
	// 			// statusText.value = res.statusText
	// 			// isFinished.value = true
	// 			// isFetching.value = false
	// 			// data.value = res.data
	// 			// console.log(4000, isFetching.value, isFinished.value, Object.keys(res || {}))
	// 			// return afterRequest ? afterRequest(res) : res
	// 			return res
	// 		},
	// 		(err: any) => {
	// 			// error.value = err
	// 			onResponseError && onResponseError(err)
	// 			return Promise.reject(err)
	// 		}
	// 	)
	// }
	if (!axiosSeries)
		axiosSeries = wrapper(instance, {
			unique,
			orderly,
			onCancel: err => {
				console.info('onCancel => ', err.message, err.config)
			}
		})

	// if (setHeaders) setHeaders(instance)

	// if (
	// 	// !instance.interceptors.request.handlers.some(
	// 	// 	({ fulfilled }) => fulfilled === beforeRequest
	// 	// ) &&
	// 	beforeRequest
	// ) {
	// 	instance.interceptors.request.use(beforeRequest, (err: any) => {
	// 		onRequestError && onRequestError(err)
	// 		return Promise.reject(err)
	// 	})
	// }

	// if (
	// 	// !instance.interceptors.response.handlers.some(
	// 	// 	({ fulfilled }) => fulfilled === afterRequest
	// 	// ) &&
	// 	afterRequest
	// ) {
	// 	instance.interceptors.response.use(afterRequest, (err: any) => {
	// 		onResponseError && onResponseError(err)
	// 		return Promise.reject(err)
	// 	})
	// }

	// console.log(
	// 	7000,
	// 	// options,
	// 	// config,
	// 	instance.interceptors.response.handlers
	// 	// instance.interceptors.response.handlers.includes(afterRequest)
	// )

	/**
	 * request
	 */
	async function request<T = any, R = AxiosResponse<T>, D = any>(
		config: UseRequestRequestOptions<D> // InternalAxiosRequestConfig<T> & UseRequestConfig
		// options?: UseRequestConfig
	): Promise<R> {
		if (beforeRequest) config = (await beforeRequest(config)) as UseRequestRequestOptions<D>

		isFinished.value = false
		isFetching.value = true

		let [err, res] = (await to(axiosSeries(config))) as
			| [AxiosError<unknown, any>, undefined]
			| [null, AxiosResponse<any, any>]

		if (res) {
			response.value = res
			statusCode.value = res.status
			statusText.value = res.statusText
			if (afterRequest) {
				try {
					data.value = await afterRequest(res)
				} catch (_err: any) {
					err = _err
					onResponseError && onResponseError(err)
				}
			} else {
				data.value = res.data
			}
		} else if (err?.response) {
			response.value = err.response
			statusCode.value = err.response.status
			statusText.value = err.response.statusText
			onResponseError && onResponseError(response.value)
		} else {
			onError && onError(err)
		}
		error.value = err
		isFinished.value = true
		isFetching.value = false

		return data.value
	}

	/**
	 * create request
	 */
	// function createRequest() {
	// 	return ''
	// }

	const shell: UseRequestReturn<T> = {
		isFinished,
		statusCode,
		statusText,
		response,
		error,
		data,
		isFetching,
		// canAbort,
		// aborted,
		// abort,
		// execute,
		// json: setType('json'),
		//
		request
		// createRequest,
		// onResponse: responseEvent.on,
		// onError: errorEvent.on,
		// onFinally: finallyEvent.on
	}

	// function setType(type: DataType) {
	// 	return () => {
	// 		if (!isFetching.value) {
	// 			config.type = type
	// 			return {
	// 				...shell,
	// 				then(onFulfilled: any, onRejected: any) {
	// 					return waitUntilFinished().then(onFulfilled, onRejected)
	// 				}
	// 			} as any
	// 		}
	// 		return undefined
	// 	}
	// }

	function waitUntilFinished() {
		return new Promise<UseRequestReturn<T>>((resolve, reject) => {
			until(isFinished)
				.toBe(true)
				.then(() => resolve(shell))
				.catch((error: any) => reject(error))
		})
	}

	if (immediate) Promise.resolve().then(() => request(config))

	return {
		...shell,
		then(onFulfilled, onRejected) {
			return waitUntilFinished().then(onFulfilled, onRejected)
		}
	}
}

// function createRequest(options: UseRequestConfig) {
// 	const { unique, orderly, onCancel } = options
// 	const instance = axios.create()
// 	const axiosSeries = wrapper(instance, {
// 		unique,
// 		orderly,
// 		onCancel
// 	})

// 	return {
// 		instance,
// 		axiosSeries
// 	}
// }

export default useRequest
