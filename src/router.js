import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import {
  AboutUs,
  AllPosts,
  EditPost,
  Home,
  Login,
  MyPage,
  MyPosts,
  MyWishList,
  MyMatching,
  NotFound,
  PostDetail,
  Register,
  AuthInfo,
  UserInfo,
  Withdraw,
  WritePost,
} from './pages';
import { PrivateRoute } from './routes/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '' },
      { path: '/register', element: <Register /> },
      { path: '/register/authInfo', element: <AuthInfo /> },
      { path: '/register/userInfo', element: <UserInfo /> },
      { path: '/login', element: <Login /> },

      { path: '/about-us', element: <AboutUs /> },

      {
        path: '/mypage',
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypage/withdraw',
        element: (
          <PrivateRoute>
            <Withdraw />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypage/posts',
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypage/wishlist',
        element: (
          <PrivateRoute>
            <MyWishList />
          </PrivateRoute>
        ),
      },
      {
        path: '/mypage/matching',
        element: (
          <PrivateRoute>
            <MyMatching />
          </PrivateRoute>
        ),
      },

      {
        path: '/posts',
        element: (
          <PrivateRoute>
            <AllPosts />
          </PrivateRoute>
        ),
      },
      {
        path: '/posts/new',
        element: (
          // <PrivateRoute>
          <WritePost />
          // </PrivateRoute>
        ),
      },
      {
        path: '/posts/:id',
        element: (
          // <PrivateRoute>
          <PostDetail />
          // </PrivateRoute>
        ),
      },
      {
        path: '/posts/:id/edit',
        element: (
          // <PrivateRoute>
          <EditPost />
          // </PrivateRoute>
        ),
      },
    ],
  },
]);
