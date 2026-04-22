// ============================================
// DEMO DATA for English Campus / Tense Lab
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'student' | 'admin';
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  cover_image: string;
  status: 'active' | 'draft' | 'archived';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_provider: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  product_id: string;
  access_status: 'active' | 'expired' | 'revoked';
  granted_at: string;
  expires_at: string | null;
}

export interface Section {
  id: string;
  product_id: string;
  title: string;
  description: string;
  sort_order: number;
  is_published: boolean;
}

export interface Lesson {
  id: string;
  section_id: string;
  title: string;
  short_description: string;
  lesson_number: number;
  status: 'published' | 'draft';
  video_url: string;
  note_content: string;
  sort_order: number;
  is_published: boolean;
}

export interface Material {
  id: string;
  title: string;
  short_description: string;
  category: string;
  material_type: 'pdf' | 'cheatsheet' | 'table' | 'guide' | 'reference';
  file_url: string;
  related_lesson_id: string | null;
  related_section_id: string | null;
  is_published: boolean;
  is_featured: boolean;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  prompt: string;
  exercise_type: 'multiple_choice' | 'fill_gap' | 'error_correction' | 'choose_context' | 'reorder';
  tense_tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  options_json: string[];
  correct_answer: string;
  explanation: string;
  hint: string;
  confusion_note: string;
  is_active: boolean;
}

export interface Attempt {
  id: string;
  user_id: string;
  exercise_id: string;
  mode: 'lesson' | 'trainer_topic' | 'trainer_compare' | 'trainer_mixed' | 'trainer_weak';
  selected_answer: string;
  is_correct: boolean;
  score_delta: number;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completed_at: string | null;
}

export interface TrainerStats {
  id: string;
  user_id: string;
  accuracy_avg: number;
  practices_completed: number;
  academic_points: number;
  weak_topics_json: string[];
  updated_at: string;
}

// ---- DEMO INSTANCES ----

export const DEMO_PRODUCT: Product = {
  id: 'prod_tenselab',
  title: 'Tense Lab',
  description: 'Полный практикум по временам английского языка. 13 уроков с видео, конспектами, упражнениями, тренажёром и библиотекой материалов.',
  price: 5490,
  slug: 'tense-lab',
  cover_image: '',
  status: 'active',
  created_at: '2025-01-15',
};

export const DEMO_USERS: User[] = [
  { id: 'user_admin', name: 'Campus Admin', email: 'admin@englishcampus.io', role: 'admin', created_at: '2025-01-01' },
  { id: 'user_student', name: 'Анна Петрова', email: 'anna@example.com', role: 'student', created_at: '2025-02-10' },
  { id: 'user_student2', name: 'Михаил Иванов', email: 'mikhail@example.com', role: 'student', created_at: '2025-03-01' },
];

export const DEMO_ORDERS: Order[] = [
  { id: 'ord_1', user_id: 'user_student', product_id: 'prod_tenselab', amount: 5490, payment_status: 'paid', payment_provider: 'demo', created_at: '2025-02-10' },
  { id: 'ord_2', user_id: 'user_student2', product_id: 'prod_tenselab', amount: 5490, payment_status: 'paid', payment_provider: 'demo', created_at: '2025-03-01' },
];

export const DEMO_ENROLLMENTS: Enrollment[] = [
  { id: 'enr_1', user_id: 'user_student', product_id: 'prod_tenselab', access_status: 'active', granted_at: '2025-02-10', expires_at: null },
  { id: 'enr_2', user_id: 'user_student2', product_id: 'prod_tenselab', access_status: 'active', granted_at: '2025-03-01', expires_at: null },
];

export const DEMO_SECTIONS: Section[] = [
  { id: 'sec_1', product_id: 'prod_tenselab', title: 'Present Foundations', description: 'Основы настоящего времени: to be, Simple, Continuous и их сравнение', sort_order: 1, is_published: true },
  { id: 'sec_2', product_id: 'prod_tenselab', title: 'Past System', description: 'Система прошедшего времени: Simple, Continuous и различия', sort_order: 2, is_published: true },
  { id: 'sec_3', product_id: 'prod_tenselab', title: 'Perfect System', description: 'Перфектные времена: Present Perfect, Past Perfect и Continuous формы', sort_order: 3, is_published: true },
  { id: 'sec_4', product_id: 'prod_tenselab', title: 'Future System', description: 'Будущее время: основные и продвинутые формы', sort_order: 4, is_published: true },
];

