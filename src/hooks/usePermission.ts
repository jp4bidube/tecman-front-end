import useStore from "@/store";

export const usePermission = () => {
  const { loggedUser } = useStore();
  if (loggedUser.role !== "balconista") {
    return true;
  }
  return false;
};
