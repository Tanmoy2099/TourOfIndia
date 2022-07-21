
import { useCallback } from 'react'
import { useHttpClient } from './http-hook';
// need to delete

const useAdminControl = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAllUsers = useCallback((query) => {
    const url = process.env.REACT_APP_GET_ALL_USER + '?' + query;
    sendRequest(url)
      .then(res => {
        if (res.status === 'ok') {
          return res.data.data
        } else {
          throw new Error(res.data)
        }
      }).catch(err => console.log(err.message))
  }, [])


  return { getAllUsers, isLoading, error, clearError }
}

export { useAdminControl };
