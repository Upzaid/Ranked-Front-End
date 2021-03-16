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
        <div>
            <h1>Landing Page</h1>
        </div>
    );
};

export default LandingPage;