import { useEffect, useState } from "react";
import "./App.css";

interface CardProps {
  name: string;
  isVisible: boolean;
}

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const data = ["mura", "gary", "licat", "binky", "javadog"];
    const dataDouble = data.concat(data);
    const shuffledCards = [];

    while (dataDouble.length > 0) {
      const randomNum = Math.floor(Math.random() * dataDouble.length);
      const item = dataDouble.splice(randomNum, 1)[0];
      const card = { name: item, isVisible: false };
      shuffledCards.push(card);
    }
    setCards(shuffledCards);
  };

  const handleClick = (index: number) => {
    if (selectedCards.length >= 2 || selectedCards[0] === index) {
      return;
    }

    const updatedCards = [...cards];
    updatedCards[index].isVisible = true;

    setSelectedCards([...selectedCards, index]);
    setCards(updatedCards);

    if (selectedCards.length === 1) {
      setTimeout(() => {
        const firstCard = cards[selectedCards[0]];
        const secondCard = cards[index];

        if (firstCard.name === secondCard.name) {
          updatedCards[selectedCards[0]].isVisible = true;
          updatedCards[index].isVisible = true;
        } else {
          updatedCards[selectedCards[0]].isVisible = false;
          updatedCards[index].isVisible = false;
        }

        setSelectedCards([]);
        setCards(updatedCards);
      }, 500);
    }
  };

  return (
    <main id="app">
      <section className="content-board">
        <h1 className="title-game">
          <strong className="title-image">Card Game</strong>
        </h1>
        <ul className="list-card">
          {cards.map((card, index) => (
            <li
              key={index}
              className={`card ${card.isVisible ? "visible" : ""}`}
              onClick={() => handleClick(index)}>
              {card.isVisible && (
                <img
                  className="list-card"
                  src={`../src/images/${card.name}.png`}
                  alt={card.name}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
