import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from './views/Home';

function Router() {
  return < BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path ="/" element={<Home />} />
        <Route path ="*" element = {<div>There's nothing here!</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default Router;