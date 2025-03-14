<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  const chartData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: '2018',
        data: [100, 200, 300, 400, 500]
      },
      {
        label: '2019',
        data: [100, 200, 300, 400, 500]
      }
    ]
  }
  const chartOptions = {
    responsive: true
  }
</script>
