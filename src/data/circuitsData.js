// Circuit Connection Simulator Data & Rules
// Author: Toshit Kumar

export const CIRCUIT_PRESETS = [
  {
    id: "preset-blink",
    title: "Module 1: LED Blinker Circuit",
    description: "Connect Arduino Digital Pin 13 to LED Anode (+) through 220Ω resistor, and LED Cathode (-) to GND.",
    difficulty: "Beginner",
    requiredConnections: [
      { from: "arduino-d13", to: "led-anode", label: "Pin 13 to LED Anode (+)" },
      { from: "arduino-gnd", to: "led-cathode", label: "GND to LED Cathode (-)" }
    ]
  },
  {
    id: "preset-servo",
    title: "Module 2: SG90 Servo Motor Circuit",
    description: "Connect Servo Signal to PWM Pin 9, VCC to 5V power rail, and GND to Arduino GND.",
    difficulty: "Beginner",
    requiredConnections: [
      { from: "arduino-d9", to: "servo-sig", label: "Pin 9 (~PWM) to Servo Signal (Orange)" },
      { from: "ext-5v", to: "servo-vcc", label: "5V Power to Servo VCC (Red)" },
      { from: "arduino-gnd", to: "servo-gnd", label: "Arduino GND to Servo GND (Brown)" }
    ]
  },
  {
    id: "preset-ultrasonic",
    title: "Module 4: HC-SR04 Ultrasonic Telemetry",
    description: "Wire VCC to 5V, GND to GND, Trig to Pin 9, and Echo to Pin 10.",
    difficulty: "Intermediate",
    requiredConnections: [
      { from: "arduino-5v", to: "hc-vcc", label: "Arduino 5V to HC-SR04 VCC" },
      { from: "arduino-gnd", to: "hc-gnd", label: "Arduino GND to HC-SR04 GND" },
      { from: "arduino-d9", to: "hc-trig", label: "Pin 9 to HC-SR04 Trig" },
      { from: "arduino-d10", to: "hc-echo", label: "Pin 10 to HC-SR04 Echo" }
    ]
  },
  {
    id: "preset-rain",
    title: "Module 5: Rain Sensor Module",
    description: "Wire Rain Sensor AO to Analog Pin A0, VCC to Digital Pin 7 (corrosion pulse), and GND to GND.",
    difficulty: "Intermediate",
    requiredConnections: [
      { from: "arduino-d7", to: "rain-vcc", label: "Pin 7 (Pulsed PWR) to Rain VCC" },
      { from: "arduino-a0", to: "rain-ao", label: "Pin A0 to Rain AO" },
      { from: "arduino-gnd", to: "rain-gnd", label: "Arduino GND to Rain GND" }
    ]
  },
  {
    id: "preset-capstone",
    title: "Capstone: Flood-Safe House Integrated Control Bus",
    description: "Full circuit wiring uniting Arduino UNO, L298N driver, HC-SR04, Rain Sensor, Servo, Limit Switches, and Buzzer.",
    difficulty: "Advanced",
    requiredConnections: [
      { from: "arduino-d9", to: "hc-trig", label: "Pin 9 -> Ultrasonic Trig" },
      { from: "arduino-d10", to: "hc-echo", label: "Pin 10 -> Ultrasonic Echo" },
      { from: "arduino-a0", to: "rain-ao", label: "Pin A0 -> Rain Sensor AO" },
      { from: "arduino-d7", to: "rain-vcc", label: "Pin 7 -> Rain Sensor VCC" },
      { from: "arduino-d5", to: "l298n-ena", label: "Pin 5 (~PWM) -> L298N ENA" },
      { from: "arduino-d3", to: "l298n-in1", label: "Pin 3 -> L298N IN1" },
      { from: "arduino-d4", to: "l298n-in2", label: "Pin 4 -> L298N IN2" },
      { from: "arduino-d6", to: "servo-sig", label: "Pin 6 (~PWM) -> Servo Signal" },
      { from: "arduino-d2", to: "limit-top", label: "Pin 2 (INT0) -> Upper Limit Switch" },
      { from: "arduino-d8", to: "limit-bottom", label: "Pin 8 -> Lower Limit Switch" },
      { from: "arduino-gnd", to: "l298n-gnd", label: "Arduino GND -> L298N GND (Common Ground)" },
      { from: "ext-12v-gnd", to: "l298n-gnd", label: "12V Battery (-) -> L298N GND" },
      { from: "ext-12v-pos", to: "l298n-12v", label: "12V Battery (+) -> L298N 12V Terminal" }
    ]
  }
];

