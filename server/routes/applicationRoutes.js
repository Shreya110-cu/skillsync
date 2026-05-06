const express =
  require(
    "express"
  );

const router =
  express.Router();


const {

  applyToJob,

  getApplicants

} = require(

  "../controllers/applicationController"

);


const authMiddleware =
  require(

    "../middleware/authMiddleware"

  );



router.post(

  "/:jobId",

  authMiddleware,

  applyToJob

);



router.get(

  "/:jobId",

  authMiddleware,

  getApplicants

);



module.exports =
  router;