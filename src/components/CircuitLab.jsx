import React, { useState } from 'react';
import { Cable, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Check, Trash2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CIRCUIT_PRESETS, CIRCUIT_PINS } from '../data/circuitsData';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export default function CircuitLab({ onCircuitCompleted, completedCircuits }) {
  const [selectedPresetId, setSelectedPresetId] = useState('preset-blink');
  const [activeConnections, setActiveConnections] = useState([]);
  const [selectedSourcePin, setSelectedSourcePin] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const currentPreset = CIRCUIT_PRESETS.find((p) => p.id === selectedPresetId) || CIRCUIT_PRESETS[0];

  const handlePinClick = (pin) => {
    playClickSound();
    if (!selectedSourcePin) {
      setSelectedSourcePin(pin);
    } else {
      if (selectedSourcePin.id === pin.id) {
        setSelectedSourcePin(null);
        return;
      }
      // Add connection
      const newConn = {
        from: selectedSourcePin.id,
        to: pin.id,
        fromName: `${selectedSourcePin.device} [${selectedSourcePin.name}]`,
        toName: `${pin.device} [${pin.name}]`,
        color: selectedSourcePin.color || '#3b82f6',
      };

      // Check if already connected
      const exists = activeConnections.some(
        (c) => (c.from === newConn.from && c.to === newConn.to) || (c.from === newConn.to && c.to === newConn.from)
      );

      if (!exists) {
        setActiveConnections([...activeConnections, newConn]);
        setValidationResult(null);
      }
      setSelectedSourcePin(null);
    }
  };

  const handleRemoveConnection = (index) => {
    playClickSound();
    const updated = [...activeConnections];
    updated.splice(index, 1);
    setActiveConnections(updated);
    setValidationResult(null);
  };

  const handleValidate = () => {
    playClickSound();
    const req = currentPreset.requiredConnections;
    let missing = [];

    req.forEach((r) => {
      const match = activeConnections.some(
        (c) => (c.from === r.from && c.to === r.to) || (c.from === r.to && c.to === r.from)
      );
      if (!match) {
        missing.push(r.label);
      }
    });

    if (missing.length === 0) {
      playSuccessChime();
      confetti({ particleCount: 70, spread: 60 });
      setValidationResult({
        success: true,
        message: 'Wiring Validated! All electrical paths and logic pins are correctly assigned and safe to power.',
      });
      onCircuitCompleted(currentPreset.id);
    } else {
      setValidationResult({
        success: false,
        message: `Circuit Incomplete or Incorrect. Missing ${missing.length} mandatory connection(s):`,
        missingList: missing,
      });
    }
  };

  const handleAutoWire = () => {
    playClickSound();
    const autoConns = currentPreset.requiredConnections.map((r) => {
      const p1 = CIRCUIT_PINS.find((p) => p.id === r.from);
      const p2 = CIRCUIT_PINS.find((p) => p.id === r.to);
      return {
        from: r.from,
        to: r.to,
        fromName: p1 ? `${p1.device} [${p1.name}]` : r.from,
        toName: p2 ? `${p2.device} [${p2.name}]` : r.to,
        color: p1?.color || '#3b82f6',
      };
    });
    setActiveConnections(autoConns);
    setValidationResult({
      success: true,
      message: 'Reference schematic loaded! Review each wire path to study proper pin assignments.',
    });
    onCircuitCompleted(currentPreset.id);
  };

  const handleClear = () => {
    playClickSound();
    setActiveConnections([]);
    setSelectedSourcePin(null);
    setValidationResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header & Preset Selector */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cable className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Interactive Circuit Connection Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build and validate virtual wiring connections between Arduino UNO, sensors, motor drivers, and power supplies.
          </p>
        </div>

        {/* Preset Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Preset:</span>
          <select
            value={selectedPresetId}
            onChange={(e) => {
              playClickSound();
              setSelectedPresetId(e.target.value);
              setActiveConnections([]);
              setValidationResult(null);
            }}
            className="bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-xs rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-cyan-400"
          >
            {CIRCUIT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Objective Banner */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Wiring Challenge</span>
          <p className="text-xs font-semibold text-white">{currentPreset.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoWire}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Show Reference Circuit</span>
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 rounded-xl text-xs cursor-pointer"
            title="Clear all wires"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pin Connection Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pins Grid */}
        <div className="lg:col-span-2 bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Select Two Pins to Connect with Jumper Wire</h3>
            {selectedSourcePin && (
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40 animate-pulse">
                Wire Started at: {selectedSourcePin.device} [{selectedSourcePin.name}]
              </span>
            )}
          </div>

          {/* Grouped by Device */}
          {['Arduino UNO', 'HC-SR04', 'Rain Sensor', 'L298N Driver', 'SG90 Servo', '12V Battery', 'Test LED', 'Top Limit Sw', 'Bottom Limit Sw'].map((device) => {
            const devPins = CIRCUIT_PINS.filter((p) => p.device === device);
            if (devPins.length === 0) return null;
            return (
              <div key={device} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2">
                <span className="text-xs font-bold text-slate-300">{device}</span>
                <div className="flex flex-wrap gap-2">
                  {devPins.map((pin) => {
                    const isSource = selectedSourcePin?.id === pin.id;
                    const isConnected = activeConnections.some((c) => c.from === pin.id || c.to === pin.id);
                    return (
                      <button
                        key={pin.id}
                        onClick={() => handlePinClick(pin)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSource
                            ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-105'
                            : isConnected
                            ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: pin.color || '#3b82f6' }}
                        />
                        <span>{pin.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Active Wires & Validation */}
        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Active Jumper Wires ({activeConnections.length})</h4>
              <button
                onClick={handleValidate}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Test My Wiring</span>
              </button>
            </div>

            {/* Validation Feedback Alert */}
            {validationResult && (
              <div
                className={`p-4 rounded-xl text-xs border space-y-2 ${
                  validationResult.success
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-950/20 border-red-500/30 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {validationResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span>{validationResult.message}</span>
                </div>
                {validationResult.missingList && (
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-red-200">
                    {validationResult.missingList.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Active Connections List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {activeConnections.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                  No wires connected yet. Click any pin on the left to start routing a jumper wire.
                </div>
              ) : (
                activeConnections.map((conn, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: conn.color }} />
                      <span className="text-slate-300 truncate">{conn.fromName}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="text-cyan-400 truncate">{conn.toName}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveConnection(idx)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                      title="Disconnect wire"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <strong className="text-white">Safety Check:</strong> Common ground (GND) is essential between external motor batteries and Arduino to provide a uniform reference potential.
          </div>
        </div>
      </div>
    </div>
  );
}
