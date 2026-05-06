import api from "../services/api";
import toast from "react-hot-toast";

import {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Search,
  Briefcase,
  Bookmark,
  User,
  MapPin,
  LogOut
} from "lucide-react";



export default function CandidateDashboard() {


  const navigate =
    useNavigate();



  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      ) || "{}"

    );



  const [jobs,
    setJobs] =
    useState([]);




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

      }

      catch {

        toast.error(
          "Failed to load jobs"
        );

      }

    };
const applyToJob =
  async (jobId) => {

    try {

      await api.post(

        `/applications/${jobId}`,

        {},

        {

          headers: {

            Authorization:

              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );


      toast.success(
        "Applied successfully"
      );

    }

    catch (error) {

      toast.error(

        error.response
          ?.data
          ?.message ||

        "Apply failed"

      );

    }

  };



  const logout =
    () => {

      localStorage.clear();

      toast.success(
        "Logged out"
      );

      navigate("/");

    };




  useEffect(() => {

    fetchJobs();

  }, []);




  return (

    <div className="
      min-h-screen
      bg-slate-100
      p-6
    ">



      {/* Header */}
      <div className="
        bg-white
        rounded-2xl
        shadow
        p-5
        mb-6
        flex
        justify-between
        items-center
      ">


        <h1 className="
          text-2xl
          font-bold
        ">
          Welcome,
          {" "}
          {user.name}
        </h1>




        <div className="
          flex
          items-center
          gap-4
        ">


          <button

            onClick={
              logout
            }

            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-xl
              flex
              gap-2
              items-center
            "

          >

            <LogOut
              size={16}
            />

            Logout

          </button>




          <div className="
            bg-gradient-to-r
            from-indigo-500
            to-purple-500
            text-white
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
          ">

            {
              user.name
                ?.charAt(0)
            }

          </div>

        </div>

      </div>




      {/* Stats */}
      <div className="
        grid
        md:grid-cols-3
        gap-4
        mb-6
      ">

        <StatCard
          icon={<Briefcase />}
          title="Available Jobs"
          value={jobs.length}
        />

        <StatCard
          icon={<Bookmark />}
          title="Saved Jobs"
          value="8"
        />

        <StatCard
          icon={<User />}
          title="Applications"
          value="5"
        />

      </div>




      {/* Search */}
      <div className="
        bg-white
        rounded-2xl
        shadow
        p-5
        mb-6
        flex
        gap-3
      ">

        <Search />

        <input
          placeholder="Search jobs..."
          className="
            w-full
            outline-none
          "
        />

      </div>




      {/* Jobs */}
      <div className="
        grid
        md:grid-cols-2
        gap-5
      ">

        {

          jobs.map(

            (
              job,
              index
            ) => (

              <div

                key={
                  index
                }

                className="
                  bg-white
                  rounded-2xl
                  shadow
                  p-5
                  hover:scale-105
                  transition
                "

              >

                <h2 className="
                  text-xl
                  font-bold
                ">
                  {
                    job.title
                  }
                </h2>



                <p>
                  {
                    job.company
                  }
                </p>



                <p className="
                  flex
                  gap-2
                  text-slate-500
                  mb-4
                ">

                  <MapPin
                    size={16}
                  />

                  {
                    job.location
                  }

                </p>



                <button

  onClick={() =>
    applyToJob(
      job._id
    )
  }

  className="
    bg-slate-900
    text-white
    px-5
    py-2
    rounded-xl
  "

>
  Apply
</button>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}




function StatCard({

  icon,
  title,
  value

}) {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow
      p-5
    ">

      <div className="
        mb-3
      ">
        {icon}
      </div>



      <h3 className="
        text-slate-500
      ">
        {title}
      </h3>



      <p className="
        text-3xl
        font-bold
      ">
        {value}
      </p>

    </div>

  );

}