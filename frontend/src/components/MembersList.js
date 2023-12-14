import React from "react";
import useMembersStore from "./ZustandStates/MembersListState";

const MembersList = () => {
 const members = useMembersStore((state) => state.Members);
  return (
    <div className="Members-list">
      <table>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Roles</th>
          <th>Admin?</th>
          <th>Phonenumber</th>
          <th>Organisation Name</th>
        </tr>
        {members.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.username}</td>
              <td>{val.roles}</td>
              <td>{val.isAdmin ? "Yes" : "No"}</td>
              <td>{val.phonenumber}</td>
              <td>{val.organisationName}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default MembersList;
