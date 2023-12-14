import React from "react";
import useProgressSheetStore from "./ZustandStates/ProgressSheetState";

const ProgressSheet = () => {
    const value = useProgressSheetStore((state) => state.Progress);
  return (
    <div className="progress-sheet">
      <table>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Available?</th> {/* implement this: if they have a current task: false, else true.
          you can check with the deadline column*/}
          <th>Tasks done</th>
          <th>Score</th>
        </tr>
        {value.map((val, key) => {
          return (
            <tr key={key}>
                <td>{val.username}</td>
                <td>{val.nameofperson}</td>
              <td>{val.name}</td>       {/* implement a function which checks for it*/}
              <td>{val.description}</td> {/* this will show few tasks which the person has done. on clicking on it
              all the tasks which the person has done will be visible in a pop up box*/}
              <td>{val.score}</td>   {/*total score of the tasks which the person has done */}
            </tr>
          );
        })}
      </table>
    </div>
  )
}

export default ProgressSheet;