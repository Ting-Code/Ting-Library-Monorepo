<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <Markdown>
      <pre>
## Button二次封装案例
利用```宏编译+TS```继承和增强类型提示。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <Markdown>
      <pre>
对业务耦合，将重复的业务内置并向外最小差异化。比如搜索、确定等频繁出现的按钮统一处理。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <Markdown>
      <pre>
最终效果: 有良好的（属性：属性值）提示，并且兼容原有Element组件基础上拓展了功能减少属性冗余。
      </pre>
    </Markdown>
    <CodeBlock :is="ButtonDemo" type="html" />
    <Markdown>
      <pre>
## Input二次封装案例
利用```format```以及```valueFormat```来预处理输入值，其中```format```用来处理非焦点情况下显示值，```valueFormat```预处理绑定值。都可以使用一系列预设函数或者自定义函数来处理。
      </pre>
    </Markdown>
    <CodeBlock :is="InputDemo" type="html" />
    <Markdown>
      <pre>
## Select二次封装案例
利用```format```以及```valueFormat```来预处理输入值，其中```format```用来处理绑定到组件值的转换，```valueFormat```预处理绑定值。都可以使用一系列预设函数或者自定义函数来处理。
      </pre>
    </Markdown>
    <CodeBlock :is="SelectDemo" type="html" />
    <Markdown>
      <pre>
## Radio二次封装案例
利用```format```以及```valueFormat```来预处理输入值，其中```format```用来处理绑定到组件值的转换，```valueFormat```预处理绑定值。都可以使用一系列预设函数或者自定义函数来处理。
      </pre>
    </Markdown>
    <CodeBlock :is="RadioDemo" type="html" />
    <Markdown>
      <pre>
## CheckBox二次封装案例
利用```format```以及```valueFormat```来预处理输入值，其中```format```用来处理绑定到组件值的转换，```valueFormat```预处理绑定值。都可以使用一系列预设函数或者自定义函数来处理。
      </pre>
    </Markdown>
    <CodeBlock :is="CheckBox" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import ButtonDemo from './demo/button.demo.vue'
  import InputDemo from './demo/input.demo.vue'
  import RadioDemo from './demo/radio.demo.vue'
  import SelectDemo from './demo/select.demo.vue'
  import CheckBox from './demo/checkbox.demo.vue'
</script>
