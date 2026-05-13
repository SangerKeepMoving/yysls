
export interface DemographicData {
  name: string;
  value: number;
}

export interface MetricData {
  label: string;
  value: string | number;
  suffix?: string;
  subtext?: string;
}

export interface Persona {
  id: string;
  name: string;
  tags: string[];
  quote: string;
  avatar: string;
  description: string;
  lifeStatus?: string;
  gamingHistory?: string;
  expectations?: string;
}

export const NAV_LINKS = [
  { id: 'who', label: '什么样的人在玩？', title: '玩家画像与特征' },
  { id: 'why', label: '他们为什么玩？', title: '下载动机与偏好' },
  { id: 'why-not', label: '听说过为什么不玩？', title: '流失与转化障碍' },
  { id: 'insights', label: '核心洞察', title: '核心洞察与建议' }
];

export const SAMPLE_STATS: MetricData[] = [
  { label: '问卷有效回收', value: 111, suffix: '份' },
  { label: '样本人均访谈', value: 15, suffix: 'min' }
];

export const USER_SEGMENTS = [
  { name: '正在玩', value: 35, display: '35%', fill: '#c5a059' },
  { name: '流失', value: 25, display: '25%', fill: '#0b0c10' },
  { name: '未入坑', value: 30, display: '30%', fill: '#2a3a3a' },
  { name: '陌生', value: 10, display: '10%', fill: '#444' }
];

export const AGE_DATA = [
  { name: '18-24岁', value: 59.02, fill: '#c5a059' },
  { name: '25-30岁', value: 24.59, fill: '#9c7d42' },
  { name: '18岁以下', value: 16.39, fill: '#6e562b' },
  { name: '31-35岁', value: 0, fill: '#413217' }
];

export const GENDER_DATA = [
  { name: '男', value: 63.93, fill: '#c5a059' },
  { name: '女', value: 36.07, fill: '#9c7d42' }
];

export const IDENTITY_DATA = [
  { name: '在校学生', value: 63.93, fill: '#c5a059' },
  { name: '自由职业', value: 14.75, fill: '#9c7d42' },
  { name: '其他', value: 11.48, fill: '#6e562b' },
  { name: '职场人士', value: 9.84, fill: '#2a3a3a' }
];

export const CITY_DATA = [
  { name: '三四线城市', value: 39.34, fill: '#c5a059' },
  { name: '新一/二线', value: 37.70, fill: '#9c7d42' },
  { name: '一线城市', value: 13.11, fill: '#6e562b' },
  { name: '海外', value: 6.56, fill: '#413217' },
  { name: '县城/乡镇', value: 3.28, fill: '#2a3a3a' }
];

export const DEVICE_DATA = [
  { name: 'PC', value: 63.64 },
  { name: '智能手机', value: 59.09 },
  { name: '游戏主机', value: 54.55 },
  { name: '平板电脑', value: 22.73 }
];

export const PLAY_MODE_DATA = [
  { name: '主要单人', value: 31.82, fill: '#c5a059' },
  { name: '主要多人', value: 31.82, fill: '#9c7d42' },
  { name: '只玩多人', value: 18.18, fill: '#6e562b' },
  { name: '只玩单人', value: 13.64, fill: '#413217' },
  { name: '各占一半', value: 4.55, fill: '#2a3a3a' }
];

export const PLAY_TIME_DATA = [
  { name: '30min-1h', value: 50.0 },
  { name: '1h-2h', value: 31.82 },
  { name: '15-30min', value: 9.09 },
  { name: '2h以上', value: 9.09 }
];

export const INFO_SOURCE_DATA = [
  { name: '抖音/短视频', value: 70.49 },
  { name: 'B站视频', value: 67.21 },
  { name: '微博/社交媒体', value: 52.46 },
  { name: '应用商店推荐', value: 36.07 },
  { name: '朋友提到过', value: 34.43 }
];

export const CONTACT_REASON_DATA = [
  { name: '好奇心驱动', value: 36.36, fill: '#c5a059' },
  { name: '江湖世界观', value: 22.73, fill: '#9c7d42' },
  { name: '战斗系统', value: 18.18, fill: '#6e562b' },
  { name: '开放世界玩法', value: 9.09, fill: '#413217' },
  { name: '角色定制', value: 9.09, fill: '#2a3a3a' }
];

