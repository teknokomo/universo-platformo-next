# Название пакета

[![Версия](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/teknokomo/universo-platformo-next)
[![Лицензия](https://img.shields.io/badge/license-MIT-green)](../../LICENSE)

## Обзор

[Краткое описание пакета в 2-3 предложениях. Объясните, какую проблему он решает и как вписывается в экосистему Universo Platformo Next.]

## Возможности

- **Возможность 1**: Описание первой ключевой возможности
- **Возможность 2**: Описание второй ключевой возможности
- **Возможность 3**: Описание третьей ключевой возможности
- **Возможность 4**: Дополнительные возможности по мере необходимости

## Установка

### Как пакет рабочего пространства

Этот пакет является частью монорепозитория Universo Platformo Next:

```bash
# Из корня репозитория
pnpm install
```

### Как внешняя зависимость (если опубликован)

```bash
pnpm add @universo/package-name
```

## Использование

### Базовое использование

```typescript
// Импорт пакета
import { MainClass, helperFunction } from '@universo/package-name'

// Базовый пример
const instance = new MainClass({
  option1: 'value1',
  option2: 'value2',
})

const result = instance.doSomething()
console.log(result)
```

### Продвинутое использование

```typescript
// Продвинутый пример с более сложной конфигурацией
import { MainClass, AdvancedOptions } from '@universo/package-name'

const advancedInstance = new MainClass({
  option1: 'value1',
  option2: 'value2',
  advanced: {
    setting1: true,
    setting2: 'custom',
  },
} as AdvancedOptions)

// Использование продвинутых возможностей
await advancedInstance.advancedMethod()
```

### С Next.js

```typescript
// Пример для фронтенд-пакетов
'use client' // или 'use server' по необходимости

import { ComponentName } from '@universo/package-name'

export default function Page() {
  return (
    <div>
      <ComponentName prop1="value" prop2={123} />
    </div>
  )
}
```

## Справочник API

### Классы

#### `MainClass`

Описание главного класса.

**Конструктор:**
```typescript
constructor(options: MainClassOptions)
```

**Методы:**

##### `doSomething(param: string): Result`

Описание того, что делает этот метод.

**Параметры:**
- `param` (string): Описание параметра

**Возвращает:** `Result` - Описание возвращаемого значения

**Пример:**
```typescript
const result = instance.doSomething('input')
```

### Функции

#### `helperFunction(input: Input): Output`

Описание вспомогательной функции.

**Параметры:**
- `input` (Input): Описание входного параметра

**Возвращает:** `Output` - Описание возвращаемого значения

**Пример:**
```typescript
const output = helperFunction({ key: 'value' })
```

### Типы

#### `MainClassOptions`

Параметры конфигурации для MainClass.

```typescript
interface MainClassOptions {
  /** Описание option1 */
  option1: string
  /** Описание option2 */
  option2: string
  /** Необязательные продвинутые настройки */
  advanced?: AdvancedOptions
}
```

#### `Result`

Тип результата, возвращаемый методами MainClass.

```typescript
interface Result {
  /** Статус успешности */
  success: boolean
  /** Данные результата */
  data?: unknown
  /** Сообщение об ошибке при неудаче */
  error?: string
}
```

### Компоненты (для UI-пакетов)

#### `ComponentName`

Описание React-компонента.

**Свойства:**

```typescript
interface ComponentNameProps {
  /** Описание prop1 */
  prop1: string
  /** Описание prop2 */
  prop2: number
  /** Необязательный обратный вызов */
  onAction?: (value: string) => void
}
```

**Пример:**
```tsx
<ComponentName 
  prop1="example" 
  prop2={42} 
  onAction={(value) => console.log(value)}
/>
```

## Архитектура

Этот пакет следует стандартной архитектуре Universo Platformo Next:

```
package-name/
└── base/
    ├── src/
    │   ├── components/      # React-компоненты (фронтенд)
    │   ├── routes/          # API-маршруты (бэкенд)
    │   ├── services/        # Бизнес-логика (бэкенд)
    │   ├── database/        # ORM-сущности (бэкенд)
    │   ├── types/           # TypeScript-определения
    │   ├── utils/           # Вспомогательные функции
    │   └── index.ts         # Главная точка входа
    ├── dist/                # Скомпилированный вывод (CJS + ESM)
    ├── package.json
    ├── tsconfig.json
    ├── vitest.config.ts
    ├── README.md            # Английская версия
    └── README-RU.md         # Этот файл
```

### Архитектурные решения

- **Решение 1**: Объяснение ключевого архитектурного решения
- **Решение 2**: Обоснование выбора технологии
- **Решение 3**: Используемый паттерн и почему

### Зависимости

- `dependency1`: Зачем нужна эта зависимость
- `dependency2`: Назначение этой зависимости
- `@universo/types`: Общие определения типов

## Разработка

### Предварительные требования

- Node.js >=18.15.0
- PNPM >=9

### Настройка

```bash
# Клонировать репозиторий
git clone https://github.com/teknokomo/universo-platformo-next.git
cd universo-platformo-next

# Установить зависимости
pnpm install

# Перейти к этому пакету
cd packages/package-name/base
```

### Сборка

```bash
# Собрать этот пакет
pnpm build

# Сборка в режиме отслеживания
pnpm dev
```

### Тестирование

```bash
# Запустить тесты
pnpm test

# Запустить тесты с покрытием
pnpm test:coverage

# Запустить тесты в режиме отслеживания
pnpm test:watch
```

### Линтинг

```bash
# Запустить ESLint
pnpm lint

# Исправить проблемы линтинга
pnpm lint:fix

# Форматировать с помощью Prettier
pnpm format
```

## Участие в разработке

Пожалуйста, прочтите [CONTRIBUTING.md](../../CONTRIBUTING.md) для получения подробной информации о нашем кодексе поведения и процессе отправки pull request.

### Процесс разработки

1. Создайте Issue с описанием функции или ошибки
2. Создайте ветку функции из `main`
3. Внесите изменения, следуя соглашениям проекта
4. Напишите или обновите тесты
5. Обновите документацию (на английском и русском языках)
6. Отправьте Pull Request со ссылкой на Issue

### Стиль кода

- Следуйте требованиям строгого режима TypeScript
- Используйте осмысленные имена переменных и функций
- Добавляйте JSDoc-комментарии для публичных API
- Делайте функции небольшими и сфокусированными
- Пишите тесты для всех новых функций

## Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](../../LICENSE) для подробностей.

## Благодарности

- Основано на архитектурных паттернах из [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react)
- Построено с [Next.js](https://nextjs.org/)
- UI-компоненты на базе [Material-UI](https://mui.com/)
- Интеграция базы данных с [Supabase](https://supabase.com/)

## Поддержка

По вопросам или проблемам:

- Создайте issue в [репозитории GitHub](https://github.com/teknokomo/universo-platformo-next/issues)
- Обратитесь к [основной документации проекта](../../README.md)
- Контакт: [universo.pro@yandex.com](mailto:universo.pro@yandex.com)

---

**Версия**: 0.1.0  
**Последнее обновление**: 2025-11-17
