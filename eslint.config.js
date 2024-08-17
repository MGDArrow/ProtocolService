/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-lines */

// * Правила
// https://eslint.org/docs/latest/rules/
// https://typescript-eslint.io/rules/
// https://eslint.style/rules
// https://eslint.vuejs.org/rules/

// * Почему ESLint Stylistic, а не Prettier
// https://typescript-eslint.io/users/what-about-formatting/
// https://eslint.style/guide/why
// https://antfu.me/posts/why-not-prettier
// https://github.com/eslint/eslint.org/issues/435

import eslintPluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

const extraFileExtensions = ['.vue'];
export default [
  js.configs.recommended,
  ...ts.configs.recommendedTypeCheckedOnly,
  ...eslintPluginVue.configs['flat/base'],
  {
    name   : 'mgdarrow-config-js',
    files  : ['**/*.{js,cjs,ts,vue}', '*.{js,cjs,ts,vue}'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser       : ts.parser,
      parserOptions: {
        parser        : ts.parser,
        projectService: {
          allowDefaultProject: ['*.js', '*.cjs'],
        },
      },
    },
    rules: {
      // * ===НАХОДЯТСЯ В RECOMMENDED=== * //
      // ?  ==LEGACY & DEFENCE & НЕНУЖНЫЙ КОД== ? //
      'no-useless-escape': 'error', // ! Запрет на ненужные escape-символы
      'no-with'          : 'error', // ! Запрет with
      'require-yield'    : 'error', // ! Требовать yield в function*

      // ?  ==СТИЛИСТИКА== ? //
      'no-import-assign'            : 'error', // ! Запрет на переопределение значений из import
      'no-debugger'                 : 'error', // ! Запрет debugger в коде
      'no-unexpected-multiline'     : 'error', // ! Запрет ошибочного исполнения фрагментов кода из-за отсутсвтия ;
      'no-unsafe-finally'           : 'error', // ! Запрет return, throw, break, continue в finally блоках,
      'no-unsafe-negation'          : 'error', // ! Запрет отрицательного левого операнда https://eslint.org/docs/latest/rules/no-unsafe-negation
      'no-unsafe-optional-chaining' : 'error', // ! Запрет использования dot нотации с известным undefined
      'no-unreachable'              : 'error', // ! Запрет недоступного кода после операторов return, throw, continue и break
      'no-empty'                    : 'error', // ! Запрет на пустые блоки (можно заполнить комментариями)
      'no-new-native-nonconstructor': 'error', // ! Запрет на использование new с Symbol и BigInt
      'no-unused-labels'            : 'error', // ! Запрет на неиспользуемые метки

      // ?  ==ПЕРЕМЕННЫЕ== ? //
      'no-loss-of-precision'         : 'warn', // ? Подсвечивать числа, выходящие за диапазон 64 разрядов и теряющие точность
      'no-const-assign'              : 'error', // ! Запрет переназначения const
      'no-constant-binary-expression': 'error', // ! Запрет выражений, в которых операция не влияет на значение
      'no-empty-pattern'             : 'error', // ! Зарпет на пустой шаблон деструктурирования
      'no-self-assign'               : 'error', // ! Запрет назначения, в которых обе стороны абсолютно одинаковы
      'no-sparse-arrays'             : 'error', // ! Запрет массивов с пустым свойством между двух запятых
      'no-undef'                     : 'error', // ! Запрет использования необъявленных переменных, если они не указаны в /* global */ комментариях
      // 'no-unused-vars': 'error', // ! Запрет на неиспользуемые переменные
      'no-delete-var'                : 'error', // ! Запрет удаления переменных через delete
      'no-global-assign'             : 'error', // ! Запрет на присваивание собственным объектам или глобальным переменным, доступным только для чтения,
      'no-nonoctal-decimal-escape'   : 'error', // ! Запрет на \8 и \9
      'no-octal'                     : 'error', // ! Запрет на использование восьмеричных литералов
      'no-redeclare'                 : 'error', // ! Запрет повторного объявления переменных
      'no-shadow-restricted-names'   : 'error', // ! Запрет идентификаторам скрывать имена с ограниченным доступом

      // ?  ==РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ== ? //
      'no-control-regex'        : 'error', // ! Запрет спец символов в регулярных выражениях
      'no-empty-character-class': 'error', // ! Запрет на пустой [] в регулярных выражениях
      'no-invalid-regexp'       : 'error', // ! Запрет на недопустимые строки в регулярных выражениях
      'no-useless-backreference': 'error', // ! Запрет на бесполезные обратные ссылки в регулярных выражениях
      'no-regex-spaces'         : 'error', // ! Запрет пробелов в регулярных выражениях

      // ?  ==СРАВНЕНИЯ== ? //
      'no-compare-neg-zero'  : 'error', // ! Запрет на сравнение с -0
      'no-cond-assign'       : 'error', // ! Запрет на присвоение в условии if
      'no-constant-condition': 'error', // ! Запрет заведомо известных результатов сравнения
      'no-dupe-else-if'      : 'error', // ! Запрет дублирования условий
      'no-duplicate-case'    : 'error', // ! Запрет дублирования условий case в switch
      'no-fallthrough'       : 'error', // ! Требовать break или return в case в swith
      'use-isnan'            : 'error', // ! Требовать вызов isNaN() при проверке NaN
      'valid-typeof'         : 'error', // ! Требовать сравнение typeof выражений с допустимыми строками
      'no-case-declarations' : 'error', // ! Запрет объявления переменных в case и default в switch
      'no-extra-boolean-cast': 'error', // ! Запрет ненужных приведений в сравнении череез !!

      // ?  ==ЦИКЛЫ== ? //
      'for-direction': 'error', // ! Требовать принудительно указывать правильный шаг в цикле for (дабы избежать зацикливание)

      // ?  ==ОБЪЕКТЫ== ? //
      'no-dupe-keys'         : 'error', // ! Запрет дублирования ключей объектов
      'no-obj-calls'         : 'error', // ! Запрет вызывать глобальные свойства объекта как функции
      'no-prototype-builtins': 'error', // ! Запрет вызова некоторых Object.prototype методов непосредственно для объектов

      // ?  ==ФУНКЦИИ== ? //
      'no-async-promise-executor': 'error', // ! Запрет асинхронных функций внутри в Promise resolve()
      'getter-return'            : 'error', // ! Требовать return в getter
      'no-dupe-args'             : 'error', // ! Запрет дубликатов аргументов функций
      'no-func-assign'           : 'error', // ! Запрет на переопределения функций
      'no-setter-return'         : 'error', // ! Запрет вызывать неправильные return https://eslint.org/docs/latest/rules/no-setter-return
      'no-ex-assign'             : 'error', // ! Запрет на переназначение аргумента catch
      'no-useless-catch'         : 'error', // ! Запрет ненужных catch

      // ?  ==КЛАССЫ== ? //
      'constructor-super'              : 'error', // ! Требовать super() вызовы в конструкторах (Обрабатывается TS)
      'no-class-assign'                : 'error', // ! Запрет переназначения класса
      'no-dupe-class-members'          : 'error', // ! Запрет дубликатов свойств и методов класса
      'no-this-before-super'           : 'error', // ! Запрет this/super перед super()
      'no-unused-private-class-members': 'error', // ! Запрет на неиспользуемые приватные свойства класса
      'no-empty-static-block'          : 'error', // ! Запрет пустых статических блоков в классе

      // * ===ОТСУТСТВУЮТ В RECOMMENDED=== * //
      // ?  ==ФАЙЛЫ== ? //
      'max-lines'            : ['warn', { max: 500, skipBlankLines: true, skipComments: true }], // ? Подсвечивать, если количество строк в файле превышает 500 (не считая пустые строки и строки с комментариями)
      'no-restricted-exports': 'off', // * Разрешить при export указывать имя переменной, функции, класса
      'no-duplicate-imports' : 'error', // ! Требовать объединять импорты с одного файла
      'sort-imports'         : 'off', // * AF НЕ Требовать сотрировать импорты в алфавитном порядке
      'no-use-before-define' : [
        'error',
        {
          functions        : false, // * Разрешить использовать функции до их объвления
          classes          : true, // ! Запрет использовать классы до их объвления
          variables        : true, // ! Запрет использовать переменные до их объвления
          allowNamedExports: true, // ! Запрет использовать exports до их объвления
        },
      ],

      // ?  ==LEGACY & DEFENCE & НЕНУЖНЫЙ КОД== ? //
      'prefer-exponentiation-operator': 'error', // ! AF Запретить Math.pow() в пользу **
      'prefer-object-has-own'         : 'error', // ! AF Заперт Object.prototype.hasOwnProperty.call() в пользу Object.hasOwn()
      'prefer-object-spread'          : 'error', // ! AF Запрет Object.assign() c объектным литералом в качестве первого аргумента в пользу spread оператора
      'no-proto'                      : 'error', // ! Запрет на использование __proto__. Следует заменять на Object.getPrototypeOf и Object.setPrototypeOf
      'no-caller'                     : 'error', // ! Запрет устаревших arguments.caller и arguments.callee
      'no-iterator'                   : 'error', // ! Запрет устаревшего __iterator__
      'no-eval'                       : 'error', // ! Запрет потенциально опасного eval()
      'no-script-url'                 : 'error', // ! Запрет javascript: URL-адреса — eval() подобный
      // 'no-implied-eval': 'error', // ! Запрет передавать строку первым аргументом в setTimeout(), setInterval() — eval() подобный
      'no-sequences'                  : 'error', // ! Запрет на операторы запятой https://eslint.org/docs/latest/rules/no-sequences
      // 'no-array-constructor': 'error', // ! Запрет создавать массив через new Array()
      'no-new-wrappers'               : 'error', // ! Запрет создавать переменные с new String(), new Number() и new Boolean()
      'no-new-func'                   : 'error', // ! Запрет создания функций через new Function()
      'no-void'                       : 'error', // ! Запрет на void оператор

      // ?  ==СТИЛИСТИКА== ? //
      'max-depth'           : ['warn', { max: 5 }], // ? Подсвечивать глубину вложенных блоков более 5
      'no-alert'            : 'warn', // ? Подсвечивать alert, confirm и prompt. Стоит отказываться от данных конструкций, как слишком навязчивых для пользователя и создавать кастомные решения
      'no-console'          : 'warn', // ? Подсвечивать console
      'no-warning-comments' : ['warn', { terms: ['TODO', 'FIXME'], location: 'start' }], // ? Подсвечивать комментарии с TODO и FIXME для удобства
      'capitalized-comments': 'off', // * AF Разрешить комментарии, начинающиеся с маленькой буквы
      'no-inline-comments'  : 'off', // * Разрешить inline комментарии после кода
      'no-implicit-coercion': 'off', // * Разрешить краткое приведение типов (+, !!, ...)
      'no-plusplus'         : 'off', // * Разрешить унарные операторы ++ и --
      'no-lone-blocks'      : 'error', // ! Запрет ненужных вложенных блоков
      camelcase             : [
        'error',
        {
          properties         : 'always', // ! Запрет на другой стиль в переменных, кроме camelcase
          ignoreDestructuring: false, // ! Запрет на другой стиль в деструктурированном объекте, кроме camelcase
          ignoreImports      : false, // ! Запрет на другой стиль в импортах, кроме camelcase
          ignoreGlobals      : false, // ! Запрет на другой стиль в глобальных переменных, кроме camelcase
        },
      ],

      // ?  ==ПЕРЕМЕННЫЕ== ? //
      'no-var'                      : 'warn', // ? Подсвечивать объявления переменных через var
      'no-invalid-this'             : 'warn', // ? Подсвечивать где this может иметь значение undefined
      'init-declarations'           : 'off', // * Разрешить НЕ присваивать значение сразу же при объявлении переменной
      'logical-assignment-operators': 'off', // * AF Разрешать операторы логического присвоения
      'no-magic-numbers'            : 'off', // * Разрешить "магические числа". Данная настройка требует дополнительных тестов для создания исключений
      'sort-vars'                   : 'off', // * НЕ требовать сортировку переменных в алфавитном порядке
      'accessor-pairs'              : 'off', // * Разрешить объявление get / set отдельно без друг друга
      'grouped-accessor-pairs'      : ['error', 'getBeforeSet'], // ! Запрет "разносить" в коде get и set. Get всегда должен предшествовать set
      'one-var'                     : ['error', 'never'], // ! AF Запрет сокращать let,const,var при объявлении через несколько строчек
      'prefer-const'                : 'error', // ! AF Требовать const для переменной, если её значение не меняется
      'block-scoped-var'            : 'error', // ! Запрет использовать var вне блока видимости
      'no-shadow'                   : 'error', // ! Запрет на одинаковое название переменных в более узкой области видимости
      'no-useless-assignment'       : 'error', // ! Запрет присваивать значение переменной, если оно не будет прочитано хотябы единожды
      'no-undef-init'               : 'error', // ! AF Запрет на инициализацию переменной с undefined
      'no-undefined'                : 'error', // ! Запрет на использование undefined в качестве идентификатора
      'no-multi-assign'             : 'error', // ! Запрет объявления нескольких переменных через несколько =
      'no-underscore-dangle'        : 'error', // ! Запрет на использование _ в начале переменной (кроме свойств классов, которые с помощью eslint еще и будут подчеркивать приватность)
      'id-denylist'                 : [
        'error',
        'data',
        'err',
        'e',
        'cb',
        'callback',
      ], // ! Запрет использовать такие имена как 'err', 'e', 'cb', 'callback' в переменных, функциях, свойствах объекта, свойствах и методах класса
      'id-length': [
        'error',
        { min       : 2,
          exceptions: [
            'x',
            'y',
            'z',
            'i',
            'j',
            'k',
          ]},
      ], // ! Запрет использовать имена длиной меньше "error", кроме 'x', 'y', 'z' в переменных, функциях, свойствах объекта, свойствах и методах класса

      // ?  ==СТРОКИ== ? //
      'no-template-curly-in-string': 'error', // ! Запрет использовать шаблонные строки < "${}" > c любыми кавычками, кроме обратных
      'no-multi-str'               : 'error', // ! Запрет на многострочные строки
      'prefer-template'            : 'error', // ! AF Запрет на конкатенацию в пользу шаблонных литераллов
      'no-useless-concat'          : 'error', // ! Запрет бессмысленных объединений литералов или шаблонных литералов
      'no-octal-escape'            : 'error', // ! Запрет на восьмеричные escape-последовательности в строковых литералах. Следует заменять на unicode / hexadecimal

      // ?  ==РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ== ? //
      'no-div-regex': 'error', // ! AF Запрет знака равенства в начале регулярного выражения (дабы не спутать с оператором присвоения-деления /=)

      // ?  ==СРАВНЕНИЯ== ? //
      'no-bitwise'          : 'warn', // ? Подсвечивать побитовые операторы (|, &), которые могу быть опечаткой (||, &&)
      'no-negated-condition': 'off', // * Разрешить условия с отрицанием ! или !==
      'no-ternary'          : 'off', // * Разрешить тенарные операторы
      'no-nested-ternary'   : 'off', // * Разрешить тенарные сравнения с несколькими условиями
      curly                 : ['error', 'multi'], // * AF Разрешить не использовать фигурные скобки в одной строке с if, else, for, while, do
      'no-else-return'      : 'off', // * AF Разрешить return в блоке else, если уже есть return в блоке if
      'no-lonely-if'        : 'error', // ! AF Запрет на единственный if в блоке else. Предпочтительно заменить на else if
      eqeqeq                : 'error', // ! AF Запрет на использование НЕ строгого сравнения
      'no-unneeded-ternary' : 'error', // ! Запрет на банальные, ненужные тенарные операторы
      'no-self-compare'     : 'error', // ! Запрет сравнивать переменные сами с собой <if (x === x)>
      'default-case'        : 'error', // ! Запрет НЕ указывать default в switch, даже хотябы пустым — // No Default
      'default-case-last'   : 'error', // ! Запрет указывать default НЕ последним в списке case
      yoda                  : 'error', // ! AF Требовать правильный порядок сортировки при сравнении, а не в стиле гранд-мастер Ордена джедаев Йоды

      // ?  ==ЦИКЛЫ== ? //
      'no-await-in-loop'            : 'warn', // ? Подсвечивать await в циклах. Лучше заменять на Promise.all()
      'no-unmodified-loop-condition': 'warn', // ? Подсвечивать циклы while в которых переменная не меняется и может быть бессконечный цикл
      'no-continue'                 : 'off', // * Разрешить использовать continue
      'no-unreachable-loop'         : 'error', // ! Запрет циклов, тело которого подразумевает лишь одну итерацию
      'guard-for-in'                : 'error', // ! Требовать, чтобы for-in циклы включали в себя if оператор. Следует добавлять проверку на каждой итерации <if (Object.hasOwn(foo, key)) >
      'no-labels'                   : 'error', // ! Запрет меток
      'no-extra-label'              : 'error', // ! AF Запрет меток вместо break или continue
      'no-label-var'                : 'error', // ! Запрет метки, которые имеют общее имя с переменной

      // ?  ==ОБЪЕКТЫ== ? //
      'prefer-destructuring'   : 'warn', // ? AF Подсвечивать возможность деструктурирования из массива или объекта
      'dot-notation'           : ['warn', { allowPattern: 'VITE_\\w+' }], // ? AF Подсвечивать обращения к свойствам объекта через квадратные скобки, где можно использовать dot нотацию
      'sort-keys'              : 'off', // * НЕ требовать сортировку ключей в алфавитном порядке
      'no-object-constructor'  : 'error', // ! Запрет создавать new Object() без аргументов
      'object-shorthand'       : 'error', // ! AF Требовать сокращение имени свойства и значения свойства объекта, если они имеют одинаковое название
      'no-useless-computed-key': 'error', // ! AF Запрет на бессмысленные вычисляемые ключи объекта ({["a"]: "b"} => {"a": "b"})

      // ?  ==ФУНКЦИИ== ? //
      'func-names'            : ['warn', 'as-needed'], // ? Подсвечивать необходимость указать имя функции в тех местах, где это требуется
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }], // ? Подсвечивать, если количество строк в функции превышает 50 (не считая пустые строки и строки с комментариями)
      'max-params'            : ['warn', { max: 5 }], // ? Подсвечивать количество параметров функции более 5
      'max-nested-callbacks'  : ['warn', { max: 5 }], // ? Подсвечивать глубину вложенных callbacks более 5
      'func-style'            : 'off', // * Разрешить использовать любой стиль объявления функции
      'func-name-matching'    : 'off', // * Разрешить использовать именна функции при присвоении к переменной, без обязательного одинакового названия переменной и функции
      complexity              : 'off', // * Разрешить использовать любую цикломатическую сложность https://eslint.org/docs/latest/rules/complexity
      'max-statements'        : 'off', // * НЕ ограничивать количество объявления переменных в функции
      'no-implicit-globals'   : 'off', // * Разрешить объявление var и function в глобальной области
      'arrow-body-style'      : ['error', 'as-needed'], // ! AF Устанавливать фигурные скобки в стрелочных функциях только там где это требуется
      // 'require-await': 'error', // ! Запрет async без единого await
      'no-inner-declarations' : ['error'], // ! Запрет на объявление новых функций во вложеных блоках
      'consistent-return'     : ['error', { treatUndefinedAsUnspecified: true }], // ! Запрет неявного возвращения (undefined) при if внутри function
      'no-param-reassign'     : ['error', { props: true }], // ! Запрет на прямое изменение параметров функции внутри функции, кроме изменения свойств параметра-объекта
      'default-param-last'    : 'error', // ! Запрет указывать парамерты функции с default значениями до параметров без default значений
      // 'no-empty-function': 'error', // ! Запрет пустых функций (можно заполнить комментарием)
      'no-return-assign'      : 'error', // ! Запрет на присвоение после return. Может являться опечаткой сравнения == или ===
      'no-useless-return'     : 'error', // ! Запрет ненужных и избыточных return
      'no-extra-bind'         : 'error', // ! AF Запрет неиспользуемого bind (если нет обращения через this)
      'no-useless-call'       : 'error', // ! Запрет на ненужные вызовы .call() и .apply()
      // 'no-throw-literal': 'error', // ! Запрет на throw с примитивом. Лучше использовать throw new Error(...)
      // 'prefer-promise-reject-errors': 'error', // ! Требовать new Error() в Promise reject()
      'array-callback-return' : [
        'error',
        {
          //* Работа с return внутри цикличных-методов массива
          allowImplicit: false, // ! Запрет возвращать undefind значения в методах перебора, где требуется return (find, filter, sort, ...);
          checkForEach : true, // ! Запрет возвращать значение в цикле forEach.
          allowVoid    : false, // ! Запрет return void в forEach.
        },
      ],

      // ?  ==КЛАССЫ== ? //
      'no-constructor-return'                    : 'off', // * Разрешить возвращать значение в методе constructor() в классах
      'class-methods-use-this'                   : 'off', // * Разрешить методам класса не использовать хотябы единожды this
      'max-classes-per-file'                     : 'off', // * НЕ ограничивать количество классов в одном файле
      'new-cap'                                  : ['error', { newIsCap: true, capIsNew: true, properties: false }], // ! Требовать создавать экземпляр класса только с new и только с заглавной буквой
      'no-new'                                   : 'error', // ! Запрет использования new Class() без присвоения к переменной
      // 'no-useless-constructor': 'error', // ! Запрет пустых или ненужных конструкторов
      // * ===ESLINT STYLISTIC=== * //
      '@stylistic/array-bracket-spacing'         : ['error', 'never'], // ! AF Требовать удалять пробелы между [] и значениями в массивах
      '@stylistic/array-bracket-newline'         : ['error', { multiline: true }], // ! AF Требовать перенос первой и последних строк в массиве, если есть хоть один перенос
      '@stylistic/array-element-newline'         : ['error', { consistent: true, multiline: true, minItems: 5 }], // ! AF Требовать перенос элементов в массивае если их более 5
      '@stylistic/arrow-parens'                  : ['error', 'as-needed'], // ! AF Требовать удалять или добавлять скобки в стрелочных функциях, если это необходимо
      '@stylistic/arrow-spacing'                 : 'error', // ! AF Требовать пробелы с двух сторон от => в стрелочной функции
      '@stylistic/block-spacing'                 : 'error', // ! AF Требовать пробелы в начале и конце блока {}
      '@stylistic/brace-style'                   : 'error', // ! AF Требовать не переносить {} в блоках на новые строки
      '@stylistic/comma-dangle'                  : ['error', 'always-multiline'], // ! AF Требовать запятые в конце объекта
      '@stylistic/comma-spacing'                 : 'error', // ! AF Требовать прижимать запятые к переменной с пробелом после запятой и без пробела перед ней
      '@stylistic/comma-style'                   : 'error', // ! AF Требовать запятые после элемента в массиве в той же строке
      '@stylistic/computed-property-spacing'     : 'error', // ! AF Дополнительная настройка пробелов https://eslint.style/rules/default/computed-property-spacing
      '@stylistic/dot-location'                  : ['error', 'property'], // ! AF Требовать точку после обращения к свойству объекта сохранять на следующей строке
      '@stylistic/eol-last'                      : 'error', // ! AF Заканчивать файл символом новой строки LF
      '@stylistic/function-call-argument-newline': ['error', 'never'], // ! AF Ряд правил про перенос аргументов в функциях при вызове
      '@stylistic/function-call-spacing'         : 'error', // ! AF Запрет использования пробела между именем функции и открывающей круглой скобкой
      '@stylistic/function-paren-newline'        : 'error', // ! AF Ряд правил про перенос аргументов в функциях при объявлении
      '@stylistic/generator-star-spacing'        : 'error', // ! AF Обеспечить согласованный интервал между операторами `*` в функциях генератора
      '@stylistic/implicit-arrow-linebreak'      : 'error', // ! AF Запрет переноса строки перед телом функции со стрелкой
      '@stylistic/indent'                        : [
        'error',
        2,
        {
          VariableDeclarator    : 'first',
          SwitchCase            : 1,
          flatTernaryExpressions: true,
          ignoreComments        : true,
        },
      ], // ! AF Правила отступов https://eslint.style/rules/default/indent
      '@stylistic/key-spacing'                : ['error', { align: 'colon' }], // ! AF Стилистика интервала вокруг двоеточия в свойствах литерала объекта
      '@stylistic/keyword-spacing'            : 'error', // ! AF Стилистика пробелов в операторах if, else if, else, try и прочих
      '@stylistic/linebreak-style'            : 'off', // ! AF Знак окончания строки
      '@stylistic/lines-around-comment'       : 'error', // ! AF Требовать пустую строку перед комментарием
      '@stylistic/lines-between-class-members': 'error', // ! AF Требовать пустую строку после объявления свойства или метода класса
      '@stylistic/max-len'                    : [
        'error',
        {
          code                  : 120,
          tabWidth              : 2,
          ignoreUrls            : true,
          ignoreStrings         : true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals  : true,
          ignoreComments        : true,
        },
      ], // ! Максимальная длина строки
      '@stylistic/max-statements-per-line'         : 'error', // ! Ограничить количество операций в одной строке — 1
      '@stylistic/multiline-comment-style'         : ['error', 'separate-lines'], // ! AF Определение стиля многострочных комментариев
      '@stylistic/multiline-ternary'               : ['error', 'always-multiline'], // ! AF Требовать перенос строки если необходимо в тенарных операторах
      '@stylistic/new-parens'                      : 'error', // ! AF Требовать круглые скобки при создании экземлпяра класса
      '@stylistic/newline-per-chained-call'        : 'error', // ! AF Выравнивать цепочки вызовов методов через точку на новые строки, если их больше двух
      '@stylistic/no-confusing-arrow'              : ['error', { onlyOneSimpleParam: true }], // ! AF Предостерегать от ошибок связанных с схожим синтаксисом стрелочных функций и сравнения
      '@stylistic/no-extra-parens'                 : 'error', // ! AF Удалять ненужные скобки
      '@stylistic/no-extra-semi'                   : 'error', // ! AF Удалять ненужные дубляжи ;;
      '@stylistic/no-floating-decimal'             : 'error', // ! AF Требовать 0 в числах с точкой
      '@stylistic/no-mixed-operators'              : 'error', // ! Требовать заключать в скобки сложные выражения при сравнении
      '@stylistic/no-mixed-spaces-and-tabs'        : 'error', // ! Запрет использования смешанных пробелов и табуляций для отступов
      '@stylistic/no-multi-spaces'                 : 'off', // * AF Разрешение на пробелы подряд
      '@stylistic/no-multiple-empty-lines'         : 'error', // ! AF Запрет на пустые строки больше двух
      '@stylistic/no-tabs'                         : 'error', // ! AF Запрет Tab-ов
      '@stylistic/no-trailing-spaces'              : 'error', // ! AF Запрет на использование завершающих пробелов (пробелов, табуляции и других пробельных символов Юникода) в конце строк
      '@stylistic/no-whitespace-before-property'   : 'error', // ! AF Запрет на пробел после точки
      '@stylistic/nonblock-statement-body-position': 'error', // ! AF При однострочных операторах if, else, for и пр. сохранять операцию на той же строчке
      '@stylistic/object-curly-newline'            : 'error', // ! AF Требовать перенос строки между { и следующим за ним символом, а также между } и предыдущим символом объектных литералов или деструктурирующих назначений
      '@stylistic/object-curly-spacing'            : ['error', 'always', { arraysInObjects: false }], // ! AF Требовать пробелы в объекте между скобками {}
      '@stylistic/object-property-newline'         : ['error', { allowAllPropertiesOnSameLine: true }], // ! AF Правила переноса свойств в объекте
      '@stylistic/one-var-declaration-per-line'    : 'error', // ! AF Требовать перевод строки при объявлении переменной
      '@stylistic/operator-linebreak'              : ['error', 'before'], // ! AF Требовать математичский оператор сохранять в следующей строке, при переносе на новую строку
      '@stylistic/padded-blocks'                   : ['error', 'never'], // ! AF Запрет на использование пустых строк в начале и конце инструкций блока, тел функций, статических блоков класса, классов и switch инструкций
      '@stylistic/quote-props'                     : ['error', 'as-needed'], // ! AF Ставить кавычки в литералах объекта, при необходимости
      '@stylistic/quotes'                          : ['error', 'single'], // ! AF Требовать одинарные кавычки в строках
      '@stylistic/rest-spread-spacing'             : ['error', 'never'], // ! AF Запрет пробелов между spread оператором и значением
      '@stylistic/semi'                            : 'error', // ! AF Требовать ; в конце операции
      '@stylistic/semi-spacing'                    : 'error', // ! AF Присоединять ; с левой стороны. С правой стороны пробел
      '@stylistic/semi-style'                      : 'error', // ! AF Не переносить ; на новую строку
      '@stylistic/space-before-blocks'             : 'error', // ! AF Добавлять пробел перед {}
      '@stylistic/space-before-function-paren'     : ['error', 'never'], // ! AF Запрет пробела между названием функции и ()
      '@stylistic/space-in-parens'                 : 'error', // ! AF Запрет пробелов между ()
      '@stylistic/space-infix-ops'                 : 'error', // ! AF Добавить пробелы между математическими действиями
      '@stylistic/space-unary-ops'                 : ['error', { words: true, nonwords: false }], // ! AF Правила пробелов с унарными операторами
      '@stylistic/spaced-comment'                  : 'error', // ! AF Требовать пробел в начале коментария
      '@stylistic/switch-colon-spacing'            : 'error', // ! AF Требовать пробел после двоеточия в case/default
      '@stylistic/template-curly-spacing'          : 'error', // ! AF Запрет пробела внутри шаблоного выражения
      '@stylistic/template-tag-spacing'            : 'error', // ! AF Запрет на пробелы между функцией тега и ее шаблонным литералом
      '@stylistic/wrap-iife'                       : 'error', // ! AF Требовать заключать функцию в скобки, при самовызывающейся функции
      '@stylistic/wrap-regex'                      : 'error', // ! AF Требовать скобки для регулярных выражений, при вызове методов
      '@stylistic/yield-star-spacing'              : 'error', // ! AF Праавила пробела функции генератора
      '@stylistic/member-delimiter-style'          : 'error', // ! AF Правила оформления интерфейсов и типов в TS
      // '@stylistic/type-annotation-spacing'         : ['error', { before: false, after: false, overrides: { colon: { before: true, after: true } } }], // ! AF Правила оформления анотации типов в TS
      '@stylistic/indent-binary-ops'               : 'error', // ! AF Отступы для двоичных операторов многострочных выражений
      '@stylistic/type-generic-spacing'            : 'error', // ! AF Интервалы внутри дженериков
      '@stylistic/type-named-tuple-spacing'        : 'error', // ! AF Правила типов внутри кортежей
    },
  },
  {
    name           : 'mgdarrow-config-ts-vue',
    files          : ['**/*.{ts,vue}', '*.{ts,vue}'],
    languageOptions: {
      parser       : vueParser,
      parserOptions: {
        parser        : ts.parser,
        projectService: {
          allowDefaultProject: ['*.ts', '*.vue'],
        },
        extraFileExtensions,
      },
    },
    rules: {
      // * ===TS RECOMMENDED TYPE CHECKED=== * //
      '@typescript-eslint/await-thenable'                     : 'error', // ! Запрет ожидания (await) значения, которое не является асинхронным
      '@typescript-eslint/ban-ts-comment'                     : ['error', { minimumDescriptionLength: 10 }], // ! Запрет @ts-<directive> комментариев или требовать описания после директив
      'no-array-constructor'                                  : 'off',
      '@typescript-eslint/no-array-constructor'               : 'error', // ! AF Запрет создавать массив через new Array()
      '@typescript-eslint/no-array-delete'                    : 'error', // ! Запрет использовать оператора delete для значений массива
      '@typescript-eslint/no-base-to-string'                  : 'error', // ! Требовать, чтобы .toString() вызывался только для объектов, которые предоставляют полезную информацию в виде строки
      '@typescript-eslint/no-duplicate-enum-values'           : 'error', // ! Запрет повторяющихся значений элементов enum
      '@typescript-eslint/no-duplicate-type-constituents'     : 'error', // ! AF Запрет на дублирование типов в type
      '@typescript-eslint/no-empty-object-type'               : 'error', // ! Запрет применения типа пустого объекта : {}. Следует заменять на :object или :unknown
      '@typescript-eslint/no-explicit-any'                    : 'error', // ! AF Запрет явного приминения типа :any, :any[] и пр. Следует заменять в крайних случаях на :unknown
      '@typescript-eslint/no-extra-non-null-assertion'        : 'error', // ! AF Запрет дополнительные ненулевые утверждения по типу !!! или object?!.property
      '@typescript-eslint/no-floating-promises'               : 'error', // ! Требовать, чтобы инструкции, подобные Promise, обрабатывались надлежащим образом
      '@typescript-eslint/no-for-in-array'                    : 'error', // ! Запрет использовать for-in в массивах. Рекомендуется использовать for или forEach
      'no-implied-eval'                                       : 'off',
      '@typescript-eslint/no-implied-eval'                    : 'error', // ! Запрет передавать строку первым аргументом в setTimeout(), setInterval() — eval() подобный
      '@typescript-eslint/no-misused-new'                     : 'error', // ! Запрет на неправильное определение new и constructor
      '@typescript-eslint/no-misused-promises'                : 'error', // ! Запрет Promise без await, где он необходим
      '@typescript-eslint/no-namespace'                       : 'error', // ! Запрет на пространства имен (namespace) TypeScript, как устаревшую возможность TS
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // ! Запрет на ненулевые утверждения после необязательного выражения цепочки <foo?.bar! => foo?.bar >
      '@typescript-eslint/no-redundant-type-constituents'     : 'error', // ! Запрет в type указывать дополнительные объединения & или пересечения |, которые ни на что не влияют
      '@typescript-eslint/no-require-imports'                 : 'error', // ! Запрет вызова require()
      '@typescript-eslint/no-this-alias'                      : 'error', // ! Запрет назначать перменным значение this
      '@typescript-eslint/no-unnecessary-type-assertion'      : 'error', // ! AF Запрет на утверждения типа, которые не изменяют тип выражения
      '@typescript-eslint/no-unnecessary-type-constraint'     : 'error', // ! Запрет на ненужные ограничения для универсальных типов
      '@typescript-eslint/no-unsafe-argument'                 : 'error', // ! Запрет вызова функции со значением типа any
      '@typescript-eslint/no-unsafe-assignment'               : 'off', // * Разрешить присваивать (as) значение с типом any переменным и свойствам
      '@typescript-eslint/no-unsafe-call'                     : 'error', // ! Запрет вызова значения с типом any
      '@typescript-eslint/no-unsafe-declaration-merging'      : 'error', // ! Запрет на объединение небезопасных деклараций
      '@typescript-eslint/no-unsafe-enum-comparison'          : 'error', // ! Запрет сравнения перечисляемого значения (enum) со значением, отличным от перечисляемого
      '@typescript-eslint/no-unsafe-function-type'            : 'error', // ! AF Запрет использования небезопасного встроенного типа функции Function
      '@typescript-eslint/no-unsafe-member-access'            : 'error', // ! Запрет на доступ к значению с типом any
      '@typescript-eslint/no-unsafe-return'                   : 'error', // ! Запрет на возврат return с типом any из функции
      '@typescript-eslint/no-unsafe-unary-minus'              : 'error', // ! Требовать унарное отрицание для получения числа. - перед переменной будет работать только для number | bigint
      'no-unused-expressions'                                 : 'off',
      '@typescript-eslint/no-unused-expressions'              : 'error', // ! Запрет на неиспользуемые выражения
      'no-unused-vars'                                        : 'off',
      '@typescript-eslint/no-unused-vars'                     : 'error', // ! Запрет на неиспользуемые переменные
      'no-useless-constructor'                                : 'off',
      '@typescript-eslint/no-wrapper-object-types'            : 'error', // ! AF Запрет на использование запутанных встроенных оболочек примитивных классов (типы с больших букв)
      'no-throw-literal'                                      : 'off',
      '@typescript-eslint/only-throw-error'                   : 'error', // ! Запрет на throw с примитивом. Лучше использовать throw new Error(...)
      '@typescript-eslint/prefer-as-const'                    : 'error', // ! AF Требовать принудительно использовать as const вместо литерального типа
      '@typescript-eslint/prefer-namespace-keyword'           : 'error', // ! AF Требовать использовать namespace ключевое слово вместо module ключевого слова для объявления пользовательских модулей TypeScript
      'prefer-promise-reject-errors'                          : 'off',
      '@typescript-eslint/prefer-promise-reject-errors'       : 'error', // ! Требовать new Error() в Promise reject()
      'require-await'                                         : 'off',
      '@typescript-eslint/require-await'                      : 'error', // ! Запрет async без единого await
      '@typescript-eslint/restrict-plus-operands'             : [
        'error',
        {
          // ! Требовать чтобы оба операнда сложения были одного типа и были bigint, number или string
          allowAny            : false,
          allowBoolean        : false,
          allowNullish        : false,
          allowNumberAndString: false,
          allowRegExp         : false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          // ! Требовать у шаблонных литеральных выражений string тип
          allowAny    : false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber : false,
          allowRegExp : false,
          allowNever  : false,
        },
      ],
      'no-return-await'                          : 'off',
      '@typescript-eslint/return-await'          : ['error', 'error-handling-correctness-only'], // ! AF Требовать последовательное ожидание возвращаемых обещаний
      '@typescript-eslint/triple-slash-reference': 'error', // ! Запрет на некоторые директивы с тройной косой чертой в пользу объявлений импорта в стиле ES6
      '@typescript-eslint/unbound-method'        : 'error', // ! Требовать вызывають несвязанные методы с их ожидаемой областью действия

      // * ===TS STRICT TYPE CHECKED=== * //
      '@typescript-eslint/no-confusing-void-expression'           : 'error', // ! AF Требовать, чтобы выражения типа void отображались в позиции оператора
      '@typescript-eslint/no-dynamic-delete'                      : 'error', // ! AF Запрет использовать оператор delete для вычисляемых [] ключей объекта
      '@typescript-eslint/no-extraneous-class'                    : 'off', // * Разрешить использовать классы, состоящие только из статических функций (пространство имён). Не обязывать создавать набор функций и импортировать их через import * as ...
      '@typescript-eslint/no-invalid-void-type'                   : 'error', // ! Запрет :void в type (только с never | void), interface, generics и пр., где возвращаемых или вне общих типов
      '@typescript-eslint/no-meaningless-void-operator'           : 'error', // ! AF Запрет использовать ОПЕРАТОР void
      '@typescript-eslint/no-mixed-enums'                         : 'error', // ! Запрет на "смешанный" enum, который использует и строки, и числа
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error', // ! Запрет на ненулевые утверждения в левом операнде нулевого объединяющего оператора
      '@typescript-eslint/no-non-null-assertion'                  : 'error', // ! Запрет на ненулевые утверждения с помощью ! постфиксного оператора
      '@typescript-eslint/no-unnecessary-boolean-literal-compare' : 'error', // ! AF Запрет на сравнения на равенство с логическими литералами, когда в этом нет необходимости
      '@typescript-eslint/no-unnecessary-condition'               : 'error', // ! AF Запрет на условные выражения, в которых тип всегда является истинным или всегда ложным
      '@typescript-eslint/no-unnecessary-template-expression'     : 'error', // ! AF Запрет на ненужные шаблонные выражения
      '@typescript-eslint/no-unnecessary-type-arguments'          : 'error', // ! AF Запрет на использование аргументов типа, равных значению по умолчанию
      '@typescript-eslint/no-unnecessary-type-parameters'         : 'error', // ! Запрет на отображение параметров типа только один раз
      '@typescript-eslint/no-useless-constructor'                 : 'error', // ! Запрет пустых или ненужных конструкторов
      '@typescript-eslint/prefer-literal-enum-member'             : 'error', // ! Требовать чтобы все члены enum были буквальными значениями
      '@typescript-eslint/prefer-reduce-type-parameter'           : 'error', // ! AF Требовать использовать type parameter при вызове Array#reduce вместо приведения (as)
      '@typescript-eslint/prefer-return-this-type'                : 'error', // ! AF Требовать this, когда возвращается только this тип
      '@typescript-eslint/unified-signatures'                     : 'error', // ! Запрет на две перегрузки, которые могут быть объединены в одну с помощью объединения или необязательного параметра / rest
      '@typescript-eslint/use-unknown-in-catch-callback-variable' : 'error', // ! AF Требовать вводить аргументы в .catch() обратных вызовах как unknown

      // * ===TS STYLISTIC TYPE CHECKED=== * //
      '@typescript-eslint/adjacent-overload-signatures'   : 'error', // ! Требовать порядок сигнатур перегрузки функций
      '@typescript-eslint/array-type'                     : ['error', { default: 'generic', readonly: 'generic' }], // ! AF Требовать для массивов указывать тип только черещ T[] или Array<T>. (В данном конфиге только через generic)
      '@typescript-eslint/ban-tslint-comment'             : 'error', // ! AF Запрет на '// tslint:<rule-flag>' комментарии
      '@typescript-eslint/class-literal-property-style'   : 'error', // ! Требовать согласование стилей литералов в классах
      '@typescript-eslint/consistent-generic-constructors': 'error', // ! AF Требовать указывать аргументы универсального типа в аннотации типа или имени конструктора вызова конструктора
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'], // ! AF Запрет на Record тип в объектах
      '@typescript-eslint/consistent-type-assertions'     : [
        'error',
        {
          assertionStyle             : 'angle-bracket',
          objectLiteralTypeAssertions: 'allow',
        },
      ], // ! AF Требовать согласование стиля утверждения типа через <foo>, но не через as
      '@typescript-eslint/consistent-type-definitions'      : 'error', // ! AF Требовать объявлять тип объектов только через interface, а не через type
      '@typescript-eslint/dot-notation'                     : ['warn', { allowPattern: 'VITE_\\w+' }], // ? AF Подсвечивать обращения к свойствам объекта через квадратные скобки, где можно использовать dot нотацию
      '@typescript-eslint/no-confusing-non-null-assertion'  : 'error', // ! Запрет на ненулевое утверждение рядом с сравнением (чтобы небыло подобных случаев: a! == b; / a !== b; )
      'no-empty-function'                                   : 'off', // !
      '@typescript-eslint/no-empty-function'                : 'error', // ! Запрет пустых функций (можно заполнить комментарием)
      '@typescript-eslint/no-inferrable-types'              : 'error', // ! AF Запрет на бессмысленное явное объявление типов для переменных инициализированных числом, строкой или логическим значением
      '@typescript-eslint/non-nullable-type-assertion-style': 'error', // ! AF Требовать применять ненулевые утверждения поверх явных приведений через as типов
      '@typescript-eslint/prefer-find'                      : 'error', // ! Требует использовать Array.prototype.find() вместо Array.prototype.filter(), за которым следует [0] при поиске единственного результата
      '@typescript-eslint/prefer-for-of'                    : 'error', // ! Требовать использовать for-of вместо for, когда в for нет необходимости
      '@typescript-eslint/prefer-function-type'             : 'error', // ! AF Требовать использовать типы функций вместо интерфейсов с сигнатурами вызовов
      '@typescript-eslint/prefer-includes'                  : 'error', // ! AF Требовать использовать includes метод вместо indexOf, поскольку он возвращает false, а не -1 в случае отсутсвтия элемента
      '@typescript-eslint/prefer-nullish-coalescing'        : 'error', // ! Требовать использовать оператор объединения с нулевым значением вместо логических назначений или цепочки
      '@typescript-eslint/prefer-optional-chain'            : 'error', // ! AF Требовать использовать краткие необязательные цепные выражения вместо связанных логических and, отрицаемых логических or или пустых объектов
      '@typescript-eslint/prefer-regexp-exec'               : 'error', // ! AF Требовать использовать RegExp#exec вместо String#match, если не указан глобальный флаг /g.
      '@typescript-eslint/prefer-string-starts-ends-with'   : 'error', // ! AF Требовать использовать String#startsWith и String#endsWith вместо других эквивалентныъ методов проверки подстрок, где это возможно

      // * ===ESLINT VUE=== * //
      // ?  ==VUE REMOVE COMMON== ? //
      'no-useless-assignment': 'off',

      // ?  ==VUE BASE== ? //
      'vue/comment-directive': 'error', // * Разрешить использовать eslint-disable в <template> и блоках <style>, <script>
      'vue/jsx-uses-vars'    : 'error', // ! Запрет использовать неиспользуемые переменные в jsx

      // ?  ==VUE A PRIORITY== ? //
      'vue/multi-word-component-names'            : 'error', // ! Запрет однословных названий компонентов, кроме базовых
      'vue/no-arrow-functions-in-watch'           : 'error', // ! Запрет на функции со стрелками для watch
      'vue/no-async-in-computed-properties'       : 'error', // ! Запрет на асинхронные computed
      'vue/no-child-content'                      : 'error', // ! Запрет писать текст внутри, если уже есть v-html или v-text, которые приоритетнее
      'vue/no-v-text-v-html-on-component'         : 'error', // ! Запрет на v-text и v-html на компонентах
      'vue/no-computed-properties-in-data'        : 'error', // ! Запрет на вычисляемое свойство в data()
      'vue/no-deprecated-data-object-declaration' : 'error', // ! AF Запрет data() не через функцию
      'vue/no-deprecated-destroyed-lifecycle'     : 'error', // ! AF Запрет destroyed и beforeDestroy
      'vue/no-deprecated-dollar-listeners-api'    : 'error', // ! Запрет устаревшего $listeners
      'vue/no-deprecated-dollar-scopedslots-api'  : 'error', // ! AF Запрет устаревшего $scopedSlots
      'vue/no-deprecated-events-api'              : 'error', // ! Запрет устаревших $on, $off и $once
      'vue/no-deprecated-filter'                  : 'error', // ! Запрет устаревшего filters синтаксиса
      'vue/no-deprecated-functional-template'     : 'error', // ! Запрет functional синтаксиса
      'vue/no-deprecated-html-element-is'         : 'error', // ! Запрет устаревшего атрибута is на html теге (на компонентах можно)
      'vue/no-deprecated-inline-template'         : 'error', // ! Запрет устаревшего inline-template
      'vue/no-deprecated-props-default-this'      : 'error', // ! Запрет this в props default
      'vue/no-deprecated-router-link-tag-prop'    : 'error', // ! Запрет устаревшего атрибута tag в RouterLink
      'vue/no-deprecated-scope-attribute'         : 'error', // ! AF Запрет устаревшего атрибута scope
      'vue/no-deprecated-slot-attribute'          : 'error', // ! AF Запрет устаревшего атрибута slot
      'vue/no-deprecated-slot-scope-attribute'    : 'error', // ! AF Запрет устаревшего атрибута slot-scope
      'vue/no-deprecated-v-bind-sync'             : 'error', // ! AF Запрет устаревшего v-bind.sync
      'vue/no-deprecated-v-is'                    : 'error', // ! Запрет устаревшего v-is
      'vue/no-deprecated-v-on-native-modifier'    : 'error', // ! Запрет устаревшего v-on.native
      'vue/no-deprecated-v-on-number-modifiers'   : 'error', // ! AF Запрет устаревшего KeyboardEvent.keyCode в v-on
      'vue/no-deprecated-vue-config-keycodes'     : 'error', // ! Запрет устаревшего Vue.config.keyCodes
      'vue/no-dupe-keys'                          : 'error', // ! Запрет дублировать лигатуры computed, data, props
      'vue/no-dupe-v-else-if'                     : 'error', // ! Запрет дублирования условий в v-else-if
      'vue/no-duplicate-attributes'               : 'error', // ! Запрет иметь одинаковое название атрибута и v-bind атрибута, кроме class :class и style :style
      'vue/no-export-in-script-setup'             : 'error', // ! Запрет export в <script setup>
      'vue/no-lifecycle-after-await'              : 'error', // ! Запрет await перед хуками жизненного цикла
      'vue/no-expose-after-await'                 : 'error', // ! Запрет await перед expose() и defineExpose()
      'vue/no-watch-after-await'                  : 'error', // ! Запрет await перед watch()
      'vue/no-mutating-props'                     : 'error', // ! Запрет мутации props переменных
      'vue/no-parsing-error'                      : 'error', // ! Анализатор синтаксических ошибок в <template> по спецификации Parse Error HTML https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
      'vue/no-ref-as-operand'                     : 'error', // ! AF Анализ ошибок при отсутсвтии обращения к ref без .value
      'vue/no-reserved-component-names'           : 'error', // ! Запрет называть компоненты уже занятыми названиями Vue
      'vue/no-reserved-keys'                      : 'error', // ! Запрет использовать зарезервированные имена
      'vue/no-reserved-props'                     : 'error', // ! Запрет использовать зарезервированные имена в props
      'vue/no-shared-component-data'              : 'error', // ! AF Запрет использовать data не как функцию, возвращающую объект
      'vue/no-side-effects-in-computed-properties': 'error', // ! Запрет side effect в computed
      'vue/no-template-key'                       : 'error', // ! Запрет атрибута key в template компоненте (кроме template с v-for)
      'vue/no-textarea-mustache'                  : 'error', // ! Запрет на {{}} в textarea, вместо v-model
      'vue/no-unused-components'                  : 'warn', // ? Показывать неиспользуемые в template импортируемые компоненты
      'vue/no-unused-vars'                        : 'warn', // ? Показывать неиспользуемые переменные внутри области v-for
      'vue/no-use-computed-property-like-method'  : 'error', // ! Запрет использовать computed как method с ()
      'vue/no-use-v-if-with-v-for'                : 'error', // ! Запрет совмещать v-if и v-for
      'vue/no-useless-template-attributes'        : 'error', // ! Запрет в template использовать ненужные атрибуты
      'vue/no-v-for-template-key-on-child'        : 'error', // ! Требовать :key в template с v-for
      'vue/prefer-import-from-vue'                : 'error', // ! AF Запрет на импорт из пакета '@vue/*' вместо 'vue'
      'vue/require-component-is'                  : 'error', // ! Запрет на <component> без :is
      'vue/require-prop-type-constructor'         : 'error', // ! AF Запрет на некоторые типы props https://eslint.vuejs.org/rules/require-prop-type-constructor.html
      'vue/require-render-return'                 : 'error', // ! Запрет на отуствие возвращения значения в render()
      'vue/require-slots-as-functions'            : 'error', // ! Запрет использовать $slots не как функцию
      'vue/require-toggle-inside-transition'      : 'error', // ! Запрет элементов без дериктив v-if или v-show внутри <transition>
      'vue/require-v-for-key'                     : 'error', // ! Требовать :key, где есть v-for
      'vue/require-valid-default-prop'            : 'error', // ! Требовать чтобы defult в props было функцией
      'vue/return-in-computed-property'           : 'error', // ! Требовать return в computed
      'vue/return-in-emits-validator'             : 'error', // ! Требовать return в валидаторах emits
      'vue/use-v-on-exact'                        : 'error', // ! Требовать .exact если другие v-on события имеют модификаторы
      'vue/valid-attribute-name'                  : 'error', // ! Запрет недопустимых атрибутов
      'vue/valid-define-emits'                    : 'error', // ! Запрет недопустимых значений defineEmits
      'vue/valid-define-props'                    : 'error', // ! Запрет недопустимых значений defineProps
      'vue/valid-next-tick'                       : 'error', // ! AF Запрет nextTick без await
      'vue/valid-template-root'                   : 'error', // ! Запрет на невалидный корень внутри <template>
      'vue/valid-v-bind'                          : 'error', // ! Валидация v-bind
      'vue/valid-v-cloak'                         : 'error', // ! Валидация v-cloak
      'vue/valid-v-if'                            : 'error', // ! Валидация v-if
      'vue/valid-v-else'                          : 'error', // ! Валидация v-else
      'vue/valid-v-else-if'                       : 'error', // ! Валидация v-else-if
      'vue/valid-v-for'                           : 'error', // ! Валидация v-for
      'vue/valid-v-html'                          : 'error', // ! Валидация v-html
      'vue/valid-v-is'                            : 'error', // ! Валидация v-is
      'vue/valid-v-memo'                          : 'error', // ! Валидация v-memo
      'vue/valid-v-model'                         : 'error', // ! Валидация v-model
      'vue/valid-v-on'                            : 'error', // ! Валидация v-on
      'vue/valid-v-once'                          : 'error', // ! Валидация v-once
      'vue/valid-v-pre'                           : 'error', // ! Валидация v-pre
      'vue/valid-v-show'                          : 'error', // ! Валидация v-show
      'vue/valid-v-slot'                          : 'error', // ! Валидация v-slot
      'vue/valid-v-text'                          : 'error', // ! Валидация v-text

      // ?  ==VUE B PRIORITY== ? //
      'vue/attribute-hyphenation'                    : ['error', 'never'], // ! AF Использовать имена атрибутов только в camelCase, кроме data-, aria-, slot-scope и svg атрибуты
      'vue/component-definition-name-casing'         : 'error', // ! AF Использовать camelCase в названиях компонентов
      'vue/first-attribute-linebreak'                : ['error', { singleline: 'beside', multiline: 'below' }], // ! AF Форматировать атрибуты таким образом, чтобы при единой строке всё было в одну строку, а при нескольких строках переносить первый атрибут
      'vue/html-closing-bracket-newline'             : 'error', // ! AF Форматирование >
      'vue/html-closing-bracket-spacing'             : ['error', { startTag: 'never', endTag: 'never', selfClosingTag: 'always' }], // ! AF Запрет пробела перед > в открывающим, закрывающим теге, но не в самозакрывающимся теге
      'vue/html-end-tags'                            : 'error', // ! AF Запрет отсутствия закрывающего тега
      'vue/html-indent'                              : 'error', // ! AF Требовать отступы в <template>
      'vue/html-quotes'                              : 'error', // ! AF Требовать двойные кавычки в атрибутах
      'vue/html-self-closing'                        : 'error', // ! AF Требовать самозакрываться тег
      'vue/max-attributes-per-line'                  : ['error', { singleline: 4, multiline: 2 }], // ! AF Запрет в одной строке более 4 тегов, а в многострочном по 2 на строку
      'vue/multiline-html-element-content-newline'   : 'error', // ! AF Требовать перенос строк в содержимом, если это требуется
      'vue/mustache-interpolation-spacing'           : 'error', // ! AF Требовать пробелы между {{}} и значением
      'vue/no-multi-spaces'                          : ['error', { ignoreProperties: false }], // ! AF Требовать удалять двойные пробелы между атрибутами, кроме значений-объектов
      'vue/no-spaces-around-equal-signs-in-attribute': 'error', // ! AF Запрет пробелов вокруг = в атрибутах
      'vue/no-template-shadow'                       : 'error', // ! Запрет на литералы значения v-for, объявленых в других областях видимости
      'vue/one-component-per-file'                   : 'error', // ! Запрет дублировать имена файлов и названия компонентов
      'vue/prop-name-casing'                         : 'error', // ! Требовать camelCase в переменных props
      'vue/require-default-prop'                     : 'error', // ! Требовать default для всех props, которые не имеют requierd
      'vue/require-explicit-emits'                   : 'error', // ! Запрет emit которые небыли объявлены
      'vue/require-prop-types'                       : 'error', // ! Требовать типы в props
      'vue/singleline-html-element-content-newline'  : ['error', { externalIgnores: ['li']}], // ! AF Требовать перенос содержимого если есть необходимость
      'vue/v-bind-style'                             : ['error', 'shorthand', { sameNameShorthand: 'never' }], // ! AF Требовать : вместо v-bind и всегда явно указывать props
      'vue/v-on-event-hyphenation'                   : ['error', 'never'], // ! AF Требовать camelCase в v-on или @
      'vue/v-on-style'                               : 'error', // ! AF Требовать @ вместо v-on
      'vue/v-slot-style'                             : ['error', { atComponent: 'shorthand' }], // ! AF Требовать # вместо v-slot

      // ?  ==VUE С PRIORITY== ? //
      'vue/attributes-order'     : 'error', // ! AF Требовать порядок атрибутов
      'vue/no-lone-template'     : 'error', // ! Запрет ненужного внутреннего <template>
      'vue/no-multiple-slot-args': 'error', // ! Запрет передавать несколько аргументов в слоты с ограниченной областью действия
      'vue/no-v-html'            : 'error', // ! Запрет v-html, как потенциально опасный — eval() подобный
      'vue/order-in-components'  : 'error', // ! AF Требовать порядок в Option API
      'vue/this-in-template'     : 'error', // ! AF Запрет использовать this в <template>

      // ?  ==VUE UNCATEGORIZED== ? //
      'vue/block-lang'                           : ['error', { template: { lang: 'pug', allowNoLang: true }, script: { lang: 'ts', allowNoLang: true }, style: { lang: 'scss', allowNoLang: true } }], // ! WhiteList языков в блоках SFC
      'vue/block-order'                          : ['error', { order: ['template', 'script:not([setup])', 'script[setup]', 'style[lang=scss]']}], // ! AF Порядок блоков в SFC
      'vue/block-tag-newline'                    : 'error', // ! AF Требовать переносы в блоках
      'vue/component-api-style'                  : ['error', ['script-setup']], // ! Разрешить только Composition API с script setup
      'vue/component-name-in-template-casing'    : 'error', // ! AF Требовать PascalCase в тегах компонентов
      'vue/component-options-name-casing'        : 'error', // ! AF Требовать PascalCase в имени name Option API
      'vue/custom-event-name-casing'             : 'error', // ! Требовать camelCase в именах emit
      'vue/define-emits-declaration'             : 'error', // ! Требовать объявлять defineEmits в стиле type-literal в TS
      'vue/define-macros-order'                  : ['error', { order: ['defineModel', 'defineProps', 'defineEmits']}], // ! AF Требовать порядок define и ставить вверху кода
      'vue/define-props-declaration'             : 'error', // ! Требовать объявлять defineProps в стиле type-based в TS
      'vue/enforce-style-attribute'              : 'error', // ! Требовать использовать scoped в <style>
      'vue/html-button-has-type'                 : 'error', // ! Требовать type в button теге
      'vue/html-comment-content-newline'         : 'error', // ! AF Требовать переносы в многострочных комментариях html
      'vue/html-comment-content-spacing'         : 'error', // ! AF Требовать пробелы в комментариях html
      'vue/html-comment-indent'                  : 'error', // ! AF Требовать отступы в комментариях html
      'vue/match-component-file-name'            : 'error', // ! Правила именования и расширения файла в связке с name Option API
      'vue/match-component-import-name'          : 'error', // ! Требовать импортировать компоненты в Option API с согласованием имён
      'vue/max-lines-per-block'                  : 'off', // * Не ограничивать максимальное количество строк в блоках
      'vue/new-line-between-multi-line-property' : 'error', // ! AF Добавлять строки в верхнем объете между свойствами Option API
      'vue/next-tick-style'                      : 'error', // ! AF Требовать nextTick оформлять через Promise
      'vue/no-bare-strings-in-template'          : 'off', // * Разрешить пустые строки в <template>
      'vue/no-boolean-default'                   : 'off', // * Разрешить использовать props default boolean в значеии true
      'vue/no-deprecated-model-definition'       : ['error', { allowVue3Compat: true }], // ! Запрет использовать устаревшую конструкцию model
      'vue/no-duplicate-attr-inheritance'        : 'error', // ! Требовать применение inheritAttrs: false при обнаружении v-bind="$attrs"
      'vue/no-empty-component-block'             : 'off', // * Разрешить блокам быть пустыми
      'vue/no-multiple-objects-in-class'         : 'error', // ! Запрет нескольких объектов в массив :class
      'vue/no-potential-component-option-typo'   : 'error', // ! Коррекция опечаток в названиях блоков Option API
      'vue/no-ref-object-reactivity-loss'        : 'error', // ! Запрет использования реактивных переменных, приводящих к потере реактивности
      'vue/no-required-prop-with-default'        : 'error', // ! AF Приритет default над required для props
      'vue/no-restricted-block'                  : 'off', // * BlackList блоков, которые нельзя использовать. (По умолчанию пустой)
      'vue/no-restricted-call-after-await'       : 'off', // * BlackList методов, запрещённых после await. (По умолчанию пустой)
      'vue/no-restricted-class'                  : 'off', // * BlackList названия классов. (По умолчанию пустой)
      'vue/no-restricted-component-names'        : 'off', // * BlackList названия компонентов. (По умолчанию пустой)
      'vue/no-restricted-component-options'      : 'off', // * BlackList параметров компонентов Option API. (По умолчанию пустой)
      'vue/no-restricted-custom-event'           : 'off', // * BlackList emits. (По умолчанию пустой)
      'vue/no-restricted-html-elements'          : 'off', // * BlackList html тего. (По умолчанию пустой)
      'vue/no-restricted-props'                  : 'off', // * BlackList props. (По умолчанию пустой)
      'vue/no-restricted-static-attribute'       : 'off', // * BlackList атрибутов. (По умолчанию пустой)
      'vue/no-restricted-v-bind'                 : 'off', // * BlackList v-bind. (По умолчанию пустой)
      'vue/no-restricted-v-on'                   : 'off', // * BlackList v-on. (По умолчанию пустой)
      'vue/no-root-v-if'                         : 'error', // ! Запрет v-if в корне компонента. Лучше переносить в родителя
      'vue/no-setup-props-reactivity-loss'       : 'off', // * Разрешить контроль реактивности при передачи props через setput({value})
      'vue/no-static-inline-styles'              : 'off', // * Разрешить inline style
      'vue/no-template-target-blank'             : 'error', // ! Запрет target="_blank" без rel="noopener noreferrer" (Потенциальная опасность)
      'vue/no-this-in-before-route-enter'        : 'error', // ! Запрет this в beforeRouteEnter()
      'vue/no-undef-components'                  : ['error', { ignorePatterns: ['RouterView', 'RouterLink', '(V[A-Z]\\w+)']}], // ! Запрет на использование компонентов в <template> не импортированных в <script>
      'vue/no-undef-properties'                  : 'error', // ! Запрет на использование неопределённых переменных
      'vue/no-unsupported-features'              : 'error', // ! AF Запрет на неподдерживаемый синтаксис Vue.js в указанной версии
      'vue/no-unused-emit-declarations'          : 'warn', // ? Предупреждать об определённых но не используемых emit
      'vue/no-unused-properties'                 : 'warn', // ? Предупреждать об определённых но не используемых props
      'vue/no-unused-refs'                       : 'warn', // ? Предупреждать об определённых но не используемых refs
      'vue/no-use-v-else-with-v-for'             : 'error', // ! Запрет на v-else-if или v-else вместе с v-for
      'vue/no-useless-mustaches'                 : 'error', // ! AF Запрет статического текста без переменных в {{}}
      'vue/no-useless-v-bind'                    : 'off', // * AF Разрешить использовать v-bind с статическими строками
      'vue/no-v-text'                            : 'error', // ! Запрет v-text в пользу {{}}
      'vue/padding-line-between-blocks'          : 'error', // ! AF Требовать пустую строку между блоками
      'vue/padding-line-between-tags'            : 'off', // * AF Разрешить использовать или не использовать пустые строки между тегами html
      'vue/padding-lines-in-component-definition': 'off', // * AF Разрешить использовать или не использовать пустые строки в определении компонента
      'vue/prefer-define-options'                : 'error', // ! AF Требовать defineOptions() вместо export в <script setup>
      'vue/prefer-prop-type-boolean-first'       : 'error', // ! Требовать тип Boolean указывать перед String в props type, при указании через массив, для предотвращения ошибки
      'vue/prefer-separate-static-class'         : 'error', // ! AF Требовать определять статические классы в class, а не :class
      'vue/prefer-true-attribute-shorthand'      : 'off', // * Разрешить не использовать shorthand form объявления v-bind вместе с show и значением true
      'vue/require-direct-export'                : 'error', // ! Требовать прямой экспорт компонента
      'vue/require-emit-validator'               : 'error', // ! Требовать определение типов в emits
      'vue/require-explicit-slots'               : 'error', // ! Требовать определения типов slots через defineSlots
      'vue/require-expose'                       : 'error', // ! Требовать объявлениe общедоступных свойств с помощью expose
      'vue/require-macro-variable-name'          : 'error', // ! Требовать имена переменных props для defineProps, emit для defineEmits, slots для defineSlots, slots для useSlots, attrs для useAttrs
      'vue/require-name-property'                : 'error', // ! Требовать name в компоненте Option API
      'vue/require-prop-comment'                 : 'off', // * Разрешить не комментировать каждый prop
      'vue/require-typed-object-prop'            : 'off', // * Разрешить не применять типы к prop объектам
      'vue/require-typed-ref'                    : 'error', // ! Требовать явно указывать тип ref() и shallowRef() в TS
      'vue/script-indent'                        : 'error', // ! AF Требовать отступы в блоке <script>
      'vue/sort-keys'                            : 'off', // * Разрешить не сортировать свойства объектов в алфавитном порядке
      'vue/static-class-names-order'             : 'error', // ! AF Требовать алфавитный порядок классов в тегах
      'vue/v-for-delimiter-style'                : 'error', // ! AF Требовать использовать in, а не of в v-for
      'vue/v-if-else-key'                        : 'error', // ! AF Требовать :key если v-if/v-else-if/v-else используется на одинаковом комопенте
      'vue/v-on-handler-style'                   : 'off', // * AF Разрешить любой стиль обработки событий v-on https://eslint.vuejs.org/rules/v-on-handler-style.html
      'vue/valid-define-options'                 : 'error', // ! Валидация defineOptions

      // ?  ==VUE EXTENSION== ? //
      'vue/array-bracket-newline'  : ['error', { multiline: true }], // ! AF Применять в <template> @stylistic/array-bracket-newline
      'vue/array-bracket-spacing'  : ['error', 'never'], // ! AF Применять в <template> @stylistic/array-bracket-spacing
      'vue/array-element-newline'  : ['error', { consistent: true, multiline: true, minItems: 5 }], // ! AF Применять в <template> @stylistic/array-element-newline
      'vue/arrow-spacing'          : 'error', // ! AF Применять в <template> @stylistic/arrow-spacing
      'vue/block-spacing'          : 'error', // ! AF Применять в <template> @stylistic/block-spacing
      'vue/brace-style'            : 'error', // ! AF Применять в <template> @stylistic/brace-style
      'vue/camelcase'              : ['error', { properties: 'always', ignoreDestructuring: false, ignoreImports: false, ignoreGlobals: false }], // ! Применять в <template> camelcase
      'vue/comma-dangle'           : ['error', 'always-multiline'], // ! AF Применять в <template> @stylistic/comma-dangle
      'vue/comma-spacing'          : 'error', // ! AF Применять в <template> @stylistic/comma-spacing
      'vue/comma-style'            : 'error', // ! AF Применять в <template> @stylistic/comma-style
      'vue/dot-location'           : ['error', 'property'], // ! AF Применять в <template> @stylistic/dot-location
      'vue/dot-notation'           : ['warn', { allowPattern: 'VITE_\\w+' }], // ! AF Применять в <template> dot-notation
      'vue/eqeqeq'                 : 'error', // ! AF Применять в <template> eqeqeq
      'vue/func-call-spacing'      : 'error', // ! AF Применять в <template> @stylistic/function-call-spacing
      'vue/key-spacing'            : ['error', { align: 'colon' }], // ! AF Применять в <template> @stylistic/key-spacing
      'vue/keyword-spacing'        : 'error', // ! AF Применять в <template> @stylistic/keyword-spacing
      'vue/max-len'                : 'off', // * Не дублировать дополнительно в .vue @stylistic/max-len
      'vue/multiline-ternary'      : ['error', 'always-multiline'], // ! AF Применять в <template> @stylistic/multiline-ternary
      'vue/no-console'             : 'warn', // ! Применять в <template> no-console
      'vue/no-constant-condition'  : 'error', // ! Применять в <template> no-constant-condition
      'vue/no-empty-pattern'       : 'error', // ! Применять в <template> no-empty-pattern
      'vue/no-extra-parens'        : 'error', // ! AF Применять в <template> @stylistic/no-extra-parens
      'vue/no-loss-of-precision'   : 'warn', // ! Применять в <template> no-loss-of-precision
      'vue/no-sparse-arrays'       : 'error', // ! Применять в <template> no-sparse-arrays
      'vue/no-useless-concat'      : 'error', // ! Применять в <template> no-useless-concat
      'vue/object-curly-newline'   : 'error', // ! AF Применять в <template> @stylistic/object-curly-newline
      'vue/object-curly-spacing'   : ['error', 'always', { arraysInObjects: false }], // ! AF Применять в <template> @stylistic/object-curly-spacing
      'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // ! AF Применять в <template> @stylistic/object-property-newline
      'vue/object-shorthand'       : 'error', // ! AF Применять в <template> object-shorthand
      'vue/operator-linebreak'     : ['error', 'before'], // ! AF Применять в <template> @stylistic/operator-linebreak
      'vue/prefer-template'        : 'error', // ! AF Применять в <template> prefer-template
      'vue/quote-props'            : ['error', 'as-needed'], // ! AF Применять в <template> @stylistic/quote-props
      'vue/space-in-parens'        : 'error', // ! AF Применять в <template> @stylistic/space-in-parens
      'vue/space-infix-ops'        : 'error', // ! AF Применять в <template> @stylistic/space-infix-ops
      'vue/space-unary-ops'        : ['error', { words: true, nonwords: false }], // ! AF Применять в <template> @stylistic/space-unary-ops
      'vue/template-curly-spacing' : 'error', // ! AF Применять в <template> @stylistic/template-curly-spacing
    },
  },
];
