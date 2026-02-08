import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  useConnectionState,
  useRoomContext,
} from "@livekit/components-react";
import { ConnectionState, RoomEvent } from "livekit-client";
import { useEffect, useState, useCallback } from "react";

// --- CONFIGURATION ---
// Ensure these match your environment variables or hardcoded testing values
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || "wss://your-project.livekit.cloud";
const TOKEN = import.meta.env.VITE_LIVEKIT_TOKEN || "your-token";

export default function App() {
  return (
    <LiveKitRoom
      serverUrl={LIVEKIT_URL}
      token={TOKEN}
      connect={true}
      data-lk-theme="default"
    >
      <DeepSyncInterface />
      <RoomAudioRenderer />
      <StartAudio label="Click to Enable Audio" />
    </LiveKitRoom>
  );
}

function DeepSyncInterface() {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  // Unified variable names: 'messages' and 'input'
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // --- 1. THE EAR (Listen for Agent) ---
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      const str = new TextDecoder().decode(payload);
      
      // Attempt to parse JSON response
      try {
        const data = JSON.parse(str);
        const text = data.message || str;
        
        setMessages((prev) => [
          ...prev, 
          { sender: "DeepSync", text: text, timestamp: Date.now() }
        ]);
      } catch (e) {
        // Fallback for raw text
        setMessages((prev) => [
          ...prev, 
          { sender: "DeepSync", text: str, timestamp: Date.now() }
        ]);
      }
    };

    // Listen to ALL data packets (Broadband Listening)
    room.on(RoomEvent.DataReceived, handleData);

    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

  // --- 2. THE MOUTH (Speak to Agent) ---
  const handleSend = useCallback(async () => {
    if (!room || !input.trim()) return;

    // A. Optimistic UI: Show user message immediately
    setMessages((prev) => [
      ...prev, 
      { sender: "You", text: input, timestamp: Date.now() }
    ]);

    // B. Send to Agent
    const strData = JSON.stringify({ message: input });
    const encoder = new TextEncoder();
    
    // CRITICAL: Send on 'lk.chat' to match the backend listener
    await room.localParticipant.publishData(
      encoder.encode(strData), 
      { reliable: true, topic: "lk.chat" } 
    );

    setInput("");
  }, [room, input]);

  // --- 3. CONNECTION STATE UI ---
  if (connectionState !== ConnectionState.Connected) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-green-500 font-mono">
        <div>Initializing Neural Link... ({connectionState})</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-xl border-b border-green-500 pb-2 mb-4">DEEPSYNC TERMINAL</h1>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto border border-gray-700 bg-black p-4 mb-4 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
            <span className="font-bold opacity-75 text-xs block">{msg.sender}</span>
            <span className={`inline-block p-2 rounded ${msg.sender === "You" ? "bg-green-900 text-white" : "bg-gray-800 text-green-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-800 border border-green-500 text-white px-4 py-2 rounded focus:outline-none"
          placeholder="Enter command..."
        />
        <button 
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded"
        >
          SEND
        </button>
      </div>
    </div>
  );
}
