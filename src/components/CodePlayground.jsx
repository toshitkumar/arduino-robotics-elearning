import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Play, Pause, Trash2, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { MODULES, CAPSTONE_PROJECT } from '../data/courseData';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export default function CodePlayground() {
  const [selectedSketchId, setSelectedSketchId] = useState('capstone');
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [serialBaud, setSerialBaud] = useState('9600');
  const [serialLogs, setSerialLogs] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const serialBottomRef = useRef(null);

  const sketches = [
    { id: 'mod-1', title: 'Module 1: LED Blink', code: MODULES[0].codeSnippet },
    { id: 'mod-2', title: 'Module 2: Servo Angle Sweep', code: MODULES[1].codeSnippet },
    { id: 'mod-3', title: 'Module 3: L298N Lifting Motor', code: MODULES[2].codeSnippet },
    { id: 'mod-4', title: 'Module 4: HC-SR04 Ultrasonic Telemetry', code: MODULES[3].codeSnippet },
    { id: 'mod-5', title: 'Module 5: Rain Sensor AO/DO', code: MODULES[4].codeSnippet },
    { id: 'capstone', title: 'Capstone: Flood-Safe House Master', code: CAPSTONE_PROJECT.arduinoSourceCode },
  ];

  const currentSketch = sketches.find((s) => s.id === selectedSketchId) || sketches[5];
  const codeLines = currentSketch.code.split('\n');

  // Simulated Serial Monitor Streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      let logLine = '';

      if (selectedSketchId === 'mod-1') {
        const state = Math.random() > 0.5 ? 'HIGH (ON)' : 'LOW (OFF)';
        logLine = `[${timestamp}] LED Status: ${state} | Current draw: ~18mA`;
      } else if (selectedSketchId === 'mod-2') {
        const angles = [0, 45, 90, 135, 180];
        const a = angles[Math.floor(Math.random() * angles.length)];
        logLine = `[${timestamp}] Servo Command: write(${a}°) | Pulse: ${1000 + (a / 180) * 1000}µs | Feedback: Settled`;
      } else if (selectedSketchId === 'mod-3') {
        const states = ['LIFTING UP (ENA: 220)', 'HOLDING APPLIED (BRAKE)', 'LOWERING (ENA: 180)'];
        const s = states[Math.floor(Math.random() * states.length)];
        logLine = `[${timestamp}] Motor Driver: ${s} | Bus Voltage: 12.1V`;
      } else if (selectedSketchId === 'mod-4') {
        const dist = (15 + Math.random() * 20).toFixed(1);
        const depth = (40 - dist).toFixed(1);
        logLine = `[${timestamp}] HC-SR04: Distance = ${dist} cm | Depth = ${depth} cm | FlightTime = ${Math.round(dist * 58.3)}µs`;
      } else if (selectedSketchId === 'mod-5') {
        const ao = Math.floor(400 + Math.random() * 400);
        logLine = `[${timestamp}] Rain Sensor: AO = ${ao}/1023 | DO = ${ao < 600 ? 'LOW (ALERT)' : 'HIGH (CLEAR)'}`;
      } else {
        const depth = (10 + Math.random() * 12).toFixed(1);
        const stateStr = depth > 15 ? 'STATE_LIFTING [MOTOR_UP: 230]' : 'STATE_STANDBY_GROUND [LATCH: LOCKED]';
        logLine = `[${timestamp}] [MASTER TELEMETRY] Depth: ${depth}cm | RainAO: 480 | ${stateStr}`;
      }

      setSerialLogs((prev) => [...prev.slice(-30), logLine]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isStreaming, selectedSketchId]);

  useEffect(() => {
    serialBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [serialLogs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSketch.code);
    setCopied(true);
    playClickSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompile = () => {
    playClickSound();
    setIsCompiling(true);
    setCompileOutput(null);
    setTimeout(() => {
      setIsCompiling(false);
      playSuccessChime();
      setCompileOutput({
        success: true,
        text: `AVR Compiler (avr-g++ v7.3.0)\nCompiling sketch: ${selectedSketchId}.ino...\nSketch uses 4,218 bytes (13%) of program storage space. Maximum is 32,256 bytes.\nGlobal variables use 284 bytes (13%) of dynamic memory, leaving 1,764 bytes for local variables.\nAVR Memory Architecture verified. Ready for upload.`,
      });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header & Preset Picker */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Arduino IDE Code Playground</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Examine production-grade Arduino C++ source code, test simulated serial monitor streams, and inspect line-by-line mechanics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSketchId}
            onChange={(e) => {
              playClickSound();
              setSelectedSketchId(e.target.value);
              setCompileOutput(null);
              setSerialLogs([]);
            }}
            className="bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-xs rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
          >
            {sketches.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor & Explanation Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Code View */}
        <div className="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div>
            {/* Editor Top Bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">{selectedSketchId}.ino</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompiling ? 'Compiling...' : 'Verify / Compile'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Lines with clickable index */}
            <div className="p-4 bg-[#0b0f19] font-mono text-xs overflow-x-auto max-h-[460px] overflow-y-auto leading-relaxed">
              {codeLines.map((line, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    playClickSound();
                    setActiveLineIndex(idx);
                  }}
                  className={`flex items-start gap-4 py-0.5 px-2 rounded cursor-pointer transition-colors ${
                    activeLineIndex === idx ? 'bg-blue-600/20 text-cyan-300 font-semibold' : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <span className="w-8 text-right text-slate-600 select-none text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="whitespace-pre">{line || ' '}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compiler Output Console */}
          {compileOutput && (
            <div className="p-4 bg-slate-950 border-t border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-line leading-relaxed">
              {compileOutput.text}
            </div>
          )}
        </div>

        {/* Right 1 Col: Line Inspector & Serial Monitor */}
        <div className="space-y-6">
          {/* Line Explainer */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Line-by-Line Mechanics Inspector
            </h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Selected Line {activeLineIndex + 1}:</span>
              <p className="font-mono text-xs text-white font-bold break-all">
                {codeLines[activeLineIndex] || '// Select a line on the left to inspect its role'}
              </p>
              <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                {codeLines[activeLineIndex]?.startsWith('const int')
                  ? 'Declares an immutable hardware pin mapping stored in flash memory, optimizing RAM allocation.'
                  : codeLines[activeLineIndex]?.includes('pinMode')
                  ? 'Configures the ATmega328P internal DDR (Data Direction Register) to act as either an input or output current buffer.'
                  : codeLines[activeLineIndex]?.includes('digitalWrite')
                  ? 'Sets the pin output latch to HIGH (+5V) or LOW (0V), activating or deactivating the downstream driver.'
                  : codeLines[activeLineIndex]?.includes('analogWrite')
                  ? 'Modulates the timer compare register (OCR) to produce a high-frequency PWM duty cycle.'
                  : codeLines[activeLineIndex]?.includes('pulseIn')
                  ? 'Initiates a hardware timing loop measuring round-trip acoustic echo return time with safety timeout.'
                  : 'Core program statement governing state transitions, timing, or sensor telemetry.'}
              </p>
            </div>
          </div>

          {/* Simulated Serial Monitor */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-72">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-white font-mono">Serial Monitor (COM3)</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={serialBaud}
                  onChange={(e) => setSerialBaud(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-[11px] text-cyan-400 rounded-lg px-2 py-0.5 cursor-pointer"
                >
                  <option value="9600">9600 baud</option>
                  <option value="115200">115200 baud</option>
                </select>
                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  title={isStreaming ? 'Pause stream' : 'Resume stream'}
                >
                  {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setSerialLogs([])}
                  className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                  title="Clear log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#0b0f19] font-mono text-[11px] text-cyan-400/90 overflow-y-auto flex-1 space-y-1">
              {serialLogs.length === 0 ? (
                <p className="text-slate-600 italic">Streaming UART serial telemetry...</p>
              ) : (
                serialLogs.map((log, i) => (
                  <div key={i} className="leading-tight">
                    {log}
                  </div>
                ))
              )}
              <div ref={serialBottomRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
