export type GrammarRole =
  | 'subject'      // 주어
  | 'verb'         // 동사
  | 'object'       // 목적어
  | 'complement'   // 보어
  | 'modifier'     // 수식어 (형용사, 부사 등)
  | 'clause'       // 절
  | 'conjunction'; // 접속사

export interface GrammarElement {
  text: string;
  role: GrammarRole;
  children?: GrammarElement[];
  startIndex: number;
  endIndex: number;
}

export interface GrammarAnalysis {
  original: string;
  elements: GrammarElement[];
  explanation: string;
  structure: string; // e.g., "S + V + O"
}

export const ROLE_LABELS: Record<GrammarRole, string> = {
  subject: '주어 (S)',
  verb: '동사 (V)',
  object: '목적어 (O)',
  complement: '보어 (C)',
  modifier: '수식어 (M)',
  clause: '절',
  conjunction: '접속사',
};

export const ROLE_COLORS: Record<GrammarRole, string> = {
  subject: '#3b82f6',     // blue
  verb: '#ef4444',        // red
  object: '#22c55e',      // green
  complement: '#a855f7',  // purple
  modifier: '#f59e0b',    // amber
  clause: '#ec4899',      // pink
  conjunction: '#14b8a6', // teal
};
