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
              <div>
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <p>{meal.price} €</p>
                {meal.popular && <p className="popular">Populaire</p>}
              </div>
              {meal.picture && <img src={meal.picture} alt="meal" />}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
