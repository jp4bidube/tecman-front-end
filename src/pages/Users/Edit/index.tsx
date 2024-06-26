import { useUserById } from "@/services/features/users/hooks/useUserById";
import useStore from "@/store";
import { useEffect } from "react";
import { TbUserCircle } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { UserEditForm } from "./UserEditForm";
import { UserEditFormSkeleton } from "./UserEditFormSkeleton";

export const UserEdit = () => {
  const params = useParams();
  const store = useStore();

  const { data, isFetching, isLoading } = useUserById(params.id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Usuários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: [
          { name: `Edição - ${data?.name}`, path: `/users/${params.id}/edit` },
        ],
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
