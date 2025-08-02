import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent } from "@testing-library/react";
import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query";

import { useOptimisticMutation } from "../useOptimisticMutation";
import { renderWithClient } from "./utils";

type Todo = { id: number };

const MOCK_QUERY_DATA = {
  todo: {
    queryKey: ["todos"],
    initialData: [{ id: 1 }, { id: 2 }]
  }
} as const;

describe("useOptimisticMutation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({ queryCache: new QueryCache({}) });
    queryClient.setQueryData(MOCK_QUERY_DATA.todo.queryKey, MOCK_QUERY_DATA.todo.initialData);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to update optimistically when mutation is success. ", async () => {
    const newTodo = { id: 3 };

    function Page() {
      const { mutateAsync } = useOptimisticMutation({
        mutationFn: () => Promise.resolve(),
        optimisticUpdateOptions: {
          queryKey: MOCK_QUERY_DATA.todo.queryKey,
          getOptimisticState: ({ prevQueryData, variables }: { prevQueryData: Todo[]; variables: Todo }) => {
            return [...prevQueryData, variables];
          }
        }
      });

      return (
        <div>
          <button onClick={() => mutateAsync(newTodo)}>mutate</button>
        </div>
      );
    }

    const { getByRole } = renderWithClient(queryClient, <Page />);

    fireEvent.click(getByRole("button", { name: /mutate/i }));

    await vi.advanceTimersByTimeAsync(0);

    const todos = queryClient.getQueryData<Todo[]>(MOCK_QUERY_DATA.todo.queryKey) || [];
    expect(todos.some((t) => t.id === newTodo.id)).toBe(true);
  });

  it("should be able to restore data when mutation is error. ", async () => {
    const prevTodos = MOCK_QUERY_DATA.todo.initialData;
    const newTodo = { id: 3 };

    function Page() {
      const { mutateAsync } = useOptimisticMutation({
        mutationFn: () => Promise.reject(),
        optimisticUpdateOptions: {
          queryKey: MOCK_QUERY_DATA.todo.queryKey,
          getOptimisticState: ({ prevQueryData, variables }: { prevQueryData: Todo[]; variables: Todo }) => {
            return [...prevQueryData, variables];
          }
        }
      });

      const onButtonClick = async () => {
        try {
          await mutateAsync(newTodo);
          // eslint-disable-next-line no-empty
        } catch {}
      };

      return (
        <div>
          <button onClick={() => onButtonClick()}>mutate</button>
        </div>
      );
    }

    const { getByRole } = renderWithClient(queryClient, <Page />);

    fireEvent.click(getByRole("button", { name: /mutate/i }));

    await vi.advanceTimersByTimeAsync(0);

    const todos = queryClient.getQueryData<Todo[]>(MOCK_QUERY_DATA.todo.queryKey) || [];
    expect(todos).toEqual(prevTodos);
  });

  it("should be able to invalidate query when mutation is success. ", async () => {
    const newTodo = { id: 3 };

    const getTodoListMock = vi.fn();

    function Page() {
      useQuery({
        queryKey: MOCK_QUERY_DATA.todo.queryKey,
        queryFn: getTodoListMock,
        staleTime: 0
      });

      const { mutateAsync } = useOptimisticMutation({
        mutationFn: () => Promise.resolve(),
        optimisticUpdateOptions: {
          queryKey: MOCK_QUERY_DATA.todo.queryKey,
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

    const { getByRole } = renderWithClient(queryClient, <Page />);

    expect(getTodoListMock).toBeCalledTimes(1);

    fireEvent.click(getByRole("button", { name: /mutate/i }));
    await vi.advanceTimersByTimeAsync(0);

    expect(getTodoListMock).toBeCalledTimes(2);
  });

  it("should be able to invalidate query with function when mutation is success. ", async () => {
    const newTodo = { id: 3 };

    const getTodoListMock = vi.fn();

    function Page() {
      useQuery({
        queryKey: MOCK_QUERY_DATA.todo.queryKey,
        queryFn: getTodoListMock,
        staleTime: 0
      });

      const { mutateAsync } = useOptimisticMutation({
        mutationFn: () => Promise.resolve(),
        optimisticUpdateOptions: {
          queryKey: MOCK_QUERY_DATA.todo.queryKey,
          getOptimisticState: ({ prevQueryData, variables }: { prevQueryData: Todo[]; variables: Todo }) => {
            return [...prevQueryData, variables];
          },
          invalidateQueryOnSuccess: () => {
            return true;
          }
        }
      });

      return (
        <div>
          <button onClick={() => mutateAsync(newTodo)}>mutate</button>
        </div>
      );
    }

    const { getByRole } = renderWithClient(queryClient, <Page />);

    expect(getTodoListMock).toBeCalledTimes(1);

    fireEvent.click(getByRole("button", { name: /mutate/i }));
    await vi.advanceTimersByTimeAsync(0);

    expect(getTodoListMock).toBeCalledTimes(2);
  });

  it("should be able to skip optimistic update if query data is empty. ", async () => {
    const newTodo = { id: 3 };
    queryClient = new QueryClient();

    const updateFnMock = vi.fn();
    updateFnMock.mockImplementation(() => {
      return [newTodo];
    });

    function Page() {
      const { mutateAsync } = useOptimisticMutation({
        mutationFn: () => Promise.resolve(),
        optimisticUpdateOptions: {
          queryKey: MOCK_QUERY_DATA.todo.queryKey,
          getOptimisticState: updateFnMock
        }
      });

      return (
        <div>
          <button onClick={() => mutateAsync()}>mutate</button>
        </div>
      );
    }

    const { getByRole } = renderWithClient(queryClient, <Page />);

    fireEvent.click(getByRole("button", { name: /mutate/i }));
    await vi.advanceTimersByTimeAsync(0);

    expect(updateFnMock).toBeCalledTimes(0);
  });
});
