import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "../ui/card";

const COLORS = {
  "Abstract Read": "#3b82f6",
  "Introduction Done": "#22c55e",
  "Methodology Done": "#eab308",
  "Results Analyzed": "#f97316",
  "Fully Read": "#8b5cf6",
  "Notes Completed": "#ef4444",
};

export default function DomainStageChart({ data }) {

  const stages = [
    "Abstract Read",
    "Introduction Done",
    "Methodology Done",
    "Results Analyzed",
    "Fully Read",
    "Notes Completed",
  ];

  return (
    <Card>

      <CardContent className="p-6">

        <h2 className="text-xl font-semibold mb-6">
          Papers by Domain & Reading Stage
        </h2>

        <ResponsiveContainer width="100%" height={450}>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="_id" />

            <YAxis />

            <Tooltip />

            <Legend />

            {stages.map((stage) => (

              <Bar
                key={stage}
                dataKey={stage}
                stackId="papers"
                fill={COLORS[stage]}
              />

            ))}

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}