import { Card, Grid, Group, Text, Title } from "@mantine/core";

type ClientSectionProps = {
  name: string;
  document: string;
  phone: string;
  email: string;
};
export const ClientSection = ({
  name,
  document,
  phone,
  email,
}: ClientSectionProps) => {
  return (
    <Card
      p="md"
      radius="sm"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#2C2E33" : "#f1f3f5",
      })}
    >
      <Title order={5}>Cliente</Title>
      <Grid>
        <Grid.Col xs={12} md={4}>
          <Group mt={10} position="apart">
            <Group spacing="xs">
              <Text size="sm" component="label" weight={500}>
                Nome:
              </Text>
              <Text size="sm">{name}</Text>
            </Group>
          </Group>
          <Group mt={5} noWrap spacing="xs">
            <Text size="sm" component="label" weight={500}>
              CPF:
            </Text>
            <Text size="sm">{document}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <Group mt={10} spacing="xs">
            <Text size="sm" component="label" weight={500}>
              Email:
            </Text>
            <Text size="sm">{email}</Text>
          </Group>
          <Group mt={5}>
            <Text size="sm" component="label" weight={500}>
              Telefone:
            </Text>
            <Text size="sm">{phone}</Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
