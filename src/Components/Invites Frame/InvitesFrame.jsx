import React, {useEffect, useState} from 'react';
import InviteCard from './InviteCard'

function InvitesFrame (){
    const rankedAPI = process.env.REACT_APP_API_URL
    
    useEffect(()=>{
        getInvites()
    },[])
    
    let [invites, setInvites] = useState()

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

    async function acceptInvite(id){
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/invite/accept`,{
            method: 'POST',
            body: JSON.stringify({tournament_id: id}),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        if (response.status < 300) getInvites()
    }

    async function declineInvite(id){
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/request/invite/decline`,{
            method: 'PUT',
            body: JSON.stringify({tournament_id: id}),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        if (response.status < 300) getInvites()
    }
    
    if (!invites || invites.length === 0){
        return(
            <div className="content">
                <h1>You don't have any pending Invites</h1>
            </div>
        )
    }
    return(
        <div className='content'>
            {invites.map(invite =>{
                return(
                    <div className="invite-card" key={invite.tournament_uuid}>
                        <InviteCard key={invite.tournament_uuid} tournament_id={invite.tournament_uuid}/>
                        <div className='button' onClick={()=>{acceptInvite(invite.tournament_uuid)}}>Accept</div>
                        <div className='delete' onClick={()=>{declineInvite(invite.tournament_uuid)}}>Decline</div>
                    </div>
                )
            })}
        </div>
    )
}

export default InvitesFrame