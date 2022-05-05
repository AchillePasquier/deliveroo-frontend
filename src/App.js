import { useState, useEffect } from "react";

import "./App.css";
import "./components/category";

import axios from "axios";
import Category from "./components/category";

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-achille-pasq.herokuapp.com/"
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addToCart = (meal) => {
    const newCart = [...cart];
    const mealExists = newCart.find((elem) => elem.id === meal.id);
    //console.log(mealExists);
    if (mealExists) {
      mealExists.quantity++;
    } else {
      const newMeal = { ...meal, quantity: 1 };
      newCart.push(newMeal);
    }
    setCart(newCart);
    console.log(newCart);
  };

  const removeFromCart = (meal) => {
    const newCart = [...cart];
    //const mealInTab = newCart.find((elem) => elem.id === meal.id);
    if (meal.quantity > 1) {
      meal.quantity--;
    } else {
      const index = newCart.indexOf(meal);
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  let total = 0;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="App">
      <div className="hero">
        <div className="hero container">
          <div className="hero-description">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="Meal" />
        </div>
      </div>

      <main className="container">
        <div className="main-left">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  category={category}
                  key={index}
                  addToCart={addToCart}
                />
              )
            );
          })}
        </div>
        <div className="main-right">
          {cart.map((meal, index) => {
            total = total + meal.quantity * meal.price;
            return (
              <div key={meal.id}>
                <button
                  onClick={() => {
                    removeFromCart(meal);
                  }}
                >
                  -
                </button>
                <span>{meal.quantity} </span>
                <button
                  onClick={() => {
                    addToCart(meal);
                  }}
                >
                  +
                </button>
                <span>{meal.title} </span>
                <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
              </div>
            );
          })}
          {total > 0 && <p>Total : {total.toFixed(2)}</p>}
        </div>
      </main>
    </div>
  );
};

export default App;
