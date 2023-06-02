import { Outlet } from "react-router-dom";
import Header from "../containers/Header";

function Layout(){
  return <div className="wrap">
    <div className="container">
      <Header />
      <div className="contents">
        <Outlet />
      </div>
    </div>
  </div>
}

export default Layout;