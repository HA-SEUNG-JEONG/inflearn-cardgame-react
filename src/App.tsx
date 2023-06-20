import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

interface CardProps {
  name: string;
  isVisible: boolean;
}

const App = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const data = ["mura", "gary", "licat", "binky", "javadog"];
    const dataDouble = [...data, ...data];

    const shuffledCards = [...dataDouble]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        name: item,
        isVisible: false,
      }));

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
            <Cards
              key={index}
              name={card.name}
              isVisible={card.isVisible}
              onClick={() => handleClick(index)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
