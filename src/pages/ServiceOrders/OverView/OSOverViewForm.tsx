import { ServiceOrders } from "@/types/serviceOrders";
import {
  Checkbox,
  Divider,
  Grid,
  Input,
  ScrollArea,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useRef } from "react";
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
  const componentRef = useRef<HTMLDivElement>(null);
  console.log(data);
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
          <Grid.Col xs={12} md={6}>
            <ClientSection data={data!} />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <OSInfo data={data!} />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Divider
              size="xs"
              labelPosition="left"
              label={<Title order={5}>Informações do Equipamento</Title>}
            />
          </Grid.Col>
          {data.equipments ? <Equipaments data={data.equipments} /> : null}
          <Grid.Col xs={12} md={6}>
            <Textarea
              placeholder="Descreva o defeito apresentado"
              label="Defeito Reclamado"
              value={data.defect}
              variant="filled"
              readOnly
              minRows={2}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Textarea
              placeholder="Observações"
              label="Observações"
              value={data?.observacao!}
              variant="filled"
              readOnly
              minRows={2}
            />
          </Grid.Col>
          {data.orderServiceStatus.id === 2 ? (
            <>
              <Grid.Col xs={12} md={6}>
                <Textarea
                  placeholder="Descreva o serviço executado"
                  label="Serviço executado"
                  value={data?.serviceExecuted!}
                  variant="filled"
                  readOnly
                  minRows={2}
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <Input.Wrapper label="Histórico de Peças">
                  <Checkbox
                    label="Houve venda de peça durante a execução do serviço"
                    mt={5}
                    checked={data?.pieceSold ? data?.pieceSold : false}
                    disabled
                  />
                  <Checkbox
                    label="O cliente ficou com as peças usadas?"
                    mt={15}
                    checked={data?.clientPiece ? data?.clientPiece : false}
                    disabled
                  />
                </Input.Wrapper>
              </Grid.Col>
            </>
          ) : null}

          {data.absence1 !== null ? (
            <>
              <Grid.Col xs={12} md={4}>
                <DatePicker
                  placeholder="Ausencia"
                  locale="pt-BR"
                  label="Ausencia"
                  inputFormat="DD/MM/YYYY"
                  value={new Date(data.absence1)}
                  disabled
                />
              </Grid.Col>
              <Grid.Col xs={12} md={2}>
                <TimeInput
                  label="Horário"
                  id="absence1Hour"
                  name="absence1Hour"
                  clearable
                  value={new Date(data.absence1)}
                  disabled
                />
              </Grid.Col>
              <Grid.Col xs={12} md={6}>
                <TextInput
                  variant="filled"
                  readOnly
                  placeholder="Quem "
                  label="Quem informou a ausência"
                  id="obsAbsence"
                  name="obsAbsence"
                  value={data?.obsAbsence!}
                />
              </Grid.Col>
            </>
          ) : null}
        </Grid>
      </ScrollArea.Autosize>
    </Stack>
  );
};
