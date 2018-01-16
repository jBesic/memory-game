import React from 'react';

import './Card.css';

const Card = (props) => {
    const cardWidthStyle = {
        width: 100 / props.cardWidth + '%'
    }

    let activeCardClass = props.isActive ? ' active' : '';

    return (
        <div className="card-wrapper" style={cardWidthStyle}>
            <div className={"card" + activeCardClass} onClick={props.flipCard}>
                <div className="front"></div>
                <div className="back"><span className='symbol'>{props.symbol}</span></div>
            </div>
        </div>
    )
}

export default Card;