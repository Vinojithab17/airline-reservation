import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import moment from "moment";
import BookingForm from "./BookingForm";

export default function FlightCard() {
  //retrive the passed data
  const location = useLocation();
  const flights = location.state.flights_result;
  const return_flights=location.state.return_flights_result;

  const [seatDet, setSeatDet] = useState(null);

  console.log(location.state)



  return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
      <div style={{marginRight:"10vw"}}>
      <div className="forward-heading row">
        <div class="forward-from col">{location.state.depAirCode}</div>
        <i class="bi bi-arrow-right-circle col"></i>
        <div class="forward-to col">{location.state.desAirCode}</div>
      </div>
      {flights.map(
        ({ flight_id, takeoff_time, departure_time, aircraft_id }) => (
          // <div  style={{ marginTop:"20px"}}>

          <Card
            border="primary"
            style={{
              width: "18rem",
              marginTop: "20px",
              backgroundColor: "rgba(255, 255, 255, .55)",
              backdropFilter: "blur(12px)",
              border: "white 2px",
            }}
            onClick={async () => {
              const response = await fetch("/flightCard", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  flight_id,
                  aircraft_id,
                }),
              });

              const seat_details = await response.json();
              let eco_booked = seat_details.seatData.value.eco_booked_seats;
              let busi_booked = seat_details.seatData.value.busi_booked_seats;
              let plat_booked = seat_details.seatData.value.plat_booked_seats;

              let eco_seats = seat_details.seatData.value.Economy_seats;
              let busi_seats = seat_details.seatData.value.Business_seats;
              let plat_seats = seat_details.seatData.value.Platinum_seats;

              setSeatDet({
                flight_id,
                eco_booked,
                busi_booked,
                plat_booked,
                aircraft_id,
                eco_seats,
                busi_seats,
                plat_seats,
              });

              document.querySelector(".booking-window").style.display = "block";
            }}
          >
            <Card.Header>
              <div style={{ float: "left" }}>Departure</div>
              <div style={{ float: "right" }}>Arrival</div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <div style={{ float: "left", fontSize: "12px" }}>
                  {moment(takeoff_time).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div style={{ float: "right", fontSize: "12px" }}>
                  {moment(departure_time).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </Card.Title>
              <Card.Text>
                <div style={{ marginTop: "20px" }} className="flightId">
                  flight id : {flight_id}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      )}
      </div>
      {location.state.checkBox===1 && 
      <div>
      <div className="forward-heading row">
        <div class="forward-from col">{location.state.desAirCode}</div>
        <i class="bi bi-arrow-right-circle col"></i>
        <div class="forward-to col">{location.state.depAirCode}</div>
      </div>


{return_flights.map(
        ({ flight_id, takeoff_time, departure_time, aircraft_id }) => (
          // <div  style={{ marginTop:"20px"}}>

          <Card
            border="primary"
            style={{
              width: "18rem",
              marginTop: "20px",
              backgroundColor: "rgba(255, 255, 255, .55)",
              backdropFilter: "blur(12px)",
              border: "white 2px",
            }}
            onClick={async () => {
              const response = await fetch("/flightCard", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  flight_id,
                  aircraft_id,
                }),
              });

              const seat_details = await response.json();
              let eco_booked = seat_details.seatData.value.eco_booked_seats;
              let busi_booked = seat_details.seatData.value.busi_booked_seats;
              let plat_booked = seat_details.seatData.value.plat_booked_seats;

              let eco_seats = seat_details.seatData.value.Economy_seats;
              let busi_seats = seat_details.seatData.value.Business_seats;
              let plat_seats = seat_details.seatData.value.Platinum_seats;

              setSeatDet({
                flight_id,
                eco_booked,
                busi_booked,
                plat_booked,
                aircraft_id,
                eco_seats,
                busi_seats,
                plat_seats,
              });

              document.querySelector(".booking-window").style.display = "block";
            }}
          >
            <Card.Header>
              <div style={{ float: "left" }}>Departure</div>
              <div style={{ float: "right" }}>Arrival</div>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <div style={{ float: "left", fontSize: "12px" }}>
                  {moment(takeoff_time).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                <div style={{ float: "right", fontSize: "12px" }}>
                  {moment(departure_time).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </Card.Title>
              <Card.Text>
                <div style={{ marginTop: "20px" }} className="flightId">
                  flight id : {flight_id}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      )}
      </div>
    } 
      <BookingForm seatDet={seatDet} />
    </div>
  );
}
