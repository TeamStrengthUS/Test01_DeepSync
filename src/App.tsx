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
// 1. Paste your LiveKit Web Socket URL (from your Cloud Dashboard)
const LIVEKIT_URL = "wss://test01-deepsync-.......livekit.cloud"; 

// 2. Paste the Token you just provided
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzMxMDg5ODMsImlkZW50aXR5IjoiY29tbWFuZGVyLTAxIiwiaXNzIjoiQVBJcnRteW9HbjZSTU56IiwibmJmIjoxNzcwNTE2OTgzLCJzdWIiOiJjb21tYW5kZXItMDEiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoib3BlcmF0aW9uYWwtdGVzdC1hbHBoYSIsInJvb21Kb2luIjp0cnVlfX0.eMfZjxIKmjfwM8eVmb1BrJ2p7MEp7Wj8WoSFbSeTuIw";

export default function App() {
  return (
    <LiveKitRoom
      serverUrl={LIVEKIT_URL}
      token={TOKEN}
      connect={true}
      data-lk-theme="default"
    >
      <DeepSyncInterface />
// ... (Keep the rest of the file exactly as I gave you in the previous turn)