export const DEMO_LESSONS: Lesson[] = [
  {
    id: 'les_1', section_id: 'sec_1', title: 'To be (am / is / are)', short_description: 'Глагол «быть»: am / is / are — базовый кирпичик английского',
    lesson_number: 1, status: 'published', video_url: '', sort_order: 1, is_published: true,
    note_content: `## Глагол to be

### 1. Что такое to be
**To be** — это глагол «быть». В английском предложении почти всегда нужен глагол, даже там, где в русском его нет.

- Я дома. → I **am** at home.
- Он врач. → He **is** a doctor.
- Они устали. → They **are** tired.

### 2. Когда используется
- **Кто / что:** I **am** a teacher.
- **Какой:** She **is** tall.
- **Где:** They **are** at work.
- **Откуда:** I **am** from Russia.
- **Состояние / погода:** It **is** cold.

### 3. Формы глагола to be
| Подлежащее | Форма | Пример |
|------------|-------|--------|
| I | am | I **am** ready. |
| he / she / it | is | She **is** at school. |
| we / you / they | are | They **are** friends. |

### 4. Утвердительное предложение
**Подлежащее + am / is / are + остальная информация**

- I **am** ready.
- He **is** my uncle.
- We **are** friends.

### 5. Краткие формы
| Полная | Краткая |
|--------|---------|
| I am | I'm |
| he is / she is / it is | he's / she's / it's |
| we are / you are / they are | we're / you're / they're |

### 6. Отрицание
**Подлежащее + am / is / are + not**

| Полная | Краткая |
|--------|---------|
| I am not | I'm not |
| he is not | he isn't |
| they are not | they aren't |

- I'**m not** cold.
- He **isn't** late.
- They **aren't** in the car.

### 7. Общий вопрос
В вопросе меняется порядок слов: **am / is / are + подлежащее + … ?**

- She **is** at home. → **Is** she at home?
- They **are** rich. → **Are** they rich?

### 8. Специальные вопросы
**Вопросительное слово + am / is / are + подлежащее + ?**

- **Where are** you from?
- **How are** you?
- **What is** your name?
- **Why is** he late?

### 9. Краткие ответы
- Are you busy? — **Yes, I am.** / **No, I'm not.**
- Is the soup hot? — **Yes, it is.** / **No, it isn't.**
- Are we early? — **Yes, we are.** / **No, we aren't.**

### 10. Три главные формулы
| Тип | Формула | Пример |
|-----|---------|--------|
| Утверждение | Subj + am/is/are | She **is** happy. |
| Отрицание | Subj + am/is/are + not | She **isn't** happy. |
| Вопрос | Am/Is/Are + Subj + ? | **Is** she happy? |

### 11. Частые ошибки
- ❌ I in the garden → ✅ I **am** in the garden
- ❌ The shops **is** open → ✅ The shops **are** open
- ❌ It **is** sunny today? → ✅ **Is** it sunny today?

### 12. Итог
- В английском предложении нужен глагол.
- У to be три формы: **am / is / are**.
- Отрицание — через **not** после глагола.
- Вопрос — через изменение порядка слов.`
  },
  {
    id: 'les_2', section_id: 'sec_1', title: 'Present Simple', short_description: 'Рутина, факты, регулярные действия',
    lesson_number: 2, status: 'published', video_url: '', sort_order: 2, is_published: true,
    note_content: `## Present Simple

### Когда используется
- **Регулярные действия и рутина:** I work every day.
- **Общие факты и истины:** The sun rises in the east.
- **Расписания:** The train leaves at 9 AM.

### Структура
| Форма | Пример |
|-------|--------|
| **+** | I/You/We/They **work**. He/She/It **works**. |
| **−** | I **don't work**. He **doesn't work**. |
| **?** | **Do** you work? **Does** he work? |

### Маркеры времени
always, usually, often, sometimes, rarely, never, every day/week/year

### Типичные ошибки
- ❌ He work → ✅ He **works** (не забывай -s/-es в 3 лице)
- ❌ Does he works? → ✅ Does he **work**? (после does глагол без -s)

### Примеры
1. I **drink** coffee every morning.
2. She **doesn't** like spicy food.
3. **Do** they **live** in London?`
  },
  {
    id: 'les_3', section_id: 'sec_1', title: 'Present Continuous', short_description: 'Действие сейчас, временные процессы',
    lesson_number: 3, status: 'published', video_url: '', sort_order: 3, is_published: true,
    note_content: `## Present Continuous

### Когда используется
- **Действие прямо сейчас:** I am reading a book.
- **Временная ситуация:** She is staying with friends this week.
- **Изменения и тренды:** Prices are rising.
- **Запланированное ближайшее будущее:** We are meeting tomorrow.

### Структура
| Форма | Пример |
|-------|--------|
| **+** | I **am working**. She **is working**. They **are working**. |
| **−** | I **am not working**. He **isn't working**. |
| **?** | **Are** you working? **Is** she working? |

### Маркеры времени
now, right now, at the moment, currently, today, this week

### Типичные ошибки
- ❌ I working → ✅ I **am** working (нужен вспомогательный be)
- ❌ He is work → ✅ He is **working** (-ing обязателен)
- ❌ I am knowing → ✅ I **know** (stative verbs не используются в Continuous)`
  },
  {
    id: 'les_4', section_id: 'sec_1', title: 'Present Simple vs Present Continuous', short_description: 'Постоянное vs происходящее сейчас',
    lesson_number: 4, status: 'published', video_url: '', sort_order: 4, is_published: true,
    note_content: `## Present Simple vs Present Continuous

### Ключевое различие
| Present Simple | Present Continuous |
|---------------|-------------------|
| Постоянное, регулярное | Временное, прямо сейчас |
| I **work** from home. | I **am working** from home today. |
| She **plays** tennis. | She **is playing** tennis right now. |

### Stative verbs (глаголы состояния)
Не используются в Continuous: know, like, love, hate, want, need, believe, understand, remember, belong, seem

### Примеры сравнения
1. He **drinks** tea every morning. (привычка) → He **is drinking** tea right now. (сейчас)
2. I **live** in Moscow. (постоянно) → I **am living** in a hotel this month. (временно)`
  },
  {
    id: 'les_5', section_id: 'sec_2', title: 'Past Simple', short_description: 'Завершённые действия в прошлом',
    lesson_number: 5, status: 'published', video_url: '', sort_order: 1, is_published: true,
    note_content: `## Past Simple

### Когда используется
- **Завершённое действие в прошлом:** I visited Paris last year.
- **Последовательность действий:** She woke up, had breakfast and left.
- **Прошлые привычки:** We played together as children.

### Структура
| Форма | Пример |
|-------|--------|
| **+** | I/He/They **worked**. I/He **went**. |
| **−** | I **didn't work**. He **didn't go**. |
| **?** | **Did** you work? **Did** he go? |

### Маркеры времени
yesterday, last week/month/year, ago, in 2020, when I was young

### Типичные ошибки
- ❌ Did he went? → ✅ Did he **go**?
- ❌ I didn't went → ✅ I didn't **go**`
  },
  {
    id: 'les_6', section_id: 'sec_2', title: 'Past Continuous', short_description: 'Процесс в прошлом, фон действия',
    lesson_number: 6, status: 'published', video_url: '', sort_order: 2, is_published: true,
    note_content: `## Past Continuous

### Когда используется
- **Процесс в определённый момент прошлого:** At 8 PM I was reading.
- **Фон для другого действия:** I was walking when it started to rain.
- **Параллельные действия:** She was cooking while he was cleaning.

### Структура
| Форма | Пример |
|-------|--------|
| **+** | I/He **was working**. They **were working**. |
| **−** | I **wasn't working**. They **weren't working**. |
| **?** | **Was** he working? **Were** they working? |

### Маркеры
at that moment, while, when, all day yesterday, from 5 to 7`
  },
  {
    id: 'les_7', section_id: 'sec_2', title: 'Past Simple vs Past Continuous', short_description: 'Событие vs процесс в прошлом',
    lesson_number: 7, status: 'published', video_url: '', sort_order: 3, is_published: true,
    note_content: `## Past Simple vs Past Continuous

### Ключевое различие
| Past Simple | Past Continuous |
|------------|----------------|
| Завершённое событие | Процесс, фон |
| I **saw** him. | I **was walking** home. |

### Классическая формула
**When** + Past Simple, Past Continuous (или наоборот)
- When she **called**, I **was sleeping**.
- I **was reading** when the lights **went** out.`
  },
  {
    id: 'les_8', section_id: 'sec_3', title: 'Present Perfect', short_description: 'Опыт, результат, связь с настоящим',
    lesson_number: 8, status: 'published', video_url: '', sort_order: 1, is_published: true,
    note_content: `## Present Perfect

### Когда используется
- **Опыт:** I have visited Japan.
- **Результат, важный сейчас:** She has lost her keys (и сейчас не может войти).
- **Незавершённый период:** I have read 3 books this month.

### Структура
**have/has + V3 (past participle)**

### Маркеры
ever, never, already, yet, just, recently, so far, this week/month/year

### Типичные ошибки
- ❌ I have went → ✅ I have **gone**
- ❌ I have seen him yesterday → ✅ I **saw** him yesterday (с конкретным прошлым → Past Simple)`
  },
  {
    id: 'les_9', section_id: 'sec_3', title: 'Present Perfect vs Past Simple', short_description: 'Результат сейчас vs конкретное прошлое',
    lesson_number: 9, status: 'published', video_url: '', sort_order: 2, is_published: true,
    note_content: `## Present Perfect vs Past Simple

### Ключевое различие
| Present Perfect | Past Simple |
|----------------|------------|
| Связь с настоящим, нет точного времени | Конкретное время в прошлом |
| I **have been** to London. | I **went** to London in 2020. |
| She **has just arrived**. | She **arrived** 10 minutes ago. |`
  },
  {
    id: 'les_10', section_id: 'sec_3', title: 'Present Perfect Continuous', short_description: 'Длительность до настоящего',
    lesson_number: 10, status: 'published', video_url: '', sort_order: 3, is_published: true,
    note_content: `## Present Perfect Continuous

### Когда используется
- **Действие началось в прошлом и продолжается:** I have been studying for 3 hours.
- **Недавнее длительное действие с видимым результатом:** She's been crying (глаза красные).

### Структура
**have/has been + V-ing**

### Маркеры
for, since, all day, how long, lately, recently`
  },
  {
    id: 'les_11', section_id: 'sec_3', title: 'Past Perfect + Past Perfect Continuous', short_description: 'Что было раньше и как долго',
    lesson_number: 11, status: 'published', video_url: '', sort_order: 4, is_published: true,
    note_content: `## Past Perfect + Past Perfect Continuous

### Past Perfect: had + V3
Действие, завершённое **до** другого прошлого действия.
- When I arrived, they **had already left**.

### Past Perfect Continuous: had been + V-ing
Длительный процесс **до** момента в прошлом.
- She **had been waiting** for 2 hours when the bus finally came.`
  },
  {
    id: 'les_12', section_id: 'sec_4', title: 'Future Forms', short_description: 'will, be going to, Present Simple/Continuous for Future',
    lesson_number: 12, status: 'published', video_url: '', sort_order: 1, is_published: true,
    note_content: `## Future Forms

### will
- Спонтанные решения: I'll help you.
- Предсказания: It will rain tomorrow.
- Обещания: I will call you.

### be going to
- Планы и намерения: I'm going to study abroad.
- Очевидные предсказания: Look at those clouds — it's going to rain.

### Present Simple for Future
- Расписания: The flight leaves at 6 AM.

### Present Continuous for Future
- Договорённости: We are meeting them at 5.`
  },
  {
    id: 'les_13', section_id: 'sec_4', title: 'Advanced Future Forms', short_description: 'Future Continuous, Future Perfect, Future Perfect Continuous',
    lesson_number: 13, status: 'published', video_url: '', sort_order: 2, is_published: true,
    note_content: `## Advanced Future Forms

### Future Continuous: will be + V-ing
Процесс в определённый момент будущего.
- At 10 AM tomorrow, I **will be working**.

### Future Perfect: will have + V3
Действие завершится к определённому моменту.
- By next year, I **will have graduated**.

### Future Perfect Continuous: will have been + V-ing
Длительность к определённому моменту.
- By June, I **will have been learning** English for 5 years.`
  },
];

