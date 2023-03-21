useReducer分为2个阶段，一个是mount(第一次渲染Function 组件)，一个是update(第二次更新组件的时候)<br />useState其实就是基于useReducer来实现的原理一样
<a name="D24L4"></a>
# mountReducer
```typescript
function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  // 创建hook对象
  const hook = mountWorkInProgressHook();
  let initialState;
  // 根据是否传递初始化state的函数，来初始化initialState
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = ((initialArg: any): S);
  }
  // 然后更新初始的state到当前hook对象的memoizedState以及baseState上
  hook.memoizedState = hook.baseState = initialState;
  // 创建hook的update queue , 也是一个链表结构
  const queue = (hook.queue = {
    last: null,
    dispatch: null,
    // useReducer的reducer函数
    lastRenderedReducer: reducer,
    // state
    lastRenderedState: (initialState: any),
  });
  // 设置hook 的queue的dispatch函数，将当前组件的Fiber以及hook.queue作为
  // 参数传递进入
  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchAction.bind(
    null,
    // Flow doesn't know this is non-null, but we do.
    ((currentlyRenderingFiber: any): Fiber),
    queue,
  ): any));
  // 返回useReducer的state以及dispatch函数
  return [hook.memoizedState, dispatch];
}
```
<a name="xulFA"></a>
# updateReducer
```typescript
function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  // 拿到当前useReducer的hook对象
  const hook = updateWorkInProgressHook();
  // 拿到当前hook对象上面的updateQueue
  const queue = hook.queue;
  // 在更新阶段reducer可能改变,这里更新一下hook.queue上的lastRenderedReducer
  queue.lastRenderedReducer = reducer;

  // The last update in the entire queue
  // 最后一个update
  const last = queue.last;
  // The last update that is part of the base state.
  const baseUpdate = hook.baseUpdate;
  const baseState = hook.baseState;

  // Find the first unprocessed update.
  let first;
  if (baseUpdate !== null) {
    if (last !== null) {
      last.next = null;
    }
    first = baseUpdate.next;
  } else {
    first = last !== null ? last.next : null;
  }
  if (first !== null) {
    let newState = baseState;
    // 记录跳过的那个更新的前一个更新
    let newBaseState = null;
    let newBaseUpdate = null;
    let prevUpdate = baseUpdate;
    let update = first;
    let didSkip = false;
    do {
      const updateExpirationTime = update.expirationTime;
      if (updateExpirationTime < renderExpirationTime) {
        // 当前的ExpirationTime小于renderExpirationTime
        // 说明当前更新的优先级比较低,不需要在当前更新
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        if (!didSkip) {
          didSkip = true;
          newBaseUpdate = prevUpdate;
          newBaseState = newState;
        }
        // Update the remaining priority in the queue.
        if (updateExpirationTime > remainingExpirationTime) {
          remainingExpirationTime = updateExpirationTime;
        }
      } else {
        // 执行当前更新
        // 会判断当前的reducer有没有更新 如果没有更新，那么就使用
        // dispatchAction阶段生成的值 ,否则 重新计算
        if (update.eagerReducer === reducer) {
          // If this update was processed eagerly, and its reducer matches the
          // current reducer, we can use the eagerly computed state.
          newState = ((update.eagerState: any): S);
        } else {
          const action = update.action;
          newState = reducer(newState, action);
        }
      }
      prevUpdate = update;
      update = update.next;
    } while (update !== null && update !== first);

    if (!didSkip) {
      newBaseUpdate = prevUpdate;
      newBaseState = newState;
    }

    if (!is(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }
    // 将更新完的值，都更新到当前hook对象上
    hook.memoizedState = newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = newBaseState;

    queue.lastRenderedState = newState;
  }

  const dispatch: Dispatch<A> = (queue.dispatch: any);
  return [hook.memoizedState, dispatch];
}
```
