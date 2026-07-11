import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addPaper } from "../../services/paperApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";

import { Button } from "../ui/button";

export default function AddPaperDialog({
  reload,
  children,
}) {

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({

    defaultValues: {

      title: "",

      firstAuthor: "",

      researchDomain: "Computer Science",

      readingStage: "Abstract Read",

      citationCount: "",

      impactScore: "Unknown",

      dateAdded: new Date()
        .toISOString()
        .split("T")[0],

    },

  });

  const onSubmit = async (data) => {

    try {

      data.citationCount = Number(data.citationCount);

      await addPaper(data);

      toast.success("Paper Added Successfully");

      reset();

      setOpen(false);

      if (reload) {

        reload();

      }

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to Add Paper"

      );

    }

  };

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger render={
  children ? (
    children
  ) : (
    <Button>+ Add Paper</Button>
  )
  } />

      <DialogContent className="sm:max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-xl p-6">

        <DialogHeader>

          <DialogTitle>

            Add Research Paper

          </DialogTitle>

        </DialogHeader>

        <form

          onSubmit={handleSubmit(onSubmit)}

          className="grid grid-cols-1 md:grid-cols-2 gap-5"

        >

          <div>

            <label className="font-medium">

              Paper Title

            </label>

            <input

              {...register("title", {

                required: true

              })}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="font-medium">

              First Author

            </label>

            <input

              {...register("firstAuthor", {

                required: true

              })}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="font-medium">

              Research Domain

            </label>

            <select

              {...register("researchDomain")}

              className="w-full mt-2 border rounded-lg p-3"

            >

              <option>

                Computer Science

              </option>

              <option>

                Biology

              </option>

              <option>

                Physics

              </option>

              <option>

                Chemistry

              </option>

              <option>

                Mathematics

              </option>

              <option>

                Social Sciences

              </option>

            </select>

          </div>

          <div>

            <label className="font-medium">

              Reading Stage

            </label>

            <select

              {...register("readingStage")}

              className="w-full mt-2 border rounded-lg p-3"

            >

              <option>

                Abstract Read

              </option>

              <option>

                Introduction Done

              </option>

              <option>

                Methodology Done

              </option>

              <option>

                Results Analyzed

              </option>

              <option>

                Fully Read

              </option>

              <option>

                Notes Completed

              </option>

            </select>

          </div>

          <div>

            <label className="font-medium">

              Citation Count

            </label>

            <input

              type="number"

              {...register("citationCount", {

                required: true

              })}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="font-medium">

              Impact Score

            </label>

            <select

              {...register("impactScore")}

              className="w-full mt-2 border rounded-lg p-3"

            >

              <option>

                High Impact

              </option>

              <option>

                Medium Impact

              </option>

              <option>

                Low Impact

              </option>

              <option>

                Unknown

              </option>

            </select>

          </div>

          <div>

            <label className="font-medium">

              Date Added

            </label>

            <input

              type="date"

              {...register("dateAdded")}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

          <DialogFooter>

            <Button

              type="submit"

              className="w-full"

            >

              Save Paper

            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  );

}