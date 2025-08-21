import canUseDom from './can-use-dom';
import { cleanObject } from '.';

export const exceptNumberSymbols = (e) => {
    [ 'e', 'E', '+', '-', '.', ',' ].includes(e.key) && e.preventDefault();
};
export const removeAccents = (str) => {
    if (str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .trim();
    }

    return str;
};

export const pushQuery = (router, newQuery) => {
    const { push, pathname, query, isReady } = router;
    if (!canUseDom() || !isReady) return;
    push(
        {
            pathname,
            query: cleanObject(
                {
                    ...query,
                    ...newQuery,
                },
                { clear: [ undefined, '', null, 0 ] },
            ),
        },
        null,
        { shallow: true },
    );
};
