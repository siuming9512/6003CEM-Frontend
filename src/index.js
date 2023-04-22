import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import BaseLayout from './layouts/BaseLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Chat from './pages/Chat';
import RouteGuard from './layouts/RouteGuard';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
const router = createBrowserRouter([
  {
    path: "/pets",
    element: <BaseLayout><Home /></BaseLayout>
  },
  {
    path: "/admin",
    element: <BaseLayout><Admin /></BaseLayout>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/chat",
    element:
      <BaseLayout>
        <RouteGuard>
          <Chat />
        </RouteGuard>
      </BaseLayout>
    // element: <Chat />
  }
]);

const queryClient = new QueryClient()

const App = () => {
  // return (
  //   <UserContext.Provider value={{ user, setUser }}>
  //     <QueryClientProvider client={q·ueryClient}>
  //       <React.StrictMode>
  //         <RouterProvider router={router}></RouterProvider>
  //       </React.StrictMode>
  //     </QueryClientProvider>
  //   </UserContext.Provider>)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {/* <React.StrictMode> */}
          <RouterProvider router={router}></RouterProvider>
          {/* </React.StrictMode> */}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
