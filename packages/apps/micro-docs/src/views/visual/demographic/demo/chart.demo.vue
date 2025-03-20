<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟 1990 年至今的数据，实际使用时需要替换为真实数据
  const years: string[] = []
  const birthPopulation: number[] = []
  const collegeGraduates: number[] = []
  const undergraduateGraduates: number[] = [] // 初始化本科毕业人数数组

  for (let year = 1990; year <= new Date().getFullYear(); year++) {
    years.push(year.toString())
    // 模拟出生人口数据
    const birthValue = Math.floor(Math.random() * 2000) + 1000
    birthPopulation.push(birthValue)

    // 模拟大学毕业人数数据
    const collegeValue = Math.floor(Math.random() * 1000) + 500
    collegeGraduates.push(collegeValue)

    // 模拟本科毕业人数数据
    const undergraduateValue = Math.floor(Math.random() * 500) + 200
    undergraduateGraduates.push(undergraduateValue)
  }

  const chartData = {
    xAxis: {
      type: 'category',
      data: years
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '出生人口',
        type: 'line', // 修改为折线图
        data: birthPopulation
      },
      {
        name: '大学毕业人数',
        type: 'line', // 修改为折线图
        data: collegeGraduates
      },
      {
        name: '本科毕业人数',
        type: 'line', // 修改为折线图
        data: undergraduateGraduates
      }
    ]
  }

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['出生人口', '大学毕业人数', '本科毕业人数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: chartData.xAxis,
    yAxis: chartData.yAxis,
    series: chartData.series
  }
</script>
