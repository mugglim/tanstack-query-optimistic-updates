# useOptimisticMutation

```tsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables
} = useOptimisticMutation({
  mutationFn: addTodo,
  optimisticUpdateOptions: {
    queryKey: ["todos"],
    optimisticUpdatesFn: ({ prevQueryData, variables }) => {
      return [...prevQueryData, variables];
    },
    invalidateQueryOnSuccess: true
  }
});
```

## Parameters

### Options

This parameter extends the original UseMutationOptions. All original options are supported, with an additional `optimisticUpdateOptions` field:

- `optimisticUpdateOptions: OptimisticUpdateOptions`
  - `queryKey : QueryKey`
    - The cache key of the query to optimistically update.
  - `invalidateQueryOnSuccess?: boolean | () => boolean`
    - Optional
    - Defaults to `false`
    - Whether to invalidate the query after a successful mutation
    - If set to `true`, the query will fetch if the data is stale.
  - `optimisticUpdatesFn: { prevQueryData: TQueryData; variables: TVariables }) => TQueryData;`
    - This function returns the state for optimistic updates.

## queryClient

- Optional
- If not provided, the default QueryClient from context will be used.

## Returns

All return values are fully compatible with the original useMutation API.
