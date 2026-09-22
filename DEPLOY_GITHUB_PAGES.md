# ECHO-G — GitHub Pages 发布版

这是已有 ECHO-G 简版页面的 GitHub Pages 部署包。
只重新整理发布目录和说明，不改页面设计，不添加作者、实验素材或占位网址。
**此文件包尚未上传至 GitHub，也不代表网站已经上线。**

## 选择网址形式

### 独立项目网址（类似 HOVER）
需要一个你控制的 GitHub 用户或组织，例如 `echo-g-project`。
这个名字目前只是建议，未检查注册可用性。
仓库名必须与 owner 对应：`echo-g-project.github.io`。
对应网址形式为 `https://echo-g-project.github.io/`。
仅在现有个人账号下创建同名仓库不会取得另一个 owner 的根域名。

### 使用已有账号
在已有用户或组织 `OWNER` 下创建 `echo-g` 仓库。
对应网址形式为 `https://OWNER.github.io/echo-g/`。
它和根域名站点使用同样的 GitHub Pages 托管，区别是带有仓库路径。
不要将示例 OWNER 当成实际网址。

## 发布目录

将 ZIP 解压后的文件直接放在仓库根目录，不要上传 ZIP 本身，也不要多包一层目录。

```text
index.html
styles.css
main.js
site-config.js
.nojekyll
assets/
README.md
DEPLOY_GITHUB_PAGES.md
```

## GitHub Pages 设置

本页没有构建步骤，使用分支发布即可：

1. 将上述文件提交到目标仓库的 `main` 分支。
2. 仓库 Settings → Pages → Build and deployment。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `main`，Folder 选择 `/(root)`，保存。
5. 查看 Actions 的部署结果，再打开 Pages 设置中给出的实际网址。

需有仓库管理员或维护者权限来设置 Pages。
初次发布可能需要等待几分钟。以实际部署成功与访问结果为准。
配置完成后，向发布分支提交的新文件会更新网站。

## 资源后续补充

目前 Paper、Code、Dataset、视频、总览图仍为空；空按钮继续禁用。
修改 `site-config.js` 即可补充资源。
本地图片、PDF、视频放进 `assets/`，用 `assets/demo.mp4` 等相对路径。
不要使用 `/assets/demo.mp4` 这类从域名根目录开始的路径，以免项目子目录部署失效。
无需在线推理、数据库或 Node.js 构建。

## 发布与匿名性

GitHub Pages 发布后可被互联网访问；没有作者栏不等于匿名审稿合规。
公开之前请检查 GitHub owner 名称、组织成员、仓库提交历史和 commit 作者、
README、网页源码、PDF 元数据、视频水印和所有外部资源链接。
独立项目名称本身不能保证匿名。
不要在站点仓库中放入密码、token、原始参与者信息或其他不应公开的资料。
当前页面配置保持 `mode: "anonymous"` 且作者、单位、引用为空。

## 官方参考（核对日期：2026-09-22）

- GitHub Pages 与默认网址规则：
  https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- 发布分支设置：
  https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- 快速开始：
  https://docs.github.com/en/pages/quickstart
