import { useState } from "react";

import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const domains = [
  "Computer Science",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Social Sciences",
];

const stages = [
  "Abstract Read",
  "Introduction Done",
  "Methodology Done",
  "Results Analyzed",
  "Fully Read",
  "Notes Completed",
];

const impacts = [
  "High Impact",
  "Medium Impact",
  "Low Impact",
  "Unknown",
];

export default function PaperFilters({ onApplyFilters }) {

  const emptyFilters = {
    search: "",
    researchDomain: [],
    readingStage: [],
    impactScore: [],
    date: "",
  };

  const [filters, setFilters] = useState(emptyFilters);

  const handleCheckbox = (field, value, checked) => {

    setFilters((prev) => {

      const current = prev[field];

      return {

        ...prev,

        [field]: checked
          ? [...current, value]
          : current.filter((item) => item !== value),

      };

    });

  };

  const applyFilters = () => {

    const payload = {};

    if (filters.search.trim())
      payload.search = filters.search;

    if (filters.researchDomain.length)
      payload.researchDomain = filters.researchDomain.join(",");

    if (filters.readingStage.length)
      payload.readingStage = filters.readingStage.join(",");

    if (filters.impactScore.length)
      payload.impactScore = filters.impactScore.join(",");

    if (filters.date && filters.date !== "all")
      payload.date = filters.date;

    onApplyFilters(payload);

  };

  const clearFilters = () => {

    setFilters(emptyFilters);

    onApplyFilters({});

  };

  return (

    <div className="rounded-2xl border bg-white shadow-md p-6 space-y-6">

      <Input

        placeholder="Search paper title..."

        value={filters.search}

        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value,
          }))
        }

      />

      <div className="grid lg:grid-cols-4 gap-8">

        <div>

          <h3 className="font-semibold mb-3">
            Reading Stage
          </h3>

          <div className="space-y-2">

            {stages.map((stage) => (

              <div
                key={stage}
                className="flex items-center gap-2"
              >

                <Checkbox

                  checked={filters.readingStage.includes(stage)}

                  onCheckedChange={(checked) =>
                    handleCheckbox(
                      "readingStage",
                      stage,
                      checked
                    )
                  }

                />

                <label>{stage}</label>

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Research Domain
          </h3>

          <div className="space-y-2">

            {domains.map((domain) => (

              <div
                key={domain}
                className="flex items-center gap-2"
              >

                <Checkbox

                  checked={filters.researchDomain.includes(domain)}

                  onCheckedChange={(checked) =>
                    handleCheckbox(
                      "researchDomain",
                      domain,
                      checked
                    )
                  }

                />

                <label>{domain}</label>

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Impact Score
          </h3>

          <div className="space-y-2">

            {impacts.map((impact) => (

              <div
                key={impact}
                className="flex items-center gap-2"
              >

                <Checkbox

                  checked={filters.impactScore.includes(impact)}

                  onCheckedChange={(checked) =>
                    handleCheckbox(
                      "impactScore",
                      impact,
                      checked
                    )
                  }

                />

                <label>{impact}</label>

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Date Added
          </h3>

          <Select

            value={filters.date}

            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                date: value,
              }))
            }

          >

            <SelectTrigger>

              <SelectValue placeholder="Select Date" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="week">
                This Week
              </SelectItem>

              <SelectItem value="month">
                This Month
              </SelectItem>

              <SelectItem value="3months">
                Last 3 Months
              </SelectItem>

              <SelectItem value="all">
                All Time
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">

        <Button
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>

        <Button
          onClick={applyFilters}
        >
          Apply Filters
        </Button>

      </div>

    </div>

  );

}