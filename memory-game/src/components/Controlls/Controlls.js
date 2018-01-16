import React from 'react';

import './Controlls.css';

import Timer from '../Timer/Timer';
import Turns from '../Turns/Turns';

const Controlls = (props) => {
    return (
        <div className='controlls'>
            <Timer gameTime={props.gameTime} />
            <Turns turns={props.turns} />
            <button className='reset' onClick={props.resetGame}>Reset</button>
        </div>
    )
}

export default Controlls;