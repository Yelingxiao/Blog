<a name="haZzf"></a>
# mountCallback
```typescript
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  // 创建hook
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 当包裹的函数以及依赖，存储在hook对象的memoizedState上
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```
<a name="xo47t"></a>
# updateCallback
```typescript
function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      // 如果新老依赖没有改变，那么久返回上一次缓存的callback
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  // 否则，返回新的callback
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```
