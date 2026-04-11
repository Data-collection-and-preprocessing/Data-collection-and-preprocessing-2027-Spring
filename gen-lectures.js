const fs = require('fs');
const BASE = 'E:\\Github\\Data-collection-and-preprocessing-2027-Spring\\slides';
const TEMPLATE = fs.readFileSync('TEMPLATE.txt', 'utf8');

function writeLecture(filename, data) {
    let content = TEMPLATE;
    for (const [key, val] of Object.entries(data)) {
        content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
    }
    fs.writeFileSync(`${BASE}\\${filename}`, content, 'utf8');
    console.log('Created', filename);
}

const lectures = [
  ['lecture-0101.qmd', { title: '什么是数据采集', chapter_num: '0101', chapter_title: '0101 什么是数据采集', kp1: '数据采集的定义与科学意义', kp2: '四大数据来源及其特点', kp3: '采样设计的基本原则', kp4: '根据研究问题选择合适的采集方法', s1: '数据采集的概念与重要性', s2: '四大数据来源：观测、实验、模型、公共数据', s3: '采样设计原则', s4: '数据采集与可重复性', d1: '数据采集：通过系统化方法获取研究所需信息的过程，是科学研究的起点', d2: '观测数据：在自然条件下直接观察和记录，研究者不施加干预', d3: '实验数据：在受控条件下操纵变量并测量响应，可验证因果关系', t1c: '采样', t1n: '随机抽样', t1u: '确保样本代表性', t2c: '采样', t2n: '系统抽样', t2u: '沿环境梯度布设采样点', t3c: '记录', t3n: '元数据标准', t3u: '记录采集时间、地点、方法', t4c: '质量', t4n: '质量控制检查', t4u: '确保数据可靠性', code_example: '读取并检查数据结构', code_snippet: 'df <- read.csv("data.csv")\ndim(df)\nstr(df)\nsummary(df)', p1: '明确研究问题后再设计采集方案', p2: '完整记录元数据（谁、何时、何地、如何）', p3: '保留原始数据，永远不直接修改', faq1: '观测数据和实验数据的主要区别是什么？', faq1_a: '观测数据在自然条件下获取，研究者不干预；实验数据通过操纵变量获取，可验证因果关系。', faq2: '为什么 Garbage In Garbage Out 原则很重要？', faq2_a: '数据质量直接决定分析结论的可靠性。不良数据无法通过统计方法补救。', sum1: '数据采集是科学研究的起点，质量至关重要', sum2: '四大数据来源：观测、实验、模型、公共数据，各有优劣', sum3: '采样设计需遵循随机性、重复性和代表性原则', task1: '列出你的研究课题涉及哪些数据类型', task2: '检查现有数据的元数据记录是否完整', opt_task: '绘制你的数据来源图', ref1: 'Naeem et al. 1994, Nature - 生物多样性与生态系统功能实验', ref2: 'Hooper et al. 2005, Ecological Monographs - 生物多样性共识综述' }],
  ['lecture-0102.qmd', { title: '什么是数据预处理', chapter_num: '0102', chapter_title: '0102 什么是数据预处理', kp1: '数据预处理的概念与必要性', kp2: '预处理完整流程六步骤', kp3: '数据检查与诊断方法', kp4: '代码记录预处理操作的重要性', s1: '为什么需要数据预处理', s2: '数据预处理的完整流程', s3: '数据检查与诊断', s4: '预处理与可重复性', d1: '数据预处理：将原始混乱数据转化为干净可用数据的过程', d2: '缺失值：传感器故障、记录遗漏导致的数据空白', d3: '异常值：输入错误或极端事件导致的明显不合理数值', t1c: '检查', t1n: 'str() / glimpse()', t1u: '查看数据结构与类型', t2c: '检查', t2n: 'summary()', t2u: '数值摘要与缺失值检测', t3c: '检查', t3n: 'is.na()', t3u: '检测缺失值位置', t4c: '标准化', t4n: 'Z-score / Min-Max', t4u: '消除量纲差异', code_example: '数据基本检查', code_snippet: 'df <- read.csv("soil_survey.csv")\ndim(df)\ncolSums(is.na(df))\nsummary(df)', p1: '永远保留原始数据的完整副本', p2: '所有预处理步骤用代码实现，不在 Excel 中手动操作', p3: '在脚本中添加注释说明每步处理理由', faq1: '为什么不能用 Excel 手动清洗数据？', faq1_a: 'Excel 操作不可追溯、不可重复，代码才是可重复性研究的基础。', faq2: '缺失值一定要删除吗？', faq2_a: '不一定。需要评估缺失比例和机制，可选择删除、填充或保留。', sum1: '数据预处理是数据分析的第一步，垃圾进垃圾出', sum2: '完整流程：检查 - 清洗 - 转换 - 特征工程 - 标准化 - 质量评估', sum3: '所有预处理步骤必须用代码记录，确保可重复性', task1: '检查你当前数据集的缺失值情况', task2: '用 R 代码替代一步 Excel 手动操作', opt_task: '对比不同缺失值处理方式对结果的影响', ref1: '数据预处理最佳实践文档', ref2: 'R tidyverse 数据转换文档' }],
];

for (const [fn, data] of lectures) {
  writeLecture(fn, data);
}
console.log('Done!');
