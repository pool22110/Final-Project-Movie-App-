    
import React,{useEffect,useState} from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import logo from './kisspng-photographic-film-movie-camera-cinema-website-and-mobile-application-development-service-5d3fc9250ede49.9926975015644613490609.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate=useNavigate()

    const handlelogin= ()=>{
        
        navigate('/login')
    }

    const [loginStatus, setLoginStatus] = useState(false);
    
    useEffect(() => {
        let token = localStorage.getItem("Access");
        if (!token) {
          setLoginStatus(false);
        //    navigate("/login");
        } else {
          setLoginStatus(true);
        }
      }, [loginStatus]);

      const onLogoutHandler = () => {
        localStorage.clear();
        setLoginStatus(false);
      };



    

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-bars',
            url:'/home'
        },
        {
            label: 'Movies',
            icon: 'pi pi-fw pi-desktop',
            url:"/allmovie"
           
        },
        {
            label: 'Summary',
            icon: 'pi pi-fw pi-user',
            url:"/summary"

        },
        // {
        //     label: 'Quit',
        //     icon: 'pi pi-fw pi-power-off',
            
        // }
    ];

    const start = <img alt="logo" src={logo} height="40" className="mr-2"></img>;
    // const end = <Button label="Login" link className="w-full" onClick={handlelogin} />;

    return (
        
        <div className="card">
            <Menubar model={items} start={start} end={loginStatus ? (
                 <Button className="" label="Logout"  severity="danger" onClick={onLogoutHandler} ></Button>
                    ) : (<Button className="" label="Login" severity="success" onClick={handlelogin}></Button>)} />   
        </div>
    )
}

        