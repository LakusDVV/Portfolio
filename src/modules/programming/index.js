export const programmingModule = {
  id: 'code',
  accent: 'blue',
  title: {
    ru: 'Программирование',
    en: 'Programming',
  },
  shortTitle: {
    ru: 'Код',
    en: 'Code',
  },
  description: {
    ru: 'Веб, приложения, логика, архитектура и эксперименты с интерактивными продуктами.',
    en: 'Web, apps, logic, architecture, and experiments with interactive products.',
  },
  empty: {
    ru: 'Код-проекты скоро появятся здесь.',
    en: 'Code projects will appear here soon.',
  },
  accepts(project) {
    return project.type === 'code'
  },
  normalize(project) {
    return {
      ...project,
      moduleId: 'code',
      links: [
        project.code?.githubUrl && {
          labelKey: 'github',
          url: project.code.githubUrl,
        },
        project.code?.liveUrl && {
          labelKey: 'live',
          url: project.code.liveUrl,
        },
      ].filter(Boolean),
      meta: {
        stack: project.code?.stack?.length ? project.code.stack : project.tags,
      },
    }
  },
}
