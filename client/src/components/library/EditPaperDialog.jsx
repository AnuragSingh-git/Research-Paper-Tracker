import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePaper } from "../../services/paperApi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { Pencil } from "lucide-react";

export default function EditPaperDialog({ paper, reload }) {

    const [open, setOpen] = useState(false);

    const {

        register,

        handleSubmit,

        setValue,

    } = useForm();

    useEffect(() => {

        if (paper) {

            setValue("title", paper.title);

            setValue("firstAuthor", paper.firstAuthor);

            setValue("researchDomain", paper.researchDomain);

            setValue("readingStage", paper.readingStage);

            setValue("citationCount", paper.citationCount);

            setValue("impactScore", paper.impactScore);

            setValue(
                "dateAdded",
                paper.dateAdded?.substring(0, 10)
            );

        }

    }, [paper]);

    const onSubmit = async (data) => {

        try {

            data.citationCount = Number(data.citationCount);

            await updatePaper(paper._id, data);

            toast.success("Paper Updated");

            reload();

            setOpen(false);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };

    return (

        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>

                <Button
                    size="icon"
                    variant="outline"
                >

                    <Pencil size={18} />

                </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>

                    <DialogTitle>

                        Edit Paper

                    </DialogTitle>

                </DialogHeader>

                <form

                    onSubmit={handleSubmit(onSubmit)}

                    className="space-y-4"

                >

                    <Input

                        placeholder="Paper Title"

                        {...register("title")}

                    />

                    <Input

                        placeholder="First Author"

                        {...register("firstAuthor")}

                    />

                    <Select

                        defaultValue={paper.researchDomain}

                        onValueChange={(value) =>

                            setValue("researchDomain", value)

                        }

                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="Computer Science">

                                Computer Science

                            </SelectItem>

                            <SelectItem value="Biology">

                                Biology

                            </SelectItem>

                            <SelectItem value="Physics">

                                Physics

                            </SelectItem>

                            <SelectItem value="Chemistry">

                                Chemistry

                            </SelectItem>

                            <SelectItem value="Mathematics">

                                Mathematics

                            </SelectItem>

                            <SelectItem value="Social Sciences">

                                Social Sciences

                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <Select

                        defaultValue={paper.readingStage}

                        onValueChange={(value) =>

                            setValue("readingStage", value)

                        }

                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="Abstract Read">

                                Abstract Read

                            </SelectItem>

                            <SelectItem value="Introduction Done">

                                Introduction Done

                            </SelectItem>

                            <SelectItem value="Methodology Done">

                                Methodology Done

                            </SelectItem>

                            <SelectItem value="Results Analyzed">

                                Results Analyzed

                            </SelectItem>

                            <SelectItem value="Fully Read">

                                Fully Read

                            </SelectItem>

                            <SelectItem value="Notes Completed">

                                Notes Completed

                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <Input

                        type="number"

                        {...register("citationCount")}

                    />

                    <Select

                        defaultValue={paper.impactScore}

                        onValueChange={(value) =>

                            setValue("impactScore", value)

                        }

                    >

                        <SelectTrigger>

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="High Impact">

                                High Impact

                            </SelectItem>

                            <SelectItem value="Medium Impact">

                                Medium Impact

                            </SelectItem>

                            <SelectItem value="Low Impact">

                                Low Impact

                            </SelectItem>

                            <SelectItem value="Unknown">

                                Unknown

                            </SelectItem>

                        </SelectContent>

                    </Select>

                    <Input

                        type="date"

                        {...register("dateAdded")}

                    />

                    <DialogFooter>

                        <Button type="submit">

                            Update Paper

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}