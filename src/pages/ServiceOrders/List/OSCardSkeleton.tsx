import { Card, Group, Skeleton, Stack } from "@mantine/core";

export const OSCardSkeleton = () => {
  return (
    <Stack>
      {Array.from(Array(5).keys()).map((_, index) => (
        <Card shadow="sm" p="lg" radius="md" withBorder mb="lg" key={index}>
          <Group position="apart" mt="md" mb="xs">
            <Skeleton height={20} radius="sm" width={90} />
            <Skeleton height={20} radius="sm" width={200} />
          </Group>
          <Group position="apart" mt="md" mb="xs">
            <Group sx={{ cursor: "pointer" }}>
              <Skeleton height={20} radius="sm" width={80} />
            </Group>
            <Skeleton height={20} radius="sm" width={150} />
          </Group>
          <Group position="apart" mt="md" mb="xs">
            <Skeleton height={20} radius="sm" width={90} />
            <Skeleton height={20} radius="sm" width={300} />
          </Group>
          <Group position="apart" mt="md" mb="xs">
            <Skeleton height={20} radius="sm" width={150} />
            <Skeleton height={20} radius="sm" width={100} />
          </Group>
          <Card.Section withBorder inheritPadding py="xs">
            <Group>
              <Skeleton height={20} radius="sm" width={150} />
            </Group>
          </Card.Section>
        </Card>
      ))}
    </Stack>
  );
};
