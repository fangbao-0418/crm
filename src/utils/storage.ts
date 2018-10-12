const sessionStorage = window.sessionStorage
const localStorage = window.localStorage
const storage = {
  getItem (key: string) {
    return sessionStorage.getItem(key) || localStorage.getItem(key)
  },
  setItem (key: any, value: string) {
    sessionStorage.setItem(key, value)
    localStorage.setItem(key, value)
  },
  removeItem (key: string) {
    console.log('remove item')
    sessionStorage.removeItem(key)
    localStorage.removeItem(key)
  },
  clear () {
    console.log('clear storage')
    sessionStorage.clear()
    localStorage.clear()
  }
}
const S: APP.StorageProps = {
  getItem (key) {
    if (storage.getItem(key) === null) {
      return null
    }
    try {
      const rawData = storage.getItem(key).trim()
      const processData = JSON.parse(rawData)
      return (typeof processData === 'object') ? processData : rawData
    } catch (e) {
      return storage.getItem(key).trim()
    }
  },
  setItem (key, value) {
    value = typeof value === 'string' ? value.trim() : JSON.stringify(value)
    storage.setItem(key, value)
  },
  removeItem (key) {
    storage.removeItem(key)
  },
  clear () {
    storage.clear()
  }
}
export default S
