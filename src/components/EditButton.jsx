import React from "react";
import EditModal from "../Modal/EditModal";

const EditButton = ({ user, updateUser }) => {
    return <>
    <EditModal user={user} updateUser={updateUser} />;
    </>
};

export default EditButton;
