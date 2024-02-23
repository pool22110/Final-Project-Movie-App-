import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import './seatselect.css'
import Navbar from "../componants/Navbar/Menubar";
import { Button } from 'primereact/button';


const Seatselect = () => {
  const { theatername } = useParams();
  const { theaterid } = useParams();

  const [reservedseats, setReservedseat] = useState([]);
  const [emptyseats, setEmptyseat] = useState([]);
  const [selectedseats, setselectedseat] = useState([]);
  const[userdetails,setuserdetails]=useState()
  const [rows, setRows] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [coloumn, setColoum] = useState(["A", "B", "C", "D", "E"]);
  const [bookingResponse, setBookingresponse] = useState();
  const [theaterId, settheaterId] = useState();
  let user = localStorage.getItem("username")

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/userid/?username="+user)
    .then((response)=>{
      // console.log(response)
      setuserdetails(response.data["0"]["id"])
      console.log(response.data["0"]["id"])
    })
    .catch((errors)=>(
      console.log(errors)
    ))
 },[])

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seat_url = `http://127.0.0.1:8000/api/seats/?theater=${theatername}`;
        const response = await axios.get(seat_url);
        setReservedseat(response.data);
      } catch (error) {
        console.error("Error fetching seats", error);
      }
    };
    fetchSeats();
  }, [theatername]);

  useEffect(() => {
    const fetchid = async () => {
      try {
        const theater_url = `http://127.0.0.1:8000/api/theater/?theater=${theatername}`;
        const response = await axios.get(theater_url);
        settheaterId(response.data["0"]["id"]);
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    };

    fetchid();
  }, [theatername]);

  const handelselectedseat = (seat) => {
    if (selectedseats.includes(seat)) {
      setselectedseat((alreadySelectedseat) => {
        alreadySelectedseat.filter((s) => s !== seat);
      });
    } else {
      setselectedseat((alreadySelectedseat) => [...alreadySelectedseat, seat]);
    }
  };

  const handlebookticket = async (theaterid, seat) => {
    console.log(theaterid);
    const Data = {
      theater: theaterid,
      user: userdetails,
      total_price: seat.length * 120,
      seats: seat.join(),
    };
    console.log(Data)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tickets/",
        Data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Post request sucessful:", response.data);
      setBookingresponse(
        `total Price is ${seat.length * 150} and bookedseats: ${seat.join()}`
      );
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  console.log(selectedseats);

  return (
    <>
      <Navbar />

      <h1>{theatername}</h1>
      {/* <h1>{theaterid}</h1> */}
      <h2>Ticket price is 150 </h2>

      <center>
        <div className="container">
          {coloumn.map((col, colIndex) => (
            <div className="btn-row row">
              {rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <button
                    className={
                      "btn " +
                      (selectedseats.includes(`${col}${row}`)
                        ? "btn-selected"
                        : "") +
                      (reservedseats.includes(`${col}${row}`) ? "disable" : "")
                    }
                    onClick={() => handelselectedseat(`${col}${row}`)}
                  >
                    {col}
                    {row}
                  </button>
                  {(rowIndex + 1) % 10 === 0 &&
                    rowIndex !== rows.length - 1 && <br />}{" "}
                  {/* Add line break if not the last row */}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="hrline">
            <hr className="style-seven" size="20" width="100%" color="darkblue" />
            <p>SCREEN</p>
          </div>
      


      <center>
            <button
              onClick={() => handlebookticket(theaterid, selectedseats)}
              className={`book-btn ${
                selectedseats.length < 1 ? "disabled" : ""
              }`}
              disabled={selectedseats.length < 1}
            >
              BookTicket
            </button>
          </center>

          {bookingResponse && (
            <div className="response-container">
              <h3>Booking Response:</h3>
              <p>{JSON.stringify(bookingResponse, null, 2)}</p>
            </div>
          )}
        </center>

    </>
  );
};

export default Seatselect;
