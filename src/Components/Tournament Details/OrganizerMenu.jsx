import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import PlayerList from './PlayerList'
import ReportMatch from './ReportMatch'
import MatchHistory from './MatchHistory'
import NewInvite from './NewInvite'
import Requests from './Requests'

function OrganizerMenu (){
    const rankedAPI = process.env.REACT_APP_API_URL
    let {tournament_id} = useParams()
    let [content, setContent] = useState()
    let [requests, setRequests] = useState([])
    let [closeButton, setCloseButton] = useState()

    useEffect(()=>{
        getRequests()
    },[content])

    // Get requests
    async function getRequests(){

        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/${tournament_id}/all`,{
            headers: {
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        setRequests(await response.json());
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
                <li onClick={()=>{placeContent(<PlayerList/>)}}>Player List</li>
                <li onClick={()=>{placeContent(<ReportMatch/>)}}>Report Matches</li>
                <li onClick={()=>{placeContent(<NewInvite/>)}}>Send Invite</li>
                <li onClick={()=>{placeContent(<Requests />)}}>Pending Requests {(!requests || requests.length ===0) ? null: `(${requests.length})`}</li>
                <li onClick={()=>{placeContent(<MatchHistory/>)}}>Match History</li>
            </div>
            <div>
                {closeButton}
                {content}
            </div>
        </div>
    )
}

export default OrganizerMenu