import Paper from "../models/Paper.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createPaper = asyncHandler(async(req,res)=>{

const paper=await Paper.create({

...req.body,

owner:req.user._id

});

return res.status(201).json(

new ApiResponse(

201,

paper,

"Paper Added Successfully"

)

);

});

export const getAllPapers = asyncHandler(async(req,res)=>{

const {

researchDomain,

readingStage,

impactScore,

date,

search,

page=1,

limit=10

}=req.query;

const query={

owner:req.user._id

};

if(researchDomain){

query.researchDomain={

$in:researchDomain.split(",")

};

}

if(readingStage){

query.readingStage={

$in:readingStage.split(",")

};

}

if(impactScore){

query.impactScore={

$in:impactScore.split(",")

};

}

if(search){

query.title={

$regex:search,

$options:"i"

};

}

if(date){

const today=new Date();

let startDate;

if(date==="week"){

startDate=new Date();

startDate.setDate(today.getDate()-7);

}

else if(date==="month"){

startDate=new Date();

startDate.setMonth(today.getMonth()-1);

}

else if(date==="3months"){

startDate=new Date();

startDate.setMonth(today.getMonth()-3);

}

if(startDate){

query.dateAdded={

$gte:startDate

};

}

}

const papers=await Paper.find(query)

.sort({

createdAt:-1

})

.skip((page-1)*limit)

.limit(Number(limit));

const total=await Paper.countDocuments(query);

return res.json(

new ApiResponse(

200,

{

papers,

total,

page:Number(page),

pages:Math.ceil(total/limit)

}

)

);

});

export const getPaperById = asyncHandler(async(req,res)=>{

const paper=await Paper.findOne({

_id:req.params.id,

owner:req.user._id

});

if(!paper){

throw new ApiError(

404,

"Paper Not Found"

);

}

return res.json(

new ApiResponse(

200,

paper

)

);

});

export const updatePaper = asyncHandler(async(req,res)=>{

const paper=await Paper.findOneAndUpdate(

{

_id:req.params.id,

owner:req.user._id

},

req.body,

{

new:true,

runValidators:true

}

);

if(!paper){

throw new ApiError(

404,

"Paper Not Found"

);

}

return res.json(

new ApiResponse(

200,

paper,

"Paper Updated"

)

);

});

export const deletePaper = asyncHandler(async(req,res)=>{

const paper=await Paper.findOneAndDelete({

_id:req.params.id,

owner:req.user._id

});

if(!paper){

throw new ApiError(

404,

"Paper Not Found"

);

}

return res.json(

new ApiResponse(

200,

null,

"Paper Deleted"

)

);

});