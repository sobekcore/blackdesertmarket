<template>
  <div :key="props.days" data-test="outer" class="relative h-full w-full" :class="props.class">
    <Line :data="chartData" :options="chartOptions" :plugins="chartPlugins" />
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, PropType, Ref, computed, defineProps, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { BlackDesertItemDetailsHistory } from '@blackdesertmarket/interfaces';
import { UseDateFormatReturn, useDateFormat } from '@vueuse/core';
import {
  CategoryScale,
  Chart,
  ChartArea,
  ChartData,
  ChartOptions,
  Color,
  LineElement,
  LinearScale,
  Plugin,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { VueAttributeClass } from '@/types/attributes-vue';
import { UseChartReturn, useChart } from '@/composables/use-chart';
import { UseColorReturn, useColor } from '@/composables/use-color';
import { UseDocumentSizeReturn, useDocumentSize } from '@/composables/use-document-size';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import { UseStringWrapReturn, useStringWrap } from '@/composables/use-string-wrap';
import { UseTailwindConfigReturn, useTailwindConfig } from '@/composables/use-tailwind-config';

type ChartType = 'line';

interface MinMaxComponents {
  min: number;
  max: number;
  delta: number;
}

const props = defineProps({
  data: {
    type: Array as PropType<BlackDesertItemDetailsHistory[]>,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  class: {
    type: [String, Object] as PropType<VueAttributeClass>,
  },
});

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

const tailwindConfig: UseTailwindConfigReturn = useTailwindConfig();
const chart: UseChartReturn = useChart();
const color: UseColorReturn = useColor();
const numberFormat: UseNumberFormatReturn = useNumberFormat();
const stringWrap: UseStringWrapReturn = useStringWrap();
const documentSize: UseDocumentSizeReturn = useDocumentSize();

const width: Ref<number | null> = ref(null);
const height: Ref<number | null> = ref(null);
const gradient: Ref<CanvasGradient | null> = ref(null);

const lowestPriceElement: ComputedRef<BlackDesertItemDetailsHistory> = computed((): BlackDesertItemDetailsHistory => {
  return props.data.reduce((previous, current): BlackDesertItemDetailsHistory => {
    return previous.onePrice < current.onePrice ? previous : current;
  });
});

const unit: Ref<number> = ref(Number('1' + '0'.repeat(String(lowestPriceElement.value.onePrice).length - 3)));

const labels: ComputedRef<string[]> = computed((): string[] => {
  const evenlyDistributedIndexes: number[] = [
    0,
    Math.floor(props.days * 0.33),
    Math.floor(props.days * 0.66),
    props.days - 1,
  ];

  return props.data.slice(0, props.days).map((item, index): string => {
    if (!evenlyDistributedIndexes.includes(index)) {
      return '';
    }

    const dateFormat: UseDateFormatReturn = useDateFormat(item.date, 'M/D');
    return dateFormat.value;
  });
});

const data: ComputedRef<number[]> = computed((): number[] => {
  return props.data.slice(0, props.days).map((item): number => {
    return item.onePrice / unit.value;
  });
});

const min: ComputedRef<number> = computed((): number => {
  const components: MinMaxComponents = getMinMaxComponents();
  return components.min - components.delta;
});

const max: ComputedRef<number> = computed((): number => {
  const components: MinMaxComponents = getMinMaxComponents();
  return components.max + components.delta;
});

const chartData: Ref<ChartData<ChartType>> = ref({
  labels: labels,
  datasets: [
    {
      data: data,
      pointRadius: 0,
      pointHitRadius: 12,
      borderWidth: documentSize.pixelToRaw(tailwindConfig.getValue('borderWidth', 'DEFAULT')),
      borderColor: (ctx: ScriptableContext<ChartType>): Color | undefined => {
        const chartCtx: CanvasRenderingContext2D = ctx.chart.ctx;
        const chartArea: ChartArea = ctx.chart.chartArea;

        if (!chartArea) {
          return;
        }

        const chartWidth: number = chartArea.right - chartArea.left;
        const chartHeight: number = chartArea.bottom - chartArea.top;

        if (!gradient.value || width.value !== chartWidth || height.value !== chartHeight) {
          width.value = chartWidth;
          height.value = chartHeight;

          gradient.value = chartCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

          gradient.value.addColorStop(0, tailwindConfig.getValue('colors', 'chart-0'));
          gradient.value.addColorStop(0.4, tailwindConfig.getValue('colors', 'chart-40'));
          gradient.value.addColorStop(0.5, tailwindConfig.getValue('colors', 'chart-50'));
          gradient.value.addColorStop(0.6, tailwindConfig.getValue('colors', 'chart-60'));
          gradient.value.addColorStop(1, tailwindConfig.getValue('colors', 'chart-100'));
        }

        return gradient.value;
      },
    },
  ],
});

const chartOptions: Ref<ChartOptions<ChartType>> = ref({
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        padding: documentSize.remToRaw(tailwindConfig.getValue('padding', '3')),
        color: tailwindConfig.getValue('colors', 'dark-800'),
      },
    },
    y: {
      grid: {
        drawTicks: false,
        color: tailwindConfig.getValue('colors', 'dark-500'),
      },
      border: {
        display: false,
      },
      ticks: {
        count: 5,
        padding: documentSize.remToRaw(tailwindConfig.getValue('padding', '5')),
        color: tailwindConfig.getValue('colors', 'dark-800'),
        callback: (value: number): string => {
          return formatChartValue(value);
        },
      },
      min: min,
      max: max,
    },
  },
  plugins: {
    tooltip: {
      displayColors: false,
      caretSize: 0,
      caretPadding: documentSize.remToRaw(tailwindConfig.getValue('padding', '2.5')),
      backgroundColor: color.hexToRGB(tailwindConfig.getValue('colors', 'dark-100'), '90%'),
      borderColor: tailwindConfig.getValue('colors', 'dark-600'),
      borderWidth: documentSize.pixelToRaw(tailwindConfig.getValue('borderWidth', 'DEFAULT')),
      callbacks: {
        label: (item: TooltipItem<ChartType>): string => {
          return formatChartValue(Number(item.raw));
        },
        labelTextColor: (): Color => {
          return tailwindConfig.getValue('colors', 'dark-900');
        },
        title: (): string => {
          return '';
        },
      },
    },
    title: {
      display: true,
      text: stringWrap.wrap(`(Units: ${numberFormat.format(unit.value)} Silvers)`, ' ', 8),
      align: 'end',
      padding: documentSize.remToRaw(tailwindConfig.getValue('padding', '1')),
      color: tailwindConfig.getValue('colors', 'dark-800'),
      font: {
        weight: 'normal',
      },
    },
    chartArea: {
      backgroundColor: color.hexToRGB(tailwindConfig.getValue('colors', 'dark-100'), '50%'),
    },
  },
});

const chartPlugins: Ref<Plugin<ChartType>[]> = ref([chart.chartAreaPlugin]);

const getMinMaxComponents = (): MinMaxComponents => {
  const min: number = Math.min(...data.value);
  const max: number = Math.max(...data.value);
  const delta: number = Math.round((max - min) * 0.05) || 2;

  return { min, max, delta };
};

const formatChartValue = (value: number): string => {
  return numberFormat.format(Math.round(value));
};
</script>
