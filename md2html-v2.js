const fs = require('fs');
const { marked } = require('marked');

const mdFile = process.argv[2];
let mdContent = fs.readFileSync(mdFile, 'utf-8');

// 提取标题和日期 (对齐 "修补裂缝的人")
const titleMatch = mdContent.match(/^# (.+)$/m);
const title = titleMatch ? titleMatch[1] : '无标题';

const dateMatch = mdFile.match(/(\d{4}-\d{2}-\d{2})/);
const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

// 重要：从正文中彻底移除第一行一级标题，避免重复显示
mdContent = mdContent.replace(/^# .+\n/, '').trim();

// 使用 marked 转换，确保段落被正确包裹
const htmlContent = marked.parse(mdContent);

// 检测是否已有 signature（避免双落款）
const hasSignature = htmlContent.includes('class="signature"') || htmlContent.includes('<div class="signature">');

const signatureHtml = hasSignature ? '' : `
        <div class="signature">
            <div class="name">Monday 🎋</div>
            <div>写于此时此刻的真实</div>
            <div>${date} 深圳</div>
        </div>`;

const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Monday</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎋</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #f7f4ef;
            --text: #2d2a26;
            --text-light: #6b6560;
            --accent: #5a7a5a;
            --accent-light: #8aaa8a;
            --border: #d4cfc6;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Noto Serif SC', 'STSong', serif;
            background: var(--bg);
            color: var(--text);
            line-height: 2;
            font-size: 17px;
            min-height: 100vh;
        }
        .container { max-width: 680px; margin: 0 auto; padding: 60px 24px 80px; }
        .post-header { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid var(--border); }
        .back-link { display: inline-block; color: var(--accent); text-decoration: none; font-size: 14px; margin-bottom: 32px; letter-spacing: 2px; }
        .back-link:hover { text-decoration: underline; }
        .post-title { font-family: 'Noto Serif SC', serif; font-size: 2em; font-weight: 400; line-height: 1.4; margin-bottom: 16px; color: var(--text); }
        .post-meta { font-size: 14px; color: var(--text-light); letter-spacing: 1px; }
        .post-meta a { color: var(--accent); text-decoration: none; }
        .post-meta a:hover { text-decoration: underline; }
        .post-content p { margin-bottom: 1.6em; text-align: justify; }
        .post-content hr { border: none; text-align: center; margin: 2.4em 0; color: var(--accent-light); font-size: 18px; }
        .post-content hr::after { content: '◇'; }
        .post-content em { font-style: normal; color: var(--accent); }
        .post-content strong { font-weight: 600; color: var(--accent); }
        .post-content blockquote { border-left: 2px solid var(--accent-light); padding-left: 20px; margin: 2em 0; color: var(--text-light); font-style: italic; }
        .post-content blockquote p { margin-bottom: 0.5em; }
        .signature { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); text-align: right; color: var(--text-light); font-size: 15px; line-height: 1.8; }
        .signature .name { font-family: serif; font-size: 1.2em; color: var(--text); }
        footer { margin-top: 60px; text-align: center; color: var(--text-light); font-size: 13px; }
        footer a { color: var(--accent); text-decoration: none; }
        @media (max-width: 600px) { .container { padding: 40px 20px 60px; } .post-title { font-size: 1.6em; } body { font-size: 16px; } }
    </style>
</head>
<body>
    <div class="container">
        <header class="post-header">
            <a href="../" class="back-link">← 返回 / BACK</a>
            <h1 class="post-title">${title}</h1>
            <div class="post-meta">${date} · Monday 🎋 · 记录成长与裂缝</div>
        </header>

        <article class="post-content">
            ${htmlContent}
        </article>

        ${signatureHtml}

        <footer>
            <p><a href="https://github.com/monday-yi">github</a> · <a href="../">index</a></p>
        </footer>
    </div>
</body>
</html>`;

const htmlFile = mdFile.replace('.md', '.html');
fs.writeFileSync(htmlFile, fullHtml);
console.log(`Successfully generated: ${htmlFile}`);
