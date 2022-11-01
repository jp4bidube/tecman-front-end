import { ServiceOrders } from "@/types/serviceOrders";
import { Grid, Group, ScrollArea, Stack, Textarea, Title } from "@mantine/core";
import { ClientSection } from "./components/ClientSection";
import { Equipaments } from "./components/Equipaments";
import { OSInfo } from "./components/OSInfo";
import { Top } from "./components/Top";

type OSOverViewFormProps = {
  handleFinishOS: (value: boolean) => void;
  data: ServiceOrders;
};

export const OSOverViewForm = ({
  handleFinishOS,
  data,
}: OSOverViewFormProps) => {
  return (
    <Stack style={{ maxHeight: "90vh", overflow: "hidden" }}>
      <Top data={data!} handleFinishOS={handleFinishOS} />
      <ScrollArea.Autosize
        maxHeight="79vh"
        type="scroll"
        scrollHideDelay={200}
        scrollbarSize={8}
      >
        <Grid>
          <Grid.Col xs={6}>
            <ClientSection data={data!} />
          </Grid.Col>
          <Grid.Col xs={6}>
            <OSInfo data={data!} />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Group my={10}>
              <Title order={4}>Equipamentos</Title>
            </Group>
            <Equipaments data={data?.equipments!} />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              placeholder="Descreva o defeito apresentado"
              label="Defeito"
              name="defect"
              id="defect"
              value={data.defect}
              autosize
              minRows={2}
              readOnly
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              placeholder="Descreva o serviço executado"
              label="Serviço executado"
              value={data?.serviceExecuted!}
              disabled={!data?.serviceExecuted}
              autosize
              minRows={2}
            />
          </Grid.Col>
        </Grid>
      </ScrollArea.Autosize>
    </Stack>
  );
};
