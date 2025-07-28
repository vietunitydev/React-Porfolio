import React from 'react';
import { BookOpen } from 'lucide-react';

const BlogPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <section className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-white mb-4 text-center">Blog</h1>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                Coming soon! I'll be sharing insights about game development, technical tutorials,
                and my journey as a Unity developer.
            </p>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
                <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Blog Coming Soon</h2>
                <p className="text-gray-300 mb-8">
                    I'm working on creating valuable content about game development.
                    Stay tuned for technical articles, tutorials, and project insights!
                </p>
                {/*<button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">*/}
                {/*    Subscribe for Updates*/}
                {/*</button>*/}
            </div>
        </section>
    </div>
);

export default BlogPage;