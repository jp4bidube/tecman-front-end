import { Box, Grid, Paper, Skeleton, Stack } from "@mantine/core";

export const TechniciansEditFormSkeleton = () => {
  return (
    <Stack>
      <Paper withBorder sx={{ padding: "1.5rem" }}>
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" width="40%" />
          </Grid.Col>
          <Grid.Col span={2} offset={2}>
            <Skeleton height={35} radius="xl" />
          </Grid.Col>
          <Grid.Col span={2}>
            <Skeleton height={35} radius="xl" />
          </Grid.Col>
          <Grid.Col span={1}>
            <Skeleton circle height={50} radius="xl" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Box mb={3} mt={8}>
              <Skeleton height={15} width="50%" radius="xl" />
            </Box>
            <Skeleton height={15} radius="xl" />
          </Grid.Col>
          <Grid.Col span={7}>
            <Skeleton height={35} radius="xl" width="20%" />
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
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Skeleton height={25} radius="sm" mt={40} width="15%" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={2}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={25} radius="sm" />
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};
