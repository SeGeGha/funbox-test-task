import React from 'react';

import Card from '../components/card/Card';

import data from '../data/cards';

import './App.scss';

const App = () => (
  <div className="cards-box">
    <h2 className="title">Ты сегодня покормил кота?</h2>
    {
      data.map((cardInfo: CardInfo) => (
        <Card
          key={cardInfo.id}
          info={cardInfo}
        />
      ))
    }
  </div>
);

export default App;
