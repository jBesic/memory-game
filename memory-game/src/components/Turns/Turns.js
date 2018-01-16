import React from 'react';

import './Turns.css';

const Turns = (props) => {
    return (
        <div className='turns'>
            <span className='label'>Turns</span>
            <span className='count'>{props.turns}</span>
        </div>
    )
}

export default Turns;