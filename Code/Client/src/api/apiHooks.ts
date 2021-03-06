import {useNavigate} from 'react-router';
import {notification} from 'antd';
import {logout} from '../store/auth/authSlice';
import strings from '../values/strings';
import {AxiosError, AxiosResponse} from 'axios';
import {ApplicationError} from '../model/ApplicationError';
import {useEffect, useState} from 'react';
import {useLogout} from './logoutHooks';

/**
 * Hook for default API error handling.
 */
export const useAPIHandleErrors = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const isAxiosError = (error: AxiosError | ApplicationError | any): error is AxiosError =>
    (error as AxiosError).response !== undefined

  const isApplicationError = (error: AxiosError | ApplicationError | any): error is ApplicationError =>
    (error as ApplicationError).type !== undefined

  return (error: AxiosError | ApplicationError | any): boolean => {
    let handled = false
    if (isApplicationError(error)) {
      if (error.type === 'logout') {
        logout()
        handled = true
      }
    } else {
      console.log(error.response?.status)
      if (error.response?.status === 401 || error?.response?.status === 403) {
        notification['error']({message: strings.ERROR.UNIDENTIFIED_ERROR})
      } else if (error?.response?.status === 404) {
        notification['error']({message: strings.ERROR.UNIDENTIFIED_ERROR})
      } else if (error?.response?.status === 429) {
        notification['error']({message: strings.ERROR.CHILL_FOR_A_MOMENT_429})
      } else if (error?.response?.status === 500) {
        notification['error']({message: strings.ERROR.UNIDENTIFIED_ERROR})
      } else if (error?.response?.status === 400) {
        if (typeof (error?.response?.data) === "string") {
          notification['error']({message: error?.response?.data})
        } else if (!!error?.response?.data?.errors) {
          notification['error']({message: JSON.stringify(error?.response?.data?.errors)})
        } else {
          notification['error']({message: strings.ERROR.UNIDENTIFIED_ERROR})
        }
      } else {
        notification['error']({message: error.toString()})
      }
      console.error(error)
      handled = true
    }
    return handled
  }
}

/**
 * Hook for wrapping API requests with default error handling.
 */
export const useAPI = () => {
  const handleError = useAPIHandleErrors()

  return <T>(result: Promise<AxiosResponse<T>>) => result
    .then(response => Promise.resolve(response))
    .catch(error => {
        const handled = handleError(error)
        return Promise.reject({
          error: error,
          handled: handled,
        })
      }
    )
};

// export const useAPISearch = <S, T>(request: ((payload: S) => Promise<AxiosResponse<T>>)) => {
export const useAPILocalSearch =
  <T>(requestPromise: () => Promise<AxiosResponse<T[]>>, search: (searchString: string, values: T[]) => T[]):
    [T[], (searchString: string) => void] => {
    const [allItems, setAllItems] = useState<T[]>([])
    const [searchItems, setSearchItems] = useState<T[]>([])
    const api = useAPI()
    useEffect(() => {
      api(requestPromise()).then((value: { data: T[]; }) => {
        const data = value.data.sort()
        setSearchItems(data)
        setAllItems(data);
      })
    }, [])

    const searchForItems = (searchString: string): void => {
      setSearchItems(search(searchString, allItems))
    }

    return [searchItems, searchForItems]
  }

export const useAPILocalStringSearch =
  <T extends string>(requestPromise: () => Promise<AxiosResponse<T[]>>, count = 5):
    [T[], (searchString: string) => void] => {
    const [searchItems, searchForItems] = useAPILocalSearch<T>(
      requestPromise,
      (searchString, values) =>
        !searchString ? [] : values.filter(m =>
          m.toUpperCase().startsWith(searchString.toUpperCase())).sort().slice(0, count)
    )
    return [searchItems, searchForItems]
  }

export const useAPILoad = <T>(requestPromise: () => Promise<AxiosResponse<T>>, onRender: boolean): [T | undefined, () => void] => {
  const api = useAPI()
  const [data, setData] = useState<T>()

  const loadData = () => {
    api(requestPromise()).then(res => setData(res.data))
  }

  useEffect(() => {
    if (onRender) {
      loadData()
    }
  }, [])

  return [data, loadData]
}


export const useAPILoadWithParams = <S, T>(requestPromise: (value: S) => Promise<AxiosResponse<T>>):
  [T | undefined, (value: S) => void] => {
  const api = useAPI()
  const [data, setData] = useState<T>()

  const loadData = (value: S) => {
    api(requestPromise(value)).then(res => setData(res.data))
  }

  return [data, loadData]
}

export const useAPILoadOnRender = <T>(requestPromise: () => Promise<AxiosResponse<T>>):
  [T | undefined, () => void] =>
  useAPILoad<T>(requestPromise, true)
