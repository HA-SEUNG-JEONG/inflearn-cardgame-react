import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Timer from "./components/Timer";
interface CardProps {
  name: string;
  isVisible: boolean;
}

const App = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    shuffleCards();
    handleHint();
  }, []);

  const shuffleCards = () => {
    const data = ["mura", "gary", "licat", "binky", "javadog"];
    const dataDouble = [...data, ...data];

    const shuffledCards = [...dataDouble]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ name: item, isVisible: false }));

    setCards([...shuffledCards]);
  };

  const handleCardComparison = (cards: CardProps[], index: number) => {
    const firstCard = cards[selectedCards[0]];
    const secondCard = cards[index];

    const isMatched = firstCard.name === secondCard.name;

    const updatedCardsAfterComparison = cards.map((card, i) =>
      i === selectedCards[0] || i === index
        ? { ...card, isVisible: isMatched }
        : card
    );

    setSelectedCards([]);
    setCards(updatedCardsAfterComparison);
  };

  const compareCards = (cards: CardProps[], index: number) => {
    setTimeout(
      () => handleCardComparison(cards, index),
      selectedCards.length === 1 ? 500 : 0
    );
  };

  const handleClick = (index: number) => {
    if (selectedCards.length >= 2 || selectedCards[0] === index) return;

    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isVisible: true } : card
    );

    setSelectedCards((prev) => [...prev, index]);
    setCards(updatedCards);

    compareCards(updatedCards, index);
  };

  const handleHint = () => {
    setShowHint(true);
    setTimeout(() => {
      setShowHint(false);
    }, 1000);
  };

  return (
    <>
      <Timer />
      <main id="app">
        <section className="content-board">
          <ul className="list-card">
            {cards.map((card, index) => (
              <Cards
                key={index}
                name={card.name}
                isVisible={card.isVisible || showHint}
                onClick={() => handleClick(index)}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
