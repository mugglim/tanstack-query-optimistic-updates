import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { render } from "@testing-library/react";

export const delay = (ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const renderWithClient = (client: QueryClient, ui?: React.ReactElement): ReturnType<typeof render> => {
  const result = render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);

  return {
    ...result,
    rerender: (ui) => result.rerender(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
  };
};
