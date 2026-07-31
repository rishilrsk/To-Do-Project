import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [registerErr, setRegisterErr] = useState("");

  const navigate = useNavigate();

  //function to form submit
  const onFormSubmit = async (newUser) => {
    newUser.todos = [];
    console.log(newUser);
    try {
      //Make HTTP POST req tio create new User in Backend
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/user-api/user`,
        newUser
      );
      console.log("res is ", res);
      //if resourse is created
      if (res.status === 201) {
        //naviagte to login component programatically
        navigate("/login");
      } else {
        //display error message
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("err is ", err.response.data.message);
      setRegisterErr(err.response.data.message);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="soft-card p-4 p-md-5 w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ letterSpacing: '-0.5px' }}>Create an account</h2>
          <p className="text-soft-secondary mb-0">Sign up to start organizing your tasks.</p>
        </div>

        {/* display registration error message */}
        {registerErr.length !== 0 && (
          <div className="alert alert-danger py-2 px-3 text-center mb-4" style={{ borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
            {registerErr}
          </div>
        )}

        {/* registration form */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-4 text-start">
            <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control soft-input w-100"
              placeholder="John Doe"
            />
            {/* name vaildation error messages */}
            {errors.name?.type === "required" && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Name is required</p>
            )}
          </div>
          <div className="mb-4 text-start">
            <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Email address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="form-control soft-input w-100"
              placeholder="name@example.com"
            />
            {/* email vaildation error messages */}
            {errors.email?.type === "required" && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Email is required</p>
            )}
          </div>
          <div className="mb-4 text-start">
            <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="form-control soft-input w-100"
              placeholder="••••••••"
            />
            {/* name vaildation error messages */}
            {errors.password?.type === "required" && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Password is required</p>
            )}
          </div>
          <button type="submit" className="soft-btn-primary w-100 mt-2">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
