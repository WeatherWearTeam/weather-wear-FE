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

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />}>
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
