import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

const ORDER_NUMBER = '034536';

export const OrderDetails = (): React.JSX.Element => {
  return (
    <div className={styles.order}>
      <p className="text text_type_digits-large mb-8">{ORDER_NUMBER}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary" className={`${styles.icon} mt-15 mb-15`} />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
