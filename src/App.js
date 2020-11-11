import React, { Component } from 'react';
import island from './island.jpg';
import './App.css';
import TasteItem from './TasteItem';
import Target from './Target';
import AvatarCard from './AvatarCard';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');

class App extends Component {
  state = {
    tasteItems: [
      { id: 1, name: 'Books' },
      { id: 2, name: 'Music' },
      { id: 3, name: 'Movies' },
      { id: 4, name: 'Photos' },
    ],
    avatarCards: [
      {
        id: 1,
        text: 'Darina',
      },
      {
        id: 2,
        text: 'Katerina',
      },
      {
        id: 3,
        text: 'Tatiana',
      },
      {
        id: 4,
        text: 'Valeria',
      },
      {
        id: 5,
        text:
          'Kristina',
      },
      {
        id: 6,
        text: 'Anna',
      },
      {
        id: 7,
        text: 'Tatiana',
      },
    ],
  }

  deleteItem = id => {
    this.setState(prevState => {
      return {
        tasteItems: prevState.tasteItems.filter(tasteItem => tasteItem.id !== id)
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { avatarCards } = this.state
    const dragCard = avatarCards[dragIndex]

    this.setState(
      update(this.state, {
        avatarCards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={island} className="App-logo" alt="logo" />
          <h1 className="App-title">Thy-Romance</h1>
        </header>
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {this.state.tasteItems.map((j, index) => (
                <TasteItem key={j.id} tasteItem={j} handleDrop={(id) => this.deleteItem(id)} />
              ))}
            </div>

            <Target />
          </div>
          <div className="card-container">
            {this.state.avatarCards.map((card, i) => (
              <AvatarCard
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
