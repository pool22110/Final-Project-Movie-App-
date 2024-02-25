import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../componants/Navbar/Menubar";
import "./summary.css"


export default function Summary () {
    const[data,setData] = useState([])
    const[theaterdata,setTheaterdata]= useState([])
    const username =localStorage.getItem('username')
    // const username ="vento"
    var url=''

    useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            if (username) {
              url = `http://127.0.0.1:8000/api/tickets/?username=${username}`;
            }
            const response = await axios.get(url);
            setData(response.data);
    
            // Fetch theater data for each ticket
            const theaterDataPromises = response.data.map(async (ticket) => {
              const theaterUrl = `http://127.0.0.1:8000/api/movieticket/?theaterid=${ticket.theater_id}`;
              const theaterResponse = await axios.get(theaterUrl);
              return theaterResponse.data;
            });
    
            // Wait for all theater data to be fetched
            const theaterDetails = await Promise.all(theaterDataPromises);
            setTheaterdata(theaterDetails);
          } catch (error) {
            console.error("Error fetching movie details:", error);  
          }
        };
    
        fetchMovieDetails();
      }, []);

      return(
        <div>
          <Navbar/>
          <div className="background-ticket">
          <h1>Tickets details of {username}</h1>
          {data.map((ticket, index) => (
        <div className="dashboardclass" key={ticket.id}>
          <p className="ptickets">Ticketnumber : {index+1}</p>
          {/* <p className="ptickets">Theater : {ticket.theater_id}</p> */}
          <p className="ptickets">Seats: {ticket.seats}</p>
          <p className="ptickets">Total Price : {ticket.total_price}</p>
          {theaterdata[index] && (
            <>
              <p className="ptickets">Movie Name : {theaterdata[index].moviename}</p>
              <p className="ptickets">Theater Name : {theaterdata[index].name}</p>
              <p className="ptickets">City : {theaterdata[index].city} </p>
              <p className="ptickets">Show Time : {theaterdata[index].movie_timing}</p>
              {/* Add other theater-related information here */}
            </>
          )}
        </div>
      ))}
      </div>
        </div>
      )






}