export const GAME_BACKGROUND_DATA = [
  { name: '经典武侠网游', value: 54.55 },
  { name: '主机/PC开放世界', value: 45.45 },
  { name: '手机开放世界', value: 36.36 },
  { name: '从未玩过此类', value: 22.73 }
];

export const CORE_MOTIVATION_DATA = [
  { name: 'PVP竞技', value: 40.91, fill: '#c5a059' },
  { name: '剧情吸引', value: 22.73, fill: '#9c7d42' },
  { name: '门派机制', value: 13.64, fill: '#6e562b' },
  { name: '开放世界自由度', value: 9.09, fill: '#413217' },
  { name: '角色外观收集', value: 4.55, fill: '#2a3a3a' }
];

export const MOTIVATION_DATA = [
  { name: 'PVP竞技', value: 41, display: '41%' },
  { name: '剧情故事', value: 23, display: '23%' },
  { name: '门派机制', value: 14, display: '14%' },
  { name: '自由探索', value: 9, display: '9%' },
  { name: '社交互动', value: 5, display: '5%' }
];

export const FIRST_IMPRESSION_DATA = [
  { name: '感觉是换皮游戏', value: 68.85 },
  { name: '看起来很氪金', value: 68.85 },
  { name: '画面好看', value: 42.62 },
  { name: '武侠风格有意思', value: 40.98 },
  { name: '手机可能跑不动', value: 14.75 },
  { name: '玩法看起来复杂', value: 14.75 },
  { name: '和其他开放世界很像', value: 11.48 },
  { name: '感觉很有特色', value: 8.20 }
];

export const WHY_NOT_PLAY_DATA = [
  { name: '没有朋友一起玩', value: 72.13 },
  { name: '感觉游戏氪金重', value: 62.30 },
  { name: '对武侠题材不感兴趣', value: 44.26 },
  { name: '时间不够，不想开新坑', value: 37.70 },
  { name: '对这类开放世界无趣', value: 27.87 },
  { name: '玩法门槛高/上手烦', value: 9.84 },
  { name: '还没下载(其实想玩)', value: 8.20 },
  { name: '手机性能不够', value: 8.20 }
];

export const TRY_CONDITION_DATA = [
  { name: '有感兴趣的新玩法', value: 80.33 },
  { name: '基本不会去玩', value: 63.93 },
  { name: '朋友专门带我入门', value: 52.46 },
  { name: '口碑评价变得很好', value: 36.07 },
  { name: '优化了低配支持', value: 32.79 },
  { name: '出低门槛体验活动', value: 31.15 },
  { name: '精彩游戏内容视频', value: 24.59 }
];

export const BARRIER_DATA = [
  { name: '社交缺失', value: 72.1 },
  { name: '氪金压力', value: 62.3 },
  { name: '题材偏好', value: 44.2 },
  { name: '时间成本', value: 37.7 },
  { name: '体验阻滞', value: 27.9 }
];

export const KNOWLEDGE_DATA = [
  { name: '了解但没玩过', value: 39.64, fill: '#c5a059', highlight: true },
  { name: '从未听说过', value: 25.23, fill: '#3f3f46', highlight: false },
  { name: '听说过但不了解', value: 15.32, fill: '#a8a29e', highlight: true },
  { name: '玩过但已停玩', value: 10.81, fill: '#27272a', highlight: false },
  { name: '目前正在玩', value: 9.01, fill: '#18181b', highlight: false }
];

export const CHURN_CONSIDERATION_DATA = [
  { name: '目前已经停玩了', value: 40.91, fill: '#c5a059' },
  { name: '想过但最终留下来', value: 31.82, fill: '#6e562b' },
  { name: '从来没想过', value: 27.27, fill: '#2a3a3a' }
];

export const CHURN_DURATION_DATA = [
  { name: '不到1周', value: 58.33, fill: '#c5a059' },
  { name: '1~3个月', value: 16.67, fill: '#9c7d42' },
  { name: '1周~1个月', value: 8.33, fill: '#6e562b' },
  { name: '3~6个月', value: 8.33, fill: '#413217' },
  { name: '6个月以上', value: 8.33, fill: '#2a3a3a' }
];

