<template>
  <a-spin :spinning="spinning">
    <v-chart class="chart" :option="option" />
  </a-spin>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark" // 主题：light，dark
  },
  data() {
    return {
      spinning: true,
      option: {
        title: { // 表格名称
          text: 'Echart学习'
        },
        backgroundColor: '#2c343c', // 背景颜色
        tooltip: {}, // 提示框
        legend: { // 表格上的内容选项
          data: ['销量', '排名']
        },
        grid: { // 表格本体样式
          left:'20%',
          bottom: '10%',
          right:'20%'
        },
        yAxis: {
          type: 'value', // 坐标轴类型 （value（数值）、category（离散类目）、time（时间）、log（对数））
          name: `(单位：元)` // 名称
        }, // y轴
          xAxis: { // x轴
            type: 'category',
            data: ['衬衫','毛衣','裤子','裙子','袜子','靴子','鞋子']
          },
        series: [ // 每个内容的数据、名称、类型、自定义样式
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            label: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              formatter : '这是一个正常的文字' // 格式化，可以写回调函数
            },
            emphasis: { // 高亮
              label: {
                show: true,
                formatter : '这是一个高亮的文字' // 格式化，可以写回调函数
              },
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            itemStyle: {
              normal: {
                color: 'rgba(255, 255, 255, 0.3)', // 改变折射点颜色
                lineStyle: 'rgba(255, 255, 255, 0.3)' // 改变折线颜色
              },
              emphasis: {
                color: 'rgba(0, 0, 0, 0.3)'
              }
            }
          },
          {
            name: '排名',
            type: 'line',
            data: [1, 2, 3, 4, 5, 6]
          }
        ]
      },
      
    };
  },
  mounted() {
    setTimeout(() => {
      this.spinning = false
    }, 1000);
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>