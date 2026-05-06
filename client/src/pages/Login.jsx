import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from
  "react-hot-toast";

import api from
  "../services/api";


function Login() {

  const navigate =
    useNavigate();


  const [formData,
    setFormData] =
    useState({

      email: "",
      password: ""

    });


  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };



  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.post(

            "/auth/login",

            formData

          );



        const loggedInUser =
          response
            .data
            .user;



        console.log(
          "Logged in user:",
          loggedInUser
        );



        localStorage
          .setItem(

            "token",

            response
              .data
              .token

          );



        localStorage
          .setItem(

            "user",

            JSON.stringify(

              loggedInUser

            )

          );



        toast.success(
          "Welcome back!"
        );



        if (

          loggedInUser.role ===
          "recruiter"

        ) {

          navigate(
            "/dashboard"
          );

        }

        else {

          navigate(
            "/candidate-dashboard"
          );

        }

      }

      catch {

        toast.error(
          "Login failed"
        );

      }

    };



  return (

    <div className="
      min-h-screen
      grid
      md:grid-cols-2
    ">



      {/* Left */}
      <div className="
        hidden
        md:flex
        items-center
        justify-center
        bg-gradient-to-br
        from-indigo-600
        to-purple-700
        text-white
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
            mb-4
          ">
            SkillSync
          </h1>


          <p className="
            text-lg
          ">
            Smart Hiring Platform
          </p>

        </div>

      </div>




      {/* Right */}
      <div className="
        flex
        items-center
        justify-center
        bg-slate-50
      ">

        <form

          onSubmit={
            handleSubmit
          }

          className="
            bg-white
            p-10
            rounded-2xl
            shadow-xl
            w-full
            max-w-md
            space-y-5
          "

        >

          <h2 className="
            text-3xl
            font-bold
            text-center
          ">
            Login
          </h2>



          <input

            type="email"

            name="email"

            placeholder="
              Email
            "

            onChange={
              handleChange
            }

            className="
              w-full
              border
              p-3
              rounded-xl
              focus:outline-none
            "

          />



          <input

            type="password"

            name="password"

            placeholder="
              Password
            "

            onChange={
              handleChange
            }

            className="
              w-full
              border
              p-3
              rounded-xl
              focus:outline-none
            "

          />



          <button className="
            w-full
            bg-slate-900
            text-white
            p-3
            rounded-xl
          ">
            Sign In
          </button>



          <p className="
            text-center
          ">

            New user?

            {" "}

            <Link

              to="/register"

              className="
                text-indigo-600
              "

            >

              Register

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

}


export default Login;