import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { getIngredients } from '@utils/api';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

const BUN_NAME = 'Краторная булка N-200i';

const FILLING_NAMES = [
  'Соус традиционный галактический',
  'Мясо бессмертных моллюсков Protostomia',
  'Плоды Фалленианского дерева',
  'Хрустящие минеральные кольца',
  'Хрустящие минеральные кольца',
];

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    void getIngredients()
      .then((data) => {
        setIngredients(data);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Не удалось загрузить ингредиенты';
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const bun = useMemo(() => {
    return (
      ingredients.find((item) => item.name === BUN_NAME) ??
      ingredients.find((item) => item.type === 'bun')
    );
  }, [ingredients]);

  const filling = useMemo(() => {
    const selected: TIngredient[] = [];

    FILLING_NAMES.forEach((name) => {
      const item = ingredients.find((ingredient) => ingredient.name === name);

      if (item) {
        selected.push(item);
      }
    });

    if (selected.length > 0) {
      return selected;
    }

    return ingredients.filter((item) => item.type !== 'bun').slice(0, 5);
  }, [ingredients]);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};

    if (bun) {
      result[bun._id] = 2;
    }

    filling.forEach((item) => {
      result[item._id] = (result[item._id] ?? 0) + 1;
    });

    return result;
  }, [bun, filling]);

  const closeModals = useCallback((): void => {
    setSelectedIngredient(null);
    setIsOrderModalOpen(false);
  }, []);

  const openIngredient = useCallback((ingredient: TIngredient): void => {
    setSelectedIngredient(ingredient);
  }, []);

  const openOrder = useCallback((): void => {
    setIsOrderModalOpen(true);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.app}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {error ? (
          <p className="text text_type_main-medium">{error}</p>
        ) : (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              counts={counts}
              onIngredientClick={openIngredient}
            />
            <BurgerConstructor bun={bun} filling={filling} onOrderClick={openOrder} />
          </>
        )}
      </main>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal onClose={closeModals}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
