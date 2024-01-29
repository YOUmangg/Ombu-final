import React from "react";
import { Table, TableBody, TableHead, TableRow } from "flowbite-react";
import useMembersStore from "./ZustandStates/MembersListState";

const MembersList = () => {
  const members = useMembersStore((state) => state.Members);
  return (
    <Table hoverable striped>
      <TableHead>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Username</Table.HeadCell>
        <Table.HeadCell>Roles</Table.HeadCell>
        <Table.HeadCell>Admin</Table.HeadCell>
        <Table.HeadCell>Phonenumber </Table.HeadCell>
        <Table.HeadCell>Organization Name</Table.HeadCell>
      </TableHead>
      <TableBody>
        {members && members.map((val, key) => {
          return (
            <Table.Row key = {key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{val.name}</Table.Cell>
              <Table.Cell>{val.username}</Table.Cell>
              <Table.Cell>{val.roles}</Table.Cell>
              <Table.Cell>{val.isAdmin ? "YES" : "NO"}</Table.Cell>
              <Table.Cell>{val.phonenumber}</Table.Cell>
              <Table.Cell>{val.organisationName}</Table.Cell>
            </Table.Row>
          );
        }
        )
      }
      </TableBody>
    </Table>
    // <div className="Members-list">
    //   <table>
    //     <tr>
    //       <th>Name</th>
    //       <th>Username</th>
    //       <th>Roles</th>
    //       <th>Admin?</th>
    //       <th>Phonenumber</th>
    //       <th>Organisation Name</th>
    //     </tr>
    //     {members.map((val, key) => {
    //       return (
    //         <tr key={key}>
    //           <td>{val.name}</td>
    //           <td>{val.username}</td>
    //           <td>{val.roles}</td>
    //           <td>{val.isAdmin ? "Yes" : "No"}</td>
    //           <td>{val.phonenumber}</td>
    //           <td>{val.organisationName}</td>
    //         </tr>
    //       );
    //     })}
    //   </table>
    // </div>
  );
};
export default MembersList;
