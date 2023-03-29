import { existsSync, readFileSync } from 'node:fs'
import type { SiteConfig } from 'valaxy/types'
import type { ValaxyExtendConfig } from '../../types'

export interface CountData { cn: number; en: number }
export type ReadTimeOptions = SiteConfig['statistics']['readTime']

/**
 * count characters
 */
export const count = (content: string): CountData => {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03C9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length
  return {
    cn,
    en,
  }
}

/**
 * get read time by content & speed
 * @param content
 * @param param1
 * @returns read time (minute)
 */
export const readTime = (
  { cn, en }: CountData,
  options: ReadTimeOptions) => {
  const readingTime = cn / (options.speed.cn || 300) + en / (options.speed.en || 100)
  return readingTime < 1 ? 1 : Math.ceil(readingTime)
}

/**
 * return word count with k
 * @param content
 * @returns
 */
export const wordCount = ({ cn, en }: CountData) => {
  const num = cn + en
  if (num < 1000)
    return num

  return `${Math.round(num / 100) / 10}k`
}

export const statistics = (content: string, options: {
  readTime: ReadTimeOptions
}) => {
  const countData = count(content)
  return {
    countData,
    wordCount: wordCount(countData),
    readingTime: readTime(countData, options.readTime),
  }
}

// preset addon for statistics
export const presetStatistics = ({
  route,
  options,
}: {
  route: Parameters<Required<ValaxyExtendConfig>['extendMd']>[0]['route']
  options: SiteConfig['statistics']
}) => {
  if (existsSync(route.component)) {
    const file = readFileSync(route.component, 'utf-8')
    const { wordCount, readingTime } = statistics(file, {
      readTime: Object.assign({
        speed: {
          cn: 300,
          en: 100,
        },
      }, options.readTime),
    })
    if (route.meta.frontmatter) {
      if (!route.meta.frontmatter.wordCount)
        route.meta.frontmatter.wordCount = wordCount
      if (!route.meta.frontmatter.readingTime)
        route.meta.frontmatter.readingTime = readingTime
    }
  }
}
