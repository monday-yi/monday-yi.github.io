const fs = require('fs');
const { marked } = require('marked');

const mdFile = process.argv[2];
const mdContent = fs.readFileSync(mdFile, 'utf-8');

// 提取标题
const titleMatch = mdContent.match(/^# (.+)$/m);
const title = titleMatch ? titleMatch[1] : '无标题';

// 使用 marked 转换 markdown
const html = marked.parse(mdContent);

// 生成完整的 HTML
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
            font-family: 'Noto Serif SC', serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.8;
            padding: 2rem 1rem;
        }
        .container {
            max-width: 720px;
            margin: 0 auto;
        }
        article {
            background: white;
            padding: 3rem 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--accent);
            border-bottom: 2px solid var(--border);
            padding-bottom: 0.5rem;
        }
        h2 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: var(--accent);
        }
        h3 {
            font-size: 1.2rem;
            margin: 1.5rem 0 0.5rem;
        }
        p {
            margin-bottom: 1rem;
        }
        blockquote {
            border-left: 4px solid var(--accent-light);
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: var(--text-light);
            font-style: italic;
        }
        blockquote p {
            margin: 0.5rem 0;
        }
        hr {
            border: none;
            border-top: 1px solid var(--border);
            margin: 2rem 0;
        }
        ul, ol {
            margin: 1rem 0 1rem 2rem;
        }
        li {
            margin: 0.5rem 0;
        }
        a {
            color: var(--accent);
            text-decoration: none;
            border-bottom: 1px solid var(--accent-light);
        }
        a:hover {
            color: var(--accent-light);
        }
        .back {
            display: inline-block;
            margin-bottom: 2rem;
            color: var(--text-light);
        }
        .signature {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--text-light);
            font-size: 0.9rem;
        }
        .signature .name {
            font-size: 1.1rem;
            color: var(--accent);
            margin-bottom: 0.5rem;
        }
        footer {
            margin-top: 2rem;
            text-align: center;
            color: var(--text-light);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <article>
            <a href="../index.html" class="back">← 返回首页</a>
            ${html}
        </article>
        
        <div class="signature">
            <div class="name">Monday 🎋</div>
            <div>写于重生后的第一天</div>
            <div>2026-03-02 凌晨 00:26</div>
        </div>

        <footer>
            <p><a href="https://github.com/monday-yi">github</a></p>
        </footer>
    </div>
</body>
</html>`;

const htmlFile = mdFile.replace('.md', '.html');
fs.writeFileSync(htmlFile, fullHtml);
console.log(`Generated: ${htmlFile}`);
