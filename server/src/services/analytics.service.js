import mongoose from "mongoose";

import Paper from "../models/Paper.js";

export const summaryAnalytics=async(userId)=>{

const totalPapers=await Paper.countDocuments({

owner:userId

});

const fullyRead=await Paper.countDocuments({

owner:userId,

readingStage:"Fully Read"

});

const papersByStage=await Paper.aggregate([

{

$match:{

owner:new mongoose.Types.ObjectId(userId)

}

},

{

$group:{

_id:"$readingStage",

count:{

$sum:1

}

}

}

]);

const averageCitationPerDomain=await Paper.aggregate([

{

$match:{

owner:new mongoose.Types.ObjectId(userId)

}

},

{

$group:{

_id:"$researchDomain",

averageCitation:{

$avg:"$citationCount"

}

}

}

]);

return{

totalPapers,

fullyRead,

completionRate:

totalPapers===0

?0

:Number(((fullyRead/totalPapers)*100).toFixed(2)),

papersByStage,

averageCitationPerDomain

};

};

export const funnelAnalytics=async(userId)=>{

return await Paper.aggregate([

{

$match:{

owner:new mongoose.Types.ObjectId(userId)

}

},

{

$group:{

_id:"$readingStage",

value:{

$sum:1

}

}

},

{

$project:{

_id:0,

stage:"$_id",

value:1

}

}

]);

};

export const scatterAnalytics=async(userId)=>{

return await Paper.find(

{

owner:userId

}

).select(

"title citationCount impactScore"

);

};

export const domainStageAnalytics=async(userId)=>{

return await Paper.aggregate([

{

$match:{

owner:new mongoose.Types.ObjectId(userId)

}

},

{

$group:{

_id:{

domain:"$researchDomain",

stage:"$readingStage"

},

count:{

$sum:1

}

}

},

{

$project:{

_id:0,

domain:"$_id.domain",

stage:"$_id.stage",

count:1

}

}

]);

};