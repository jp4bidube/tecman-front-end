import { useUserById } from "@/services/features/users/hooks/useUserById";
import useStore from "@/store";
import { useEffect } from "react";
import { TbUserCircle } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { TechniciansEditForm } from "./TechniciansEditForm";
import { TechniciansEditFormSkeleton } from "./TechniciansEditFormSkeleton";

export const TechnicianEdit = () => {
  const params = useParams();
  const store = useStore();

  const { data, isFetching, isLoading } = useUserById(params.id || "");

  useEffect(
    () =>
      store.setNewBreadcrumbs({
        name: "Usuários",
        path: "/users",
        icon: <TbUserCircle size={25} />,
        subhead: `Edição - ${data?.name}`,
      }),
    [data]
  );

  return (
    <>
      {isLoading || isFetching ? (
        <TechniciansEditFormSkeleton />
      ) : (
        <TechniciansEditForm user={data!} />
      )}
    </>
  );
};
