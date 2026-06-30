"use client";

import { motion } from "framer-motion";
import { DATASETS, IMAGENET_ACCURACY } from "@/data/paperData";

/* =========================
   柱状图组件 - ImageNet 准确率演进
   ========================= */
function AccuracyBarChart() {
  const maxValue = 100;

  return (
    <div className="rounded-2xl border-2 border-[#1E3A5F] bg-[#0D1B2A] p-8 md:p-12">
      <h3 className="mb-2 text-3xl font-bold text-white">
        ImageNet Top-1 准确率演进
      </h3>
      <p className="mb-10 text-xl text-gray-400">
        从 AlexNet (56.5%) 到 CoCa (91.0%) 的技术飞跃
      </p>

      <div className="flex w-full items-end gap-2 md:gap-4">
        {IMAGENET_ACCURACY.map((record, i) => (
          <div key={record.model} className="flex min-w-0 flex-1 flex-col items-center gap-2 md:gap-3">
            {/* 数值标签 */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="text-base font-extrabold text-[#FF9F0A] md:text-xl lg:text-2xl"
            >
              {record.accuracy}
            </motion.span>

            {/* 柱体 */}
            <div className="relative flex h-48 w-full items-end sm:h-56 md:h-64">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(record.value / maxValue) * 100}%` }}
                transition={{ delay: 0.2 + i * 0.15, duration: 1, ease: "easeOut" }}
                className="w-full rounded-t-lg"
                style={{
                  backgroundColor:
                    i === IMAGENET_ACCURACY.length - 1
                      ? "#FF9F0A"
                      : `rgba(255, 159, 10, ${0.5 + i * 0.08})`,
                  boxShadow:
                    i === IMAGENET_ACCURACY.length - 1
                      ? "0 0 20px rgba(255, 159, 10, 0.5)"
                      : "none",
                }}
              />
            </div>

            {/* 模型名 + 年份 */}
            <div className="text-center">
              <p className="text-xs font-bold text-white sm:text-sm md:text-lg">
                {record.model}
              </p>
              <p className="text-xs text-gray-500 md:text-sm">{record.year}</p>
            </div>

            {/* 标注 */}
            <p className="w-full text-center text-[10px] text-gray-400 md:text-xs">
              {record.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   数据集表格
   ========================= */
function DatasetTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-[#1E3A5F] bg-[#0D1B2A]">
      <table className="w-full border-collapse text-left text-lg">
        <thead>
          <tr className="border-b-2 border-[#1E3A5F] bg-[#050B14]">
            <th className="px-6 py-5 text-xl font-bold text-[#FF9F0A]">数据集名称</th>
            <th className="px-6 py-5 text-xl font-bold text-[#FF9F0A]">核心任务</th>
            <th className="px-6 py-5 text-xl font-bold text-[#FF9F0A]">数据规模</th>
            <th className="px-6 py-5 text-xl font-bold text-[#FF9F0A]">应用场景</th>
            <th className="px-6 py-5 text-xl font-bold text-[#FF9F0A]">历史贡献</th>
          </tr>
        </thead>
        <tbody>
          {DATASETS.map((ds, i) => (
            <motion.tr
              key={ds.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-[#1E3A5F] transition-colors hover:bg-[#1E3A5F]/40 ${
                i % 2 === 0 ? "bg-transparent" : "bg-[#050B14]/50"
              }`}
            >
              <td className="px-6 py-5 text-xl font-bold text-white">
                {ds.name}
              </td>
              <td className="px-6 py-5 text-lg text-gray-200">{ds.task}</td>
              <td className="px-6 py-5 text-lg text-gray-200">{ds.scale}</td>
              <td className="px-6 py-5 text-lg text-gray-200">
                {ds.application}
              </td>
              <td className="px-6 py-5 text-lg font-semibold text-[#FF9F0A]">
                {ds.contribution}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DatasetsPage() {
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
            评测实验室
          </h1>
          <p className="mt-4 text-xl text-gray-400 lg:text-2xl">
            主流图像处理基准数据集与性能指标横向评测
          </p>
        </motion.div>

        {/* 柱状图 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <AccuracyBarChart />
        </motion.div>

        {/* 数据集表格 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-8 text-3xl font-bold text-white">
            主流基准数据集横向对比
          </h2>
          <DatasetTable />
        </motion.div>

        {/* 底部 */}
        <div className="mt-12 text-center text-lg text-gray-500">
          数据来源：《图形图像处理技术研究综述——基于深度学习的图像处理与方法综述》
        </div>
      </div>
    </div>
  );
}
