import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Layers, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Sliders, 
  Maximize2,
  Sparkles,
  Award
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export const STORYLINE_SLIDES = [
  {
    id: 'slide-1',
    scene: 'Scene 1: Introduction',
    title: 'Arduino Robotics & Flood-Safe Smart House',
    subtitle: 'Automatic House Lifting System Using Arduino UNO | Author: Toshit Kumar',
    type: 'cover',
    content: {
      tagline: 'INTERACTIVE STEM ROBOTICS & MECHATRONICS E-LEARNING MODULE',
      lead: 'An advanced interactive engineering course designed for Articulate Storyline 360, exploring microcontroller architectures, closed-loop servo actuation, L298N H-bridge motor drivers, ultrasonic time-of-flight acoustic ranging, precipitation telemetry, and an automated mechatronic flood defense system.',
      author: 'Toshit Kumar',
      role: 'Lead Robotics Engineer & Instructional Designer',
    },
    voiceover: 'Welcome to Arduino Robotics and the Flood-Safe Smart House e-learning experience, developed by Toshit Kumar. In this module, you will master the fundamentals of the Arduino UNO, actuator mechanisms, and sensor telemetry, culminating in building an automated house lifting system that protects lives and infrastructure from severe flooding.',
    storylineNotes: {
      triggers: 'When timeline starts: Initialize variables v_CourseProgress = 0, v_SystemState = "STANDBY". When user clicks Start -> Jump to Slide 1.2.',
      variables: 'v_CourseProgress (Number: 0), v_SystemState (Text: "STANDBY"), v_WaterDepth (Number: 0)',
      layers: 'Base Layer, Layer_WelcomeAudio',
    }
  },
  {
    id: 'slide-2',
    scene: 'Scene 1: Introduction',
    title: 'Curriculum Architecture & Learning Blueprint',
    subtitle: 'Six Core Engineering Competencies Across 5 Modules & 1 Capstone Project',
    type: 'blueprint',
    content: {
      cards: [
        { num: '01', title: 'Arduino UNO R3', desc: 'ATmega328P architecture, 16MHz clock, memory domains, and digital/analog/PWM pin taxonomy.' },
        { num: '02', title: 'Servo Motor (SG90)', desc: 'Closed-loop potentiometer feedback, 50Hz PWM pulse train protocol, and foundation safety locks.' },
        { num: '03', title: 'Motor Driver (L298N)', desc: 'Dual H-Bridge switching, inductive back-EMF mitigation, mandatory common ground, and lifting winch.' },
        { num: '04', title: 'Ultrasonic Sensor', desc: 'HC-SR04 40kHz acoustic echolocation, Time-of-Flight kinematics, and overhead water depth telemetry.' },
        { num: '05', title: 'Rain Sensor (FC-37)', desc: 'Resistive nickel tracks, LM393 dual comparator, AO/DO calibration, and pulsed anti-corrosion power.' },
        { num: '06', title: 'Flood-Safe Capstone', desc: 'Autonomous mechatronic platform lift, limit switch interlocks, buzzer alarm, and master C++ state machine.' },
      ]
    },
    voiceover: 'Here is your roadmap for the course. We will progress through five foundational engineering modules covering the Arduino UNO, servo motors, motor drivers, ultrasonic sensing, and rain detection, before integrating everything into the final Capstone Project: the Flood-Safe Smart House.',
    storylineNotes: {
      triggers: 'Clicking any module card branches to the respective scene. Visited states are recorded in v_ModulesVisited.',
      variables: 'v_ModulesVisited (Number: 0 to 6)',
      layers: 'Base Layer, Layer_ModuleDetailTooltip',
    }
  },
  {
    id: 'slide-3',
    scene: 'Scene 2: Arduino UNO',
    title: 'Module 01: ATmega328P Core Architecture',
    subtitle: 'Microcontroller Fundamentals, Clock Frequency, and Memory Map',
    type: 'two-col',
    content: {
      col1Title: 'Microcontroller vs Microprocessor',
      col1Items: [
        'Integrated Architecture: Monolithic die integrating CPU core, Flash, SRAM, and programmable I/O peripherals.',
        '16 MHz Clock Speed: Quartz crystal oscillator executing 16 million instructions per second.',
        'Flash Program Memory: 32 KB total (0.5 KB reserved for Optiboot bootloader).',
        'SRAM: 2 KB volatile runtime memory for dynamic variables and stack.',
        'EEPROM: 1 KB persistent non-volatile memory.',
        'Regulated Voltage: Operates on +5.0V DC standard logic.'
      ],
      col2Title: 'The Execution Lifecycle: setup() & loop()',
      col2Items: [
        'void setup(): Runs exactly once upon power-on or hardware reset pin trigger.',
        'Configures pin modes (pinMode), UART serial baud rate (Serial.begin), and attaches libraries.',
        'void loop(): Executes continuously in an infinite while(true) cycle.',
        'Handles sensor polling, math calculations, and actuator commands.',
        'Practical Exercise: Precision LED blinking on Pin 13 using digitalWrite() and delay().',
        'Instructional Rule: Avoid blocking delay() inside mission-critical safety loops.'
      ]
    },
    voiceover: 'In Module 1, we dissect the heart of our embedded system: the Arduino UNO R3 and its ATmega328P microcontroller. Operating at 16 megahertz with 32 kilobytes of flash memory, it coordinates our sensory inputs and motor drivers.',
    storylineNotes: {
      triggers: 'Hovering over ATmega328P exposes internal die diagram layer. Next button advances to Pinout slide.',
      variables: 'v_UnoLearned (Boolean: True)',
      layers: 'Layer_ChipDieInspection',
    }
  },
  {
    id: 'slide-4',
    scene: 'Scene 2: Arduino UNO',
    title: 'Arduino UNO Pin Taxonomy & Electrical Limits',
    subtitle: 'Categorization of Digital, PWM, Analog, and Power Delivery Rails',
    type: 'three-col',
    content: {
      col1Title: 'Digital I/O & UART',
      col1Items: [
        'Pins D0 to D13: 5V logic inputs and outputs.',
        'D0 (RX) & D1 (TX): Hardware UART connected to USB-to-serial converter. Leave unplugged during code upload.',
        'D13: Connected in parallel with onboard surface-mount test LED.',
        'Max Current: 20 mA recommended per pin (40 mA absolute max rating).'
      ],
      col2Title: 'PWM & Interrupts',
      col2Items: [
        'PWM Pins (~3, ~5, ~6, ~9, ~10, ~11): 8-bit Pulse Width Modulation (0-255).',
        'Frequencies: ~490 Hz (Pins 3, 9, 10, 11) and ~980 Hz (Pins 5 and 6).',
        'Hardware Interrupts: INT0 (Pin 2) and INT1 (Pin 3).',
        'Pin 2 is wired to our Upper Limit Switch for instant sub-microsecond motor halt.'
      ],
      col3Title: 'Analog Inputs & Power',
      col3Items: [
        'Channels A0 - A5: 10-bit Successive Approximation ADC.',
        'Resolution: 1024 discrete steps (0-1023), equaling ~4.88 mV per unit step.',
        'VIN Pin: 7V - 12V DC input feeding the onboard NCP1117 linear regulator.',
        '5V & 3.3V Rails: Regulated outputs for sensors and modules.'
      ]
    },
    voiceover: 'Understanding pin taxonomy is crucial. Notice pins with the tilde mark: these are our 8-bit PWM channels. Analog pins A0 through A5 convert real-world voltages into digital values from 0 to 1023.',
    storylineNotes: {
      triggers: 'Interactive Pin Hotspots: Clicking any pin number displays detailed voltage and current callout.',
      variables: 'v_SelectedPin (Text)',
      layers: 'Layer_PinCallout',
    }
  },
  {
    id: 'slide-5',
    scene: 'Scene 3: Servo Motor',
    title: 'Module 02: Servo Motor (SG90) Closed-Loop Actuation',
    subtitle: 'Closed-Loop Potentiometer Feedback, 50Hz PWM Protocol, and Power Isolation',
    type: 'two-col',
    content: {
      col1Title: 'Closed-Loop Servomechanism Anatomy',
      col1Items: [
        'DC Coreless Motor: High-speed, low-torque prime rotational actuator.',
        'Reduction Gearbox: Exponentially multiplies torque while reducing shaft velocity.',
        'Rotary Potentiometer: Mechanically linked to the output horn, producing continuous position feedback voltage.',
        'Control Board & Error Amplifier: Compares target PWM pulse width with feedback voltage to maintain commanded angle.',
        'Holding Torque: The servo actively resists external displacement loads as long as the 50Hz PWM signal is maintained.'
      ],
      col2Title: '50Hz PWM Protocol & Power Isolation Rule',
      col2Items: [
        'Frame Frequency: Strict 50 Hz PWM protocol (one 20 millisecond frame).',
        'Pulse Width Standard: 1.0 ms = 0° | 1.5 ms = 90° (neutral) | 2.0 ms = 180°.',
        'Wiring Standard: Brown/Black = GND, Red = +5V/6V, Orange/Yellow = PWM Signal (Pin 6).',
        'MANDATORY POWER ISOLATION RULE:\nNever power high-torque servos from the Arduino 5V pin! Stall currents spike up to 800mA - 2.5A, dropping the 5V rail and tripping MCU Brown-Out Resets.',
        'Role in Capstone: Actuates mechanical foundation locking pins and emergency flood gates.'
      ]
    },
    voiceover: 'In Module 2, we explore closed-loop actuation with the SG90 micro-servo. Unlike basic DC motors, servos rotate to an exact commanded angle using an internal feedback potentiometer. Notice the critical safety rule: always isolate servo power to prevent Arduino brown-out resets.',
    storylineNotes: {
      triggers: 'Storyline Slider: Moving slider updates v_ServoAngle and rotates servo horn graphic dynamically.',
      variables: 'v_ServoAngle (Number: 0-180)',
      layers: 'Layer_ServoRotator',
    }
  },
  {
    id: 'slide-6',
    scene: 'Scene 4: Motor Driver',
    title: 'Module 03: Motor Driver (L298N Dual H-Bridge)',
    subtitle: 'High-Current Inductive Drive, Polarity Switching, and Dynamic Magnetic Braking',
    type: 'two-col',
    content: {
      col1Title: 'Why Microcontrollers Require Motor Drivers',
      col1Items: [
        'Current Capacity Mismatch: Arduino pins supply max 20-40 mA; DC lifting motors draw 300 mA idle to 2.5 A under load.',
        'Direct connection will instantly destroy the ATmega328P output stage transistors.',
        'Back-EMF Spikes: Collapsing magnetic fields in inductive coils generate massive voltage spikes (V = -L * di/dt) reaching hundreds of volts.',
        'L298N Dual Full-Bridge IC: Rated up to 35V DC and 2A peak per channel.',
        'Fast-Recovery Flyback Diodes: Safely clamp inductive reverse voltage surges.'
      ],
      col2Title: 'H-Bridge Truth Table & Speed Control',
      col2Items: [
        'Forward (Lift Platform): IN1 = HIGH, IN2 = LOW -> Current flows OUT1 to OUT2.',
        'Reverse (Lower Platform): IN1 = LOW, IN2 = HIGH -> Current flows OUT2 to OUT1.',
        'Dynamic Magnetic Braking: IN1 = LOW, IN2 = LOW (or both HIGH) -> Shorts motor terminals, dissipating kinetic energy to prevent platform drift.',
        'Speed Regulation: Modulate ENA pin with 8-bit PWM (analogWrite(ENA, speed) 0-255).',
        'Removing ENA jumper enables dynamic acceleration and deceleration curves.'
      ]
    },
    voiceover: 'Module 3 tackles heavy power electronics with the L298N Dual H-Bridge. An H-bridge lets an Arduino control both the direction and speed of high-current DC motors while isolating sensitive microcontroller pins from dangerous back-EMF spikes.',
    storylineNotes: {
      triggers: 'Buttons for Forward, Reverse, Brake execute state animations on rotating motor gear asset.',
      variables: 'v_MotorDirection (Text: "FORWARD", "REVERSE", "BRAKE")',
      layers: 'Layer_HBridgeFlow',
    }
  },
  {
    id: 'slide-7',
    scene: 'Scene 4: Motor Driver',
    title: 'L298N Wiring Rules & Common Ground Topology',
    subtitle: 'Mandatory 0V Reference, 5V Regulator Jumper Rules, and Thermal Management',
    type: 'two-col',
    content: {
      col1Title: 'Mandatory Common Ground (0V Reference)',
      col1Items: [
        'CRITICAL WIRING RULE:\nThe external 12V motor battery ground (-) MUST be tied directly to the Arduino GND pin.',
        'Why is Common Ground Essential?\nVoltage is a relative potential difference. Without a shared 0V reference, logic signals (IN1, IN2, ENA) float unpredictably, causing severe motor jitter, missed stop commands, or destroyed driver gates.',
        'Never connect the external +12V positive terminal to the Arduino 5V pin! This results in catastrophic overvoltage.'
      ],
      col2Title: '5V Regulator Jumper & Thermal Sizing',
      col2Items: [
        '12V Power Screw Terminal: Wired directly to external 12V 3A DC power source.',
        '5V Logic Terminal & Jumper Cap:\n- When 5V jumper is ON (Supply <= 12V): Onboard 78M05 regulator generates +5V for internal logic gates.\n- When 5V jumper is REMOVED (Supply > 12V): Onboard regulator is disconnected; you must feed +5V from Arduino 5V to this pin.',
        'Heatsink Thermal Dissipation: High current generates up to 25W of heat; ensure proper convective airflow during vertical lift.'
      ]
    },
    voiceover: 'Pay close attention to this engineering principle: Common Ground. An external motor battery and your Arduino must share a single zero-volt reference line. Without it, your control logic will float, leading to erratic or unresponsive motor operation.',
    storylineNotes: {
      triggers: 'Drag and Drop wire activity: User must connect ground wire from battery to Arduino GND.',
      variables: 'v_CommonGroundValid (Boolean)',
      layers: 'Layer_GroundingWarning',
    }
  },
  {
    id: 'slide-8',
    scene: 'Scene 5: Ultrasonic Sensor',
    title: 'Module 04: HC-SR04 Ultrasonic Acoustic Telemetry',
    subtitle: 'Time-of-Flight (ToF) Kinematics, Acoustic Wave Physics, and Flood Profiling',
    type: 'two-col',
    content: {
      col1Title: 'Piezo Acoustic Echolocation & Physics',
      col1Items: [
        'Acoustic Transducers: Transmitter (T) emits 40,000 Hz ultrasound bursts; Receiver (R) detects the reflected wave.',
        'Trigger Burst: Microcontroller sends a 10-microsecond HIGH TTL pulse to the Trig pin.',
        'Echo Flight Time: Sensor drives the Echo pin HIGH for a duration exactly equal to round-trip sound travel time.',
        'Kinematic Distance Formula:\nDistance = (Echo Time in µs * Speed of Sound) / 2\nDistance (cm) = (Duration in µs * 0.0343) / 2\nSimplified: Distance (cm) = Duration / 58.3',
        'Dividing by 2 is essential because sound travels to the surface and bounces back.'
      ],
      col2Title: 'Flood Depth Profiling & Signal Filtering',
      col2Items: [
        'Overhead Mounting Strategy: The sensor faces downward into the foundation drainage basin.',
        'Water Depth Formula:\nFlood Level = Baseline Datum Height - Measured Distance Gap.',
        'As floodwater rises, the measured acoustic distance decreases proportionally.',
        'Wave Ripple Mitigation: Wind-induced surface ripples can reflect sound waves away. We implement a software median filter discarding outlier spikes.',
        'Safety Timeout: Using pulseIn(ECHO, HIGH, 30000) prevents CPU lockup if sound is absorbed.'
      ]
    },
    voiceover: 'Module 4 covers non-contact liquid level sensing with the HC-SR04 ultrasonic sensor. By emitting 40 kilohertz acoustic pulses and measuring the round-trip flight time, our Arduino computes water depth in real time with millimeter precision.',
    storylineNotes: {
      triggers: 'Interactive water level dial updates calculated distance and displays simulated acoustic wave cone.',
      variables: 'v_SimulatedDistance (Number: 5 to 45)',
      layers: 'Layer_WavePhysics',
    }
  },
  {
    id: 'slide-9',
    scene: 'Scene 6: Rain Sensor',
    title: 'Module 05: Rain Sensor Module (FC-37 / YL-83)',
    subtitle: 'Resistive Interleaved Tracks, LM393 Comparator, and Galvanic Corrosion Prevention',
    type: 'two-col',
    content: {
      col1Title: 'Resistive Trace Detection & LM393',
      col1Items: [
        'Interleaved Collector Tracks: Interdigitated nickel-plated PCB traces.',
        'Electrolytic Conductivity: Dry air provides near-infinite resistance (AO ~ 1023). Rainwater contains dissolved ions that bridge tracks, dropping resistance sharply.',
        'LM393 Comparator IC: Compares moisture voltage divider against a sensitivity trimpot threshold.',
        'Dual Output Channels:\n- Analog Output (AO): Continuous 0-1023 moisture level.\n- Digital Output (DO): Active-low binary threshold (transitions from 5V to 0V upon heavy rain).'
      ],
      col2Title: 'Galvanic Corrosion Mitigation Protocol',
      col2Items: [
        'The Galvanic Corrosion Threat:\nContinuous DC current passing through wet nickel traces causes rapid electrochemical oxidation, dissolving sensor tracks within days.',
        'The Professional Software Solution:\nDo NOT connect sensor VCC permanently to 5V power! Connect VCC to Arduino Digital Pin 7.',
        'Pulsed Power Sequence:\n1. digitalWrite(PIN_RAIN_PWR, HIGH);\n2. delay(10); // Allow LM393 to stabilize\n3. int val = analogRead(A0);\n4. digitalWrite(PIN_RAIN_PWR, LOW); // Depower immediately\nThis extends outdoor sensor lifespan by over 500x!'
      ]
    },
    voiceover: 'Module 5 introduces the FC-37 rain sensor module. Notice the advanced engineering technique implemented here: pulsed digital power gating, which prevents galvanic anode corrosion on exposed sensor tracks.',
    storylineNotes: {
      triggers: 'Clicking "Corrosion Comparison" shows animated time-lapse of corroded vs pulsed PCB traces.',
      variables: 'v_RainDetected (Boolean)',
      layers: 'Layer_ElectrolysisExplanation',
    }
  },
  {
    id: 'slide-10',
    scene: 'Scene 7: Capstone Project',
    title: 'Capstone Project: Flood-Safe Smart House Overview',
    subtitle: 'Automated Mechatronic Platform Lifting Architecture Designed by Toshit Kumar',
    type: 'two-col',
    content: {
      col1Title: 'Problem Statement & Engineering Solution',
      col1Items: [
        'The Global Challenge: Monsoonal river overflows and flash floods submerge residential structures, causing billions in property loss and endangering human lives.',
        'Why Fixed Stilts Fall Short: Permanent high stilts isolate elderly and mobility-impaired residents during dry weather.',
        'The Smart Mechatronic Solution: A dynamic scissor-lift or rack-and-pinion platform that rests at ground level during normal conditions, but automatically elevates above flood waters when water depth is verified.',
        'Redundant Telemetry: Combines early rain detection with acoustic water depth profiling to eliminate false lifting triggers.'
      ],
      col2Title: 'Complete Bill of Materials (BOM)',
      col2Items: [
        'Arduino UNO R3: Central microcontroller orchestrator.',
        'L298N Motor Driver: 12V Dual H-Bridge motor controller.',
        '12V High-Torque DC Geared Motor: Lead-screw lifting prime mover.',
        'SG90 Micro Servo: Auxiliary foundation locking pins and flood barrier.',
        'HC-SR04 Ultrasonic Sensor: Overhead water depth profiler.',
        'FC-37 Rain Sensor Module: Early storm onset detector.',
        'Micro Limit Switches (x2): Mandatory upper and lower travel end-stops.',
        'Annunciators: 5V Active Buzzer + Red, Green, Blue LEDs.',
        'External Power: Dedicated 12V 3A DC power supply.'
      ]
    },
    voiceover: 'Now we arrive at our final Capstone Project: The Flood-Safe Smart House. Toshit Kumar has engineered this system to unite all five modules into an automated civil defense prototype that lifts structures automatically when floodwater is detected.',
    storylineNotes: {
      triggers: 'Button "Launch 3D Simulation" triggers transition to interactive simulation layer.',
      variables: 'v_CapstoneStarted (Boolean: True)',
      layers: 'Layer_BOMExplorer',
    }
  },
  {
    id: 'slide-11',
    scene: 'Scene 7: Capstone Project',
    title: 'Mandatory Safety Engineering Requirements',
    subtitle: 'Four Non-Negotiable Rules for Automated Architectural Lifting Mechatronics',
    type: 'grid-4',
    content: {
      cards: [
        { title: 'Rule 01: Hardware Limit Switches', desc: 'Never rely on software delay() timers to stop motion. Upper and lower mechanical end-stops provide immutable physical cutoff boundaries.', color: '#EF4444' },
        { title: 'Rule 02: Strict Common Ground', desc: 'The 12V external motor power supply negative (-) MUST share common ground with Arduino GND to prevent floating logic signals.', color: '#2563EB' },
        { title: 'Rule 03: Auxiliary Servo Safety Locks', desc: 'Deploy mechanical pins once elevated. This transfers structural weight off the lifting motor and eliminates mechanical lead-screw back-driving.', color: '#F59E0B' },
        { title: 'Rule 04: Educational Prototype Status', desc: 'This prototype is an instructional STEM robotics demonstration. Full-scale civil structures require certified industrial hydraulics and building code compliance.', color: '#06B6D4' },
      ]
    },
    voiceover: 'Safety is paramount in robotics engineering. Review these four rules carefully: physical limit switches must govern motion boundaries, grounds must be common, power rails must be isolated, and the prototype is strictly an educational demonstration model.',
    storylineNotes: {
      triggers: 'User must click and acknowledge all 4 rules before the Next button becomes enabled.',
      variables: 'v_Rule1Ack, v_Rule2Ack, v_Rule3Ack, v_Rule4Ack (Booleans)',
      layers: 'Base Layer, Layer_SafetyComplianceCheck',
    }
  },
  {
    id: 'slide-12',
    scene: 'Scene 7: Capstone Project',
    title: 'Complete System Circuit Connection Matrix',
    subtitle: 'Comprehensive 20-Pin Hardware Mapping Across Microcontroller, Actuators, and Sensors',
    type: 'table',
    content: {
      headers: ['Component Module', 'Pin Terminal', 'Arduino UNO Pin', 'Operational Role & Safety Function'],
      rows: [
        ['HC-SR04 Ultrasonic', 'Trig / Echo', 'Digital Pin 9 / Pin 10', '10µs acoustic burst trigger & round-trip flight duration'],
        ['FC-37 Rain Sensor', 'VCC / AO', 'Pin 7 (Pulsed) / Pin A0', 'Pulsed digital anti-corrosion power & analog moisture level'],
        ['L298N Motor Driver', 'ENA / IN1 / IN2', '~Pin 5 / Pin 3 / Pin 4', 'PWM speed duty cycle & directional H-bridge lift/lower drive'],
        ['L298N Power', '12V / GND', 'Ext 12V (+) / Ext GND & Arduino GND', 'Dedicated high-current supply with mandatory common ground'],
        ['SG90 Micro Servo', 'Signal (PWM)', 'Digital Pin 6 (~PWM)', 'Auxiliary mechanical foundation lock (0°) & summit support (180°)'],
        ['Upper Limit Switch', 'Signal Out', 'Digital Pin 2 (INT0)', 'Sub-millisecond hardware interrupt cutoff at maximum elevation'],
        ['Lower Datum Switch', 'Signal Out', 'Digital Pin 8', 'Mechanical datum end-stop confirming ground docking'],
        ['Annunciators & Buzzer', 'Red / Green / Blue / Buzzer', 'Pins 11 / 12 / 13 / Pin A1', 'Red: Danger/Lift | Green: Standby/Hold | Blue: Lowering | Buzzer Alert']
      ]
    },
    voiceover: 'This master connection table defines all 20 electrical paths. Notice how pins are partitioned: Pin 2 handles the urgent upper limit interrupt, PWM pins 5 and 6 govern speed and servo angle, and Pin 7 switches rain sensor power dynamically.',
    storylineNotes: {
      triggers: 'Hovering over table row highlights physical pin connection on interactive circuit diagram.',
      variables: 'v_InspectedRow (Number)',
      layers: 'Layer_SchematicZoom',
    }
  },
  {
    id: 'slide-13',
    scene: 'Scene 7: Capstone Project',
    title: 'Mechatronic State Machine & Sequence of Operations',
    subtitle: 'Seven-Stage Autonomous Lifecycle with 10-Second Hysteresis Debounce',
    type: 'state-machine',
    content: {
      phases: [
        { num: '01', title: 'STANDBY_GROUND', desc: 'System monitors rain (A0) and water depth (HC-SR04). Green LED is ON. Foundation lock engaged at 0°.' },
        { num: '02', title: 'FLOOD_ALERT', desc: 'Water level exceeds 15cm threshold. Red LED illuminates, buzzer pulses, and servo unlatches to 90°.' },
        { num: '03', title: 'LIFTING_ACTIVE', desc: 'L298N commands motor upward (IN1=HIGH, IN2=LOW, ENA=230). Platform rises steadily.' },
        { num: '04', title: 'HOLDING_ELEVATED', desc: 'Upper limit switch engages (INT0). Motor halts. Servo rotates to 180° to insert mechanical support pins.' },
        { num: '05', title: 'DEBOUNCE RECESSION', desc: 'Water recedes below 5cm. A 10-second hysteresis timer ensures the flood has genuinely subsided.' },
        { num: '06', title: 'CONTROLLED DESCENT', desc: 'Servo retracts pins (90°), Blue LED turns ON, L298N lowers platform smoothly (IN1=LOW, IN2=HIGH, ENA=175).' },
        { num: '07', title: 'GROUND DOCKING', desc: 'Platform strikes bottom limit switch (Pin 8). Motor brakes, servo locks at 0°, Green LED lights, system resets.' },
      ]
    },
    voiceover: 'Here is the autonomous operational cycle. Notice the strict sequence: Annunciation, Unlatching, Lifting, Upper Limit Stop, Summit Locking, Hysteresis Debounce, and Controlled Descent.',
    storylineNotes: {
      triggers: 'State machine animation progresses along path. State variable updates v_CurrentState in real-time.',
      variables: 'v_CurrentState (Text: "STANDBY", "ALERT", "LIFTING", "HOLDING", "LOWERING")',
      layers: 'Layer_PhaseIndicator',
    }
  },
  {
    id: 'slide-14',
    scene: 'Scene 7: Capstone Project',
    title: 'Production Arduino C++ Master Sketch Architecture',
    subtitle: 'Non-Blocking Control Loop, Hardware Interrupts, and FSM Implementation',
    type: 'two-col',
    content: {
      col1Title: 'Key Algorithmic Implementations',
      col1Items: [
        '#include <Servo.h>: Hardware timer interrupt pulse generation.',
        'enum SystemState: Implements an explicit finite-state machine (FSM).',
        'INPUT_PULLUP Configuration: Internal 30kΩ pull-up resistors on limit switch pins 2 and 8 guarantee noise-free Active-LOW triggers.',
        'getWaterDepthCm(): Generates 10µs trigger pulse, measures echo round-trip with 26ms timeout, and computes depth gap.',
        'getRainReading(): Powers pin 7 for 10ms only during analogRead(A0) to eliminate galvanic anode corrosion.',
        'stopMotor(): Sets IN1=LOW, IN2=LOW, ENA=0 to apply magnetic dynamic braking.'
      ],
      col2Title: 'Master Loop State Machine (Code Excerpt)',
      col2Items: [
        'switch (currentState) {',
        '  case STATE_STANDBY_GROUND:',
        '    if (waterDepth >= FLOOD_TRIGGER_DEPTH) currentState = STATE_FLOOD_ALERT;',
        '    break;',
        '  case STATE_LIFTING:',
        '    if (hitTopLimit) { stopMotor(); safetyServo.write(180); currentState = STATE_HOLDING; }',
        '    else { driveMotorUp(LIFT_SPEED); }',
        '    break;',
        '  case STATE_HOLDING_ELEVATED:',
        '    if (waterDepth <= SAFE_DEPTH && safeTimerDebounced()) currentState = STATE_LOWERING;',
        '    break;',
        '}'
      ]
    },
    voiceover: 'The software architecture uses an explicit finite state machine. Notice how limit switches and sensor readings trigger clean transitions without blocking delay loops, ensuring the microcontroller remains responsive at all times.',
    storylineNotes: {
      triggers: 'Button "Copy Full Sketch" copies 120 lines of commented production C++ code to clipboard.',
      variables: 'v_CodeCopied (Boolean)',
      layers: 'Layer_CodeInspector',
    }
  },
  {
    id: 'slide-15',
    scene: 'Scene 8: Scenarios & Diagnostics',
    title: 'Scenario Decision Challenges & Troubleshooting Matrix',
    subtitle: 'Five Real-World Engineering Dilemmas and Laboratory Rectification Protocols',
    type: 'two-col',
    content: {
      col1Title: '5 Real-World Scenario Decisions',
      col1Items: [
        'Scenario 1: Rain starts but water depth is 2cm -> Enter alert-standby; do not lift prematurely.',
        'Scenario 2: Water level surges from 4cm to 18cm -> Sound buzzer -> Unlatch foundation -> Drive motor up -> Trip limit switch.',
        'Scenario 3: Turbulent water waves return 0cm or 298cm outliers -> Apply software median filter over 5 samples.',
        'Scenario 4: Platform reaches upper summit -> Sub-millisecond motor halt via Pin 2 limit switch -> Engage servo locks.',
        'Scenario 5: Water recedes to 3cm -> Run 10-second debounce timer -> Unlock pins -> Lower smoothly -> Stop at bottom datum.'
      ],
      col2Title: 'Laboratory Troubleshooting Guide',
      col2Items: [
        'Symptom: Motor does not turn despite flood danger.\n-> Fix: Check common ground between 12V battery and Arduino GND.',
        'Symptom: Arduino resets when motor or servo activates.\n-> Fix: Power isolation failure. Do not draw high current from 5V pin; add external 12V supply.',
        'Symptom: Ultrasonic distance jumps between 0cm and 300cm.\n-> Fix: Acoustic waves deflecting on ripples. Install a stilling tube around sensor.',
        'Symptom: Motor grinds past maximum summit height.\n-> Fix: Check upper limit switch wiring and verify INPUT_PULLUP mode.'
      ]
    },
    voiceover: 'Engineering involves diagnosing real-world edge cases. These five scenarios test your judgment against false triggers, turbulent wave reflections, limit switch engages, and power isolation brownouts.',
    storylineNotes: {
      triggers: 'Interactive Question: Learner selects action for Scenario 2. Storyline calculates score and shows feedback layer.',
      variables: 'v_ScenarioScore (Number: 0-100)',
      layers: 'Layer_ScenarioFeedbackCorrect, Layer_ScenarioFeedbackIncorrect',
    }
  },
  {
    id: 'slide-16',
    scene: 'Scene 9: Storyline Architecture',
    title: 'Articulate Storyline 360 Technical Specification',
    subtitle: 'Variables Dictionary, Trigger Rules, Slide Layers, and LMS Export Standards',
    type: 'three-col',
    content: {
      col1Title: 'Project Variables',
      col1Items: [
        'v_WaterDepth (Number, 0-40cm): Real-time liquid level.',
        'v_RainIntensity (Number, 0-100%): Governs precipitation visual.',
        'v_SystemState (Text): Active FSM state.',
        'v_TopLimitTripped (Boolean): Upper limit switch state.',
        'v_BottomLimitTripped (Boolean): Ground datum switch state.',
        'v_UserScore (Number): Cumulative quiz & scenario score.'
      ],
      col2Title: 'Layers & Triggers',
      col2Items: [
        'Layer_EmergencyAlert: Flashes red emergency beacon and triggers 85dB alarm tone.',
        'Layer_LiftingMotion: Plays 4-second motion path elevating house structure.',
        'Layer_SupportLocked: Shows mechanical locking pin sliding into place.',
        'Trigger Logic: "When v_WaterDepth changes -> If >= 15 AND v_SystemState == STANDBY -> Show Layer_EmergencyAlert".'
      ],
      col3Title: 'Media & LMS Standards',
      col3Items: [
        'Audio Narration: Synced voiceover tracks with timeline cue points.',
        'Closed Captions: VTT captions embedded for WCAG 2.1 AA accessibility.',
        'Tab Navigation: Strict accessibility tab order.',
        'LMS Export: SCORM 2004 4th Edition / xAPI (Tin Can) ready.',
        'Mobile Responsive: Fluid modern player layout.'
      ]
    },
    voiceover: 'For instructional designers and e-learning developers, this slide details the exact Articulate Storyline 360 variable dictionary, trigger logic, and layer architecture required to import or build this module in Storyline.',
    storylineNotes: {
      triggers: 'Instructional Designer Reference Slide. Button "Export Storyboard" downloads text specification.',
      variables: 'v_StorylineReady (Boolean: True)',
      layers: 'Base Layer, Layer_VariableInspector',
    }
  },
  {
    id: 'slide-17',
    scene: 'Scene 9: Graduation',
    title: 'Assessment, Certification & Deliverables',
    subtitle: 'Academic Accreditation, Verified Credentials, and Project Resources',
    type: 'two-col',
    content: {
      col1Title: 'Course Assessment Summary',
      col1Items: [
        '60 Comprehensive MCQs: 10 standardized evaluation questions per module + 10 Capstone questions.',
        'Passing Criterion: 70% proficiency across all technical competencies.',
        'Drag-and-Drop Component Matcher: Assesses architectural understanding of sensors and actuators.',
        'Live Interactive Platform: Experience the full simulation online with audio alarms and real-time physics.',
        'Downloadable PDF Manual: 12-page professional laboratory guide with watermark "Created by Toshit Kumar".'
      ],
      col2Title: 'Official Deliverables & Accreditation',
      col2Items: [
        'Project Designer: Toshit Kumar | Lead Robotics Engineer',
        'Live Web Application: toshitkumar.github.io/arduino-robotics-elearning/',
        'GitHub Repository: github.com/toshitkumar/arduino-robotics-elearning',
        'PowerPoint Deck (.pptx): Fully editable and formatted for Articulate Storyline 360 Import.',
        'Credential Certificate: Officially generated upon scoring >= 70% in the Assessment Center.'
      ]
    },
    voiceover: 'Congratulations on completing the Arduino Robotics and Flood-Safe Smart House curriculum. You have demonstrated rigorous mastery of microcontroller architectures, actuator physics, and autonomous flood mitigation engineering. Authored and engineered by Toshit Kumar.',
    storylineNotes: {
      triggers: 'When v_UserScore >= 70: Display Course Completion Certificate with student name and Toshit Kumar signature.',
      variables: 'v_CertificateUnlocked (Boolean: True)',
      layers: 'Layer_CertificateAward',
    }
  }
];

