import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Timer from "./components/Timer";
import { toast } from "react-toastify";
interface CardProps {
  name: string;
  isVisible: boolean;
}

const App = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    shuffleCards();
    handleHint();
  }, []);

  // 카드를 랜덤으로 섞는 함수
  const shuffleCards = () => {
    const data = ["mura", "gary", "licat", "binky", "javadog"];
    const concatData = [...data, ...data];

    const shuffledCards = [...concatData]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ name: item, isVisible: false }));

    setCards([...shuffledCards]);
  };

  // 인덱스를 비교해서 카드 일치 여부에 따라 카드를 갱신
  const handleCardComparison = (cards: CardProps[], index: number) => {
    const firstCard = cards[selectedCards[0]];
    const secondCard = cards[index];

    const isMatched = firstCard.name === secondCard.name;

    const updatedCardsAfterComparison = cards.map((card, i) =>
      i === selectedCards[0] || i === index
        ? { ...card, isVisible: isMatched }
        : card
    );

    if (isMatched) {
      toast.success("카드가 일치합니다!");
      setMatchedPairs((prev) => prev + 1);
    } else {
      toast.error("카드가 일치하지 않습니다! 다시 시도해주세요.");
    }

    if (isMatched) {
      setSelectedCards([]);
      setCards(updatedCardsAfterComparison);
      return;
    }

    setSelectedCards([]);
    setCards(updatedCardsAfterComparison);
  };

  // 두 개의 카드를 비교하는 함수
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

  useEffect(() => {
    if (matchedPairs === cards.length / 2)
      toast.info("모든 카드가 일치합니다!");
  }, [matchedPairs, cards.length]);

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
