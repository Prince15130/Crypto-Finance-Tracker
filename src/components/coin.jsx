import React from "react";
import "./Coin.css";
import Sparkline from "react-sparkline-svg";
const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  sparkline,
}) => {
  return (
    <div className="coin-row" role="rowgroup">
      <div className="coin">
        <img src={image} alt="crypto" />
        <h1>{name}</h1>
        <p className="coin-symbol">{symbol}</p>
      </div>
      <div className="coin-data">
        <p className="coin-volume">&#8377;{price}</p>
        <p className="coin-volume">&#8377;{volume.toLocaleString()}</p>
        {priceChange < 0 ? (
          <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
        ) : (
          <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
        )}
        <p className="coin-marketcap">&#8377;{marketcap.toLocaleString()}</p>
        <Sparkline
          values={sparkline}
          stroke="#11d811"
          viewBoxWidth="20"
          width="10%"
          height="10%"
          viewBoxHeight="10"
        />
      </div>
    </div>
  );
};

export default Coin;
