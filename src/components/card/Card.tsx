import React, { useState } from 'react';

import './Card.scss';

interface CardProps {
  info: CardInfo,
}

const Card: React.FC<CardProps> = ({ info }) => {
  const {
    subtitle, title, taste, count, gift, comment, weight, description, availability,
  } = info;
  const [cardState, setCardState] = useState({
    isSelected: false,
    isDisabled: !availability,
  });

  let classList = 'card';
  let cardFooterMessage = 'Чего сидишь? Порадуй котэ, купи.';

  if (cardState.isDisabled) {
    classList += ' card--disabled';
    cardFooterMessage = `Печалька, ${taste as string} закончился`;
  } else if (cardState.isSelected) {
    classList += ' card--selected';
    cardFooterMessage = description;
  }

  return (
    <div
      className={classList}
      aria-hidden="true"
      onClick={() => setCardState({
        isSelected: !cardState.isSelected,
        isDisabled: cardState.isDisabled,
      })}
    >
      <div className="card__body">
        <h4 className="card__body__subtitle">{subtitle}</h4>
        <h2 className="card__body__title">{title}</h2>
        <h3 className="card__body__taste">{taste}</h3>
        <p className="card__body__comment">
          {count}
          <br />
          {gift}
          <br />
          {comment}
        </p>
        <div className="card__body__weight">
          {weight}
          <br />
          <span className="card__body__weight--unit">кг</span>
        </div>
      </div>
      <div className="card__footer">
        {cardFooterMessage}
      </div>
    </div>
  );
};

export default Card;
