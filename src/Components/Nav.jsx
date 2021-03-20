import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function Nav() {
    const rankedAPI = process.env.REACT_APP_API_URL
    let [status, setStatus] = useState(false)
    
    useEffect(()=> {
        getStatus()
    },[])

    // Get log in status to render acordingly
    let getStatus = async () =>{
        const loggedIn = await fetch(`${process.env.REACT_APP_API_URL}/user/status`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setStatus(await loggedIn.json())
    }
    
    function logOut (){
        localStorage.removeItem('ranked-token')
        window.location.replace('/')
    }

    if (status){
        return(
            <nav>
                <ul>
                    <Link to='/home'><li className='button'>Home</li></Link>
                    <Link to='/'><li className='button' onClick={()=> logOut()}>Log Out</li></Link>
                </ul>
            </nav>
        )
    }
    else{
        return (
            <nav>
                <ul>
                    <Link to='/login'><li className='button'>Log In</li></Link>
                    <Link to='/register'><li className='button'>Register</li></Link>
                </ul>
            </nav>
        );
    } 
};

export default Nav;