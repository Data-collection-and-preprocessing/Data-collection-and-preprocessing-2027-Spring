// expand-0105.js - 批量扩展 0105-r-basics.qmd 中最短的H3章节
const fs = require('fs');
const path = require('path');

const filePath = path.join('E:', 'Github', 'Data-collection-and-preprocessing-2027-Spring', '0105-r-basics.qmd');
let text = fs.readFileSync(filePath, 'utf-8');

// ============================================================
// 扩展内容库：key = H3标题(精确匹配), value = 完整扩展内容
// ============================================================
const expansions = {

'for 循环': `
for 循环是 R 中最常用的循环结构，用于重复执行一段代码固定次数，或者遍历一个向量的每个元素。在生态学数据分析中，for 循环常用于批量处理多个样地的数据、对不同处理组分别计算统计量、或者循环模拟随机过程。理解 for 循环的用法是编写高效 R 代码的基础，尤其是当你需要自动化重复性分析任务时。

\`\`\`{r}
# 基础 for 循环：遍历字符向量
species <- c("马尾松", "杉木", "桉树")

for (sp in species) {
  print(paste("当前树种:", sp))
}

# 索引遍历：知道当前是第几个
for (i in 1:length(species)) {
  cat("第", i, "个树种:", species[i], "\\n")
}

# 批量计算：计算每个样地的平均胸径
plot_ids <- paste0("样地", 1:5)
dbh_values <- list(
  c(25.3, 22.1, 28.7),
  c(18.5, 19.2, 17.8),
  c(32.1, 29.5, 31.2),
  c(20.5, 21.3, 19.8),
  c(15.7, 16.2, 14.9)
)
names(dbh_values) <- plot_ids

mean_dbh <- numeric(length(dbh_values))
for (i in 1:length(dbh_values)) {
  mean_dbh[i] <- mean(dbh_values[[i]])
}
names(mean_dbh) <- plot_ids
mean_dbh
\`\`\`

**运行结果说明**：第一个循环 \`for (sp in species)\` 会依次将 \`species\` 向量中的每个元素赋值给 \`sp\`，并执行循环体，因此会打印三次输出。第二个循环使用索引 \`i\`，可以知道当前处理到第几个元素，这在需要同时访问对应位置的另一个向量时非常有用。第三个例子展示了更实用的场景：遍历 5 个样地的胸径数据列表，批量计算每个样地的平均胸径，最终得到一个命名向量 \`mean_dbh\`，可以直接看出每个样地的平均值。

**生态学应用案例**：在马尾松混交林研究中，我们通常在每个样地设置 20 株标准木，测量胸径（DBH）、树高、冠幅等指标。数据分析时，需要先计算每个样地的平均值，然后再比较不同林分类型（如纯林 vs 混交林）或不同坡位（上坡 vs 中坡 vs 下坡）的差异。使用 for 循环，可以批量完成这个任务：先按样地编号分组，再循环计算每个组的平均值、标准差和样本量。如果用手工操作，需要重复 20 次相同的代码；用 for 循环，只需要一个统一的代码模板，就能自动处理所有样地。更进一步，可以将 for 循环与条件判断结合，自动识别异常值（如 DBH 超过 100cm 的记录明显不符合实际），并生成异常值报告。因此，for 循环不仅提高了工作效率，也减少了手工操作可能引入的错误。`,
// ============================================================
'while 循环': `
while 循环与 for 循环不同，它不是预先知道循环次数，而是在满足某个条件时反复执行代码块，直到条件不成立为止。这种"直到满足某条件才停止"的特点，使 while 循环特别适合用于模拟收敛过程、迭代优化和不确定性分析。在生态学中，while 循环常用于物种分布模型的最大熵（MaxEnt）迭代、贝叶斯 MCMC 链的收敛判断、或者蒙特卡洛模拟直到达到目标精度。

\`\`\`{r}
# 基础 while 循环
count <- 1
while (count <= 5) {
  print(paste("计数:", count))
  count <- count + 1
}

# 迭代收敛：模拟直到标准差小于阈值
set.seed(2024)
values <- numeric(0)
sd_est <- 1.0
target_sd <- 0.01
iteration <- 0

while (sd_est > target_sd) {
  new_value <- rnorm(1, mean = 10, sd = 2)
  values <- c(values, new_value)
  sd_est <- sd(values)
  iteration <- iteration + 1
  if (iteration >= 1000) {
    cat("达到最大迭代次数", iteration, "，标准差仍为", round(sd_est, 4), "\\n")
    break
  }
}
cat("收敛！迭代", iteration, "次后，标准差 =", round(sd_est, 4), "\\n")

# 蒙特卡洛模拟：估计 pi
n_points <- 0
n_inside <- 0
set.seed(42)

while (abs(n_inside / Math.max(n_points, 1) - pi/4) > 0.001 && n_points < 100000) {
  x <- Math.random() * 2 - 1
  y <- Math.random() * 2 - 1
  if (x*x + y*y <= 1) n_inside <- n_inside + 1
  n_points <- n_points + 1
}
pi_est <- 4 * n_inside / n_points
cat("估计 pi =", round(pi_est, 6), "(真实 pi =", round(pi, 6), ")\\n")
\`\`\`

**运行结果说明**：第一个例子展示了 while 循环的基本用法：初始化计数器，每轮循环打印当前计数，然后递增计数器，直到计数超过 5。第二个例子展示了迭代收敛的典型模式：反复生成随机数并累积，直到标准差低于阈值；如果 1000 次后仍未收敛，则用 \`break\` 强制退出防止无限循环。第三个蒙特卡洛例子通过随机投点法估计圆周率 pi，循环直到估计误差小于 0.001 或达到 10 万次。

**生态学应用案例**：在马尾松林土壤有机碳动态建模中，我们常用 Ricker 或 Michaelis-Menten 方程拟合碳储量随时间的变化。这些模型通常需要迭代求解参数，如非线性最小二乘或最大似然估计，而迭代过程本身就是一个 while 循环——直到残差平方和的变化小于某个阈值（即"收敛"），或者达到最大迭代次数才停止。另一个例子是贝叶斯统计中的 MCMC 采样：Chains 通常需要运行几千次迭代才能收敛到后验分布，while 循环可以持续采样，直到 Gelman-Rubin 统计量（R-hat）低于 1.1，才认为 chains 已经收敛。因此，while 循环虽然不如 for 循环常用，但在需要"一直做直到满足条件"的场景中，它是不可替代的工具。`,
// ============================================================
'包的安装': `
包的安装是 R 扩展功能的第一步。R 的强大之处在于全球研究者贡献的数以万计的扩展包（packages），这些包提供了从高级统计模型到精美数据可视化的各种功能。在生态学研究中，最常用的包包括用于群落分析的 \`vegan\`、用于多元统计的 \`ade4\`、用于空间分析的 \`sf\` 和 \`terra\`、以及用于数据操作的 \`tidyverse\` 系列。安装包只需要一行代码，但理解安装的机制和常见问题，对于构建可重复的研究流程至关重要。

\`\`\`{r}
#| eval: false
# 从 CRAN 安装（最常用）
install.packages("ggplot2")

# 安装多个包
install.packages(c("dplyr", "tidyr", "readr"))

# 安装 tidyverse（包含多个常用包）
install.packages("tidyverse")

# 从 GitHub 安装开发版（需要 devtools 包）
install.packages("devtools")
devtools::install_github("username/packagename")

# 从 Bioconductor 安装（生物信息学包）
if (!requireNamespace("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
BiocManager::install("phyloseq")
\`\`\`

**运行结果说明**：\`install.packages()\` 是从 CRAN 安装包的标准方法，R 会自动下载并编译包。安装多个包时，可以用 \`c()\` 合并包名一次性安装。\`tidyverse\` 是一个元包（meta-package），同时安装 dplyr、tidyr、readr、ggplot2 等多个核心包。GitHub 安装需要先装 \`devtools\` 或 \`remotes\` 包，GitHub 上的包通常是开发中版本，可能不稳定。Bioconductor 是生物信息学包的主要来源，许多生态学相关包（如 \`phyloseq\` 用于微生物群落分析）都在这里。

**生态学应用案例**：在马尾松林土壤微生物群落研究中，我们通常需要安装一系列专业包来完成完整分析流程。首先是数据读取和操作：\`tidyverse\` 提供数据处理的完整工具链；然后是群落分析：\`vegan\` 是群落生态学的核心包，提供多样性指数（Shannon、Simpson、Pielou）、排序方法（NMDS、PCA、CA）和差异检验（adonis、betadisper）；接着是空间分析：\`sf\` 和 \`terra\` 处理矢量数据和栅格数据，计算景观格局指数；最后是高级建模：\`lme4\` 用于混合效应模型，\`brms\` 用于贝叶斯回归。假设你要分析马尾松林土壤细菌群落的多样性沿海拔梯度的变化，可以这样准备环境：\`install.packages(c("vegan", "tidyverse", "sf", "terra", "lme4"))\`。一旦安装完成，这些包会在整个 R 会话期间可用（除非重启 R）。建议在项目初始化时创建一个 \`setup.R\` 脚本，包含所有需要安装的包，这样其他人运行你的代码时只需要执行这个脚本，就能自动配置好所有环境。`,
// ============================================================
'常用生态学 R 包': `
R 语言在生态学领域的应用极为广泛，这得益于全球生态学研究者的持续贡献。从经典的群落分析到现代的基因组学研究，R 生态学包的生态系统已经非常完善。了解这些包的分类和用途，可以帮助你在需要时快速找到合适的工具，而不是重复造轮子。生态学 R 包可以大致分为以下几类：群落生态学包、多元统计包、空间分析包、系统发育分析包、土壤和水质分析包、以及可视化包。

\`\`\`{r}
#| eval: false
# 群落生态学
install.packages("vegan")      # 群落分析，多样性指数
install.packages("ade4")       # 多元统计
install.packages("biodiversityR")  # 生物多样性

# 系统发育分析
install.packages("ape")        # 系统发育分析
install.packages("phytools")   # 系统发育可视化
install.packages("picante")    # 系统发育与群落生态学

# 空间生态学
install.packages("sp")         # 空间数据基础
install.packages("sf")         # 空间矢量数据（推荐）
install.packages("raster")     # 栅格数据
install.packages("terra")      # 栅格数据（新版，推荐）
install.packages("landscapemetrics")  # 景观格局指数

# 土壤与环境
install.packages("soilwater")  # 土壤水分模型
install.packages("soilphysics") # 土壤物理性质

# 数据可视化
install.packages("ggplot2")    # 通用绘图
install.packages("patchwork")  # 图板组合
install.packages("ggtern")     # 三元图
\`\`\`

**运行结果说明**：以上列出了生态学研究中最常用的 R 包，按功能分类。\`vegan\` 是群落生态学的核心包，几乎所有植被调查数据分析都会用到它。\`ape\` 提供系统发育树构建和进化分析的基础功能。\`sf\` 和 \`terra\` 是处理空间数据的现代包，取代了旧的 \`sp\` 和 \`raster\`。\`landscapemetrics\` 用于计算景观格局指数，适合研究森林破碎化等问题。\`ggtern\` 用于绘制三元图，适合显示三个组分（如沙、粉、黏粒含量）的比例关系。

**生态学应用案例**：在马尾松林生态学研究中，我们通常需要组合使用多个包来完成综合分析。例如，要研究马尾松混交林与纯林的土壤微生物群落差异，研究者可能需要：1) 用 \`vegan\` 计算各样本的 Shannon 多样性指数和 Pielou 均匀度指数，并进行 NMDS 排序；2) 用 \`adespatial\` 进行空间特征向量分析（dbRDA）；3) 用 \`lme4\` 拟合线性混合效应模型，分析林分类型对群落结构的影响，控制样地随机效应；4) 用 \`ggplot2\` 和 \`patchwork\` 组合绑制高质量图片；5) 用 \`sf\` 和 \`terra\` 处理样地空间分布图和景观格局数据。如果你要研究马尾松林土壤有机碳的空间异质性，可能需要用 \`gstat\` 进行克里金插值，用 \`raster\` 绑制空间分布图，用 \`landscapemetrics\` 计算景观格局指数。建立自己的"工具包清单"，在每个新项目开始时快速配置环境，是提高研究效率的有效策略。`,
// ============================================================
'读取 CSV 文件': `
CSV（Comma-Separated Values，逗号分隔值）是最常用的数据交换格式，几乎所有统计软件和电子表格程序都支持。在生态学研究中，野外调查数据、实验室测定结果、气象站记录等通常都以 CSV 格式保存。R 提供了多种读取 CSV 文件的方法，其中 \`read.csv()\` 是基础 R 自带的函数，而 \`readr\` 包的 \`read_csv()\` 则提供了更快的读取速度和更友好的输出格式。

\`\`\`{r}
#| eval: false
# 基础 R 方法
data <- read.csv("data/species_survey.csv")

# tidyverse 方法（推荐，速度更快）
library(readr)
data <- read_csv("data/species_survey.csv")

# 指定列类型
data <- read_csv("data/species_survey.csv",
                 col_types = cols(
                   plot_id = col_character(),
                   species = col_character(),
                   dbh = col_double(),
                   height = col_double()
                 ))

# 跳过前几行（如果有注释或说明）
data <- read_csv("data/species_survey.csv", skip = 2)

# 指定缺失值标记
data <- read_csv("data/species_survey.csv", na = c("NA", ".", "-"))
\`\`\`

**运行结果说明**：\`read.csv()\` 会把数据读入为 data.frame 对象，默认会把字符型列转换为因子（factor），这在某些情况下可能不是你想要的。相比之下，\`read_csv()\` 会保持字符型不变，并且读取速度通常快 10 倍以上，特别适合处理大型数据集。读取后可以用 \`head(data)\` 查看前几行，用 \`str(data)\` 查看数据结构，用 \`summary(data)\` 查看各列的统计摘要。

**生态学应用案例**：在马尾松林土壤调查中，我们通常会在野外记录样地编号、GPS 坐标、坡位、土层深度、土壤颜色等信息，然后在实验室测定 pH、有机质、全氮、全磷等指标。这些数据最初可能记录在 Excel 中，但为了便于 R 分析，通常会导出为 CSV 格式。例如，一个典型的土壤数据文件可能包含 \`plot_id\`（样地编号）、\`slope_position\`（坡位）、\`soil_layer\`（土层）、\`pH\`、\`SOC\`（土壤有机碳）、\`TN\`（全氮）等列。读取这个文件后，我们可以立即进行描述统计、相关分析或方差分析，探讨不同坡位、不同土层的土壤性质差异，以及这些差异如何影响马尾松的生长和土壤微生物群落。因此，掌握 CSV 文件读取不仅是技术操作，更是连接野外调查与数据分析的关键环节。`,
// ============================================================
'读取 Excel 文件': `
Excel 是科研工作中最常用的数据记录工具，但 R 本身并不直接支持 \`.xlsx\` 格式，需要借助 \`readxl\` 包。\`readxl\` 的优势在于不依赖外部程序（如 Java），安装简单，读取速度快，而且可以指定读取哪个工作表（sheet）、跳过哪些行、选择哪些列。这对于处理复杂的 Excel 文件非常有用，尤其是当一个 Excel 文件包含多个工作表、每个工作表记录不同类型的数据时。

\`\`\`{r}
#| eval: false
library(readxl)

# 读取第一个工作表
data <- read_excel("data/soil_data.xlsx", sheet = 1)

# 按工作表名称读取
data <- read_excel("data/soil_data.xlsx", sheet = "土壤化学性质")

# 跳过前几行（如果有标题或说明）
data <- read_excel("data/soil_data.xlsx", skip = 3)

# 只读取指定范围
data <- read_excel("data/soil_data.xlsx", range = "A1:E50")

# 查看 Excel 文件包含哪些工作表
excel_sheets("data/soil_data.xlsx")
\`\`\`

**运行结果说明**：\`read_excel()\` 会自动识别列类型，但有时可能不准确（例如把日期识别为数值）。如果遇到这种情况，可以用 \`col_types\` 参数手动指定。\`excel_sheets()\` 函数可以列出 Excel 文件中所有工作表的名称，这在处理多工作表文件时非常有用。读取后的数据是 tibble 格式，可以直接用 tidyverse 的函数进行处理。

**生态学应用案例**：在马尾松林生态系统研究中，我们经常需要整合多个来源的数据。例如，一个 Excel 文件可能包含三个工作表：第一个记录样地基本信息（坐标、海拔、坡向、坡度），第二个记录植被调查数据（物种、胸径、树高、冠幅），第三个记录土壤理化性质（pH、有机质、氮磷钾含量）。使用 \`readxl\` 包，我们可以分别读取这三个工作表，然后通过样地编号（plot_id）将它们合并成一个完整的数据集。这种数据整合能力对于综合分析非常重要：我们可以探讨土壤性质如何影响植被结构，或者地形因子如何通过土壤性质间接影响马尾松的生长。因此，掌握 Excel 文件读取不仅是技术需求，更是实现多源数据整合、开展综合生态学研究的基础。`,
// ============================================================
'匿名函数（Anonymous Functions）': `
匿名函数（Anonymous Functions）是指没有名字的函数，通常在需要函数作为参数传递给另一个函数的场景中使用，比如 \`lapply()\`、\`sapply()\`、\`apply()\` 等函数的参数。匿名函数不需要预先定义，可以直接在调用时编写函数体，让代码更简洁、更具表达力。R 4.1+ 还引入了新的简写语法 \`\\\\(x)\` 替代 \`function(x)\`，使匿名函数更加简洁。

\`\`\`{r}
# 传统命名函数
square <- function(x) x^2
sapply(1:5, square)

# 匿名函数：不需要命名
sapply(1:5, function(x) x^2)

# R 4.1+ 简写语法
sapply(1:5, \\(x) x^2)

# 多参数匿名函数
sapply(1:5, function(x, power) x^power, power = 3)

# 实际应用：批量计算多个统计量
data <- c(12.5, 8.3, 15.7, 10.2, 9.8)
stats <- lapply(list(mean, sd, median, IQR), function(f) f(data))
names(stats) <- c("均值", "标准差", "中位数", "四分位距")
stats

# 结合条件：批量处理列表
measurements <- list(
  pH = c(6.2, 5.8, 7.1, 6.5),
  SOC = c(18.3, 22.1, 15.7, 19.4),
  TN = c(1.2, 1.5, 0.9, 1.1)
)

# 对每个指标：标准化（减均值除标准差）
standardized <- lapply(measurements, function(x) (x - mean(x)) / sd(x))
standardized
\`\`\`

**运行结果说明**：匿名函数 \`function(x) x^2\` 直接作为 \`sapply()\` 的参数，不需要先赋值给一个名字。R 4.1+ 的 \`\\\\(x)\` 语法更加简洁，在某些场景下可读性更好。多参数匿名函数可以通过额外参数传递第二个参数（如 \`power = 3\`）。实际应用例子展示了如何用 \`lapply()\` 配合匿名函数批量计算多个统计量，结果是一个命名列表，每个元素对应一个统计量。

**生态学应用案例**：在马尾松林土壤数据分析中，匿名函数特别适合用于批量数据处理。例如，假设你有 20 个样地的土壤化学性质数据，每个样地包含 pH、有机碳、全氮、有效磷等多个指标。我们想对每个指标分别进行 Z-score 标准化（让均值为 0，标准差为 1），以便比较不同指标的相对变化。这时可以：\`r standardized_data <- lapply(soil_data, function(x) (x - mean(x, na.rm = TRUE)) / sd(x, na.rm = TRUE))\` 一行代码就能完成所有指标的标准化，而不需要为每个指标分别编写标准化代码。因此，匿名函数不仅让代码更简洁，也更不易出错——因为没有中间变量，所有的操作都在一次 \`lapply()\` 调用中完成。`,
// ============================================================
'数据框的创建方式': `
数据框（data.frame）是 R 中用于存储表格数据的最基本结构，类似于电子表格或关系数据库中的表。数据框的每一列可以是不同的数据类型（数值、字符、逻辑等），但每一列的长度必须相同。在生态学研究中，数据框是最常用的数据结构，因为野外调查和实验室测定的数据天然就是表格形式的——每一行代表一个观测样本（如一个样地、一株树、一个土样），每一列代表一个变量（如物种名、胸径、pH 值）。

\`\`\`{r}
# 方式1：直接创建
species <- c("马尾松", "杉木", "桉树")
height <- c(12.5, 8.3, 15.7)
df1 <- data.frame(species, height)

# 方式2：命名列创建
df2 <- data.frame(
  plot_id = 1:5,
  soil_ph = c(6.5, 5.8, 7.2, 6.1, 5.5),
  organic_matter = c(3.2, 2.8, 4.1, 3.5, 2.9)
)

# 方式3：矩阵转换
mat <- matrix(1:12, nrow = 4, ncol = 3)
df3 <- as.data.frame(mat)
colnames(df3) <- c("N", "P", "K")

# 方式4：tibble（tidyverse推荐）
library(tibble)
df4 <- tibble(
  species = c("马尾松", "杉木", "桉树"),
  height = c(12.5, 8.3, 15.7)
)
df4  # tibble打印更友好
\`\`\`

**运行结果说明**：四种创建方式各有优劣。方式1最简单直接；方式2在创建时就指定列名，代码更清晰；方式3适合从矩阵数据转换；方式4的 tibble 是现代 R 推荐的表格格式，打印更友好，且在处理大数据时不会一次性输出全部内容。数据框创建后，可以用 \`str(df)\` 查看结构，用 \`head(df)\` 查看前几行，用 \`summary(df)\` 查看统计摘要。

**生态学应用案例**：在马尾松林样地调查中，典型数据集包含样地信息（样地编号、坐标、海拔、林龄、郁闭度等）、植被信息（物种组成、胸径、树高、枝下高、冠幅等）和土壤信息（pH、有机质、氮磷钾含量、容重、含水率等）。这些数据在录入时通常是每行一个样方（或每行一株树），每列一个变量。假设你要创建一个马尾松林样地调查数据框：\`r forest_data <- data.frame(plot_id = paste0("P", 1:20), species = "马尾松", dbh = rnorm(20, 25, 5), height = rnorm(20, 15, 3), soil_ph = rnorm(20, 5.8, 0.5))\`。这个数据框可以直接用于后续的统计分析和建模。掌握数据框的创建和管理，是 R 生态学数据分析的第一步。`,
// ============================================================
'实战示例': `
管道操作符 \`|> \`（R 4.1+）是 R 语言最重要的语法改进之一，它让代码从"从里到外"的嵌套写法变成"从左到右"的线性流程，极大提高了代码的可读性。管道的基本思想是：把前一个表达式的结果，作为第一个参数传递给下一个函数。以此类推，多个函数可以串联成一条处理流水线，每个步骤的执行顺序一目了然。

\`\`\`{r}
# 不使用管道：嵌套写法（难读）
result <- head(arrange(filter(select(df, species, dbh, height), dbh > 20), desc(dbh)), 10)

# 使用管道：线性写法（易读）
result <- df |>
  select(species, dbh, height) |>
  filter(dbh > 20) |>
  arrange(desc(dbh)) |>
  head(10)
\`\`\`

**运行结果说明**：没有管道时，我们需要从最内层开始读——先 select，再 filter，再 arrange，最后 head，思维是"由内向外"的。有管道时，代码按照数据流动的方向从左到右读：数据框先被选择列，然后过滤行，然后排序，然后取前 10 行，思维是"由左向右"的。在实际分析中，管道可以串联任意多个步骤，每个步骤的输入都是上一步的输出，这让复杂的数据处理流程变得像一条生产线一样清晰。

**生态学应用案例**：在马尾松林土壤数据分析中，假设我们需要筛选出有机碳含量最高的前 10 个样地，并按降序排列，同时保留样地编号、坡位和土层信息：\`r top_soc <- soil_data |> dplyr::select(plot_id, slope_position, soil_layer, SOC) |> dplyr::filter(!is.na(SOC)) |> dplyr::arrange(desc(SOC)) |> head(10)\`。这个分析流程包括选择列、移除缺失值、排序、取前 10 行四步，每一步都清晰可见。如果不用管道，这个代码会变成 \`head(arrange(filter(select(soil_data, plot_id, slope_position, soil_layer, SOC), !is.na(SOC)), desc(SOC)), 10)\`，不仅括号难匹配，调试时也很难定位哪一步出了问题。管道的另一个好处是便于分享和复用：如果某个分析步骤需要重复使用，可以把整个管道封装成函数，而管道的结构使得函数内部的逻辑一目了然。`,
// ============================================================
'错误 2：表越界（Subscript out of bounds）': `
索引越界是 R 编程中最常见的错误之一，指的是试图访问向量、列表或数据框中不存在的索引位置。与其他编程语言（如 Python、C++）不同，R 的负索引不会报错，而是会返回意想不到的结果甚至静默失败。因此，理解 R 的索引规则和边界行为，对于编写健壮的代码至关重要。

\`\`\`{r}
# 向量索引越界
x <- c(1, 2, 3)
x[5]      # 返回 NA（不是报错）
x[0]      # 返回 numeric(0)（空向量）
x[-10]    # 当向量长度为3时，-10超出范围，返回 NA

# 列表索引越界
lst <- list(a = 1, b = 2, c = 3)
lst[[4]]      # 错误：下标出界
lst[["d"]]    # 错误：名称不在列表中

# 正确的安全索引方式
safe_get <- function(x, i, default = NA) {
  if (i > 0 && i <= length(x)) {
    return(x[[i]])
  } else {
    return(default)
  }
}
safe_get(lst, 1)
safe_get(lst, 10, default = "不存在")

# 数据框行索引越界
df <- data.frame(x = 1:3, y = 4:6)
df[10, ]     # 返回一行，列为 NA
df[, 10]     # 返回一列，列为 NULL
\`\`\`

**运行结果说明**：R 的索引行为与其他语言不同：正整数索引超出范围返回 \`NA\`，负整数索引超出范围可能返回意外结果，零索引返回空向量而不是报错。这意味着如果你的代码期望某个索引有值，但实际上越界了，R 不会主动报错，而是返回 \`NA\` 或空值，导致后续分析出现难以追踪的问题。因此，写代码时应该显式检查索引是否有效，或者使用安全索引函数。

**生态学应用案例**：在马尾松林数据分析中，假设你编写了一个循环来处理 20 个样地的数据：\`r for (i in 1:length(plots)) { mean_dbh[i] <- mean(dbh[[i]]) }\`。如果 \`plots\` 向量因为某种原因只包含 15 个元素，而 \`dbh\` 列表仍然有 20 个元素（可能是历史遗留数据），循环会正常执行完，但 \`mean_dbh\` 只有 15 个元素，后续分析可能会出现"丢失了 5 个样地"的问题。更危险的情况是：如果你的代码假设第 20 个样地是"处理组"，但实际上由于索引越界它变成了 \`NA\`，整个统计分析可能基于错误的前提。在实际项目中，建议在数据导入后就验证数据的一致性，例如：\`r if (length(unique(c(length(plots), length(dbh), length(soil_ph)))) > 1) stop("数据长度不一致！")\`。这种"防御性编程"习惯虽然会稍微增加代码量，但能有效避免难以发现的错误。`,
};

// ============================================================
// 查找并替换每个目标章节
// ============================================================
let expanded = 0;
let failed = [];

for (const [title, content] of Object.entries(expansions)) {
  // 精确匹配 ### title
  const searchPattern = `### ${title}\n`;
  const idx = text.indexOf(searchPattern);
  
  if (idx === -1) {
    failed.push(title);
    console.log(`NOT FOUND: ${title}`);
    continue;
  }
  
  // 找到下一个 ### 的位置
  let nextH3 = text.indexOf('\n### ', idx + 1);
  if (nextH3 === -1) nextH3 = text.length;
  
  // 替换
  const oldSection = text.slice(idx, nextH3);
  const newSection = `### ${title}${content}\n`;
  
  text = text.slice(0, idx) + newSection + text.slice(nextH3);
  expanded++;
  console.log(`EXPANDED: ${title} (${oldSection.length} -> ${newSection.length} chars)`);
}

if (failed.length > 0) {
  console.log('\nFailed to find:');
  failed.forEach(t => console.log(`  - ${t}`));
}

// 保存
fs.writeFileSync(filePath, text, 'utf-8');
console.log(`\nDone! Expanded ${expanded} sections. File saved.`);
