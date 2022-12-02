import { Flex, Group, ThemeIcon } from "@mantine/core";
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
        <Flex align="center" gap={10}>
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
        </Flex>
      </Group>
    </th>
  );
};
