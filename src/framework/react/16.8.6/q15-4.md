在监听了事件后，当事件触发的时候，会执行dispatch方法<br />如果当前事件是Interactive类型的事件,那么调用的是dispatchInteractiveEvent
<a name="ncdRe"></a>
# Interactive类型的事件
<a name="XeCiQ"></a>
## dispatchInteractiveEvent
```typescript
function dispatchInteractiveEvent(topLevelType, nativeEvent) {
  interactiveUpdates(dispatchEvent, topLevelType, nativeEvent);
}
```
<a name="OSFcx"></a>
## interactiveUpdates
```typescript
export function interactiveUpdates(fn, a, b) {
  return _interactiveUpdatesImpl(fn, a, b);
}
```
```typescript
let _interactiveUpdatesImpl = function(fn, a, b) {
  return fn(a, b);
};
```
看到这里，好像跟直接调用dispatchEvent没什么区别。答案其实就在setBatchingImplementation
<a name="QVgf3"></a>
## setBatchingImplementation
```typescript
export function setBatchingImplementation(
  batchedUpdatesImpl,
  interactiveUpdatesImpl,
  flushInteractiveUpdatesImpl,
) {
  _batchedUpdatesImpl = batchedUpdatesImpl;
  _interactiveUpdatesImpl = interactiveUpdatesImpl;
  _flushInteractiveUpdatesImpl = flushInteractiveUpdatesImpl;
}
```
setBatchingImplementation在ReactDOM中引入直接调用了,并且传入了三个参数，也就是修改掉了_interactiveUpdatesImpl的实现
```typescript
setBatchingImplementation(
  batchedUpdates,
  interactiveUpdates,
  flushInteractiveUpdates,
);
```
<a name="hYM0v"></a>
## interactiveUpdates在ReactDOM里的具体实现
这个方法，其实来自react-reconciler包下的ReactFiberScheduler.js中
```typescript
function interactiveUpdates<A, B, R>(fn: (A, B) => R, a: A, b: B): R {
  // If there are any pending interactive updates, synchronously flush them.
  // This needs to happen before we read any handlers, because the effect of
  // the previous event may influence which handlers are called during
  // this event.
  if (
    !isBatchingUpdates &&
    !isRendering &&
    lowestPriorityPendingInteractiveExpirationTime !== NoWork
  ) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPriorityPendingInteractiveExpirationTime, false);
    lowestPriorityPendingInteractiveExpirationTime = NoWork;
  }
  const previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    // 主要就在这里，传入的优先级就是一个用户交互级别的优先级
    return runWithPriority(UserBlockingPriority, () => {
      // 最终调用的fn就是dispatchEvent
      return fn(a, b);
    });
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}
```

