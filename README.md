# Cloudflare Pages LLM Chat

一个基于 Next.js 和 GraphQL 的 LLM 聊天应用，部署在 Cloudflare Pages 上。

## 功能特性

- 🚀 基于 Next.js 14 构建
- 📊 使用 GraphQL 进行 API 通信
- 🤖 支持 DeepSeek 和 OpenAI 两种 LLM 提供商
- 🎨 使用 Tailwind CSS 进行样式设计
- ☁️ 部署在 Cloudflare Pages 上
- 📱 响应式设计，支持移动端

## 技术栈

- **前端**: Next.js 14, React, TypeScript, Tailwind CSS
- **GraphQL**: Apollo Client, GraphQL Yoga
- **部署**: Cloudflare Pages
- **API**: DeepSeek API, OpenAI API

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd cloudflare-project-pages-graph
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境变量配置

复制 `.env.example` 到 `.env.local`:

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加你的 API 密钥:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 4. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建应用

```bash
npm run build
```

## GraphQL API

应用提供了以下 GraphQL 查询:

### DeepSeek Chat

```graphql
query DeepSeekChat($messages: [MessageInput!]!, $model: String, $temperature: Float) {
  deepseekChat(messages: $messages, model: $model, temperature: $temperature) {
    id
    model
    choices {
      message {
        role
        content
      }
    }
    error
  }
}
```

### OpenAI Chat

```graphql
query OpenAIChat($messages: [MessageInput!]!, $model: String) {
  openaiChat(messages: $messages, model: $model) {
    id
    model
    choices {
      message {
        role
        content
      }
    }
    error
  }
}
```

## 部署到 Cloudflare Pages

### 1. 构建用于 Pages 的版本

```bash
npm run pages:build
```

### 2. 部署到 Cloudflare Pages

```bash
npm run pages:deploy
```

或者通过 Cloudflare 控制台连接你的 Git 仓库进行自动部署。

### 3. 环境变量配置

在 Cloudflare Pages 控制台中添加以下环境变量:

- `DEEPSEEK_API_KEY`: 你的 DeepSeek API 密钥
- `OPENAI_API_KEY`: 你的 OpenAI API 密钥
- `NODE_ENV`: production

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── components/         # React 组件
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── lib/                   # 库文件
│   ├── apollo-client.ts   # Apollo Client 配置
│   └── graphql/           # GraphQL 相关
│       ├── schema.ts      # GraphQL Schema
│       └── resolvers.ts   # GraphQL Resolvers
├── pages/                 # Pages Router (用于 API 路由)
│   └── api/
│       └── graphql.ts     # GraphQL API 端点
├── package.json
├── next.config.js
├── tailwind.config.js
└── wrangler.toml          # Cloudflare 配置
```

## 开发说明

- 使用 TypeScript 进行类型安全
- 支持暗色模式
- 使用 ESLint 进行代码检查
- 支持 GraphQL 开发模式下的 GraphiQL 界面

## 许可证

MIT