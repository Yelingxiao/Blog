<a name="OCPS2"></a>
# setInitialDOMProperties
在初始化DOM节点的props阶段，会判断当前的prop key，是否是事件
```typescript
if (registrationNameModules.hasOwnProperty(propKey)) {
  // registrationNameModules 就是在注入平台事件后，生产的对象
  // propKey 就是 registrationName 比如 onChange 、onClick 等
  if (nextProp != null) {
    // rootContainerElement 就是ReactDOM.render的第二个参数 也就是我们
    // 传入的id为root的DOM节点
    ensureListeningTo(rootContainerElement, propKey);
  }
}
```
<a name="EhEjo"></a>
# ensureListeningTo
```typescript
function ensureListeningTo(rootContainerElement, registrationName) {
  const isDocumentOrFragment =
    rootContainerElement.nodeType === DOCUMENT_NODE ||
    rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
  // 获取当前的document
  const doc = isDocumentOrFragment
    ? rootContainerElement
    : rootContainerElement.ownerDocument;
  // 传入React事件名称以及 document
  // 这里的 registrationName 就是onChange等
  listenTo(registrationName, doc);
}

```
<a name="EyHd0"></a>
# listenTo
```typescript
export function listenTo(
  registrationName: string,
  mountAt: Document | Element,
) {
  // 拿到的是一个对象
  const isListening = getListeningForDocument(mountAt);
  // 获取当前事件的dependencies
  const dependencies = registrationNameDependencies[registrationName];
  debugger
  for (let i = 0; i < dependencies.length; i++) {
    // dependency 就是click blur change 等等
    const dependency = dependencies[i];
    if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
      // 只有当isListening 没有，才会进入到这里
      // 也就是说 监听过 就不会重复监听了
      switch (dependency) {
        case TOP_SCROLL:
          trapCapturedEvent(TOP_SCROLL, mountAt);
          break;
        case TOP_FOCUS:
        case TOP_BLUR:
          trapCapturedEvent(TOP_FOCUS, mountAt);
          trapCapturedEvent(TOP_BLUR, mountAt);
          // We set the flag for a single dependency later in this function,
          // but this ensures we mark both as attached rather than just one.
          isListening[TOP_BLUR] = true;
          isListening[TOP_FOCUS] = true;
          break;
        case TOP_CANCEL:
        case TOP_CLOSE:
          if (isEventSupported(getRawEventName(dependency))) {
            trapCapturedEvent(dependency, mountAt);
          }
          break;
        case TOP_INVALID:
        case TOP_SUBMIT:
        case TOP_RESET:
          // We listen to them on the target DOM elements.
          // Some of them bubble so we don't want them to fire twice.
          break;
        default:
          // By default, listen on the top level to all non-media events.
          // Media events don't bubble so adding the listener wouldn't do anything.
          // 媒体相关的事件监听过了
          // 所以在这里除了不是媒体相关的事件，都需要监听
          const isMediaEvent = mediaEventTypes.indexOf(dependency) !== -1;
          if (!isMediaEvent) {
            // 冒泡阶段的监听
            trapBubbledEvent(dependency, mountAt);
          }
          break;
      }
      isListening[dependency] = true;
    }
  }
}
```
<a name="gbzwC"></a>
# trapBubbledEvent
```typescript
export function trapBubbledEvent(
  topLevelType: DOMTopLevelEventType,
  element: Document | Element,
) {
  if (!element) {
    return null;
  }
  // 判断当前事件是否是interactive类型，也就是需要跟用户交互的
  // 对于这类事件产生的任务，在计算任务的优先级的expirationTime会比较大（优先级较高）
  const dispatch = isInteractiveTopLevelEventType(topLevelType)
    ? dispatchInteractiveEvent
    : dispatchEvent;

  addEventBubbleListener(
    element,
    getRawEventName(topLevelType),
    // Check if interactive and wrap in interactiveUpdates
    dispatch.bind(null, topLevelType),
  );
}
```
<a name="VfG3G"></a>
## isInteractiveTopLevelEventType
```typescript
isInteractiveTopLevelEventType(topLevelType: TopLevelType): boolean {
    const config = topLevelEventsToDispatchConfig[topLevelType];
    return config !== undefined && config.isInteractive === true;
  },
```
<a name="PXkWm"></a>
## topLevelEventsToDispatchConfig
topLevelEventsToDispatchConfig的生成
```typescript
function addEventTypeNameToConfig(
  [topEvent, event]: EventTuple,
  isInteractive: boolean,
) {
  const capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  const onEvent = 'on' + capitalizedEvent;

  const type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture',
    },
    dependencies: [topEvent],
    isInteractive,
  };
  eventTypes[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
}
// 高优先级用户交互的事件
interactiveEventTypeNames.forEach(eventTuple => {
  addEventTypeNameToConfig(eventTuple, true);
});
// 低优先级用户不需要交互的事件
nonInteractiveEventTypeNames.forEach(eventTuple => {
  addEventTypeNameToConfig(eventTuple, false);
});
```
<a name="QgMys"></a>
# addEventBubbleListener
这就是最终事件监听的方法
```typescript
export function addEventBubbleListener(
  element: Document | Element,
  eventType: string,
  listener: Function,
): void {
  element.addEventListener(eventType, listener, false);
}
```