// All available tense tags for trainer checkboxes
export const ALL_TENSE_TAGS = [
  { key: 'to_be', label: 'To be' },
  { key: 'present_simple', label: 'Present Simple' },
  { key: 'present_continuous', label: 'Present Continuous' },
  { key: 'past_simple', label: 'Past Simple' },
  { key: 'past_continuous', label: 'Past Continuous' },
  { key: 'present_perfect', label: 'Present Perfect' },
  { key: 'present_perfect_continuous', label: 'Present Perfect Continuous' },
  { key: 'past_perfect', label: 'Past Perfect' },
  { key: 'future_will', label: 'Future (will)' },
  { key: 'future_going_to', label: 'Future (going to)' },
];

export const DEMO_EXERCISES: Exercise[] = [
  // ==========================================
  // Lesson 1 — To be (am / is / are)
  // ==========================================

  // --- Упражнение 1. Выберите правильный вариант (15 пунктов) ---
  { id: 'ex_1_1_01', lesson_id: 'les_1', prompt: 'Упр. 1.1 — I ___ at home.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'am',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'I → am, he/she/it → is, we/you/they → are.', is_active: true },
  { id: 'ex_1_1_02', lesson_id: 'les_1', prompt: 'Упр. 1.2 — She ___ my sister.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'С she → is.', hint: 'She — 3-е лицо ед. числа.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_1_03', lesson_id: 'les_1', prompt: 'Упр. 1.3 — We ___ ready.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'С we → are.', hint: 'We — мн. число.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_1_04', lesson_id: 'les_1', prompt: 'Упр. 1.4 — It ___ cold today.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'It → is.', hint: 'It — 3-е лицо ед. числа.',
    confusion_note: 'It всегда идёт с is.', is_active: true },
  { id: 'ex_1_1_05', lesson_id: 'les_1', prompt: 'Упр. 1.5 — They ___ in the kitchen.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'С they → are.', hint: 'They — мн. число.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_1_06', lesson_id: 'les_1', prompt: 'Упр. 1.6 — He ___ very tired.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'С he → is.', hint: 'He — 3-е лицо ед. числа.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_1_07', lesson_id: 'les_1', prompt: 'Упр. 1.7 — You ___ right.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'С you → are (всегда).', hint: 'You → are.',
    confusion_note: 'You всегда с are, даже когда речь об одном человеке.', is_active: true },
  { id: 'ex_1_1_08', lesson_id: 'les_1', prompt: 'Упр. 1.8 — My parents ___ at work.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'My parents — мн. число → are.', hint: 'Сколько родителей? Больше одного.',
    confusion_note: 'Главное — число подлежащего.', is_active: true },
  { id: 'ex_1_1_09', lesson_id: 'les_1', prompt: 'Упр. 1.9 — The children ___ in the park.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'Children — мн. число → are.', hint: 'Children — это мн. число от child.',
    confusion_note: 'child → is, children → are.', is_active: true },
  { id: 'ex_1_1_10', lesson_id: 'les_1', prompt: 'Упр. 1.10 — My bag ___ on the chair.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'My bag — один предмет → is.', hint: 'Сколько сумок? Одна.',
    confusion_note: 'My bag → is, my bags → are.', is_active: true },
  { id: 'ex_1_1_11', lesson_id: 'les_1', prompt: 'Упр. 1.11 — We ___ from Poland.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'С we → are.', hint: 'We — мн. число.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_1_12', lesson_id: 'les_1', prompt: 'Упр. 1.12 — The soup ___ hot.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'Soup — один предмет → is.', hint: 'Soup — ед. число.',
    confusion_note: 'Если предмет один → is.', is_active: true },
  { id: 'ex_1_1_13', lesson_id: 'les_1', prompt: 'Упр. 1.13 — He ___ my English teacher.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'is',
    explanation: 'С he → is.', hint: 'He — 3-е лицо ед. числа.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_1_14', lesson_id: 'les_1', prompt: 'Упр. 1.14 — The keys ___ on the table.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'are',
    explanation: 'Keys — мн. число → are.', hint: 'Сколько ключей? Больше одного.',
    confusion_note: 'My bag → is, the keys → are.', is_active: true },
  { id: 'ex_1_1_15', lesson_id: 'les_1', prompt: 'Упр. 1.15 — I ___ hungry.',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'am',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'I → am, никогда is/are.', is_active: true },

  // --- Упражнение 2. Составьте предложения из слов (8 пунктов) ---
  { id: 'ex_1_2_01', lesson_id: 'les_1', prompt: 'Упр. 2.1 — Составь предложение: I / am / tired',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['I am tired.', 'Am I tired.', 'Tired am I.', 'I tired am.'],
    correct_answer: 'I am tired.',
    explanation: 'Подлежащее + am/is/are + остальное.', hint: 'Сначала I, потом am, потом tired.',
    confusion_note: 'Прямой порядок: subject + to be + rest.', is_active: true },
  { id: 'ex_1_2_02', lesson_id: 'les_1', prompt: 'Упр. 2.2 — Составь предложение: she / is / at home',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['She is at home.', 'Is she at home.', 'She at home is.', 'At home she is.'],
    correct_answer: 'She is at home.',
    explanation: 'Subject + is + rest.', hint: 'She → is.',
    confusion_note: 'В утверждении глагол идёт после подлежащего.', is_active: true },
  { id: 'ex_1_2_03', lesson_id: 'les_1', prompt: 'Упр. 2.3 — Составь предложение: we / are / late',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['We are late.', 'Are we late.', 'We late are.', 'Late we are.'],
    correct_answer: 'We are late.',
    explanation: 'Subject + are + rest.', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_2_04', lesson_id: 'les_1', prompt: 'Упр. 2.4 — Составь предложение: he / is / a doctor',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['He is a doctor.', 'Is he a doctor.', 'He a doctor is.', 'A doctor he is.'],
    correct_answer: 'He is a doctor.',
    explanation: 'Subject + is + rest.', hint: 'He → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_2_05', lesson_id: 'les_1', prompt: 'Упр. 2.5 — Составь предложение: they / are / in the car',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['They are in the car.', 'Are they in the car.', 'They in the car are.', 'In the car they are.'],
    correct_answer: 'They are in the car.',
    explanation: 'Subject + are + rest.', hint: 'They → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_2_06', lesson_id: 'les_1', prompt: 'Упр. 2.6 — Составь предложение: it / is / very cold',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['It is very cold.', 'Is it very cold.', 'It very cold is.', 'Very cold it is.'],
    correct_answer: 'It is very cold.',
    explanation: 'Subject + is + rest.', hint: 'It → is.',
    confusion_note: 'It → is.', is_active: true },
  { id: 'ex_1_2_07', lesson_id: 'les_1', prompt: 'Упр. 2.7 — Составь предложение: my phone / is / in my bag',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['My phone is in my bag.', 'Is my phone in my bag.', 'My phone in my bag is.', 'In my bag my phone is.'],
    correct_answer: 'My phone is in my bag.',
    explanation: 'My phone — один предмет → is.', hint: 'Phone — ед. число.',
    confusion_note: 'Если один предмет → is.', is_active: true },
  { id: 'ex_1_2_08', lesson_id: 'les_1', prompt: 'Упр. 2.8 — Составь предложение: you / are / very kind',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['You are very kind.', 'Are you very kind.', 'You very kind are.', 'Very kind you are.'],
    correct_answer: 'You are very kind.',
    explanation: 'You → are.', hint: 'You всегда с are.',
    confusion_note: 'You + are даже для одного человека.', is_active: true },

  // --- Упражнение 3. Сделайте отрицательные предложения (8 пунктов) ---
  { id: 'ex_1_3_01', lesson_id: 'les_1', prompt: 'Упр. 3.1 — Сделай отрицательным: "I am busy."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["I'm not busy.", "I amn't busy.", "I don't busy.", "I no busy."],
    correct_answer: "I'm not busy.",
    explanation: 'I am + not = I am not / I\'m not.', hint: 'not после am.',
    confusion_note: 'Нет формы amn\'t — только I\'m not.', is_active: true },
  { id: 'ex_1_3_02', lesson_id: 'les_1', prompt: 'Упр. 3.2 — Сделай отрицательным: "She is at home."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["She isn't at home.", "She not is at home.", "She don't at home.", "She no is at home."],
    correct_answer: "She isn't at home.",
    explanation: 'is + not = isn\'t.', hint: 'not после is.',
    confusion_note: 'don\'t — для других глаголов, не для to be.', is_active: true },
  { id: 'ex_1_3_03', lesson_id: 'les_1', prompt: 'Упр. 3.3 — Сделай отрицательным: "They are ready."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["They aren't ready.", "They not are ready.", "They don't ready.", "They isn't ready."],
    correct_answer: "They aren't ready.",
    explanation: 'are + not = aren\'t.', hint: 'They → are → aren\'t.',
    confusion_note: 'they → aren\'t, не isn\'t.', is_active: true },
  { id: 'ex_1_3_04', lesson_id: 'les_1', prompt: 'Упр. 3.4 — Сделай отрицательным: "He is my brother."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["He isn't my brother.", "He not is my brother.", "He don't my brother.", "He aren't my brother."],
    correct_answer: "He isn't my brother.",
    explanation: 'is + not = isn\'t.', hint: 'He → is → isn\'t.',
    confusion_note: 'he/she/it → isn\'t.', is_active: true },
  { id: 'ex_1_3_05', lesson_id: 'les_1', prompt: 'Упр. 3.5 — Сделай отрицательным: "We are late."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["We aren't late.", "We not are late.", "We don't late.", "We isn't late."],
    correct_answer: "We aren't late.",
    explanation: 'are + not = aren\'t.', hint: 'We → are → aren\'t.',
    confusion_note: 'we/you/they → aren\'t.', is_active: true },
  { id: 'ex_1_3_06', lesson_id: 'les_1', prompt: 'Упр. 3.6 — Сделай отрицательным: "It is warm today."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["It isn't warm today.", "It not is warm today.", "It don't warm today.", "It aren't warm today."],
    correct_answer: "It isn't warm today.",
    explanation: 'is + not = isn\'t.', hint: 'It → is → isn\'t.',
    confusion_note: 'It → isn\'t.', is_active: true },
  { id: 'ex_1_3_07', lesson_id: 'les_1', prompt: 'Упр. 3.7 — Сделай отрицательным: "The shops are open."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["The shops aren't open.", "The shops not are open.", "The shops don't open.", "The shops isn't open."],
    correct_answer: "The shops aren't open.",
    explanation: 'Shops — мн. число → are → aren\'t.', hint: 'Shops — мн. число.',
    confusion_note: 'Мн. число → aren\'t.', is_active: true },
  { id: 'ex_1_3_08', lesson_id: 'les_1', prompt: 'Упр. 3.8 — Сделай отрицательным: "I am tired."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["I'm not tired.", "I amn't tired.", "I don't tired.", "I not am tired."],
    correct_answer: "I'm not tired.",
    explanation: 'I am + not = I\'m not.', hint: 'I → am → I\'m not.',
    confusion_note: 'Нет I amn\'t — только I\'m not.', is_active: true },

  // --- Упражнение 4. Общий вопрос (8 пунктов) ---
  { id: 'ex_1_4_01', lesson_id: 'les_1', prompt: 'Упр. 4.1 — Составь вопрос: she / at school',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Is she at school?', 'She is at school?', 'Are she at school?', 'Does she at school?'],
    correct_answer: 'Is she at school?',
    explanation: 'В вопросе to be → перед подлежащим.', hint: 'Is + she + at school?',
    confusion_note: 'Не оставляй прямой порядок.', is_active: true },
  { id: 'ex_1_4_02', lesson_id: 'les_1', prompt: 'Упр. 4.2 — Составь вопрос: he / your teacher',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Is he your teacher?', 'He is your teacher?', 'Are he your teacher?', 'Does he your teacher?'],
    correct_answer: 'Is he your teacher?',
    explanation: 'Is + he + your teacher?', hint: 'He → is.',
    confusion_note: 'he/she/it → is, даже в вопросе.', is_active: true },
  { id: 'ex_1_4_03', lesson_id: 'les_1', prompt: 'Упр. 4.3 — Составь вопрос: they / at home',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are they at home?', 'They are at home?', 'Is they at home?', 'Do they at home?'],
    correct_answer: 'Are they at home?',
    explanation: 'Are + they + at home?', hint: 'They → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_4_04', lesson_id: 'les_1', prompt: 'Упр. 4.4 — Составь вопрос: it / cold outside',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Is it cold outside?', 'It is cold outside?', 'Are it cold outside?', 'Does it cold outside?'],
    correct_answer: 'Is it cold outside?',
    explanation: 'Is + it + cold outside?', hint: 'It → is.',
    confusion_note: 'It → is.', is_active: true },
  { id: 'ex_1_4_05', lesson_id: 'les_1', prompt: 'Упр. 4.5 — Составь вопрос: you / hungry',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are you hungry?', 'You are hungry?', 'Is you hungry?', 'Do you hungry?'],
    correct_answer: 'Are you hungry?',
    explanation: 'Are + you + hungry?', hint: 'You → are.',
    confusion_note: 'You всегда с are.', is_active: true },
  { id: 'ex_1_4_06', lesson_id: 'les_1', prompt: 'Упр. 4.6 — Составь вопрос: we / early',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are we early?', 'We are early?', 'Is we early?', 'Do we early?'],
    correct_answer: 'Are we early?',
    explanation: 'Are + we + early?', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_4_07', lesson_id: 'les_1', prompt: 'Упр. 4.7 — Составь вопрос: your parents / at work',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are your parents at work?', 'Your parents are at work?', 'Is your parents at work?', 'Do your parents at work?'],
    correct_answer: 'Are your parents at work?',
    explanation: 'Parents — мн. число → are.', hint: 'Сколько родителей? Больше одного.',
    confusion_note: 'Мн. число → are.', is_active: true },
  { id: 'ex_1_4_08', lesson_id: 'les_1', prompt: 'Упр. 4.8 — Составь вопрос: I / next',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'medium',
    options_json: ['Am I next?', 'I am next?', 'Is I next?', 'Are I next?'],
    correct_answer: 'Am I next?',
    explanation: 'Am + I + next?', hint: 'С I → am, даже в вопросе.',
    confusion_note: 'Am I…? — единственный вопрос с am.', is_active: true },

  // --- Упражнение 5. Специальные вопросы (6 пунктов) ---
  { id: 'ex_1_5_01', lesson_id: 'les_1', prompt: 'Упр. 5.1 — Составь вопрос: What / your name?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['What is your name?', 'What your name is?', 'What are your name?', 'What does your name?'],
    correct_answer: 'What is your name?',
    explanation: 'Wh-слово + is + подлежащее.', hint: 'Name — ед. число → is.',
    confusion_note: 'Вопросительное слово не отменяет инверсию.', is_active: true },
  { id: 'ex_1_5_02', lesson_id: 'les_1', prompt: 'Упр. 5.2 — Составь вопрос: Where / you / from?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Where are you from?', 'Where you are from?', 'Where is you from?', 'Where do you from?'],
    correct_answer: 'Where are you from?',
    explanation: 'Wh + are + you + from.', hint: 'You → are.',
    confusion_note: 'You всегда с are.', is_active: true },
  { id: 'ex_1_5_03', lesson_id: 'les_1', prompt: 'Упр. 5.3 — Составь вопрос: Who / she?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Who is she?', 'Who she is?', 'Who are she?', 'Who does she?'],
    correct_answer: 'Who is she?',
    explanation: 'Wh + is + she.', hint: 'She → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_5_04', lesson_id: 'les_1', prompt: 'Упр. 5.4 — Составь вопрос: How / you today?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['How are you today?', 'How you are today?', 'How is you today?', 'How do you today?'],
    correct_answer: 'How are you today?',
    explanation: 'Wh + are + you + today.', hint: 'You → are.',
    confusion_note: 'You всегда с are.', is_active: true },
  { id: 'ex_1_5_05', lesson_id: 'les_1', prompt: 'Упр. 5.5 — Составь вопрос: Why / he late?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Why is he late?', 'Why he is late?', 'Why are he late?', 'Why does he late?'],
    correct_answer: 'Why is he late?',
    explanation: 'Wh + is + he + late.', hint: 'He → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_5_06', lesson_id: 'les_1', prompt: 'Упр. 5.6 — Составь вопрос: Where / the children?',
    exercise_type: 'reorder', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Where are the children?', 'Where the children are?', 'Where is the children?', 'Where do the children?'],
    correct_answer: 'Where are the children?',
    explanation: 'Children — мн. число → are.', hint: 'Children — мн. число.',
    confusion_note: 'child → is, children → are.', is_active: true },

  // --- Упражнение 6. Исправьте ошибки (8 пунктов) ---
  { id: 'ex_1_6_01', lesson_id: 'les_1', prompt: 'Упр. 6.1 — Исправь: "I is ready."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['I am ready.', 'I are ready.', 'I be ready.', 'I do ready.'],
    correct_answer: 'I am ready.',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'I никогда не идёт с is или are.', is_active: true },
  { id: 'ex_1_6_02', lesson_id: 'les_1', prompt: 'Упр. 6.2 — Исправь: "She are my friend."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['She is my friend.', 'She am my friend.', 'She be my friend.', 'She do my friend.'],
    correct_answer: 'She is my friend.',
    explanation: 'С she → is.', hint: 'She → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_6_03', lesson_id: 'les_1', prompt: 'Упр. 6.3 — Исправь: "They is at home."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['They are at home.', 'They am at home.', 'They be at home.', 'They do at home.'],
    correct_answer: 'They are at home.',
    explanation: 'С they → are.', hint: 'They → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_6_04', lesson_id: 'les_1', prompt: 'Упр. 6.4 — Исправь: "He am tired."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['He is tired.', 'He are tired.', 'He be tired.', 'He do tired.'],
    correct_answer: 'He is tired.',
    explanation: 'С he → is.', hint: 'He → is.',
    confusion_note: 'am — только с I.', is_active: true },
  { id: 'ex_1_6_05', lesson_id: 'les_1', prompt: 'Упр. 6.5 — Исправь: "We is in the right room."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['We are in the right room.', 'We am in the right room.', 'We be in the right room.', 'We do in the right room.'],
    correct_answer: 'We are in the right room.',
    explanation: 'С we → are.', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_6_06', lesson_id: 'les_1', prompt: 'Упр. 6.6 — Исправь: "It are very cold today."',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['It is very cold today.', 'It am very cold today.', 'It be very cold today.', 'It do very cold today.'],
    correct_answer: 'It is very cold today.',
    explanation: 'It → is.', hint: 'It — 3-е лицо ед. числа.',
    confusion_note: 'It → is, всегда.', is_active: true },
  { id: 'ex_1_6_07', lesson_id: 'les_1', prompt: 'Упр. 6.7 — Исправь: "Are she from Italy?"',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Is she from Italy?', 'She is from Italy?', 'Does she from Italy?', 'Am she from Italy?'],
    correct_answer: 'Is she from Italy?',
    explanation: 'С she → is, даже в вопросе.', hint: 'She → is.',
    confusion_note: 'Форма to be зависит от подлежащего.', is_active: true },
  { id: 'ex_1_6_08', lesson_id: 'les_1', prompt: 'Упр. 6.8 — Исправь: "Is they ready?"',
    exercise_type: 'error_correction', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are they ready?', 'They is ready?', 'Does they ready?', 'Am they ready?'],
    correct_answer: 'Are they ready?',
    explanation: 'С they → are.', hint: 'They → are.',
    confusion_note: 'we/you/they → are даже в вопросе.', is_active: true },

  // --- Упражнение 7. Дополните диалоги (6 пунктов) ---
  { id: 'ex_1_7_01', lesson_id: 'les_1', prompt: 'Упр. 7.1 — "___ you tired?" — "No, I am not."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Are', 'Is', 'Am', 'Do'],
    correct_answer: 'Are',
    explanation: 'You → are. В вопросе: Are you…?', hint: 'You всегда с are.',
    confusion_note: 'You + are даже для одного человека.', is_active: true },
  { id: 'ex_1_7_02', lesson_id: 'les_1', prompt: 'Упр. 7.2 — "Are you tired?" — "No, I ___."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am not', "isn't", "aren't", "don't"],
    correct_answer: 'am not',
    explanation: 'С I в отрицании → am not (или I\'m not).', hint: 'I → am → am not.',
    confusion_note: 'Нет I isn\'t — только I am not.', is_active: true },
  { id: 'ex_1_7_03', lesson_id: 'les_1', prompt: 'Упр. 7.3 — "___ she at home?" — "Yes, she is."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['Is', 'Are', 'Am', 'Does'],
    correct_answer: 'Is',
    explanation: 'С she → is.', hint: 'She → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_7_04', lesson_id: 'les_1', prompt: 'Упр. 7.4 — "Are they ready?" — "No, they ___."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["aren't", "isn't", "am not", "don't"],
    correct_answer: "aren't",
    explanation: 'They → are → aren\'t.', hint: 'They → are.',
    confusion_note: 'we/you/they → aren\'t.', is_active: true },
  { id: 'ex_1_7_05', lesson_id: 'les_1', prompt: 'Упр. 7.5 — "Is it cold outside?" — "Yes, it ___."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'are', 'am', 'does'],
    correct_answer: 'is',
    explanation: 'It → is. В кратком ответе повторяем форму to be.', hint: 'It → is.',
    confusion_note: 'Yes, it is. (без сокращения в утвердительном кратком ответе)', is_active: true },
  { id: 'ex_1_7_06', lesson_id: 'les_1', prompt: 'Упр. 7.6 — "Is he your brother?" — "No, he ___."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["isn't", "aren't", "am not", "don't"],
    correct_answer: "isn't",
    explanation: 'He → is → isn\'t.', hint: 'He → is.',
    confusion_note: 'he/she/it → isn\'t.', is_active: true },

  // --- Упражнение 8. Переведите на английский (8 пунктов) ---
  { id: 'ex_1_8_01', lesson_id: 'les_1', prompt: 'Упр. 8.1 — Переведи: "Я дома."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['I am at home.', 'I at home.', 'I is at home.', 'I are at home.'],
    correct_answer: 'I am at home.',
    explanation: 'В английском нужен глагол: I + am + at home.', hint: 'I → am.',
    confusion_note: 'В английском без глагола нельзя.', is_active: true },
  { id: 'ex_1_8_02', lesson_id: 'les_1', prompt: 'Упр. 8.2 — Переведи: "Она моя учительница."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['She is my teacher.', 'She my teacher.', 'She are my teacher.', 'She am my teacher.'],
    correct_answer: 'She is my teacher.',
    explanation: 'She → is.', hint: 'She → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_8_03', lesson_id: 'les_1', prompt: 'Упр. 8.3 — Переведи: "Мы готовы."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['We are ready.', 'We ready.', 'We is ready.', 'We am ready.'],
    correct_answer: 'We are ready.',
    explanation: 'We → are.', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_8_04', lesson_id: 'les_1', prompt: 'Упр. 8.4 — Переведи: "Сегодня холодно."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['It is cold today.', 'Today cold.', 'It are cold today.', 'Today is cold it.'],
    correct_answer: 'It is cold today.',
    explanation: 'Для погоды используем It is …', hint: 'Безличное предложение начинается с It.',
    confusion_note: 'It is cold/warm/sunny/raining.', is_active: true },
  { id: 'ex_1_8_05', lesson_id: 'les_1', prompt: 'Упр. 8.5 — Переведи: "Они в машине."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['They are in the car.', 'They in the car.', 'They is in the car.', 'They am in the car.'],
    correct_answer: 'They are in the car.',
    explanation: 'They → are.', hint: 'They → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_8_06', lesson_id: 'les_1', prompt: 'Упр. 8.6 — Переведи: "Он не дома."',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ["He isn't at home.", "He don't at home.", "He not at home.", "He aren't at home."],
    correct_answer: "He isn't at home.",
    explanation: 'He → is → isn\'t.', hint: 'is + not = isn\'t.',
    confusion_note: 'don\'t — для других глаголов.', is_active: true },
  { id: 'ex_1_8_07', lesson_id: 'les_1', prompt: 'Упр. 8.7 — Переведи: "Как тебя зовут?"',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'medium',
    options_json: ['What is your name?', 'How is your name?', 'What your name?', 'How are your name?'],
    correct_answer: 'What is your name?',
    explanation: 'Дословно: «Какое твоё имя?» → What is your name?', hint: 'What + is + your name.',
    confusion_note: 'Не «How is your name?» — это калька с русского.', is_active: true },
  { id: 'ex_1_8_08', lesson_id: 'les_1', prompt: 'Упр. 8.8 — Переведи: "Почему он опоздал?"',
    exercise_type: 'multiple_choice', tense_tags: ['to_be'], difficulty: 'medium',
    options_json: ['Why is he late?', 'Why he is late?', 'Why are he late?', 'Why does he late?'],
    correct_answer: 'Why is he late?',
    explanation: 'Wh + is + he + late.', hint: 'He → is, инверсия в вопросе.',
    confusion_note: 'Опоздал = late (прилагательное), нужен to be.', is_active: true },

  // --- Упражнение 9. Текст с пропусками (13 пунктов) ---
  { id: 'ex_1_9_01', lesson_id: 'les_1', prompt: 'Упр. 9.1 — "My name ___ Max."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are'], correct_answer: 'is',
    explanation: 'My name — ед. число → is.', hint: 'Name — ед. число.',
    confusion_note: 'Если подлежащее ед. числа → is.', is_active: true },
  { id: 'ex_1_9_02', lesson_id: 'les_1', prompt: 'Упр. 9.2 — "I ___ 13 years old."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'am',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'Возраст: I am 13 (years old).', is_active: true },
  { id: 'ex_1_9_03', lesson_id: 'les_1', prompt: 'Упр. 9.3 — "I ___ from Warsaw."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'am',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'I am from + город/страна.', is_active: true },
  { id: 'ex_1_9_04', lesson_id: 'les_1', prompt: 'Упр. 9.4 — "My family and I ___ in a small flat."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'medium',
    options_json: ['are', 'is', 'am'], correct_answer: 'are',
    explanation: 'My family and I — это «мы» → are.', hint: 'family and I = we.',
    confusion_note: '«… and I» = подлежащее во мн. числе → are.', is_active: true },
  { id: 'ex_1_9_05', lesson_id: 'les_1', prompt: 'Упр. 9.5 — "My parents ___ usually very busy."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['are', 'is', 'am'], correct_answer: 'are',
    explanation: 'Parents — мн. число → are.', hint: 'Parents — мн. число.',
    confusion_note: 'Мн. число → are.', is_active: true },
  { id: 'ex_1_9_06', lesson_id: 'les_1', prompt: 'Упр. 9.6 — "…but they ___ always kind and helpful."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['are', 'is', 'am'], correct_answer: 'are',
    explanation: 'They → are.', hint: 'They → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_9_07', lesson_id: 'les_1', prompt: 'Упр. 9.7 — "Today I ___ at home…"',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['am', 'is', 'are'], correct_answer: 'am',
    explanation: 'С I → am.', hint: 'I → am.',
    confusion_note: 'I → am.', is_active: true },
  { id: 'ex_1_9_08', lesson_id: 'les_1', prompt: 'Упр. 9.8 — "…because it ___ Saturday."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are'], correct_answer: 'is',
    explanation: 'It → is.', hint: 'It → is.',
    confusion_note: 'It → is, всегда.', is_active: true },
  { id: 'ex_1_9_09', lesson_id: 'les_1', prompt: 'Упр. 9.9 — "My sister ___ here too."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are'], correct_answer: 'is',
    explanation: 'My sister — ед. число → is.', hint: 'Sister — ед. число.',
    confusion_note: 'Ед. число → is.', is_active: true },
  { id: 'ex_1_9_10', lesson_id: 'les_1', prompt: 'Упр. 9.10 — "She ___ in her room now."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are'], correct_answer: 'is',
    explanation: 'She → is.', hint: 'She → is.',
    confusion_note: 'he/she/it → is.', is_active: true },
  { id: 'ex_1_9_11', lesson_id: 'les_1', prompt: 'Упр. 9.11 — "We ___ not tired…"',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['are', 'is', 'am'], correct_answer: 'are',
    explanation: 'We → are. We are not = we aren\'t.', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_9_12', lesson_id: 'les_1', prompt: 'Упр. 9.12 — "…but we ___ a little hungry."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['are', 'is', 'am'], correct_answer: 'are',
    explanation: 'We → are.', hint: 'We → are.',
    confusion_note: 'we/you/they → are.', is_active: true },
  { id: 'ex_1_9_13', lesson_id: 'les_1', prompt: 'Упр. 9.13 — "The weather ___ nice."',
    exercise_type: 'fill_gap', tense_tags: ['to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are'], correct_answer: 'is',
    explanation: 'The weather — ед. число → is.', hint: 'Weather — неисчисляемое, ед. число.',
    confusion_note: 'The weather is nice/cold/warm.', is_active: true },
  // Lesson 2 (Present Simple)
  {
    id: 'ex_2a', lesson_id: 'les_2', prompt: 'She ___ to work every day.',
    exercise_type: 'fill_gap', tense_tags: ['present_simple'], difficulty: 'easy',
    options_json: ['go', 'goes', 'going', 'is going'],
    correct_answer: 'goes', explanation: 'В Present Simple с he/she/it добавляем -s/-es к глаголу.',
    hint: 'Подумай, какое окончание нужно для 3-го лица единственного числа.',
    confusion_note: 'Часто путают с Present Continuous. Здесь регулярное действие → Simple.',
    is_active: true
  },
  {
    id: 'ex_2b', lesson_id: 'les_2', prompt: 'Найди ошибку: "He don\'t like pizza."',
    exercise_type: 'error_correction', tense_tags: ['present_simple'], difficulty: 'easy',
    options_json: ["He doesn't like pizza.", "He don't likes pizza.", "He not like pizza.", "He isn't like pizza."],
    correct_answer: "He doesn't like pizza.",
    explanation: 'С he/she/it используем doesn\'t, а не don\'t.',
    hint: '3-е лицо единственного числа.', confusion_note: 'don\'t → для I/you/we/they, doesn\'t → для he/she/it.', is_active: true
  },
  // Lesson 3 (Present Continuous)
  {
    id: 'ex_3a', lesson_id: 'les_3', prompt: 'Look! The children ___ in the park.',
    exercise_type: 'fill_gap', tense_tags: ['present_continuous'], difficulty: 'easy',
    options_json: ['play', 'plays', 'are playing', 'is playing'],
    correct_answer: 'are playing', explanation: 'Look! — маркер Present Continuous. Children — мн.ч., поэтому are playing.',
    hint: 'Действие происходит прямо сейчас.', confusion_note: 'Не путай с Present Simple (привычки).', is_active: true
  },
  {
    id: 'ex_3b', lesson_id: 'les_3', prompt: 'I ___ a new language this semester.',
    exercise_type: 'multiple_choice', tense_tags: ['present_continuous'], difficulty: 'medium',
    options_json: ['learn', 'am learning', 'learns', 'learning'],
    correct_answer: 'am learning', explanation: 'This semester — временная ситуация, используем Present Continuous.',
    hint: 'Это временная ситуация, а не постоянная привычка.', confusion_note: 'This semester = ограниченный период → Continuous.', is_active: true
  },
  // Lesson 4 (Present Simple vs Continuous)
  {
    id: 'ex_4a', lesson_id: 'les_4', prompt: 'He usually ___ coffee, but today he ___ tea.',
    exercise_type: 'fill_gap', tense_tags: ['present_simple', 'present_continuous'], difficulty: 'medium',
    options_json: ['drinks / is drinking', 'is drinking / drinks', 'drink / drinking', 'drinks / drinks'],
    correct_answer: 'drinks / is drinking',
    explanation: 'Usually → привычка (Simple). Today → именно сейчас, исключение (Continuous).',
    hint: 'Первая часть — про привычку, вторая — про сегодняшнее исключение.',
    confusion_note: 'Маркеры: usually = Simple, today = может быть Continuous.', is_active: true
  },
  // Lesson 5 (Past Simple)
  {
    id: 'ex_5a', lesson_id: 'les_5', prompt: 'She ___ to Paris last summer.',
    exercise_type: 'fill_gap', tense_tags: ['past_simple'], difficulty: 'easy',
    options_json: ['travel', 'travels', 'travelled', 'was travelling'],
    correct_answer: 'travelled', explanation: 'Last summer — конкретное прошлое → Past Simple.',
    hint: 'Last summer — маркер прошлого.', confusion_note: 'Не путай с Past Continuous.', is_active: true
  },
  // Lesson 6 (Past Continuous)
  {
    id: 'ex_6a', lesson_id: 'les_6', prompt: 'At 7 PM yesterday, we ___ dinner.',
    exercise_type: 'fill_gap', tense_tags: ['past_continuous'], difficulty: 'easy',
    options_json: ['had', 'were having', 'have had', 'are having'],
    correct_answer: 'were having', explanation: 'В конкретный момент в прошлом шёл процесс → Past Continuous.',
    hint: 'At 7 PM yesterday = момент в прошлом.', confusion_note: 'Past Simple — завершённое. Continuous — процесс в моменте.', is_active: true
  },
  // Lesson 8 (Present Perfect)
  {
    id: 'ex_8a', lesson_id: 'les_8', prompt: 'I ___ never ___ sushi.',
    exercise_type: 'fill_gap', tense_tags: ['present_perfect'], difficulty: 'easy',
    options_json: ['have / tried', 'has / tried', 'had / tried', 'did / try'],
    correct_answer: 'have / tried', explanation: 'Опыт в жизни без привязки ко времени → Present Perfect: have + V3.',
    hint: 'Never — маркер Present Perfect.', confusion_note: 'Не путай с Past Simple — тут нет конкретного времени.', is_active: true
  },
  // Lesson 9 (Present Perfect vs Past Simple)
  {
    id: 'ex_9a', lesson_id: 'les_9', prompt: 'Выбери правильный вариант: I ___ this movie. (опыт, без указания времени)',
    exercise_type: 'choose_context', tense_tags: ['present_perfect', 'past_simple'], difficulty: 'medium',
    options_json: ['have seen', 'saw', 'had seen', 'was seeing'],
    correct_answer: 'have seen', explanation: 'Опыт без указания когда → Present Perfect.',
    hint: 'Нет конкретного времени в прошлом.', confusion_note: 'Если бы было "yesterday" → Past Simple.', is_active: true
  },
  // Lesson 10 (Present Perfect Continuous)
  {
    id: 'ex_10a', lesson_id: 'les_10', prompt: 'She ___ for this company for 10 years.',
    exercise_type: 'fill_gap', tense_tags: ['present_perfect_continuous'], difficulty: 'medium',
    options_json: ['works', 'has been working', 'is working', 'worked'],
    correct_answer: 'has been working', explanation: 'Действие началось в прошлом и продолжается → Present Perfect Continuous с for.',
    hint: 'for 10 years — длительность до сейчас.', confusion_note: 'Не путай с Present Perfect (результат) или Simple (привычка).', is_active: true
  },
  // Lesson 12 (Future)
  {
    id: 'ex_12a', lesson_id: 'les_12', prompt: '"I think I ___ have the salad." (решение в момент речи)',
    exercise_type: 'multiple_choice', tense_tags: ['future_will'], difficulty: 'easy',
    options_json: ["will", "am going to", "am having", "have"],
    correct_answer: "will", explanation: 'Спонтанное решение прямо сейчас → will.',
    hint: 'Решение принято в момент речи.', confusion_note: 'Going to — для заранее обдуманных планов.', is_active: true
  },
];

