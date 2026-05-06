import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from
  "react-hot-toast";

import api from
  "../services/api";


function Register() {

  const navigate =
    useNavigate();


  const [formData,
    setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      role: "candidate"

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

        await api.post(

          "/auth/register",

          formData

        );

        toast.success(
          "Account created"
        );

        navigate("/");

      } catch {

        toast.error(
          "Registration failed"
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
        from-slate-900
        to-indigo-700
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
            Create your account
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
            space-y-4
          "
        >

          <h2 className="
            text-3xl
            font-bold
            text-center
          ">
            Register
          </h2>


          <input
            name="name"
            placeholder="Full Name"
            onChange={
              handleChange
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />


          <input
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={
              handleChange
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          />


          <select
            name="role"
            onChange={
              handleChange
            }
            className="
              w-full
              border
              p-3
              rounded-xl
            "
          >

            <option value="candidate">
  Candidate
</option>

<option value="recruiter">
  Recruiter
</option>

          </select>


          <button className="
            w-full
            bg-slate-900
            text-white
            p-3
            rounded-xl
          ">
            Create Account
          </button>


          <p className="
            text-center
          ">

            Already registered?

            {" "}

            <Link
              to="/"
              className="
                text-indigo-600
              "
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>

  );

}

export default Register;