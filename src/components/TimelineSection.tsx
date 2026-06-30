"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_ERAS } from "@/data/paperData";

export default function HomeTimeline() {
  const [activeEra, setActiveEra] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const era = TECH_ERAS[activeEra];
  const node = era.nodes[activeNode];

  return (
    <section className="page-container w-full bg-[#050B14] py-16 md:py-24">
      <div className="w-full">
        {/* 阶段标题 */}
        <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          技术演进脉络
        </h2>
        <p className="mb-16 text-center text-xl text-gray-400 lg:text-2xl">
          从传统手工特征到深度 CNN，再到 Transformer 大模型与 AIGC
        </p>

        {/* 横向阶段选择器（粗大时间主干） */}
        <div className="relative mb-20">
          {/* 粗大主干线 */}
          <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#1E3A5F]" />
          <div
            className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#FF9F0A]"
            style={{
              width: `${((activeEra + 0.5) / TECH_ERAS.length) * 100}%`,
              transition: "width 0.6s ease",
            }}
          />

          <div className="relative flex justify-between">
            {TECH_ERAS.map((e, i) => (
              <button
                key={e.id}
                onClick={() => { setActiveEra(i); setActiveNode(0); }}
                className="flex min-w-0 flex-1 flex-col items-center gap-2 transition-all duration-300"
              >
                <motion.div
                  animate={{
                    scale: activeEra === i ? 1 : 0.7,
                    backgroundColor: activeEra === i ? "#FF9F0A" : "#0D1B2A",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#FF9F0A] text-lg font-bold text-white shadow-lg shadow-[#FF9F0A]/30"
                >
                  {i + 1}
                </motion.div>
                <span
                  className={`whitespace-normal break-words text-center text-xs font-bold leading-tight transition-colors md:text-sm ${
                    activeEra === i ? "text-[#FF9F0A]" : "text-gray-500"
                  }`}
                >
                  {e.era}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 选中阶段详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={era.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#1E3A5F] bg-[#0D1B2A] p-8 md:p-12"
          >
            {/* 阶段概览 */}
            <div className="mb-10 border-b border-[#1E3A5F] pb-6">
              <h3 className="mb-3 text-3xl font-bold text-[#FF9F0A] md:text-4xl">
                {era.era}
              </h3>
              <p className="mb-2 text-2xl font-semibold text-white">{era.period}</p>
              <p className="text-xl leading-relaxed text-gray-300">{era.summary}</p>
            </div>

            {/* 算法节点 Tab 选择 */}
            <div className="mb-8 flex flex-wrap gap-3">
              {era.nodes.map((n, i) => (
                <button
                  key={n.name}
                  onClick={() => setActiveNode(i)}
                  className={`rounded-lg px-6 py-3 text-lg font-bold transition-all duration-200 ${
                    activeNode === i
                      ? "bg-[#FF9F0A] text-[#050B14] shadow-lg shadow-[#FF9F0A]/30"
                      : "border border-[#1E3A5F] bg-transparent text-gray-300 hover:border-[#FF9F0A] hover:text-white"
                  }`}
                >
                  {n.name} ({n.year})
                </button>
              ))}
            </div>

            {/* 当前选中算法详情（大字号展示） */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${era.id}-${node.name}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 md:grid-cols-2"
              >
                {/* 左侧：技术细节 */}
                <div className="rounded-xl border border-[#1E3A5F] bg-[#050B14] p-6">
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    {node.name}{" "}
                    <span className="text-lg font-normal text-[#FF9F0A]">
                      ({node.year})
                    </span>
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {node.details}
                  </p>
                </div>

                {/* 右侧：优势 + 应用 */}
                <div className="flex flex-col gap-6">
                  <div className="rounded-xl border border-[#1E3A5F] bg-[#050B14] p-6">
                    <h5 className="mb-3 text-xl font-bold text-[#FF9F0A]">
                      ⚡ 核心优势
                    </h5>
                    <p className="text-lg leading-relaxed text-gray-200">
                      {node.advantage}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1E3A5F] bg-[#050B14] p-6">
                    <h5 className="mb-3 text-xl font-bold text-[#FF9F0A]">
                      🎯 应用场景
                    </h5>
                    <p className="text-lg leading-relaxed text-gray-200">
                      {node.application}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