export const DEMO_MATERIALS: Material[] = [
  { id: 'mat_1', title: 'Irregular Verbs Table', short_description: 'Полная таблица неправильных глаголов с транскрипцией и переводом', category: 'Таблицы', material_type: 'table', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: false },
  { id: 'mat_2', title: 'Tense Comparison Chart', short_description: 'Сравнительная таблица всех времён английского языка', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: false },
  { id: 'mat_3', title: 'Present Tenses Quick Reference', short_description: 'Быстрая справка по настоящим временам с примерами и маркерами', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: 'sec_1', is_published: true, is_featured: false },
  { id: 'mat_4', title: 'Stative Verbs List', short_description: 'Список глаголов состояния, которые не используются в Continuous', category: 'Основы', material_type: 'reference', file_url: '#', related_lesson_id: 'les_3', related_section_id: 'sec_1', is_published: true, is_featured: false },
  { id: 'mat_5', title: 'Time Markers Guide', short_description: 'Полный гид по маркерам времени для каждого tense', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: false },
  { id: 'mat_6', title: 'Perfect vs Simple Study Guide', short_description: 'Когда использовать Perfect, а когда Simple — подробный разбор', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: 'sec_3', is_published: true, is_featured: false },
  { id: 'mat_7', title: 'Future Forms Decision Tree', short_description: 'Схема выбора правильной формы будущего времени', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: 'sec_4', is_published: true, is_featured: false },
  { id: 'mat_8', title: 'Common Mistakes Workbook', short_description: 'Рабочая тетрадь с типичными ошибками и упражнениями на их исправление', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: false },
];

