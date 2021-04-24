import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import PlayerList from './PlayerList'
import ReportMatch from './ReportMatch'
import MatchHistory from './MatchHistory'
import NewInvite from './NewInvite'
import Requests from './Requests'
import LocalPlayers from'./LocalPlayers'

function OrganizerMenu (){
    const rankedAPI = process.env.REACT_APP_API_URL
    let {tournament_id} = useParams()
    let [content, setContent] = useState()
    let [requests, setRequests] = useState([])
    let [closeButton, setCloseButton] = useState()
    let [playerList, setPlayerList] = useState([])

    useEffect(()=>{
        getRequests()
        getPlayerList()
    },[content])

    // Get requests
    async function getRequests(){

        const response = await fetch(`${rankedAPI}/request/${tournament_id}/all`,{
            headers: {
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        const requestArray = await response.json()
        let newArray = []
        for(let i = 0; i < requestArray.length; i++){
            if(requestArray[i].status === 'PENDING'){
                newArray.push(requestArray[i])
            }
        }
        setRequests(newArray)
    }

    // Get player list
    
    async function getPlayerList(){

        const response = await fetch(`${rankedAPI}/tournament/${tournament_id}/players`,{
            headers: {
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        if (response.status < 300) setPlayerList(await response.json())
    }

    // Close button

    function closeContent(){
        setContent()
        setCloseButton()
    }

    function placeContent(content){
        const button = <div className="delete" onClick={()=>{closeContent()}}>Close</div>
        setContent(content)
        setCloseButton(button)
    }

    return(
        <div>
            <div className="home-menu">
                <li onClick={()=>{placeContent(<PlayerList players={playerList}/>)}}>Player List</li>
                <li onClick={()=>{placeContent(<ReportMatch  players={playerList}/>)}}>Report Matches</li>
                <li onClick={()=>{placeContent(<LocalPlayers />)}}>Local Players</li>
                <li onClick={()=>{placeContent(<NewInvite/>)}}>Send Invite</li>
                <li onClick={()=>{placeContent(<Requests />)}}>Pending Requests {(!requests || requests.length ===0) ? null: `(${requests.length})`}</li>
                <li onClick={()=>{placeContent(<MatchHistory tournament_id = {tournament_id}/>)}}>Match History</li>
            </div>
            <div>
                {closeButton}
                {content}
            </div>
        </div>
    )
}

export default OrganizerMenu