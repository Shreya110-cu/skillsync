import {
  useEffect,
  useState
} from "react";

import api from
  "../services/api";

function Jobs() {

  const [jobs,
    setJobs] =
    useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs =
    async () => {

    try {

      const response =
        await api.get(
          "/jobs"
        );

      setJobs(
        response.data
      );

    } catch (error) {

      console.log(
        error
      );

    }

  };

  return (

    <div>

      <h1>
        Available Jobs
      </h1>

      {
        jobs.map(
          (job) => (

          <div
            key={
              job._id
            }
          >

            <h3>
              {
                job.title
              }
            </h3>

            <p>
              {
                job.company
              }
            </p>

            <p>
              {
                job.location
              }
            </p>

            <hr />

          </div>

        ))
      }

    </div>

  );

}

export default Jobs;