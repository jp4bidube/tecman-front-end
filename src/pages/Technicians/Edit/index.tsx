import { useUserById } from "@/services/features/users/hooks/useUserById";
import useStore from "@/store";
import { User } from "@/types/user";
import { useEffect } from "react";
import { TbUserCircle } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { UserEditForm } from "./UserEditForm";
import { UserEditFormSkeleton } from "./UserEditFormSkeleton";

export const TechnicianEdit = () => {
  const params = useParams();
  const store = useStore();

  const { data, isFetching, isLoading } = useUserById(params.id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Funcionários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: `Edição - ${data?.name}`,
      }),
    [data]
  );

  return (
    <>
      {isLoading || isFetching ? (
        <UserEditFormSkeleton />
      ) : (
        <UserEditForm user={data!} />
      )}
    </>
  );
};
