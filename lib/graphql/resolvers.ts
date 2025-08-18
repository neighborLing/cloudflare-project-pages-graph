interface MessageInput {
  role: string;
  content: string;
}

interface ChatArgs {
  messages: MessageInput[];
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

interface ChatResponse {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices?: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export const resolvers = {
  Query: {
    deepseekChat: async (_: any, args: ChatArgs): Promise<ChatResponse> => {
      try {
        const apiKey = process.env.DEEPSEEK_API_KEY;
        if (!apiKey) {
          return { error: 'DeepSeek API key not configured' };
        }

        const requestBody: any = {
          model: args.model || 'deepseek-chat',
          messages: args.messages,
          stream: args.stream || false
        };

        if (args.temperature !== undefined) {
          requestBody.temperature = args.temperature;
        }
        if (args.max_tokens !== undefined) {
          requestBody.max_tokens = args.max_tokens;
        }

        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          return {
            error: `DeepSeek API Error: ${response.status} - ${errorText}`
          };
        }

        const data = await response.json();
        return data as ChatResponse;
      } catch (error) {
        return {
          error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    },

    openaiChat: async (_: any, args: ChatArgs): Promise<ChatResponse> => {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return { error: 'OpenAI API key not configured' };
        }

        const requestBody: any = {
          model: args.model || 'gpt-4o',
          messages: args.messages
        };

        if (args.temperature !== undefined) {
          requestBody.temperature = args.temperature;
        }
        if (args.max_tokens !== undefined) {
          requestBody.max_tokens = args.max_tokens;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          return {
            error: `OpenAI API Error: ${response.status} - ${errorText}`
          };
        }

        const data = await response.json();
        return data as ChatResponse;
      } catch (error) {
        return {
          error: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }
  }
};