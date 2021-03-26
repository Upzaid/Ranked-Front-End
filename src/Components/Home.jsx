import React, {useEffect, useState} from 'react';
import ProfileFrame from './Profile Frame/ProfileFrame'


function Home(){

    let [user, setUser] = useState()

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
                <ProfileFrame />
            </div>
        );
    }
    return(
        <div className='landing-page'>
            <h1>PLEASE LOG IN TO SEE THIS PAGE</h1>
        </div>
    )
};

export default Home;