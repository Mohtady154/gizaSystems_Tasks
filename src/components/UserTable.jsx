import React from "react";
import { Table } from "react-bootstrap";
import DetailsButton from "./DetailsButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const UserTable = ({ users, updateUser, deleteUser }) => {
  return <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <DetailsButton user={user} />
                <EditButton user={user} updateUser={updateUser} />
                <DeleteButton userId={user.id} deleteUser={deleteUser} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </>
};

export default UserTable;
