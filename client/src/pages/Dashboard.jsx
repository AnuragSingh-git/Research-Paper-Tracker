import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  PlusCircle,
  LibraryBig,
  ChartNoAxesCombined,
} from "lucide-react";

import { Card, CardContent } from "../components/ui/card";

import AddPaperDialog from "../components/library/AddPaperDialog";

import { getDashboard } from "../services/dashboardApi";

import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalPapers: 0,
    fullyRead: 0,
    averageCitation: 0,
    completionRate: 0,
    recentPapers: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      setDashboard(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load dashboard");
    }
  };

  const cards = [
    {
      title: "Total Papers",
      value: dashboard.totalPapers,
      icon: BookOpen,
    },
    {
      title: "Fully Read",
      value: dashboard.fullyRead,
      icon: CheckCircle2,
    },
    {
      title: "Average Citation",
      value: dashboard.averageCitation,
      icon: BarChart3,
    },
    {
      title: "Completion",
      value: `${dashboard.completionRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back 👋 Keep tracking your research journey.
          </p>

        </div>

        <AddPaperDialog reload={fetchDashboard} />

      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((item) => {

          const Icon = item.icon;

          return (

            <Card
              key={item.title}
              className="rounded-2xl shadow-md hover:shadow-xl transition"
            >

              <CardContent className="p-6">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-slate-500">
                      {item.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                      {item.value}
                    </h2>

                  </div>

                  <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center">

                    <Icon
                      className="text-indigo-600"
                      size={28}
                    />

                  </div>

                </div>

              </CardContent>

            </Card>

          );

        })}

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <AddPaperDialog reload={fetchDashboard}>

          <Card className="cursor-pointer hover:shadow-xl transition duration-300">

            <CardContent className="p-6 flex flex-col items-center">

              <PlusCircle
                className="text-indigo-600"
                size={40}
              />

              <h2 className="font-bold text-xl mt-4">
                Add New Paper
              </h2>

              <p className="text-slate-500 mt-2">
                Save another research paper.
              </p>

            </CardContent>

          </Card>

        </AddPaperDialog>

        <Card
          className="cursor-pointer hover:shadow-xl transition duration-300"
          onClick={() => navigate("/library")}
        >

          <CardContent className="p-6 flex flex-col items-center">

            <LibraryBig
              className="text-green-600"
              size={40}
            />

            <h2 className="font-bold text-xl mt-4">
              Paper Library
            </h2>

            <p className="text-slate-500 mt-2">
              View all saved papers.
            </p>

          </CardContent>

        </Card>

        <Card
          className="cursor-pointer hover:shadow-xl transition duration-300"
          onClick={() => navigate("/analytics")}
        >

          <CardContent className="p-6 flex  flex-col items-center">

            <ChartNoAxesCombined
              className="text-orange-600"
              size={40}
            />

            <h2 className="font-bold text-xl mt-4">
              Analytics
            </h2>

            <p className="text-slate-500 mt-2">
              Visualize your research progress.
            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}