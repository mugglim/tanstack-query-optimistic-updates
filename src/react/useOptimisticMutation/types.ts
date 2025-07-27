import { QueryKey } from "@tanstack/react-query";

export type OptimisticUpdateOptions<TQueryData = unknown, TVariables = void> = {
  /**
   * A query key for optimistic update
   */
  queryKey: QueryKey;
  /**
   * A function returns the resulting optimistic state.
   */
  optimisticUpdateFn: (param: { prevQueryData: TQueryData; variables: TVariables }) => TQueryData;
  /**
   * If set to `true`, the query will fetch if the data is stale.
   *
   * @default false
   */
  invalidateQueryOnSuccess?: boolean | (() => boolean);
};

export type OptimisticUpdateContext = {
  prevQueryData?: unknown;
};
