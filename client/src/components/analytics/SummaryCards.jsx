import { Card, CardContent } from "../ui/card";

export default function SummaryCards({ summary }) {

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <Card>

        <CardContent className="p-6">

          <h2 className="font-semibold text-slate-500">
            Completion Rate
          </h2>

          <p className="text-4xl font-bold text-indigo-600 mt-3">
            {summary.completionRate}%
          </p>

        </CardContent>

      </Card>

      <Card>

        <CardContent className="p-6">

          <h2 className="font-semibold text-slate-500">
            Reading Stages
          </h2>

          {summary.stageSummary.map((item) => (

            <div
              key={item._id}
              className="flex justify-between mt-2"
            >

              <span>{item._id}</span>

              <span className="font-semibold">
                {item.count}
              </span>

            </div>

          ))}

        </CardContent>

      </Card>

      <Card>

        <CardContent className="p-6">

          <h2 className="font-semibold text-slate-500">
            Avg Citation / Domain
          </h2>

          {summary.averageCitation.map((item) => (

            <div
              key={item._id}
              className="flex justify-between mt-2"
            >

              <span>{item._id}</span>

              <span className="font-semibold">
                {item.averageCitation.toFixed(1)}
              </span>

            </div>

          ))}

        </CardContent>

      </Card>

    </div>

  );

}