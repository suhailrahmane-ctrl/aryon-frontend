'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // اضافه کردن پیام کاربر
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) throw new Error('خطا در ارتباط با سرور');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'متاسفانه الان نمی‌تونم پاسخ بدم. لطفاً دوباره امتحان کنید.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Aryon</h1>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'chat' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'image' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('image')}
        >
          Image
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'video' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('video')}
        >
          Video
        </button>
      </div>

      {activeTab === 'chat' && (
        <div className="bg-white rounded-lg shadow p-4 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                سلام! من Aryon هستم — هوش مصنوعی ساخت افغانستان. چطور می‌تونم کمک کنم؟
              </p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      msg.role === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="text-left">
                <div className="inline-block p-2 rounded-lg bg-gray-100">در حال پاسخ‌دهی...</div>
              </div>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              ارسال
            </button>
          </div>
        </div>
      )}

      {activeTab === 'image' && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">🎨 تولید تصویر</h2>
          <p className="text-gray-600 mb-6">این ویژگی به زودی با Stable Diffusion اضافه می‌شود.</p>
          <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64" />
        </div>
      )}

      {activeTab === 'video' && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">🎥 تولید ویدیو</h2>
          <p className="text-gray-600 mb-6">این ویژگی در مرحله آزمایشی است.</p>
          <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48" />
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} AFG Patriotic • Made in Afghanistan 🇦🇫
      </footer>
    </div>
  );
}
