import React, {useEffect, useState} from 'react';
import OverviewFrame from '../Overview Frame/OverviewFrame'
import TournamentFrame from '../Tournament Frame/TournamentFrame'
import MatchesFrame from '../Matches Frame/MatchesFrame'

function ProfileFrame (props){

    useEffect(()=>{
        getUser()
    },[])

    let [content, setContent] = useState(<OverviewFrame/>)
    let [user, setUser] = useState()
    
    async function getUser(){

        const rankedAPI = process.env.REACT_APP_API_URL
        const headers = {
            'ranked-token': localStorage.getItem('ranked-token')
        }
        
        const response = await fetch(`${rankedAPI}/user/data`, {headers: headers})
        setUser(await response.json());
    }

    const styles= {
        backgroundColor: '#eee',
        backgroundImage: "url('https://rb.gy/jwmdnp')",
        backgroundPosition: 'center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        width: '160px',
        height: '160px',
    }

    if(user){
        return(
            <div>
                <div style={{display:'flex', padding: '20px 50px', backgroundColor: '#292e38',}}>
                    <div style={styles}>
                        Profile Pic
                    </div>
                    <div style={{flex: 3, marginLeft: '30px', color:'#eee'}}>
                        <h1>{user.username}</h1>
                        <h3>{user.state}, {user.country}</h3>
                        <div>
                            <h5>1st Tournament Name, Game</h5>
                            <h5>10th Tournament Name, Game</h5>
                            <h5>8th Tournament Name, Game</h5>
                        </div>
                    </div>
                    <div style={{flex: 3, marginLeft: '20px', color: '#eee'}}>
                        <h2>Favorite Games</h2>
                        <h3>Game 1</h3>
                        <h3>Game 2</h3>
                        <h3>Game 3</h3>
                    </div>
                    <div style={{alignSelf:'flex-end', backgroundColor:'gray', height:'25px', width:'25px'}}>
                        Settings
                    </div>
                </div>
                <div >
                    <ul className="home-menu">
                        <li onClick={() =>{setContent(<OverviewFrame/>)}}>Overview</li>
                        <li onClick={() =>{setContent(<TournamentFrame/>)}}>Tournaments</li>
                        <li onClick={() =>{setContent(<MatchesFrame/>)}}>Match History</li>
                    </ul>
                </div>
                <div className="content-container">
                    {content}
                </div>
            </div>
        )
    }
    return(
        <h1>Fetching Data</h1>
    )
}
export default ProfileFrame