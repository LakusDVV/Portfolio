import { useMemo, useState } from 'react'
import rawProjects from '../data/data.json'
import './App.css'
import { portfolioModules, normalizeProjects } from './modules/registry'
import { copy } from './shared/i18n'

const contacts = {
  github: 'https://github.com/LakusDVV',
  telegram: 'https://t.me/Vladis_DVV',
}

function App() {
  const [language, setLanguage] = useState('ru')
  const [theme, setTheme] = useState('dark')
  const [activeModule, setActiveModule] = useState('all')
  const [activeProject, setActiveProject] = useState(0)

  const t = copy[language]
  const projects = useMemo(() => normalizeProjects(rawProjects), [])
  const showcaseItems = useMemo(() => buildShowcaseItems(projects, t), [projects, t])
  const visibleItems =
    activeModule === 'all'
      ? showcaseItems
      : showcaseItems.filter((project) => project.moduleId === activeModule)
  const safeIndex = visibleItems.length ? activeProject % visibleItems.length : 0

  function selectModule(moduleId) {
    setActiveModule(moduleId)
    setActiveProject(0)
  }

  function moveProject(direction) {
    setActiveProject((current) => {
      const length = visibleItems.length

      if (!length) {
        return 0
      }

      return (current + direction + length) % length
    })
  }

  return (
    <main className="site-shell" data-theme={theme}>
      <header className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Vladislav DVV">
          <span>V</span>
          <strong>Vladislav DVV</strong>
        </a>

        <nav className="nav-links">
          <a href="#work">{t.nav.work}</a>
          <a href="#contacts">{t.nav.contacts}</a>
        </nav>

        <div className="control-group" aria-label="Display settings">
          <button
            className="text-control"
            type="button"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            aria-label="Switch language"
          >
            {language.toUpperCase()}
          </button>
          <button
            className="text-control"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Switch color theme"
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-text">{t.hero.text}</p>

          <div className="hero-actions">
            <a className="primary-action" href="#work">
              {t.actions.viewWork}
            </a>
            <a className="secondary-action" href="#contacts">
              {t.actions.contact}
            </a>
          </div>
        </div>

        <div className="signature-panel" aria-label="Vladislav DVV logo">
          <div className="signature-mark">V</div>
          <div className="signal-lines" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <SectionHeading title={t.sections.featured} />

        <Showcase
          items={visibleItems}
          activeIndex={safeIndex}
          language={language}
          onNext={() => moveProject(1)}
          onPrev={() => moveProject(-1)}
        />

        <div className="direction-tabs" aria-label="Direction filters">
          <button
            className={activeModule === 'all' ? 'active' : ''}
            type="button"
            onClick={() => selectModule('all')}
          >
            {t.actions.all}
          </button>
          {portfolioModules.map((module) => (
            <button
              className={activeModule === module.id ? 'active' : ''}
              type="button"
              key={module.id}
              onClick={() => selectModule(module.id)}
            >
              {module.shortTitle[language]}
            </button>
          ))}
        </div>
      </section>

      <footer className="contacts-section" id="contacts">
        <div>
          <p className="eyebrow">{t.sections.contacts}</p>
          <h2>Vladislav DVV</h2>
          <p>{t.contacts.intro}</p>
        </div>

        <div className="contact-links">
          <span>{t.contacts.email}</span>
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contacts.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </footer>
    </main>
  )
}

function SectionHeading({ title }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
    </div>
  )
}

function Showcase({ items, activeIndex, language, onNext, onPrev }) {
  return (
    <div className="showcase" aria-label="Project showcase">
      <button className="showcase-arrow prev" type="button" onClick={onPrev} aria-label="Previous">
        ‹
      </button>
      <div className="showcase-stage">
        {items.map((item, index) => {
          const offset = getCircularOffset(index, activeIndex, items.length)

          return (
            <ShowcaseCard
              item={item}
              key={item.id}
              language={language}
              offset={offset}
              isActive={offset === 0}
            />
          )
        })}
      </div>
      <button className="showcase-arrow next" type="button" onClick={onNext} aria-label="Next">
        ›
      </button>
    </div>
  )
}

function ShowcaseCard({ item, language, offset, isActive }) {
  const hidden = Math.abs(offset) > 1
  const style = { '--offset': offset, '--abs-offset': Math.abs(offset) }

  return (
    <article
      className={`showcase-card ${item.accent} ${hidden ? 'hidden' : ''}`}
      style={style}
      aria-hidden={!isActive}
    >
      <div className={`showcase-art ${item.visual}`}>
        <span>{typeof item.label === 'string' ? item.label : item.label[language]}</span>
        <div aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>

      <div className="showcase-content">
        <p className="project-category">{item.moduleTitle?.[language] || item.kind}</p>
        <h3 className="project-title">{item.title}</h3>
        <p className="project-description">{item.description}</p>
        {item.links?.length > 0 && (
          <div className="showcase-links">
            {item.links.map((link) => (
              <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}


function buildShowcaseItems(projects, t) {
  const realProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    moduleId: project.moduleId,
    moduleTitle: project.module.title,
    accent: project.module.accent,
    visual: project.moduleId === 'video' ? 'video' : 'code',
    label: project.module.shortTitle,
    kind: project.module.shortTitle.en,
    links: project.links?.map((link) => ({
      url: link.url,
      label: link.labelKey === 'video' ? 'YouTube' : 'GitHub',
    })),
  }))

  // Только реальные проекты
  return [
    ...realProjects,
    // Плашки "Скоро" и "План" - временно закомментированы
    // createPlaceholder('placeholder-web', 'code', 'code', 'blue', t.placeholders.web),
    // createPlaceholder('placeholder-app', 'code', 'app', 'violet', t.placeholders.app),
    // createPlaceholder('placeholder-media', 'video', 'video', 'green', t.placeholders.media),
  ]
}

function createPlaceholder(id, moduleId, visual, accent, content) {
  return {
    id,
    moduleId,
    visual,
    accent,
    title: content.title,
    description: content.description,
    label: {
      ru: content.label,
      en: content.label,
    },
    kind: content.label,
  }
}

function getCircularOffset(index, activeIndex, length) {
  const rawOffset = index - activeIndex
  const half = length / 2

  if (rawOffset > half) {
    return rawOffset - length
  }

  if (rawOffset < -half) {
    return rawOffset + length
  }

  return rawOffset
}

export default App