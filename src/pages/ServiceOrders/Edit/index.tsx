import { useFetchOSById } from "@/services/features/serviceOrders/hooks/useFetchOSById";
import useStore from "@/store";
import { useEffect } from "react";
import { TbAd2 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { OSEditForm } from "./OSEditForm";

export const ServiceOrdersEdit = () => {
  const store = useStore();

  const { id, osId } = useParams();
  const { data, isLoading } = useFetchOSById(osId || id || "");

  useEffect(() => {
    if (osId) {
      const breadcrumbList = store.breadcrumb.subhead || [];
      const filteredBreadcrumbList = breadcrumbList.slice(0, -1);
      store.addBreadcrumbSubhead([
        ...filteredBreadcrumbList,
        { name: `Edição - ${osId}`, path: "" },
      ]);
    } else {
      store.setNewBreadcrumbs({
        name: "Ordens de Serviço",
        path: "/service-orders",
        icon: <TbAd2 size={25} />,
        subhead: [{ name: `Edição - ${data?.id}`, path: "" }],
      });
    }
  }, [osId, id, data]);

  return !isLoading ? <OSEditForm os={data!} /> : null;
};
