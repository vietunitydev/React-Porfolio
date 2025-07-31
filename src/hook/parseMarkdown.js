export const parseMarkdown = (markdown) => {
    const escape = (str) =>
        str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] || c));

    // Parse ảnh trước
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />');

    let lines = markdown.split('\n');

    let inCodeBlock = false;
    let codeLang = '';
    let codeBuffer = [];
    let htmlLines = [];

    let isInUl = false;
    let isInOl = false;

    for (let line of lines) {
        // Bắt đầu/kết thúc code block
        const codeBlockMatch = line.match(/^```(\w*)/);
        if (codeBlockMatch) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeLang = codeBlockMatch[1] || '';
                codeBuffer = [];
            } else {
                const escapedCode = escape(codeBuffer.join('\n'));
                htmlLines.push(
                    `<pre class="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto"><code class="language-${codeLang} text-green-400 text-sm leading-[1.4] font-mono">${escapedCode}</code></pre>`
                );
                inCodeBlock = false;
                codeLang = '';
            }
            continue;
        }

        if (inCodeBlock) {
            codeBuffer.push(line);
            continue;
        }

        // Dòng trắng → kết thúc ul/ol nếu đang mở
        if (/^\s*$/.test(line)) {
            if (isInUl) {
                htmlLines.push('</ul>');
                isInUl = false;
            }
            if (isInOl) {
                htmlLines.push('</ol>');
                isInOl = false;
            }
            htmlLines.push('');
            continue;
        }

        // Headers
        if (/^### /.test(line)) {
            htmlLines.push(`<h3 class="text-xl font-bold text-white mt-6 mb-3">${line.replace(/^### /, '')}</h3>`);
        } else if (/^## /.test(line)) {
            htmlLines.push(`<h2 class="text-2xl font-bold text-white mt-8 mb-4">${line.replace(/^## /, '')}</h2>`);
        } else if (/^# /.test(line)) {
            htmlLines.push(`<h1 class="text-3xl font-bold text-white mt-8 mb-6">${line.replace(/^# /, '')}</h1>`);
        }

        // Unordered list
        else if (/^-\s+/.test(line)) {
            if (!isInUl) {
                htmlLines.push('<ul class="list-disc ml-6 text-gray-300 mb-4">');
                isInUl = true;
            }
            const inline = line.replace(/^- /, '')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>');
            htmlLines.push(`<li>${inline}</li>`);
        }

        // Ordered list
        else if (/^\d+\.\s+/.test(line)) {
            if (!isInOl) {
                htmlLines.push('<ol class="list-decimal ml-6 text-gray-300 mb-4">');
                isInOl = true;
            }
            const inline = line.replace(/^\d+\.\s+/, '')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>');
            htmlLines.push(`<li>${inline}</li>`);
        }

        // Normal paragraph
        else {
            const inlineProcessed = line
                .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
            htmlLines.push(`<p class="text-gray-300 leading-relaxed mb-2">${inlineProcessed}</p>`);
        }
    }

    // Đóng danh sách nếu còn dang dở
    if (isInUl) htmlLines.push('</ul>');
    if (isInOl) htmlLines.push('</ol>');

    return htmlLines.join('\n');
};
