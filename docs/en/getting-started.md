# Getting Started

## Installation

::: code-group

```sh [npm]
npm install tanstack-query-optimistic-updates
```

```sh [yarn]
yarn add tanstack-query-optimistic-updates
```

```sh [pnpm]
pnpm add tanstack-query-optimistic-updates
```

:::

## Usage

In the example below, you can see TanStack Query in its most basic and simple form being used to fetch the GitHub stats for the TanStack Query GitHub project itself:

```tsx
import { useOptimisticMutation } from "tanstack-query-optimistic-updates";

type Todo = {
  id: number;
};

function Page() {
  const { mutateAsync } = useOptimisticMutation({
    mutationFn: () => Promise.resolve(),
    optimisticUpdateOptions: {
      queryKey: ["todos"],
      getOptimisticState: ({ prevQueryData, variables }: { prevQueryData: Todo[]; variables: Todo }) => {
        return [...prevQueryData, variables];
      },
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
