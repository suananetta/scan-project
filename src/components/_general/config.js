import uniqid from 'uniqid';

import { Icon_base, Icon_security, Icon_speed, Icon_begginer, Icon_pro, Icon_business, Icon_mock1, Icon_mock2, Icon_mock3 } from '../_assets/images/icons'

export const Reasons = [
    {
        id: uniqid(),
        visability: true,
        icon: <Icon_speed/>,
        description: 'Высокая и оперативная скорость обработки заявки',
    },
    {
        id: uniqid(),
        visability: true,
        icon: <Icon_base/>,
        description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    },
    {
        id: uniqid(),
        visability: true,
        icon: <Icon_security/>,
        description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    },
    {
        id: uniqid(),
        visability: false,
        icon: <Icon_mock1/>,
        description: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        id: uniqid(),
        visability: false,
        icon: <Icon_mock2/>,
        description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        id: uniqid(),
        visability: false,
        icon: <Icon_mock3/>,
        description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    },
]

export const Rates = [
    {
        active: true,
        name: 'Beginner',
        content: 'Для небольшого исследования',
        icon: <Icon_begginer/>,
        price: '799 ₽',
        old_price: '1 200 ₽',
        installment: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        description: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
    },
    {
        active: false,
        name: 'Pro',
        content: 'Для HR и фрилансеров',
        icon: <Icon_pro/>,
        price: '1 299 ₽',
        old_price: '2 600 ₽',
        installment: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        description: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам'],
    },
    {
        active: false,
        name: 'Business',
        content: 'Для корпоративных клиентов',
        icon: <Icon_business/>,
        price: '2 379 ₽',
        old_price: '3 700 ₽',
        installment: '',
        description: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка'],
    },
]
