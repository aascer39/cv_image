/* ============================================================
   paperData.ts — 图像处理技术综述 全量结构化数据
   数据来源：P_DATA.md（唯一事实来源，禁止虚构）
   ============================================================ */

/* ---------- 元数据 ---------- */
export const PAPER_META = {
  title: "图形图像处理技术研究综述——基于深度学习的图像处理与方法综述",
  keywords: [
    "图形图像处理",
    "深度学习",
    "卷积神经网络",
    "图像分类",
    "目标检测",
    "图像分割",
    "生成对抗网络",
  ] as string[],
  coreThesis: `图形图像处理从\u201c手工设计局部特征+传统机器学习分类器\u201d走向\u201c基于深度网络的端到端特征自适应学习\u201d，再进一步向\u201c大规模自注意力预训练模型（Transformer/大模型）\u201d演进。展现出高泛化性、高密集度的特点。`,
} as const;

/* ---------- 1. 技术演进脉络 ---------- */
export interface TechNode {
  name: string;
  year: number;
  period: string;
  details: string;
  advantage: string;
  application: string;
}

export interface TechEra {
  id: string;
  era: string;
  period: string;
  summary: string;
  nodes: TechNode[];
  color: string;
}

export const TECH_ERAS: TechEra[] = [
  {
    id: "classical",
    era: "传统手工特征与经典模式识别时代",
    period: "1999 \u2014 2011",
    summary: `本阶段的核心逻辑是\u201c人工根据先验知识设计特征算子\u201d + \u201c传统分类器进行浅层模式识别\u201d。`,
    color: "#FF9F0A",
    nodes: [
      {
        name: "SIFT",
        year: 1999,
        period: "传统手工特征",
        details:
          "尺度不变特征变换。通过在多尺度高斯差分空间（DoG）中检测极值点，并利用局部梯度方向直方图确立主方向。",
        advantage:
          "对图像的旋转、尺度缩放、亮度变化保持极强的鲁棒性，对视角变化、仿射变换和噪声也具备一定稳定性。",
        application: "早期图像拼接、物体识别、三维重建。",
      },
      {
        name: "LBP",
        year: 2002,
        period: "传统手工特征",
        details:
          "局部二值模式。一种用来纹理描述的算子。将中心像素与其 3x3 邻域的灰度值进行阈值比较，大于等于为 1，小于为 0，从而产生 8 位二进制数表征局部纹理。",
        advantage: "计算极其简单、具备极佳的旋转不变性和灰度不变性。",
        application: "人脸识别、表面纹理缺陷检测。",
      },
      {
        name: "HOG",
        year: 2005,
        period: "传统手工特征",
        details:
          "方向梯度直方图。通过计算和统计图像局部区域的梯度方向直方图来构成特征。",
        advantage:
          "由于在局部细胞单元（Cells）和块（Blocks）上进行了梯度归一化，因此对光照变化和阴影具备很强的容忍度，能够完美表征物体的边缘和形状轮廓。",
        application: "静态图像和视频中的行人检测（经典组合：HOG + SVM）。",
      },
    ],
  },
  {
    id: "cnn",
    era: "深度卷积神经网络（CNN）夺冠与统治时代",
    period: "2012 \u2014 2019",
    summary: `本阶段的核心逻辑是\u201c端到端深度特征自适应学习\u201d，特征提取由网络在训练中自行优化。`,
    color: "#FF9F0A",
    nodes: [
      {
        name: "AlexNet",
        year: 2012,
        period: "深度CNN",
        details:
          "夺得 2012 年 ImageNet 挑战赛冠军，拉开深度学习统治计算机视觉的序幕。",
        advantage:
          "首次采用 GPU 进行大规模并行加速计算；引入 ReLU 激活函数解决深层网络中的梯度饱和问题；使用 Dropout 抑制过拟合；引入数据增强技术。",
        application: "ImageNet 大规模图像分类",
      },
      {
        name: "VGGNet",
        year: 2014,
        period: "深度CNN",
        details: `系统研究了\u201c网络深度\u201d对模型性能的影响。废弃了早期的大型卷积核，全站通过堆叠 3x3 的小卷积核和 2x2 的最大池化层（Max Pooling）来构建 16-19 层的深层网络。`,
        advantage:
          "证明了多个小卷积核叠加具有与大卷积核相同的感受野，且能引入更多非线性表达、减少参数量。",
        application: "通用的图像特征提取骨干网络",
      },
      {
        name: "GoogLeNet",
        year: 2014,
        period: "深度CNN",
        details: `提出 Inception 模块，在\u201c网络宽度\u201d上进行横向扩张。在同一层并行执行 1x1, 3x3, 5x5 卷积以及 3x3 最大池化，最后将特征图拼接。`,
        advantage:
          "大幅提升了对多尺度特征的自适应感知能力，并利用 1x1 卷积实现了完美的降维与参数压缩。",
        application: "多尺度图像特征提取",
      },
      {
        name: "ResNet",
        year: 2015,
        period: "深度CNN",
        details:
          "何恺明提出的残差连接（Skip Connection / Shortcut）彻底改写了深度学习历史。",
        advantage:
          "解决网络退化问题：网络层数过深时（如超过50层）训练集和测试集准确率同时下降。残差连接让前一层的信息可以跨层直接流动，使得网络可以平滑拓展至 152 层甚至上千层。",
        application: "超深层网络骨干、图像分类/检测/分割通用基础架构",
      },
    ],
  },
  {
    id: "detection",
    era: "目标检测与图像分割的双轨跃进",
    period: "2014 \u2014 2020",
    summary: "将分类能力拓展到密集像素、空间边界的精细感知。",
    color: "#FF9F0A",
    nodes: [
      {
        name: "Faster R-CNN",
        year: 2015,
        period: "目标检测两阶段",
        details:
          "引入了区域生成网络（RPN），将候选框提取、特征提取、分类与边界框回归完全集成到一个端到端的深层网络中。",
        advantage: "大幅提升了检测速度和精度。",
        application: "高精度目标检测标准框架",
      },
      {
        name: "YOLO 系列",
        year: 2016,
        period: "目标检测单阶段",
        details:
          "You Only Look Once：将检测问题直接视作一个单一的端到端回归问题，直接在输出层输出边界框坐标与类别概率。",
        advantage: "具备工业级、极高帧率的实时检测能力。",
        application: "实时视频目标检测、边缘端部署",
      },
      {
        name: "SSD",
        year: 2016,
        period: "目标检测单阶段",
        details:
          "Single Shot MultiBox Detector：利用多个不同尺度的特征图分别进行检测。",
        advantage: "有效改善了单阶段算法对小目标检测能力不足的弊端。",
        application: "多尺度目标实时检测",
      },
      {
        name: "Mask R-CNN",
        year: 2017,
        period: "实例分割",
        details:
          "在 Faster R-CNN 基础上增加了一个平行的 ROI Align 和像素级掩码（Mask）生成分支。",
        advantage: "实现了完美的目标检测与实例分割统一。",
        application: "实例分割、精细化目标边界提取",
      },
      {
        name: "FCN",
        year: 2015,
        period: "图像分割",
        details:
          "Fully Convolutional Networks：全卷积网络，首次将传统 CNN 的全连接层替换为全卷积层，配合上采样/反卷积。",
        advantage: "率先实现像素级、端到端的目标分割。",
        application: "语义分割基础架构",
      },
      {
        name: "U-Net",
        year: 2015,
        period: "图像分割",
        details:
          "专为医学影像设计的完美对称 U 型架构。通过左侧编码器（下采样）提取语义上下文，右侧解码器（上采样）恢复空间分辨率，中间通过跳跃连接（Skip Connection）进行特征拼接。",
        advantage: "完美保留了医学图像中极其宝贵的边缘边界信息。",
        application: "医学影像分割（CT/核磁共振病灶提取）",
      },
      {
        name: "DeepLab",
        year: 2017,
        period: "图像分割",
        details:
          "引入空洞卷积（Atrous Convolution）在不增加参数量的前提下成倍扩大感受野，并配合空间金字塔池化（ASPP）捕捉多尺度上下文。",
        advantage: "多尺度上下文感知的高精度语义分割。",
        application: "街景解析、自动驾驶场景分割",
      },
    ],
  },
  {
    id: "transformer",
    era: "Transformer 大模型与 AIGC 时代",
    period: "2020 \u2014 2026 当前",
    summary:
      "打破局部感受野限制，走向全局自注意力感知与开放域大模型泛化。",
    color: "#FF9F0A",
    nodes: [
      {
        name: "ViT",
        year: 2020,
        period: "Transformer视觉",
        details:
          "Vision Transformer：证明了标准的 Transformer 架构也可以直接应用到计算机视觉任务中。它将一幅图像切分成一系列固定的 Patch（如 16x16 像素块），线性投影后加上位置编码（Position Embedding），直接投入经典的 Self-Attention 机制。",
        advantage: "在大规模数据集预训练下，彻底超越了 CNN 的性能上限。",
        application: "大规模图像分类、视觉预训练基础模型",
      },
      {
        name: "Swin Transformer",
        year: 2021,
        period: "Transformer视觉",
        details:
          "提出基于移动窗口（Shifted Windows）的局部自注意力机制。",
        advantage:
          "将计算复杂度从图像大小的平方阶降低到了线性阶，兼顾了全局感知力与高效的计算开销。",
        application: "高效视觉主干网络、密集预测任务",
      },
      {
        name: "SAM",
        year: 2023,
        period: "视觉大模型",
        details: `Segment Anything Model：计算机视觉领域的\u201cChatGPT 时刻\u201d，Meta 发布的视觉分割大模型。基于 11 亿张掩码的庞大数据集预训练。`,
        advantage:
          "支持通过点（Points）、框（Boxes）、文本（Texts）等多种交互式提示进行零样本（Zero-shot）通用目标分割。",
        application: "零样本通用分割、交互式图像编辑",
      },
      {
        name: "GAN",
        year: 2014,
        period: "生成式模型",
        details:
          "Generative Adversarial Networks：通过生成器与判别器的博弈对抗提升图像保真度。",
        advantage: "能够生成高逼真度的合成图像。",
        application: "图像生成、超分辨率、风格迁移",
      },
      {
        name: "Diffusion Models",
        year: 2020,
        period: "生成式模型",
        details:
          "扩散模型 / Stable Diffusion：通过前向加噪与反向去噪过程建模。",
        advantage: "成为当前 AIGC 图像生成的绝对底层基石。",
        application: "AIGC 图像生成、文本到图像生成",
      },
    ],
  },
];

