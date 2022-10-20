import { Grid, Skeleton, Table, ThemeIcon } from "@mantine/core";

import { TbChevronDown } from "react-icons/tb";

export const TechniciansTableSkeleton = () => {
  return (
    <Table verticalSpacing="sm" striped>
      <thead>
        <tr>
          <th>
            <Grid>
              <Grid.Col span={10}>
                <Skeleton height={25} width="100%" radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <ThemeIcon variant="light" color="gray">
                  <TbChevronDown size={15} />
                </ThemeIcon>
              </Grid.Col>
            </Grid>
          </th>
          <th>
            <Grid>
              <Grid.Col span={10}>
                <Skeleton height={25} width="100%" radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <ThemeIcon variant="light" color="gray">
                  <TbChevronDown size={15} />
                </ThemeIcon>
              </Grid.Col>
            </Grid>
          </th>
          <th>
            <Grid>
              <Grid.Col span={10}>
                <Skeleton height={25} width="100%" radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <ThemeIcon variant="light" color="gray">
                  <TbChevronDown size={15} />
                </ThemeIcon>
              </Grid.Col>
            </Grid>
          </th>
          <th>
            <Grid>
              <Grid.Col span={10}>
                <Skeleton height={25} width="100%" radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <ThemeIcon variant="light" color="gray">
                  <TbChevronDown size={15} />
                </ThemeIcon>
              </Grid.Col>
            </Grid>
          </th>
          <th style={{ width: "6rem" }}>
            <Skeleton height={25} width="100%" radius="sm" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(5).keys()).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton
                height={20}
                radius="sm"
                width={`${(Math.random() * 100) | 10}%`}
              />
            </td>
            <td>
              <Skeleton
                height={20}
                width={`${(Math.random() * 100) | 10}%`}
                radius="sm"
              />
            </td>
            <td>
              <Skeleton
                height={20}
                width={`${(Math.random() * 100) | 10}%`}
                radius="sm"
              />
            </td>
            <td>
              <Skeleton
                height={20}
                width={`${(Math.random() * 100) | 10}%`}
                radius="sm"
              />
            </td>
            <td>
              <Grid>
                <Grid.Col span={6}>
                  <Skeleton height={20} width={30} radius="sm" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Skeleton height={20} width={30} radius="sm" />
                </Grid.Col>
              </Grid>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
