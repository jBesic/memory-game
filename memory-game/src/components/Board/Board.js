import React from 'react';

import './Board.css';
import Card from '../Card/Card';

const Board = (props) => {
    const cardWidth = 4;

    const cards = props.cards.map(element => {
        return <Card
            key={element.id}
            flipCard={() => props.flipCard(element.id)}
            cardWidth={cardWidth}
            isActive={element.isActive}
            symbol={element.symbol} />;
    });

    return (
        <div className='board'>
            {cards}
        </div>
    )
}

export default Board;