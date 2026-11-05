import React, { useState } from 'react';
import { Cpu, RotateCw, Gauge, Activity, CloudRain, Info, Zap, Shield, HelpCircle } from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';

export default function ComponentExplorer() {
  const [activeComponent, setActiveComponent] = useState('uno'); // 'uno', 'servo', 'l298n', 'ultrasonic', 'rain'
  const [selectedPin, setSelectedPin] = useState('D9');

  const arduinoPins = [
    { pin: 'D0 (RX)', category: 'digital', alt: 'UART Serial RX', desc: 'Hardware Serial Receive. Connected to USB-to-UART bridge. Leave free during sketch upload.' },
    { pin: 'D1 (TX)', category: 'digital', alt: 'UART Serial TX', desc: 'Hardware Serial Transmit. Connected to USB-to-UART bridge. Leave free during sketch upload.' },
    { pin: 'D2', category: 'digital', alt: 'External Interrupt INT0', desc: 'Digital I/O pin with sub-microsecond hardware interrupt trigger. Ideal for upper limit switch.' },
    { pin: '~D3', category: 'pwm', alt: 'PWM / INT1', desc: '8-bit Pulse Width Modulation output (~490 Hz) and external hardware interrupt INT1.' },
    { pin: 'D4', category: 'digital', alt: 'Digital I/O', desc: 'Standard 5V digital input/output pin. Configured as L298N IN2 direction control.' },
    { pin: '~D5', category: 'pwm', alt: 'PWM Output', desc: '8-bit Pulse Width Modulation (~980 Hz) used for L298N ENA motor speed duty cycle.' },
    { pin: '~D6', category: 'pwm', alt: 'PWM Output', desc: '8-bit Pulse Width Modulation (~980 Hz) used for SG90 servo motor control pulse.' },
    { pin: 'D7', category: 'digital', alt: 'Digital I/O', desc: 'Standard digital pin used for corrosion-safe pulsed power delivery to the Rain Sensor.' },
    { pin: 'D8', category: 'digital', alt: 'Digital I/O', desc: 'Digital input connected to the bottom mechanical limit switch datum sensor.' },
    { pin: '~D9', category: 'pwm', alt: 'PWM Output', desc: '8-bit PWM (~490 Hz) wired to HC-SR04 Ultrasonic Trigger line for 10µs bursts.' },
    { pin: '~D10', category: 'pwm', alt: 'PWM / SPI SS', desc: 'PWM output and SPI Slave Select line. Configured as HC-SR04 Echo input.' },
    { pin: '~D11', category: 'pwm', alt: 'PWM / SPI MOSI', desc: 'PWM output and SPI Master Out Slave In. Connects to Red Flood Alert LED.' },
    { pin: 'D12', category: 'digital', alt: 'SPI MISO', desc: 'SPI Master In Slave Out. Connects to Green Safe Standby LED.' },
    { pin: 'D13', category: 'digital', alt: 'SPI SCK / Test LED', desc: 'SPI Serial Clock tied in parallel with the onboard surface-mount test LED.' },
    { pin: 'A0', category: 'analog', alt: '10-bit ADC / D14', desc: 'Analog input reading Rain Sensor resistance voltage (0 to 1023 discrete steps).' },
    { pin: 'A1', category: 'analog', alt: '10-bit ADC / D15', desc: 'Analog input or general digital output. Drives the 5V Active Alert Buzzer.' },
    { pin: 'A2', category: 'analog', alt: '10-bit ADC / D16', desc: 'Analog input reading 0V to 5V DC at 4.88mV resolution.' },
    { pin: 'A3', category: 'analog', alt: '10-bit ADC / D17', desc: 'Analog input channel 3.' },
    { pin: 'A4', category: 'analog', alt: 'I2C SDA / D18', desc: 'Analog input or I2C Serial Data bus line for connecting OLED displays or RTCs.' },
    { pin: 'A5', category: 'analog', alt: 'I2C SCL / D19', desc: 'Analog input or I2C Serial Clock bus line.' },
    { pin: '5V', category: 'power', alt: 'Regulated +5V Out', desc: 'Supplies regulated +5V DC from USB or onboard linear regulator (max 500mA).' },
    { pin: '3.3V', category: 'power', alt: 'Regulated +3.3V Out', desc: 'Ultra-low-noise 3.3V rail powered by onboard LP2985-33 regulator (max 50mA).' },
    { pin: 'GND', category: 'power', alt: '0V System Ground', desc: 'Common electrical reference potential. All sensors, drivers, and MCU must share ground.' },
    { pin: 'VIN', category: 'power', alt: 'Unregulated DC In', desc: 'Accepts 7V to 12V DC from external battery, feeding the onboard NCP1117 regulator.' },
  ];

  const currentPinData = arduinoPins.find((p) => p.pin.replace('~', '') === selectedPin.replace('~', '')) || arduinoPins[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Component Picker */}
      <div className="flex flex-wrap gap-2 bg-[#111827] p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'uno', name: 'Arduino UNO R3', icon: Cpu },
          { id: 'servo', name: 'SG90 Servo Motor', icon: RotateCw },
          { id: 'l298n', name: 'L298N Motor Driver', icon: Gauge },
          { id: 'ultrasonic', name: 'HC-SR04 Ultrasonic', icon: Activity },
          { id: 'rain', name: 'FC-37 Rain Sensor', icon: CloudRain },
        ].map((c) => {
          const Icon = c.icon;
          const isActive = activeComponent === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                playClickSound();
                setActiveComponent(c.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* ARDUINO UNO EXPLORER */}
      {activeComponent === 'uno' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Visual Board (2 Cols) */}
          <div className="lg:col-span-2 bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Interactive Arduino UNO R3 Header Pinout Map
              </h3>
              <span className="text-[11px] text-slate-400">Click any pin to inspect electrical traits</span>
            </div>

            {/* Visual Arduino Layout */}
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800/80 relative">
              {/* Top Digital Header Pins */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Digital I/O & PWM Header (~Pins)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {arduinoPins.filter((p) => p.category === 'digital' || p.category === 'pwm').map((p) => {
                    const isSelected = selectedPin === p.pin;
                    return (
                      <button
                        key={p.pin}
                        onClick={() => {
                          playClickSound();
                          setSelectedPin(p.pin);
                        }}
                        className={`px-2 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950 scale-105 shadow-md shadow-cyan-400/30'
                            : p.category === 'pwm'
                            ? 'bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/60'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {p.pin}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Center Board IC / Visual */}
              <div className="my-8 py-8 px-6 bg-blue-950/20 border border-blue-900/40 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-slate-900 border-2 border-slate-700 rounded-md flex items-center justify-center font-mono text-[10px] text-slate-400">
                    USB-B
                  </div>
                  <div className="w-12 h-12 bg-slate-900 border-2 border-slate-700 rounded-md flex items-center justify-center font-mono text-[10px] text-slate-400">
                    DC 2.1mm
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Core Microcontroller</span>
                  <span className="text-xs font-mono font-bold text-white">ATmega328P-PU (16MHz)</span>
                  <span className="text-[10px] text-cyan-400 block mt-0.5">32KB Flash | 2KB SRAM</span>
                </div>

                <div className="text-right font-mono text-[11px] text-slate-400">
                  <p>Operating: <strong className="text-white">5.0V</strong></p>
                  <p>Clock: <strong className="text-cyan-400">16.0 MHz</strong></p>
                </div>
              </div>

              {/* Bottom Analog & Power Header Pins */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Power & Voltage Rail Pins
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {arduinoPins.filter((p) => p.category === 'power').map((p) => {
                      const isSelected = selectedPin === p.pin;
                      return (
                        <button
                          key={p.pin}
                          onClick={() => {
                            playClickSound();
                            setSelectedPin(p.pin);
                          }}
                          className={`px-2 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 scale-105 shadow-md shadow-amber-400/30'
                              : 'bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/60'
                          }`}
                        >
                          {p.pin}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Analog Input Pins (10-bit ADC)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {arduinoPins.filter((p) => p.category === 'analog').map((p) => {
                      const isSelected = selectedPin === p.pin;
                      return (
                        <button
                          key={p.pin}
                          onClick={() => {
                            playClickSound();
                            setSelectedPin(p.pin);
                          }}
                          className={`px-2 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950 scale-105 shadow-md shadow-emerald-400/30'
                              : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/60'
                          }`}
                        >
                          {p.pin}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Selected Pin Detail Card */}
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pin Diagnostics</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentPinData.category === 'pwm'
                    ? 'bg-purple-500/10 text-purple-400'
                    : currentPinData.category === 'analog'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : currentPinData.category === 'power'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {currentPinData.category.toUpperCase()}
                </span>
              </div>

              <h4 className="text-2xl font-black text-white font-mono">
                {currentPinData.pin}
              </h4>
              <p className="text-xs font-bold text-cyan-400">
                Alternate Role: {currentPinData.alt}
              </p>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentPinData.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Logic High Voltage:</span>
                  <span className="font-mono text-white font-semibold">+5.0 V DC</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Logic Low Voltage:</span>
                  <span className="font-mono text-white font-semibold">0.0 V DC (GND)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Max Sinking/Sourcing:</span>
                  <span className="font-mono text-amber-400 font-semibold">20 mA (40 mA abs max)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Internal Pullup:</span>
                  <span className="font-mono text-white font-semibold">20kΩ to 50kΩ</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl text-[11px] text-blue-300">
              <strong className="text-white">Pro Tip:</strong> Never draw motor power from digital pins; always switch through an H-Bridge driver like the L298N.
            </div>
          </div>
        </div>
      )}

      {/* OTHER COMPONENTS EXPLORER */}
      {activeComponent !== 'uno' && (
        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6">
          {activeComponent === 'servo' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-cyan-400" />
                SG90 9g Micro Servo Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <p><strong>Operating Voltage:</strong> 4.8V to 6.0V DC</p>
                  <p><strong>Stall Torque:</strong> 1.8 kg·cm (at 4.8V)</p>
                  <p><strong>Operating Speed:</strong> 0.1 s/60 degrees (at 4.8V)</p>
                  <p><strong>Current Consumption:</strong> 10-20mA idle, 650-800mA stall spike</p>
                  <p><strong>Control Frequency:</strong> 50 Hz PWM (20ms total period)</p>
                  <p><strong>Pulse Duration:</strong> 1.0ms (0°) to 2.0ms (180°)</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">Pinout Wiring:</h4>
                  <p><span className="text-amber-500 font-mono font-bold">Orange / Yellow:</span> PWM Signal (Pin 6)</p>
                  <p><span className="text-red-500 font-mono font-bold">Red:</span> VCC (+5V from external supply)</p>
                  <p><span className="text-amber-800 font-mono font-bold">Brown / Black:</span> GND (Common Ground)</p>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'l298n' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-400" />
                L298N Dual H-Bridge Motor Driver Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <p><strong>Driver Chip:</strong> L298N Dual Full-Bridge Driver</p>
                  <p><strong>Motor Supply Voltage (Vs):</strong> +5V to +35V DC</p>
                  <p><strong>Logic Supply Voltage (Vss):</strong> +5V to +7V DC</p>
                  <p><strong>Peak Output Current:</strong> 2.0A per channel</p>
                  <p><strong>Maximum Power Dissipation:</strong> 25W (with heatsink)</p>
                  <p><strong>Protection:</strong> Onboard freewheeling flyback protection diodes</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">Screw Terminals & Jumpers:</h4>
                  <p><strong className="text-cyan-400">12V Power:</strong> External battery positive terminal</p>
                  <p><strong className="text-white">GND:</strong> Common ground shared with Arduino and battery</p>
                  <p><strong className="text-purple-400">ENA / ENB:</strong> Speed PWM duty cycle inputs</p>
                  <p><strong className="text-blue-400">IN1 / IN2:</strong> Motor A direction logic</p>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'ultrasonic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                HC-SR04 Ultrasonic Distance Sensor Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <p><strong>Operating Voltage:</strong> 5.0V DC</p>
                  <p><strong>Operating Current:</strong> 15 mA</p>
                  <p><strong>Acoustic Frequency:</strong> 40 kHz</p>
                  <p><strong>Effective Measuring Range:</strong> 2 cm to 400 cm</p>
                  <p><strong>Measuring Angle:</strong> 15 degrees conical beam</p>
                  <p><strong>Trigger Input Pulse:</strong> 10 µs TTL pulse</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">Pinout Summary:</h4>
                  <p><strong className="text-red-400">VCC:</strong> +5V DC</p>
                  <p><strong className="text-purple-400">Trig:</strong> Microcontroller trigger input (Pin 9)</p>
                  <p><strong className="text-cyan-400">Echo:</strong> Round-trip pulse width output (Pin 10)</p>
                  <p><strong className="text-slate-400">GND:</strong> 0V Ground reference</p>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'rain' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-teal-400" />
                FC-37 / YL-83 Rain Sensor Module Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <p><strong>Operating Voltage:</strong> 3.3V to 5.0V DC</p>
                  <p><strong>Comparator IC:</strong> LM393 Dual Differential Voltage Comparator</p>
                  <p><strong>Plate Dimensions:</strong> 5.0 cm × 4.0 cm nickel-plated PCB</p>
                  <p><strong>Output Channels:</strong> Analog Output (AO) & Digital Output (DO)</p>
                  <p><strong>Sensitivity:</strong> Onboard multi-turn trimming potentiometer</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">Pin Connections:</h4>
                  <p><strong className="text-red-400">VCC:</strong> Arduino Pin 7 (pulsed power for corrosion protection)</p>
                  <p><strong className="text-emerald-400">AO:</strong> Analog Pin A0 (moisture level 0 to 1023)</p>
                  <p><strong className="text-amber-400">DO:</strong> Digital Pin 2 (threshold trigger)</p>
                  <p><strong className="text-slate-400">GND:</strong> Arduino GND</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
