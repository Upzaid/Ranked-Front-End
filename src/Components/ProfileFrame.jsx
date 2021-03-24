import React, {useEffect, useState} from 'react';

function ProfileFrame (props){

    const styles= {
        backgroundColor: 'red',
        backgroundImage: "url('https://rb.gy/jwmdnp')",
        backgroundPosition: 'center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        width: '160px',
        height: '160px',
        
    }

    return(
        <div style={{display:'flex', justifyContent: 'space-around'}}>
            <div style={styles}>
                Profile Pic
            </div>
            <div >
                <h1>Username</h1>
                <h3>State, Country</h3>
                <div>
                    <h6>1st Tournament Name, Game</h6>
                    <h6>10th Tournament Name, Game</h6>
                    <h6>8th Tournament Name, Game</h6>
                </div>
            </div>
            <div>
                <h2>Favorite Games</h2>
                <h3>Game 1</h3>
                <h3>Game 2</h3>
                <h3>Game 3</h3>
            </div>
            <div style={{alignSelf:'flex-end', backgroundColor:'gray', height:'25px', width:'25px'}}>
                Settings
            </div>
        </div>
    )
}

export default ProfileFrame