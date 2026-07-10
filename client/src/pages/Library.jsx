import { useEffect, useState } from "react";

import { getPapers } from "../services/paperApi";

import PaperTable from "../components/library/PaperTable";

import PaperFilters from "../components/library/PaperFilters";

import AddPaperDialog from "../components/library/AddPaperDialog";

export default function Library(){

const[papers,setPapers]=useState([]);

const[filters,setFilters]=useState({});

const loadPapers=async()=>{

const res=await getPapers(filters);

setPapers(res.data.data.papers);

};

useEffect(()=>{

loadPapers();

},[filters]);

return(

<div className="space-y-6">

<PaperFilters

setFilters={setFilters}

/>

<AddPaperDialog

reload={loadPapers}

/>

<PaperTable

papers={papers}

reload={loadPapers}

/>

</div>

);

}