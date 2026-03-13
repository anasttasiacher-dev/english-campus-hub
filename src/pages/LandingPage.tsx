import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Target, Library, ChevronRight, Check, HelpCircle, ArrowRight, Zap, Brain, BarChart3, Clock, Users, Layers, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DEMO_SECTIONS, DEMO_LESSONS, getLessonsBySection, DEMO_PRODUCT } from '@/data/demo-data';
import LandingCheckout from '@/components/landing/LandingCheckout';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } })
};

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const [showCheckout, setShowCheckout] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-heading text-base font-semibold text-primary">English Campus</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">О продукте</a>
            <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
            <a href="#inside" className="hover:text-foreground transition-colors">Что внутри</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Цена</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to={user?.role === 'admin' ? '/admin' : '/app'}>
                <Button variant="outline" size="sm">Войти в кабинет</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-padding campus-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-campus-sage text-sm font-semibold tracking-wider uppercase mb-3">English Campus</motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={0.5} className="text-muted-foreground text-base mb-5 max-w-xl mx-auto">Онлайн-платформа по английскому языку с атмосферой академического кампуса</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-heading text-5xl md:text-6xl font-bold text-primary mb-4">Tense Lab</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Практикум по временам английского языка. {DEMO_LESSONS.length} уроков с видео, конспектами, упражнениями и тренажёром — чтобы времена наконец стали понятными.
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2.2} className="text-campus-brown text-sm mb-6">Уровни A1 – B2</motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Button size="lg" className="text-base px-8 py-5 rounded-xl" onClick={() => setShowCheckout(true)}>
              Присоединиться <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding" id="about">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-3">Знакомо?</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Многие учат времена годами, но так и не могут быстро выбрать нужную форму</motion.p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'Хаос во временах', desc: 'Правила знакомы, но не складываются в систему. Present Perfect, Past Simple, Continuous — всё путается.' },
              { icon: Zap, title: 'Трудно выбрать форму', desc: 'В разговоре или на письме не хватает уверенности: какое время использовать и почему?' },
              { icon: Layers, title: 'Похожие времена', desc: 'Present Perfect vs Past Simple, will vs going to — знаешь оба, но не видишь разницу.' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="paper-card p-5">
                <item.icon className="h-7 w-7 text-campus-gold mb-3" />
                <h3 className="text-heading text-base font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding campus-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary mb-10">После Tense Lab</motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Система времён станет понятной и логичной',
              'Меньше путаницы при выборе нужной формы',
              'Видны различия между похожими временами',
              'Есть теория, практика и тренажёр в одном месте',
              'Больше уверенности в речи и на письме',
              'Слабые места видны и над ними можно работать',
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="flex items-start gap-3 text-left">
                <Check className="h-5 w-5 text-campus-success mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-3">Как устроен Tense Lab</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">{DEMO_LESSONS.length} уроков · 4 раздела · Видео + Конспекты + Упражнения + Тренажёр + Библиотека</motion.p>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: Play, title: 'Видеоурок', desc: 'Объяснение с примерами и контекстом' },
              { icon: BookOpen, title: 'Конспект', desc: 'Структурированная теория под рукой' },
              { icon: Target, title: 'Упражнения', desc: 'Практика сразу после теории' },
              { icon: BarChart3, title: 'Тренажёр', desc: 'Режимы для закрепления и работы над слабыми местами' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-heading text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="section-padding campus-gradient" id="program">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-10">Программа</motion.h2>
          <div className="space-y-4">
            {DEMO_SECTIONS.map((section, si) => (
              <motion.div key={section.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={si} className="paper-card overflow-hidden">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Раздел {section.sort_order}</span>
                    <span className="text-heading text-lg font-semibold text-foreground">{section.title}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-0.5">{section.description}</p>
                </div>
                <div className="divide-y divide-border">
                  {getLessonsBySection(section.id).map(lesson => (
                    <div key={lesson.id} className="p-3 px-5 flex items-center gap-3">
                      <span className="text-sm font-bold text-campus-gold w-7">{lesson.lesson_number}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{lesson.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{lesson.short_description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="section-padding" id="inside">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-10">Что внутри платформы</motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, title: 'Личный кабинет', desc: 'Прогресс, статистика, текущий урок и рекомендации тренажёра' },
              { icon: BookOpen, title: 'Программа курса', desc: `Карта из 4 разделов и ${DEMO_LESSONS.length} уроков с видео, конспектами и упражнениями` },
              { icon: Target, title: 'Тренажёр', desc: 'Выбирай нужные времена, тренируйся в mixed mode или прорабатывай слабые места' },
              { icon: Library, title: 'Библиотека', desc: 'Шпаргалки, таблицы, методички — все материалы в одном месте' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="paper-card-hover p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-campus-gold/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-campus-gold" />
                </div>
                <div>
                  <h3 className="text-heading text-base font-semibold text-foreground mb-0.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding campus-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary mb-10">Для кого</motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'A1 – A2', desc: 'Начинаешь разбираться с временами и хочешь сразу строить систему' },
              { title: 'A2 – B1', desc: 'Уже знаешь базу, но времена — слабое место' },
              { title: 'B1 – B2', desc: 'Нужна система и уверенность в продвинутых формах' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="paper-card p-5">
                <h3 className="text-heading text-lg font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning format */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary mb-10">Формат обучения</motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            {['Смотри урок', 'Читай конспект', 'Проходи упражнения', 'Тренируйся', 'Повторяй'].map((step, i) => (
              <React.Fragment key={i}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                  <span className="text-foreground font-medium text-sm">{step}</span>
                </motion.div>
                {i < 4 && <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding campus-gradient" id="pricing">
        <div className="max-w-md mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-6">Доступ</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="paper-card p-6 text-center">
            <h3 className="text-heading text-xl font-bold text-foreground mb-2">Tense Lab</h3>
            <p className="text-3xl font-bold text-primary mb-1">{DEMO_PRODUCT.price} ₽</p>
            <p className="text-muted-foreground text-sm mb-5">Полный доступ · Без ограничений по времени</p>
            <ul className="text-left space-y-2.5 mb-6">
              {[`${DEMO_LESSONS.length} видеоуроков`, 'Конспекты к каждому уроку', 'Упражнения с проверкой', 'Тренажёр с выбором времён', 'Библиотека материалов', 'Отслеживание прогресса', 'Бессрочный доступ'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-campus-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full text-base py-5 rounded-xl" onClick={() => setShowCheckout(true)}>
              Купить доступ <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" id="faq">
        <div className="max-w-2xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-heading text-3xl font-bold text-primary text-center mb-6">Вопросы и ответы</motion.h2>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: 'Какой уровень нужен?', a: 'От A1 до B2. Курс подходит тем, кто хочет выстроить систему времён с нуля или навести порядок в уже знакомых правилах.' },
              { q: 'Сколько длится доступ?', a: 'Доступ бессрочный — учитесь в удобном темпе без ограничений.' },
              { q: 'Можно ли проходить в своём темпе?', a: 'Да, никаких дедлайнов. Вы сами выбираете, когда и сколько заниматься.' },
              { q: 'Есть ли тренажёр?', a: 'Да, тренажёр с возможностью выбрать конкретные времена, смешанной практикой и работой над слабыми местами.' },
              { q: 'Есть ли дополнительные материалы?', a: 'Да, библиотека включает таблицы, шпаргалки, методички и справочные материалы.' },
              { q: 'Как получить доступ после оплаты?', a: 'После оплаты вы сразу получаете доступ к платформе. На указанный email придёт ссылка для входа.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="paper-card px-5">
                <AccordionTrigger className="text-foreground text-sm font-medium hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-heading text-sm font-semibold text-primary">English Campus</span>
          </div>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} English Campus. Все права защищены.</p>
        </div>
      </footer>

      {showCheckout && <LandingCheckout onClose={() => setShowCheckout(false)} />}
    </div>
  );
}
