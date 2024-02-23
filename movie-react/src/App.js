import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css"; 
//icons
import "primeicons/primeicons.css"; 

// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
import SignUp from "./user/Signup";
import Login from "./user/Login";
import Homepage from "./landingpage/homepg/Homepg";
import Moviedetails from "./Moviedetailpage/moviedetails/moviedetails";
import TheaterSelect from "./theaterpage/TheaterSelect";
import Seatselect from "./Seatselectpage/Seatselect";
import DropdownBar from "./componants/searchbar/searchbar";
import Moviepage from "./moviespage/moviepage";
import Summary from "./Summarypage/Summary";

function App() {
  return (
    // <PrimeReactProvider>
    <Router>
      <Routes>
        
        <Route path="/home" element={<Homepage/>}> </Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/movie/:id' element={<Moviedetails/>}></Route>
        <Route path='/theater/:id' element={<TheaterSelect/>}></Route>
        <Route path="/booking/:theatername/:theaterid" element={<Seatselect/>} />
        <Route path="/allmovie" element={<Moviepage/>}></Route>
        <Route path="/moviepg" element={<DropdownBar/>}></Route>
        <Route path="/summary" element={<Summary/>}></Route>  
        

        

      </Routes>
    </Router>
    // </PrimeReactProvider>
  );
}

export default App;
