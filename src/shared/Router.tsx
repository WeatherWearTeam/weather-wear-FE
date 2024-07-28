import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Layout from "@shared/Layout";
import MyPage from "@pages/MyPage";
import Trend from "@pages/Trend";
import Closet from "@pages/Closet";
import Posts from "@pages/Posts";
import Wish from "@pages/Wish";
import PostDetail from "@pages/PostDetail";
import PostAdd from "@pages/PostAdd";
import ClosetAdd from "@pages/ClosetAdd";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import MyAccount from "@pages/MyAccount";
import MyAccountEdit from "@pages/MyAccountEdit";
import Weather from "@pages/Weather";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<MyAccount />} />
          <Route path="/my/setting" element={<MyAccountEdit />} />

          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<Posts />} />
            <Route path="myootd" element={<Posts />} />
            <Route path="closet" element={<Closet />} />
            <Route path="wish" element={<Wish />} />
          </Route>

          <Route path="/mypage/closet/add" element={<ClosetAdd />} />

          <Route path="/ootd" element={<Trend />} />

          <Route path="/ootd/add" element={<PostAdd />} />

          <Route path="/ootd/:id" element={<PostDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
