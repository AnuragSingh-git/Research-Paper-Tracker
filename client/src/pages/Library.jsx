import { useEffect, useState } from "react";
import { Filter } from "lucide-react";

import { getPapers } from "../services/paperApi";

import PaperTable from "../components/library/PaperTable";
import PaperFilters from "../components/library/PaperFilters";
import AddPaperDialog from "../components/library/AddPaperDialog";

import { Button } from "../components/ui/button";

export default function Library() {

  const [papers, setPapers] = useState([]);

  const [filters, setFilters] = useState({});

  const [showFilters, setShowFilters] = useState(false);

  const loadPapers = async () => {

    try {

      const res = await getPapers(filters);

      setPapers(res.data.data.papers);

    }

    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadPapers();

  }, [filters]);

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Paper Library

          </h1>

          <p className="text-slate-500 mt-1">

            Manage and organize all your research papers.

          </p>

        </div>

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >

            <Filter className="mr-2 h-4 w-4" />

            {showFilters ? "Hide Filters" : "Filters"}

          </Button>

          <AddPaperDialog reload={loadPapers} />

        </div>

      </div>

      {showFilters && (

        <PaperFilters
    onApplyFilters={setFilters}
    />

      )}

      <PaperTable

        papers={papers}

        reload={loadPapers}

      />

    </div>

  );

}