# web-tools

## 功能

为图片添加简单的来源水印，特点：

1. 无需上传，纯本地操作。
2. 主打一个快速。  
  没有多余操作，直接在页面 `Ctrl + V` 粘贴图片（如果图片在剪切板中），然后处理之后的图片，会自动写入到剪贴板。在使用的地方再 `Ctrl + V` 即可。

因为会覆盖剪贴板内容，建议配合剪贴板历史管理工具使用（Windows 自带：Win+V）

## 开发

框架：vite(swc) + react(js)

## 部署

<https://tools.jgrass.xyz>

使用 <https://vercel.com> 部署。

## TODO

- [ ] 支持调整水印位置，文字大小，颜色和阴影颜色（添加几种预设快速设置）
- [ ] 本地保存水印文字历史记录，支持管理
- [ ] 配置管理：默认样式，是否自动写入到剪贴板等
- [ ] 界面优化
- [ ] 功能优化：1 react 路由缓存（keep-alive）2 修改后端，使用 browser route。

## 其它的在线水印工具

> 搜索 `image watermark tool online` 能搜出一堆

- 🍀 [Add watermark to photo & image files - Add watermarks to your photo](https://www.img2go.com/watermark-image )

免费，免登录，交互简单，功能够用；推荐。PS <https://www.img2go.com> 这上面的工具还不少。缺点：好像有点点慢。

- 🍀 [Watermark Photos And Videos Online - Add Custom Watermarks](https://watermark.ws/ )

免费，免登录，交互还算简单，免费的功能够用。推荐。

- [Watermark Photos Online For Free | Watermarkly](https://watermarkly.com/# )

好用，但收费(免费的有厂商水印)

- [Watermark Photos Online - Free](https://www.watermark.ink/#/ )

免费，免登录，但交互做的一般；偶尔用用没啥问题

- [Watermark your images. Stamp multiple pictures at once.](https://www.iloveimg.com/watermark-image )

免费，免登录，交互简单，但没有阴影设置功能；PS <www.iloveimg.com> 是个不错的图片处理工具站点
