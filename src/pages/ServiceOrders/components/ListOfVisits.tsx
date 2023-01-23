import { WarrantyVisitItem } from "@/types/serviceOrders";
import {
  Box,
  Checkbox,
  createStyles,
  Grid,
  Input,
  Tabs,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 6 : 7],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 2 : 7],

    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}));

interface ListOfVisitsProps {
  data: WarrantyVisitItem[];
}

export function ListOfVisits({ data }: ListOfVisitsProps) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState<number | null>(data[0].id);
  const [activeItem, setActiveItem] = useState<WarrantyVisitItem>(data[0]);
  const theme = useMantineTheme();

  const items = data.map((item) => (
    <Box<"span">
      component="span"
      onClick={(event) => {
        event.preventDefault();
        setActive(item.id);
        setActiveItem(item);
      }}
      key={item.id}
      className={cx(classes.link, {
        [classes.linkActive]: active === item.id,
      })}
      sx={(theme) => ({ paddingLeft: 1 * theme.spacing.lg })}
    >
      {new Date(item.dateVisit).toLocaleDateString("pt-BR")}
    </Box>
  ));

  return (
    <Tabs defaultValue={data[0].id.toString()} orientation="vertical">
      <Tabs.List>
        {data.map((item) => (
          <Tabs.Tab value={item.id.toString()}>
            <Text size="sm">
              {new Date(item.dateVisit).toLocaleDateString("pt-BR")}
            </Text>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {data.map((item) => (
        <Tabs.Panel value={item.id.toString()}>
          <Grid ml={20}>
            <Grid.Col>
              <Text size="sm" component="label">
                Data da Visita:
              </Text>
              <Text size="sm">
                {new Date(item.dateVisit).toLocaleDateString("pt-BR")}
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Input.Wrapper label="Historico de Peças">
                <Checkbox
                  label={
                    <Text size="sm">O cliente ficou com as peças usadas?</Text>
                  }
                  mt={5}
                  id="pieceSold"
                  defaultChecked={item.clientePiece}
                  name="pieceSold"
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col>
              {" "}
              <Textarea
                placeholder="Descreva o serviço executado"
                label="Serviço executado"
                name="serviceExecuted"
                id="serviceExecuted"
                value={item.serviceExecuted}
                autosize
                readOnly
                variant="filled"
                minRows={6}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      ))}
    </Tabs>
    // <>
    //   <Box sx={{ width: "30%" }}>{items}</Box>
    //   {active ? (
    //     <SimpleGrid
    //       cols={2}
    //       sx={{
    //         width: "100%",
    //       }}
    //     >
    //       <Box sx={{ padding: "1rem" }}>
    //         <Group spacing="xs" mb={10}>
    //           <Text size="sm" component="label">
    //             Data da Visita:
    //           </Text>
    //           <Text size="sm">
    //             {" "}
    //             {new Date(activeItem.dateVisit).toLocaleDateString("pt-BR")}
    //           </Text>
    //         </Group>
    //         <Input.Wrapper label="Historico de Peças">
    //           <Checkbox
    //             label="O cliente ficou com as peças usadas?"
    //             mt={5}
    //             id="pieceSold"
    //             checked={activeItem.clientePiece}
    //             name="pieceSold"
    //           />
    //         </Input.Wrapper>
    //       </Box>
    //       <Box sx={{ width: "100%", padding: "1rem" }}>
    //         <Textarea
    //           placeholder="Descreva o serviço executado"
    //           label="Serviço executado"
    //           name="serviceExecuted"
    //           id="serviceExecuted"
    //           value={activeItem.serviceExecuted}
    //           autosize
    //           disabled
    //           minRows={6}
    //         />
    //       </Box>
    //     </SimpleGrid>
    //   ) : null}
    // </>
  );
}
