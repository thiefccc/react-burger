import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const nutrients = [
    { title: 'Калории, ккал', value: ingredient.calories },
    { title: 'Белки, г', value: ingredient.proteins },
    { title: 'Жиры, г', value: ingredient.fat },
    { title: 'Углеводы, г', value: ingredient.carbohydrates },
  ];

  return (
    <div className={`${styles.details} mt-4`}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={styles.nutrients}>
        {nutrients.map((item) => (
          <li className={styles.nutrient} key={item.title}>
            <p className="text text_type_main-default text_color_inactive">
              {item.title}
            </p>
            <p className="text text_type_digits-default text_color_inactive mt-2">
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
