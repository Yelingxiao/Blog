主流程

1. 设置hooks的实现，给ReactCurrentDispatcher赋值
1. 执行函数组件所对应的函数以及相关hooks函数
1. 检测渲染阶段的产生的更新并给出提示
1. 将执行的结果都挂在到work-in-progress Fiber对象上
1. 返回函数组件渲染的JSXElement
```typescript
export function renderWithHooks(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: any,
  props: any,
  refOrContext: any,
  nextRenderExpirationTime: ExpirationTime,
): any {
  // 记录当前nextRenderExpirationTime
  renderExpirationTime = nextRenderExpirationTime;
  // 记录当前的workInProgress,也就是Fiber对象
  currentlyRenderingFiber = workInProgress;
  // 一开始进来，记录第一个hook对象
  nextCurrentHook = current !== null ? current.memoizedState : null;

  if (__DEV__) {
    // ...
  } else {
    // 设置hook的实现，根据nextCurrentHook判断是mount还是update
    ReactCurrentDispatcher.current =
      nextCurrentHook === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }
  // 调用函数组件 ，相关的hooks会在函数组件执行的时候调用
  // 第一个参数为props, 第二个参数为ref或者context
  let children = Component(props, refOrContext);

  // 如果didScheduleRenderPhaseUpdate为true，
  // 说明是在函数体内直接产生了更新 
  // 这里会统计渲染的次数，并给出相应的提示 
  // 在dispatchAction里面，会进行判断产生更新的来源，如果确实是在函数体内产生的更新
  // 会设置didScheduleRenderPhaseUpdate为true
  if (didScheduleRenderPhaseUpdate) {
    do {
      didScheduleRenderPhaseUpdate = false;
      numberOfReRenders += 1;
      nextCurrentHook = current !== null ? current.memoizedState : null;
      nextWorkInProgressHook = firstWorkInProgressHook;

      currentHook = null;
      workInProgressHook = null;
      componentUpdateQueue = null;
      ReactCurrentDispatcher.current = __DEV__
        ? HooksDispatcherOnUpdateInDEV
        : HooksDispatcherOnUpdate;

      children = Component(props, refOrContext);
    } while (didScheduleRenderPhaseUpdate);
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }

  const renderedWork: Fiber = (currentlyRenderingFiber: any);
  // 设置响应结果到Fiber对象上
  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.expirationTime = remainingExpirationTime;
  renderedWork.updateQueue = (componentUpdateQueue: any);
  renderedWork.effectTag |= sideEffectTag;

  // 正常执行完 currentHook 等于Null,如果不等于Null,说明有hooks没执行到
  // 可能存在于if 这种条件判断语句中
  const didRenderTooFewHooks =
    currentHook !== null && currentHook.next !== null;

    // 执行完重置变量
  renderExpirationTime = NoWork;
  currentlyRenderingFiber = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;

  return children;
}
```