/* ---------- 2. 表1：数据集 ---------- */
export interface Dataset {
  name: string;
  task: string;
  scale: string;
  application: string;
  contribution: string;
}

export const DATASETS: Dataset[] = [
  {
    name: "ImageNet",
    task: "图像分类 / 识别",
    scale: "1400万张图片 / 2万种物体分类",
    application: "通用基础主干网络预训练",
    contribution: "促成了 2012 深度学习的爆发",
  },
  {
    name: "COCO",
    task: "目标检测 / 实例分割",
    scale: "33万张图片 / 80个核心类别",
    application: "复杂场景多目标定位与分割",
    contribution: "算法定位精度评测的绝对首选标准",
  },
  {
    name: "PASCAL VOC",
    task: "目标检测 / 语义分割",
    scale: "1.1万张图片 / 20个经典类别",
    application: "早期轻量级算法验证与对比",
    contribution: "见证了从传统算法向深度学习的过渡",
  },
  {
    name: "ADE20K",
    task: "复杂场景语义分割",
    scale: "2.5万张图片 / 150个精细类别",
    application: "密集室内外场景解析（Scene Parsing）",
    contribution: "语义分割模型评测的高难度标杆",
  },
  {
    name: "Cityscapes",
    task: "自动驾驶城市语义分割",
    scale: "5000张高分辨率精细标注帧",
    application: "自动驾驶、车载视觉与高精地图",
    contribution: "聚焦于城市街道、真实驾驶环境的解析",
  },
  {
    name: "CIFAR-10/100",
    task: "小分辨率图像分类",
    scale: "6万张 32x32 低分辨率图片",
    application: "快速原型验证、算法初步跑通",
    contribution: "极其轻量化，适合算力有限的学术评测",
  },
];

