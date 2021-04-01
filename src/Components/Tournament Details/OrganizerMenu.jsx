import React, {useEffect, useState} from 'react';
import PlayerList from './PlayerList'
import ReportMatch from './ReportMatch'
import MatchHistory from './MatchHistory'
import NewInvite from './NewInvite'

function OrganizerMenu (){
    let [content, setContent] = useState()
    let [closeButton, setCloseButton] = useState()

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
                <li onClick={()=>{placeContent(<MatchHistory/>)}}>Match History</li>
                <li onClick={()=>{placeContent(<NewInvite/>)}}>Send Invite</li>
            </div>
            <div>
                {closeButton}
                {content}
            </div>
        </div>
    )
}

export default OrganizerMenu