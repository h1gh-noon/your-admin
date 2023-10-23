<template>
  <main>
    <BButton variant="primary" @click="visible = !visible">Click me</BButton>
    <BCollapse v-model="visible">
      ssssss
    </BCollapse>
    <BButton variant="primary" @click="show = !show">Click me</BButton>
    <BModal v-model="show">Test</BModal>
    <BButton variant="link" @click="consoleLog">console.log</BButton>
    <BButton variant="primary" @click="sendRequest">send request</BButton>

    <!-- 准备两个id的dom -->
    <div id="echarts-1" v-if="echartsId === 'echarts-1'"></div>
    <div id="echarts-2" v-else></div>
  </main>
</template>
<script setup name="home-view">
import { ref, onMounted } from "vue";
import { testApi } from "@/api/baseApi";
// 按需引入
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

// demo片段(正常这么玩的很少...)
// 通过路由表props配置echartsId 因为echarts有缓存每个id只能初始化一次
// 为了实现可复用,可缓存的页面demo 所以要准备两个id的dom
const props = defineProps({
  echartsId: {
    type: String,
    default: 'echarts-1'
  }
})

const show = ref(false)
const visible = ref(false)
const sendRequest = () => {
  testApi('testUrl')
}
const consoleLog = () => {
  console.log('consoleLog')
}
onMounted(() => {
  const myChart = echarts.init(document.getElementById(props.echartsId))
  const option = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25]
      },
      {
        type: 'bar',
        data: [26, 24, 18, 22, 23, 20, 27]
      }
    ]
  }
  myChart.setOption(option)

})
</script>

<style lang="scss" scoped>
#echarts-1,
#echarts-2 {
  width: 600px;
  height: 450px;
}
</style>
