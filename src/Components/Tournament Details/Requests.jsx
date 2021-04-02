import React, {useEffect, useState} from 'react';
import {useParams, usePrams} from 'react-router-dom'
import RequestCard from './RequestCard'

function Requests(){
    let {tournament_id} = useParams()
    let [requests, setRequests] = useState([])

    useEffect(()=>{
        getRequests()
    },[])

    // Get requests
    async function getRequests(){

        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/${tournament_id}/all`,{
            headers: {
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        setRequests(await response.json());
    }

    // TODO Accept request

    async function acceptRequest(){
        alert('Request Accepted')
    }

    // TODO Decline request

    async function declineRequest(){
        alert('Request Declined')
        
    }

    return(
        <div className="content">
            {requests.map(request =>{
                return(
                    <div key={request.username} className="invite-card">
                        <RequestCard request={request}/>
                        <div className='button' onClick={()=>{acceptRequest()}}>Accept</div>
                        <div className='delete' onClick={()=>{declineRequest()}}>Decline</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests