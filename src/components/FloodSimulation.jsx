import React, { useState, useEffect, useRef } from 'react';
import { 
  Waves, 
  CloudRain, 
  Play, 
  Square, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ArrowUp, 
  ArrowDown, 
  Sliders 
} from 'lucide-react';
import { playBuzzerAlert, playMotorSound, playClickSound, playSuccessChime } from '../utils/audioEffects';

export default function FloodSimulation() {
  // Environmental sliders
  const [rainIntensity, setRainIntensity] = useState(0); // 0 to 100%
  const [waterLevelCm, setWaterLevelCm] = useState(0); // 0 to 35 cm
  const [systemActive, setSystemActive] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // House elevation state: 0 (ground level) to 100 (fully lifted)
  const [houseElevationPct, setHouseElevationPct] = useState(0);
  const [systemState, setSystemState] = useState('STANDBY_GROUND'); 
  // 'STANDBY_GROUND', 'FLOOD_ALERT', 'LIFTING', 'HOLDING_ELEVATED', 'LOWERING'

  const [servoAngle, setServoAngle] = useState(0); // 0 (locked ground), 90 (unlocked), 180 (locked elevated)
  const [motorState, setMotorState] = useState('OFF'); // 'OFF', 'LIFT_PWM', 'LOWER_PWM'

  // Debounce timer ref for lowering
  const safeCounterRef = useRef(0);

  // Constants
  const DANGER_THRESHOLD = 15.0; // cm
  const SAFE_THRESHOLD = 5.0; // cm
  const MAX_TRAVEL_CM = 25.0;

  // Limit switch trip states
  const hitTopLimit = houseElevationPct >= 100;
  const hitBottomLimit = houseElevationPct <= 0;

  // Main Simulation Physics & State Machine Loop
  useEffect(() => {
    if (!systemActive) {
      setMotorState('OFF');
      return;
    }

    const interval = setInterval(() => {
      // 1. Natural rain water accumulation if rain is active
      if (rainIntensity > 30) {
        setWaterLevelCm((prev) => Math.min(35, prev + (rainIntensity / 100) * 0.4));
      }

      // 2. State Machine Transitions
      if (systemState === 'STANDBY_GROUND') {
        setMotorState('OFF');
        setServoAngle(0);

        if (waterLevelCm >= DANGER_THRESHOLD || (rainIntensity > 60 && waterLevelCm >= DANGER_THRESHOLD * 0.7)) {
          setSystemState('FLOOD_ALERT');
          if (audioEnabled) playBuzzerAlert(0.4);
        }
      } 
      else if (systemState === 'FLOOD_ALERT') {
        setServoAngle(90); // Unlatch foundation
        if (audioEnabled) playBuzzerAlert(0.3);
        setSystemState('LIFTING');
      } 
      else if (systemState === 'LIFTING') {
        if (audioEnabled && Math.random() > 0.6) playMotorSound(0.2);

        if (hitTopLimit) {
          setMotorState('OFF');
          setServoAngle(180); // Lock support pins
          setSystemState('HOLDING_ELEVATED');
          if (audioEnabled) playSuccessChime();
        } else {
          setMotorState('LIFT_PWM (230)');
          setHouseElevationPct((prev) => Math.min(100, prev + 5));
        }
      } 
      else if (systemState === 'HOLDING_ELEVATED') {
        setMotorState('OFF');

        // Check if water receded sustainably
        if (waterLevelCm <= SAFE_THRESHOLD) {
          safeCounterRef.current += 1;
          if (safeCounterRef.current >= 4) {
            // Subsided
            setServoAngle(90); // Retract support locks
            setSystemState('LOWERING');
            safeCounterRef.current = 0;
          }
        } else {
          safeCounterRef.current = 0;
        }
      } 
      else if (systemState === 'LOWERING') {
        if (audioEnabled && Math.random() > 0.6) playMotorSound(0.2);

        if (hitBottomLimit) {
          setMotorState('OFF');
          setServoAngle(0); // Engage ground lock
          setSystemState('STANDBY_GROUND');
        } else {
          setMotorState('LOWER_PWM (175)');
          setHouseElevationPct((prev) => Math.max(0, prev - 4));
        }
      }
    }, 400);

    return () => clearInterval(interval);
  }, [systemActive, rainIntensity, waterLevelCm, systemState, houseElevationPct, hitTopLimit, hitBottomLimit, audioEnabled]);

  // Telemetry derivations
  const ultrasonicDistance = Math.max(5, 45 - waterLevelCm).toFixed(1);
  const rainAO = Math.max(120, Math.round(1023 - (rainIntensity * 8.5)));
  const rainDO = rainIntensity > 40 ? 'LOW (ACTIVE)' : 'HIGH (CLEAR)';

  const handleManualWaterChange = (val) => {
    setWaterLevelCm(Number(val));
  };

  const handleReset = () => {
    playClickSound();
    setRainIntensity(0);
    setWaterLevelCm(0);
    setHouseElevationPct(0);
    setSystemState('STANDBY_GROUND');
    setMotorState('OFF');
    setServoAngle(0);
    safeCounterRef.current = 0;
  };

  const handleEmergencyStop = () => {
    playClickSound();
    setSystemActive(!systemActive);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Capstone Mechatronic Flood Simulation</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time physics and telemetry loop simulating rainfall, ultrasonic depth sensing, rack-and-pinion lifting, and safety interlocks.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              audioEnabled ? 'bg-cyan-950/40 border-cyan-800/40 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Audio Buzzer & Motor Sound"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{audioEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          <button
            onClick={handleEmergencyStop}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              systemActive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {systemActive ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{systemActive ? 'E-STOP / HALT' : 'RESUME SYSTEM'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer"
            title="Reset Simulation Environment"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport & Controls Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Canvas/SVG Graphical Simulation */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl relative min-h-[460px]">
          {/* Sky / Environment Backdrop */}
          <div className="p-4 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/40">
            {/* Annunciator Panel */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status LEDs:</span>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                {/* Red LED */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      systemState === 'FLOOD_ALERT' || systemState === 'LIFTING'
                        ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-ping'
                        : 'bg-red-950 border border-red-900/60'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">DANGER</span>
                </div>
                {/* Green LED */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      systemState === 'STANDBY_GROUND' || systemState === 'HOLDING_ELEVATED'
                        ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]'
                        : 'bg-emerald-950 border border-emerald-900/60'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">SAFE</span>
                </div>
                {/* Blue LED */}
                <div className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      systemState === 'LOWERING'
                        ? 'bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,1)] animate-pulse'
                        : 'bg-blue-950 border border-blue-900/60'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">LOWER</span>
                </div>
              </div>
            </div>

            {/* State Pill */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                systemState === 'FLOOD_ALERT' || systemState === 'LIFTING'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : systemState === 'HOLDING_ELEVATED'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : systemState === 'LOWERING'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {systemState}
              </span>
            </div>
          </div>

          {/* SVG Animated Scenery */}
          <div className="relative flex-1 flex items-end justify-center px-8 pb-4 pt-10 overflow-hidden">
            {/* Rain Drops Animation */}
            {rainIntensity > 10 && (
              <div className="absolute inset-0 pointer-events-none opacity-60">
                {[...Array(Math.min(40, Math.floor(rainIntensity / 2.5)))].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-cyan-300 w-0.5 h-6 rounded-full animate-pulse"
                    style={{
                      left: `${(i * 17) % 95}%`,
                      top: `${(i * 23) % 80}%`,
                      transform: 'rotate(15deg)',
                      animationDuration: '0.4s',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Ultrasonic Sensor Beam Overhead */}
            <div className="absolute top-4 left-12 flex flex-col items-center">
              <div className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[9px] font-mono text-cyan-300 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                HC-SR04: {ultrasonicDistance} cm
              </div>
              {/* Ultrasonic Wave Cone */}
              <div
                className="w-16 border-l-2 border-r-2 border-dashed border-cyan-400/40 pointer-events-none transition-all duration-300"
                style={{ height: `${Math.max(20, 160 - waterLevelCm * 3.5)}px` }}
              />
            </div>

            {/* Upper Limit Switch Visual Contact */}
            <div className="absolute top-20 right-14 flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                hitTopLimit ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}>
                TOP LIMIT SW: {hitTopLimit ? 'TRIPPED (INT0)' : 'OPEN'}
              </span>
            </div>

            {/* Lower Limit Switch Visual Contact */}
            <div className="absolute bottom-20 right-14 flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                hitBottomLimit ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}>
                BASE DATUM SW: {hitBottomLimit ? 'ENGAGED' : 'RELEASED'}
              </span>
            </div>

            {/* Smart House Structure Container (Elevates dynamically) */}
            <div
              className="relative z-20 flex flex-col items-center transition-all duration-300 ease-out"
              style={{ transform: `translateY(-${houseElevationPct * 1.5}px)` }}
            >
              {/* Scaled House Roof & Structure */}
              <div className="w-56 bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-4 shadow-2xl relative">
                {/* Pitched Roof */}
                <div className="w-full h-8 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 rounded-t-xl -mt-6 border-t-2 border-cyan-400 flex items-center justify-between px-3">
                  <span className="text-[8px] font-bold text-white uppercase tracking-wider">SMART RESIDENCE</span>
                  {/* Rain Sensor Plate on Roof */}
                  <div className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold flex items-center gap-1 ${
                    rainIntensity > 30 ? 'bg-cyan-400 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <CloudRain className="w-2.5 h-2.5" />
                    FC-37
                  </div>
                </div>

                {/* Windows & Door */}
                <div className="grid grid-cols-3 gap-2 my-2">
                  <div className="h-10 bg-cyan-950/60 border border-cyan-500/30 rounded flex items-center justify-center">
                    <div className="w-6 h-6 border-b border-r border-cyan-500/40" />
                  </div>
                  <div className="h-12 bg-amber-950/60 border border-amber-500/40 rounded-t-md mx-auto w-8 flex items-center justify-center mt-auto">
                    <div className="w-1 h-1 rounded-full bg-amber-400 ml-auto mr-1" />
                  </div>
                  <div className="h-10 bg-cyan-950/60 border border-cyan-500/30 rounded flex items-center justify-center">
                    <div className="w-6 h-6 border-b border-r border-cyan-500/40" />
                  </div>
                </div>

                {/* Auxiliary Servo Safety Latch Arm */}
                <div className="mt-1 pt-1 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-slate-400">Servo Lock:</span>
                  <span className={`font-bold ${servoAngle === 180 ? 'text-emerald-400' : servoAngle === 90 ? 'text-amber-400' : 'text-blue-400'}`}>
                    {servoAngle === 180 ? 'LOCK ENGAGED (180°)' : servoAngle === 90 ? 'UNLATCHED (90°)' : 'BASE LOCK (0°)'}
                  </span>
                </div>
              </div>

              {/* Scissor / Lead-Screw Lifting Stilts (Expand as house rises) */}
              <div
                className="w-48 flex justify-between border-l-4 border-r-4 border-slate-600 transition-all duration-300"
                style={{ height: `${Math.max(12, houseElevationPct * 1.5)}px` }}
              >
                <div className="w-full flex items-center justify-center text-[9px] font-mono text-cyan-400/80">
                  {houseElevationPct > 10 && `▲ ${(houseElevationPct * 0.25).toFixed(1)} cm ELEVATED`}
                </div>
              </div>
            </div>

            {/* Rising Floodwater Surface */}
            <div
              className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-blue-700/80 via-cyan-600/60 to-blue-500/70 backdrop-blur-sm z-30 transition-all duration-300 border-t-2 border-cyan-300"
              style={{ height: `${Math.min(180, waterLevelCm * 5)}px` }}
            >
              {/* Animated Wave Ripples */}
              <div className="w-full h-2 bg-cyan-300/40 animate-pulse" />
              <div className="p-2 text-right">
                <span className="text-[10px] font-mono font-bold text-white bg-blue-900/80 px-2 py-0.5 rounded shadow">
                  WATER DEPTH: {waterLevelCm.toFixed(1)} cm
                </span>
              </div>
            </div>

            {/* Concrete Ground Foundation */}
            <div className="absolute left-0 right-0 bottom-0 h-6 bg-slate-900 border-t-2 border-slate-700 z-10 flex items-center justify-center">
              <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">
                DATUM BASE FOUNDATION SLAB (0.0 cm)
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Interactive Telemetry & Adjustment Controls */}
        <div className="space-y-6">
          {/* Sliders Box */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Environmental Flood Adjustments
            </h4>

            {/* Water Level Slider */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex justify-between">
                <span>Flood Water Level:</span>
                <span className="font-mono text-cyan-400 font-bold">{waterLevelCm.toFixed(1)} cm</span>
              </label>
              <input
                type="range"
                min="0"
                max="35"
                step="0.5"
                value={waterLevelCm}
                onChange={(e) => handleManualWaterChange(e.target.value)}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0cm (Dry)</span>
                <span className="text-emerald-400">5cm (Safe)</span>
                <span className="text-red-400">15cm (Danger)</span>
                <span>35cm (Peak)</span>
              </div>
            </div>

            {/* Rainfall Intensity Slider */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-300 flex justify-between">
                <span>Rainfall Intensity:</span>
                <span className="font-mono text-blue-400 font-bold">{rainIntensity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={rainIntensity}
                onChange={(e) => setRainIntensity(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% Clear</span>
                <span>50% Moderate</span>
                <span>100% Monsoon</span>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry HUD */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" />
              Live Telemetry HUD
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">HC-SR04 Air Distance:</span>
                <span className="font-bold text-white">{ultrasonicDistance} cm</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Calculated Flood Depth:</span>
                <span className={`font-bold ${waterLevelCm >= DANGER_THRESHOLD ? 'text-red-400' : 'text-emerald-400'}`}>
                  {waterLevelCm.toFixed(1)} cm
                </span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Rain Sensor (AO / DO):</span>
                <span className="font-bold text-cyan-400">{rainAO} / {rainDO}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">L298N Lifting Motor:</span>
                <span className="font-bold text-amber-400">{motorState}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">SG90 Auxiliary Lock:</span>
                <span className="font-bold text-purple-400">{servoAngle}° ({servoAngle === 180 ? 'Secured' : 'Unlocked'})</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Upper Limit Switch:</span>
                <span className={`font-bold ${hitTopLimit ? 'text-amber-400' : 'text-slate-500'}`}>
                  {hitTopLimit ? 'ENGAGED' : 'CLEAR'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
