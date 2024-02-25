

import Navbar from "../../componants/Navbar/Menubar";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Moviedetailpanel from '../moviedetailpanel/moviedetailpanel';
import { Button } from 'primereact/button';
import styles from './moviedetails.module.css'

export default function Moviedetails() {
  const {id} =useParams();
  console.log(id)
  
  const [movie,setmovies] = useState([]);
  console.log(movie)
  console.log()
  //  to capture movie id
   
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/movies/?id='+id)
    .then((response)=>{
      // console.log(response)
      setmovies(response.data)
      
    })
    .catch((errors)=>(
      console.log(errors)
    ))
 },[id])
 
  
  if (!movie) {
    return <div>Loading...</div>;
  }
  
  
  return (
    <div>
      <Navbar/>
      <center>
      <div className={styles.container}>
        {movie.map((movie) => (
          <div key={movie.id}>
            <img  className="img" src={movie.image} alt="" width={300} height={300} />
            <p>Movie Name: {movie.title}</p>
            <p>About: {movie.description} </p>
            {/* <p>Release Date: {movie.release_date}</p> */}
            <p>Genre: {movie.genre}</p>
            <p>PG:{movie.altrating}</p>
            <p>Language: {movie.language} </p>
            {/* <p>Run Time: {movie.movie_length} mins </p> */}
            
            <Link to={{ pathname:`/theater/${movie.id}` }}>
              <Button className="bttn">Book Now</Button>
            </Link>
          </div>
        ))}
      </div>
      </center>
    </div>
  )
}

  
