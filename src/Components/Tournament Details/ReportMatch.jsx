import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

function ReportMatch(props){
    // TODO Functionality

    const rankedAPI = process.env.REACT_APP_API_URL

    let [message, setMessage] = useState()
    let {tournament_id} = useParams()

    async function submitMatch() {
        const match = {
            tournament_id: tournament_id,
            player1: document.getElementById('player1').options[document.getElementById('player1').selectedIndex].text,
            player2: document.getElementById('player2').options[document.getElementById('player2').selectedIndex].text,
            p1_wins: document.getElementById('p1wins').value,
            p2_wins: document.getElementById('p2wins').value
        }
        
        await fetch(`${rankedAPI}/match/submit`,{
            method: 'POST',
            body: JSON.stringify(match),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
    }

    return(
        <div className="content-container">
            <h1>Report Match</h1>
            
            <form onSubmit={e =>{e.preventDefault()}} className="">
                <label htmlFor="">Player 1: </label>
                <select name="" id="player1">
                    <option value=""></option>
                    {props.players.map(player =>{
                        return(
                            <option value="">{player.username}</option>
                        )
                    })}
                </select>
                <label htmlFor="">Player 2: </label>
                <select name="" id="player2">
                    <option value=""></option>
                    {props.players.map(player =>{
                        return(
                            <option value="">{player.username}</option>
                        )
                    })}
                </select>
                <br/>
                <label htmlFor="p1wins">Player 1 wins:</label>
                <input type="number" name="p1wins" id="p1wins" min="0"/>
                <label htmlFor="p2wins">Player 2 wins:</label>
                <input type="number" name="p2wins" id="p2wins" min="0"/>
                <br/>
                <button className="button" onClick={()=>{submitMatch()}}>SEND RESULT</button>
            </form>
        </div>
    )
}

export default ReportMatch