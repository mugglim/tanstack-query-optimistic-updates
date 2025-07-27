"use client";

import { DefaultError, QueryClient, useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import { OptimisticUpdateContext, OptimisticUpdateOptions } from "./types";
import { isFunction } from "../../utils";

export function useOptimisticMutation<TData = unknown, TError = DefaultError, TVariables = void, TQueryData = unknown>(
  {
    optimisticUpdateOptions,
    ...originalMutationOptions
  }: UseMutationOptions<TData, TError, TVariables, OptimisticUpdateContext> & {
    optimisticUpdateOptions: OptimisticUpdateOptions<TQueryData, TVariables>;
  },
  queryClient?: QueryClient
) {
  const client = useQueryClient(queryClient);

  const { onMutate, onError, onSuccess, ...restOriginalMutationOptions } = originalMutationOptions;
  const {
    queryKey: optimisticUpdateQueryKey,
    invalidateQueryOnSuccess = false,
    optimisticUpdatesFn
  } = optimisticUpdateOptions;

  return useMutation<TData, TError, TVariables, OptimisticUpdateContext>(
    {
      onMutate: async (variables) => {
        await client.cancelQueries({ queryKey: optimisticUpdateQueryKey });

        const prevQueryData = client.getQueryData<TQueryData>(optimisticUpdateQueryKey);

        if (!prevQueryData) {
          // If query data is undefined, optimistic update is skipped.
          return;
        }

        const optimisticQueryData = optimisticUpdatesFn({ prevQueryData, variables });

        client.setQueryData(optimisticUpdateQueryKey, optimisticQueryData);
        onMutate?.(variables);

        return { prevQueryData };
      },
      onError: (error, variables, context) => {
        client.setQueryData(optimisticUpdateQueryKey, context?.prevQueryData);

        onError?.(error, variables, context);
      },
      onSuccess: (data, variables, context) => {
        const shouldInvalidateQuery = isFunction(invalidateQueryOnSuccess)
          ? invalidateQueryOnSuccess()
          : invalidateQueryOnSuccess;

        if (shouldInvalidateQuery) {
          client.invalidateQueries({ queryKey: optimisticUpdateQueryKey });
        }

        onSuccess?.(data, variables, context);
      },
      ...restOriginalMutationOptions
    },
    client
  );
}
