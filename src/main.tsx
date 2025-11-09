import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./i18n.ts";
import { ContentfulProvider } from "./context/contentful.context.tsx";
import ReactLenis from "lenis/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.12 }}>
      <ContentfulProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContentfulProvider>
    </ReactLenis>
  </StrictMode>
);
