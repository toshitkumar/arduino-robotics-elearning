import React, { useState } from 'react';
import { 
  Cpu, 
  RotateCw, 
  Gauge, 
  Activity, 
  CloudRain, 
  CheckCircle, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle,
  Play,
  Waves,
  Zap,
  Sliders,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MODULES, CAPSTONE_PROJECT } from '../data/courseData';
import { playClickSound, playSuccessChime, playMotorSound } from '../utils/audioEffects';

export default function ModuleViewer({ activeModule, setActiveModule, onCompleteModule, completedModules }) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'pins', 'code', 'interactive'
  const [copied, setCopied] = useState(false);
  
  // Interactive Simulator States for mini-widgets:
  const [servoAngle, setServoAngle] = useState(90);
  const [motorSpeed, setMotorSpeed] = useState(200);
  const [motorDir, setMotorDir] = useState('STOP'); // 'LIFT', 'LOWER', 'STOP'
  const [ultrasonicDist, setUltrasonicDist] = useState(25);
  const [rainIntensity, setRainIntensity] = useState(20);

  const isCapstone = activeModule === 'capstone';
  const currentMod = isCapstone ? null : MODULES.find((m) => m.id === activeModule) || MODULES[0];

  const isCompleted = isCapstone 
    ? completedModules.includes('capstone') 
    : completedModules.includes(currentMod?.id);

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkComplete = () => {
    playSuccessChime();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onCompleteModule(isCapstone ? 'capstone' : currentMod.id);
  };

  // Nav helpers
  const allIds = ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5', 'capstone'];
  const currentIndex = allIds.indexOf(activeModule);
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header & Pagination */}
      <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-cyan-400 rounded-xl">
            {isCapstone ? <Waves className="w-6 h-6 text-amber-400" /> : <Cpu className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {isCapstone ? 'Capstone Final Project' : `Module ${currentMod.num}`}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{isCapstone ? '90 mins' : currentMod.estimatedTime}</span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {isCapstone ? CAPSTONE_PROJECT.title : currentMod.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isCapstone ? CAPSTONE_PROJECT.subtitle : currentMod.tagline}
            </p>
          </div>
        </div>

        {/* Prev / Next & Mark Complete */}
        <div className="flex items-center gap-2">
          {prevId && (
            <button
              onClick={() => {
                playClickSound();
                setActiveModule(prevId);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Previous Module"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Module Completed' : 'Mark as Complete'}</span>
          </button>

          {nextId && (
            <button
              onClick={() => {
                playClickSound();
                setActiveModule(nextId);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Next Module"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-2">
        {[
          { id: 'theory', label: 'Theory & Architecture' },
          { id: 'pins', label: 'Pinout & Electrical' },
          { id: 'code', label: 'Arduino Code & Breakdown' },
          { id: 'interactive', label: 'Interactive Activity' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playClickSound();
              setActiveTab(tab.id);
            }}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#111827] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: THEORY & ARCHITECTURE */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {isCapstone ? (
            <div className="space-y-6">
              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Waves className="w-5 h-5 text-amber-400" />
                  Problem Statement & Civil Engineering Motivation
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {CAPSTONE_PROJECT.problemStatement}
                </p>
              </div>

              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Key Project Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CAPSTONE_PROJECT.objectives.map((obj, i) => (
                    <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-300">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Rules */}
              <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Crucial Safety Engineering Requirements
                </h3>
                <ul className="space-y-2">
                  {CAPSTONE_PROJECT.safetyEngineeringRules.map((rule, i) => (
                    <li key={i} className="text-xs text-red-200/90 flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by step logic */}
              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Sequential Mechatronic Execution Cycle
                </h3>
                <div className="space-y-3">
                  {CAPSTONE_PROJECT.workingLogicSteps.map((st) => (
                    <div key={st.step} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {st.step}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{st.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-2">Module Overview</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentMod.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentMod.topics.map((t, idx) => (
                  <div key={idx} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-2">
                    <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {t.title}
                    </h4>
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {t.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PINOUT & ELECTRICAL */}
      {activeTab === 'pins' && (
        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            {isCapstone ? 'Complete System Pin Connection Table' : 'Component Pinout & Electrical Characteristics'}
          </h3>
          <p className="text-xs text-slate-400">
            {isCapstone 
              ? 'Complete wiring map interconnecting the Arduino UNO, sensors, actuators, and power supplies.'
              : 'Detailed terminal characteristics, voltage levels, signal definitions, and connection best practices.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
                {isCapstone ? (
                  <tr>
                    <th className="py-3 px-4">Component Module</th>
                    <th className="py-3 px-4">Module Pin</th>
                    <th className="py-3 px-4">Arduino UNO Pin</th>
                    <th className="py-3 px-4">Operational Note / Function</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="py-3 px-4">Pin / Terminal</th>
                    <th className="py-3 px-4">Signal Type</th>
                    <th className="py-3 px-4">Functional Engineering Description</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-slate-800">
                {isCapstone ? (
                  CAPSTONE_PROJECT.pinConnectionTable.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{p.component}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400">{p.compPin}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">{p.arduinoPin}</td>
                      <td className="py-3 px-4 text-slate-300">{p.note}</td>
                    </tr>
                  ))
                ) : (
                  currentMod.pinTable.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">{p.pin}</td>
                      <td className="py-3 px-4 text-purple-400 font-semibold">{p.type}</td>
                      <td className="py-3 px-4 text-slate-300">{p.desc}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ARDUINO CODE & BREAKDOWN */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {isCapstone ? 'FloodSafe_Capstone_Master.ino' : `${currentMod.id}_sketch.ino`}
                </span>
              </div>
              <button
                onClick={() => handleCopyCode(isCapstone ? CAPSTONE_PROJECT.arduinoSourceCode : currentMod.codeSnippet)}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-[#0b0f19]">
              <code>{isCapstone ? CAPSTONE_PROJECT.arduinoSourceCode : currentMod.codeSnippet}</code>
            </pre>
          </div>

          {!isCapstone && currentMod.codeExplanation && (
            <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Line-by-Line Code Explanation
              </h4>
              <div className="space-y-2.5">
                {currentMod.codeExplanation.map((exp, i) => (
                  <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <p className="font-mono text-xs text-cyan-300 font-semibold">{exp.line}</p>
                    <p className="text-xs text-slate-400 mt-1">{exp.exp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INTERACTIVE ACTIVITY */}
      {activeTab === 'interactive' && (
        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                Hands-On Interactive Simulation
              </h3>
              <p className="text-xs text-slate-400">
                Manipulate hardware parameters in real-time to observe physical actuator kinematics and sensor responses.
              </p>
            </div>
          </div>

          {/* Module 1: LED Blinker simulator */}
          {activeModule === 'mod-1' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-6">
              <p className="text-xs text-slate-400">Digital Pin 13 LED State Controller</p>
              <div className="flex justify-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center shadow-2xl relative">
                    <div className="w-12 h-12 rounded-full bg-red-600 animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.8)]" />
                  </div>
                  <span className="mt-3 text-xs font-mono font-bold text-red-400">LED D13 (ACTIVE HIGH)</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                In Arduino C++, <code className="text-cyan-400">digitalWrite(13, HIGH)</code> drives the gate of the internal pin driver to +5V DC, sinking current across the surface-mount LED and its 1kΩ ballast resistor.
              </p>
            </div>
          )}

          {/* Module 2: Servo Angle simulator */}
          {activeModule === 'mod-2' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Target Servo Position: <strong className="text-cyan-400 text-sm font-mono">{servoAngle}°</strong></span>
                    <span className="text-slate-400 font-mono text-[11px]">PWM: {Math.round(1000 + (servoAngle / 180) * 1000)} µs</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={servoAngle}
                    onChange={(e) => {
                      setServoAngle(Number(e.target.value));
                      playClickSound();
                    }}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>0° (Lock)</span>
                    <span>45°</span>
                    <span>90° (Neutral)</span>
                    <span>135°</span>
                    <span>180° (Deploy)</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-white">Pulse Width:</strong> {1000 + (servoAngle / 180) * 1000} microseconds</p>
                    <p><strong className="text-white">Frame Rate:</strong> 50 Hz (20ms refresh cycle)</p>
                    <p><strong className="text-white">Function in Capstone:</strong> Mechanical safety barrier and flood latch locking pin.</p>
                  </div>
                </div>

                {/* Animated Servo Graphic */}
                <div className="w-56 h-56 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4 relative">
                  <div className="w-28 h-28 bg-blue-900 rounded-xl border-2 border-blue-500/40 relative flex items-center justify-center shadow-xl">
                    <span className="absolute top-1 text-[9px] font-bold text-blue-300 font-mono">SG90 9G</span>
                    {/* Servo Horn Shaft */}
                    <div 
                      className="w-20 h-4 bg-white rounded-full shadow-md transition-transform duration-200 origin-center flex items-center justify-end px-1"
                      style={{ transform: `rotate(${servoAngle - 90}deg)` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-mono font-bold text-cyan-400">Shaft Angle: {servoAngle}°</span>
                </div>
              </div>
            </div>
          )}

          {/* Module 3: L298N Motor Driver simulator */}
          {activeModule === 'mod-3' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300">Platform Motor Direction Control:</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <button
                        onClick={() => {
                          setMotorDir('LIFT');
                          playMotorSound(0.5);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          motorDir === 'LIFT' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        ▲ Lift Platform
                      </button>
                      <button
                        onClick={() => {
                          setMotorDir('LOWER');
                          playMotorSound(0.5);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          motorDir === 'LOWER' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        ▼ Lower Platform
                      </button>
                      <button
                        onClick={() => {
                          setMotorDir('STOP');
                          playClickSound();
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          motorDir === 'STOP' ? 'bg-red-600 text-white shadow-lg shadow-red-500/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        ■ Brake Stop
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>PWM Speed (ENA): <strong className="text-cyan-400 font-mono">{motorSpeed} / 255</strong></span>
                      <span className="text-slate-400 font-mono">{Math.round((motorSpeed / 255) * 100)}% Duty</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={motorSpeed}
                      onChange={(e) => setMotorSpeed(Number(e.target.value))}
                      className="w-full accent-blue-500 mt-2 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="font-mono text-cyan-300">
                      IN1: {motorDir === 'LIFT' ? 'HIGH (+5V)' : 'LOW (0V)'} | IN2: {motorDir === 'LOWER' ? 'HIGH (+5V)' : 'LOW (0V)'}
                    </p>
                    <p className="text-slate-400">
                      H-Bridge State: {motorDir === 'LIFT' ? 'Forward Upward Polarity' : motorDir === 'LOWER' ? 'Reverse Downward Polarity' : 'Dynamic Brake Shorted'}
                    </p>
                  </div>
                </div>

                {/* Animated Rotating Motor Graphic */}
                <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-4 border-slate-700 bg-slate-800 flex items-center justify-center shadow-xl">
                      {/* Rotating rotor gear */}
                      <div 
                        className={`w-20 h-20 rounded-full border-4 border-dashed border-cyan-400 flex items-center justify-center ${
                          motorDir === 'LIFT' ? 'animate-spin' : motorDir === 'LOWER' ? 'animate-[spin_1s_linear_infinite_reverse]' : ''
                        }`}
                        style={{ animationDuration: motorSpeed > 0 ? `${(256 - motorSpeed) / 100}s` : '0s' }}
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-extrabold text-[10px]">
                          12V
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-mono font-bold text-white">
                    Motor Status: <span className={motorDir === 'STOP' ? 'text-red-400' : 'text-emerald-400'}>{motorDir}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Module 4: HC-SR04 Ultrasonic simulator */}
          {activeModule === 'mod-4' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Water Surface Distance to Sensor: <strong className="text-cyan-400 font-mono text-sm">{ultrasonicDist} cm</strong></span>
                  <span className="text-amber-400 font-mono text-xs">Flood Depth: {50 - ultrasonicDist} cm</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="45"
                  value={ultrasonicDist}
                  onChange={(e) => setUltrasonicDist(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <p className="text-slate-400 font-medium">Echo Flight Time:</p>
                    <p className="text-cyan-400 font-bold font-mono mt-1">
                      {Math.round((ultrasonicDist * 2 / 0.0343))} µs
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <p className="text-slate-400 font-medium">Kinematic Formula:</p>
                    <p className="text-purple-400 font-bold font-mono mt-1">
                      (t × 0.0343) / 2
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <p className="text-slate-400 font-medium">System Alert Status:</p>
                    <p className={`font-bold font-mono mt-1 ${ultrasonicDist < 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {ultrasonicDist < 20 ? 'FLOOD DANGER!' : 'SAFE MARGIN'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module 5: Rain Sensor simulator */}
          {activeModule === 'mod-5' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Rainfall Precipitation Intensity: <strong className="text-cyan-400 font-mono text-sm">{rainIntensity}%</strong></span>
                  <span className="text-slate-400 font-mono text-xs">
                    {rainIntensity < 15 ? 'Bone Dry' : rainIntensity < 45 ? 'Light Drizzle' : rainIntensity < 75 ? 'Moderate Rain' : 'Heavy Storm'}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainIntensity}
                  onChange={(e) => setRainIntensity(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">Analog Output (AO)</span>
                    <p className="text-2xl font-bold font-mono text-cyan-400">
                      {Math.round(1023 - (rainIntensity * 8))} <span className="text-xs text-slate-500">/ 1023</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Voltage: {((1023 - (rainIntensity * 8)) * (5 / 1023)).toFixed(2)} V
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-white">Digital Output (DO - LM393)</span>
                    <p className={`text-2xl font-bold font-mono ${rainIntensity > 40 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {rainIntensity > 40 ? 'LOW (0V - Triggered)' : 'HIGH (+5V - Clear)'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Active-low threshold trip point configured at 40% precipitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Capstone Interactive Link */}
          {isCapstone && (
            <div className="text-center p-6 space-y-4">
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                The Capstone Project features our dedicated full-scale physics and environmental simulation simulator.
              </p>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('flood-sim');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-xl shadow-blue-500/20 cursor-pointer"
              >
                Open Full Screen Capstone Flood Simulator →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
