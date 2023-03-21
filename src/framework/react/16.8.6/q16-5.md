在useState以及useReducer的时候会调用，主要用这个来产生更新
```typescript
// 这里的queue在调用dispatchAction的时候已经bind了hook.queue
// 而hook.queue
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // 如果产生更新的Fiber等于当前组件的Fiber，或者说是产生更新的Fiber等于当前组件的work-in-progress
    // 说明是在函数体内直接产生的更新
    didScheduleRenderPhaseUpdate = true;
    const update: Update<S, A> = {
      expirationTime: renderExpirationTime,
      action,
      eagerReducer: null,
      eagerState: null,
      next: null,
    };
    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }
    const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
    if (firstRenderPhaseUpdate === undefined) {
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      let lastRenderPhaseUpdate = firstRenderPhaseUpdate;
      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }
      lastRenderPhaseUpdate.next = update;
    }
  } else {
    flushPassiveEffects();

    const currentTime = requestCurrentTime();
    const expirationTime = computeExpirationForFiber(currentTime, fiber);
    // 创建一个update
    const update: Update<S, A> = {
      expirationTime,
      action,
      eagerReducer: null,
      eagerState: null,
      next: null,
    };

    const last = queue.last;
    if (last === null) {
      // 如果当前没有产生过update，那么说明当前是第一个update,
      // 形成一个环形链表
      update.next = update;
    } else {
      // 将当前的update添加到updateQueue的最后一个上面
      const first = last.next;
      if (first !== null) {
        update.next = first;
      }
      last.next = update;
    }
    // 当前的update肯定是添加到updateQueue的最后一个
    queue.last = update;

    if (
      fiber.expirationTime === NoWork &&
      (alternate === null || alternate.expirationTime === NoWork)
    ) {
      // 拿到lastRenderedReducer,也就是useReducer的第一个参数reducer函数
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState: S = (queue.lastRenderedState: any);
          // 计算当前要更新的最新值
          const eagerState = lastRenderedReducer(currentState, action);
          // 放到update上面
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) {
            return;
          }
        } catch (error) {
        } finally {
        }
      }
    }
    // 执行当前function component的调度
    scheduleWork(fiber, expirationTime);
  }
}
```
