import axiosInstance from './axios'

const fnGetCallAPIEndpoint = async (endpoint, controller = `${import.meta.env.VITE_API_CONTROLLER}`, jsonheader = {}) => {
  try {
    const response = await axiosInstance.get(`/proxyntlm`, { headers: {'endpoint': `api/${controller}/${endpoint}`, ...jsonheader} })
    return response.data
  } catch (error) {
    return { result: [], statuscode: 500, status: 'Error', message: 'Internal Server Error' }
  }
}
const fnPostCallAPIEndpoint = async (endpoint, payload, controller = `${import.meta.env.VITE_API_CONTROLLER}`, jsonheader = {}) => {
  try {
    const response = await axiosInstance.post(`/proxyntlm`, payload, { headers: {'endpoint': `api/${controller}/${endpoint}`, ...jsonheader} })
    return response.data
  } catch (error) {
    return { result: [], statuscode: 500, status: 'Error', message: 'Internal Server Error' }
  }
}

//#region HTTP GET AUTHEN
export const fnGetUserAuthen = async () => {
  return await fnGetCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_GETUSERAUTHEN}`, `${import.meta.env.VITE_API_CONTROLLER_AUTHEN}`, { 'appid': `${import.meta.env.VITE_APP_ID}` })
}
//#endregion

//#region HTTP METHOD GET CUSTOM
export const fnGetDemo = async () => {
  return await fnGetCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_GETDEMO}`)
}
//#endregion

//#region HTTP METHOD POST CUSTOM
export const fnSetDemo = async (payload) => {
  return await fnPostCallAPIEndpoint(`${import.meta.env.VITE_API_ENDPOINT_SETDEMO}`, payload)
}
//#endregion