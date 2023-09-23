const requestBodies = {
  Login: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              description: '使用者的信箱 (作為登入帳號)',
            },
            password: {
              type: 'string',
              description: '使用者的密碼 (作為登入密碼)',
            },
          },
        },
      },
    },
  },
  Signup: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['name', 'email', 'password', 'confirmPassword'],
          properties: {
            name: {
              type: 'string',
              description: '使用者的名稱',
            },
            email: {
              type: 'string',
              description: '使用者的信箱 (作為登入帳號)',
            },
            password: {
              type: 'string',
              description: '使用者的密碼 (作為登入密碼)',
            },
            confirmPassword: {
              type: 'string',
              description: '確認密碼',
            },
            roleId: {
              type: 'integer',
              description: '使用者的角色 (權限) ID，非必填、預設為 general',
            },
          },
        },
      },
    },
  },
  PutUser: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['name', 'email', 'roleId'],
          properties: {
            name: {
              type: 'string',
              description:
                '使用者的名稱，若不需變更該值，提交表單時須代入使用者原本的資料',
            },
            email: {
              type: 'string',
              description:
                '使用者的信箱 (作為登入帳號)，若不需變更該值，提交表單時須代入使用者原本的資料',
            },
            password: {
              type: 'string',
              description: '使用者的密碼 (作為登入密碼)',
            },
            confirmPassword: {
              type: 'string',
              description: '確認密碼',
            },
            roleId: {
              type: 'integer',
              description:
                '使用者的角色 (權限) ID，若不需變更該值，提交表單時須代入使用者原本的資料',
            },
          },
        },
      },
    },
  },
  PatchUserProfile: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['name', 'intro'],
          properties: {
            name: {
              type: 'string',
              description:
                '使用者的名稱，若不需變更該值，提交表單時須代入使用者原本的資料',
            },
            intro: {
              type: 'string',
              description:
                '使用者的自我介紹，除非是想清空 intro，否則提交表單時仍須代入使用者原本的資料、不可為空',
            },
            file: {
              type: 'file',
              description: '使用者的大頭照，非必填',
            },
          },
        },
      },
    },
  },
  PostNews: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['title', 'content', 'categoryId', 'file'],
          properties: {
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
            file: {
              type: 'file',
              description: '新聞的封面照',
            },
          },
        },
      },
    },
  },
  PutNews: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: [
            'title',
            'content',
            'categoryId',
            'isPublished',
            'createdAt',
          ],
          properties: {
            title: {
              type: 'string',
              description:
                '新聞的標題，若不需變更該值，提交表單時須代入新聞原本的資料',
            },
            content: {
              type: 'string',
              description:
                '新聞的內容 (HTML)，若不需變更該值，提交表單時須代入新聞原本的資料',
            },
            isPublished: {
              type: 'integer',
              description:
                '新聞是否發佈，若不需變更該值，提交表單時須代入新聞原本的資料',
            },
            createdAt: {
              type: 'string',
              description:
                '該筆資料建立的日期，由資料庫自動生成，若不需變更該值，提交表單時須代入新聞原本的資料',
            },
            categoryId: {
              type: 'integer',
              description:
                '新聞類型的 ID，若不需變更該值，提交表單時須代入新聞原本的資料',
            },
            file: {
              type: 'file',
              description: '新聞的封面照，非必填',
            },
          },
        },
      },
    },
  },
  PostNewsContentImg: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['file'],
          properties: {
            file: {
              type: 'file',
              description: '新聞內文的圖片',
            },
          },
        },
      },
    },
  },
  PutProduct: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['title', 'varietyId', 'desc', 'createdAt'],
          properties: {
            title: {
              type: 'string',
              description:
                '產品的標題，若不需變更該值，提交表單時須代入產品原本的資料',
            },
            subtitle: {
              type: 'string',
              description:
                '產品的副標，若不需變更該值，提交表單時須代入產品原本的資料、不可為空',
            },
            varietyId: {
              type: 'integer',
              description:
                '產品類型的 ID，若不需變更該值，提交表單時須代入產品原本的資料',
            },
            desc: {
              type: 'string',
              description:
                '產品的描述，若不需變更該值，提交表單時須代入產品原本的資料',
            },
            createdAt: {
              type: 'string',
              description:
                '該筆資料建立的日期，由資料庫自動生成，若不需變更該值，提交表單時須代入產品原本的資料',
            },
            file: {
              type: 'file',
              description: '產品的照片，非必填',
            },
          },
        },
      },
    },
  },
  PostProduct: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['title', 'varietyId', 'desc', 'file'],
          properties: {
            title: {
              type: 'string',
              description: '產品的標題',
            },
            subtitle: {
              type: 'string',
              description: '產品的副標',
            },
            varietyId: {
              type: 'integer',
              description: '產品類型的 ID',
            },
            desc: {
              type: 'string',
              description: '產品的描述',
            },
            file: {
              type: 'file',
              description: '產品的照片',
            },
          },
        },
      },
    },
  },
}

module.exports = requestBodies
