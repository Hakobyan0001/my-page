class Store {
  set(key, value) {
    try {
      const currentItem = JSON.stringify(value);
      localStorage.setItem(key, currentItem);
    } catch (error) {
      console.error(`Error setting item in local storage: ${error.message}`);
    }
  }
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error getting item from local storage: ${error.message}`);
      return null;
    }
  }
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing local storage: ${error.message}`);
    }
  }
}
const usersStorage = new Store();

export default usersStorage;
