import { afterEach } from "vitest";
import { cleanup as cleanRTL } from "@testing-library/react";

afterEach(() => {
  cleanRTL();
});
