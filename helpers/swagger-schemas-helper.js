const schemas = {
  Role: {
    type: 'object',
    required: ['id', 'name', 'createdAt', 'updatedAt'],
    properties: {
      id: {
        type: 'string',
        description: '角色權限的 ID',
      },
      name: {
        type: 'string',
        description: '角色權限的名稱',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
  Variety: {
    type: 'object',
    required: ['id', 'name', 'createdAt', 'updatedAt'],
    properties: {
      id: {
        type: 'string',
        description: '產品類型的 ID',
      },
      name: {
        type: 'string',
        description: '產品類型',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
  Category: {
    type: 'object',
    required: ['id', 'name', 'createdAt', 'updatedAt'],
    properties: {
      id: {
        type: 'string',
        description: '新聞類型的 ID',
      },
      name: {
        type: 'string',
        description: '新聞類型',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
  User: {
    type: 'object',
    required: [
      'id',
      'email',
      'password',
      'name',
      'roleId',
      'isDeleted',
      'createdAt',
      'updatedAt',
    ],
    properties: {
      id: {
        type: 'integer',
        description: '使用者的 ID',
      },
      email: {
        type: 'string',
        description: '使用者的信箱 (作為登入帳號)',
      },
      password: {
        type: 'string',
        description: '使用者的密碼 (作為登入密碼)',
      },
      name: {
        type: 'string',
        description: '使用者的名稱',
      },
      intro: {
        type: 'string',
        description: '使用者的自我介紹',
      },
      avatar: {
        type: 'string',
        description: '使用者的大頭照',
      },
      roleId: {
        type: 'integer',
        description: '使用者的角色 (權限) ID',
      },
      isDeleted: {
        type: 'integer',
        description: '使用者是否刪除',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
  News: {
    type: 'object',
    required: [
      'id',
      'title',
      'content',
      'categoryId',
      'userId',
      'cover',
      'isPublished',
      'viewCount',
      'createdAt',
      'updatedAt',
    ],
    properties: {
      id: {
        type: 'integer',
        description: '新聞的 ID',
      },
      title: {
        type: 'string',
        description: '新聞的標題',
      },
      content: {
        type: 'string',
        description: '新聞的內容 (HTML)',
      },
      categoryId: {
        type: 'integer',
        description: '新聞類型的 ID',
      },
      userId: {
        type: 'integer',
        description: '新聞作者的 ID',
      },
      cover: {
        type: 'string',
        description: '新聞的封面照',
      },
      isPublished: {
        type: 'integer',
        description: '新聞是否發佈，預設為 0',
      },
      viewCount: {
        type: 'integer',
        description: '新聞點閱數，預設為 0',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
  Product: {
    type: 'object',
    required: [
      'id',
      'title',
      'subtitle',
      'cover',
      'desc',
      'varietyId',
      'createdAt',
      'updatedAt',
    ],
    properties: {
      id: {
        type: 'integer',
        description: '產品的 ID',
      },
      title: {
        type: 'string',
        description: '產品的標題',
      },
      subtitle: {
        type: 'string',
        description: '產品的副標',
      },
      cover: {
        type: 'string',
        description: '產品的照片',
      },
      desc: {
        type: 'string',
        description: '產品的描述',
      },
      varietyId: {
        type: 'integer',
        description: '產品類型的 ID',
      },
      createdAt: {
        type: 'string',
        description: '該筆資料建立的日期，由資料庫自動生成',
      },
      updatedAt: {
        type: 'string',
        description: '該筆資料最近更新的日期，由資料庫自動生成',
      },
    },
  },
}

module.exports = schemas
