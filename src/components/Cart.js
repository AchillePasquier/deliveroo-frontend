import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = ({ cart, removeFromCart, addToCart, validateCart }) => {
  let total = 0;
  let finalTotal = 0;

  return (
    <div>
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
  );
};

export default Cart;
