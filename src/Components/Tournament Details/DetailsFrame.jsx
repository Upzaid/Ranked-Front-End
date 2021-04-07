import React, {useState, useRef} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

function DetailsFrame(props){
    
    let quillRef = useRef()
    function getQuill (){
        console.log(quillRef.current.getEditor().editor.delta);
    }

    return(
        <div className="quill-container">
            <ReactQuill ref={quillRef}
                theme={props.organizer ? 'snow' : 'bubble'}
                readOnly={props.organizer ? false : true} 
                value={props.details}/>
            {props.organizer ? <div onClick={()=>getQuill()} className="button">SAVE CHANGES</div>: null}
        </div>
    )
}


export default DetailsFrame

