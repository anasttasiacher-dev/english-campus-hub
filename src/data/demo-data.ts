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
  description: 'Полный практикум по временам английского языка. 12 уроков с видео, конспектами, упражнениями, тренажёром и библиотекой материалов.',
  price: 3900,
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
  { id: 'ord_1', user_id: 'user_student', product_id: 'prod_tenselab', amount: 3900, payment_status: 'paid', payment_provider: 'demo', created_at: '2025-02-10' },
  { id: 'ord_2', user_id: 'user_student2', product_id: 'prod_tenselab', amount: 3900, payment_status: 'paid', payment_provider: 'demo', created_at: '2025-03-01' },
];

export const DEMO_ENROLLMENTS: Enrollment[] = [
  { id: 'enr_1', user_id: 'user_student', product_id: 'prod_tenselab', access_status: 'active', granted_at: '2025-02-10', expires_at: null },
  { id: 'enr_2', user_id: 'user_student2', product_id: 'prod_tenselab', access_status: 'active', granted_at: '2025-03-01', expires_at: null },
];

export const DEMO_SECTIONS: Section[] = [
  { id: 'sec_1', product_id: 'prod_tenselab', title: 'Present Foundations', description: 'Основы настоящего времени: Simple, Continuous и их сравнение', sort_order: 1, is_published: true },
  { id: 'sec_2', product_id: 'prod_tenselab', title: 'Past System', description: 'Система прошедшего времени: Simple, Continuous и различия', sort_order: 2, is_published: true },
  { id: 'sec_3', product_id: 'prod_tenselab', title: 'Perfect System', description: 'Перфектные времена: Present Perfect, Past Perfect и Continuous формы', sort_order: 3, is_published: true },
  { id: 'sec_4', product_id: 'prod_tenselab', title: 'Future System', description: 'Будущее время: основные и продвинутые формы', sort_order: 4, is_published: true },
];

