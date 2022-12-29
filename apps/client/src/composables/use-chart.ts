import { ChartArea, Plugin } from 'chart.js';

export interface UseChartReturn {
  chartAreaPlugin: Plugin;
}

/**
 * TODO: Move Chart.js plugins outside of this composable
 */
export function useChart(): UseChartReturn {
  const chartAreaPlugin: Plugin = {
    id: 'chartArea',
    beforeDraw: (chart, args, options): void => {
      if (typeof options.backgroundColor !== 'string') {
        return;
      }

      const ctx: CanvasRenderingContext2D = chart.ctx;
      const chartArea: ChartArea = chart.chartArea;

      ctx.save();
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    },
  };

  return {
    chartAreaPlugin,
  };
}
