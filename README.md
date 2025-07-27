# tanstack-query-optimistic-update · ![LICENSE](https://img.shields.io/badge/license-MIT-blue)

tanstack-query-optimistic-update is a wrapper around React Query’s useMutation that simplifies optimistic update.

- tanstack-query-optimistic-update simplifies optimistic updates, including rollback and query invalidation.
- tanstack-query-optimistic-update is fully compatible with useMutation.

You can learn more about the core concepts from the official TanStack Query's [Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) Guide.

## Examples

```tsx
import { useOptimisticMutation } from "tanstack-query-optimistic-update";

type Todo = {
  id: number;
};

function Page() {
  const { mutateAsync } = useOptimisticMutation({
    mutationFn: () => Promise.resolve(),
    optimisticUpdateOptions: {
      queryKey: ["todos"],
      /**
       * Optimistically updates the query data depending on queryKey.
       *
       * Scenarios:
       * - (1) When mutation begins: [...prevQueryData, variables]
       * - (2-1) When mutation is failed: [...prevQueryData] (rollback)
       * - (2-2) When mutation is success: [...prevQueryData, variables]
       * */
      optimisticUpdateFn: ({ prevQueryData, variables }: { prevQueryData: Todo[]; variables: Todo }) => {
        return [...prevQueryData, variables];
      },
      /**
       * Invalidate query when mutation is success.
       * */
      invalidateQueryOnSuccess: true
    }
  });

  return (
    <div>
      <button onClick={() => mutateAsync(newTodo)}>mutate</button>
    </div>
  );
}
```

## Contributing

We welcome contribution from everyone. Read below for contributing guidelines.

[CONTRIBUTING](./CONTRIBUTING.md)

## License

See [LICENSE](./LICENSE) for details.
