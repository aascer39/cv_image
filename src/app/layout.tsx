import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "图形图像处理技术研究综述——基于深度学习的图像处理与方法综述",
  description:
    "高校公开答辩专题知识网站。涵盖传统手工特征(SIFT/HOG/LBP)、深度CNN(AlexNet/ResNet)、Transformer(ViT/SAM)及AIGC图像处理技术综述。",
  keywords: [
    "图像处理",
    "深度学习",
    "卷积神经网络",
    "图像分类",
    "目标检测",
    "图像分割",
    "生成对抗网络",
    "Transformer",
    "计算机视觉综述",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
