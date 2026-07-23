import { use, useState } from "react";
import logo from "../../assets/Amazon_icon.png";
import location from "../../assets/location.png";
import search from "../../assets/search.png";
import us from "../../assets/united-states.png";
import "./header.css";

export default function Header() {
  const [searchBar, setSearchBar] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="amazon logo" />
      <div className="location">
        <img className="location-icon" src={location} alt="location drop" />
        <div>
          Deliver to Stephanie <br /> <strong>Boston 02116</strong>
        </div>
      </div>
      <form>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Search category"
        >
          <option value="all">All</option>
          <option value="art">Art Supplies</option>
          <option value="pens">Pens</option>
        </select>
        <input
          type="search"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          aria-label="search-bar"
        />
        <button>
          <img className="search" src={search} alt="search button" />
        </button>
      </form>

      <img className="flag" src={us} alt="us flag" />

      <div className="account">
        <div>Hello, Stephanie</div>
        <select>
          <option>Account & Lists</option>
        </select>
      </div>
      <button className="return-btn">
        Returns
        <br />& Orders
      </button>
      <button className="cart-btn">3 in Cart</button>
    </div>
  );
}