export const DEMO_LESSONS: Lesson[] = [
  {
    id: 'les_1', section_id: 'sec_1', title: 'Present Simple + to be', short_description: 'Рутина, факты, состояния, базовые конструкции',
    lesson_number: 1, status: 'published', video_url: '', sort_order: 1, is_published: true,
    note_content: `## Present Simple + to be

### Когда используется
- **Регулярные действия и рутина:** I work every day.
- **Общие факты и истины:** The sun rises in the east.
- **Состояния и характеристики:** She is tall. He likes coffee.
- **Расписания:** The train leaves at 9 AM.

### Структура
| Форма | Пример |
|-------|--------|
| **+** | I/You/We/They **work**. He/She/It **works**. |
| **−** | I **don't work**. He **doesn't work**. |
| **?** | **Do** you work? **Does** he work? |

### To be: am / is / are
| Subject | To be | Example |
|---------|-------|---------|
| I | am | I **am** a student. |
| He/She/It | is | She **is** happy. |
| You/We/They | are | They **are** here. |

### Маркеры времени
always, usually, often, sometimes, rarely, never, every day/week/year

### Типичные ошибки
- ❌ He work → ✅ He **works** (не забывай -s/-es в 3 лице)
- ❌ I am work → ✅ I **work** (не смешивай to be и основной глагол)
- ❌ Does he works? → ✅ Does he **work**? (после does глагол без -s)

### Примеры
1. I **drink** coffee every morning.
2. She **doesn't** like spicy food.
3. **Do** they **live** in London?
4. He **is** an engineer.`
  },
  {
    id: 'les_2', section_id: 'sec_1', title: 'Present Continuous', short_description: 'Действие сейчас, временные процессы',
    lesson_number: 2, status: 'published', video_url: '', sort_order: 2, is_published: true,
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
    id: 'les_3', section_id: 'sec_1', title: 'Present Simple vs Present Continuous', short_description: 'Постоянное vs происходящее сейчас',
    lesson_number: 3, status: 'published', video_url: '', sort_order: 3, is_published: true,
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
    id: 'les_4', section_id: 'sec_2', title: 'Past Simple', short_description: 'Завершённые действия в прошлом',
    lesson_number: 4, status: 'published', video_url: '', sort_order: 1, is_published: true,
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
    id: 'les_5', section_id: 'sec_2', title: 'Past Continuous', short_description: 'Процесс в прошлом, фон действия',
    lesson_number: 5, status: 'published', video_url: '', sort_order: 2, is_published: true,
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
    id: 'les_6', section_id: 'sec_2', title: 'Past Simple vs Past Continuous', short_description: 'Событие vs процесс в прошлом',
    lesson_number: 6, status: 'published', video_url: '', sort_order: 3, is_published: true,
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
    id: 'les_7', section_id: 'sec_3', title: 'Present Perfect', short_description: 'Опыт, результат, связь с настоящим',
    lesson_number: 7, status: 'published', video_url: '', sort_order: 1, is_published: true,
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
    id: 'les_8', section_id: 'sec_3', title: 'Present Perfect vs Past Simple', short_description: 'Результат сейчас vs конкретное прошлое',
    lesson_number: 8, status: 'published', video_url: '', sort_order: 2, is_published: true,
    note_content: `## Present Perfect vs Past Simple

### Ключевое различие
| Present Perfect | Past Simple |
|----------------|------------|
| Связь с настоящим, нет точного времени | Конкретное время в прошлом |
| I **have been** to London. | I **went** to London in 2020. |
| She **has just arrived**. | She **arrived** 10 minutes ago. |`
  },
  {
    id: 'les_9', section_id: 'sec_3', title: 'Present Perfect Continuous', short_description: 'Длительность до настоящего',
    lesson_number: 9, status: 'published', video_url: '', sort_order: 3, is_published: true,
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
    id: 'les_10', section_id: 'sec_3', title: 'Past Perfect + Past Perfect Continuous', short_description: 'Что было раньше и как долго',
    lesson_number: 10, status: 'published', video_url: '', sort_order: 4, is_published: true,
    note_content: `## Past Perfect + Past Perfect Continuous

### Past Perfect: had + V3
Действие, завершённое **до** другого прошлого действия.
- When I arrived, they **had already left**.

### Past Perfect Continuous: had been + V-ing
Длительный процесс **до** момента в прошлом.
- She **had been waiting** for 2 hours when the bus finally came.`
  },
  {
    id: 'les_11', section_id: 'sec_4', title: 'Future Forms', short_description: 'will, be going to, Present Simple/Continuous for Future',
    lesson_number: 11, status: 'published', video_url: '', sort_order: 1, is_published: true,
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
    id: 'les_12', section_id: 'sec_4', title: 'Advanced Future Forms', short_description: 'Future Continuous, Future Perfect, Future Perfect Continuous',
    lesson_number: 12, status: 'published', video_url: '', sort_order: 2, is_published: true,
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

export const DEMO_EXERCISES: Exercise[] = [
  // Lesson 1 exercises
  {
    id: 'ex_1', lesson_id: 'les_1', prompt: 'She ___ to work every day.',
    exercise_type: 'fill_gap', tense_tags: ['present_simple'], difficulty: 'easy',
    options_json: ['go', 'goes', 'going', 'is going'],
    correct_answer: 'goes', explanation: 'В Present Simple с he/she/it добавляем -s/-es к глаголу.',
    hint: 'Подумай, какое окончание нужно для 3-го лица единственного числа.',
    confusion_note: 'Часто путают с Present Continuous. Здесь регулярное действие → Simple.',
    is_active: true
  },
  {
    id: 'ex_2', lesson_id: 'les_1', prompt: 'They ___ from Germany.',
    exercise_type: 'multiple_choice', tense_tags: ['present_simple', 'to_be'], difficulty: 'easy',
    options_json: ['is', 'am', 'are', 'be'],
    correct_answer: 'are', explanation: 'С they используем are.',
    hint: 'They — множественное число.', confusion_note: 'Не путай am/is/are.', is_active: true
  },
  {
    id: 'ex_3', lesson_id: 'les_1', prompt: 'Найди ошибку: "He don\'t like pizza."',
    exercise_type: 'error_correction', tense_tags: ['present_simple'], difficulty: 'easy',
    options_json: ["He doesn't like pizza.", "He don't likes pizza.", "He not like pizza.", "He isn't like pizza."],
    correct_answer: "He doesn't like pizza.",
    explanation: 'С he/she/it используем doesn\'t, а не don\'t.',
    hint: '3-е лицо единственного числа.', confusion_note: 'don\'t → для I/you/we/they, doesn\'t → для he/she/it.', is_active: true
  },
  // Lesson 2 exercises
  {
    id: 'ex_4', lesson_id: 'les_2', prompt: 'Look! The children ___ in the park.',
    exercise_type: 'fill_gap', tense_tags: ['present_continuous'], difficulty: 'easy',
    options_json: ['play', 'plays', 'are playing', 'is playing'],
    correct_answer: 'are playing', explanation: 'Look! — маркер Present Continuous. Children — мн.ч., поэтому are playing.',
    hint: 'Действие происходит прямо сейчас.', confusion_note: 'Не путай с Present Simple (привычки).', is_active: true
  },
  {
    id: 'ex_5', lesson_id: 'les_2', prompt: 'I ___ a new language this semester.',
    exercise_type: 'multiple_choice', tense_tags: ['present_continuous'], difficulty: 'medium',
    options_json: ['learn', 'am learning', 'learns', 'learning'],
    correct_answer: 'am learning', explanation: 'This semester — временная ситуация, используем Present Continuous.',
    hint: 'Это временная ситуация, а не постоянная привычка.', confusion_note: 'This semester = ограниченный период → Continuous.', is_active: true
  },
  // Lesson 3 exercises
  {
    id: 'ex_6', lesson_id: 'les_3', prompt: 'He usually ___ coffee, but today he ___ tea.',
    exercise_type: 'fill_gap', tense_tags: ['present_simple', 'present_continuous'], difficulty: 'medium',
    options_json: ['drinks / is drinking', 'is drinking / drinks', 'drink / drinking', 'drinks / drinks'],
    correct_answer: 'drinks / is drinking',
    explanation: 'Usually → привычка (Simple). Today → именно сейчас, исключение (Continuous).',
    hint: 'Первая часть — про привычку, вторая — про сегодняшнее исключение.',
    confusion_note: 'Маркеры: usually = Simple, today = может быть Continuous.', is_active: true
  },
  // Lesson 4 exercises
  {
    id: 'ex_7', lesson_id: 'les_4', prompt: 'She ___ to Paris last summer.',
    exercise_type: 'fill_gap', tense_tags: ['past_simple'], difficulty: 'easy',
    options_json: ['travel', 'travels', 'travelled', 'was travelling'],
    correct_answer: 'travelled', explanation: 'Last summer — конкретное прошлое → Past Simple.',
    hint: 'Last summer — маркер прошлого.', confusion_note: 'Не путай с Past Continuous.', is_active: true
  },
  // Lesson 7 exercises
  {
    id: 'ex_8', lesson_id: 'les_7', prompt: 'I ___ never ___ sushi.',
    exercise_type: 'fill_gap', tense_tags: ['present_perfect'], difficulty: 'easy',
    options_json: ['have / tried', 'has / tried', 'had / tried', 'did / try'],
    correct_answer: 'have / tried', explanation: 'Опыт в жизни без привязки ко времени → Present Perfect: have + V3.',
    hint: 'Never — маркер Present Perfect.', confusion_note: 'Не путай с Past Simple — тут нет конкретного времени.', is_active: true
  },
  // Lesson 8 exercises
  {
    id: 'ex_9', lesson_id: 'les_8', prompt: 'Выбери правильный вариант: I ___ this movie. (опыт, без указания времени)',
    exercise_type: 'choose_context', tense_tags: ['present_perfect', 'past_simple'], difficulty: 'medium',
    options_json: ['have seen', 'saw', 'had seen', 'was seeing'],
    correct_answer: 'have seen', explanation: 'Опыт без указания когда → Present Perfect.',
    hint: 'Нет конкретного времени в прошлом.', confusion_note: 'Если бы было "yesterday" → Past Simple.', is_active: true
  },
  // Lesson 11 exercises
  {
    id: 'ex_10', lesson_id: 'les_11', prompt: '"I think I ___ have the salad." (решение в момент речи)',
    exercise_type: 'multiple_choice', tense_tags: ['future_will'], difficulty: 'easy',
    options_json: ["will", "am going to", "am having", "have"],
    correct_answer: "will", explanation: 'Спонтанное решение прямо сейчас → will.',
    hint: 'Решение принято в момент речи.', confusion_note: 'Going to — для заранее обдуманных планов.', is_active: true
  },
  // Extra trainer exercises
  {
    id: 'ex_11', lesson_id: 'les_5', prompt: 'At 7 PM yesterday, we ___ dinner.',
    exercise_type: 'fill_gap', tense_tags: ['past_continuous'], difficulty: 'easy',
    options_json: ['had', 'were having', 'have had', 'are having'],
    correct_answer: 'were having', explanation: 'В конкретный момент в прошлом шёл процесс → Past Continuous.',
    hint: 'At 7 PM yesterday = момент в прошлом.', confusion_note: 'Past Simple — завершённое. Continuous — процесс в моменте.', is_active: true
  },
  {
    id: 'ex_12', lesson_id: 'les_9', prompt: 'She ___ for this company for 10 years.',
    exercise_type: 'fill_gap', tense_tags: ['present_perfect_continuous'], difficulty: 'medium',
    options_json: ['works', 'has been working', 'is working', 'worked'],
    correct_answer: 'has been working', explanation: 'Действие началось в прошлом и продолжается → Present Perfect Continuous с for.',
    hint: 'for 10 years — длительность до сейчас.', confusion_note: 'Не путай с Present Perfect (результат) или Simple (привычка).', is_active: true
  },
];

export const DEMO_MATERIALS: Material[] = [
  { id: 'mat_1', title: 'Irregular Verbs Table', short_description: 'Полная таблица неправильных глаголов с транскрипцией и переводом', category: 'Таблицы', material_type: 'table', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: true },
  { id: 'mat_2', title: 'Tense Comparison Chart', short_description: 'Сравнительная таблица всех времён английского языка', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: true },
  { id: 'mat_3', title: 'Present Tenses Quick Reference', short_description: 'Быстрая справка по настоящим временам с примерами и маркерами', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: 'sec_1', is_published: true, is_featured: false },
  { id: 'mat_4', title: 'Stative Verbs List', short_description: 'Список глаголов состояния, которые не используются в Continuous', category: 'Основы', material_type: 'reference', file_url: '#', related_lesson_id: 'les_2', related_section_id: 'sec_1', is_published: true, is_featured: false },
  { id: 'mat_5', title: 'Time Markers Guide', short_description: 'Полный гид по маркерам времени для каждого тense', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: true },
  { id: 'mat_6', title: 'Perfect vs Simple Study Guide', short_description: 'Когда использовать Perfect, а когда Simple — подробный разбор', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: 'sec_3', is_published: true, is_featured: false },
  { id: 'mat_7', title: 'Future Forms Decision Tree', short_description: 'Схема выбора правильной формы будущего времени', category: 'Шпаргалки', material_type: 'cheatsheet', file_url: '#', related_lesson_id: null, related_section_id: 'sec_4', is_published: true, is_featured: true },
  { id: 'mat_8', title: 'Common Mistakes Workbook', short_description: 'Рабочая тетрадь с типичными ошибками и упражнениями на их исправление', category: 'Методички', material_type: 'guide', file_url: '#', related_lesson_id: null, related_section_id: null, is_published: true, is_featured: false },
];

export const DEMO_PROGRESS: Progress[] = [
  { id: 'prog_1', user_id: 'user_student', lesson_id: 'les_1', status: 'completed', completed_at: '2025-02-12' },
  { id: 'prog_2', user_id: 'user_student', lesson_id: 'les_2', status: 'completed', completed_at: '2025-02-15' },
  { id: 'prog_3', user_id: 'user_student', lesson_id: 'les_3', status: 'completed', completed_at: '2025-02-18' },
  { id: 'prog_4', user_id: 'user_student', lesson_id: 'les_4', status: 'completed', completed_at: '2025-02-22' },
  { id: 'prog_5', user_id: 'user_student', lesson_id: 'les_5', status: 'completed', completed_at: '2025-02-26' },
  { id: 'prog_6', user_id: 'user_student', lesson_id: 'les_6', status: 'completed', completed_at: '2025-03-01' },
  { id: 'prog_7', user_id: 'user_student', lesson_id: 'les_7', status: 'completed', completed_at: '2025-03-04' },
  { id: 'prog_8', user_id: 'user_student', lesson_id: 'les_8', status: 'completed', completed_at: '2025-03-07' },
  { id: 'prog_9', user_id: 'user_student', lesson_id: 'les_9', status: 'completed', completed_at: '2025-03-09' },
  { id: 'prog_10', user_id: 'user_student', lesson_id: 'les_10', status: 'in_progress', completed_at: null },
  { id: 'prog_11', user_id: 'user_student', lesson_id: 'les_11', status: 'not_started', completed_at: null },
  { id: 'prog_12', user_id: 'user_student', lesson_id: 'les_12', status: 'not_started', completed_at: null },
];

export const DEMO_TRAINER_STATS: TrainerStats = {
  id: 'ts_1', user_id: 'user_student', accuracy_avg: 78, practices_completed: 24,
  academic_points: 1250, weak_topics_json: ['present_perfect', 'past_continuous', 'future_will'],
  updated_at: '2025-03-10'
};

export const DEMO_ATTEMPTS: Attempt[] = [
  { id: 'att_1', user_id: 'user_student', exercise_id: 'ex_1', mode: 'lesson', selected_answer: 'goes', is_correct: true, score_delta: 10, created_at: '2025-02-12' },
  { id: 'att_2', user_id: 'user_student', exercise_id: 'ex_2', mode: 'lesson', selected_answer: 'are', is_correct: true, score_delta: 10, created_at: '2025-02-12' },
  { id: 'att_3', user_id: 'user_student', exercise_id: 'ex_4', mode: 'lesson', selected_answer: 'plays', is_correct: false, score_delta: -5, created_at: '2025-02-15' },
  { id: 'att_4', user_id: 'user_student', exercise_id: 'ex_6', mode: 'trainer_compare', selected_answer: 'is drinking / drinks', is_correct: false, score_delta: -5, created_at: '2025-02-20' },
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
