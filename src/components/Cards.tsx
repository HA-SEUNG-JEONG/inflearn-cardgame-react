interface CardProps {
  name: string;
  isVisible: boolean;
  onClick: () => void;
}

const Cards = ({ name, isVisible, onClick }: CardProps) => {
  return (
    <li className={`card ${isVisible ? "visible" : ""}`} onClick={onClick}>
      {isVisible && (
        <img
          className="list-card"
          src={`../src/images/${name}.png`}
          alt={name}
        />
      )}
    </li>
  );
};

export default Cards;
