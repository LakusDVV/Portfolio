import { programmingModule } from './programming'
import { videoEditingModule } from './videoEditing'

export const portfolioModules = [programmingModule, videoEditingModule]

export function normalizeProjects(projects) {
  return projects.flatMap((project) => {
    const module = portfolioModules.find((item) => item.accepts(project))

    if (!module) {
      return []
    }

    return [{ ...module.normalize(project), module }]
  })
}
