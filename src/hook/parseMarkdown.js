export const parseMarkdown = (markdown) => {
    const escape = (str) =>
        str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] || c));

    // Generate slug from heading text for TOC links
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Parse ảnh trước
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />');

    const lines = markdown.split('\n');

    let inCodeBlock = false;
    let codeLang = '';
    let codeBuffer = [];
    let htmlLines = [];

    // Biến theo dõi cấp độ danh sách hiện tại
    let listStack = []; // ['ul', 'ul', ...] - theo dõi các loại list và cấp độ
    const LIST_INDENT_SPACES = 4; // Số khoảng trắng cho mỗi cấp độ thụt lề

    // Helpers
    const inlineProcess = (s) => {
        return s
            .replace(/`([^`]+)`/g, (_m, g1) => `<code class="bg-gray-800 text-purple-300 px-2 py-0.5 rounded font-mono" style="font-size: 0.875em;">${escape(g1)}</code>`)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    };

    const isTableSeparator = (line) => {
        const trimmed = line.trim();
        if (!/\|/.test(trimmed)) return false;
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
        let content = line.trim();
        if (!/\|/.test(content)) return null;
        const parts = content.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        return parts;
    };

    // Hàm đóng tất cả danh sách đang mở
    const closeAllLists = () => {
        while (listStack.length > 0) {
            const type = listStack.pop();
            htmlLines.push(`</${type}>`);
        }
    }

    // Duyệt với chỉ số để có thể lookahead khi gặp bảng
    for (let idx = 0; idx < lines.length; idx++) {
        let line = lines[idx];

        // Bắt đầu/kết thúc code block ```
        const codeBlockMatch = line.match(/^```(\w*)/);
        if (codeBlockMatch) {
            closeAllLists(); // Đóng list trước khi vào code block
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeLang = codeBlockMatch[1] || '';
                codeBuffer = [];
            } else {
                const escapedCode = escape(codeBuffer.join('\n'));
                htmlLines.push(
                    `<pre class="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto"><code class="language-${codeLang} text-green-400 font-mono leading-[1.4]" style="font-size: 0.875em;">${escapedCode}</code></pre>`
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
            closeAllLists(); // Đóng list khi gặp dòng trắng
            htmlLines.push('');
            continue;
        }

        // ===== GẠCH NGANG MÀN HÌNH (HORIZONTAL RULE) =====
        if (/^(\s*[-*_]\s*){3,}\s*$/.test(line.trim())) {
            closeAllLists();
            htmlLines.push('<hr class="my-6 border-gray-700">');
            continue;
        }

        // ===== PHÁT HIỆN & PARSE BẢNG =====
        const nextLine = lines[idx + 1] ?? '';
        const headerCells = parseTableRow(line);
        if (headerCells && isTableSeparator(nextLine)) {
            closeAllLists(); // Đóng list trước khi vào bảng

            const alignClasses = parseAlignment(nextLine);

            let bodyRows = [];
            let scan = idx + 2;
            while (scan < lines.length) {
                const row = lines[scan];
                if (/^\s*$/.test(row)) break;
                const cells = parseTableRow(row);
                if (!cells) break;
                bodyRows.push(cells);
                scan++;
            }

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

            idx = scan - 1;
            continue;
        }
        // ===== HẾT PHẦN BẢNG =====

        // Headers with ID for TOC
        if (/^### /.test(line)) {
            closeAllLists();
            const text = line.replace(/^### /, '');
            const id = generateSlug(text);
            htmlLines.push(`<h3 id="${id}" class="font-bold text-white mt-6 mb-3 scroll-mt-24" style="font-size: 1.25em;">${text}</h3>`);
            continue;
        } else if (/^## /.test(line)) {
            closeAllLists();
            const text = line.replace(/^## /, '');
            const id = generateSlug(text);
            htmlLines.push(`<h2 id="${id}" class="font-bold text-white mt-8 mb-4 scroll-mt-24" style="font-size: 1.5em;">${text}</h2>`);
            continue;
        } else if (/^# /.test(line)) {
            closeAllLists();
            const text = line.replace(/^# /, '');
            const id = generateSlug(text);
            htmlLines.push(`<h1 id="${id}" class="font-bold text-white mt-8 mb-6 scroll-mt-24" style="font-size: 1.875em;">${text}</h1>`);
            continue;
        }

        // ===== DANH SÁCH LỒNG NHAU (LISTS) =====
        const ulMatch = line.match(/^(\s*)-\s+([^\s].*)/); // - Item
        const olMatch = line.match(/^(\s*)\d+\.\s+([^\s].*)/); // 1. Item

        if (ulMatch || olMatch) {
            const match = ulMatch || olMatch;
            const leadingSpaces = match[1].length;
            const content = match[2];
            const listType = ulMatch ? 'ul' : 'ol';
            const currentLevel = leadingSpaces / LIST_INDENT_SPACES;

            // Đảm bảo thụt lề hợp lệ (chỉ chấp nhận các bước 4 space)
            if (leadingSpaces % LIST_INDENT_SPACES !== 0) {
                // Nếu không phải list hợp lệ, xử lý như paragraph bình thường.
                const inlineProcessed = inlineProcess(line);
                htmlLines.push(`<p class="text-gray-300 leading-relaxed mb-2">${inlineProcessed}</p>`);
                continue;
            }

            // Xử lý đóng/mở list
            while (listStack.length > currentLevel) {
                const closedType = listStack.pop();
                htmlLines.push(`</${closedType}>`);
            }
            while (listStack.length < currentLevel) {
                // Giả sử lồng nhau chỉ là ul
                listStack.push('ul');
                htmlLines.push('<ul class="list-disc ml-6 text-gray-300 mb-4 list-disc-indent">');
            }

            // Nếu cấp độ hiện tại không phải là cấp độ listType, đóng cấp độ cũ và mở cấp độ mới
            if (listStack.length === currentLevel && listStack[listStack.length - 1] !== listType) {
                if(listStack.length > 0) {
                    const closedType = listStack.pop();
                    htmlLines.push(`</${closedType}>`);
                }
            }

            // Mở list mới nếu cần
            if (listStack.length === currentLevel) {
                listStack.push(listType);
                // Thêm class 'ml-6' chỉ cho list ngoài cùng, list lồng nhau không cần thêm
                const listClass = listStack.length === 1 ? 'list-disc ml-6 text-gray-300 mb-4' : 'list-disc ml-6 text-gray-300 mb-0';
                htmlLines.push(`<${listType} class="${listClass}">`);
            }

            const inline = inlineProcess(content);
            htmlLines.push(`<li>${inline}</li>`);

            continue;
        }
        // ===== HẾT PHẦN DANH SÁCH LỒNG NHAU =====

        // Normal paragraph (chỉ xử lý khi không khớp với bất kỳ cú pháp nào khác)
        closeAllLists();
        const inlineProcessed = inlineProcess(line);
        htmlLines.push(`<p class="text-gray-300 leading-relaxed mb-2">${inlineProcessed}</p>`);
    }

    // Đóng danh sách nếu còn dang dở
    closeAllLists();

    return htmlLines.join('\n');
};

// Hàm extractHeadings (không thay đổi)
export const extractHeadings = (markdown) => {
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const lines = markdown.split('\n');
    const headings = [];
    let inCodeBlock = false;

    for (const line of lines) {
        // Skip code blocks
        if (line.match(/^```/)) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        // Extract headings
        if (/^### /.test(line)) {
            const text = line.replace(/^### /, '').trim();
            headings.push({ level: 3, text, id: generateSlug(text) });
        } else if (/^## /.test(line)) {
            const text = line.replace(/^## /, '').trim();
            headings.push({ level: 2, text, id: generateSlug(text) });
        } else if (/^# /.test(line)) {
            const text = line.replace(/^# /, '').trim();
            headings.push({ level: 1, text, id: generateSlug(text) });
        }
    }

    return headings;
};