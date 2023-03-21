commitAllLifeCycles做的事情就相对简单了,执行响应组件的didMount生命周期,以及host component 如input的focus
```typescript
// 执行相应的生命周期
function commitAllLifeCycles(
  finishedRoot: FiberRoot,
  committedExpirationTime: ExpirationTime,
) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;
    // 具有回调以及更新的tag会调用commitLifeCycles
    if (effectTag & (Update | Callback)) {
      recordEffect();
      const current = nextEffect.alternate;
      commitLifeCycles(
        finishedRoot,
        current,
        nextEffect,
        committedExpirationTime,
      );
    }

    if (effectTag & Ref) {
      recordEffect();
      commitAttachRef(nextEffect);
    }

    if (effectTag & Passive) {
      rootWithPendingPassiveEffects = finishedRoot;
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```
<a name="Xyedx"></a>
# commitLifeCycles
```typescript
    case ClassComponent: {
      const instance = finishedWork.stateNode;
      if (finishedWork.effectTag & Update) {
        // 如果current是null，说明是第一次挂在 执行componentDidMount
        if (current === null) {
          startPhaseTimer(finishedWork, 'componentDidMount');
          instance.componentDidMount();
          stopPhaseTimer();
        } else {
          // 否则执行 componentDidUpdate
          const prevProps =
            finishedWork.elementType === finishedWork.type
              ? current.memoizedProps
              : resolveDefaultProps(finishedWork.type, current.memoizedProps);
          const prevState = current.memoizedState;
          startPhaseTimer(finishedWork, 'componentDidUpdate');
          instance.componentDidUpdate(
            prevProps,
            prevState,
            instance.__reactInternalSnapshotBeforeUpdate,
          );
          stopPhaseTimer();
        }
      }
      const updateQueue = finishedWork.updateQueue;
      // 如果updateQueue不等于null，说明在生命周期中产生了更新
      // 需要执行updateQueue
      if (updateQueue !== null) {
        commitUpdateQueue(
          finishedWork,
          updateQueue,
          instance,
          committedExpirationTime,
        );
      }
      return;
    }
    case HostRoot: {
      const updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        let instance = null;
        if (finishedWork.child !== null) {
          switch (finishedWork.child.tag) {
            case HostComponent:
              instance = getPublicInstance(finishedWork.child.stateNode);
              break;
            case ClassComponent:
              instance = finishedWork.child.stateNode;
              break;
          }
        }
        commitUpdateQueue(
          finishedWork,
          updateQueue,
          instance,
          committedExpirationTime,
        );
      }
      return;
    }
    case HostComponent: {
      const instance: Instance = finishedWork.stateNode;

      // Renderers may schedule work to be done after host components are mounted
      // (eg DOM renderer may schedule auto-focus for inputs and form controls).
      // These effects should only be committed when components are first mounted,
      // aka when there is no current/alternate.
      if (current === null && finishedWork.effectTag & Update) {
        const type = finishedWork.type;
        const props = finishedWork.memoizedProps;
        // 执行host component的一些动作
        // 比如input的focus
        commitMount(instance, type, props, finishedWork);
      }

      return;
    }
```
<a name="hBvKi"></a>
## commitUpdateQueue
```typescript
export function commitUpdateQueue<State>(
  finishedWork: Fiber,
  finishedQueue: UpdateQueue<State>,
  instance: any,
  renderExpirationTime: ExpirationTime,
): void {
  // If the finished render included captured updates, and there are still
  // lower priority updates left over, we need to keep the captured updates
  // in the queue so that they are rebased and not dropped once we process the
  // queue again at the lower priority.
  if (finishedQueue.firstCapturedUpdate !== null) {
    // Join the captured update list to the end of the normal list.
    if (finishedQueue.lastUpdate !== null) {
      finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate;
      finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate;
    }
    // Clear the list of captured updates.
    finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null;
  }

  // Commit the effects
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;

  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}
```
<a name="xTCST"></a>
## commitUpdateEffects
```typescript
function commitUpdateEffects<State>(
  effect: Update<State> | null,
  instance: any,
): void {
  while (effect !== null) {
    const callback = effect.callback;
    if (callback !== null) {
      effect.callback = null;
      callCallback(callback, instance);
    }
    effect = effect.nextEffect;
  }
}
```
