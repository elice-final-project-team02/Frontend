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
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '' },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: '/register/authInfo',
        element: (
          <PublicRoute>
            <AuthInfo />
          </PublicRoute>
        ),
      },
      {
        path: '/register/userInfo',
        element: (
          <PublicRoute>
            <UserInfo />
          </PublicRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

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
          <PrivateRoute role="careUser">
            <AllPosts />
          </PrivateRoute>
        ),
      },
      {
        path: '/posts/new',
        element: (
          <PrivateRoute role="user">
            <WritePost />
          </PrivateRoute>
        ),
      },
      {
        path: '/posts/:id',
        element: (
          <PrivateRoute>
            <PostDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/posts/:id/edit',
        element: (
          <PrivateRoute role="user">
            <EditPost />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
