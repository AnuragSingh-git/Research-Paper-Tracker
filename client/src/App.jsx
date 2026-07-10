import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Library from "./pages/Library";

import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import DashboardLayout from "./components/layout/DashboardLayout";

function App(){

return(

<Routes>

<Route

path="/"

element={<Login/>}

/>

<Route

path="/register"

element={<Register/>}

/>

<Route

path="/dashboard"

element={

<ProtectedRoute>

<DashboardLayout>

<Dashboard/>

</DashboardLayout>

</ProtectedRoute>

}

/>

<Route

path="/library"

element={

<ProtectedRoute>

<DashboardLayout>

<Library/>

</DashboardLayout>

</ProtectedRoute>

}

/>

<Route

path="/analytics"

element={

<ProtectedRoute>

<DashboardLayout>

<Analytics/>

</DashboardLayout>

</ProtectedRoute>

}

/>

</Routes>

);

}

export default App;