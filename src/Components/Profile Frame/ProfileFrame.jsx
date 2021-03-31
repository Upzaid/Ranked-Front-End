import React, {useEffect, useState} from 'react';
import OverviewFrame from '../Overview Frame/OverviewFrame'
import TournamentFrame from '../Tournament Frame/TournamentFrame'
import MatchesFrame from '../Matches Frame/MatchesFrame'
import InvitesFrame from '../Invites Frame/InvitesFrame'

function ProfileFrame (){

    const rankedAPI = process.env.REACT_APP_API_URL

    let [content, setContent] = useState(<OverviewFrame/>)
    let [user, setUser] = useState()
    let [invites, setInvites] =useState()

    useEffect(()=>{
        getUser()
    },[])

    useEffect(()=>{
        getInvites()
    },[content])
   
    
    async function getUser(){
        
        const headers = {
            'ranked-token': localStorage.getItem('ranked-token')
        }
        
        const response = await fetch(`${rankedAPI}/user/data`, {headers: headers})
        setUser(await response.json());
    }

    async function getInvites (){
        const headers = {
            'ranked-token': localStorage.getItem('ranked-token')
        }
        
        const response = await fetch(`${rankedAPI}/request/invites`, {headers: headers})
        const inviteArray = (await response.json())
        let newArray = []
        for(let i = 0; i < inviteArray.length; i++){
            if (inviteArray[i].status === 'PENDING'){
                newArray.push(inviteArray[i])
            }
        }
        setInvites(newArray)        
    }

    const styles= {
        backgroundColor: '#eee',
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
                        <li onClick={() =>{setContent()}}>Find Tournaments</li>
                        <li onClick={() =>{setContent(<InvitesFrame />)}}>Invites { (!invites || invites.length === 0) ? null : `(${invites.length})`}</li>
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