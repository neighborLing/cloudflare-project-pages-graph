'use client';

import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const DEEPSEEK_CHAT = gql`
  query DeepSeekChat($messages: [MessageInput!]!, $model: String, $temperature: Float) {
    deepseekChat(messages: $messages, model: $model, temperature: $temperature) {
      id
      model
      choices {
        index
        message {
          role
          content
        }
        finish_reason
      }
      usage {
        prompt_tokens
        completion_tokens
        total_tokens
      }
      error
    }
  }
`;

const OPENAI_CHAT = gql`
  query OpenAIChat($messages: [MessageInput!]!, $model: String) {
    openaiChat(messages: $messages, model: $model) {
      id
      model
      choices {
        index
        message {
          role
          content
        }
        finish_reason
      }
      usage {
        prompt_tokens
        completion_tokens
        total_tokens
      }
      error
    }
  }
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [provider, setProvider] = useState<'deepseek' | 'openai'>('deepseek');
  const [isLoading, setIsLoading] = useState(false);

  const [deepseekChat] = useLazyQuery(DEEPSEEK_CHAT);
  const [openaiChat] = useLazyQuery(OPENAI_CHAT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: inputValue };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const queryFunction = provider === 'deepseek' ? deepseekChat : openaiChat;
      const { data } = await queryFunction({
        variables: {
          messages: updatedMessages.map(msg => ({ role: msg.role, content: msg.content })),
          model: provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o',
          ...(provider === 'deepseek' && { temperature: 0.7 })
        }
      });

      const response = provider === 'deepseek' ? data.deepseekChat : data.openaiChat;
      
      if (response.error) {
        setMessages([...updatedMessages, { 
          role: 'assistant', 
          content: `错误: ${response.error}` 
        }]);
      } else if (response.choices && response.choices[0]) {
        setMessages([...updatedMessages, {
          role: 'assistant',
          content: response.choices[0].message.content
        }]);
      }
    } catch (error) {
      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: `请求失败: ${error instanceof Error ? error.message : '未知错误'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-4">LLM Chat Interface</h1>
        <div className="flex justify-center gap-4 items-center">
          <div className="flex gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="provider"
                value="deepseek"
                checked={provider === 'deepseek'}
                onChange={(e) => setProvider(e.target.value as 'deepseek')}
                className="mr-2"
              />
              DeepSeek
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="provider"
                value="openai"
                checked={provider === 'openai'}
                onChange={(e) => setProvider(e.target.value as 'openai')}
                className="mr-2"
              />
              OpenAI
            </label>
          </div>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            清空对话
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>正在思考...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的消息..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            发送
          </button>
        </div>
      </form>
    </div>
  );
}