/* ---------- 2B. ImageNet 准确率演进柱状图素材 ---------- */
export interface AccuracyRecord {
  year: number;
  model: string;
  accuracy: string;
  value: number;
  note: string;
}

export const IMAGENET_ACCURACY: AccuracyRecord[] = [
  { year: 2012, model: "AlexNet", accuracy: "56.5%", value: 56.5, note: "深度学习开端" },
  { year: 2014, model: "VGGNet", accuracy: "74.4%", value: 74.4, note: "证明深度重要性" },
  { year: 2015, model: "ResNet-152", accuracy: "78.3%", value: 78.3, note: "攻克网络退化" },
  { year: 2019, model: "EfficientNet-B7", accuracy: "84.3%", value: 84.3, note: "网络混合缩放" },
  { year: 2021, model: "EfficientNet-L2", accuracy: "88.5%", value: 88.5, note: "超大参数优化" },
  { year: 2022, model: "CoCa", accuracy: "91.0%", value: 91.0, note: "多模态预训练巅峰" },
];

/* ---------- 3. 落地应用场景 ---------- */
export interface Application {
  title: string;
  tech: string;
  description: string;
}

export const APPLICATIONS: Application[] = [
  {
    title: "智慧安防",
    tech: "YOLOv8/v10 实时检测",
    description:
      "人脸识别定位、人流密度监控、异常行为实时检测",
  },
  {
    title: "自动驾驶",
    tech: "Transformer + 语义分割",
    description:
      "车载摄像头环视感知、多视角车道线检测、BEV（鸟瞰图）时空融合感知",
  },
  {
    title: "医学影像分析",
    tech: "改进版 3D U-Net",
    description:
      "CT/核磁共振图像的病灶区全自动精准提取、皮肤癌结节像素级分割",
  },
  {
    title: "遥感测绘",
    tech: "遥感专有场景语义分割",
    description:
      "高分辨率卫星遥感图像的地物分类、建筑物群和植被覆盖率自动测算",
  },
  {
    title: "工业缺陷检测",
    tech: "异常检测 + 超分辨率 SwinIR",
    description:
      "流水线产品表面微小划痕、裂纹、杂质的工业级极高速机器视觉无损检测",
  },
];

