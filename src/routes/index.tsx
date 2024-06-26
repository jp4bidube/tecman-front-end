import { Home, Login, Users } from "@/pages";
import { Clients } from "@/pages/Clients";
import { ClientCreate } from "@/pages/Clients/Create";
import { ClientEdit } from "@/pages/Clients/Edit";
import { ServiceOrderTab } from "@/pages/Clients/Edit/components/ServiceOrderTab";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { NotFound } from "@/pages/NotFound";
import { ServiceOrders } from "@/pages/ServiceOrders";
import { ServiceOrdersCreate } from "@/pages/ServiceOrders/Create";
import { ServiceOrdersEdit } from "@/pages/ServiceOrders/Edit";
import { ServiceOrdersOverView } from "@/pages/ServiceOrders/OverView";
import { Technicians } from "@/pages/Technicians";
import { TechnicianCreate } from "@/pages/Technicians/Create";
import { TechnicianEdit } from "@/pages/Technicians/Edit";
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/technicians/:id/edit" element={<TechnicianEdit />} />
            <Route path="/technicians/create" element={<TechnicianCreate />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/create" element={<ClientCreate />} />
            <Route path="/clients/:id/edit" element={<ClientEdit />}>
              <Route path="service-orders" element={<ServiceOrderTab />} />
              <Route path="create" element={<ServiceOrdersCreate />} />
              <Route
                path="service-orders/create"
                element={<ServiceOrdersCreate />}
              />
              <Route
                path="service-orders/:osId/over-view"
                element={<ServiceOrdersOverView />}
              />
              <Route
                path="service-orders/:osId/edit"
                element={<ServiceOrdersEdit />}
              />
            </Route>
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route
              path="/service-orders/create"
              element={<ServiceOrdersCreate />}
            />
            <Route
              path="/service-orders/:id/over-view"
              element={<ServiceOrdersOverView />}
            />
            <Route
              path="/service-orders/:id/edit"
              element={<ServiceOrdersEdit />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
