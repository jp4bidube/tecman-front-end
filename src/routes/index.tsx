import { Home, Login, Users } from "@/pages";
import { Clients } from "@/pages/Clients";
import { ClientCreate } from "@/pages/Clients/Create";
import { ClientEdit } from "@/pages/Clients/Edit";
import { UserCreate } from "@/pages/Users/Create";
import { UserEdit } from "@/pages/Users/Edit";
import { Layout } from "@/theme/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";

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
            <Route path="/clients/create" element={<ClientCreate />} />
            <Route path="/clients/:id/edit" element={<ClientEdit />} />
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
