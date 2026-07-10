import { body } from "express-validator";

export const paperValidator=[

body("title")
.notEmpty(),

body("firstAuthor")
.notEmpty(),

body("researchDomain")
.isIn([
"Computer Science",
"Biology",
"Physics",
"Chemistry",
"Mathematics",
"Social Sciences"
]),

body("readingStage")
.isIn([
"Abstract Read",
"Introduction Done",
"Methodology Done",
"Results Analyzed",
"Fully Read",
"Notes Completed"
]),

body("citationCount")
.isNumeric(),

body("impactScore")
.isIn([
"High Impact",
"Medium Impact",
"Low Impact",
"Unknown"
])

];