import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PostEdit from "@pages/PostEdit";
import useAuth from "@queries/useAuth";
import MyAccountPassEdit from "@pages/MyAccountPassEdit";
import PasswordFind from "@pages/PasswordFind";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
};

// PublicRoute : 사용자가 로그인하지 않았을 때만 렌더링을 허용
// 로그인한 사용자는 홈 페이지로 리다이렉트
// 로그인이 되어있는 사용자는 /로 리다이렉트
const PublicRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Element {...rest} /> : <Navigate to="/" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route
            path="/login/find"
            element={<PublicRoute element={PasswordFind} />}
          />

          <Route path="/my" element={<PrivateRoute element={MyAccount} />} />
          <Route
            path="/my/setting"
            element={<PrivateRoute element={MyAccountEdit} />}
          />
          <Route
            path="/my/setting/password"
            element={<PrivateRoute element={MyAccountPassEdit} />}
          />
          <Route path="/mypage" element={<PrivateRoute element={MyPage} />}>
            <Route index element={<Posts />} />
            <Route path="myootd" element={<Posts />} />
            <Route path="closet" element={<Closet />} />
            <Route path="wish" element={<Wish />} />
          </Route>

          {/* <Route path="/mypage/closet/:id/edit" element={<PrivateRoute element={ClosetEdit} />} /> */}
          <Route
            path="/mypage/closet/add"
            element={<PrivateRoute element={ClosetAdd} />}
          />

          <Route path="/ootd" element={<Trend />} />
          <Route
            path="/ootd/:id/edit"
            element={<PrivateRoute element={PostEdit} />}
          />
          <Route path="/ootd/:id" element={<PostDetail />} />
          <Route
            path="/ootd/add"
            element={<PrivateRoute element={PostAdd} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
