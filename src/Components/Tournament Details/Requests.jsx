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
        const requestArray = await response.json()
        let newArray = []
        for(let i = 0; i < requestArray.length; i++){
            if(requestArray[i].status === 'PENDING'){
                newArray.push(requestArray[i])
            }
        }
        setRequests(newArray)
    }

    // Accept request

    async function acceptRequest(username){
        const payload = {
            tournament_id: tournament_id,
            username: username
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/accept`,{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        if (response.status < 300) getRequests()
    }

    // Decline request

    async function declineRequest(username){
        const payload = {
            tournament_id: tournament_id,
            username: username
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/decline`,{
            method:'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token' : localStorage.getItem('ranked-token')
            }
        })
        if (response.status < 300) getRequests()
        
    }
    if(!requests || requests.length === 0){
        return(
            <div className="content-container">
                    <h1>No Pending Requests</h1>
            </div>
        )
    }
    return(
        <div className="content">
            {requests.map(request =>{
                return(
                    <div key={request.username} className="invite-card">
                        <RequestCard request={request}/>
                        <div className='button' onClick={()=>{acceptRequest(request.username)}}>Accept</div>
                        <div className='delete' onClick={()=>{declineRequest(request.username)}}>Decline</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests