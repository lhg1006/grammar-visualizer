import OpenAI from 'openai';
import { GrammarAnalysis, GrammarElement } from '@/types/grammar';

export async function analyzeGrammar(
  apiKey: string,
  sentence: string
): Promise<GrammarAnalysis> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // 클라이언트 사이드에서 사용
  });

  const systemPrompt = `You are an English grammar expert. Analyze the given sentence and identify its grammatical components.

Return a JSON object with the following structure:
{
  "original": "the original sentence",
  "elements": [
    {
      "text": "word or phrase",
      "role": "subject" | "verb" | "object" | "complement" | "modifier" | "clause" | "conjunction",
      "startIndex": number (0-based index where this element starts in the original sentence),
      "endIndex": number (0-based index where this element ends, exclusive)
    }
  ],
  "explanation": "A brief explanation of the sentence structure in Korean",
  "structure": "e.g., S + V + O + M"
}

Rules:
1. Cover the entire sentence - every word should belong to some element
2. Elements should not overlap
3. startIndex and endIndex must exactly match the position in the original sentence
4. Include spaces in the indices calculation
5. For complex sentences with clauses, identify the main clause elements and subordinate clauses
6. Common patterns:
   - Subject (S): noun phrases that perform the action
   - Verb (V): action or state words, include auxiliaries
   - Object (O): noun phrases that receive the action
   - Complement (C): words that complete the meaning (after linking verbs)
   - Modifier (M): adjectives, adverbs, prepositional phrases
   - Clause: subordinate/dependent clauses (when, if, that, which, etc.)
   - Conjunction: and, but, or, etc.

Example:
Input: "The quick brown fox jumps over the lazy dog."
Output:
{
  "original": "The quick brown fox jumps over the lazy dog.",
  "elements": [
    {"text": "The quick brown fox", "role": "subject", "startIndex": 0, "endIndex": 19},
    {"text": "jumps", "role": "verb", "startIndex": 20, "endIndex": 25},
    {"text": "over the lazy dog", "role": "modifier", "startIndex": 26, "endIndex": 43},
    {"text": ".", "role": "modifier", "startIndex": 43, "endIndex": 44}
  ],
  "explanation": "주어(The quick brown fox)가 동사(jumps)를 수행하고, 수식어(over the lazy dog)가 동작의 방향을 나타냅니다.",
  "structure": "S + V + M"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Analyze this sentence: "${sentence}"` },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const result = JSON.parse(content) as GrammarAnalysis;

  // Validate and fix indices
  result.elements = validateAndFixElements(result.elements, sentence);

  return result;
}

function validateAndFixElements(
  elements: GrammarElement[],
  sentence: string
): GrammarElement[] {
  return elements.map((el) => {
    // 실제 텍스트 위치 찾기
    const actualIndex = sentence.indexOf(el.text);
    if (actualIndex !== -1) {
      return {
        ...el,
        startIndex: actualIndex,
        endIndex: actualIndex + el.text.length,
      };
    }
    return el;
  });
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    await openai.models.list();
    return true;
  } catch {
    return false;
  }
}
