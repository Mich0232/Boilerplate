import { useState, useEffect } from 'react'

import { get } from './methods'
import useDeepCompareMemoize from '../utils/useDeepCompareMemoize'

const handleErrors = async response => {
  if (!response.ok) {
    const errors = await response.json()
    return Promise.reject(errors)
  }
  return response.json()
}

const useApi = (url, options, execute = true, resetState = true) => {
  const [userReq, setUserReq] = useState({
    data: null,
    error: false,
    loading: true,
  })
  const optionsMemo = useDeepCompareMemoize(options)

  const getData = () => {
    if (resetState) {
      setUserReq({ data: null, error: false, loading: true })
    }
    get(url, optionsMemo)
      .then(handleErrors)
      .then(response => {
        setUserReq({ data: response, error: null, loading: false })
      })
      .catch(err => {
        setUserReq({
          data: resetState ? null : userReq.data,
          error: err,
          loading: false,
        })
      })
  }

  useEffect(() => {
    if (execute) {
      getData()
    }
  }, [url, options, execute])

  return [userReq.data, userReq.loading, userReq.error, getData]
}

export default useApi
