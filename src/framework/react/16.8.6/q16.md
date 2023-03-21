<a name="jkIaQ"></a>
# React导出Hooks
```typescript
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from './ReactHooks';

const React = {
  // ...
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
};

export default React;
```
<a name="xS4GF"></a>
# ReactHooks.js
react/src/ReactHooks.js 定义了hooks方法，并导出
```typescript
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
}

export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useContext(Context, unstable_observedBits);
}

export function useState<S>(initialState: (() => S) | S) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

export function useRef<T>(initialValue: T): {current: T} {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

export function useEffect(
  create: () => (() => void) | void,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

export function useLayoutEffect(
  create: () => (() => void) | void,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

export function useCallback(
  callback: () => mixed,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

export function useMemo(
  create: () => mixed,
  inputs: Array<mixed> | void | null,
) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

export function useImperativeHandle<T>(
  ref: {current: T | null} | ((inst: T | null) => mixed) | null | void,
  create: () => T,
  inputs: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

export function useDebugValue(value: any, formatterFn: ?(value: any) => any) {
  if (__DEV__) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}
```
由此可看出，React.js的hooks的实现，都是来自于ReactCurrentDispatcher.current，最终，ReactCurrentDispatcher的赋值，是在react-reconciler/src/ReactFiberHooks.js中
```typescript
    ReactCurrentDispatcher.current = nextCurrentHook === null
      ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
```
分别对应两个阶段，一个挂载阶段，一个更新阶段
<a name="Pr32H"></a>
# ReactFiberHooks.js
ReactFiberHooks.js实现了renderWidthHooks函数以及具体的hooks的实现，在ReactFiberBeginWork.js中，更新FunctionComponent组件的时候，调用renderWithHooks，拿到JSXElement节点，然后继续reconcileChildren流程。[updateFunctionComponent](https://www.yuque.com/jsjett/gf4ns5/gvrqxw)；
<a name="xaNcM"></a>
# HooksDispatcherOnMount
```typescript
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
};
```
<a name="xEZ6j"></a>
# HooksDispatcherOnUpdate
```typescript
const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
};
```
HooksDispatcherOnMount 和 HooksDispatcherOnUpdate分别对应挂载和更新,hooks在挂载与更新的时候
