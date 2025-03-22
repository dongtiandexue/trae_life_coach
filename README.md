# Life Coach AI 网站

## 项目概述
这是一个基于火山方舟DeepSeek R1 API的网站，旨在作为用户的life coach。通过与AI的对话，用户可以获得建议和指导，帮助个人成长。

## 项目架构
项目采用简单的前后端分离架构：
- 前端：使用HTML5、CSS和JavaScript构建用户界面
- 后端：使用Node.js创建简单的服务器，处理API请求并解决CORS问题

## 页面结构

### 主页 (index.html)
- **页眉区域**：包含网站标题和简短介绍
- **对话区域**：
  - 聊天历史显示区：展示用户与AI的对话历史
  - 用户输入区：文本输入框和发送按钮
- **页脚区域**：包含版权信息和其他链接

## 样式说明
- 采用响应式设计，适配不同设备屏幕
- 使用柔和的色彩方案，创造舒适的对话环境
- 聊天界面采用现代化的气泡设计
- 使用CSS Flexbox和Grid布局实现页面结构

## 功能特点
- 实时对话：用户可以与AI进行实时对话
- 流式输出：支持AI回复的流式输出
- 历史记录：保存对话历史，方便用户回顾

## 技术实现
- 前端使用原生JavaScript发送请求
- 后端使用Node.js和Express框架
- 通过后端代理转发请求到火山方舟DeepSeek R1 API
- 设置合理的超时时间和错误处理机制
- 使用环境变量管理API密钥和URL，支持Vercel部署

## 环境变量配置

### 本地开发
1. 在项目根目录创建`.env`文件（不要提交到版本控制）
2. 参考`.env.example`文件添加必要的环境变量：
   ```
   ARK_API_KEY=your-actual-api-key
   ARK_API_URL=https://ark.cn-beijing.volces.com/api/v3/chat/completions
   ```
3. 安装dotenv包：`npm install dotenv`
4. 在server.js顶部添加：`require('dotenv').config();`

### Vercel部署
1. 在Vercel项目设置中，找到「Environment Variables」部分
2. 添加以下环境变量：
   - `ARK_API_KEY`: 你的火山方舟API密钥
   - `ARK_API_URL`: 火山方舟API的URL（默认为https://ark.cn-beijing.volces.com/api/v3/chat/completions）
3. 保存设置并重新部署项目