import { Counter, CurrencyIcon, Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef, useState } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

// Запас у нижнего края, чтобы вкладка "Начинки" включалась, когда секция уже не доскролливается
const SCROLL_BOTTOM_GAP = 4;

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  counts: Record<string, number>;
  onIngredientClick: (ingredient: TIngredient) => void;
};

type TIngredientCardProps = {
  ingredient: TIngredient;
  count: number;
  onClick: (ingredient: TIngredient) => void;
};

const IngredientCard = ({
  ingredient,
  count,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  return (
    <li>
      <button type="button" className={styles.card} onClick={() => onClick(ingredient)}>
        {count > 0 && <Counter count={count} size="default" />}
        <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </button>
    </li>
  );
};

export const BurgerIngredients = ({
  ingredients,
  counts,
  onIngredientClick,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [current, setCurrent] = useState('bun');
  const scrollRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  const onTabClick = useCallback((value: string): void => {
    setCurrent(value);

    const container = scrollRef.current;
    let target: HTMLElement | null = null;

    switch (value) {
      case 'bun':
        target = bunRef.current;
        break;
      case 'sauce':
        target = sauceRef.current;
        break;
      case 'main':
        target = mainRef.current;
        break;
      default:
        target = null;
    }

    if (!container || !target) {
      return;
    }

    container.scrollTop = target.offsetTop;
  }, []);

  const onScroll = useCallback((): void => {
    const scroll = scrollRef.current;
    const sauce = sauceRef.current;
    const main = mainRef.current;

    if (!scroll || !sauce || !main) {
      return;
    }

    const position = scroll.scrollTop;

    if (position + scroll.clientHeight >= scroll.scrollHeight - SCROLL_BOTTOM_GAP) {
      setCurrent('main');
      return;
    }

    if (position >= main.offsetTop) {
      setCurrent('main');
    } else if (position >= sauce.offsetTop) {
      setCurrent('sauce');
    } else {
      setCurrent('bun');
    }
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <div className={styles.menu}>
          <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onTabClick}>
            Начинки
          </Tab>
        </div>
      </nav>
      <div
        className={`${styles.scroll} custom-scroll`}
        ref={scrollRef}
        onScroll={onScroll}
      >
        <section ref={bunRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <ul className={styles.list}>
            {buns.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                count={counts[ingredient._id] ?? 0}
                onClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>
        <section ref={sauceRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <ul className={styles.list}>
            {sauces.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                count={counts[ingredient._id] ?? 0}
                onClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>
        <section ref={mainRef} className="pb-10">
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <ul className={styles.list}>
            {mains.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                count={counts[ingredient._id] ?? 0}
                onClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
