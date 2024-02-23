
import { useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../componants/Navbar/Menubar";
import MovieCard from "../landingpage/moviecard/moviecard";
import styles from "./moviepage.module.css"



function Moviepage() {
    const [movies,setmovies] = useState([]);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/movies/")
        .then((response)=>{
            console.log(response)
            setmovies(response.data)
        })
    },[])


    return ( 
        <div className="">
            <Navbar/>
            <div className={styles.home}>
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
     );
}

export default Moviepage;