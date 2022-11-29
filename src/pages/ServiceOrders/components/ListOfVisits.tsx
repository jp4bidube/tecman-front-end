import { WarrantyVisitItem } from "@/types/serviceOrders";
import {
  Box,
  Checkbox,
  createStyles,
  Grid,
  Group,
  Input,
  SimpleGrid,
  Text,
  Textarea,
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
  const [active, setActive] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<WarrantyVisitItem>(
    {} as WarrantyVisitItem
  );

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
    <>
      <Box sx={{ width: "30%", marginRight: "3rem" }}>{items}</Box>
      {active ? (
        <SimpleGrid cols={2} sx={{ width: "100%" }}>
          <Box>
            <Group spacing="xs" mb={10}>
              <Text size="sm" component="label">
                Data de criação:
              </Text>
              <Text size="sm">
                {" "}
                {new Date(activeItem.dateVisit).toLocaleDateString("pt-BR")}
              </Text>
            </Group>
            <Input.Wrapper label="Venda de Peças">
              <Checkbox
                label="Houve venda de peça durante a execução do serviço"
                mt={5}
                id="pieceSold"
                checked={activeItem.clientePiece}
                name="pieceSold"
              />
            </Input.Wrapper>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Textarea
              placeholder="Descreva o serviço executado"
              label="Serviço executado"
              name="serviceExecuted"
              id="serviceExecuted"
              value={activeItem.serviceExecuted}
              autosize
              minRows={6}
            />
          </Box>
        </SimpleGrid>
      ) : null}
    </>
  );
}
