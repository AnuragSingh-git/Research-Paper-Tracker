import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

import { Card, CardContent } from "../ui/card";

export default function FunnelChartCard({ data }) {

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
  ];

  return (
    <Card className="shadow-lg rounded-xl">

      <CardContent className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Reading Funnel
        </h2>

        <ResponsiveContainer width="100%" height={450}>

          <FunnelChart>

            <Tooltip />

            <Funnel
              data={data}
              dataKey="value"
              nameKey="stage"
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}

              <LabelList
                dataKey="stage"
                position="right"
              />

              <LabelList
                dataKey="value"
                position="center"
                fill="#fff"
              />

            </Funnel>

          </FunnelChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}