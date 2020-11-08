export const fetch = (url, options = {}) => {
  const queryString = options.qs ? `?${new URLSearchParams(options.qs)}` : ''

  options = {
    ...options,
    headers: {
      ...options.headers,
    },
  }

  return window.fetch(`${url}${queryString}`, {
    ...options,
    // credentials: 'include',
  })
}

export const get = (url, options) => {
  const getOptions = {
    ...options,
    method: 'GET',
  }
  return fetch(url, getOptions)
}

export const post = (url, options = {}) => {
  const data = options.data || null

  const postOptions = {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(url, postOptions)
}
