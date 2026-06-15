export const videoEditingModule = {
  id: 'video',
  accent: 'green',
  title: {
    ru: 'Видеомонтаж',
    en: 'Video Editing',
  },
  shortTitle: {
    ru: 'Видео',
    en: 'Video',
  },
  description: {
    ru: 'Монтаж, ритм, игровые нарезки, работа со звуком и визуальными акцентами.',
    en: 'Editing, pacing, gameplay cuts, sound work, and visual accents.',
  },
  empty: {
    ru: 'Видео-кейсы скоро появятся здесь.',
    en: 'Video cases will appear here soon.',
  },
  accepts(project) {
    return project.type === 'video'
  },
  normalize(project) {
    return {
      ...project,
      moduleId: 'video',
      links: [
        project.video?.videoUrl && {
          labelKey: 'video',
          url: project.video.videoUrl,
        },
      ].filter(Boolean),
      meta: {
        tools: project.tags,
        role: project.video?.role,
        duration: project.video?.duration,
      },
    }
  },
}
