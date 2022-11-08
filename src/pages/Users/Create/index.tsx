import useStore from "@/store";
import { useEffect } from "react";
import { TbUserCircle } from "react-icons/tb";
import { UserCreateForm } from "./UserCreateForm";

export const UserCreate = () => {
  const store = useStore();

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Usuários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: `Cadastro`,
      }),
    []
  );

  return <UserCreateForm />;
};
