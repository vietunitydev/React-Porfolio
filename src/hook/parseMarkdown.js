export const parseMarkdown = (markdown) => {
    const escape = (str) =>
        str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] || c));

    // Parse ảnh trước
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />');

    const lines = markdown.split('\n');

    let inCodeBlock = false;
    let codeLang = '';
    let codeBuffer = [];
    let htmlLines = [];

    let isInUl = false;
    let isInOl = false;

    // Helpers
    const inlineProcess = (s) => {
        return s
            .replace(/`([^`]+)`/g, (_m, g1) => `<code class="bg-gray-800 text-purple-300 px-2 py-0.5 rounded text-sm font-mono">${escape(g1)}</code>`)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    };

    const isTableSeparator = (line) => {
        // Ví dụ: | --- | :--- | ---: | :---: |
        const trimmed = line.trim();
        if (!/\|/.test(trimmed)) return false;
        // Cho phép có/không có | ở đầu/cuối, mỗi cột phải có ít nhất 3 dấu -
        const cells = trimmed.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        if (cells.length === 0) return false;
        return cells.every(c => /^:?-{3,}:?$/.test(c));
    };

    const parseAlignment = (sepLine) => {
        const cells = sepLine.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        return cells.map(c => {
            const left = c.startsWith(':');
            const right = c.endsWith(':');
            if (left && right) return 'text-center';
            if (right) return 'text-right';
            return 'text-left';
        });
    };

    const parseTableRow = (line) => {
        // Chấp nhận cả có/không '|' đầu/cuối
        let content = line.trim();
        if (!/\|/.test(content)) return null;
        // Tránh coi dòng tiêu đề kiểu "# | ..." thành bảng
        const parts = content.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        return parts;
    };

    // Duyệt với chỉ số để có thể lookahead khi gặp bảng
    for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx];

        // Bắt đầu/kết thúc code block ```
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
            if (isInUl) { htmlLines.push('</ul>'); isInUl = false; }
            if (isInOl) { htmlLines.push('</ol>'); isInOl = false; }
            htmlLines.push('');
            continue;
        }

        // ===== PHÁT HIỆN & PARSE BẢNG =====
        // Điều kiện: dòng hiện tại có '|' (có thể là header), và dòng kế tiếp là separator hợp lệ
        const nextLine = lines[idx + 1] ?? '';
        const headerCells = parseTableRow(line);
        if (headerCells && isTableSeparator(nextLine)) {
            // Đóng ul/ol đang mở trước khi render bảng
            if (isInUl) { htmlLines.push('</ul>'); isInUl = false; }
            if (isInOl) { htmlLines.push('</ol>'); isInOl = false; }

            const alignClasses = parseAlignment(nextLine);

            // Thu thập các dòng nội dung tiếp theo cho đến khi không còn dạng bảng
            let bodyRows = [];
            let scan = idx + 2;
            while (scan < lines.length) {
                const row = lines[scan];
                // Dừng khi gặp dòng trống hoặc dòng không có '|' (không còn bảng)
                if (/^\s*$/.test(row)) break;
                const cells = parseTableRow(row);
                if (!cells) break;
                bodyRows.push(cells);
                scan++;
            }

            // Render bảng
            const ths = headerCells.map((cell, i) => {
                const cls = alignClasses[i] || 'text-left';
                return `<th class="px-3 py-2 ${cls} font-semibold text-white border-b border-gray-700">${inlineProcess(cell)}</th>`;
            }).join('');

            const trs = bodyRows.map(rowCells => {
                return `<tr class="border-b border-gray-800">
                    ${rowCells.map((c, i) => {
                    const cls = alignClasses[i] || 'text-left';
                    return `<td class="px-3 py-2 ${cls} text-gray-300">${inlineProcess(c)}</td>`;
                }).join('')}
                </tr>`;
            }).join('\n');

            htmlLines.push(
                `<div class="my-4 overflow-x-auto">
<table class="min-w-full border border-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-900/60">
    <tr>${ths}</tr>
  </thead>
  <tbody class="bg-gray-900/30">
    ${trs}
  </tbody>
</table>
</div>`
            );

            // Nhảy chỉ số qua khối bảng đã xử lý
            idx = scan - 1;
            continue;
        }
        // ===== HẾT PHẦN BẢNG =====

        // Headers
        if (/^### /.test(line)) {
            htmlLines.push(`<h3 class="text-xl font-bold text-white mt-6 mb-3">${line.replace(/^### /, '')}</h3>`);
            continue;
        } else if (/^## /.test(line)) {
            htmlLines.push(`<h2 class="text-2xl font-bold text-white mt-8 mb-4">${line.replace(/^## /, '')}</h2>`);
            continue;
        } else if (/^# /.test(line)) {
            htmlLines.push(`<h1 class="text-3xl font-bold text-white mt-8 mb-6">${line.replace(/^# /, '')}</h1>`);
            continue;
        }

        // Unordered list
        if (/^-\s+/.test(line)) {
            if (!isInUl) {
                htmlLines.push('<ul class="list-disc ml-6 text-gray-300 mb-4">');
                isInUl = true;
            }
            const inline = inlineProcess(line.replace(/^- /, ''));
            htmlLines.push(`<li>${inline}</li>`);
            continue;
        }

        // Ordered list
        if (/^\d+\.\s+/.test(line)) {
            if (!isInOl) {
                htmlLines.push('<ol class="list-decimal ml-6 text-gray-300 mb-4">');
                isInOl = true;
            }
            const inline = inlineProcess(line.replace(/^\d+\.\s+/, ''));
            htmlLines.push(`<li>${inline}</li>`);
            continue;
        }

        // Normal paragraph
        const inlineProcessed = inlineProcess(line);
        htmlLines.push(`<p class="text-gray-300 leading-relaxed mb-2">${inlineProcessed}</p>`);
    }

    // Đóng danh sách nếu còn dang dở
    if (isInUl) htmlLines.push('</ul>');
    if (isInOl) htmlLines.push('</ol>');

    return htmlLines.join('\n');
};
