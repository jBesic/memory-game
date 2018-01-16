import React from 'react';

import './EndOfGame.css';

const EndOfGame = (props) => {
    return (
        <div className='game-completed'>
            <h2 className='label'>Congratulations !</h2>
            <h3 className='message'>That is not bad. You made to finish the game in {props.gameTime} seconds while making {props.turns} turns.</h3>
        </div>
    );
}

export default EndOfGame;