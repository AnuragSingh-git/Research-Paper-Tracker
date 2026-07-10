import {

Table,

TableBody,

TableCell,

TableHead,

TableHeader,

TableRow

} from "../ui/table";

import EditPaperDialog from "./EditPaperDialog";

import DeletePaperDialog from "./DeletePaperDialog";

export default function PaperTable({

papers,

reload

}){

return(

<Table>

<TableHeader>

<TableRow>

<TableHead>Title</TableHead>

<TableHead>Author</TableHead>

<TableHead>Domain</TableHead>

<TableHead>Stage</TableHead>

<TableHead>Citations</TableHead>

<TableHead>Impact</TableHead>

<TableHead>Date</TableHead>

<TableHead>Action</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{

papers.map((paper)=>(

<TableRow

key={paper._id}

>

<TableCell>

{paper.title}

</TableCell>

<TableCell>

{paper.firstAuthor}

</TableCell>

<TableCell>

{paper.researchDomain}

</TableCell>

<TableCell>

{paper.readingStage}

</TableCell>

<TableCell>

{paper.citationCount}

</TableCell>

<TableCell>

{paper.impactScore}

</TableCell>

<TableCell>

{new Date(

paper.dateAdded

).toLocaleDateString()}

</TableCell>

<TableCell>

<div className="flex gap-2">

<EditPaperDialog

paper={paper}

reload={reload}

/>

<DeletePaperDialog

id={paper._id}

reload={reload}

/>

</div>

</TableCell>

</TableRow>

))

}

</TableBody>

</Table>

);

}