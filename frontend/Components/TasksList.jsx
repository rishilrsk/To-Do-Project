import { useContext, useState } from "react";
import { loginContextObj } from "../contexts/LoginContext";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LiaEditSolid } from "react-icons/lia";

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
      `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/user-api/edit-todo/userid/${currentUser._id}/taskid/${taskBeingEdited._id}`,
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
      `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/user-api/edit-status/userid/${currentUser._id}/taskid/${taskid}`,
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
      `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/user-api/delete-todo/userid/${currentUser._id}/taskid/${taskid}`
    );
    if (res.status === 200) {
      setCurrentUser(res.data.payload);
    }
  };

  return (
    <div className="soft-card p-4 h-100">
      <h3 className="fw-bold mb-4" style={{ letterSpacing: '-0.5px' }}>Your Tasks</h3>

      <div className="d-flex flex-column gap-3">
        {(!currentUser?.todos || currentUser?.todos.length === 0) && (
           <p className="text-soft-secondary text-center py-5">No tasks found. Create one to get started!</p>
        )}
        {currentUser?.todos?.map((todoObj) => (
          <div key={todoObj._id} className="soft-card p-4 border-0" style={{ backgroundColor: 'var(--bg-color)', boxShadow: 'none' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h4 className="h5 fw-bold mb-2 text-dark">{todoObj.taskName}</h4>
                <span className={todoObj.status === 'completed' ? 'soft-badge-completed' : 'soft-badge-pending'}>
                  {todoObj.status}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-light shadow-sm text-secondary rounded-circle"
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => openModal(todoObj)}
                >
                  <LiaEditSolid size={18} />
                </button>
                <button
                  className="btn-close"
                  style={{ fontSize: '0.75rem', opacity: 0.5 }}
                  onClick={() => deleteTask(todoObj._id)}
                ></button>
              </div>
            </div>

            <p className="text-soft-secondary mb-3 mt-3">{todoObj.description}</p>

            {todoObj.status === "pending" && (
              <div className="mt-3 text-end border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                <button
                  className="soft-btn-success py-1 px-3"
                  style={{ fontSize: '0.85rem' }}
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
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ letterSpacing: '-0.5px' }}>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2 pb-4 px-4">
          <form onSubmit={handleSubmit(saveModifiedTask)}>
            <div className="mb-3 text-start">
              <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Task Name</label>
              <input
                type="text"
                {...register("taskName")}
                className="form-control soft-input w-100"
              />
            </div>
            <div className="mb-4 text-start">
              <label className="form-label fw-medium text-soft-secondary" style={{ fontSize: '0.875rem' }}>Description</label>
              <textarea
                {...register("description")}
                className="form-control soft-input w-100"
                rows="3"
              ></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-light" onClick={closeModal} style={{ fontWeight: 500 }}>
                Cancel
              </button>
              <button type="submit" className="soft-btn-primary px-4">
                Save Changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TaskList;
