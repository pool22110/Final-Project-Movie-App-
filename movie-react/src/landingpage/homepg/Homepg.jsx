import styles from "./home.module.css" 
import axios from "axios";
// import Navbar from "../../componants/Navbar/navbar";
import Navbar from "../../componants/Navbar/Menubar";
import MovieCard from "../moviecard/moviecard";
import { Banner } from "../banner/banner";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";




export default function Homepage() {

    const [movies,setmovies] = useState([]);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/movies/")
        .then((response)=>{
            console.log(response)
            setmovies(response.data)
        })
    },[])

    
    return(
        <div>
            <Navbar />
            <div className={styles.containerhome}>
                <div className={styles.banner}>
                    <Banner />
                </div>
                {/* <DropdownBar/> */}
                <div className="row">
                    {
                        movies.map(m=>
                            <div key={m.id} className="col-md-3">
                               <Link to={`/movie/${m.id}`}>
                                    <MovieCard key={m.id} movie={m} />
                                </Link>
                            </div> )
                    }
                </div>
            </div>
        </div>
    )
}