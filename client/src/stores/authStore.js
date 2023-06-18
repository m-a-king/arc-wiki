import { makeAutoObservable } from "mobx";

class AuthStore {
  token = null;

  constructor() {
    makeAutoObservable(this);

    // Get token from sessionStorage at the start
    this.token = sessionStorage.getItem("token");
  }

  isLoggedIn() {
    return this.token !== null;
  }

  login(newToken) {
    this.token = newToken;

    // When we login, save token to sessionStorage
    sessionStorage.setItem("token", newToken);
  }

  logout() {
    this.token = null;
    
    // When we logout, remove token from sessionStorage
    sessionStorage.removeItem("token");
  }
}

const authStore = new AuthStore();
export default authStore;