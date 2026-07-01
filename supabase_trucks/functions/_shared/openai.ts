/**
 * OpenAI provider abstraction for Edge Functions.
 * Uses dependency injection — the API key and model can be overridden.
 * This file abstracts the OpenAI API behind a provider interface,
 * making it swappable for other LLMs (Anthropic, Gemini, etc).
 *
 * Deno runtime: uses fetch directly (no SDK needed).
 */

/** Configuration for the AI provider (dependency injection) */
export interface AIProviderConfig {
    apiKey?: string;
    model?: string;
    baseUrl?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
}

/** A single message in a conversation */
export interface ChatCompletionMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

/** Response from the AI provider */
export interface AIResponse {
    message: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

/** Default system prompt for the truck selection assistant */
const DEFAULT_SYSTEM_PROMPT = `Você é o assistente virtual da Gabardo Trucks, uma concessionária de caminhões.
Seu papel é ajudar os clientes a:
- Encontrar o caminhão ideal para suas necessidades
- Esclarecer dúvidas sobre modelos, especificações e preços
- Fornecer informações sobre financiamento e condições de pagamento
- Orientar sobre manutenção e cuidados com caminhões
- Responder perguntas gerais sobre a Gabardo Trucks

Seja sempre cordial, profissional e objetivo. Responda em português do Brasil.
Se não souber a resposta, sugira que o cliente entre em contato com a equipe de vendas.`;

/**
 * AI provider interface — abstracts the LLM provider.
 */
export interface IAIProvider {
    chat(messages: ChatCompletionMessage[]): Promise<AIResponse>;
}

/**
 * OpenAI provider implementation.
 */
export class OpenAIProvider implements IAIProvider {
    private readonly apiKey: string;
    private readonly model: string;
    private readonly baseUrl: string;
    private readonly maxTokens: number;
    private readonly temperature: number;
    private readonly systemPrompt: string;

    constructor(config?: AIProviderConfig) {
        this.apiKey = config?.apiKey ?? Deno.env.get('OPENAI_API_KEY') ?? '';
        this.model = config?.model ?? 'gpt-4o-mini';
        this.baseUrl = config?.baseUrl ?? 'https://api.openai.com/v1';
        this.maxTokens = config?.maxTokens ?? 1024;
        this.temperature = config?.temperature ?? 0.7;
        this.systemPrompt = config?.systemPrompt ?? DEFAULT_SYSTEM_PROMPT;

        if (!this.apiKey) {
            throw new Error('Missing OPENAI_API_KEY');
        }
    }

    /**
     * Send a chat completion request to OpenAI.
     * @param messages - Conversation history (user + assistant messages)
     * @returns AI response with the assistant's message
     */
    async chat(messages: ChatCompletionMessage[]): Promise<AIResponse> {
        // Prepend system prompt
        const allMessages: ChatCompletionMessage[] = [
            { role: 'system', content: this.systemPrompt },
            ...messages,
        ];

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                model: this.model,
                messages: allMessages,
                max_tokens: this.maxTokens,
                temperature: this.temperature,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(
                `OpenAI API error (${response.status}): ${errorBody}`
            );
        }

        const data = await response.json();
        const choice = data.choices?.[0];

        if (!choice?.message?.content) {
            throw new Error('No response content from OpenAI');
        }

        return {
            message: choice.message.content,
            usage: data.usage
                ? {
                    promptTokens: data.usage.prompt_tokens,
                    completionTokens: data.usage.completion_tokens,
                    totalTokens: data.usage.total_tokens,
                }
                : undefined,
        };
    }
}

/**
 * Factory function: Create the AI provider (dependency injection).
 * Can be swapped to return a different provider (Anthropic, Gemini, etc.)
 */
export function createAIProvider(config?: AIProviderConfig): IAIProvider {
    return new OpenAIProvider(config);
}
