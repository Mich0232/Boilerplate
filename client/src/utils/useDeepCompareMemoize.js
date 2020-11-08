import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

const useDeepCompareMemoize = value => {
  const ref = useRef()
  if (!isEqual(value, ref.current)) {
    ref.current = value
  }
  return ref.current
}

export default useDeepCompareMemoize
