export const typeDefs = `
  type Query {
    # DeepSeek Chat API
    deepseekChat(
      messages: [MessageInput!]!
      model: String = "deepseek-chat"
      stream: Boolean = false
      temperature: Float
      max_tokens: Int
    ): ChatResponse
    
    # OpenAI Chat Completions API
    openaiChat(
      model: String = "gpt-4o"
      messages: [MessageInput!]!
    ): ChatResponse
  }
  
  # 消息输入类型
  input MessageInput {
    role: String!
    content: String!
  }
  
  # 统一的聊天响应类型
  type ChatResponse {
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
`;