import { watch } from 'vue-demi'
import useRequest from './src'

function beforeRequest(config) {
	// console.log(6001)
	// const _v = Math.random()
	// const urlParams = getUrlParams()
	// const appId = urlParams.appId
	// const access_token = urlParams.access_token
	// const access_type = urlParams.access_type || getCookie('access_type')
	// const isFormData = Object.prototype.toString.call(config.data) === '[object FormData]'

	// config.metadata = { startTime: Date.now() }
	// if (!config.url.includes('/node-help/')) config.url = '/h5' + config.url

	// if (isFormData) {
	// 	config.data.append('access_token', access_token)
	// 	config.data.append('access_type', access_type)
	// 	config.data.append('os', os)
	// 	// 微信小程序上传图片 不传appId
	// 	!config.noAppId && appId && config.data.append('appID', appId)
	// } else {
	// 	config.data.access_token = access_token
	// 	config.data.access_type = access_type
	// 	config.data.os = os
	// 	!config.noAppId && appId && (config.data.appId = appId)
	// }
	// if (config.type === 'post') {
	// 	config.method = 'post'
	// 	// if (!isFormData) {
	// 	// 	config.data = qs.stringify(config.data, {
	// 	// 		arrayFormat: 'indices',
	// 	// 		allowDots: true
	// 	// 	})
	// 	// }
	// } else {
	// 	config.method = 'get'
	// 	config.params = Object.assign({}, { _v }, config.data)
	// }

	// config.paramsSerializer = params => {
	// 	return qs.stringify(params, {
	// 		arrayFormat: 'indices',
	// 		allowDots: true
	// 	})
	// }

	return config
}

function afterRequest(res) {
	console.log(
		4001,
		// Object.keys(res || {}),
		// Object.keys(res.config || {}),
		res.config?.responseType
	)
	// return res
	if (res.data.success || res.config?.responseType === 'text') return res.data

	// const code = String(res.data.code)
	// const invalidJump = res.config.invalidJump || 1

	// // token引起的失败调到登录页面并且不作提示
	// if (code.includes('900')) {
	// 	console.error('token失效')
	// 	// setCookie('access_token', '')
	// 	// this.$root.access_token = ''
	// 	// this.$root.$bridge.login(true, invalidJump, res.config.params)
	// 	// res.config.errorTips = false
	// } else if (code.includes('600')) {
	// 	res.config.errorTips = false
	// 	// 路由是物品放行 且有isEnabledTouristApplication这个参数时 游客不跳审核
	// 	if (
	// 		['6002', '6004'].includes(code) &&
	// 		!(this.$route.path.indexOf('release') && this.$route.query.isEnabledTouristApplication)
	// 	) {
	// 		// 跳转审核
	// 		this.$router.replace({
	// 			name: 'account_review'
	// 		})
	// 	}
	// 	if (code === '6003') {
	// 		// 跳转审核
	// 		this.$router.replace({
	// 			name: 'account_review_status'
	// 		})
	// 	}
	// }

	// if (res.config.errorTips) {
	// 	if (errTime) {
	// 		const d = (new Date().getTime() - errTime.getTime()) / 1000
	// 		if (d > 2) {
	// 			errTime = new Date()
	// 			tipsWarning(res.data.msg)
	// 		}
	// 	} else {
	// 		errTime = new Date()
	// 		tipsWarning(res.data.msg)
	// 	}
	// }

	return Promise.reject(res.data)
}

function afterRequest2(res) {
	console.log(
		4002,
		// Object.keys(res || {}),
		// Object.keys(res.config || {}),
		res.config?.responseType
	)
	// return res
	if (res.data.success || res.config?.responseType === 'text') return res.data

	return Promise.reject(res.data)
}

// request error
function onRequestError(res) {
	console.log('onRequestError => ')
}

// 200以外的错误处理
function onResponseError(res) {
	console.log('onResponseError => ')
}

// 200以外的错误 和 request error
function onError(res) {
	console.log('onError => ')
}

