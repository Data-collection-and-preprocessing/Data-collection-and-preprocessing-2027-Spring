$ErrorActionPreference = 'Stop'
$base = "E:\Github\Data-collection-and-preprocessing-2027-Spring\slides"

function New-Lecture {
    param(
        [string]$Filename,
        [string]$Title,
        [string]$ChapterNum,
        [string]$ChapterTitle,
        [string]$KeyPoint1,
        [string]$KeyPoint2,
        [string]$KeyPoint3,
        [string]$KeyPoint4,
        [string]$Section1,
        [string]$Section2,
        [string]$Section3,
        [string]$Section4,
        [string]$Definition1,
        [string]$Definition2,
        [string]$Definition3,
        [string]$Tool1Cat, [string]$Tool1Name, [string]$Tool1Use,
        [string]$Tool2Cat, [string]$Tool2Name, [string]$Tool2Use,
        [string]$Tool3Cat, [string]$Tool3Name, [string]$Tool3Use,
        [string]$Tool4Cat, [string]$Tool4Name, [string]$Tool4Use,
        [string]$CodeExample,
        [string]$CodeSnippet,
        [string]$Practice1,
        [string]$Practice2,
        [string]$Practice3,
        [string]$Faq1, [string]$Faq1A,
        [string]$Faq2, [string]$Faq2A,
        [string]$Sum1, [string]$Sum2, [string]$Sum3,
        [string]$Task1, [string]$Task2, [string]$OptTask,
        [string]$Ref1, [string]$Ref2
    )

$content = @"
---
title: "$Title"
author: "Huaqing Liu"
format:
  revealjs: 
    theme: white
    slide-number: true
    chalkboard: 
      buttons: false
    preview-links: auto
    css: slide.css
    footer: '[课程仓库](https://github.com/Data-collection-and-preprocessing/Data-collection-and-preprocessing-2027-Spring)'
  pptx:
    reference-doc: ../template.pptx
bibliography: 
    - ../references.bib
    - ../packages.bib
---

# $ChapterTitle

[教材章节：$ChapterNum]()

------------------------------------------------------------------------

## 本章学习目标

- 理解 $KeyPoint1
- 掌握 $KeyPoint2
- 了解 $KeyPoint3
- 能够应用 $KeyPoint4

------------------------------------------------------------------------

## 内容概览

1. **第一节**：$Section1
2. **第二节**：$Section2
3. **第三节**：$Section3
4. **第四节**：$Section4

------------------------------------------------------------------------

## 核心概念

- **概念一**：$Definition1
- **概念二**：$Definition2
- **概念三**：$Definition3

::: callout-note
这些核心概念是理解本章内容的基础，请确保掌握。
:::

------------------------------------------------------------------------

## 常用工具与方法

| 类别 | 工具/方法 | 用途 |
|:---|:---|:---|
| $Tool1Cat | $Tool1Name | $Tool1Use |
| $Tool2Cat | $Tool2Name | $Tool2Use |
| $Tool3Cat | $Tool3Name | $Tool3Use |
| $Tool4Cat | $Tool4Name | $Tool4Use |

------------------------------------------------------------------------

## 代码示例

\`\`\`r
#| eval: false
# $CodeExample
$CodeSnippet
\`\`\`

------------------------------------------------------------------------

## 实践要点

- **要点一**：$Practice1
- **要点二**：$Practice2
- **要点三**：$Practice3

::: callout-tip
动手实践是学习本课程的关键，请在电脑前跟随课程一起操作。
:::

------------------------------------------------------------------------

## 常见问题与解答

**Q1**：$Faq1

**A1**：$Faq1A

**Q2**：$Faq2

**A2**：$Faq2A

------------------------------------------------------------------------

## 本章小结

1. $Sum1
2. $Sum2
3. $Sum3

------------------------------------------------------------------------

## 课后任务

- $Task1
- $Task2
- **选做**：$OptTask

------------------------------------------------------------------------

## 延伸阅读

- $Ref1
- $Ref2

"@

    [System.IO.File]::WriteAllText("$base\$Filename", $content, [System.Text.Encoding]::UTF8)
    Write-Host "Created $Filename" -ForegroundColor Green
}

# ============================================================
# 0101 什么是数据采集
# ============================================================
New-Lecture -Filename "lecture-0101.qmd" `
    -Title "什么是数据采集" `
    -ChapterNum "0101" `
    -ChapterTitle "0101 什么是数据采集" `
    -KeyPoint1 "数据采集的定义与科学意义" `
    -KeyPoint2 "四大数据来源及其特点" `
    -KeyPoint3 "采样设计的基本原则" `
    -KeyPoint4 "根据研究问题选择合适的采集方法" `
    -Section1 "数据采集的概念与重要性" `
    -Section2 "四大数据来源：观测、实验、模型、公共数据" `
    -Section3 "采样设计原则" `
    -Section4 "数据采集与可重复性" `
    -Definition1 "数据采集：通过系统化方法获取研究所需信息的过程，是科学研究的起点" `
    -Definition2 "观测数据：在自然条件下直接观察和记录，研究者不施加干预" `
    -Definition3 "实验数据：在受控条件下操纵变量并测量响应，可验证因果关系" `
    -Tool1Cat "采样" -Tool1Name "随机抽样" -Tool1Use "确保样本代表性" `
    -Tool2Cat "采样" -Tool2Name "系统抽样" -Tool2Use "沿环境梯度布设采样点" `
    -Tool3Cat "记录" -Tool3Name "元数据标准" -Tool3Use "记录采集时间、地点、方法" `
    -Tool4Cat "质量" -Tool4Name "质量控制检查" -Tool4Use "确保数据可靠性" `
    -CodeExample "读取并检查数据结构" `
    -CodeSnippet "df <- read.csv(""data.csv"")
dim(df)
str(df)
summary(df)" `
    -Practice1 "明确研究问题后再设计采集方案" `
    -Practice2 "完整记录元数据（谁、何时、何地、如何）" `
    -Practice3 "保留原始数据，永远不直接修改" `
    -Faq1 "观测数据和实验数据的主要区别是什么？" `
    -Faq1A "观测数据在自然条件下获取，研究者不干预；实验数据通过操纵变量获取，可验证因果关系。" `
    -Faq2 "为什么 Garbage In Garbage Out 原则很重要？" `
    -Faq2A "数据质量直接决定分析结论的可靠性。不良数据无法通过统计方法补救。" `
    -Sum1 "数据采集是科学研究的起点，质量至关重要" `
    -Sum2 "四大数据来源：观测、实验、模型、公共数据，各有优劣" `
    -Sum3 "采样设计需遵循随机性、重复性和代表性原则" `
    -Task1 "列出你的研究课题涉及哪些数据类型" `
    -Task2 "检查现有数据的元数据记录是否完整" `
    -OptTask "绘制你的数据来源图" `
    -Ref1 "Naeem et al. 1994, Nature — 生物多样性与生态系统功能实验" `
    -Ref2 "Hooper et al. 2005, Ecological Monographs — 生物多样性共识综述"

# ============================================================
# 0102 什么是数据预处理
# ============================================================
New-Lecture -Filename "lecture-0102.qmd" `
    -Title "什么是数据预处理" `
    -ChapterNum "0102" `
    -ChapterTitle "0102 什么是数据预处理" `
    -KeyPoint1 "数据预处理的概念与必要性" `
    -KeyPoint2 "预处理完整流程六步骤" `
    -KeyPoint3 "数据检查与诊断方法" `
    -KeyPoint4 "代码记录预处理操作的重要性" `
    -Section1 "为什么需要数据预处理" `
    -Section2 "数据预处理的完整流程" `
    -Section3 "数据检查与诊断" `
    -Section4 "预处理与可重复性" `
    -Definition1 "数据预处理：将原始混乱数据转化为干净可用数据的过程" `
    -Definition2 "缺失值：传感器故障、记录遗漏导致的数据空白" `
    -Definition3 "异常值：输入错误或极端事件导致的明显不合理数值" `
    -Tool1Cat "检查" -Tool1Name "str() / glimpse()" -Tool1Use "查看数据结构与类型" `
    -Tool2Cat "检查" -Tool2Name "summary()" -Tool2Use "数值摘要与缺失值检测" `
    -Tool3Cat "检查" -Tool3Name "is.na()" -Tool3Use "检测缺失值位置" `
    -Tool4Cat "标准化" -Tool4Name "Z-score / Min-Max" -Tool4Use "消除量纲差异" `
    -CodeExample "数据基本检查" `
    -CodeSnippet "df <- read.csv(""soil_survey.csv"")
dim(df)
colSums(is.na(df))
summary(df)" `
    -Practice1 "永远保留原始数据的完整副本" `
    -Practice2 "所有预处理步骤用代码实现，不在 Excel 中手动操作" `
    -Practice3 "在脚本中添加注释说明每步处理理由" `
    -Faq1 "为什么不能用 Excel 手动清洗数据？" `
    -Faq1A "Excel 操作不可追溯、不可重复，代码才是可重复性研究的基础。" `
    -Faq2 "缺失值一定要删除吗？" `
    -Faq2A "不一定。需要评估缺失比例和机制，可选择删除、填充或保留。" `
    -Sum1 "数据预处理是数据分析的第一步，垃圾进垃圾出" `
    -Sum2 "完整流程：检查→清洗→转换→特征工程→标准化→质量评估" `
    -Sum3 "所有预处理步骤必须用代码记录，确保可重复性" `
    -Task1 "检查你当前数据集的缺失值情况" `
    -Task2 "用 R 代码替代一步 Excel 手动操作" `
    -OptTask "对比不同缺失值处理方式对结果的影响" `
    -Ref1 "数据预处理最佳实践文档" `
    -Ref2 "R tidyverse 数据转换文档"

Write-Host "Done! All lecture files created." -ForegroundColor Cyan
