import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import BaseLayout from './layouts/BaseLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Chat from './pages/Chat';
import RouteGuard from './layouts/RouteGuard';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { injectStore } from './apis/axios.interceptor';
import { selectIsStaff } from './store/userSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';

injectStore(store)

const Index = () => {
  const isStaff = useSelector(selectIsStaff)
  const navigate = useNavigate()

  useEffect(() => {
    navigate(isStaff ? "/admin" : "/pets")
  }, [])
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/pets",
    element: <BaseLayout><Home /></BaseLayout>
  },
  {
    path: "/admin",
    element: <BaseLayout><RouteGuard><Admin /></RouteGuard></BaseLayout>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/chat",
    element: <BaseLayout><RouteGuard><Chat /></RouteGuard></BaseLayout>
    // element: <Chat />
  }
]);

const queryClient = new QueryClient()

const App = () => {

  return (
    <GoogleOAuthProvider clientId='110911234958-vlcodc072mtciejv077s6ssnqbo13h8f.apps.googleusercontent.com'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