/* ---------- 4. 表2：组员分工 ---------- */
export interface TeamMember {
  id: number;
  name: string;
  studentId: string;
  contribution: string;
  isLead: boolean; // 郑玖军特殊标记
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "陈星亮",
    studentId: "2024001",
    contribution: "论文总体设计与统稿、引言与第1-2节传统算法撰写、参考文献规范化整理。",
    isLead: false,
  },
  {
    id: 2,
    name: "魏泊帆",
    studentId: "2024002",
    contribution: "第2.1-2.2节撰写（核心深度学习分类网络）、核心演进图表绘制与数据整理。",
    isLead: false,
  },
  {
    id: 3,
    name: "蒋韩俊",
    studentId: "2024003",
    contribution: "第2.3-2.4节撰写（目标检测与分割流派）、前沿文献调研与资料检索。",
    isLead: false,
  },
  {
    id: 4,
    name: "罗浩东",
    studentId: "2024004",
    contribution: "第3节数据集章节撰写、各大基准数据集横向对比表格与历史指标制作。",
    isLead: false,
  },
  {
    id: 5,
    name: "马君好",
    studentId: "2024005",
    contribution: "第4.1-4.3节典型应用场景分析章节撰写（智能安防、自动驾驶、医学影像）。",
    isLead: false,
  },
  {
    id: 6,
    name: "吕恒睿",
    studentId: "2024006",
    contribution: "第4.4-4.5节特定应用场景撰写（遥感测绘、工业表面缺陷检测与自动化线）。",
    isLead: false,
  },
  {
    id: 7,
    name: "郑玖军",
    studentId: "2024007",
    contribution: "第5节未来研究方向与总结展望撰写、全篇论文深度校对与团队核心开发统筹。",
    isLead: true,
  },
  {
    id: 8,
    name: "蒋松",
    studentId: "2024008",
    contribution: "组员贡献表制作、论文字体精密排版、国家标准规范格式修订与最终提交。",
    isLead: false,
  },
];
