import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
//  favicon:'https://img.gejiba.com/images/4e5ccc3431646c828f05c9322711211f.png',
  url: 'https://www.free7iu.com/',
  lang: 'zh-CN',
  title: '人去影故，落叶听秋。',
  author: {
    avatar: 'https://img.gejiba.com/images/0cd81282b277c01376d3380d49d48024.jpg',
    name: '听秋',
    status:{
      emoji:'💙',
    },
  },
  subtitle:'All at leaf',
  description: '以我为始 以我为终♪',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'QQ',
      link: 'http://wpa.qq.com/msgrd?v=3&uin=3137513092&site=qq&menu=yes',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/free7iu',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    /*{
      name: '微博',
      link: 'https://weibo.com/jizhideyunyoujun',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    },
    {
      name: '豆瓣',
      link: 'https://www.douban.com/people/yunyoujun/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    },*/
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=440652076',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    /*{
      name: '知乎',
      link: 'https://www.zhihu.com/people/yunyoujun/',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    },*/
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/490722823',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    /*{
      name: '微信公众号',
      link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },*/
    {
      name: 'Twitter',
      link: 'https://twitter.com/YunYouJun',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/elpsycn',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: '3137513092@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],

  search: {
    enable: false,
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://img.gejiba.com/images/a27f0fc4cd2439d5e6c83df6b53cd409.png',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://img.gejiba.com/images/fe89a4144ff24a3983bd1acff8fb9382.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://img.gejiba.com/images/d1910e405de1336ca0ac6d0caf56d899.png',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
