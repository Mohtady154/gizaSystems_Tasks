import React from "react";

const DeleteButton = ({ userId, deleteUser }) => {
  const handleDelete = () => {
    deleteUser(userId);
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
