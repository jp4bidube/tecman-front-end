import { Group, ThemeIcon } from "@mantine/core";
import { ThHTMLAttributes } from "react";
import { TbChevronDown, TbChevronUp, TbSelector } from "react-icons/tb";

type ThProps = ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  onSort: (column: string) => void;
  sort: string;
  order: string;
  columnName: string;
};

export const Th = ({ onSort, sort, order, columnName, children }: ThProps) => {
  return (
    <th>
      <Group sx={{ cursor: "pointer" }} onClick={() => onSort(columnName)}>
        {children}
        <ThemeIcon variant="light" color={sort === columnName ? "" : "gray"}>
          {sort === columnName ? (
            order === "asc" ? (
              <TbChevronUp size={15} />
            ) : (
              <TbChevronDown size={15} />
            )
          ) : (
            <TbSelector size={15} />
          )}
        </ThemeIcon>
      </Group>
    </th>
  );
};
