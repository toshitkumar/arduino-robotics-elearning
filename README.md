# Arduino Robotics – Interactive Learning & Flood-Safe Smart House

**Author & Project Designer:** Toshit Kumar  
**Project Type:** Interactive STEM E-Learning / Embedded Systems & Robotics  
**Platform:** Responsive Web Application (React 19 + Vite + Tailwind CSS)  
**Live Website:** [https://toshitkumar.github.io/arduino-robotics-elearning/](https://toshitkumar.github.io/arduino-robotics-elearning/)  
**Deployment:** GitHub Pages via GitHub Actions CI/CD  
**Documentation:** Downloadable Professional PDF Curriculum Manual  

---

## 🌟 Executive Overview

**Arduino Robotics & Flood-Safe Smart House** is a state-of-the-art interactive e-learning platform developed by **Toshit Kumar**. Combining the instructional rigor of tools like Articulate Rise/Storyline 360 with modern full-stack web engineering, the curriculum guides students from foundational microcontroller architecture to building an intelligent, automated flood-protection architectural system.

The curriculum covers five core hardware modules:
1. **Arduino UNO (ATmega328P)** – Architecture, registers, PWM, ADC, and the execution lifecycle of `setup()` and `loop()`.
2. **Servo Motor (SG90 / MG995)** – Closed-loop potentiometer feedback, 50Hz PWM pulse train protocol, and foundation safety locks.
3. **Motor Driver (L298N Dual H-Bridge)** – Inductive back-EMF mitigation, flyback diodes, common ground topologies, and bidirectional rack-and-pinion vertical lifting.
4. **Ultrasonic Sensor (HC-SR04)** – 40kHz acoustic echolocation, Time-of-Flight (ToF) kinematics, temperature compensation, and liquid level profiling.
5. **Rain Sensor Module (FC-37 / YL-83)** – Resistive nickel PCB tracks, LM393 dual comparator, AO/DO calibration, and software-pulsed galvanic corrosion prevention.

The course culminates in the **Flood-Safe Smart House Capstone Project**: an automated vertical house lifting system powered by Arduino UNO that dynamically elevates a residential structure above ground level when rising monsoon floodwaters and torrential precipitation are verified by dual-sensor telemetry.

---

## 🚀 Key Interactive Learning Features

### 1. 🔍 Interactive Component Explorer
- Clickable visual **Arduino UNO R3** header pinout map.
- Inspect alternate hardware roles: Hardware UART, SPI, I2C, 8-bit PWM, Hardware Interrupts (INT0/INT1), ADC voltage resolutions, maximum current limits, and electrical protection rules.
- Hardware spec viewers for **L298N**, **HC-SR04**, **Rain Sensor**, and **SG90 Servo**.

### 2. 🔌 Virtual Circuit Connection Simulator (Circuit Lab)
- Interactive breadboard and component wiring interface.
- Draw color-coded jumper wires between Arduino, sensors, motor driver, limit switches, and external 12V batteries.
- Real-time **Wiring Validation Engine**: Detects short circuits, missing common ground, floating gate pins, and wrong PWM channels with plain-English engineering diagnostics.
- Reference schematics for all 5 modules and the integrated Capstone project.

### 3. 💻 Arduino IDE Code Playground
- Embedded syntax-highlighted Arduino code editor with one-click copy and verify capabilities.
- **Line-by-Line Mechanics Inspector**: Click any C++ instruction to inspect its register-level role.
- **Simulated Serial Monitor**: Selectable baud rates (9600 / 115200) streaming real-time mock telemetry matching active sketch algorithms.

### 4. 🌊 Capstone Mechatronic Flood Simulator
- Full 2D physics simulation with animated rain particles, turbulent floodwater waves, and an elevating house chassis mounted on mechanical lifting stilts.
- Realistic **Web Audio API synthesizer** generating authentic 85dB alert buzzer alarm beeps and motor hum frequencies.
- Active upper and lower mechanical limit switches with sub-millisecond motor cutoff.
- LED status indicators: **Red** (Danger / Lifting), **Green** (Safe Standby / Holding), and **Blue** (Lowering).
- Auxiliary SG90 servo deploying mechanical foundation and summit support locks.
- Live Telemetry HUD: Real-time ultrasonic air distance, water depth, rain AO/DO, motor state, and debounce hysteresis countdown.

### 5. 🎯 Scenario-Based Decision Challenges
Five realistic engineering decision scenarios:
1. *Rain starts but water level remains safe (False alarm avoidance).*
2. *Water level suddenly surges past critical threshold (Rapid lifting & alarm sequence).*
3. *Ultrasonic sensor detects erratic distance during water waves (Median filtering).*
4. *House reaches its upper lifting limit (End-stop interrupt & stall prevention).*
5. *Water level returns to normal (Hysteresis debounce & soft landing).*

### 6. 📝 Assessment & Certification Center
- **60 Comprehensive MCQs**: 10 rigorous multiple-choice questions per module (50 MCQs) + 10 Capstone questions.
- Drag-and-drop Component Role Matcher.
- Progress and score tracking persisted across sessions via `localStorage`.
- **Accredited Course Completion Certificate**: Personalized with student name, verified test score percentage, issuance date, and the credentials of Lead Robotics Engineer **Toshit Kumar**.

### 7. 📄 Printable PDF Curriculum Guide
- Built-in PDF generator utilizing `jspdf` and `jspdf-autotable`.
- Professional dark cover, Table of Contents, complete pinout tables, full Arduino C++ source code, Bill of Materials, troubleshooting matrix, and the watermark on every page:  
  **`Created by Toshit Kumar`**

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19 (Hooks, Context, State Machines) |
| **Build Tool** | Vite 8 + `@tailwindcss/vite` |
| **Styling & Theme** | Tailwind CSS v4 (Dark Navy `#0b0f19` & Electric Blue `#3b82f6`) |
| **Audio Synthesis** | Web Audio API (Square & Sawtooth Wave Oscillators) |
| **Document Generation** | jsPDF + jspdf-autotable |
| **Icons & Effects** | Lucide React + Canvas Confetti |
| **Persistence** | Browser `localStorage` (Offline-capable) |
| **Deployment** | GitHub Actions + GitHub Pages |

---

## 📦 Project Structure

```text
arduino-robotics-elearning/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD pipeline
├── public/
│   └── favicon.svg             # Robot chip vector favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header, brand, progress bar, PDF export
│   │   ├── Sidebar.jsx         # SparkCircuit-inspired dark navy navigation
│   │   ├── Dashboard.jsx       # Overview, stat cards, progress bar charts
│   │   ├── ModuleViewer.jsx    # Modules 1-5 & Capstone deep-dive learning
│   │   ├── ComponentExplorer.jsx # Clickable interactive Arduino UNO board & specs
│   │   ├── CircuitLab.jsx      # Virtual jumper wire routing & validation
│   │   ├── CodePlayground.jsx  # IDE, line breakdown & Serial Monitor
│   │   ├── FloodSimulation.jsx # Capstone interactive physics & audio simulation
│   │   ├── ScenarioExercises.jsx # 5 branching real-world decision trees
│   │   ├── AssessmentCenter.jsx  # 60 MCQs, component matcher & certificate
│   │   ├── PdfDocumentation.jsx # In-app preview & PDF download
│   │   └── Resources.jsx       # BOM table & downloadable .ino sketches
│   ├── data/
│   │   ├── courseData.js       # Complete curriculum text, pin tables & code
│   │   ├── scenariosData.js    # 5 decision challenges & rationales
│   │   ├── quizData.js         # 60 MCQs bank & component matching data
│   │   └── circuitsData.js     # Pin definitions & wiring validation rules
│   ├── utils/
│   │   ├── audioEffects.js     # Web Audio API alert buzzer & motor sound
│   │   ├── pdfGenerator.js     # jsPDF multi-page guide with watermark
│   │   └── storage.js          # localStorage state persistence
│   ├── App.jsx                 # Main application controller
│   ├── index.css               # Tailwind CSS imports & animations
│   └── main.jsx                # React root mount
├── index.html                  # HTML5 entry with meta tags
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration with relative base './'
└── README.md                   # Complete documentation
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/toshitkumar/arduino-robotics-elearning.git
cd arduino-robotics-elearning

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📋 Capstone Circuit Wiring Matrix

| Hardware Module | Module Pin | Arduino UNO Pin | Operational Function |
| :--- | :--- | :--- | :--- |
| **HC-SR04 Ultrasonic** | VCC | 5V | Powers internal 40kHz piezo oscillator |
| **HC-SR04 Ultrasonic** | Trig | Digital Pin 9 | Transmits 10µs acoustic burst trigger |
| **HC-SR04 Ultrasonic** | Echo | Digital Pin 10 | Measures round-trip flight duration |
| **HC-SR04 Ultrasonic** | GND | GND | Common system ground |
| **FC-37 Rain Sensor** | VCC | Digital Pin 7 | Pulsed power pin for anti-corrosion |
| **FC-37 Rain Sensor** | AO | Analog Pin A0 | Reads moisture level (0-1023) |
| **FC-37 Rain Sensor** | GND | GND | Common system ground |
| **L298N Motor Driver** | ENA | Digital Pin 5 (~PWM) | Speed control duty cycle (0-255) |
| **L298N Motor Driver** | IN1 | Digital Pin 3 | Motor direction logic 1 (Lift) |
| **L298N Motor Driver** | IN2 | Digital Pin 4 | Motor direction logic 2 (Lower) |
| **L298N Motor Driver** | 12V Terminal | External 12V (+) | Dedicated DC motor power supply |
| **L298N Motor Driver** | GND Terminal | GND & Ext 12V (-) | **Mandatory Common Ground** |
| **SG90 Servo Motor** | Signal (Yellow) | Digital Pin 6 (~PWM) | Safety latch control (0° / 90° / 180°) |
| **Upper Limit Switch** | Signal Out | Digital Pin 2 (INT0) | Hardware end-stop at elevated summit |
| **Lower Limit Switch** | Signal Out | Digital Pin 8 | Hardware end-stop at ground datum |
| **Red LED** | Anode (+) | Digital Pin 11 | Flood Danger & Lifting Annunciator |
| **Green LED** | Anode (+) | Digital Pin 12 | Safe Ground / Holding Annunciator |
| **Blue LED** | Anode (+) | Digital Pin 13 | Controlled Lowering Annunciator |
| **Active Buzzer** | Anode (+) | Digital Pin A1 | 85dB Acoustic Emergency Alarm |

---

## 📜 Academic & Engineering Disclaimer

This prototype and e-learning curriculum are designed strictly for educational robotics training, laboratory experiments, and STEM demonstrations. Real-world civil architectural flood protection systems require certified industrial hydraulic or screw-jack lifting machinery, seismic stabilization, civil structural engineering, and municipal building code certifications.

---

## 👤 Author & Lead Developer

**Toshit Kumar**  
- Lead Robotics Engineer & Instructional Designer  
- GitHub: [@toshitkumar](https://github.com/toshitkumar)  
- Project Repository: [arduino-robotics-elearning](https://github.com/toshitkumar/arduino-robotics-elearning)  

*Built with passion for next-generation STEM robotics education.*
