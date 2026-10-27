import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./style.css";

const foods = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    price: 550,
    emoji: "🍔",
    desc: "Juicy patty with fresh lettuce and special sauce.",
  },
  {
    id: 2,
    name: "Crispy Pizza",
    category: "Pizza",
    price: 850,
    emoji: "🍕",
    desc: "Cheesy pizza topped with fresh ingredients.",
  },
  {
    id: 3,
    name: "Club Sandwich",
    category: "Snacks",
    price: 450,
    emoji: "🥪",
    desc: "Toasted sandwich with chicken and vegetables.",
  },
  {
    id: 4,
    name: "French Fries",
    category: "Snacks",
    price: 250,
    emoji: "🍟",
    desc: "Golden crispy fries with seasoning.",
  },
  {
    id: 5,
    name: "Cold Coffee",
    category: "Drinks",
    price: 300,
    emoji: "🥤",
    desc: "Chilled creamy coffee for a refreshing break.",
  },
  {
    id: 6,
    name: "Chicken Wrap",
    category: "Snacks",
    price: 400,
    emoji: "🌯",
    desc: "Grilled chicken wrap with our signature sauce.",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);

  const addToCart = (food) => {
    setCart((old) => {
      const found = old.find((item) => item.id === food.id);
      return found
        ? old.map((item) =>
            item.id === food.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...old, { ...food, qty: 1 }];
    });
  };

  const changeQty = (id, amount) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const Menu = () => {
    const shown = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || food.category === category),
    );

    return (
      <main className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">YOUR CAMPUS FOOD STOP</span>
            <h1>
              Good food.
              <br />
              <span>Great breaks.</span>
            </h1>
            <p>Fresh bites, student prices, and more time for what matters.</p>
            <a className="primary-btn" href="#menu">
              Explore Menu ↓
            </a>
          </div>
          <div className="hero-food">🍔</div>
          <div className="hero-circle"></div>
        </section>

        <section id="menu" className="menu-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MADE FOR YOUR HUNGER</span>
              <h2>Today's Menu</h2>
            </div>
            <span className="food-count">{shown.length} items</span>
          </div>
          <input
            className="search"
            placeholder="Search your favourite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filters">
            {["All", "Burgers", "Pizza", "Snacks", "Drinks"].map((cat) => (
              <button
                key={cat}
                className={category === cat ? "filter active" : "filter"}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="food-grid">
            {shown.map((food) => (
              <article className="food-card" key={food.id}>
                <div className="food-image">
                  <span>{food.emoji}</span>
                  <button
                    className="heart"
                    onClick={() =>
                      setFavourites((old) =>
                        old.includes(food.id)
                          ? old.filter((id) => id !== food.id)
                          : [...old, food.id],
                      )
                    }
                  >
                    {favourites.includes(food.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="food-info">
                  <span className="food-category">{food.category}</span>
                  <h3>{food.name}</h3>
                  <p>{food.desc}</p>
                  <div className="food-bottom">
                    <strong>Rs. {food.price}</strong>
                    <button className="add-btn" onClick={() => addToCart(food)}>
                      + Add
                    </button>
                  </div>
                  <Link className="details-link" to={`/food/${food.id}`}>
                    View details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <p className="empty">No food found. Try another search.</p>
          )}
        </section>
      </main>
    );
  };

  const Cart = () => (
    <main className="container page">
      <span className="eyebrow">YOUR ORDER</span>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty">
          Your cart is empty. Add something delicious from the menu!
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <span className="cart-emoji">{item.emoji}</span>
              <div className="cart-description">
                <strong>{item.name}</strong>
                <span>Rs. {item.price} each</span>
              </div>
              <div className="quantity">
                <button onClick={() => changeQty(item.id, -1)}>−</button>
                <b>{item.qty}</b>
                <button onClick={() => changeQty(item.id, 1)}>+</button>
              </div>
              <strong>Rs. {item.price * item.qty}</strong>
            </div>
          ))}
          <div className="total">
            <span>Total</span>
            <strong>Rs. {total}</strong>
          </div>
          <button
            className="primary-btn checkout"
            onClick={() => alert("Order received! This is a demo checkout.")}
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );

  const Details = ({ id }) => {
    const food = foods.find((item) => item.id === Number(id));
    if (!food)
      return (
        <main className="container page">
          <h1>Food not found</h1>
          <Link to="/">Back to menu</Link>
        </main>
      );
    return (
      <main className="container page details-page">
        <div className="details-emoji">{food.emoji}</div>
        <span className="eyebrow">{food.category}</span>
        <h1>{food.name}</h1>
        <p>{food.desc}</p>
        <h2>Rs. {food.price}</h2>
        <button className="primary-btn" onClick={() => addToCart(food)}>
          Add to Cart
        </button>
        <p>
          <Link to="/">← Back to menu</Link>
        </p>
      </main>
    );
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span> Quick<span>Bite.</span>
        </Link>
        <nav>
          <Link to="/">Menu</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart <b>{count}</b>
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/food/:id"
          element={<FoodDetails addToCart={addToCart} />}
        />
      </Routes>
      <footer>
        © 2026 QuickBite Canteen <span>Fresh food, happy campus.</span>
      </footer>
    </>
  );
}

function FoodDetails({ addToCart }) {
  const id = window.location.pathname.split("/").pop();
  const food = foods.find((item) => item.id === Number(id));
  if (!food)
    return (
      <main className="container page">
        <h1>Food not found</h1>
        <Link to="/">Back to menu</Link>
      </main>
    );
  return (
    <main className="container page details-page">
      <div className="details-emoji">{food.emoji}</div>
      <span className="eyebrow">{food.category}</span>
      <h1>{food.name}</h1>
      <p>{food.desc}</p>
      <h2>Rs. {food.price}</h2>
      <button className="primary-btn" onClick={() => addToCart(food)}>
        Add to Cart
      </button>
      <p>
        <Link to="/">← Back to menu</Link>
      </p>
    </main>
  );
}

export default App;
