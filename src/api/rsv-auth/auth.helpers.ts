import { AxiosInstance } from 'axios'

const helpers = (
    instance: AxiosInstance
) => {
    return {
        setAuthHeaders: (token: string) => {
            instance.defaults.headers.post['Authorization'] = `Bearer ${token}`
            instance.defaults.headers.post['Content-Type'] = 'application/json'
            instance.defaults.headers.get['Authorization'] = `Bearer ${token}`
            instance.defaults.headers.put['Authorization'] = `Bearer ${token}`
            instance.defaults.headers.delete['Authorization'] = `Bearer ${token}`
        },
        clearAuthHeaders: () => {
            instance.defaults.headers.post['Authorization'] = ''
            instance.defaults.headers.get['Authorization'] = ''
            instance.defaults.headers.put['Authorization'] = ''
            instance.defaults.headers.delete['Authorization'] = ''
        }
    }
}

export default helpers
