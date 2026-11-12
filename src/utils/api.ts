import { BURGER_API_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const getIngredients = (): Promise<TIngredient[]> => {
  return fetch(`${BURGER_API_URL}/api/ingredients`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }

      return response.json() as Promise<TIngredientsResponse>;
    })
    .then((result) => {
      if (!result.success) {
        throw new Error('Не удалось получить данные');
      }

      return result.data;
    });
};
