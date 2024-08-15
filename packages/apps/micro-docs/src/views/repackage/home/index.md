# 二次封装技巧

对 UI 库的二次封装是最常见的封装，主要目的在于让组件更适用于业务，减少冗余代码和拓展功能。

## 二次封装的必要性

简单的`Button`组件有二次封装的必要性吗？

那我们简单分析刨除功能性二次封装，一个简单的包裹性封装优缺点。

- 缺点
  - 让项目复杂度增加，维护难度增加。
  - 文档不健全情况下，效率不增幅反降。
  - 迭代流程增加。
- 优点
  - 多处调用，统一更改方便。
  - 组件组迁移只需要修改一个组件。
  - 耦合业务减少重复代码，同时统一调用增加规范性和健壮度。

总结

- 二次封装不仅仅是技术层面的封装，想要好用更需要文档健全，二次封装后类型提示完整。
- 如果项目时间紧迫，可渐进式二次封装。先保证交付后，分析重复多处的代码，进行二次封装。
- 如果时间充足，尽量`Button`组件也要二次封装，有利于统一修改。并完善好文档和类型提示。

## 属性继承

- vue2 中通过`$listeners 与 $attrs`属性继承与透传属性

```html
<Demo v-bind="$attrs" v-on="$listeners" />
```

- vue3 中通过`$attrs`属性继承与透传属性

```html
<Demo v-bind="$attrs" />
```

但是如果只通过`$attrs`来透传`props`属性，会发现编辑器没有类型提示，这样就会导致二次封装的组件非常难用。

通过`vue3.3+ defineProps + TS`来传递属性,并且提供静态类型提示。

```typescript
// 获取子组件props类型
type IElButtonProps = InstanceType<typeof ElButton>['$props']
// 继承子组件props类型
interface IProps extends IElButtonProps {
    ...
}
// 继承子组件props类型
const props = defineProps<IProps>()
```

原计划直接`IProps extends IElButtonProps`来继承子组件属性。发现`defineProps 无法解析 InstanceType<typeof ElButton>`, 原来`defineProps`是通过宏编译来解析 TS，并不是原生的 TS，所以有一些无法支持。

需要这样写类型继承，`/** @vue-ignore */`这样可以通过宏编译。

PS: 这种方式是需要经过通过宏编译的，也就是需要`build`独立打包组件库才能被消费者识别类型，不是静态的 TS 类型。

```typescript
type IElButton = InstanceType<typeof ElButton>
export type IElButtonAttrs = IElButton['$props']
export type IElButtonSlots = IElButton['$slots']
export type IElButtonEmits = IElButton['$emit']

export interface ITButtonProps extends /** @vue-ignore */ Omit<IElButtonAttrs, 'type'> {
  type: ITButtonType
}

export interface ITButtonEmits extends /** @vue-ignore */ IElButtonEmits {}

export interface ITButtonSlots extends /** @vue-ignore */ IElButtonSlots {
  default(): any
  loading(): any
  icon(): any
}
```

最大的惊喜是`Omit<IElButtonAttrs, 'type'>，IElButtonEmits ` 中定义的所有属性和事件包含在`$attrs`中，而添加的属性不包含其中。这样就即可以保证类型提示，也可以透传`$attrs`。

## 独立打包

关于有没有必要独立打包，主要还是看具体业务和项目。

- 不需要独立打包
  - 二次封装组件只给单个项目使用。
  - 项目时间紧迫，没有独立打包经验，容错率低。
- 需要独立打包
  - 多个项目使用
  - 有足够时间尽量独立打包
  - 更好的类型提示（因为 vue3.3 很多类型是宏编译后生成.d.ts 才有类型提示）

### 打包工具选型

打包工具可选的有`rollup`和`viet库模式`。

- rollup
  - 通用性强，使用性广。
- vite
  - 支持 vue3 生态插件更多，配置简单。

最后我选择了`viet`，单纯为了方便，而且插件更熟悉。具体可看我的二次封装独立库`vite.config.ts`。
