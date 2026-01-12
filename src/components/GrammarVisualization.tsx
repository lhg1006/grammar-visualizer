'use client';

import { motion } from 'framer-motion';
import { GrammarAnalysis, GrammarElement, ROLE_LABELS, ROLE_COLORS } from '@/types/grammar';

interface GrammarVisualizationProps {
  analysis: GrammarAnalysis;
}

export default function GrammarVisualization({ analysis }: GrammarVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* 문장 구조 표시 */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          문장 구조
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {analysis.structure}
        </p>
      </div>

      {/* 시각화된 문장 */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          문법 요소 분석
        </h3>
        <div className="flex flex-wrap items-center gap-1 text-xl leading-loose">
          {analysis.elements.map((element, idx) => (
            <GrammarToken key={idx} element={element} index={idx} />
          ))}
        </div>
      </div>

      {/* 범례 */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          범례
        </h3>
        <div className="flex flex-wrap gap-3">
          {analysis.elements
            .map((el) => el.role)
            .filter((role, idx, arr) => arr.indexOf(role) === idx)
            .map((role) => (
              <div
                key={role}
                className="flex items-center gap-2 rounded-full px-3 py-1"
                style={{
                  backgroundColor: `${ROLE_COLORS[role]}20`,
                  border: `1px solid ${ROLE_COLORS[role]}`,
                }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: ROLE_COLORS[role] }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: ROLE_COLORS[role] }}
                >
                  {ROLE_LABELS[role]}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* 설명 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          설명
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {analysis.explanation}
        </p>
      </div>

      {/* 상세 분석 */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          상세 분석
        </h3>
        <div className="space-y-3">
          {analysis.elements.map((element, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: ROLE_COLORS[element.role] }}
              >
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  &quot;{element.text}&quot;
                </p>
                <p
                  className="text-sm"
                  style={{ color: ROLE_COLORS[element.role] }}
                >
                  {ROLE_LABELS[element.role]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GrammarToken({ element, index }: { element: GrammarElement; index: number }) {
  const color = ROLE_COLORS[element.role];

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="relative inline-flex items-center"
    >
      {/* 여는 괄호 */}
      <span
        className="bracket mr-0.5 select-none"
        style={{ color }}
      >
        [
      </span>

      {/* 텍스트 */}
      <span
        className="rounded px-1 py-0.5 font-medium transition-all hover:brightness-110"
        style={{
          backgroundColor: `${color}15`,
          color,
          borderBottom: `2px solid ${color}`,
        }}
      >
        {element.text}
      </span>

      {/* 닫는 괄호 */}
      <span
        className="bracket ml-0.5 select-none"
        style={{ color }}
      >
        ]
      </span>

      {/* 역할 라벨 (작은 태그) */}
      <span
        className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {element.role.charAt(0).toUpperCase()}
      </span>
    </motion.span>
  );
}
