import { Context } from "chartjs-plugin-datalabels";

export const isSmallCategory = (context: Context): boolean => {
    const dataset = context.chart.data.datasets[context.datasetIndex];
    const total = dataset.data.reduce((acc: number, val: any) => acc + val, 0);
    const value = dataset.data[context.dataIndex] as number;

    const percentage = (value / total) * 100;

    return percentage < 6;
}