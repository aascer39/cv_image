"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { TECH_ERAS } from "@/data/paperData";

/* =========================
   CompareSlider 组件
   模拟传统特征 vs 深度Mask 滑动对比
   ========================= */
function CompareSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // 确定性颜色，避免 random 导致 hydration 不匹配
  const leftColors = useMemo(
    () =>
      Array.from({ length: 36 }).map(
        (_, i) => `hsl(${200 + (i * 7) % 60}, 40%, ${25 + (i * 3) % 35}%)`
      ),
    []
  );
  const rightColors = useMemo(
    () =>
      Array.from({ length: 12 }).map(
        (_, i) => `hsl(${200 + i * 30}, 70%, 55%)`
      ),
    []
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    },
    []
  );

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="mt-6 w-full">
      <h3 className="mb-4 text-center text-2xl font-bold text-white">
        🖱️ 滑动对比：传统手工特征 vs 深度学习分割掩码
      </h3>
      <p className="mb-6 text-center text-lg text-gray-400">
        向左/向右拖动中间滑块，直观感受技术代差
      </p>

      <div
        ref={containerRef}
        className="relative h-72 cursor-ew-resize overflow-hidden rounded-2xl border-2 border-[#1E3A5F] md:h-96"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
      >
        {/* 左侧：传统特征（HOG 风格示意） */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#0D1B2A]"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="rounded-full bg-[#1E3A5F] px-4 py-1 text-lg font-bold text-gray-300">
              传统手工特征
            </span>
            <div className="grid grid-cols-6 gap-1">
              {leftColors.map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded"
                  style={{
                    backgroundColor: `hsl(${Math.random() * 60 + 200}, 40%, ${Math.random() * 40 + 20}%)`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <p className="text-lg text-gray-400">SIFT / HOG / LBP</p>
            <p className="text-sm text-gray-500">人工设计特征算子 + 浅层分类器</p>
          </div>
        </div>

        {/* 右侧：深度分割掩码（U-Net / SAM 风格） */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0D1B2A] to-[#050B14]">
            <span className="rounded-full bg-[#FF9F0A] px-4 py-1 text-lg font-bold text-[#050B14]">
              深度分割 Mask
            </span>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-6">
              {/* 模拟圆形和曲线分割 */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{
                    backgroundColor: `hsl(${i * 40}, 80%, 50%)`,
                    border: "3px solid #FF9F0A",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1 px-6">
              {rightColors.map((color, i) => (
                <div
                  key={i}
                  className="h-6 flex-1 rounded-sm"
                  style={{
                    backgroundColor: `hsl(${i * 30 + 200}, 70%, 55%)`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-lg text-white">U-Net / SAM</p>
            <p className="text-sm text-gray-400">端到端像素级语义分割</p>
          </div>
        </div>

        {/* 滑块手柄 */}
        <div
          className="absolute top-0 bottom-0 z-10 flex cursor-ew-resize items-center"
          style={{ left: `calc(${sliderPos}% - 16px)` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
        >
          <div className="flex h-16 w-8 items-center justify-center rounded-full bg-[#FF9F0A] shadow-lg shadow-[#FF9F0A]/50">
            <div className="flex flex-col items-center gap-1">
              <span className="block h-1 w-1 rounded-full bg-[#050B14]" />
              <span className="block h-1 w-1 rounded-full bg-[#050B14]" />
              <span className="block h-1 w-1 rounded-full bg-[#050B14]" />
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="absolute bottom-4 left-4 text-lg font-bold text-gray-300">
          ⬅ 传统特征
        </div>
        <div className="absolute bottom-4 right-4 text-lg font-bold text-[#FF9F0A]">
          深度分割 ➡
        </div>
      </div>
    </div>
  );
}

/* =========================
   四大任务卡片
   ========================= */
const TASK_CARDS = [
  {
    title: "图像分类",
    icon: "🏷️",
    desc: "从 AlexNet 到 ViT，从手工特征到端到端深度特征自适应学习",
    models: "AlexNet → VGGNet → GoogLeNet → ResNet → ViT",
  },
  {
    title: "目标检测",
    icon: "🎯",
    desc: "从滑动窗口到区域建议，再到 YOLO 单阶段实时检测",
    models: "Faster R-CNN → YOLO → SSD → Mask R-CNN",
  },
  {
    title: "图像分割",
    icon: "✂️",
    desc: "从全卷积网络到 U-Net，再到零样本通用分割大模型 SAM",
    models: "FCN → U-Net → DeepLab → SAM",
  },
  {
    title: "图像生成",
    icon: "✨",
    desc: "从 GAN 博弈对抗到扩散模型，AIGC 底层基石",
    models: "GAN → StyleGAN → Diffusion → Stable Diffusion",
  },
];

export default function MethodsPage() {
  return (
    <div className="page-container w-full bg-[#050B14] py-20">
      <div className="w-full">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            技术核心与方法综述
          </h1>
          <p className="mt-4 text-xl text-gray-400 lg:text-2xl">
            覆盖图像分类、目标检测、图像分割、图像生成四大核心任务的技术演进脉络
          </p>
        </motion.div>

        {/* 四大任务卡片 */}
        <div className="mb-24 grid gap-6 md:grid-cols-2">
          {TASK_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group rounded-2xl border-2 border-[#1E3A5F] bg-[#0D1B2A] p-8 transition-all duration-300 hover:border-[#FF9F0A] hover:shadow-xl hover:shadow-[#FF9F0A]/10"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="text-4xl">{card.icon}</span>
                <h2 className="text-3xl font-bold text-white">{card.title}</h2>
              </div>
              <p className="mb-6 text-xl leading-relaxed text-gray-300">
                {card.desc}
              </p>
              <div className="rounded-xl border border-[#1E3A5F] bg-[#050B14] p-4">
                <p className="text-sm text-gray-500">技术演进路线</p>
                <p className="mt-1 text-lg font-semibold text-[#FF9F0A]">
                  {card.models}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 滑动对比组件 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <CompareSlider />
        </motion.div>

        {/* 底部导航 */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-500">
            详细技术节点请浏览首页的
            <span className="text-[#FF9F0A]"> 技术演进时间轴</span>
          </p>
        </div>
      </div>
    </div>
  );
}
