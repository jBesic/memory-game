import React from 'react';

import './Timer.css';

const Timer = (props) => {
    return (
        <div className='timer'>
            <span className='label'>Time</span>
            <span className='count'>{props.gameTime}</span>
        </div>
    )
}

export default Timer;