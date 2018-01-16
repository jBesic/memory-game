import React, { Component } from 'react';

import './MemoryGame.css';
import Board from '../../components/Board/Board';
import Controlls from '../../components/Controlls/Controlls';
import EndOfGame from '../../components/EndOfGame/EndOfGame';

class MemoryGame extends Component {

    symbols = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'B', 'D', 'K']

    initTimer = () => {
        if (this.state.completed) {
            window.clearInterval(this.intervalId);
        } else {
            this.setState({
                gameTime: this.state.gameTime + 1
            });
        }
    }

    resetGame = () => {
        const oldState = { ...this.state };

        oldState.cards.forEach(card => {
            card.isActive = false;
            card.revealed = false;
        });

        oldState.completed = false;
        oldState.gameTime = 0;
        oldState.opened = [];
        oldState.turns = 0;

        this.setState(oldState);

        window.clearInterval(this.intervalId);
        this.intervalId = window.setInterval(this.initTimer, 1000);
    }

    updateGameTime = (gameTime) => {
        this.setState({ gameTime: gameTime });
    }

    isGameCompleted = (oldState) => {
        let isGameCompleted = true;
        oldState.cards.forEach(card => {
            if (!card.revealed) {
                isGameCompleted = false;
            }
        });

        return isGameCompleted;
    }

    flipCard = (cardId) => {
        let oldState = { ...this.state };
        let card = oldState.cards.find(card => card.id === cardId);

        if (card.revealed) { return false; }

        card.isActive = !card.isActive;

        if (oldState.opened.indexOf(card.id) === -1) {
            if (card.isActive) {
                oldState.opened.push(cardId);
            }
        } else {
            oldState.opened = [];
        }

        let firstOpened = null;
        oldState.cards.forEach(oldStateCard => {
            if (oldState.opened.indexOf(oldStateCard.id) > -1) {
                if (firstOpened === null) {
                    firstOpened = oldStateCard;
                } else {
                    if (firstOpened.symbol === oldStateCard.symbol) {
                        firstOpened.revealed = true;
                        oldStateCard.revealed = true;
                    } else {
                        window.setTimeout(() => {
                            firstOpened.isActive = false;
                            oldStateCard.isActive = false;
                        }, 150);
                    }

                    oldState.turns = oldState.turns + 1;
                    oldState.opened = [];
                }
            };
        });

        if (this.isGameCompleted(oldState)) {
            oldState.completed = true;
        }

        this.setState({ ...oldState });
    }

    shuffle = (cards) => {
        let cardsLength = cards.length;
        let randomIndex;
        let temporaryCard;

        // While there remain elements to shuffle…
        while (cardsLength) {
            // Pick a remaining element…
            randomIndex = Math.floor(Math.random() * cardsLength--);

            // And swap it with the current element.
            temporaryCard = cards[cardsLength];
            cards[cardsLength] = cards[randomIndex];
            cards[randomIndex] = temporaryCard;
        }

        return cards;
    }

    generateCards = (numberOfCards) => {
        const cards = [];
        for (let index = 0; index < numberOfCards; index++) {
            cards.push({
                id: index,
                symbol: this.symbols[Math.floor(index / 2)],
                isActive: false,
                revealed: false
            });
        }

        return this.shuffle(cards);
    }

    intervalId = 0;
    state = {
        cards: this.generateCards(16),
        opened: [],
        completed: false,
        turns: 0,
        gameTime: 0
    };

    componentDidMount = () => {
        this.intervalId = window.setInterval(this.initTimer, 1000);
    }

    componentWillUnmount = () => {
        window.clearInterval(this.intervalId);
    }

    render = () => {
        let memoryGame = '';
        if (this.state.completed) {
            memoryGame = <EndOfGame gameTime={this.state.gameTime} turns={this.state.turns} />;
        }

        return (
            <div className='memory-game'>
                {memoryGame}
                <Board flipCard={this.flipCard} cards={this.state.cards} />
                <Controlls turns={this.state.turns} completed={this.state.completed} updateGameTime={this.updateGameTime} gameTime={this.state.gameTime} resetGame={this.resetGame} />
            </div>
        );
    }
}

export default MemoryGame;