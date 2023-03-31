import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    bg_image:{
      url:'https://img.gejiba.com/images/c40b169b070eae05614a7dff1ff2fc99.webp',
      dark:'https://cdn.yunyoujun.cn/img/bg/galaxy.jpg',
    },
    banner: {
      enable: true,
      title: '人去影故，落叶听秋。',
      cloud: {
        enable: true,
      },
    },
    Sidebar:{
      opacity:0.7,
    },
    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2021,
      beian: {
        enable: true,
        icp: '萌ICP备1101011号',
      },
    },
  },

  unocss: { safelist },
})
