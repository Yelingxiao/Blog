事件对象的产生，跟事件的类型有关，分别各自定义的,这里简单的阅读一下ChangeEventPlugin的extractEvents
<a name="fsiXh"></a>
# ChangeEventPlugin 的 extractEvents
```typescript
extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget,
  ) {
    const targetNode = targetInst ? getNodeFromInstance(targetInst) : window;

    let getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForChangeEvent;
    } else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }
    // 根据特定的节点类型，生成一个获取当前事件对象目标Fiber实例的方法
    if (getTargetInstFunc) {
      const inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        // 支持创建事件对象的真正方法
        const event = createAndAccumulateChangeEvent(
          inst,
          nativeEvent,
          nativeEventTarget,
        );
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }

    // When blurring, set the value attribute for number inputs
    if (topLevelType === TOP_BLUR) {
      handleControlledInputBlur(targetNode);
    }
  },
};
```
<a name="JAjSG"></a>
# createAndAccumulateChangeEvent
```typescript
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  // 从合成事件对象池获取event对象
  // 这里对象池也是为了避免频繁的对象创建，造成不必要的内存开销
  const event = SyntheticEvent.getPooled(
    eventTypes.change,
    inst,
    nativeEvent,
    target,
  );
  event.type = 'change';
  // Flag this event loop as needing state restore.
  // 这个方法暂时没发现具体的作用
  enqueueStateRestore(target);
  // 处理两个阶段  ‘捕获’ ‘冒泡阶段’ 
  // 以及事件真正要调用的函数会被挂在到event对象上
  accumulateTwoPhaseDispatches(event);
  return event;
}
```
<a name="sAPJL"></a>
## accumulateTwoPhaseDispatches
```typescript
export function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
```
```typescript
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}
```
<a name="tWxza"></a>
## traverseTwoPhase
```typescript
export function traverseTwoPhase(inst, fn, arg) {
  const path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  let i;
  // 从父到子执行事件的捕获操作
  for (i = path.length; i-- > 0; ) {
    fn(path[i], 'captured', arg);
  }
  // 从子到付执行事件的冒泡操作
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}
```
<a name="aWIqM"></a>
## accumulateDirectionalDispatches
```typescript
function accumulateDirectionalDispatches(inst, phase, event) {
  // 获取事件绑定的函数
  const listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    // 将当前listener存到Fiber节点的 _dispatchListeners 对象上
    event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      listener,
    );
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}
```
<a name="uf7ek"></a>
# 获取事件绑定的listener过程
```typescript
function listenerAtPhase(inst, event, propagationPhase: PropagationPhases) {
  const registrationName =
    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}
```
```typescript
export function getListener(inst: Fiber, registrationName: string) {
  let listener;
  const stateNode = inst.stateNode;
  if (!stateNode) {
    return null;
  }
  // 从DOM节点获取props
  // 因为props被设置到了dom节点的熟悉上面了
  const props = getFiberCurrentPropsFromNode(stateNode);
  if (!props) {
    return null;
  }
  // 直接获取listener 也就是事件绑定的那个函数
  listener = props[registrationName];
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
    return null;
  }
  return listener;
}
```
