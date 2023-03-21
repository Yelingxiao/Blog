<a name="qBJkU"></a>
# useEffect
```typescript
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  return mountEffectImpl(
    UpdateEffect | PassiveEffect,
    UnmountPassive | MountPassive,
    create,
    deps,
  );
}
```
<a name="Hhsv5"></a>
# useLayoutEffect
```typescript
function mountLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  return mountEffectImpl(
    UpdateEffect,
    UnmountMutation | MountLayout,
    create,
    deps,
  );
}
```
useEffect和useLayoutEffect在挂载阶段，都是调用的mountEffectImpl，两者使用上传递下去的effect tag不相同

useEffect:   <br />第一个参数：UpdateEffect | PassiveEffect <br />第二个参数：UnmountPassive | MountPassive<br />useLayoutEffect：<br />第一个参数：UpdateEffect<br />第二个参数：UnmountMutation | MountLayout
<a name="Vc72w"></a>
# 挂载阶段（mountEffectImpl）
```typescript
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps): void {
  // 创建hook
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 将当前hook的effectTag 添加到当前函数组件对应的Fiber对象上
  sideEffectTag |= fiberEffectTag;
  // 调用pushEffect，将当前的effect对象赋值到hook的memoizedState上
  hook.memoizedState = pushEffect(hookEffectTag, create, undefined, nextDeps);
}
```
<a name="iVidb"></a>
# 更新阶段（updateEffectImpl）
```typescript
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps): void {
  // 取出当前hook对应的对象
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy = undefined;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 如果前后deps没有变化,向当前Fiber的updateQueue上推入一个
        // tag为NoHookEffect的effect
        pushEffect(NoHookEffect, create, destroy, nextDeps);
        return;
      }
    }
  }
  // 将当前fiberEffectTag添加到Fiber对应的对象上
  sideEffectTag |= fiberEffectTag;
  // 调用pushEffect，将当前的effect对象赋值到hook的memoizedState上
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, nextDeps);
}
```
<a name="RXzfr"></a>
# pushEffect
```typescript
function pushEffect(tag, create, destroy, deps) {
  const effect: Effect = {
    tag,
    create,
    destroy,
    deps,
    // Circular
    next: (null: any),
  };
  // 构建一个effect的循环链表
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  // 并将当前的return出去，处理no effect的
  // 其他的effect都添加到hook.memoizedState上
  return effect;
}
```
<a name="MthX6"></a>
# commit阶段
在第一个循环的时候，class组件调用getSnapshotBeforeUpdate,对于函数组件，调用了commitHookEffectList；<br />但是此时传入的参数分别是UnmountSnapshot NoHookEffect；上文中分析过，useEffect和useLayoutEffect并没有这两个tag；所以这个阶段，这两个hook其实是不会被调用的；我个人猜测，react这里是为了后续实现函数组件类似class组件getSnapshotBeforeUpdate预留的tag设计；
```typescript
  // 传入的tag UnmountSnapshot NoHookEffect
  // useEffect 和 useLayoutEffect 没有使用这两个tag
  // 所以在这个阶段， useEffect 和 useLayoutEffect 都不会被调用
  commitHookEffectList(UnmountSnapshot, NoHookEffect, finishedWork);
```
在commit阶段进行第二个循环的时候，此时会调用commitAllHostEffects，并且执行DOM节点的更新，调用commitWork；将节点的变更更新到dom上；对于函数组件，调用commitHookEffectList，传入了tag分别是：UnmountMutation, MountMutation；也就是useLayoutEffect卸载函数会执行
```typescript
commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
```
在commit阶段进行第三个循环的时候，此时DON节点已经都渲染到了页面，对于class组件，react需要执行相关的生命周期函数，如 componentDidMount等;对于函数式组件，useLayoutEffect第一个参数create函数会执行
```typescript
// useLayoutEffect具有 MountLayout的tag
// 所以在这里 useLayoutEffect会被调用, 此时，DOM节点已经被真正的渲染到页面上
commitHookEffectList(UnmountLayout, MountLayout, finishedWork);
```
上面的分析得出结论，useLayoutEffect调用的时候，其实dom节点已经渲染了，但是是在当前渲染贞里面需要被执行完，但是如果useLayoutEffect在当前贞做的时候比较耗时，可能会造成页面的卡顿掉帧

当commitRoot都执行完后，紧接着，会调用commitPassiveEffects;这里调用了两次，传入的tag是useEffect实现所具有的；也就是说会先调用useEffect的销毁，在调用创建;
```typescript
export function commitPassiveHookEffects(finishedWork: Fiber): void {
  commitHookEffectList(UnmountPassive, NoHookEffect, finishedWork);
  commitHookEffectList(NoHookEffect, MountPassive, finishedWork);
}
```
但是这里并不是直接调用，而是放到了schdule里面去调度
```typescript
    let callback = commitPassiveEffects.bind(null, root, firstEffect);
    if (enableSchedulerTracing) {
      // TODO: Avoid this extra callback by mutating the tracing ref directly,
      // like we do at the beginning of commitRoot. I've opted not to do that
      // here because that code is still in flux.
      callback = Scheduler_tracing_wrap(callback);
    }
    passiveEffectCallbackHandle = runWithPriority(NormalPriority, () => {
      // 放在schdule里面去调度
      return schedulePassiveEffects(callback);
    });
    passiveEffectCallback = callback;
```
这样做的目的其实就是说明，在useEffect的调用过程中，对于耗时的任务，会被放到下一帧渲染；不会引起掉帧卡顿

<a name="DM0KP"></a>
# commitHookEffectList
```typescript
function commitHookEffectList(
  unmountTag: number,
  mountTag: number,
  finishedWork: Fiber,
) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  let lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & unmountTag) !== NoHookEffect) {
        // Unmount
        const destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) {
          destroy();
        }
      }
      if ((effect.tag & mountTag) !== NoHookEffect) {
        // Mount
        const create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```
