import React, { useState, useEffect } from 'react';

export default function Funny404({ homePath = '/' }) {
  const [hint, setHint] = useState(getRandomHint());
  const [showEaster, setShowEaster] = useState(false);

  useEffect(() => {
    const tid = setInterval(() => setHint(getRandomHint()), 5000);
    return () => clearInterval(tid);
  }, []);

  function getRandomHint() {
    const hints = [
      'Maybe the page went on a coffee break.',
      'We lost this page in an intense game of hide-and-seek.',
      '404. The page took the stairs instead of the elevator.',
      'This page is currently buffering its personality.',
      'Honestly? The internet ate it.',
      "Someone renamed the page to 'not-found-forever'.",
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  }

  function handleHome() {
    window.location.href = homePath;
  }

  function handleBack() {
    if (window.history.length > 1) window.history.back();
    else handleHome();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#071133] text-white p-6 font-mono">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: big funny section */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-[120px] font-extrabold leading-none select-none">404</h1>
          <h2 className="text-2xl font-semibold opacity-90 mt-2">Page Not Found</h2>
          <p className="mt-3 text-sm opacity-70">{hint}</p>

          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button
              onClick={handleHome}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm text-sm transition-all shadow-sm"
            >
              🏠 Go Home
            </button>

            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/10 text-emerald-300 text-sm transition-all"
            >
              🔙 Go Back
            </button>

            <button
              onClick={() => setShowEaster(s => !s)}
              className="px-4 py-2 rounded-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/10 text-violet-200 text-sm transition-all"
            >
              {showEaster ? '🙈 Hide Secret' : '🕹️ Reveal Secret'}
            </button>
          </div>

          {showEaster && (
            <div className="mt-4 text-xs bg-white/10 p-3 rounded-lg border border-white/10 max-w-[320px]">
              <strong>Pro tip:</strong> Type <code className="bg-black/40 px-1 rounded">/admin</code> in your dreams and press Enter.
            </div>
          )}
        </div>

        {/* Right: console */}
        <div className="flex flex-col justify-between">
          <pre className="font-mono bg-black/50 p-4 rounded-md text-xs leading-5 overflow-auto max-h-56 border border-white/10">
{`// Debug console (for the brave)
> fetch('/this-page')
  status: 404
  message: "I swear it was here before..."

// Developer Notes:
- Check routes in App.jsx
- Did you forget to export default the page?
- Did the page join a circus?`}
          </pre>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-red-400/90 mt-1" />
              <div>
                <div className="text-sm font-semibold">This happened because:</div>
                <div className="text-xs opacity-80">You, the router, or the universe moved the page. We're not judging... much.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400/90 mt-1" />
              <div>
                <div className="text-sm font-semibold">Quick fixes</div>
                <ul className="text-xs opacity-80 list-disc list-inside mt-1">
                  <li>Check your route paths and spelling</li>
                  <li>Restart your dev server (it gets tired)</li>
                  <li>Try the homepage button — it loves attention</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 text-center">
              <small className="text-[11px] opacity-70">Made with ❤️, chaos, and an acute shortage of pages.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
