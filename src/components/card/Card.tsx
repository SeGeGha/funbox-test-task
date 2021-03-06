import React, { useState } from 'react';

import './Card.scss';

interface CardProps {
  info: CardInfo,
}

const Card: React.FC<CardProps> = ({ info }) => {
  const {
    id, subtitle, title, taste, count, gift, comment, weight, description, availability,
  } = info;
  const [cardState, setCardState] = useState({
    isBlured: false,
    isSelected: false,
    isDisabled: !availability,
  });
  const tabIndex = +id.slice(0, 1);

  function clickHandler() {
    setCardState({
      isBlured: false,
      isSelected: !cardState.isSelected,
      isDisabled: cardState.isDisabled,
    });
  }

  function mouseLeaveHandler() {
    if (cardState.isSelected) {
      setCardState({
        isBlured: true,
        isSelected: cardState.isSelected,
        isDisabled: cardState.isDisabled,
      });
    }
  }

  let classList = 'card';
  let cardFooterMessage = cardState.isSelected ? description : (
    <>
      Чего сидишь? Порадуй котэ,
      {' '}
      <span className="card__footer--colored">
        <button
          type="button"
          className="card__footer__link"
          onClick={() => clickHandler()}
        >
          купи
        </button>
        .
      </span>
    </>
  );
  const subtitleText = (!cardState.isDisabled && cardState.isBlured) ? 'Котэ не одобряет?' : subtitle;

  if (cardState.isDisabled) {
    classList += ' card--disabled';
    cardFooterMessage = `Печалька, ${taste as string} закончился`;
  } else if (cardState.isSelected && cardState.isBlured) {
    classList += ' card--selected card--blured';
  } else if (cardState.isSelected) {
    classList += ' card--selected';
  }

  return (
    <div className={classList}>
      <div
        className="card__body"
        onMouseLeave={() => mouseLeaveHandler()}
        onClick={() => clickHandler()}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            clickHandler();
          }
        }}
        role="button"
        tabIndex={tabIndex}
      >
        <div className="card__body__indention">
          <div className="card__body__indention__segment" />
          <div className="card__body__indention__segment" />
        </div>
        <div className="card__body__main">
          <h4 className="card__body__main__subtitle">{subtitleText}</h4>
          <h2 className="card__body__main__title">{title}</h2>
          <h3 className="card__body__main__taste">{taste}</h3>
          <p className="card__body__main__comment">
            {count}
            <br />
            {gift}
            <br />
            {comment}
          </p>
        </div>
        <div className="card__body__image" />
        <div className="card__body__weight">
          {weight}
          <br />
          <span className="card__body__weight__unit">кг</span>
        </div>
      </div>
      <div className="card__footer">
        {cardFooterMessage}
      </div>
    </div>
  );
};

export default Card;
