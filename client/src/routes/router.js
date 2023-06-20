import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../views/Home';
import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';
import FindId from '../views/FindId';
import FindPw from '../views/FindPw';
import MyPage from '../views/MyPage';
import AdminPage from '../views/AdminPage';
import Products from '../views/Products';
import Product from '../views/Product';
import Review from '../views/Review';
import PrivateComponent from './PrivateComponent';

export default function Router() {
  return (
    < BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path ="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/mypage" element={<PrivateComponent />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/adminpage" element={<PrivateComponent />}>
            <Route index element={<AdminPage />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:idx" element={<Product />} />
          <Route path="/review/:idx" element={<Review />} />
          <Route path ="*" element = {<div>There's nothing here!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}