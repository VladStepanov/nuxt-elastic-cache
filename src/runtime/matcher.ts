import { options } from '#elastic-cache-options'
import minimatch from 'minimatch'

export function matchPage (currentPath: string) {
  return options.pages.some((expectedPath: string | RegExp) => {
    if (typeof expectedPath === 'string') {
      return minimatch(currentPath, expectedPath)
    }
    if (expectedPath instanceof RegExp) {
      return expectedPath.test(currentPath)
    }

    return false
  })
}
