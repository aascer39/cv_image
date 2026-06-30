"use client";

import { motion } from "framer-motion";
import { APPLICATIONS, TEAM_MEMBERS } from "@/data/paperData";

/* =========================
   应用场景卡片
   ========================= */
function AppCard({
  app,
  index,
}: {
  app: (typeof APPLICATIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border-2 border-[#1E3A5F] bg-[#0D1B2A] p-8 transition-all duration-500 hover:border-[#FF9F0A] hover:shadow-xl hover:shadow-[#FF9F0A]/10"
    >
      {/* 毛玻璃背景装饰 */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF9F0A]/5 blur-3xl transition-all duration-500 group-hover:bg-[#FF9F0A]/20" />

      <div className="relative z-10">
        <h3 className="mb-4 text-3xl font-bold text-white transition-colors group-hover:text-[#FF9F0A]">
          {app.title}
        </h3>
        <p className="mb-6 text-xl leading-relaxed text-gray-300">
          {app.description}
        </p>
        <div className="inline-block rounded-lg border border-[#FF9F0A]/30 bg-[#FF9F0A]/10 px-4 py-2 text-lg font-semibold text-[#FF9F0A]">
          🛠 {app.tech}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   团队卡片（统一风格）
   ========================= */
function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM_MEMBERS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border-2 border-[#1E3A5F] bg-[#0D1B2A] p-6 transition-all duration-300 hover:border-[#FF9F0A]/50"
    >
      <div className="relative z-10">
        {/* 头像框 */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1E3A5F] text-3xl font-black text-white">
          {member.name.charAt(0)}
        </div>

        {/* 姓名 + 学号 */}
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-white">{member.name}</h3>
          <p className="text-base text-gray-500">{member.studentId}</p>
        </div>

        {/* 贡献描述 */}
        <p className="text-lg leading-relaxed text-gray-300">
          {member.contribution}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
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
            落地应用与研发团队
          </h1>
          <p className="mt-4 text-xl text-gray-400 lg:text-2xl">
            五大典型应用场景 × 八人核心研发团队
          </p>
        </motion.div>

        {/* 五大应用场景 */}
        <section className="mb-24">
          <h2 className="mb-10 text-3xl font-bold text-white">
            🏭 典型应用场景
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((app, i) => (
              <AppCard key={app.title} app={app} index={i} />
            ))}
          </div>
        </section>

        {/* 团队展示墙 */}
        <section>
          <h2 className="mb-4 text-3xl font-bold text-white">👥 研发团队</h2>
          <p className="mb-10 text-xl text-gray-400">
            《图形图像处理技术研究综述》课题组 · 八人分工协作
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* 底部 */}
        <div className="mt-16 text-center text-lg text-gray-500">
          论文题目：图形图像处理技术研究综述——基于深度学习的图像处理与方法综述
        </div>
      </div>
    </div>
  );
}
