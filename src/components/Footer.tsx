import { Code2, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1E3A5F] bg-[#050B14]">
      <div className="page-container py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* 版权信息 */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF9F0A] text-sm font-black text-[#050B14]">
              CV
              </div>
              <span className="text-xl font-bold text-white">
                CV 图像处理技术综述
              </span>
            </div>
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} 图形图像处理技术研究综述课题组
            </p>
          </div>

          {/* 导航快捷 */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-gray-300">
            <a href="/" className="transition-colors hover:text-[#FF9F0A]">
              首页
            </a>
            <a href="/methods" className="transition-colors hover:text-[#FF9F0A]">
              技术核心
            </a>
            <a href="/datasets" className="transition-colors hover:text-[#FF9F0A]">
              评测实验室
            </a>
            <a href="/about" className="transition-colors hover:text-[#FF9F0A]">
              应用与团队
            </a>
          </div>

          {/* 图标 */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#1E3A5F] text-gray-400 transition-all hover:border-[#FF9F0A] hover:text-[#FF9F0A]"
              aria-label="论文链接"
            >
              <BookOpen size={24} />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#1E3A5F] text-gray-400 transition-all hover:border-[#FF9F0A] hover:text-[#FF9F0A]"
              aria-label="GitHub 仓库"
            >
              <Code2 size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1E3A5F]/50 pt-6 text-center text-base text-gray-500">
          基于深度学习的图像处理与方法综述 &middot; 高校公开答辩演示网站
        </div>
      </div>
    </footer>
  );
}
