import React, {useEffect, useState} from 'react';


function Home(){

    let[user, setUser] = useState()

    useEffect(()=> {
        getUser()
    },[])

    // Get log in status to render acordingly
    let getUser = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/status`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        setUser(await response.json())
    }
    if(user){
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
    return(
        <h1>Not Logged In</h1>
    )
};

export default Home;