import React, { useState,useEffect } from 'react';

const GridCards = ({ divider, }) => {
  const apiUrl = import.meta.env.VITE_API_URL;


  const [cardData,setCardData] = useState({
    "title": "",
    "subtitle": "",
    "bgColor": "",
    "textColor": "",
    "gridCards": [
    ]
  
  })

  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/grid-cards`); // Replace with your API endpoint
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);

  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const handleClick = (index) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index);
  };

  const handleHover = (index, isHovering) => {
    setFlippedCardIndex(isHovering ? index : null);
  };

  return (
    <div className="relative w-full" style={{ backgroundColor: cardData.bgColor, color: cardData.textColor }}>

      <div className="p-10 md:p-20 lg:p-30 mx-auto max-w-96 md:max-w-[1000px] lg:max-w-[1500px]">
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-bold my-5">{cardData.title}</h1>
        <p className="text-center text-lg md:text-2xl lg:text-3xl mb-10">{cardData.subtitle}</p>

        <div
          className="grid gap-10 "
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {cardData.gridCards.map((card, index) => (
            <div
              key={index}
              className={` flip-card ${flippedCardIndex === index ? 'flipped' : ''} `}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
            >
              <div className="flip-card-inner transform transition-transform duration-500 ">
                <div className="flip-card-front">
                  <img className="w-full h-full rounded-lg object-cover" src={card.image} alt={card.title}  loading="lazy"/>
                </div>
                <div
                  className="flip-card-back p-5 flex flex-col justify-center rounded-lg"
                  style={{ backgroundColor: card.flipBgColor, color: card.flipTextColor }}
                >
                  <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridCards;
