import { Grid, Skeleton } from "@mantine/core";

export const PaginationSkeleton: React.FC = () => {
  return (
    <Grid gutter="xs">
      <Grid.Col span={3}>
        <Skeleton height={32} circle />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={32} circle />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={32} circle />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={32} circle />
      </Grid.Col>
    </Grid>
  );
};
