import {
  useEffect,
  useMemo,
  useState
} from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import {
  Briefcase,
  Users,
  Search,
  Plus,
  BarChart3,
  Home,
  Settings,
  Bell,
  MapPin
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function Dashboard() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );


  const [jobs, setJobs] =
  useState([]);


  const [search,
    setSearch] =
    useState("");

const [

  applicants,

  setApplicants

] = useState([]);

  const [form,
    setForm] =
    useState({

      title: "",
      company: "",
      location: ""

    });

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
  const fetchApplicants =
  async (jobId) => {

    try {

      const response =
        await api.get(

          `/applications/${jobId}`,

          {

            headers: {

              Authorization:

                `Bearer ${localStorage.getItem("token")}`

            }

          }

        );


      setApplicants(

        response.data

      );

    }

    catch {

      toast.error(

        "Failed to load applicants"

      );

    }

  };
  const chartData = [

    {
      month: "Jan",
      jobs: 4
    },

    {
      month: "Feb",
      jobs: 8
    },

    {
      month: "Mar",
      jobs: 6
    },

    {
      month: "Apr",
      jobs: 12
    },

    {
      month: "May",
      jobs: 9
    },

    {
      month: "Jun",
      jobs: 15
    }

  ];


  const filteredJobs =
    useMemo(() => {

      return jobs.filter(
        (job) =>

          job.title
            .toLowerCase()
            .includes(
              search
                .toLowerCase()
            )

      );

    }, [
      jobs,
      search
    ]);


  const addJob =
  async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(

        "/jobs",

        form,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      toast.success(
        "Job created successfully"
      );

      fetchJobs();

      setForm({

        title: "",
        company: "",
        location: ""

      });

    } catch (error) {

      toast.error(
        "Failed to create job"
      );

    }

  };


  return (

    <div className="
      min-h-screen
      bg-slate-100
      flex
    ">


      {/* Sidebar */}
      <div className="
        w-64
        bg-gradient-to-b
        from-slate-900
        to-slate-800
        text-white
        p-6
        shadow-2xl
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-10
        ">
          SkillSync
        </h1>


        <div className="
          space-y-4
        ">

          <SidebarItem
            icon={<Home size={18} />}
            title="Dashboard"
          />

          <SidebarItem
            icon={<Briefcase size={18} />}
            title="Jobs"
          />

          <SidebarItem
            icon={<BarChart3 size={18} />}
            title="Analytics"
          />

          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
          />

        </div>

      </div>



      {/* Main */}
      <div className="
        flex-1
        p-6
      ">


        {/* Navbar */}
        <div className="
          bg-white/70
          backdrop-blur-md
          rounded-2xl
          shadow
          p-5
          flex
          justify-between
          items-center
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            Welcome,
            {
  new Date().getHours() < 12
    ? "Good Morning"
    : "Good Evening"
}
, {user.name}
            
          </h2>


          <div className="
            flex
            gap-4
            items-center
          ">

            <Bell />

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
              font-bold
            ">
              {
                user.name
                  ?.charAt(0)
              }
            </div>
<button
  onClick={() => {

    localStorage.clear();

    window.location.href = "/";

  }}
  className="
    px-4
    py-2
    bg-red-500
    text-white
    rounded-xl
  "
>

  Logout

</button>
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
            title="Jobs"
            value={jobs.length}
          />

          <StatCard
            icon={<Users />}
            title="Applicants"
            value="24"
          />

          <StatCard
            icon={<BarChart3 />}
            title="Views"
            value="310"
          />

        </div>



        {/* Analytics */}
        <div className="
          bg-white
          rounded-2xl
          shadow
          p-6
          mb-6
        ">

          <h2 className="
            text-xl
            font-bold
            mb-4
          ">
            Hiring Analytics
          </h2>


          <div className="
            h-72
          ">

            <ResponsiveContainer>

              <LineChart
                data={
                  chartData
                }
              >

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="jobs"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>



        {/* Jobs + Form */}
        <div className="
          grid
          lg:grid-cols-3
          gap-6
        ">


          {/* Jobs */}
          <div className="
            lg:col-span-2
            bg-white
            rounded-2xl
            shadow
            p-6
          ">
<div className="
  mt-8
">

  <h2 className="
    text-2xl
    font-bold
    mb-4
  ">

    Applicants

  </h2>



  <div className="
    grid
    gap-4
  ">

    {

      applicants.map(

        (

          item,
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
            "

          >

            <h3 className="
              font-bold
            ">

              {

                item
                  .candidate
                  ?.name

              }

            </h3>



            <p>

              {

                item
                  .candidate
                  ?.email

              }

            </p>



            <p className="
              text-slate-500
            ">

              {

                item
                  .candidate
                  ?.role

              }

            </p>

          </div>

        )

      )

    }

  </div>

</div>
            <div className="
              flex
              gap-3
              mb-5
            ">

              <Search />

              <input
                className="
                  w-full
                  outline-none
                "
                placeholder="
                  Search jobs...
                "
                value={
                  search
                }
                onChange={
                  (e) =>

                    setSearch(
                      e.target
                        .value
                    )
                }
              />

            </div>


            <div className="
              space-y-4
            ">

              {
                filteredJobs.map(
                  (
                    job,
                    index
                  ) => (

                    <div
                      key={
                        index
                      }
                      className="
                        border
                        rounded-2xl
                        p-4
                      "
                    >

                      <h3 className="
                        font-semibold
                        text-lg
                      ">
                        {
                          job.title
                        }
                      </h3>


                      <p>
                        {
                          job.company
                        }
                      </p>


                      <p className="
                        flex
                        gap-2
                        text-slate-500
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
    fetchApplicants(
      job._id
    )
  }

  className="
    bg-indigo-600
    text-white
    px-4
    py-2
    rounded-xl
    mt-3
  "

>

  View Applicants

</button>
                    </div>

                  )
                )
              }

            </div>

          </div>



          {/* Create Job */}
          <div className="
            bg-white
            rounded-2xl
            shadow
            p-6
          ">

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              Create Job
            </h2>


            <form
              onSubmit={
                addJob
              }
              className="
                space-y-3
              "
            >

              <input
                className="
                  w-full
                  border
                  p-2
                  rounded-xl
                "
                placeholder="
                  Title
                "
                value={
                  form.title
                }
                onChange={
                  (e) =>

                    setForm({

                      ...form,

                      title:
                        e.target
                          .value

                    })
                }
              />


              <input
                className="
                  w-full
                  border
                  p-2
                  rounded-xl
                "
                placeholder="
                  Company
                "
                value={
                  form.company
                }
                onChange={
                  (e) =>

                    setForm({

                      ...form,

                      company:
                        e.target
                          .value

                    })
                }
              />


              <input
                className="
                  w-full
                  border
                  p-2
                  rounded-xl
                "
                placeholder="
                  Location
                "
                value={
                  form.location
                }
                onChange={
                  (e) =>

                    setForm({

                      ...form,

                      location:
                        e.target
                          .value

                    })
                }
              />


              <button className="
                w-full
                flex
                justify-center
                gap-2
                p-3
                rounded-xl
                bg-slate-900
                text-white
              ">

                <Plus
                  size={18}
                />

                Create Job

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}



function SidebarItem({
  icon,
  title
}) {

  return (

    <div className="
      flex
      gap-3
      cursor-pointer
      p-3
      rounded-xl
      hover:bg-white/10
      transition
    ">

      {icon}

      {title}

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
      hover:scale-105
      hover:shadow-xl
      transition
      duration-300
      cursor-pointer
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