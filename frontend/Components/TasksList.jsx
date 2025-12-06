import { useContext, useState } from "react";
import { loginContextObj } from "../contexts/LoginContext";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

function TaskList() {
  const { currentUser, setCurrentUser } = useContext(loginContextObj);
  const { register, handleSubmit, setValue } = useForm();

  //modal state
  const [modalState, setModalState] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const openModal = (taskObj) => {
    setModalState(true);
    setValue("taskName", taskObj.taskName);
    setValue("description", taskObj.description);
    setTaskBeingEdited(taskObj);
  };

  const closeModal = () => {
    setModalState(false);
  };

  //save modified task
  const saveModifiedTask = async (modifiedTaskObj) => {
    let res = await axios.put(
      `http://localhost:3000/user-api/edit-todo/userid/${currentUser._id}/taskid/${taskBeingEdited._id}`,
      modifiedTaskObj,
      {
        withCredentials: true,
      }
    );


    if (res.status === 200) {
      setCurrentUser(res.data.payload);
      //close modal
      closeModal();
    }
  };

  const setTaskCompleted = async (taskid) => {
    let res = await axios.put(
      `http://localhost:3000/user-api/edit-status/userid/${currentUser._id}/taskid/${taskid}`,
      null,
      { withCredentials: true }
    );
    console.log(res);
    if (res.status === 200) {
      setCurrentUser(res.data.payload);
    }
  };

  //delete a task
  const deleteTask = async (taskid) => {
    let res = await axios.put(
      `http://localhost:3000/user-api/delete-todo/userid/${currentUser._id}/taskid/${taskid}`
    );
    if (res.status === 200) {
      setCurrentUser(res.data.payload);
    }
  };

  return (
    <div>
      <h1 className="text-center">List of Tasks</h1>

      {/* Main List Container */}
      <div className="w-50 mx-auto mt-5">
        {currentUser?.todos.map((todoObj) => (
          <div key={todoObj._id} className="mb-3 border rounded p-3 bg-light">
            {/* Header: Status Badge (Left) | Edit & Close (Right) */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-warning text-dark p-2">
                {todoObj.status}
              </span>
              <div className="d-flex align-items-center">
                {/* Edit Button */}
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => openModal(todoObj)}
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="btn btn-close"
                  onClick={() => deleteTask(todoObj._id)}
                ></button>
              </div>
            </div>

            {/* Content */}
            <h2 className="h4">{todoObj.taskName}</h2>
            <p className="text-secondary">{todoObj.description}</p>

            {/* Mark as Completed Button (Conditional) */}
            {todoObj.status === "pending" && (
              <div className="mt-3">
                <button
                  className="btn btn-success p-2 px-4 w-100"
                  onClick={() => setTaskCompleted(todoObj._id)}
                >
                  Mark as completed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Task Modal */}
      <Modal show={modalState} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveModifiedTask)}>
            <div className="mb-3">
              <input
                type="text"
                {...register("taskName")}
                className="form-control p-3"
                placeholder="Task Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                {...register("description")}
                className="form-control p-3"
                placeholder="Task Description"
              />
            </div>
            <div className="">
              <button type="submit" className="btn btn-primary p-2 px-4 w-100">
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TaskList;
