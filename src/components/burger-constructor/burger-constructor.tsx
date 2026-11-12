import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  bun: TIngredient | undefined;
  filling: TIngredient[];
  onOrderClick: () => void;
};

export const BurgerConstructor = ({
  bun,
  filling,
  onOrderClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const total = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    return filling.reduce((sum, item) => sum + item.price, bunPrice);
  }, [bun, filling]);

  return (
    <section className={`${styles.burger_constructor} pb-5`}>
      {bun && (
        <div className="ml-8 mb-4">
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={`${styles.scroll} ${styles.list} custom-scroll pr-2`}>
        {filling.map((item, index) => (
          <li className={`${styles.item} mb-4`} key={`${item._id}-${index}`}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass="ml-2"
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      {bun && (
        <div className="ml-8 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${styles.total} mt-10`}>
        <span className="text text_type_digits-medium mr-2">{total}</span>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
