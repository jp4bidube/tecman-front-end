import { MainRoutes } from "@/routes";
import { theme } from "@/theme";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import useStore from "./store";
import { GlobalStyle } from "./theme/Global";

const App = () => {
  const store = useStore();

  const toggleColorScheme = (value?: ColorScheme) =>
    store.setColorScheme(
      value || (store.colorScheme === "dark" ? "light" : "dark")
    );

  return (
    <ColorSchemeProvider
      colorScheme={store.colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          ...theme,
          colorScheme: store.colorScheme,
          components: {
            Title: {
              defaultProps: {
                color: store.colorScheme === "dark" ? "dark.0" : "dark.3",
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-right">
          <ModalsProvider>
            <GlobalStyle />
            <MainRoutes />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
