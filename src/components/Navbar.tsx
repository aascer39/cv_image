"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image, Database, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "首页", icon: Image },
  { href: "/methods", label: "技术核心", icon: Image },
  { href: "/datasets", label: "评测实验室", icon: Database },
  { href: "/about", label: "应用与团队", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#1E3A5F] bg-[#050B14]">
      <div className="page-container flex h-20 items-center justify-between">
        {/* 品牌 Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF9F0A] text-lg font-black text-[#050B14] sm:h-12 sm:w-12 sm:text-xl">
            CV
          </div>
          <span className="hidden text-lg font-bold tracking-tight text-white sm:block md:text-xl">
            CV 图像处理综合<span className="ml-1 text-[#FF9F0A]">综述</span>
          </span>
        </Link>

        {/* 桌面导航 */}
        <ul className="hidden items-center md:flex md:flex-nowrap md:gap-0 lg:gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-base font-semibold transition-colors duration-200 lg:gap-2 lg:px-4 lg:py-3 lg:text-lg",
                    isActive
                      ? "border border-[#FF9F0A]/40 bg-[#FF9F0A]/10 text-[#FF9F0A]"
                      : "text-gray-300 hover:bg-[#1E3A5F]/50 hover:text-white"
                  )}
                >
                  <Icon size={18} className="lg:h-5 lg:w-5" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-[#1E3A5F] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="切换导航菜单"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 移动端展开菜单 - 用 display 切换避免动画引起的布局抖动 */}
      <div
        className={clsx(
          "border-t border-[#1E3A5F] bg-[#0D1B2A] px-4 pb-6 pt-4 md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors",
                    isActive
                      ? "bg-[#FF9F0A]/10 text-[#FF9F0A]"
                      : "text-gray-300 hover:bg-[#1E3A5F] hover:text-white"
                  )}
                >
                  <Icon size={22} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
