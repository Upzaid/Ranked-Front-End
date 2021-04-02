import React, {useEffect, useState} from 'react';


function LandingPage(){
    let [status, setStatus] = useState(false)

    useEffect(()=> {
        getStatus()
        
    },[])

    // Get log in status to render acordingly
    let getStatus = async () =>{
        const loggedIn = await fetch(`${process.env.REACT_APP_API_URL}/user/status`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setStatus(await loggedIn.json())
        window.location.replace(`/home`)
    }

    return (
        <div className='landing-page'>
            <div className='logo'><h1>RANKDPRO.com</h1></div>
            <h4>ALPHA TESTING</h4>
        </div>
    );
};

export default LandingPage;