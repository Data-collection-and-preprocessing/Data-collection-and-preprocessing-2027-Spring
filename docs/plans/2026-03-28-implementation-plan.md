# 《数据采集与预处理》教材编写 — 实施计划

日期：2026-03-28
工作目录：E:\Github\Data-collection-and-preprocessing-2027-Spring

## 批次一：结构调整（P0）

### Task 1.1 — 更新 _quarto.yml
- 按新大纲重组章节结构（6 个单元）
- 删除重复的第四部分（0401, 0402）
- 添加新章节占位

### Task 1.2 — 清理重复文件
- 删除 0401-data-cleaning-pandas.qmd（与 0301 重复）
- 删除 0402-feature-engineering.qmd（与 0302 重复）
- 重命名 0301-data-cleaning-pandas.qmd → 0301-data-cleaning.qmd

### Task 1.3 — 创建新章节骨架文件
- 创建 11 个新 .qmd 文件，每个包含标题和章节大纲占位
- 确保 quarto render 不报错

## 批次二：编程基础章节（P1）— 学生最需要

### Task 2.1 — 0104-environment-setup.qmd
- R/RStudio 安装（Windows/Mac）
- Git 安装与配置
- GitHub 账号注册
- Quarto 安装
- 截图 + 步骤说明

### Task 2.2 — 0105-r-basics.qmd
- R 数据类型（向量、列表、数据框、因子）
- 读取数据（read_csv, read_excel）
- 基本统计（mean, sd, summary, table）
- 生态学数据集实践案例
- 课后练习

### Task 2.3 — 0106-r-data-wrangling.qmd
- tidyverse 安装与加载
- dplyr 五大动词
- tidyr 数据重塑
- 管道操作符
- 实践：物种调查数据整理
- 课后练习

### Task 2.4 — 0107-git-collaboration.qmd
- Git 基本概念（仓库、提交、分支）
- 常用命令（init, add, commit, push, pull）
- GitHub 协作（fork, PR, issue）
- RStudio 中使用 Git
- 实践：分组创建项目仓库

## 批次三：数据预处理章节（P2）

### Task 3.1 — 0301-data-cleaning.qmd（重写）
- 缺失值：识别、可视化、处理策略
- 异常值：箱线图检测、IQR 方法
- 数据类型转换
- 字符串处理（stringr）
- R 代码示例 + 生态学数据案例

### Task 3.2 — 0302-feature-engineering.qmd（重写）
- 标准化与归一化
- 对数变换、Box-Cox 变换
- 分类变量编码
- 数据合并（left_join, bind_rows）
- 数据重塑（pivot_longer, pivot_wider）

### Task 3.3 — 0303-data-quality.qmd（新增）
- 数据验证与一致性检查
- 元数据编写规范
- 数据存储格式选择
- README 和 codebook 编写

## 批次四：可视化与 EDA（P3）

### Task 4.1 — 0501-visualization-basics.qmd
- ggplot2 语法体系（aes, geom, scale, theme）
- 常用图表：散点图、箱线图、直方图、热力图
- 科研论文级图表（主题、字体、配色、导出）
- 实践：复现一篇论文的图表

### Task 4.2 — 0502-eda.qmd
- 描述性统计
- 相关性分析（cor, corrplot）
- 分布检验（Shapiro-Wilk）
- 完整 EDA 案例：物种多样性数据

## 批次五：实战与补充（P4-P5）

### Task 5.1 — 0601-case-study.qmd
- 完整案例：从原始数据到可视化报告
- 生态学场景（植物多样性与土壤性质）

### Task 5.2 — 0207-meta-analysis-intro.qmd
- 荟萃分析概念与流程
- 文献数据提取方法
- R 包 metafor 简介

### Task 5.3 — 补充已有章节代码示例
- 0202-observation.qmd：加 R 数据记录示例
- 0204-modeling.qmd：加简单模型代码
- 0205-public-data.qmd：加 API/数据下载代码

### Task 5.4 — 0602-project-workshop.qmd + 0603-summary.qmd
- 项目工作坊指导
- 课程总结

## 执行策略

- 每次完成一个 Task，commit + push
- 每个 Task 完成后汇报进度
- 长期任务，按批次逐步推进
- 今天先完成批次一（结构调整），有时间继续批次二
