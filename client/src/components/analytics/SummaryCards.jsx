import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "../ui/card";

export default function SummaryCards({ summary }) {

  const stageColors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  const citationColors = [
    "#6366f1",
    "#10b981",
    "#f97316",
    "#ec4899",
    "#14b8a6",
    "#facc15",
  ];

  return (

    <div className="grid xl:grid-cols-3 gap-6">

      {/* Completion Rate */}

      <Card className="shadow-lg rounded-2xl flex flex-col items-center">

        <CardContent className="p-6 h-full flex flex-col justify-center items-center">

          <p className="text-slate-500 font-semibold text-2xl">

            Completion Rate

          </p>

          <h1 className="text-6xl font-bold text-indigo-600 mt-6 flex items-center">

            {summary.completionRate}%

          </h1>

        </CardContent>

      </Card>

      {/* Reading Stage */}

      <Card className="shadow-lg rounded-2xl">

        <CardContent className="p-6">

          <h2 className="text-xl font-bold mb-5">

            Reading Stages

          </h2>

          <div className="grid grid-cols-2 gap-3 items-center">

            <div className="space-y-3">

              {summary.stageSummary.map((item, index) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: stageColors[index],
                      }}
                    />

                    <span className="text-sm">

                      {item._id}

                    </span>

                  </div>

                  <span className="font-bold">

                    {item.count}

                  </span>

                </div>

              ))}

            </div>

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <PieChart>

                <Pie
                  data={summary.stageSummary}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={75}
                  label
                >

                  {summary.stageSummary.map((_, index) => (

                    <Cell
                      key={index}
                      fill={
                        stageColors[
                          index % stageColors.length
                        ]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>

      {/* Average Citation */}

      <Card className="shadow-lg rounded-2xl">

        <CardContent className="p-6">

          <h2 className="text-xl font-bold mb-5">

            Average Citation / Domain

          </h2>

          <div className="grid grid-cols-2 gap-3 items-center">

            <div className="space-y-3">

              {summary.averageCitation.map((item, index) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background:
                          citationColors[index],
                      }}
                    />

                    <span className="text-sm">

                      {item._id}

                    </span>

                  </div>

                  <span className="font-bold">

                    {item.averageCitation.toFixed(1)}

                  </span>

                </div>

              ))}

            </div>

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <PieChart>

                <Pie
                  data={summary.averageCitation}
                  dataKey="averageCitation"
                  nameKey="_id"
                  outerRadius={75}
                  label
                >

                  {summary.averageCitation.map((_, index) => (

                    <Cell
                      key={index}
                      fill={
                        citationColors[
                          index % citationColors.length
                        ]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>

    </div>

  );

}