import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "../ui/card";

const COLORS = {
  "High Impact": "#22c55e",
  "Medium Impact": "#facc15",
  "Low Impact": "#ef4444",
  Unknown: "#64748b",
};

export default function ScatterChartCard({ data }) {
  const grouped = {};

  data.forEach((paper) => {

    if (!grouped[paper.impactScore]) {

      grouped[paper.impactScore] = [];

    }

    grouped[paper.impactScore].push({
      x: paper.citationCount,
      y: 1,
    });

  });

  return (
    <Card>
      <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-4">
          Citation vs Impact
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <ScatterChart>

            <CartesianGrid />

            <XAxis
              dataKey="x"
              name="Citation Count"
            />

            <YAxis
              dataKey="y"
              hide
            />

            <Tooltip />

            <Legend />

            {Object.keys(grouped).map((impact) => (

              <Scatter
                key={impact}
                name={impact}
                data={grouped[impact]}
                fill={COLORS[impact]}
              />

            ))}

          </ScatterChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}