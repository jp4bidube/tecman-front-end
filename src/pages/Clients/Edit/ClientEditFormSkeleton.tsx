import { Grid, Paper, Skeleton, Stack } from "@mantine/core";

export const ClientEditFormSkeleton = () => {
  return (
    <Stack>
      <Paper withBorder sx={{ padding: "1.5rem" }}>
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={2} offset={2}>
            <Skeleton height={35} radius="xl" />
          </Grid.Col>
          <Grid.Col span={2}>
            <Skeleton height={35} radius="xl" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Skeleton height={25} radius="sm" mt={40} width="30%" />
          </Grid.Col>
          <Grid.Col span={5}>
            <Skeleton height={205} radius="sm" />
          </Grid.Col>
          <Grid.Col span={5}>
            <Skeleton height={205} radius="sm" />
          </Grid.Col>
          <Grid.Col span={5}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={5}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};
