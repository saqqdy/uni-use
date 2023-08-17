// import { isRef, ref } from 'vue-demi'
import axios from 'axios'
import wrapper from 'axios-series'
import type { ComputedRef, Ref } from 'vue-demi'
import type {
	AxiosInstance,
	AxiosResponse,
	CancelToken,
	// CancelTokenSource,
	InternalAxiosRequestConfig
} from 'axios'
import { ref, shallowRef } from 'vue-demi'

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

	/**
	 * The raw response of the fetch response
	 */
	response: Ref<Response | null>

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
	// onFetchResponse: EventHookOn<Response>

	/**
	 * Fires after a fetch request error
	 */
	// onFetchError: EventHookOn

	/**
	 * Fires after a fetch has completed
	 */
	// onFetchFinally: EventHookOn
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

let instance: AxiosInstance, axiosSeries: ReturnType<typeof wrapper>
const defaultOptions = {
	unique: false,
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
	config: InternalAxiosRequestConfig<T> & UseRequestConfig,
	options?: UseRequestConfig
): UseRequestReturn<T> /* & PromiseLike<UseRequestReturn<T>> */ {
	config = Object.assign(defaultOptions, config)
	const {
		unique,
		orderly,
		immediate,
		setHeaders,
		onRequest,
		onRequestError,
		onResponse,
		onResponseError,
		onError
		// onCancel
	} = options || config || {}
	// const { refetch } = config

	const data = shallowRef(null)
	const error = shallowRef(null)
	const isFetching = ref(false)
	const isFinished = ref(false)
	const statusCode = ref<number | null>(null)
	const response = shallowRef(null)

	// const execute = ref(null)

	if (!instance) instance = axios.create()
	if (!axiosSeries)
		axiosSeries = wrapper(instance, {
			unique,
			orderly
		})

	if (setHeaders) setHeaders(instance)

	if (onRequest) {
		instance.interceptors.request.use(onRequest, (err: any) => {
			onRequestError && onRequestError(err)
			onError && onError(err)
			return Promise.reject(err)
		})
	}

	if (onResponse) {
		instance.interceptors.response.use(onResponse, (err: any) => {
			onResponseError && onResponseError(err)
			onError && onError(err)
			return Promise.reject(err)
		})
	}

	/**
	 * request
	 */
	function request<T = any, R = AxiosResponse<T>, D = any>(
		config: UseRequestRequestOptions<D> // InternalAxiosRequestConfig<T> & UseRequestConfig
		// options?: UseRequestConfig
	): Promise<R> {
		return axiosSeries(config)
	}

	/**
	 * create request
	 */
	// function createRequest() {
	// 	return ''
	// }

	// function waitUntilFinished() {
	// 	return new Promise<UseRequestReturn<T>>((resolve, reject) => {
	// 		until(isFinished)
	// 			.toBe(true)
	// 			.then(() => resolve(shell))
	// 			.catch(error => reject(error))
	// 	})
	// }

	if (immediate) Promise.resolve().then(() => request(config))

	return {
		isFinished,
		statusCode,
		response, // -------
		error,
		data,
		isFetching,
		// canAbort,
		// aborted,
		// abort,
		// execute,
		//
		request
		// createRequest,
		// then(onFulfilled, onRejected) {
		// 	return waitUntilFinished().then(onFulfilled, onRejected)
		// }
		// onFetchResponse: responseEvent.on,
		// onFetchError: errorEvent.on,
		// onFetchFinally: finallyEvent.on
	}
}

export default useRequest
