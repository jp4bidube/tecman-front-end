import useStore from "@/store";
import {
  Breadcrumbs as MaBreadcrumbs,
  Group,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { TbCaretRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Breadcrumbs = () => {
  const store = useStore();
  const navigate = useNavigate();

  const { name, path, icon, subhead } = store.breadcrumb;

  return (
    <>
      <MaBreadcrumbs
        aria-label="breadcrumb"
        separator={<TbCaretRight size={20} />}
      >
        <Group
          onClick={() => navigate(path ? path : "/home")}
          sx={{
            cursor: "pointer",
            ":hover": { color: "GrayText", transition: "200ms" },
          }}
        >
          <ThemeIcon variant="light">{icon}</ThemeIcon>{" "}
          {subhead ? (
            <Text size="sm" color="dimmed">
              {name}
            </Text>
          ) : (
            <Text size="sm" component="label" weight={600}>
              {name}
            </Text>
          )}
        </Group>
        {subhead && (
          <Text size="sm" component="label" weight={600}>
            {subhead}
          </Text>
        )}
      </MaBreadcrumbs>
    </>
  );
};
