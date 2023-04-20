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
import UserContext from './contexts/UserContext';
import Chat from './pages/Chat';
import RouteGuard from './layouts/RouteGuard';
import { Provider } from 'react-redux';
import store from './store';
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
    // element: <RouteGuard><Chat /></RouteGuard>
    element: <Chat />
  }
]);

const queryClient = new QueryClient()

const App = () => {
  const [user, setUser] = useState(null)

  // return (
  //   <UserContext.Provider value={{ user, setUser }}>
  //     <QueryClientProvider client={queryClient}>
  //       <React.StrictMode>
  //         <RouterProvider router={router}></RouterProvider>
  //       </React.StrictMode>
  //     </QueryClientProvider>
  //   </UserContext.Provider>)
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
      </QueryClientProvider>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
