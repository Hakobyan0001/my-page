class Store {
  set(key, value) {
    const currentItem = JSON.stringify(value);
    localStorage.setItem(key, currentItem);
  }
  get(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }
  clear() {
    localStorage.clear();
  }
}
const usersStorage = new Store();

export default usersStorage;