export const CHURN_REASON_DATA = [
  { name: '内容玩完没新鲜感', value: 41.67, fill: '#c5a059' },
  { name: '具体的负面体验', value: 25.00, fill: '#9c7d42' },
  { name: '手机性能体验差', value: 8.33, fill: '#6e562b' },
  { name: '朋友都不玩了', value: 8.33, fill: '#413217' },
  { name: '有更感兴趣的游戏', value: 8.33, fill: '#2a3a3a' },
  { name: '其他', value: 8.33, fill: '#1a2a2a' }
];

export const CHURN_NEWS_DATA = [
  { name: '完全不关注了', value: 41.67, fill: '#413217' },
  { name: '看到了顺手看一眼', value: 41.67, fill: '#6e562b' },
  { name: '偶尔看看', value: 16.67, fill: '#c5a059' }
];

export const RETURN_MOTIVATION_DATA = [
  { name: '降低付费门槛', value: 66.67 },
  { name: '大版本更新/新图', value: 58.33 },
  { name: '朋友拉我回来', value: 25.00 },
  { name: '优化性能问题', value: 16.67 },
  { name: '基本不会回来', value: 16.67 }
];

export const GENERAL_DEVICE_DATA = [
  { name: 'PC (电脑)', value: 86.36, fill: '#c5a059' },
  { name: '智能手机', value: 59.09, fill: '#9c7d42' },
  { name: '平板电脑', value: 50.00, fill: '#6e562b' },
  { name: '游戏主机', value: 22.73, fill: '#413217' },
  { name: '基本不玩', value: 4.55, fill: '#2a3a3a' }
];

export const DAILY_TIME_DATA = [
  { name: '4小时以上', value: 26.23, fill: '#c5a059' },
  { name: '1~2小时', value: 22.95, fill: '#9c7d42' },
  { name: '2~4小时', value: 19.67, fill: '#6e562b' },
  { name: '不玩游戏', value: 11.48, fill: '#413217' },
  { name: '30min以内', value: 11.48, fill: '#2a3a3a' },
  { name: '30min-1h', value: 8.20, fill: '#1a2a2a' }
];

export const PERSONAS: Persona[] = [
  {
    id: 'fashion',
    name: '时尚潮流少东家',
    tags: ['颜值至上', '社交达人', '愿为时装付费'],
    quote: '“燕云应该给他的美术磕头！我本身就喜欢外观自由度高的游戏，燕云可以捏脸，并且时装设计非常精致！”',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
    description: '因为捏脸、建模和时装入坑，热衷于多人玩法，喜欢与好友一起PVP或者玩小游戏。',
    lifeStatus: '追求潮流生活方式，愿意为虚拟身份的美感投入金钱与时间。',
    gamingHistory: '偏好高自由度外观系统、社交性强的网络游戏。',
    expectations: '“主线剧情我会做，但我更在乎里面的麻将、斗地主、种地之类的小游戏，我还有个朋友把它当作《我的世界》玩。”'
  },
  {
    id: 'explorer',
    name: '江湖探险游侠',
    tags: ['硬核探索', '剧情考据', '社交冷淡'],
    quote: '“主线剧情特别吸引我，尤其是明暗线的伏笔，最后揭开会让人有一种惊叹设计的感觉。”',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop',
    description: '武侠类游戏爱好者，惊叹燕云的场景设计与体量，主打世界探索。',
    lifeStatus: '沉浸式体验追求者，在碎片化的生活中寻找一段极致的武侠梦。',
    gamingHistory: '有丰富的武侠或开放世界游戏经验，对叙事质量有极高要求。',
    expectations: '“我特别喜欢收集剧情图鉴，会为了达成全成就，很仔细去做。单单是单人模式走完全部剧情就已经非常肝了。”'
  },
  {
    id: 'curious',
    name: '好奇尝鲜玩家',
    tags: ['广告吸引', '快节奏', '容易乏味'],
    quote: '“没耐心看完剧情，直接跳过。但不跟着剧情的理解走，就玩得很无聊。”',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500&auto=format&fit=crop',
    description: '受广告吸引入场，认为剧情过于复杂庞大且耗费精力。',
    lifeStatus: '快节奏数字生活的原住民，阈值较高，需要即时反馈。',
    gamingHistory: '通过热门投放了解游戏，经验相对分散，缺乏深度武侠情怀依赖。',
    expectations: '“我玩的单人模式，刚出新手村就没玩了。剧情理解门槛对我来说有点高。”'
  }
];
