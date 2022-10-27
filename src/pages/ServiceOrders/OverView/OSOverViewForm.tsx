import { useFetchClientByCPF } from "@/services/features/clients/hooks/useFetchClientByCPF";
import { useCreateOS } from "@/services/features/serviceOrders/hooks/useCreateOS";
import { useFetchOSById } from "@/services/features/serviceOrders/hooks/useFetchOSById";
import { useTechniciansSelect } from "@/services/features/technicians/hooks/useTechniciansSelect";
import {
  Accordion,
  ActionIcon,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { FormikProvider, useFormik } from "formik";
import { TbAd2, TbEdit, TbH1, TbPrinter, TbX } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { validationSchema } from "./validationSchema";

type Equipment = {
  type: string;
  brand: string;
  model: string;
};

export const OSOverViewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useFetchOSById(id || "");

  return (
    <Stack style={{ maxHeight: "90vh", overflow: "hidden" }}>
      {isFetching ? (
        <h1>test</h1>
      ) : (
        <>
          <Grid gutter="xl" mb={16}>
            <Grid.Col span={12}>
              <Group position="apart" align="baseline">
                <Group position="left">
                  <Title order={4}>Número O.S</Title>
                  <Badge size="xl">{data?.id}</Badge>
                </Group>
                <Badge size="lg" color="orange">
                  {data?.orderServiceStatus?.status}
                </Badge>
                <Group>
                  <Tooltip label="Concluir Ordem de Serviço">
                    <Button radius="xl" leftIcon={<TbAd2 size={20} />}>
                      Finalizar
                    </Button>
                  </Tooltip>
                  <Button
                    radius="xl"
                    variant="outline"
                    leftIcon={<TbPrinter size={20} />}
                  >
                    Imprimir
                  </Button>
                  <Tooltip label="Editar Ordem de Serviço">
                    <ActionIcon
                      radius="lg"
                      variant="light"
                      color="primary"
                      type="submit"
                    >
                      <TbEdit size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Fechar">
                    <ActionIcon
                      radius="lg"
                      variant="light"
                      color="primary"
                      onClick={() => navigate("/service-orders")}
                    >
                      <TbX size={20} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>
            </Grid.Col>
          </Grid>
          <ScrollArea.Autosize maxHeight="79vh" type="scroll" scrollbarSize={8}>
            <Grid>
              <Grid.Col span={12}>
                <Group position="right">
                  <Title order={4}>Valor R$</Title>
                  <Badge size="xl" color="teal">
                    100,00
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group mt={10} position="apart">
                  <Group>
                    <Title order={5}>Cliente</Title>
                    <Text size="sm">
                      {data?.client?.name}{" "}
                      <Text color="gray.7" component="span" weight="bold">
                        - {data?.client?.cpf}
                      </Text>
                    </Text>
                  </Group>
                  <Group>
                    <Title order={5}>Data de criação</Title>
                    <Text size="sm">
                      {new Date(data?.dateCreated || "").toLocaleDateString(
                        "pt-BR"
                      )}
                    </Text>
                  </Group>
                </Group>
                <Group mt={5}>
                  <Title order={5}>Endereço</Title>
                  <Text size="sm">
                    {data?.street} - {data?.number}
                  </Text>
                </Group>
                <Group mt={5}>
                  <Title order={5}>CEP</Title>
                  <Text size="sm">
                    {data?.cep} - {data?.complement}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col xs={12}>
                <Divider />
              </Grid.Col>
              <Grid.Col span={12}>
                <Group mt={10} position="apart">
                  <Group>
                    <Title order={5}>Técnico</Title>
                    <Text size="sm">
                      {data?.tecnic.name}{" "}
                      <Text color="gray.7" component="span" weight="bold">
                        - {data?.tecnic.cpf}
                      </Text>
                    </Text>
                  </Group>
                  {data?.absence1 && (
                    <Group>
                      <Title order={5}>Data de ausencia</Title>
                      <Text size="sm">
                        {new Date(data?.absence1 || "").toLocaleDateString(
                          "pt-BR"
                        )}
                      </Text>
                    </Group>
                  )}
                </Group>
                <Group mt={5}>
                  <Title order={5}>Atendente</Title>
                  <Text size="sm">{data?.createdBy?.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col>
                <Group mb={10}>
                  <Title order={4}>Equipamentos</Title>
                </Group>
                <Accordion variant="separated">
                  <Accordion.Item value="1">
                    <Accordion.Control>
                      Geladeira - Brastemp - Inverter
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Grid>
                        <Grid.Col span={6}>
                          <Textarea
                            placeholder="Descreva o defeito apresentado"
                            label="Defeito"
                            name="defect"
                            id="defect"
                            value="Não liga a geladeira"
                            autosize
                            minRows={2}
                            readOnly
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Textarea
                            placeholder="Descreva o serviço executado"
                            label="Serviço executado"
                            name="defect"
                            id="defect"
                            disabled
                            autosize
                            minRows={2}
                          />
                        </Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="2">
                    <Accordion.Control>
                      Micro-ondas - Brastemp - do Mal
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Grid>
                        <Grid.Col span={6}>
                          <Textarea
                            placeholder="Descreva o defeito apresentado"
                            label="Defeito"
                            name="defect"
                            id="defect"
                            value="Não gira o prato"
                            autosize
                            minRows={2}
                            readOnly
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Textarea
                            placeholder="Descreva o serviço executado"
                            label="Serviço executado"
                            name="defect"
                            id="defect"
                            disabled
                            autosize
                            minRows={2}
                          />
                        </Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Grid.Col>
            </Grid>
          </ScrollArea.Autosize>
        </>
      )}
    </Stack>
  );
};
