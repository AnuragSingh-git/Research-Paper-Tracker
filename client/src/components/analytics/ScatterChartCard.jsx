import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ZAxis,
} from "recharts";

import { Card, CardContent } from "../ui/card";

function CustomTooltip({ active, payload }) {

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const paper = payload[0].payload;

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 min-w-[220px]">

      <h3 className="font-semibold text-slate-800 mb-3">
        {paper.title}
      </h3>

      <div className="space-y-1 text-sm">

        <p>
          <span className="font-medium">
            Citation Count:
          </span>{" "}
          {paper.citationCount}
        </p>

        <p>
          <span className="font-medium">
            Impact Score:
          </span>{" "}
          {paper.impact}
        </p>

      </div>

    </div>
  );

}

export default function ScatterChartCard({ data }) {

  const impacts = [
    "Unknown",
    "Low Impact",
    "Medium Impact",
    "High Impact",
  ];

  const colors = {
    Unknown: "#94a3b8",
    "Low Impact": "#ef4444",
    "Medium Impact": "#f59e0b",
    "High Impact": "#22c55e",
  };

  const chartData = impacts.map((impact, index) => ({

    impact,

    papers: data
      .filter(
        (paper) => paper.impactScore === impact
      )
      .map((paper, i) => ({

        title: paper.title,

        citationCount: Number(
          paper.citationCount
        ),

        impact: paper.impactScore,

        y: index + 1 + i * 0.08,

        size: 140,

      })),

  }));

  return (

    <Card className="shadow-lg rounded-2xl">

      <CardContent className="p-6">

        <h2 className="text-2xl font-bold mb-6">

          Citation Count vs Impact Score

        </h2>

        <ResponsiveContainer
          width="100%"
          height={420}
        >

          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="citationCount"
              name="Citation Count"
              allowDecimals={false}
              label={{
                value: "Citation Count",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={[0.5, 4.5]}
              ticks={[1, 2, 3, 4]}
              tickFormatter={(value) => {

                switch (value) {

                  case 1:
                    return "Unknown";

                  case 2:
                    return "Low";

                  case 3:
                    return "Medium";

                  case 4:
                    return "High";

                  default:
                    return "";

                }

              }}
            />

            <ZAxis
              dataKey="size"
              range={[120, 250]}
            />

            <Tooltip
              cursor={{
                strokeDasharray: "3 3",
              }}
              content={<CustomTooltip />}
            />

            <Legend />

            {chartData.map((group) => (

              <Scatter
                key={group.impact}
                name={group.impact}
                data={group.papers}
                fill={colors[group.impact]}
              />

            ))}

          </ScatterChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>

  );

}