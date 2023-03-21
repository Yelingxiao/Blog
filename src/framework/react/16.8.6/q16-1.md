<a name="kskEc"></a>
# Hook类型
```typescript
export type Hook = {
  memoizedState: any,

  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,

  next: Hook | null,
};
```
<a name="zmc4G"></a>
# mountWorkInProgressHook
在hooks第一次创建的时候调用，生成一个hook对象，并构建一个链表结构
```typescript
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    queue: null,
    baseUpdate: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // firstWorkInProgressHook 指向链表的第一个
    // workInProgressHook 指向链表的最后一个
    // 一开始，构建链表
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    // 将当前的hook添加到链表的最后一个
    workInProgressHook = workInProgressHook.next = hook;
  }
  // 返回
  return workInProgressHook;
}
```
<a name="TWFjK"></a>
# updateWorkInProgressHook
```typescript
function updateWorkInProgressHook(): Hook {
  if (nextWorkInProgressHook !== null) {
    // 还没有更新完，都更新全局变量，都指向下一个即将更新的hook
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
    nextCurrentHook = currentHook !== null ? currentHook.next : null;
  } else {
    // 当组件更新的时候,nextWorkInProgressHook一开始是没有值得
    // 会走到这
    // 如果存在hook存在于条件语句中，此时多出来了Hook需要执行,会走到这
    invariant(
      nextCurrentHook !== null,
      'Rendered more hooks than during the previous render.',
    );
    currentHook = nextCurrentHook;
    // 创建一个新的hook对象
    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,

      next: null,
    };
    // 构建链表的过程
    if (workInProgressHook === null) {
      // This is the first hook in the list.
      workInProgressHook = firstWorkInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
```
