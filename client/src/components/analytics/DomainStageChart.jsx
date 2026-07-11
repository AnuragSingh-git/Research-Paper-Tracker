import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Card, CardContent } from "../ui/card";

export default function DomainStageChart({ data }) {

  const colors = {
    "Abstract Read": "#3b82f6",
    "Introduction Done": "#22c55e",
    "Methodology Done": "#f59e0b",
    "Results Analyzed": "#ef4444",
    "Fully Read": "#8b5cf6",
    "Notes Completed": "#06b6d4",
  };

  const stages = [
    "Abstract Read",
    "Introduction Done",
    "Methodology Done",
    "Results Analyzed",
    "Fully Read",
    "Notes Completed",
  ];

  return (

    <Card className="shadow-lg rounded-2xl">

      <CardContent className="p-6">

        <h2 className="text-2xl font-bold mb-6">

          Papers by Domain & Reading Stage

        </h2>

        <ResponsiveContainer
          width="100%"
          height={450}
        >

          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="domain"
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip />

            <Legend />

            {stages.map((stage) => (

              <Bar
                key={stage}
                dataKey={stage}
                stackId="papers"
                fill={colors[stage]}
                radius={[4, 4, 0, 0]}
              />

            ))}

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>

  );

}