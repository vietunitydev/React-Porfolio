export const parseMarkdown = (markdown) => {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mt-8 mb-6">$1</h1>')

        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto"><code class="text-green-400 text-sm">$2</code></pre>')

        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm">$1</code>')

        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')

        // Lists
        .replace(/^\d+\.\s+(.*)$/gm, '<li class="text-gray-300 mb-2 ml-4">$1</li>')
        .replace(/^-\s+(.*)$/gm, '<li class="text-gray-300 mb-2 ml-4 list-disc">$1</li>')

        // Paragraphs
        .replace(/^(?!<[h|l|p|c])(.+)$/gm, '<p class="text-gray-300 mb-4 leading-relaxed">$1</p>')

        // Line breaks
        .replace(/\n/g, '<br>');

    return html;
};