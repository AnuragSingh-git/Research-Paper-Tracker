import {
  FunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { Card, CardContent } from "../ui/card";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#8b5cf6",
  "#ef4444",
];

export default function FunnelChartCard({ data }) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index],
  }));

  return (
    <Card>
      <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-4">
          Reading Funnel
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <FunnelChart>

            <Tooltip />

            <Funnel
              dataKey="count"
              data={chartData}
              isAnimationActive
            >

              <LabelList
                position="right"
                dataKey="readingStage"
                fill="#111"
              />

            </Funnel>

          </FunnelChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}