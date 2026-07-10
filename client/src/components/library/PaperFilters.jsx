import { Input } from "../ui/input";

import {

Select,

SelectContent,

SelectItem,

SelectTrigger,

SelectValue

} from "../ui/select";

export default function PaperFilters({setFilters}){

return(

<div className="grid md:grid-cols-5 gap-4">

<Input

placeholder="Search"

onChange={(e)=>

setFilters(prev=>

({

...prev,

search:e.target.value

})

)

}

/>

<Select

onValueChange={(value)=>

setFilters(prev=>

({

...prev,

researchDomain:value

})

)

}

>

<SelectTrigger>

<SelectValue

placeholder="Domain"

/>

</SelectTrigger>

<SelectContent>

<SelectItem

value="Computer Science"

>

Computer Science

</SelectItem>

<SelectItem

value="Biology"

>

Biology

</SelectItem>

<SelectItem

value="Physics"

>

Physics

</SelectItem>

<SelectItem

value="Chemistry"

>

Chemistry

</SelectItem>

<SelectItem

value="Mathematics"

>

Mathematics

</SelectItem>

<SelectItem

value="Social Sciences"

>

Social Sciences

</SelectItem>

</SelectContent>

</Select>

</div>

);

}