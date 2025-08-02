import { QueryKey } from "@tanstack/react-query";

export type OptimisticUpdateOptions<TQueryData = unknown, TVariables = void> = {
  queryKey: QueryKey;
  invalidateQueryOnSuccess?: boolean | (() => boolean);
  getOptimisticState: (param: { prevQueryData: TQueryData; variables: TVariables }) => TQueryData;
};

export type OptimisticUpdateContext = {
  prevQueryData?: unknown;
};
