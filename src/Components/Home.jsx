import React, {useEffect, useState} from 'react';
import TournamentFrame from './TournamentFrame'
import MatchHistoryFrame from './MatchHistoryFrame'
import ProfileFrame from './ProfileFrame'


function Home(){

    let [user, setUser] = useState()
    let [content, setContent] = useState([])

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
                <ul>
                    <li onClick={() =>{setContent(<ProfileFrame />)}}>My Profile</li>
                    <li onClick={() =>{setContent(<TournamentFrame />)}}>My Tournaments</li>
                    <li onClick={() =>{setContent(<MatchHistoryFrame />)}}>Match History</li>
                </ul>
                <div>
                    {content}
                </div>
            </div>
        );
    }
    return(

        <div>
            <h1>Not Logged In</h1>
        </div>
    )
};

export default Home;