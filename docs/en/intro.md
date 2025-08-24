# About Tanstack Query Optimistic Updates

`tanstack-query-optimistic-updates` is a simple way to apply optimistic updates with TanStack Query.

TanStack Query provides APIs to apply optimistic updates. However, applying optimistic updates requires repetitive boilerplate code.

- You must manually define the `onMutate`, `onError`, and `onSettled` callbacks.
- Cache updates, rollback logic, and query invalidations are handled differently across implementations.

tanstack-query-optimistic-updates offers a way to simplify and make more consistent optimistic updates logic across projects.

- **Reduce boilerplate**: Handles common patterns like snapshotting, rollback, and cache updates are handled internally.
- **Enforce consistency**: Provide a abstraction for optimistic updates to keep codebases clean and predictable.
- **Make optimistic updates easy**: Lets you focus on business logic instead of repetitive callback and cache management.

## Features

- **✨ Seamless**: Complete compatibility layer to seamlessly replace useMutation
- **⚡ Lightweight**: Zero external dependencies for minimal bundle size
- **📦 Dual Package Support**: Built for both ESM and CJS to optimize tree shaking
- **🛡️ Type Safety**: Complete typed API with comprehensive type definitions

## Links

- [Github](https://github.com/mugglim/tanstack-query-optimistic-updates)
