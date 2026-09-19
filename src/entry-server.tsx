import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Build-time only: renders the portfolio to static HTML so search engines
 * and social-link crawlers receive real content without running JavaScript. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
