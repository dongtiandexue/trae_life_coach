// 导入所需模块
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置中间件
app.use(cors()); // 启用CORS
app.use(express.json()); // 解析JSON请求体
app.use(express.static(path.join(__dirname))); // 提供静态文件

// 火山方舟API配置
const ARK_API_KEY = 'e0ffb4b4-23cf-48e0-bd57-f7f4def430a0';
const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 处理聊天请求的路由
app.post('/api/chat', async (req, res) => {
    try {
        // 获取请求中的消息
        const { messages } = req.body;
        
        // 确保系统消息存在
        if (!messages.some(msg => msg.role === 'system')) {
            messages.unshift({
                role: "system", 
                content: "你是一个专业的life coach，你的目标是通过对话帮助用户成长，给予用户有价值的建议和指导。你应该关注用户的个人发展、目标设定、时间管理、情绪管理等方面。你的回答应该具有启发性、支持性和实用性。"
            });
        }
        
        // 设置请求头
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ARK_API_KEY}`
        };
        
        // 设置请求体
        const requestBody = {
            model: "deepseek-r1-250120",
            messages: messages,
            stream: true,  // 启用流式输出
            temperature: 0.6  // 设置温度参数
        };
        
        // 设置响应头，启用流式传输
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        
        // 发送请求到火山方舟API
        const apiResponse = await fetch(ARK_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
            timeout: 60000  // 设置60秒超时
        });
        
        // 检查API响应状态
        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('API请求失败:', apiResponse.status, errorText);
            res.status(apiResponse.status).send(`API请求失败: ${errorText}`);
            return;
        }
        
        // 手动处理流式响应，兼容node-fetch v2和前端的ReadableStream API
        apiResponse.body.on('data', (chunk) => {
            // 将数据块发送给客户端
            res.write(chunk);
        });
        
        // 监听流结束事件
        apiResponse.body.on('end', () => {
            console.log('流式响应完成');
            res.end(); // 手动结束响应
        });
        
        // 监听错误事件
        apiResponse.body.on('error', (err) => {
            console.error('流处理错误:', err);
            if (!res.headersSent) {
                res.status(500).send(`流处理错误: ${err.message}`);
            } else {
                res.end();
            }
        });

        
    } catch (error) {
        console.error('处理请求时出错:', error);
        res.status(500).send(`服务器错误: ${error.message}`);
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`请在浏览器中访问 http://localhost:${PORT} 来使用Life Coach AI`);
});