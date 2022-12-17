import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = ({ category, addToCart }) => {
  return (
    <section>
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return (
            <article
              key={meal.id}
              onClick={() => {
                addToCart(meal);
              }}
            >
              <div className="meal">
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <div className="price-popular">
                  <p>{meal.price} €</p>
                  {meal.popular && (
                    <p className="popular">
                      <FontAwesomeIcon icon="star" /> Populaire
                    </p>
                  )}
                </div>
              </div>
              {meal.picture && (
                <img className="meal-picture" src={meal.picture} alt="meal" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