;(async () => {
	const {
		isFinished,
		isFetching,
		statusCode,
		// response,
		error,
		// request
		data,
		onResponse
	} = useRequest(
		'https://mp.kdwjy.com/api/component/clients/configuration/getConfig?appID=wx34ca7aad0887051c&accessToken=bd1922314aeb11ee9df9005056b6e996&_v=1',
		{
			url: 'https://mp.kdwjy.com/api/component/clients/configuration/getConfig?appID=wx34ca7aad0887051c&access_token=bd1922314aeb11ee9df9005056b6e996&_v=1',
			data: {},
			// unique: true,
			// orderly: true,
			responseType: 'json',
			beforeRequest,
			afterRequest,
			// updateDataOnError: true,
			onRequestError,
			onResponseError,
			onError
		},
		null
	)
	// useRequest(
	// 	'https://mp.kdwjy.com/api/component/clients/configuration/getConfig?appID=wx34ca7aad0887051c&accessToken=bd1922314aeb11ee9df9005056b6e996&_v=1',
	// 	{
	// 		url: 'https://mp.kdwjy.com/api/component/clients/configuration/getConfig?appID=wx34ca7aad0887051c&access_token=bd1922314aeb11ee9df9005056b6e996&_v=1',
	// 		data: {},
	// 		// unique: true,
	// 		// orderly: true,
	// 		responseType: 'json',
	// 		beforeRequest,
	// 		afterRequest: afterRequest2,
	// 		// updateDataOnError: true,
	// 		onRequestError,
	// 		onResponseError,
	// 		onError
	// 	},
	// 	null
	// ).then(
	// 	({
	// 		isFinished,
	// 		isFetching,
	// 		statusCode,
	// 		// response,
	// 		error,
	// 		// request
	// 		data,
	// 		onResponse
	// 	}) => {
	// 		console.log(
	// 			'result2 => ',
	// 			'\n"isFinished2":',
	// 			isFinished.value,
	// 			'\n"isFetching2":',
	// 			isFetching.value,
	// 			'\n"statusCode2":',
	// 			statusCode.value,
	// 			'\n"error2":',
	// 			error.value,
	// 			// Object.keys(response.value || {}),
	// 			'\n"data2":',
	// 			data.value
	// 		)
	// 	}
	// )

	watch([isFinished, isFetching], ([v1, v2]) => {
		console.log('isFinished => ', v1)
		console.log('isFetching => ', v2)
		v1 &&
			console.log(
				'result => ',
				'\n"isFinished":',
				isFinished.value,
				'\n"isFetching":',
				isFetching.value,
				'\n"statusCode":',
				statusCode.value,
				'\n"error":',
				error.value,
				// Object.keys(response.value || {}),
				'\n"data":',
				data.value
			)
	})

	// onResponse(res => {
	// 	console.log('onResponse => ', Object.keys(res.value || {}))
	// })

	console.log('onResponse => ', onResponse)

	// console.log(
	// 	'result => ',
	// 	'\n"isFinished":',
	// 	isFinished.value,
	// 	'\n"isFetching":',
	// 	isFetching.value,
	// 	'\n"statusCode":',
	// 	statusCode.value,
	// 	'\n"error":',
	// 	error.value,
	// 	// Object.keys(response.value || {}),
	// 	'\n"data":',
	// 	data.value
	// )
})()

// const { isFetching, error, data } = useFetch(url)
// const { isFetching, error, data } = await useFetch(url)
// const { data } = useFetch(url, { refetch: true })
// const { execute } = useFetch(url, { immediate: false })
// const { abort, canAbort } = useFetch(url)
// const { data } = useFetch(url, { timeout: 100 })
// const { data } = useFetch(url, {
// 	async beforeFetch({ url, options, cancel }) {
// 		const myToken = await getMyToken()

// 		if (!myToken) cancel()

// 		options.headers = {
// 			...options.headers,
// 			Authorization: `Bearer ${myToken}`
// 		}

// 		return {
// 			options
// 		}
// 	}
// })
// const { data } = useFetch(url, {
// 	afterFetch(ctx) {
// 		if (ctx.data.title === 'HxH') ctx.data.title = 'Hunter x Hunter' // Modifies the response data

// 		return ctx
// 	}
// })
// const { data } = useFetch(url, {
// 	updateDataOnError: true,
// 	onFetchError(ctx) {
// 		// ctx.data can be null when 5xx response
// 		if (ctx.data === null) ctx.data = { title: 'Hunter x Hunter' } // Modifies the response data

// 		ctx.error = new Error('Custom Error') // Modifies the error
// 		return ctx
// 	}
// })
// // Request will be sent with GET method and data will be parsed as JSON
// const { data } = useFetch(url).get().json()

// // Request will be sent with POST method and data will be parsed as text
// const { data } = useFetch(url).post().text()

// // Or set the method using the options

// // Request will be sent with GET method and data will be parsed as blob
// const { data } = useFetch(url, { method: 'GET' }, { refetch: true }).blob()
// const useMyFetch = createFetch({
// 	baseUrl: 'https://my-api.com',
// 	options: {
// 		async beforeFetch({ options }) {
// 			const myToken = await getMyToken()
// 			options.headers.Authorization = `Bearer ${myToken}`

// 			return { options }
// 		}
// 	},
// 	fetchOptions: {
// 		mode: 'cors'
// 	}
// })
// const useMyFetch = createFetch({
// 	baseUrl: 'https://my-api.com',
// 	combination: 'overwrite',
// 	options: {
// 		// beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
// 		async beforeFetch({ options }) {
// 			const myToken = await getMyToken()
// 			options.headers.Authorization = `Bearer ${myToken}`

// 			return { options }
// 		}
// 	}
// })

// // use useMyFetch beforeFetch
// const { isFetching, error, data } = useMyFetch('users')

// // use custom beforeFetch
// const { isFetching, error, data } = useMyFetch('users', {
// 	async beforeFetch({ url, options, cancel }) {
// 		const myToken = await getMyToken()

// 		if (!myToken) cancel()

// 		options.headers = {
// 			...options.headers,
// 			Authorization: `Bearer ${myToken}`
// 		}

// 		return {
// 			options
// 		}
// 	}
// })

// const { onFetchResponse, onFetchError } = useFetch(url)

// onFetchResponse(response => {
// 	console.log(response.status)
// })

// onFetchError(error => {
// 	console.error(error.message)
// })
