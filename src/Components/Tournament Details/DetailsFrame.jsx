import React, {useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

function DetailsFrame(props){
    
    const rankedAPI = process.env.REACT_APP_API_URL
    let {tournament_id} = useParams()
    let quillRef = useRef()

    async function saveChanges(){
        const details = {details : quillRef.current.getEditor().editor.delta}
        
        const response = await fetch(`${rankedAPI}/tournament/${tournament_id}/details`,{
            body: JSON.stringify(details),
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ranked-token': localStorage.getItem('ranked-token')
            }
        })
    }
    

    return(
        <div className="quill-container">
            {props.organizer ? <p>Add the details of the tournament below</p>:null}
            <ReactQuill ref={quillRef}
                theme={props.organizer ? 'snow' : 'bubble'}
                readOnly={props.organizer ? false : true} 
                value={props.details}/>
            {props.organizer ? <div onClick={()=>saveChanges()} className="button">SAVE CHANGES</div>: null}
        </div>
    )
}


export default DetailsFrame

