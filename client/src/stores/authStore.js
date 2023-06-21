import { makeAutoObservable } from "mobx";

class AuthStore {
  token = null;
  admin = false;

  constructor() {
    makeAutoObservable(this);

    // 1. 시작할 때 sessionStorage에서 토큰 가져오기
    this.token = sessionStorage.getItem("token");
    this.admin = JSON.parse(sessionStorage.getItem("admin"));
  }

  // 2. 로그인 상태 확인
  isLoggedIn() {
    return this.token !== null;
  }

  // 3. 관리자 여부 확인
  isAdmin() {
    return this.admin;
  }

  // 4. 로그인
  login(data) {
    this.token = data.token;
    this.admin = data.result.isAdmin === 1;

    // 로그인 시 토큰을 sessionStorage에 저장
    sessionStorage.setItem("token", this.token);
    sessionStorage.setItem("admin", this.admin);
  }

  // 5. 로그아웃
  logout() {
    this.token = null;
    this.admin = false;
    
    // 로그아웃 시 sessionStorage에서 토큰 제거
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
  }
}

const authStore = new AuthStore();
export default authStore;