export const CIRCUIT_PINS = [
  // Arduino Pins
  { id: "arduino-5v", device: "Arduino UNO", name: "5V", color: "#ef4444", side: "power" },
  { id: "arduino-gnd", device: "Arduino UNO", name: "GND", color: "#1e293b", side: "power" },
  { id: "arduino-vin", device: "Arduino UNO", name: "VIN", color: "#f97316", side: "power" },
  { id: "arduino-d2", device: "Arduino UNO", name: "D2 (INT0)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d3", device: "Arduino UNO", name: "~D3 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d4", device: "Arduino UNO", name: "D4", color: "#3b82f6", side: "digital" },
  { id: "arduino-d5", device: "Arduino UNO", name: "~D5 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d6", device: "Arduino UNO", name: "~D6 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d7", device: "Arduino UNO", name: "D7", color: "#3b82f6", side: "digital" },
  { id: "arduino-d8", device: "Arduino UNO", name: "D8", color: "#3b82f6", side: "digital" },
  { id: "arduino-d9", device: "Arduino UNO", name: "~D9 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d10", device: "Arduino UNO", name: "~D10 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d11", device: "Arduino UNO", name: "~D11 (PWM)", color: "#3b82f6", side: "digital" },
  { id: "arduino-d12", device: "Arduino UNO", name: "D12", color: "#3b82f6", side: "digital" },
  { id: "arduino-d13", device: "Arduino UNO", name: "D13 (LED)", color: "#3b82f6", side: "digital" },
  { id: "arduino-a0", device: "Arduino UNO", name: "A0", color: "#10b981", side: "analog" },
  { id: "arduino-a1", device: "Arduino UNO", name: "A1", color: "#10b981", side: "analog" },

  // HC-SR04 Pins
  { id: "hc-vcc", device: "HC-SR04", name: "VCC (+5V)", color: "#ef4444" },
  { id: "hc-trig", device: "HC-SR04", name: "Trig", color: "#8b5cf6" },
  { id: "hc-echo", device: "HC-SR04", name: "Echo", color: "#06b6d4" },
  { id: "hc-gnd", device: "HC-SR04", name: "GND", color: "#1e293b" },

  // Rain Sensor Pins
  { id: "rain-vcc", device: "Rain Sensor", name: "VCC", color: "#ef4444" },
  { id: "rain-gnd", device: "Rain Sensor", name: "GND", color: "#1e293b" },
  { id: "rain-ao", device: "Rain Sensor", name: "AO (Analog)", color: "#10b981" },
  { id: "rain-do", device: "Rain Sensor", name: "DO (Digital)", color: "#f59e0b" },

  // L298N Pins
  { id: "l298n-12v", device: "L298N Driver", name: "12V Power (+)", color: "#ef4444" },
  { id: "l298n-gnd", device: "L298N Driver", name: "GND (Common)", color: "#1e293b" },
  { id: "l298n-5v", device: "L298N Driver", name: "5V Logic", color: "#f59e0b" },
  { id: "l298n-ena", device: "L298N Driver", name: "ENA (Speed PWM)", color: "#8b5cf6" },
  { id: "l298n-in1", device: "L298N Driver", name: "IN1 (Lift Dir)", color: "#3b82f6" },
  { id: "l298n-in2", device: "L298N Driver", name: "IN2 (Lower Dir)", color: "#3b82f6" },

  // Servo Pins
  { id: "servo-sig", device: "SG90 Servo", name: "Signal (Orange)", color: "#f97316" },
  { id: "servo-vcc", device: "SG90 Servo", name: "VCC (Red)", color: "#ef4444" },
  { id: "servo-gnd", device: "SG90 Servo", name: "GND (Brown)", color: "#1e293b" },

  // Limit Switches
  { id: "limit-top", device: "Top Limit Sw", name: "Upper Stop Signal", color: "#eab308" },
  { id: "limit-bottom", device: "Bottom Limit Sw", name: "Lower Datum Signal", color: "#06b6d4" },

  // LED & Buzzer
  { id: "led-anode", device: "Test LED", name: "Anode (+)", color: "#ef4444" },
  { id: "led-cathode", device: "Test LED", name: "Cathode (-)", color: "#1e293b" },

  // External 12V Battery
  { id: "ext-12v-pos", device: "12V Battery", name: "(+) 12V DC", color: "#ef4444" },
  { id: "ext-12v-gnd", device: "12V Battery", name: "(-) 0V Ground", color: "#1e293b" },
  { id: "ext-5v", device: "5V Reg Rail", name: "+5V Power Rail", color: "#ef4444" }
];
