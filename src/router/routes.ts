export const routes = [
  {
    name     : 'Database',
    path     : '/',
    component: () => import('@/layouts/DatabaseLayout.vue'),
    children : [
      {
        name     : 'Calendar',
        path     : '',
        component: () => import('@/views/CalendarViews.vue'),
      },
      {
        name     : 'Bishops',
        path     : 'bishops',
        component: () => import('@/views/BishopsViews.vue'),
      },
      {
        name     : 'Priests',
        path     : 'priests',
        component: () => import('@/views/PriestsViews.vue'),
      },
      {
        name     : 'Seculars',
        path     : 'seculars',
        component: () => import('@/views/SecularsViews.vue'),
      },
      {
        name     : 'Gifts',
        path     : 'gifts',
        component: () => import('@/views/GiftsViews.vue'),
      },
    ],
  },
  {
    name     : 'Info',
    path     : '/info/',
    component: () => import('@/layouts/DatabaseLayout.vue'),
    children : [
      {
        name     : 'Bishop',
        path     : 'bishop/:id',
        component: () => import('@/views/BishopViews.vue'),
      },
      {
        name     : 'Priest',
        path     : 'priest/:id',
        component: () => import('@/views/PriestViews.vue'),
      },
      {
        name     : 'Secular',
        path     : 'secular/:id',
        component: () => import('@/views/SecularViews.vue'),
      },
      {
        name     : 'Gift',
        path     : 'gift/:id',
        component: () => import('@/views/GiftViews.vue'),
      },
    ],
  },
  {
    name     : 'Auth',
    path     : '/auth/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children : [
      {
        name     : 'Login',
        path     : 'login',
        component: () => import('@/views/LoginViews.vue'),
      },
      {
        name     : 'Register',
        path     : 'register',
        component: () => import('@/views/RegViews.vue'),
      },
    ],
  },
];
