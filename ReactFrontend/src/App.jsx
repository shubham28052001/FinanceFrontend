import React, { Suspense, lazy } from "react";
import { useRoutes } from 'react-router';
import { ToastContainer } from "react-toastify";

import Protect from './ProtectedRoute/Protect';

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const MainContent = lazy(() => import("./Components/MainContent"));
const Expenses = lazy(() => import("./Components/Expenses"));
const Budget = lazy(() => import("./Components/Budget"));
const Analytics = lazy(() => import("./Components/Analytics"));
const Settings = lazy(() => import("./Components/Settings"));

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
          element: <Budget />
        },
        {
          path: "analytics",
          element: <Analytics />
        },
        {
          path: "settings",
          element: <Settings />
        }
      ]
    }

  ]);

  return (
    <>
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>
        {routes}
      </Suspense>

      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
    </>
  );
}


