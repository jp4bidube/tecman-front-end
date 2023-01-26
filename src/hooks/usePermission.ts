import useStore from "@/store";

export const usePermission = () => {
  const { loggedUser } = useStore();
  if (loggedUser.role !== "Balconista") {
    return true;
  }
  return false;
};
