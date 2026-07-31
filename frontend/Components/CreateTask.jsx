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
    reset
  } = useForm();

  const onSubmitNewtask = async (newTask) => {
    console.log(newTask);
    let res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/user-api/todo/${currentUser._id}`,
      newTask,
      {
        withCredentials: true,
      }
    );
    console.log("res is ", res);
    if (res.data.message === "todo added") {
      setCurrentUser(res.data.payload);
      reset(); // clear form
    }
  };

  return (
    <div className="soft-card p-4 h-100">
      <h3 className="fw-bold mb-4" style={{ letterSpacing: '-0.5px' }}>Create Task</h3>
      <form onSubmit={handleSubmit(onSubmitNewtask)}>
        <div className="mb-3 text-start">
          <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Task Name</label>
          <input
            type="text"
            {...register("taskName", { required: true })}
            className="form-control soft-input w-100"
            placeholder="e.g. Buy groceries"
          />
          {errors?.taskName?.type === "required" && (
            <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Task name is required</p>
          )}
        </div>
        <div className="mb-4 text-start">
          <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="form-control soft-input w-100"
            placeholder="Details about the task"
            rows="3"
          ></textarea>
          {errors?.description?.type === "required" && (
            <p className="text-danger mt-1 mb-0" style={{ fontSize: '0.8rem' }}>Description is required</p>
          )}
        </div>
        <button type="submit" className="soft-btn-primary w-100">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
