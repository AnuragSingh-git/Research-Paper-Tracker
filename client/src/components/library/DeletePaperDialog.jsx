import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePaper } from "../../services/paperApi";

import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function DeletePaperDialog({ id, reload }) {

  const handleDelete = async () => {

    try {

      await deletePaper(id);

      toast.success("Paper Deleted Successfully");

      reload();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to Delete Paper"
      );

    }

  };

  return (

    <AlertDialog>

      <AlertDialogTrigger asChild>

        <Button
          variant="destructive"
          size="icon"
        >
          <Trash2 size={18} />
        </Button>

      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            Delete Research Paper?

          </AlertDialogTitle>

          <AlertDialogDescription>

            This action cannot be undone.
            The paper will be permanently removed from your library.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>

            Cancel

          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
          >

            Delete

          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}