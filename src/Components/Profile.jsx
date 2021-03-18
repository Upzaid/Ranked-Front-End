import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

function Profile (){
    let {username} = useParams()

    return(
        <h1>Username: {username}</h1>
    )
}

export default Profile;