export const DEMO_PROGRESS: Progress[] = [
  { id: 'prog_1', user_id: 'user_student', lesson_id: 'les_1', status: 'completed', completed_at: '2025-02-12' },
  { id: 'prog_2', user_id: 'user_student', lesson_id: 'les_2', status: 'completed', completed_at: '2025-02-14' },
  { id: 'prog_3', user_id: 'user_student', lesson_id: 'les_3', status: 'completed', completed_at: '2025-02-17' },
  { id: 'prog_4', user_id: 'user_student', lesson_id: 'les_4', status: 'completed', completed_at: '2025-02-20' },
  { id: 'prog_5', user_id: 'user_student', lesson_id: 'les_5', status: 'completed', completed_at: '2025-02-24' },
  { id: 'prog_6', user_id: 'user_student', lesson_id: 'les_6', status: 'completed', completed_at: '2025-02-27' },
  { id: 'prog_7', user_id: 'user_student', lesson_id: 'les_7', status: 'completed', completed_at: '2025-03-01' },
  { id: 'prog_8', user_id: 'user_student', lesson_id: 'les_8', status: 'completed', completed_at: '2025-03-04' },
  { id: 'prog_9', user_id: 'user_student', lesson_id: 'les_9', status: 'completed', completed_at: '2025-03-07' },
  { id: 'prog_10', user_id: 'user_student', lesson_id: 'les_10', status: 'completed', completed_at: '2025-03-09' },
  { id: 'prog_11', user_id: 'user_student', lesson_id: 'les_11', status: 'in_progress', completed_at: null },
  { id: 'prog_12', user_id: 'user_student', lesson_id: 'les_12', status: 'not_started', completed_at: null },
  { id: 'prog_13', user_id: 'user_student', lesson_id: 'les_13', status: 'not_started', completed_at: null },
];

