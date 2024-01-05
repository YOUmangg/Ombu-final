import React from "react";
import "../App.css";

const PopUp = ({data}) => {
    // const data = data;
    var date = data.EventDate.toString().split('T', 1);
    // date.toString().split('').reverse().join('');
    return (
        <div className="pop-up-box">
            {/* <h2>{data.EventName}</h2> */}
            <h4>➡️Description: {data.EventDescription}</h4>
            <h4>➡️Venue: {data.EventVenue}</h4>
            <h4>➡️Date: {date}</h4>
            <h4>➡️Time: {data.EventTime}</h4>
            <h4>➡️Registration Link: {data.RegistrationLink} </h4>
        </div>
    )
}
// {data.EventDate.toString().split('T', 1)}
export default PopUp;