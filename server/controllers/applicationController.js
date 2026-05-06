const Application =
  require(
    "../models/Application"
  );



const applyToJob =
  async (

    req,
    res

  ) => {

    try {

      const {
        jobId
      } = req.params;



      const existing =
        await Application.findOne({

          candidate:
            req.user.id,

          job:
            jobId

        });



      if (
        existing
      ) {

        return res
          .status(400)
          .json({

            message:
              "Already applied"

          });

      }



      const application =
        await Application.create({

          candidate:
            req.user.id,

          job:
            jobId

        });



      res
        .status(201)
        .json({

          message:
            "Application submitted",

          application

        });

    }

    catch (
      error
    ) {

      res
        .status(500)
        .json({

          message:
            error.message

        });

    }

  };

const getApplicants =
  async (

    req,
    res

  ) => {

    try {

      const {
        jobId
      } = req.params;



      const applicants =
        await Application.find({

          job:
            jobId

        })

        .populate(

          "candidate",

          "name email role"

        );



      res
        .status(200)
        .json(

          applicants

        );

    }

    catch (
      error
    ) {

      res
        .status(500)
        .json({

          message:
            error.message

        });

    }

  };
module.exports = {

  applyToJob,

  getApplicants

};