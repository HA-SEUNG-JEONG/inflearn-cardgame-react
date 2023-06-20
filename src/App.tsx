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

    const shuffledCards = dataDouble.map((item) => ({
      name: item,
      isVisible: false,
    }));

    shuffledCards.sort(() => Math.random() - 0.5);
    setCards([...shuffledCards]);
  };

  const handleClick = (index: number) => {
    if (selectedCards.length >= 2 || selectedCards[0] === index) return;

    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isVisible: true } : card
    );

    setSelectedCards((prev) => [...prev, index]);
    setCards(updatedCards);

    if (selectedCards.length === 1) {
      setTimeout(() => {
        const firstCard = cards[selectedCards[0]];
        const secondCard = cards[index];

        const isMatched = firstCard.name === secondCard.name;
        const updatedCardsAfterComparison = updatedCards.map((card, i) =>
          i === selectedCards[0] || i === index
            ? { ...card, isVisible: isMatched }
            : card
        );

        setSelectedCards([]);
        setCards(updatedCardsAfterComparison);
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
