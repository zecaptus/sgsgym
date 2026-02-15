import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { store } from "./store";
import { locale, messages } from "./i18n";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </Provider>
  </StrictMode>,
);
