import {React, useEffect, useState} from 'react'

function MatchesFrame(){

    useEffect(()=>{
        getMatches()
    },[])

    const rankedAPI = process.env.REACT_APP_API_URL

    async function getMatches() {
        const response = await fetch(`${rankedAPI}/match/user/all`,{
            headers:{
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
        console.log(await response.json());
    }

    return(
        <div className='content'>
            <h1>Match History</h1>
        </div>
    )
}

export default MatchesFrame