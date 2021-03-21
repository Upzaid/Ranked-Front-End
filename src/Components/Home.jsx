import React, {useEffect, useState} from 'react';
import TournamentFrame from './TournamentFrame'
import MatchHistoryFrame from './MatchHistoryFrame'
import ProfileFrame from './ProfileFrame'


function Home(){

    let [user, setUser] = useState()
    let [content, setContent] = useState(<ProfileFrame />)

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
                <nav>
                    <ul>
                        <li className='button' onClick={() =>{setContent(<ProfileFrame />)}}>My Profile</li>
                        <li className='button' onClick={() =>{setContent(<TournamentFrame />)}}>My Tournaments</li>
                        <li className='button' onClick={() =>{setContent(<MatchHistoryFrame />)}}>Match History</li>
                    </ul>
                </nav>
                {content}
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