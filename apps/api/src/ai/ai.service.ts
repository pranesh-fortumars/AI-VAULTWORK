import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async askAi(prompt: string, userId: string) {
    // Simulate AI network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      role: 'assistant',
      content: `I received your prompt: "${prompt}". Since I am running in local mock mode without a real LLM API key, I am providing this mock response. Let me know if you need help with anything else!`
    };
  }
}
