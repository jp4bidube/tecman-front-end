import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Home, Users } from "@/pages";
import { Layout } from "@/theme/Layout";
import { UserEdit } from "@/pages/Users/Edit";
import { UserCreate } from "@/pages/Users/Create";
import { PrivateRoute } from "./privateRoute";
import { Clients } from "@/pages/Clients";
import { ClientCreateForm } from "@/pages/Clients/Create/ClientCreateForm";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/create" element={<ClientCreateForm />} />
            {/* <Route path="/clients/:id/overview" element={<ClientOverview />} />
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route path="/guarantees" element={<Guarantees />} />

            <Route path="/users/:id/overview" element={<UserOverview />} />
            <Route path="/employees" element={<Employees />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
