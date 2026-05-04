export interface Recipe {
  id: string
  name: string
  image: string
  category: string
  area: string
  tags: string[]
  ingredients: Array<{name: string, amount: string}>
  instructions: string[]
  source?: string
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: '番茄炒鸡蛋',
    image: 'https://picsum.photos/seed/tomato-egg/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜'],
    ingredients: [
      { name: '番茄', amount: '3个' },
      { name: '鸡蛋', amount: '3个' },
      { name: '葱花', amount: '少许' },
      { name: '盐', amount: '适量' },
      { name: '糖', amount: '少许' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '番茄洗净切滚刀块，鸡蛋打散加少许盐搅匀',
      '锅中放油，油热后倒入鸡蛋液，炒散成块盛出',
      '锅中再放少许油，下番茄块翻炒，加盐和少许糖调味',
      '番茄炒出汁后倒入炒好的鸡蛋，翻炒均匀',
      '撒上葱花，出锅装盘即可'
    ]
  },
  {
    id: '2',
    name: '宫保鸡丁',
    image: 'https://picsum.photos/seed/kungpao/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜'],
    ingredients: [
      { name: '鸡胸肉', amount: '250克' },
      { name: '花生米', amount: '50克' },
      { name: '干辣椒', amount: '10个' },
      { name: '花椒', amount: '少许' },
      { name: '葱白', amount: '2段' },
      { name: '蒜', amount: '3瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' },
      { name: '料酒', amount: '1勺' }
    ],
    instructions: [
      '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟',
      '调碗汁：生抽、醋、糖、淀粉、少许水混合',
      '花生米炸至金黄捞出备用',
      '锅中放油，爆香干辣椒和花椒，下鸡丁滑炒变色',
      '加葱蒜炒香，倒入碗汁快速翻炒',
      '最后倒入花生米炒匀出锅'
    ]
  },
  {
    id: '3',
    name: '红烧肉',
    image: 'https://picsum.photos/seed/hongshaorou/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['硬菜', '下酒菜'],
    ingredients: [
      { name: '五花肉', amount: '500克' },
      { name: '冰糖', amount: '30克' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '料酒', amount: '2勺' },
      { name: '八角', amount: '2个' },
      { name: '桂皮', amount: '1小块' },
      { name: '姜片', amount: '3片' },
      { name: '葱段', amount: '2段' }
    ],
    instructions: [
      '五花肉切块，冷水下锅焯水去血沫，捞出洗净',
      '锅中放少许油，下冰糖小火炒出糖色',
      '下肉块翻炒上色',
      '加葱姜、八角、桂皮炒香',
      '加生抽、老抽、料酒，加水没过肉',
      '大火烧开后转小火炖1小时',
      '大火收汁即可'
    ]
  },
  {
    id: '4',
    name: '蒜蓉西兰花',
    image: 'https://picsum.photos/seed/broccoli/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['素菜', '健康'],
    ingredients: [
      { name: '西兰花', amount: '1颗' },
      { name: '蒜', amount: '5瓣' },
      { name: '盐', amount: '适量' },
      { name: '油', amount: '适量' },
      { name: '鸡精', amount: '少许' }
    ],
    instructions: [
      '西兰花掰成小朵，洗净沥干',
      '蒜切末备用',
      '锅中水烧开，加盐和少许油，下西兰花焯烫2分钟捞出',
      '锅中放油，下蒜末爆香',
      '下西兰花翻炒，加少许盐和鸡精调味',
      '快速翻炒均匀出锅'
    ]
  },
  {
    id: '5',
    name: '糖醋排骨',
    image: 'https://picsum.photos/seed/tangcu/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['酸甜', '下饭菜'],
    ingredients: [
      { name: '排骨', amount: '500克' },
      { name: '生抽', amount: '1勺' },
      { name: '料酒', amount: '1勺' },
      { name: '醋', amount: '3勺' },
      { name: '糖', amount: '2勺' },
      { name: '番茄酱', amount: '2勺' },
      { name: '姜片', amount: '3片' },
      { name: '葱段', amount: '2段' }
    ],
    instructions: [
      '排骨冷水下锅焯水，捞出洗净',
      '排骨加生抽、料酒腌制20分钟',
      '锅中放油，排骨炸至金黄捞出',
      '调糖醋汁：醋、糖、番茄酱、少许水混合',
      '锅中留底油，倒入糖醋汁熬煮',
      '下排骨翻炒均匀，收汁即可'
    ]
  },
  {
    id: '6',
    name: '酸辣土豆丝',
    image: 'https://picsum.photos/seed/tudousi/400/300',
    category: '家常菜',
    area: '中式',
    tags: ['快手菜', '下饭菜'],
    ingredients: [
      { name: '土豆', amount: '2个' },
      { name: '干辣椒', amount: '5个' },
      { name: '花椒', amount: '少许' },
      { name: '醋', amount: '2勺' },
      { name: '盐', amount: '适量' },
      { name: '葱花', amount: '少许' }
    ],
    instructions: [
      '土豆去皮切丝，用清水冲洗去淀粉，沥干',
      '锅中放油，爆香干辣椒和花椒',
      '下土豆丝大火翻炒',
      '加盐，淋入醋，快速翻炒均匀',
      '撒葱花出锅'
    ]
  },
  {
    id: '7',
    name: '鱼香肉丝',
    image: 'https://picsum.photos/seed/yuxiang/400/300',
    category: '川菜',
    area: '中式',
    tags: ['经典菜', '下饭菜'],
    ingredients: [
      { name: '猪里脊肉', amount: '200克' },
      { name: '木耳', amount: '适量' },
      { name: '胡萝卜', amount: '1/2根' },
      { name: '青椒', amount: '1个' },
      { name: '剁椒', amount: '1勺' },
      { name: '生抽', amount: '1勺' },
      { name: '醋', amount: '1勺' },
      { name: '糖', amount: '1勺' }
    ],
    instructions: [
      '肉切丝，加盐、料酒、淀粉腌制',
      '木耳泡发切丝，胡萝卜、青椒切丝',
      '调鱼香汁：生抽、醋、糖、淀粉、少许水',
      '锅中放油，下肉丝滑散盛出',
      '底油爆香剁椒，下蔬菜丝翻炒',
      '倒入肉丝和鱼香汁，快速翻炒出锅'
    ]
  },
  {
    id: '8',
    name: '葱油拌面',
    image: 'https://picsum.photos/seed/banmian/400/300',
    category: '面食',
    area: '中式',
    tags: ['快手菜', '早餐'],
    ingredients: [
      { name: '面条', amount: '200克' },
      { name: '小葱', amount: '1把' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '糖', amount: '1勺' },
      { name: '油', amount: '适量' }
    ],
    instructions: [
      '葱洗净切段，葱白葱绿分开',
      '调酱汁：生抽、老抽、糖混合',
      '锅中多放油，小火慢慢炸葱段至金黄焦香',
      '趁热倒入酱汁，稍微煮一下关火',
      '面条煮熟捞出，淋上葱油酱汁拌匀即可'
    ]
  }
]

export const categories = [
  { name: '全部', value: '' },
  { name: '家常菜', value: '家常菜' },
  { name: '川菜', value: '川菜' },
  { name: '面食', value: '面食' },
  { name: '汤羹', value: '汤羹' },
  { name: '凉菜', value: '凉菜' }
]

export const ingredientsList = [
  '鸡蛋', '猪肉', '鸡肉', '牛肉',
  '番茄', '土豆', '白菜', '青菜',
  '豆腐', '青椒', '茄子', '黄瓜',
  '面条', '米饭', '面粉'
]
