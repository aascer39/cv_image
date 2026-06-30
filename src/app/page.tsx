"use client";

import { motion } from "framer-motion";
import TimelineSection from "@/components/TimelineSection";

const KEYWORDS = [
  "图形图像处理",
  "深度学习",
  "卷积神经网络",
  "图像分类",
  "目标检测",
  "图像分割",
  "生成对抗网络",
];

export default function Home() {
  return (
    <div className="w-full bg-[#050B14]">
      {/* Hero 区块 — 铺满首屏可视区域 */}
      <section className="page-container flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center py-16 md:py-20">
        {/* 论文题目 */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full text-center text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          图形图像处理技术研究综述
          <span className="mt-4 block text-[#FF9F0A]">
            基于深度学习的图像处理与方法综述
          </span>
        </motion.h1>

        {/* 关键词标签 — 全宽平铺 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex w-full flex-row flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-10 lg:justify-evenly lg:gap-x-8"
        >
          {KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="inline-block whitespace-nowrap rounded-full border border-[#1E3A5F] bg-[#0D1B2A] px-5 py-2 text-base font-semibold text-[#FF9F0A] md:px-6 md:py-2.5 md:text-lg lg:text-xl"
            >
              {kw}
            </span>
          ))}
        </motion.div>

        {/* 核心论点 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-10 w-full text-center text-lg leading-relaxed text-gray-300 md:mt-12 md:text-xl lg:text-2xl xl:text-3xl"
        >
          图形图像处理从&ldquo;手工设计局部特征+传统机器学习分类器&rdquo;
          走向&ldquo;基于深度网络的端到端特征自适应学习&rdquo;，
          再进一步向&ldquo;大规模自注意力预训练模型（Transformer/大模型）&rdquo;演进。
          展现出高泛化性、高密集度的特点。
        </motion.p>
      </section>

      {/* 技术演进时间轴 */}
      <TimelineSection />
    </div>
  );
}
