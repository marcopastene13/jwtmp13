import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Private } from "./components/Private";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route
        path="private"
        element={
          <ProtectedRoute>
            <Private />
          </ProtectedRoute>
        }
      />

      <Route index element={<Navigate to="/login" replace />} />
    </Route>
  )
);