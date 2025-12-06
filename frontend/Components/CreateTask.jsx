import { useForm } from "react-hook-form";
import { useContext } from "react";
import { loginContextObj } from "../contexts/LoginContext";
import axios from "axios";

function CreateTask() {
  let { currentUser, setCurrentUser } = useContext(loginContextObj);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitNewtask = async (newTask) => {
    console.log(newTask);
    let res = await axios.put(
      `http://localhost:3000/user-api/todo/${currentUser._id}`,
      newTask,
      {
        withCredentials: true,
      }
    );
    console.log("res is ", res);
    if (res.data.message === "todo added") {
      setCurrentUser(res.data.payload);
    }
  };

  return (
    <div>
      <h1 className="text-center">Create Task</h1>
      <form
        className="w-50 mx-auto mt-5"
        onSubmit={handleSubmit(onSubmitNewtask)}
      >
        <div className="mb-3">
          <input
            type="text"
            {...register("taskName", { required: true })}
            className="form-control p-3"
            placeholder="Task Name"
          />
          {errors?.taskName?.type === "required" && (
            <p className="text-danger">Task name is required</p>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            {...register("description", { required: true })}
            className="form-control p-3"
            placeholder="Task Description"
          />
          {errors?.description?.type === "required" && (
            <p className="text-danger">Task Description is required</p>
          )}
        </div>
        <div className="">
          <button type="submit" className="btn btn-primary p-2 px-4 w-100">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
