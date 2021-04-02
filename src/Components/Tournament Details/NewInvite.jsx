import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

function NewInviteFrame(){

    const rankedAPI = process.env.REACT_APP_API_URL

    let [player, setPlayer] = useState([])
    let {tournament_id} = useParams()
    let [error, setError] = useState()

    async function findPlayer(){
        const username = document.getElementById('usersearchbar').value
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}/find`, {headers: {'ranked-token': localStorage.getItem('ranked-token')}})
        if (response.status < 300) {
            setPlayer([await response.json()]);
            setError()
            return
        } 
        setPlayer([])
        setError(<p className="error"> USER DOES NOT EXIST</p>)
    }

    async function sendInvite(username){
        const confirmation = window.confirm(`Do you want to send an invitation to ${username}`)
        if(confirmation){
            const response = await fetch(`${process.env.REACT_APP_API_URL}/request/${username}/invite`,{
                method: 'POST',
                body: JSON.stringify({tournament_id: tournament_id}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ranked-token': localStorage.getItem('ranked-token')
                }
            })
            if(response.status < 300) {
                alert('Invite sent succesfully')
            }
            setPlayer([])
        }
    }

    return(
        <form className="content-container new-invite" onSubmit={e => e.preventDefault()}>
            <h1>New Invite</h1>
            <h2>Find a user</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="usersearchbar"/>
            <button type="submit" className="button" onClick={()=>{findPlayer()}}>Find</button>
            {error}
            {player.map ((player)=>{
                return(
                    <div >
                        <h2>{player.username}</h2>
                        <h3>{player.state}, {player.country}</h3>
                        <div className="button" onClick={()=>{sendInvite(player.username)}}>SEND INVITE</div>
                    </div>
                )
            })}
        </form>
    )
}

export default NewInviteFrame