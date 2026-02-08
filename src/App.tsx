import React, { useEffect, useState } from 'react';
import { LiveKitRoom, useChat, ChatEntry } from '@livekit/components-react';
import '@livekit/components-styles';
import { Room } from 'livekit-client';
import { Send, Terminal } from 'lucide-react';

// --- CONFIGURATION ---
const serverUrl = import.meta.env.VITE_LIVEKIT_URL;
// ENSURE YOUR TOKEN IS PASTED BELOW
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzMxMDg5ODMsImlkZW50aXR5IjoiY29tbWFuZGVyLTAxIiwiaXNzIjoiQVBJcnRteW9HbjZSTU56IiwibmJmIjoxNzcwNTE2OTgzLCJzdWIiOiJjb21tYW5kZXItMDEiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoib3BlcmF0aW9uYWwtdGVzdC1hbHBoYSIsInJvb21Kb2luIjp0cnVlfX0.eMfZjxIKmjfwM8eVmb1BrJ2p7MEp7Wj8WoSFbSeTuIw"; 

export default function App() {
  if (!token || token === "") {
    return (
      <div className="min-h-screen bg-slate-950 text-red-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">⚠️ Neural Link Broken</h1>
          <p>Access Token is missing. Please update src/App.tsx with your token.</p>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <DeepSyncInterface />
    </LiveKitRoom>
  );
}

function DeepSyncInterface() {
  const { send, chatMessages, isSending } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSend = async () => {
    if (!input.trim() || !room) return;

    const userMessage = input.trim();
    
    // 1. Update UI immediately (Optimistic UI)
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage
    }]);

    // 2. Encode Message
    const encoder = new TextEncoder();
    const payload = JSON.stringify({ 
      message: userMessage,
      timestamp: Date.now()
    });
    
    // 3. FIX: Send explicitly on 'lk.chat' to match the Agent
    await room.localParticipant.publishData(
      encoder.encode(payload),
      { reliable: true, topic: "lk.chat" } 
    );

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono flex flex-col items-center p-4">
      {/* HEADER */}
      <header className="w-full max-w-4xl mb-6 border-b border-slate-800 pb-4 flex items-center gap-3">
        <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/50">
          <Terminal size={24} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wider">TeamStrength DeepSync</h1>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      {/* CHAT DISPLAY */}
      <main className="flex-1 w-full max-w-4xl bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm">
        <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {chatMessages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
               <p className="mb-2">Awaiting Input...</p>
             </div>
          ) : (
            chatMessages.map((msg, i) => (
              /* CHANGED LOGIC BELOW: Uses msg.from?.isLocal instead of identity check */
              <div key={i} className={`flex ${msg.from?.isLocal ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  msg.from?.isLocal 
                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100' 
                    : 'bg-slate-800/80 border border-slate-700 text-slate-200'
                }`}>
                  <div className="text-xs opacity-50 mb-1 mb-2 font-bold uppercase tracking-wider">
                    {msg.from?.isLocal ? 'OPERATOR' : 'DEEPSYNC AGENT'}
                  </div>
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter command or query..."
              disabled={isSending}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            />
            <button 
              onClick={handleSend}
              disabled={isSending || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-lg font-semibold transition-all flex items-center gap-2 border border-blue-400/20 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
