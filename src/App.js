import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./components/coin";
import "./App.css";
import "./components/Coin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=20&page=1&sparkline=true"
      )
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const useSortableData = (items) => {
    const [sortConfig, setSortConfig] = React.useState("");

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === faSortUp ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === faSortUp ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = faSortUp;
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === faSortUp
      ) {
        direction = faSortDown;
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const { items, requestSort, sortConfig } = useSortableData(filteredCoins);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return faSort;
    }
    console.log(sortConfig.direction);
    return sortConfig.key === name ? sortConfig.direction : faSortUp;
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a CryptoCurrency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      <div className="coin-container" role="table" aria-label="Destinations">
        <div className="coin-row header" role="columnheader">
          <div className="coin header-text">Crypto Currency</div>
          <FontAwesomeIcon
            onClick={() => requestSort("name")}
            className="sort"
            icon={getClassNamesFor("name")}
          />
          <div className="coin-data header-text">
            <div className="coin-volume header-text" role="columnheader">
              Price
              <FontAwesomeIcon
                onClick={() => requestSort("current_price")}
                className="sort"
                icon={getClassNamesFor("current_price")}
              />
            </div>
            <div className="coin-volume header-text" role="columnheader">
              Volume
              <FontAwesomeIcon
                onClick={() => requestSort("market_cap")}
                className="sort"
                icon={getClassNamesFor("market_cap")}
              />
            </div>
            <div className="coin-volume header-text" role="columnheader">
              Change
              <FontAwesomeIcon
                onClick={() => requestSort("price_change_percentage_24h")}
                className="sort"
                icon={getClassNamesFor("price_change_percentage_24h")}
              />
            </div>
            <div className="coin-volume header-text" role="columnheader">
              Market Cap
            </div>
            <div className="coin-volume header-text" role="columnheader">
              Last 7 Days
            </div>
          </div>
        </div>
      </div>
      {items.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            sparkline={coin.sparkline_in_7d.price}
          />
        );
      })}
    </div>
  );
}

export default App;
