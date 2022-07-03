import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Category from "./components/Category";

import logoDeliveroo from "./images/deliveroo-logo.png";

import "./App.css";
import "./components/Category";
import "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";
library.add(faStar, faPlus, faMinus);

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

  const validateCart = () => {
    const newCart = [...cart];
    newCart.splice(0, newCart.length);
    setCart(newCart);
    alert("Votre commande est en cours de préparation 😉");
  };

  let total = 0;
  let finalTotal = 0;

  return isLoading ? (
    <>
      <div className="loader"></div>
      <h1 className="chargement">Chargement</h1>
    </>
  ) : (
    <div className="App">
      <header>
        <div className="container">
          <img alt="Logo Deliveroo" src={logoDeliveroo} />
        </div>
      </header>
      <div className="hero">
        <div className="informations container">
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
            finalTotal = total + 2.5;
            return (
              <div key={meal.id} className="cart-line">
                <div className="quantity-line">
                  <FontAwesomeIcon
                    icon="minus"
                    className="moreorless"
                    onClick={() => {
                      removeFromCart(meal);
                    }}
                  />

                  <p className="quantity">{meal.quantity} </p>

                  <FontAwesomeIcon
                    icon="plus"
                    className="moreorless"
                    onClick={() => {
                      addToCart(meal);
                    }}
                  />
                </div>

                <p className="title">{meal.title} </p>
                <p>{(meal.price * meal.quantity).toFixed(2)} €</p>
              </div>
            );
          })}
          {total > 0 && (
            <>
              <div className="subtotal">
                <p>Sous-total</p>
                <p>{total.toFixed(2)} €</p>
              </div>
              <div className="delivery-fees">
                <p>Frais de livraison</p>
                <p>2,50 €</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p>{finalTotal.toFixed(2)} €</p>
              </div>
            </>
          )}
          <button
            onClick={() => {
              validateCart();
            }}
            className={
              "validate" + (cart.length > 0 ? " valid-cart" : " empty-cart")
            }
          >
            {cart.length > 0 ? "Valider votre panier" : "Votre panier est vide"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
