import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginContextObj } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userLogin, loginErrMessage, loginStatus } =
    useContext(loginContextObj);
  const navigate = useNavigate();

  //login form submit
  const onLoginFormSubmit = (userCredObj) => {
    console.log(userCredObj);
    userLogin(userCredObj);
  };

  useEffect(() => {
    if (loginStatus === true) {
      //navigate to user profile
      navigate("/user-profile");
    }
  }, [loginStatus]);

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="soft-card p-4 p-md-5 w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ letterSpacing: '-0.5px' }}>Welcome back</h2>
          <p className="text-soft-secondary mb-0">Please enter your details to sign in.</p>
        </div>

        {/* display login error message */}
        {loginErrMessage.length !== 0 && (
          <div className="alert alert-danger py-2 px-3 text-center mb-4" style={{ borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
            {loginErrMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onLoginFormSubmit)}>
          <div className="mb-4 text-start">
            <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Email address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="form-control soft-input w-100"
              placeholder="name@example.com"
            />
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
            {errors.password?.type === "required" && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Password is required</p>
            )}
          </div>
          <button type="submit" className="soft-btn-primary w-100 mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;