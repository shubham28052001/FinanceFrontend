import React from 'react'
import { useRoutes } from 'react-router';
import { ToastContainer } from "react-toastify";
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import VerifyEmail from "./Pages/VerifyEmail"
import Dashboard from './Pages/Dashboard';
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from './Pages/ResetPassword';
import Protect from './ProtectedRoute/Protect';
import Expenses from "./Components/Expenses"
import MainContent from "./Components/MainContent"
import Budget from './Components/Budget';
import Analytics from './Components/Analytics';
import Settings from './Components/Settings';
export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },

    {
      path: "/dashboard",
      element: (
        <Protect>
          <Dashboard />
        </Protect>
      ),
      children: [
        {
          index: true,
          element: <MainContent />
        },
        {
          path: "expenses",
          element: <Expenses />
        },
        {
          path: "budget",
          element: <Budget/>
        },
        {
          path: "analytics",
          element: <Analytics/>
        },
        {
          path: "settings",
          element: <Settings/>
        }
      ]
    }

  ]);

  return (
    <>
      {routes}

      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
    </>
  );
}
