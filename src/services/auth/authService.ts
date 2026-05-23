import api from '../../lib/axios'

export const authService = {
  // Demonstration Axios call to a mock endpoint to check connection
  verifySession: async (): Promise<boolean> => {
    try {
      const response = await api.get('/users/1') // jsonplaceholder call
      return response.status === 200
    } catch {
      return false
    }
  },
}
