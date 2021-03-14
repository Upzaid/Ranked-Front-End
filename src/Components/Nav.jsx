import React, {setState, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'


function Nav() {
    
    let [status, setStatus] = useState(false)
    
    useEffect(()=> {
        getStatus()
    },[])

    
    let getStatus = async () =>{
        const loggedIn = await fetch('http://localhost:5000/api/user/status', {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setStatus(await loggedIn.json())
    }
    
    if (status){
        return(
            <nav>
                <ul>
                    <Link to='/home'><li>Home</li></Link>
                    <Link to='/login'><li>Log Out</li></Link>
                </ul>
            </nav>
        )
    }
    else{
        return (
            <nav>
                <ul>
                    <Link to='/home'><li>Home</li></Link>
                    <Link to='/login'><li>Log In</li></Link>
                    <Link to='/register'><li>Register</li></Link>
                </ul>
            </nav>
           
        );
    } 
    
};

export default Nav;