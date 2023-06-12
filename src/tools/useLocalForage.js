import localforage from "localforage"

const useLocalForage = (key, initialValue) => {
  const getItem = async () => {
    const item = await localforage.getItem(key)
    if (item === null) {
      return initialValue
    }
    return item
  }

  const setItem = async (value) => {
    await localforage.setItem(key, value)
  }

  const removeItem = async () => {
    await localforage.removeItem(key)
  }

  return { getItem, setItem, removeItem }
}

export default useLocalForage
