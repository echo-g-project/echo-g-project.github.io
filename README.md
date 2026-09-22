# ECHO-G — minimal project page

第一版英文静态项目页。当前 **PDF、Code、Dataset、视频和总览图均留空**，不会显示为已经可下载。
无需 Node.js、npm、后端、数据库或在线推理服务。没有 CDN、远程字体、追踪脚本或第三方播放器。

## 1. 查看

解压后，直接用浏览器打开 `index.html`。默认配置在 `site-config.js` 中，使用普通脚本，不需要 `fetch`。

通过本地 HTTP 服务测试媒体（尤其 WebVTT 字幕）时，在网站目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。双击打开 HTML 可以预览页面，但部分浏览器会限制 file:// 下的字幕、剪贴板或跨域媒体。

## 2. 文件结构

```text
index.html         页面结构与英文概览文案
styles.css         白底、青绿色、响应式样式
main.js            资源启用、媒体替换、公开版作者与引用功能
site-config.js     集中配置入口；后续主要修改此文件
assets/            本地论文、视频、封面、总览图等
README.md          使用说明
```

## 3. 填充资源

将媒体放进 `assets/`，并修改 `site-config.js`：

```js
links: {
  paper: "assets/paper.pdf",
  code: "",       // 仓库 URL
  dataset: ""     // 数据下载页 URL
},
demo: {
  src: "assets/demo.mp4",
  poster: "assets/demo-poster.jpg",
  captions: "",  // 可选 .vtt 字幕
  captionsLanguage: "en",
  captionsLabel: "English",
  caption: "A representative real-robot demonstration with the corresponding speech audio."
},
overview: {
  image: "assets/overview.png",
  alt: "ECHO-G framework overview.",
  caption: "Joint acoustic–linguistic conditioning, robot-space generation, and real-robot execution."
}
```

- 空链接显示为 Pending / Soon，并禁用按钮；不是虚假的可点击下载链接。
- 填入非空有效路径后，同一资源在首屏与资源区的入口会自动启用。
- 视频使用原生控件、按需加载，不会自动播放声音。
- `demo.src` 需要直接的视频文件 URL 或本地文件路径；不是 YouTube/Bilibili 的网页地址。
- `overview.image` 为空时显示图占位；加载失败会保留可读提示。
- 外部资源是否可访问、授权或允许跨域，需要上线前实际测试；程序不会替你验证权限。
- 最好保持图注与最终图片内容一致；语音、动作与视频播放速度应对应实际实验。
- 代码与数据说明包含训练、推理、评测，不额外承诺数据预处理代码公开。

## 4. 匿名预览与公开版

默认 `mode: "anonymous"`，没有作者、机构、致谢和 BibTeX 信息。

公开时可以配置：

```js
mode: "public",
showPreviewBadge: false,
authors: [
  { name: "Author name", url: "", affiliation: "1" }
],
affiliations: ["1 · Organization"],
citation: "" // 填最终、已核对的 BibTeX；为空则不显示 Citation 区域
```

**mode 只是展示设置，不是完整匿名化工具。** 匿名版的源文件中也不要填写真实作者和机构；不要依赖隐藏 DOM / CSS 来匿名化。
正式提交前还需要检查域名、仓库和数据外链、PDF 元数据、图片与视频中的身份信息。
本文页面不保证满足某一期刊全部匿名审稿要求；以实际投稿要求为准。

## 5. 发布

这是普通静态网站。将 `index.html`、`styles.css`、`main.js`、`site-config.js` 和 `assets/` 保持相同目录结构上传到静态托管平台即可。
本交付物 **没有部署到公网**，没有绑定任何账号或域名。

媒体很大时可单独托管，并在配置中填直链；发布平台的大小限制需要上线前检查。
当前没有模型在线生成、上传或任何后端请求。

## 6. 发布前检查

1. 用最终素材替换占位，并清楚区分真实机器人与仿真视频。
2. 核对论文、代码、数据与模型版本；未完成的资源继续留空。
3. 手机与桌面分别检查标题、图片和视频。
4. 确认字幕、语音、播放速度及链接。
5. 匿名审稿版检查页面源码与资源文件，而不仅是可见文字。
6. 完成发布材料后，设置 `showPreviewBadge: false`。

## 7. 设计范围

包含标题与 Paper / Code / Dataset 按钮、一段代表视频、概览图和简短介绍、三个资源卡片。
Citation 仅在公开模式且提供真实 BibTeX 后出现。
不包含实验数值表格、虚构作者或网址、在线交互式生成。
