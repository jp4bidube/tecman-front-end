import { WarrantyVisitItem } from "@/types/serviceOrders";
import { maskCpf } from "@/utils/getRandomColor";
import { Accordion, Flex, Grid, Group, Text } from "@mantine/core";

interface ListOfVisitsProps {
  data: WarrantyVisitItem[];
}

export function ListOfVisits({ data }: ListOfVisitsProps) {
  return (
    <Accordion variant="separated" miw="100%">
      {data.map((item) => (
        <Accordion.Item value={item.id + ""}>
          <Accordion.Control
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark" ? "#2C2E33" : "#f1f3f5",
            })}
          >
            <Flex>
              <Text size="sm" weight={500} component="label">
                Data da visita:
              </Text>
              <Text size="sm" ml={10}>
                {new Date(item.dateVisit).toLocaleDateString("pt-BR")}
              </Text>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>
            <Grid>
              <Grid.Col xs={12}>
                <Group spacing="xs">
                  <Text size="sm" weight={500} component="label">
                    Cliente ficou com as peças usadas:
                  </Text>
                  <Text size="sm">{item.clientePiece ? "Sim" : "Não"}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Group spacing="xs">
                  <Text size="sm" weight={500} component="label">
                    Técnico Responsável :
                  </Text>
                  <Text size="sm">
                    {item.employee.name} - {maskCpf(item.employee.cpf)}
                  </Text>
                </Group>
              </Grid.Col>

              <Grid.Col xs={12}>
                <Group spacing="xs">
                  <Text size="sm" weight={500} component="label">
                    Serviço executado:
                  </Text>
                  <Text size="sm">{item.serviceExecuted}</Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