export const DEMO_TRAINER_STATS: TrainerStats = {
  id: 'ts_1', user_id: 'user_student', accuracy_avg: 78, practices_completed: 24,
  academic_points: 1250, weak_topics_json: ['present_perfect', 'past_continuous', 'future_will'],
  updated_at: '2025-03-10'
};

export const DEMO_ATTEMPTS: Attempt[] = [
  { id: 'att_1', user_id: 'user_student', exercise_id: 'ex_2a', mode: 'lesson', selected_answer: 'goes', is_correct: true, score_delta: 10, created_at: '2025-02-14' },
  { id: 'att_2', user_id: 'user_student', exercise_id: 'ex_1b', mode: 'lesson', selected_answer: 'are', is_correct: true, score_delta: 10, created_at: '2025-02-12' },
  { id: 'att_3', user_id: 'user_student', exercise_id: 'ex_3a', mode: 'lesson', selected_answer: 'plays', is_correct: false, score_delta: -5, created_at: '2025-02-17' },
  { id: 'att_4', user_id: 'user_student', exercise_id: 'ex_4a', mode: 'trainer_compare', selected_answer: 'is drinking / drinks', is_correct: false, score_delta: -5, created_at: '2025-02-20' },
];

// Helper functions
export function getLessonsBySection(sectionId: string): Lesson[] {
  return DEMO_LESSONS.filter(l => l.section_id === sectionId).sort((a, b) => a.sort_order - b.sort_order);
}

export function getSectionForLesson(lessonId: string): Section | undefined {
  const lesson = DEMO_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return undefined;
  return DEMO_SECTIONS.find(s => s.id === lesson.section_id);
}

export function getExercisesForLesson(lessonId: string): Exercise[] {
  return DEMO_EXERCISES.filter(e => e.lesson_id === lessonId && e.is_active);
}

export function getProgressForUser(userId: string): Progress[] {
  return DEMO_PROGRESS.filter(p => p.user_id === userId);
}

export function getCurrentLesson(userId: string): Lesson | undefined {
  const progress = getProgressForUser(userId);
  const inProgress = progress.find(p => p.status === 'in_progress');
  if (inProgress) return DEMO_LESSONS.find(l => l.id === inProgress.lesson_id);
  const completed = progress.filter(p => p.status === 'completed');
  const completedIds = completed.map(p => p.lesson_id);
  const next = DEMO_LESSONS.find(l => !completedIds.includes(l.id));
  return next || DEMO_LESSONS[DEMO_LESSONS.length - 1];
}

export function getCompletedCount(userId: string): number {
  return getProgressForUser(userId).filter(p => p.status === 'completed').length;
}
