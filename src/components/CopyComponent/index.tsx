import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { TbCheck, TbCopy } from "react-icons/tb";

export const CopyComponent = (props: { value: string }) => {
  return (
    <CopyButton value={props.value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? "Copiado" : "Copiar"}
          withArrow
          position="right"
          color="gray"
        >
          <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
            {copied ? <TbCheck size="1.3rem" /> : <TbCopy size="1.3rem" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
