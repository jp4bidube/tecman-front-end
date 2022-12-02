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
        name: "Técnicos",
        path: "/technicians",
        icon: <TbUserCircle size={25} />,
        subhead: [
          { name: `Edição - ${data?.name}`, path: "/technicians/edit" },
        ],
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
