export const typeDefs = `
  type Query {
    # GraphQL 测试接口
    testGraphQL(
      message: String = "Hello GraphQL!"
      includeTimestamp: Boolean = true
      echoCount: Int = 1
    ): TestResponse
    
    # DeepSeek Chat API
    deepseekChat(
      messages: [MessageInput!]!
      model: String = "deepseek-chat"
      stream: Boolean = false
      temperature: Float
      max_tokens: Int
    ): DeepSeekResponse
    
    # OpenAI Chat Completions API
    openaiResponse(
      model: String = "gpt-4o"
      input: String
      messages: [OpenAIMessageInput!]
      reasoning: ReasoningInput
    ): OpenAIResponse
    
    # Weather Agent API
    weatherAgent(
      messages: [MessageInput!]!
      runId: String = "weatherAgent"
      runtimeContext: String
    ): WeatherAgentResponse
  }
  
  # 消息输入类型
  input MessageInput {
    role: String!
    content: String!
  }
  
  # OpenAI 消息输入类型
  input OpenAIMessageInput {
    role: String!
    content: String!
  }
  
  # OpenAI 推理配置输入类型
  input ReasoningInput {
    effort: String
  }
  
  # DeepSeek API 响应类型
  type DeepSeekResponse {
    id: String
    object: String
    created: Int
    model: String
    choices: [Choice]
    usage: Usage
    error: String
  }
  
  # OpenAI API 响应类型
  type OpenAIResponse {
    id: String
    object: String
    created: Int
    model: String
    choices: [Choice]
    usage: Usage
    error: String
  }
  
  # 选择类型
  type Choice {
    index: Int
    message: Message
    finish_reason: String
  }
  
  # 消息类型
  type Message {
    role: String
    content: String
  }
  
  # 使用情况类型
  type Usage {
    prompt_tokens: Int
    completion_tokens: Int
    total_tokens: Int
  }
  
  # GraphQL 测试响应类型
  type TestResponse {
    success: Boolean!
    message: String!
    timestamp: String
    echo: [String!]!
    serverInfo: ServerInfo!
  }
  
  # 服务器信息类型
  type ServerInfo {
    environment: String
    version: String!
    uptime: String!
  }
  
  # Weather Agent 响应类型
  type WeatherAgentResponse {
    success: Boolean!
    response: WeatherAgentData
    error: String
  }
  
  # Weather Agent 数据类型
  type WeatherAgentData {
    id: String
    timestamp: String
    modelId: String
    headers: String
    body: WeatherAgentBody
    messages: [WeatherAgentMessage]
  }
  
  # Weather Agent Body 类型
  type WeatherAgentBody {
    id: String
    object: String
    created: Int
    model: String
    choices: [Choice]
    usage: Usage
    service_tier: String
    system_fingerprint: String
  }
  
  # Weather Agent Message 类型
  type WeatherAgentMessage {
    role: String
    content: [WeatherAgentContent]
    id: String
  }
  
  # Weather Agent Content 类型
  type WeatherAgentContent {
    type: String
    text: String
  }
`;