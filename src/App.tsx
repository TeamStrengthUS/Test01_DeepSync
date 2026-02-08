import React, { useState, useEffect } from 'react';
import { Room, RoomEvent, VideoPresets } from 'livekit-client';
import { LiveKitRoom, VideoConference, useChat } from '@livekit/components-react';
import '@livekit/components-styles';
import { Mic, MicOff, Video, VideoOff, Send } from 'lucide-react';

const serverUrl = import.meta.env.VITE_LIVEKIT_URL;
const token = ""; // We will fix token generation later, for now we load the UI

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          TeamStrength DeepSync
        </h1>
        <p className="text-slate-400 mt-2">Neural Link: Active</p>
      </header>

      <main className="w-full max-w-4xl bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
        <div className="h-96 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800">
           {/* Placeholder for the 3D Avatar or Video Feed */}
           <div className="text-center animate-pulse">
             <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 opacity-75 blur-md"></div>
             <p className="text-blue-300">Awaiting Signal...</p>
           </div>
        </div>

        {/* Chat Interface Placeholder */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Transmission..." 
            className="flex-1 bg-slate-700 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
            <Send size={18} /> Send
          </button>
        </div>
      </main>
      
      <footer className="mt-8 text-slate-500 text-sm">
        System Status: <span className="text-green-400">ONLINE</span>
      </footer>
    </div>
  );
}