<a name="Jrmyl"></a>
# dispatchEvent
```typescript
export function dispatchEvent(
  topLevelType: DOMTopLevelEventType,
  nativeEvent: AnyNativeEvent,
) {
  if (!_enabled) {
    return;
  }
  // 获取原生时间对象的target
  const nativeEventTarget = getEventTarget(nativeEvent);
  // 获取target节点上最近的真实DOM节点挂载的Fiber对象
  let targetInst = getClosestInstanceFromNode(nativeEventTarget);
  if (
    targetInst !== null &&
    typeof targetInst.tag === 'number' &&
    !isFiberMounted(targetInst)
  ) {
    // If we get an event (ex: img onload) before committing that
    // component's mount, ignore it for now (that is, treat it as if it was an
    // event on a non-React tree). We might also consider queueing events and
    // dispatching them after the mount.
    targetInst = null;
  }

  // 生成一个bookKeeping对象
  const bookKeeping = getTopLevelCallbackBookKeeping(
    topLevelType,
    nativeEvent,
    targetInst,
  );

  try {
    // Event queue being processed in the same cycle allows
    // `preventDefault`.
    // 执行batchedUpdates,调用handleTopLevel
    batchedUpdates(handleTopLevel, bookKeeping);
  } finally {
    // 执行完后，重置bookKeeping对象
    releaseTopLevelCallbackBookKeeping(bookKeeping);
  }
}
```
<a name="t5X5H"></a>
## getClosestInstanceFromNode
```typescript
export function getClosestInstanceFromNode(node) {
  // 在创建完DOM节点的时候，挂在了当前的Fiber到当前的DOM上面
  // 所以在这里直接获取好了
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }
  // 如果没有，会向父节点查找
  while (!node[internalInstanceKey]) {
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  let inst = node[internalInstanceKey];
  // 只有是一个真实的DOM节点，才返回，否则返回null
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber, this will always be the deepest root.
    return inst;
  }

  return null;
}
```
<a name="uz0ya"></a>
## getTopLevelCallbackBookKeeping
```typescript
function getTopLevelCallbackBookKeeping(
  topLevelType,
  nativeEvent,
  targetInst,
): {
  topLevelType: ?DOMTopLevelEventType,
  nativeEvent: ?AnyNativeEvent,
  targetInst: Fiber | null,
  ancestors: Array<Fiber>,
} {
  // 就是一个bookKeeping的数据结构
  // 这里有一个对象池的概念 减少频繁的对象创建
  // 带来的内存开销， 以提高性能
  if (callbackBookkeepingPool.length) {
    const instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    return instance;
  }
  return {
    topLevelType,
    nativeEvent,
    targetInst,
    // 存储的组件bookKeeping节点
    ancestors: [],
  };
}
```
<a name="Evgw2"></a>
## releaseTopLevelCallbackBookKeeping
```typescript
function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
    callbackBookkeepingPool.push(instance);
  }
}
```
<a name="gNGJU"></a>
## handleTopLevel
```typescript
function handleTopLevel(bookKeeping) {
  let targetInst = bookKeeping.targetInst;
  let ancestor = targetInst;
  do {
    if (!ancestor) {
      // 栈操作
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    // 找到HostRoot 也就是root dom节点
    const root = findRootContainerNode(ancestor);
    if (!root) {
      break;
    }
    bookKeeping.ancestors.push(ancestor);
    // 查找当前DOM节点最近的组件的Fiber 当然只针对HostComponent
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);

  for (let i = 0; i < bookKeeping.ancestors.length; i++) {
    // 遍历组件，从最顶部开始，依次对当前DOM节点执行 runExtractedEventsInBatch
    targetInst = bookKeeping.ancestors[i];
    runExtractedEventsInBatch(
      bookKeeping.topLevelType,
      targetInst,
      bookKeeping.nativeEvent,
      getEventTarget(bookKeeping.nativeEvent),
    );
  }
}
```
<a name="Eohmt"></a>
# runExtractedEventsInBatch
runExtractedEventsInBatch方法来自于events/EventPluginHub.js文件中
```typescript
export function runExtractedEventsInBatch(
  topLevelType: TopLevelType,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: EventTarget,
) {
  // 生成时间对象
  const events = extractEvents(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  );
  // 在批量中执行events
  runEventsInBatch(events);
}
```
<a name="JLLgZ"></a>
## extractEvents
生成事件对象
```typescript
// 提取event对象
function extractEvents(
  topLevelType: TopLevelType,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: EventTarget,
): Array<ReactSyntheticEvent> | ReactSyntheticEvent | null {
  let events = null;
  for (let i = 0; i < plugins.length; i++) {
    // Not every plugin in the ordering may be loaded at runtime.
    const possiblePlugin: PluginModule<AnyNativeEvent> = plugins[i];
    if (possiblePlugin) {
      // 执行插件上生成event对象的方法
      const extractedEvents = possiblePlugin.extractEvents(
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget,
      );
      if (extractedEvents) {
        // 将注入的插件plugins遍历，然后执行extractEvents
        // 最后将生成的事件对象都汇总到一起，形成一个数组
        events = accumulateInto(events, extractedEvents);
      }
    }
  }
  // 返回生成的事件对象
  return events;
}
```
<a name="aNi2m"></a>
### accumulateInto
```typescript
unction accumulateInto<T>(
  current: ?(Array<T> | T),
  next: T | Array<T>,
): T | Array<T> {
  invariant(
    next != null,
    'accumulateInto(...): Accumulated items must not be null or undefined.',
  );

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}
```
<a name="vYLcb"></a>
## runEventsInBatch
通过事件对象的生成，得知事件的监听器已经存在了event._dispatchListeners上面，接下来就是在批量更新中执行这个绑定的事件函数
```typescript
export function runEventsInBatch(
  events: Array<ReactSyntheticEvent> | ReactSyntheticEvent | null,
) {
  if (events !== null) {
    // 将事件形成一个队列
    eventQueue = accumulateInto(eventQueue, events);
  }
  const processingEventQueue = eventQueue;
  eventQueue = null;

  if (!processingEventQueue) {
    return;
  }
  // 遍历，逐个调用 executeDispatchesAndReleaseTopLevel
  forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
  // This would be a good time to rethrow if any of the event handlers threw.
  rethrowCaughtError();
}
```
<a name="qeKrU"></a>
### executeDispatchesAndReleaseTopLevel
```typescript
const executeDispatchesAndReleaseTopLevel = function(e) {
  return executeDispatchesAndRelease(e);
};
```
<a name="C9xNE"></a>
### executeDispatchesAndRelease
```typescript
const executeDispatchesAndRelease = function(event: ReactSyntheticEvent) {
  if (event) {
    // 执行
    executeDispatchesInOrder(event);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
```
<a name="zKs69"></a>
### executeDispatchesInOrder
```typescript
export function executeDispatchesInOrder(event) {
  // 获取事件对象生成阶段设置的值
  const dispatchListeners = event._dispatchListeners;
  const dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) {
    for (let i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    // 开始调用
    executeDispatch(event, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}
```
<a name="UJkel"></a>
### executeDispatch
```typescript
function executeDispatch(event, listener, inst) {
  const type = event.type || 'unknown-event';
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}
```
invokeGuardedCallbackAndCatchFirstError里面针对错误处理了一些场景，最终还是直接调用 listener
