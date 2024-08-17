/* eslint-disable no-undef */
module.exports = {
  // Максимальная длиня
  subjectLimit: 72,

  // Коммит с заглавной буквы
  upperCaseSubject: true,

  // Добавим описание на русском языке ко всем типам
  types: [
    { value: 'fix',             name: 'fix:               Исправление ошибок или улучшение производительности' },
    { value: 'feat',            name: 'feat:              Добавление нового функционала' },
    { value: 'BREAKING CHANGE', name: 'BREAKING CHANGE:   Добавление нового функционала без обратной совместимости' },
    { value: 'refactor',        name: 'refactor:          Правки кода без исправления ошибок и правки стиля кода' },
    { value: 'test',            name: 'test:              Добавление тестов' },
    { value: 'docs',            name: 'docs:              Обновление документации' },
    { value: 'config',          name: 'config:            Изменение конфигураций в проекте, настройка CI и работа со скриптами' },
  ],

  // Область. Она характеризует фрагмент кода, которую затронули изменения
  scopes: [
    { name: 'components' },
    { name: 'router' },
    { name: 'stores' },
    { name: 'assets' },
    { name: 'logic' },
  ],

  // Возможность задать спец ОБЛАСТЬ для определенного типа коммита
  scopeOverrides: {
    fix     : [{ name: 'bugfix' }, { name: 'performance' }],
    refactor: [{ name: 'refactor' }, { name: 'codestyle' }],
    docs    : [{ name: 'docs' }, { name: 'storybook' }],
    config  : [{ name: 'config' }, { name: 'ci/cd' }],
  },

  // Поменяем дефолтные вопросы
  messages: {
    type         : 'Какие изменения вы вносите?',
    scope        : '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
    customScope  : 'Укажите свою ОБЛАСТЬ:',
    subject      : 'Напишите КОРОТКОЕ описание в ПРОШЕДШЕМ времени (Что сделано?):\n',
    body         : 'Напишите ПОДРОБНОЕ описание (опционально). Используйте ";" для новой строки:\n',
    breaking     : 'Список BREAKING CHANGES (опционально):\n',
    footer       : 'Место для мета данных (тикетов, ссылок и остального). Например: SECRETMRKT-700, SECRETMRKT-800:\n',
    confirmCommit: 'Вас устраивает получившийся коммит?',
  },

  // Разрешим собственную ОБЛАСТЬ
  allowCustomScopes: true,

  // Запрет на Breaking Changes
  allowBreakingChanges: false,

  // Префикс для нижнего колонтитула
  footerPrefix: 'МЕТА ДАННЫЕ:',

  breaklineChar: [';'],

};
