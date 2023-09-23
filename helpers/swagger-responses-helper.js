const responses = {
  400: {
    description: '請求中的值無效或格式錯誤',
    contenets: 'application/json',
  },
  401: {
    description: 'Unauthorized - token 的值無效或格式錯誤',
    contenets: 'application/json',
  },
  200: {
    Role: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '角色權限的 ID',
        },
        name: {
          type: 'string',
          description: '角色權限的名稱',
        },
      },
    },
    Variety: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '產品類型的 ID',
        },
        name: {
          type: 'string',
          description: '產品類型的名稱',
        },
      },
    },
    Category: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '新聞類型的 ID',
        },
        name: {
          type: 'string',
          description: '新聞類型的名稱',
        },
      },
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: '使用者的 ID',
        },
        email: {
          type: 'string',
          description: '使用者的信箱 (作為登入帳號)',
        },
        name: {
          type: 'string',
          description: '使用者的名稱',
        },
        avatar: {
          type: 'string',
          description: '使用者的大頭照',
        },
        isDeleted: {
          type: 'integer',
          description: '是否刪除使用者',
        },
        role: {
          type: 'string',
          description: '使用者的角色 (權限)',
        },
      },
    },
    News: {
      type: 'object',
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
          description: '新聞是否發佈',
        },
        createdAt: {
          type: 'string',
          description: '該筆資料建立的日期，由資料庫自動生成',
        },
        updatedAt: {
          type: 'string',
          description: '該筆資料最近更新的日期，由資料庫自動生成',
        },
        category: {
          type: 'string',
          description: '新聞的類型',
        },
      },
    },
    Product: {
      type: 'object',
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
        createdAt: {
          type: 'string',
          description: '該筆資料建立的日期，由資料庫自動生成',
        },
        variety: {
          type: 'string',
          description: '產品類型',
        },
      },
    },
    GeneralRes: {
      description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',",
    },
    Login: {
      description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',",
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: '使用者的 ID',
              },
              email: {
                type: 'string',
                description: '使用者的信箱 (作為登入帳號)',
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
              isDeleted: {
                type: 'integer',
                description: '是否刪除使用者',
              },
              role: {
                type: 'string',
                description: '使用者的角色 (權限)',
              },
            },
          },
        },
      },
    },
    PutUser: {
      description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',",
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: '使用者的信箱 (作為登入帳號)',
              },
              name: {
                type: 'string',
                description: '使用者的名稱',
              },
              role: {
                type: 'string',
                description: '使用者的角色 (權限)',
              },
            },
          },
        },
      },
    },
    PatchUserProfile: {
      description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',",
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: '使用者的 ID',
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
                description: '使用者的大頭照，有上傳新大頭照時才會返回該值',
              },
            },
          },
        },
      },
    },
    PostNewsContentImg: {
      description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',",
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              imgUrl: {
                type: 'string',
                description: '上傳圖片的網址',
              },
            },
          },
        },
      },
    },
  },
}

module.exports = responses