export default function StorylinePlayer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const currentSlide = STORYLINE_SLIDES[currentSlideIndex];

  // Speech Synthesis setup
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Handle voiceover speaking
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (isPlaying && currentSlide.voiceover && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(currentSlide.voiceover);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = isMuted ? 0 : volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSlideIndex, isPlaying, isMuted, volume, currentSlide.voiceover]);

  const handleNext = () => {
    playClickSound();
    if (currentSlideIndex < STORYLINE_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      playSuccessChime();
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleTogglePlay = () => {
    playClickSound();
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const downloadPptxFile = () => {
    playClickSound();
    const link = document.createElement('a');
    link.href = './Arduino_Robotics_Flood_Safe_Smart_House_Storyline.pptx';
    link.download = 'Arduino_Robotics_Flood_Safe_Smart_House_Storyline.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-4">
      {/* Top Bar / Download Callout */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 text-cyan-400 rounded-xl">
            <Layers className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                Articulate Storyline 360 Edition
              </span>
              <span className="text-xs text-slate-400 font-mono">16:9 Widescreen</span>
            </div>
            <h2 className="text-base font-bold text-white">Interactive Storyline Presentation Player</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showNotes ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Storyline Triggers & Notes</span>
          </button>

          <button
            onClick={downloadPptxFile}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            title="Download Editable PowerPoint Deck for Articulate Storyline 360"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PPTX (Storyline)</span>
          </button>
        </div>
      </div>

      {/* Main Player Viewport (Articulate Storyline 360 Modern Player UI) */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">
        {/* Left Side: Storyline Scene Navigation Menu */}
        <div className="w-full md:w-64 bg-[#111827] border-r border-slate-800/80 p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-3">
            <div className="px-2 pt-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Slide Menu</span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">
                {currentSlideIndex + 1} / {STORYLINE_SLIDES.length}
              </span>
            </div>

            <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
              {STORYLINE_SLIDES.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                const isPassed = currentSlideIndex > idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      playClickSound();
                      setCurrentSlideIndex(idx);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all cursor-pointer flex items-start gap-2 ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                        : isPassed
                        ? 'text-slate-300 hover:bg-slate-800/60'
                        : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono shrink-0 mt-0.5 opacity-75">
                      {idx + 1}.
                    </span>
                    <div className="truncate">
                      <p className="truncate text-[11px]">{slide.title}</p>
                      <p className="text-[9px] text-slate-400 truncate opacity-80">{slide.scene}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Author: Toshit Kumar</span>
            <span className="text-emerald-400">Storyline 360</span>
          </div>
        </div>

        {/* Right Side: Stage Slide Area */}
        <div className="flex-1 flex flex-col justify-between bg-[#0b0f19] p-6 md:p-8 relative overflow-hidden">
          {/* Slide Header */}
          <div className="border-b border-slate-800/80 pb-3 flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block font-mono">
                {currentSlide.scene} • SLIDE {currentSlideIndex + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              <span className="text-[10px] font-mono text-slate-400">
                {isSpeaking ? 'Narrator Speaking...' : 'Audio Ready'}
              </span>
            </div>
          </div>

          {/* Dynamic Slide Stage Content */}
          <div className="my-auto py-6">
            {/* TYPE 1: COVER SLIDE */}
            {currentSlide.type === 'cover' && (
              <div className="space-y-6 text-center max-w-2xl mx-auto">
                <div className="inline-block px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 rounded-full text-xs font-bold text-cyan-400">
                  {currentSlide.content.tagline}
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                  Arduino Robotics & Flood-Safe Smart House
                </h1>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentSlide.content.lead}
                </p>

                <div className="p-4 bg-slate-900 border border-blue-500/30 rounded-2xl max-w-md mx-auto text-left flex items-center gap-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow">
                    TK
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Project Lead & Author</span>
                    <h4 className="text-sm font-bold text-white">{currentSlide.content.author}</h4>
                    <p className="text-xs text-slate-400">{currentSlide.content.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TYPE 2: BLUEPRINT GRID */}
            {currentSlide.type === 'blueprint' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentSlide.content.cards.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">Module {c.num}</span>
                    <h4 className="text-xs font-bold text-white">{c.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE 3: TWO-COLUMN CARDS */}
            {currentSlide.type === 'two-col' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{currentSlide.content.col1Title}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSlide.content.col1Items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">{currentSlide.content.col2Title}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSlide.content.col2Items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold">•</span>
                        <span className="font-mono text-[11px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TYPE 4: THREE-COLUMN CARDS */}
            {currentSlide.type === 'three-col' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: currentSlide.content.col1Title, items: currentSlide.content.col1Items, color: 'text-blue-400' },
                  { title: currentSlide.content.col2Title, items: currentSlide.content.col2Items, color: 'text-cyan-400' },
                  { title: currentSlide.content.col3Title, items: currentSlide.content.col3Items, color: 'text-emerald-400' },
                ].map((col, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 space-y-2">
                    <h4 className={`text-xs font-bold ${col.color} uppercase tracking-wider`}>{col.title}</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <span className={`${col.color} font-bold`}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE 5: 4-GRID CARDS */}
            {currentSlide.type === 'grid-4' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSlide.content.cards.map((c, i) => (
                  <div key={i} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE 6: DATA TABLE */}
            {currentSlide.type === 'table' && (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-cyan-400 uppercase font-semibold">
                    <tr>
                      {currentSlide.content.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                    {currentSlide.content.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-bold text-white">{row[0]}</td>
                        <td className="py-2 px-3 font-mono text-cyan-400">{row[1]}</td>
                        <td className="py-2 px-3 font-mono font-bold text-blue-400">{row[2]}</td>
                        <td className="py-2 px-3 text-slate-300">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TYPE 7: STATE MACHINE */}
            {currentSlide.type === 'state-machine' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {currentSlide.content.phases.map((p, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400">Phase {p.num}</span>
                    <h4 className="text-xs font-bold text-white">{p.title}</h4>
                    <p className="text-[11px] text-slate-400">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voiceover Script Teleprompter Subtitle Banner */}
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <p className="text-slate-300 italic truncate font-sans">
                "{currentSlide.voiceover}"
              </p>
            </div>
            <button
              onClick={handleTogglePlay}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                isPlaying ? 'bg-amber-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isPlaying ? 'Pause Narration' : 'Play Narration'}
            </button>
          </div>

          {/* Storyline 360 Bottom Player Controls */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentSlideIndex === STORYLINE_SLIDES.length - 1}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Seekbar simulation */}
            <div className="flex-1 max-w-md mx-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlideIndex + 1) / STORYLINE_SLIDES.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Storyline Notes & Developer Specs Drawer */}
      {showNotes && (
        <div className="bg-[#111827] border border-cyan-500/30 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Articulate Storyline 360 Developer Specifications (Slide {currentSlideIndex + 1})
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Ready for Storyline Import</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Interactive Triggers & Conditions:</span>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.triggers}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Slide Variables & Types:</span>
              <p className="text-cyan-400 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.variables}</p>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Configured Slide Layers:</span>
              <p className="text-purple-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.layers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
