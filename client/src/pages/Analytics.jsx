import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getSummary,
  getFunnel,
  getScatter,
  getDomainStage,
} from "../services/analyticsApi";

import SummaryCards from "../components/analytics/SummaryCards";
import FunnelChartCard from "../components/analytics/FunnelChartCard";
import ScatterChartCard from "../components/analytics/ScatterChartCard";
import DomainStageChart from "../components/analytics/DomainStageChart";

export default function Analytics() {

  const [summary, setSummary] = useState(null);

  const [funnel, setFunnel] = useState([]);

  const [scatter, setScatter] = useState([]);

  const [domain, setDomain] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics = async () => {

    try {

      const [

        summaryRes,

        funnelRes,

        scatterRes,

        domainRes,

      ] = await Promise.all([

        getSummary(),

        getFunnel(),

        getScatter(),

        getDomainStage(),

      ]);

      setSummary(summaryRes.data.data);

      setFunnel(funnelRes.data.data);

      setScatter(scatterRes.data.data);

      setDomain(domainRes.data.data);

    }

    catch (error) {

      console.log(error);

      toast.error("Failed to load analytics");

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <p className="text-lg font-medium text-slate-500">

          Loading Analytics...

        </p>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Analytics Dashboard

        </h1>

        <p className="text-slate-500 mt-2">

          Visual insights into your research paper reading progress.

        </p>

      </div>

      {summary && (

        <SummaryCards summary={summary} />

      )}

      <div className="grid xl:grid-cols-2 gap-6">

        <FunnelChartCard data={funnel} />

        <ScatterChartCard data={scatter} />

      </div>

      <DomainStageChart data={domain} />

    </div>

  );

}