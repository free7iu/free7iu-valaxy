import { resolve } from 'node:path'
import type { InlineConfig } from 'vite'
import { mergeConfig as mergeViteConfig, build as viteBuild } from 'vite'
import { build as viteSsgBuild } from 'vite-ssg/node'
import generateSitemap from 'vite-ssg-sitemap'

import fs from 'fs-extra'
import consola from 'consola'
import type { ResolvedValaxyOptions } from './options'
import { ViteValaxyPlugins } from './plugins/preset'
import { ALL_ROUTE } from './constants'
// import { logger } from './logger'

export async function build(
  options: ResolvedValaxyOptions,
  viteConfig: InlineConfig = {},
) {
  const inlineConfig = mergeViteConfig(viteConfig, {
    plugins: await ViteValaxyPlugins(options),
  })

  await viteBuild(inlineConfig)
}

export async function ssgBuild(
  options: ResolvedValaxyOptions,
  viteConfig: InlineConfig = {},
) {
  const defaultConfig: InlineConfig = {
    plugins: await ViteValaxyPlugins(options),
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/],
    },
  }

  defaultConfig.ssgOptions = {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths, routes) {
      const excludePages = ['/:..all', ALL_ROUTE]
      const postSize = paths.filter(path => path.startsWith('/posts/')).length
      const pages = Math.ceil(postSize / options.config.siteConfig.pageSize)
      const pagesArr = Array.from({ length: pages }, (_, i) => i + 1)
      return routes.filter(r => !excludePages.includes(r.path)).flatMap((route) => {
        // /page/:page
        return route.path === '/page/:page'
          ? pagesArr.map(slug => `/page/${slug}`)
          : route.path
      })
    },
    onFinished() {
      generateSitemap(
        {
          hostname: options.config.siteConfig.url,
        },
      )
    },
    // dirStyle default it flat
    // dirStyle: 'nested',
  }
  const inlineConfig: InlineConfig = mergeViteConfig(defaultConfig, viteConfig)

  await viteSsgBuild({}, inlineConfig)
}

/**
 * post process for ssg fix extra string like `/html>` `ml>` `l>`
 * todo find why
 * @param options
 */
export const postProcessForSSG = async (options: ResolvedValaxyOptions) => {
  const { userRoot } = options
  const indexPath = resolve(userRoot, 'dist/index.html')
  if (fs.existsSync(indexPath)) {
    consola.info('post process for ssg...')

    const indexFile = await fs.readFile(indexPath, 'utf-8')
    // fix incomplete index.html (with extra /html>) generated by vite-ssg
    const htmlTag = '</html>'
    if (!indexFile.endsWith(htmlTag)) {
      const htmlTagStart = indexFile.lastIndexOf(htmlTag)
      await fs.writeFile(indexPath, indexFile.slice(0, htmlTagStart + htmlTag.length), 'utf-8')
    }
  }
}
