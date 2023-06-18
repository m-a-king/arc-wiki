import { makeAutoObservable } from "mobx";

class AuthStore {
  token = null;
  admin = false;

  constructor() {
    makeAutoObservable(this);

    // Get token from sessionStorage at the start
    this.token = sessionStorage.getItem("token");
    this.admin = JSON.parse(sessionStorage.getItem("admin"));
  }

  isLoggedIn() {
    return this.token !== null;
  }

  isAdmin() {
    return this.admin;
  }

  login(data) {
    this.token = data.token;
    this.admin = data.result.isAdmin === 1;

    // When we login, save token to sessionStorage
    sessionStorage.setItem("token", this.token);
    sessionStorage.setItem("admin", this.admin);
  }

  logout() {
    this.token = null;
    this.admin = false;
    
    // When we logout, remove token from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
  }
}

const authStore = new AuthStore();
export default authStore;