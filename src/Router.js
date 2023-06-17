import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import FindId from './views/FindId';
import FindPw from './views/FindPw';
import MyPage from './views/MyPage';
import Projucts from './views/Projucts';
import Projuct from './views/Projuct';
import Review from './views/Review';

function Router() {
  return < BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path ="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/products" element={<Projucts />} />
        <Route path="/product" element={<Projuct />} />
        <Route path="/review" element={<Review />} />
        <Route path ="*" element = {<div>There's nothing here!</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default Router;