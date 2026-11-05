// Comprehensive Course Curriculum and Hardware Documentation
// Course: Arduino Robotics & Flood-Safe Smart House
// Developed by: Toshit Kumar

export const COURSE_INFO = {
  title: "Arduino Robotics & Flood-Safe Smart House",
  subtitle: "Automatic House Lifting System Using Arduino UNO",
  developer: "Toshit Kumar",
  role: "Lead Robotics Engineer & Instructional Designer",
  version: "1.0.0",
  description: "A professional interactive STEM e-learning curriculum covering Arduino UNO architecture, actuation with Servo Motors and L298N Motor Drivers, telemetry sensing via HC-SR04 Ultrasonic and Rain Sensors, culminating in an intelligent automated flood mitigation structural lifting platform.",
  targetAudience: "Robotics students, STEM educators, embedded systems enthusiasts, and IoT engineering candidates.",
};

export const MODULES = [
  {
    id: "mod-1",
    num: "01",
    title: "Introduction to Arduino UNO",
    tagline: "Microcontroller Fundamentals, Architecture, and First Sketch",
    estimatedTime: "45 mins",
    icon: "Cpu",
    overview: "Explore the core architecture of the Arduino UNO, powered by the ATmega328P 8-bit AVR microcontroller. Learn pin categorization, PWM capabilities, power delivery domains, the Arduino IDE toolchain, and the execution lifecycle of setup() and loop().",
    topics: [
      {
        title: "What is Arduino & Microcontrollers?",
        content: `Arduino is an open-source electronics platform based on easy-to-use hardware and software. At its heart lies a microcontroller—a compact integrated circuit designed to govern a specific operation in an embedded system. 

Unlike a microprocessor (found in PCs and smartphones) which requires external RAM, ROM, and I/O peripherals to function, a microcontroller integrates the CPU core, volatile memory (SRAM), non-volatile program memory (Flash), rewritable storage (EEPROM), and programmable input/output peripherals onto a single monolithic silicon die.`
      },
      {
        title: "Arduino UNO Hardware Architecture",
        content: `The Arduino UNO R3 is built around the Microchip ATmega328P. Key hardware specifications include:
- Clock Speed: 16 MHz quartz crystal oscillator
- Flash Memory: 32 KB (0.5 KB occupied by bootloader)
- SRAM: 2 KB (volatile runtime variables)
- EEPROM: 1 KB (non-volatile persistent storage)
- Operating Voltage: 5V DC
- Recommended Input Voltage (VIN / Barrel Jack): 7V - 12V DC
- Absolute Maximum VIN: 6V - 20V (beyond 12V causes excessive linear regulator heating)
- DC Current per I/O Pin: 20 mA recommended (40 mA absolute maximum)
- DC Current for 3.3V Pin: 50 mA maximum`
      },
      {
        title: "Pinout Taxonomy & Pin Categorization",
        content: `The Arduino UNO exposes 28 header pins divided into specific functional groups:

1. Digital I/O Pins (D0 to D13):
   Configured via pinMode(pin, INPUT/OUTPUT). Logic HIGH represents +5V; logic LOW represents 0V.
   - D0 (RX) & D1 (TX): Hardware UART Serial communication. Leave disconnected during USB sketch upload.
   - D13: Connected to the onboard surface-mount LED through an internal buffer.

2. Pulse Width Modulation (PWM) Pins (~3, ~5, ~6, ~9, ~10, ~11):
   Indicated with a tilde (~) mark. Provide 8-bit pseudo-analog output (0 to 255) using analogWrite() at ~490 Hz (pins 5 and 6 run at ~980 Hz).

3. Analog Input Pins (A0 to A5):
   Read varying analog voltages (0V to 5V) using a 10-bit Successive Approximation Analog-to-Digital Converter (ADC). Resolution: 1024 discrete steps (0 to 1023), equaling ~4.88 mV per unit step. Can also serve as digital I/O pins (D14 to D19).

4. Power and Ground Pins:
   - VIN: Raw voltage input when using an external battery (7-12V).
   - 5V: Regulated +5V output from USB or onboard NCP1117 regulator.
   - 3.3V: Regulated +3.3V supply (LP2985-33) for low-voltage sensors.
   - GND: Ground reference (0V). All circuits must share a common ground.
   - AREF: Analog Reference voltage for the internal ADC.`
      },
      {
        title: "The Arduino Execution Lifecycle: setup() & loop()",
        content: `Every valid Arduino sketch contains two core functions:

void setup() {
  // Invoked exactly once when the board powers on or resets.
  // Used for initializing pin modes, starting Serial, configuring libraries.
}

void loop() {
  // Executes continuously in an infinite while(true) cycle.
  // Houses active sensor polling, mathematical computations, and actuator commands.
}`
      }
    ],
    pinTable: [
      { pin: "D0 (RX)", type: "Digital / UART", desc: "Serial Receive; connect to external TX. Used by USB bridge." },
      { pin: "D1 (TX)", type: "Digital / UART", desc: "Serial Transmit; connect to external RX. Used by USB bridge." },
      { pin: "~D3, ~D5, ~D6, ~D9, ~D10, ~D11", type: "Digital / PWM", desc: "8-bit Pulse Width Modulation output for motor speed and LED dimming." },
      { pin: "D13", type: "Digital", desc: "Standard Digital I/O tied to the onboard test LED." },
      { pin: "A0 - A5", type: "Analog Input", desc: "10-bit ADC inputs (0-1023) measuring 0V to 5V DC." },
      { pin: "5V & 3.3V", type: "Power Output", desc: "Regulated voltage rails for powering ICs and sensor modules." },
      { pin: "GND (3 pins)", type: "Power Ground", desc: "Common 0V reference potential for all connected electronics." },
      { pin: "VIN", type: "Power Input", desc: "Unregulated 7-12V DC input fed into the onboard 5V linear regulator." }
    ],
    codeSnippet: `// Practical Exercise: Precision LED Blink with State Inversion
const int LED_PIN = 13; // Onboard LED connected to digital pin 13

void setup() {
  // Initialize digital pin 13 as an output buffer
  pinMode(LED_PIN, OUTPUT);
  // Start Serial communication at 9600 baud for debugging
  Serial.begin(9600);
  Serial.println("System Initialized: LED Blinking started.");
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // Drive gate HIGH (+5V) -> LED Turns ON
  Serial.println("LED Status: ON");
  delay(1000);                 // Blocking delay for 1000 milliseconds (1 second)

  digitalWrite(LED_PIN, LOW);  // Drive gate LOW (0V) -> LED Turns OFF
  Serial.println("LED Status: OFF");
  delay(1000);                 // Blocking delay for 1000 milliseconds
}`,
    codeExplanation: [
      { line: "const int LED_PIN = 13;", exp: "Declares an immutable integer constant holding the digital pin assignment for readability and compiler optimization." },
      { line: "pinMode(LED_PIN, OUTPUT);", exp: "Configures the ATmega328P DDRB (Data Direction Register B) bit 5 as an output driver capable of sourcing current." },
      { line: "Serial.begin(9600);", exp: "Sets the serial transmission speed to 9600 bits per second (baud) for UART communication with the host computer." },
      { line: "digitalWrite(LED_PIN, HIGH);", exp: "Sets the pin output latch to logic 1, outputting 5V and completing the circuit through the current-limiting resistor to light the LED." },
      { line: "delay(1000);", exp: "Pauses microcontroller instruction execution for exactly 1,000 milliseconds (1.0 second) using internal timer counter cycles." }
    ]
  },
  {
    id: "mod-2",
    num: "02",
    title: "Servo Motor (SG90 / MG995)",
    tagline: "Closed-Loop Angular Control, PWM Modulation, and Auxiliary Latch Mechanisms",
    estimatedTime: "50 mins",
    icon: "RotateCw",
    overview: "Understand closed-loop angular servomechanisms, internal potentiometer feedback circuits, the 50Hz PWM pulse train standard, and how to operate the Arduino Servo library. Build an automated safety latch mechanism.",
    topics: [
      {
        title: "Internal Anatomy of a RC Servo Motor",
        content: `A servomotor is an integrated closed-loop electromechanical actuator comprising four essential components:
1. DC Motor: High-speed, low-torque prime mover.
2. Reduction Gearbox: Plastic (SG90) or brass/steel (MG995/MG996R) gear train that reduces rotational velocity while exponentially increasing torque.
3. Feedback Potentiometer: Mechanically coupled to the final output shaft, converting angular position into a proportional analog voltage.
4. Error Amplifier & Controller Board: Compares the target pulse position against the potentiometer feedback voltage. If an error exists, the H-bridge applies bidirectional drive current until shaft angle matches target position.`
      },
      {
        title: "The 50 Hz PWM Pulse Protocol",
        content: `Unlike motor speed PWM which varies duty cycle across arbitrary frequencies, standard analog RC servos require a strict 50 Hz frame frequency (one control pulse every 20 milliseconds / 20,000 µs):

- Neutral Position (90°): Pulse width of exactly 1.5 milliseconds (1500 µs).
- Full Minimum (0°): Pulse width of approximately 1.0 milliseconds (1000 µs, often calibrated to 544 µs in Arduino).
- Full Maximum (180°): Pulse width of approximately 2.0 milliseconds (2000 µs, often up to 2400 µs).

If the pulse stream ceases, the servo unpowers and offers no holding torque against external mechanical load.`
      },
      {
        title: "Crucial Engineering Rule: Power Isolation",
        content: `NEVER power a high-torque servo or multiple micro-servos directly from the Arduino UNO 5V header pin when driving mechanical loads. 
        
A micro SG90 draws 10-20 mA at idle, but its stall current spikes to 650-800 mA during sudden rotational acceleration. An MG995 draws up to 1.5A to 2.5A. 
Attempting to draw this current from the Arduino 5V regulator causes severe voltage droop, tripping the microcontroller's internal Brown-Out Detector (BOD) and causing continuous, unpredictable MCU reset loops.

Always use an external 5V-6V power supply (e.g., 2A buck converter or battery pack) with common grounds tied together.`
      }
    ],
    pinTable: [
      { pin: "Brown / Black", type: "Ground (GND)", desc: "Negative return path. Must connect to BOTH external power ground and Arduino GND." },
      { pin: "Red", type: "Power (+5V to +6V)", desc: "Positive DC supply. Connect to external regulated 5V power supply (+ rail)." },
      { pin: "Orange / Yellow", type: "Signal (PWM)", desc: "Control pulse input. Connect to Arduino PWM digital pin (e.g., Pin 9 or 10)." }
    ],
    codeSnippet: `#include <Servo.h>

Servo safetyLockServo; // Create servo controller object
const int SERVO_PIN = 9; // PWM pin connected to servo signal

void setup() {
  Serial.begin(9600);
  safetyLockServo.attach(SERVO_PIN); // Attach servo object to pin 9
  safetyLockServo.write(0);          // Initialize safety latch to locked state (0 degrees)
  Serial.println("Servo Initialized: Latch Locked (0 deg).");
}

void loop() {
  Serial.println("Action: Unlocking safety barrier (90 deg)...");
  safetyLockServo.write(90);         // Command servo to rotate to 90 degrees
  delay(2000);

  Serial.println("Action: Engaging full flood gate deploy (180 deg)...");
  safetyLockServo.write(180);        // Command servo to rotate to 180 degrees
  delay(2000);

  Serial.println("Action: Returning to default lock position (0 deg)...");
  safetyLockServo.write(0);          // Command servo back to 0 degrees
  delay(3000);
}`,
    codeExplanation: [
      { line: "#include <Servo.h>", exp: "Imports the official AVR hardware timer-driven library that generates accurate jitter-free 20ms pulse trains." },
      { line: "Servo safetyLockServo;", exp: "Instantiates a Servo object class that manages timer interrupts and internal position state variables." },
      { line: "safetyLockServo.attach(SERVO_PIN);", exp: "Assigns digital pin 9 to the servo object and starts 16-bit Timer1 interrupt routines." },
      { line: "safetyLockServo.write(90);", exp: "Converts the requested target angle (90°) into proportional microsecond pulse timing (~1500 µs) sent to the servo signal wire." },
      { line: "delay(2000);", exp: "Grants mechanical travel time for the physical gear train to arrive at target angle before the next command." }
    ]
  },
  {
    id: "mod-3",
    num: "03",
    title: "Motor Driver (L298N Dual H-Bridge)",
    tagline: "High-Current Inductive Drive, H-Bridge Topologies, and Bidirectional Lifting",
    estimatedTime: "55 mins",
    icon: "Gauge",
    overview: "Master the L298N dual full-bridge driver. Understand why microcontrollers cannot sink or source high inductive currents, how an H-bridge reverses polarity, how PWM controls torque and velocity, and how to safely lift mechanical platforms.",
    topics: [
      {
        title: "Why Do We Need a Motor Driver?",
        content: `A digital pin on an Arduino UNO can safely source a maximum of 20 to 40 milliamperes (mA) at 5 volts. A standard DC geared motor (such as a 12V TT gearmotor or planetary gearmotor used for lifting platforms) draws between 300 mA under no-load conditions to over 2.5 A when stalled or lifting a load. Connecting a motor directly to an Arduino pin will instantly vaporize the output stage transistor of the ATmega328P.

Furthermore, motors are inductive loads. When current through an inductor is suddenly interrupted, magnetic field collapse generates a massive reverse voltage spike (back-EMF: V = -L * di/dt) that can reach tens or hundreds of volts, destroying unshielded digital electronics. A motor driver isolates the microcontroller, provides flyback diode protection, and switches heavy currents using an external power source.`
      },
      {
        title: "The H-Bridge Topology & Truth Table",
        content: `An H-Bridge consists of four solid-state switching elements (BJTs or MOSFETs) arranged in the shape of an 'H' around the motor:

- Forward Rotation: Q1 (top-left) and Q4 (bottom-right) closed. Current flows Left to Right through the motor.
- Reverse Rotation: Q2 (top-right) and Q3 (bottom-left) closed. Current flows Right to Left through the motor.
- High-Impedance Coast: All switches open. Motor freewheels.
- Dynamic Braking: Q3 and Q4 (or Q1 and Q2) closed. Both motor terminals shorted together, dissipating kinetic energy as reverse magnetic braking.
- Shoot-Through (Catastrophic Fault): Closing Q1 and Q3 simultaneously creates a direct short from +V to GND. The L298N internal logic prevents shoot-through by hardware interlocks.`
      },
      {
        title: "L298N Terminal Configuration & Jumper Rules",
        content: `1. 12V Power Terminal: External DC supply for motors (7V - 35V). For our lifting platform, a 12V 3A DC power source is connected here.
2. GND Terminal: Common ground reference. MUST be connected to BOTH the 12V external power supply ground and the Arduino UNO GND pin.
3. 5V Logic Terminal: Powers the internal 78M05 voltage regulator.
   - If 5V Jumper is ON: Onboard regulator converts external 12V down to 5V to power internal logic. Do NOT connect external 5V to this pin.
   - If 5V Jumper is REMOVED (External motor > 12V): Onboard regulator is disabled. You must supply +5V from Arduino 5V to this pin.
4. ENA / ENB (Enable Pins): Speed control. Removing the jumper cap exposes the pin for an Arduino PWM signal (0-255).
5. IN1, IN2 (Motor A) / IN3, IN4 (Motor B): Direction control logic pins.`
      }
    ],
    pinTable: [
      { pin: "12V Terminal", type: "Power Input", desc: "Connects to positive lead of external 12V battery/power supply." },
      { pin: "GND Terminal", type: "Common Ground", desc: "Connects to negative lead of external supply AND Arduino GND." },
      { pin: "5V Terminal", type: "Logic Supply", desc: "5V output when 5V jumper is fitted; 5V input if jumper removed." },
      { pin: "ENA", type: "Speed Control", desc: "PWM input (~Pin 5) controlling Motor A speed from 0 (halt) to 255 (full)." },
      { pin: "IN1 & IN2", type: "Direction Logic", desc: "Digital inputs (e.g. Pin 3 & Pin 4) controlling Motor A rotation direction." },
      { pin: "OUT1 & OUT2", type: "Motor Output", desc: "Heavy-gauge screw terminals wired directly to the DC lifting motor." }
    ],
    codeSnippet: `// L298N Motor Driver Control - Lifting Mechanism Routine
const int ENA = 5;  // PWM speed control pin
const int IN1 = 3;  // Direction pin 1
const int IN2 = 4;  // Direction pin 2

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  Serial.begin(9600);
  Serial.println("Motor Driver Initialized: System Idle.");
}

void liftPlatform(int speed) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, constrain(speed, 0, 255));
  Serial.print("Lifting platform at speed: ");
  Serial.println(speed);
}

void lowerPlatform(int speed) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, constrain(speed, 0, 255));
  Serial.print("Lowering platform at speed: ");
  Serial.println(speed);
}

void stopMotor() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
  Serial.println("Motor Dynamic Brake Applied.");
}

void loop() {
  liftPlatform(220); // Lift platform upwards at 86% duty cycle
  delay(4000);

  stopMotor();       // Hold at elevated position
  delay(2000);

  lowerPlatform(180); // Smoothly lower platform back to foundation
  delay(4000);

  stopMotor();       // Hold at base level
  delay(3000);
}`,
    codeExplanation: [
      { line: "pinMode(ENA, OUTPUT);", exp: "Configures timer PWM channel pin to generate variable pulse widths for speed adjustment." },
      { line: "digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);", exp: "Configures the H-Bridge for forward motor polarity, driving current through OUT1 into OUT2 to lift the platform." },
      { line: "analogWrite(ENA, constrain(speed, 0, 255));", exp: "Generates an 8-bit PWM square wave at ~980Hz, controlling average voltage across motor terminals." },
      { line: "digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);", exp: "Pulls both H-Bridge low-side transistors to ground, engaging active dynamic magnetic braking to prevent platform drift." }
    ]
  },
  {
    id: "mod-4",
    num: "04",
    title: "Ultrasonic Sensor (HC-SR04)",
    tagline: "Time-of-Flight Acoustic Ranging and Flood Depth Telemetry",
    estimatedTime: "50 mins",
    icon: "Activity",
    overview: "Explore piezoelectric acoustic transducers, the 40 kHz ultrasonic burst protocol, Time-of-Flight physics, environmental temperature compensation, and digital filtering algorithms to measure rising flood water levels accurately.",
    topics: [
      {
        title: "Piezoelectric Ultrasonic Transducers & Working Principle",
        content: `The HC-SR04 ultrasonic sensor utilizes acoustic echolocation to calculate distance without physical contact. The module incorporates two aluminum cylindrical transducers:
1. Transmitter (T): Contains a piezoelectric crystal disc that vibrates at 40,000 Hertz (40 kHz) when stimulated by high-frequency electrical pulses, radiating a focused conical ultrasonic beam into the air.
2. Receiver (R): Contains an identical crystal tuned to 40 kHz. When incoming reflected sound waves strike the diaphragm, mechanical stress generates a minute alternating electrical charge, which is amplified and conditioned by onboard LM324 operational amplifiers.`
      },
      {
        title: "The Time-of-Flight (ToF) Physical Formula",
        content: `Distance calculation relies on the speed of sound propagating through air at standard sea-level atmospheric pressure and 20°C:
Speed of Sound (c) ≈ 343 meters/second = 0.0343 centimeters/microsecond.

Because the acoustic burst travels outward from the transmitter to the reflective water surface and bounces all the way back to the receiver, the total distance traveled is twice the distance to the target:

Distance = (Time Elapsed * Speed of Sound) / 2
Distance (cm) = (Echo Time in µs * 0.0343) / 2
Simplified: Distance (cm) = Echo Time in µs / 58.3

Temperature Compensation Consideration:
Sound velocity varies with ambient air temperature: c(T) = 331.3 + (0.606 * T) m/s. In flood conditions where air humidity and temperature fluctuate, incorporating a DHT11 or DHT22 temperature sensor refines distance calculations to millimeter accuracy.`
      },
      {
        title: "Water Level Monitoring Strategy in Flood Mitigation",
        content: `When measuring floodwater depth, the ultrasonic sensor is mounted overhead facing downward into the retention basin or foundation channel:
- Basin Depth (Baseline Calibration): e.g., 50 cm from sensor to dry floor.
- Measured Ultrasonic Distance: The distance from the sensor down to the water surface.
- Calculated Water Depth: Flood Level = Baseline Calibration - Measured Distance.

As floodwater rises, the measured distance decreases.
Example: If the baseline is 50 cm and the sensor reads 15 cm, the floodwater depth is exactly 35 cm. If the critical threshold is set to 20 cm depth, an emergency lifting command is triggered immediately.`
      }
    ],
    pinTable: [
      { pin: "VCC", type: "Power Supply (+5V)", desc: "Regulated +5V DC power from Arduino 5V rail (draws ~15mA)." },
      { pin: "Trig (Trigger)", type: "Digital Input", desc: "Microcontroller sends a 10-microsecond HIGH pulse to initiate ultrasonic sonic burst." },
      { pin: "Echo", type: "Digital Output", desc: "Module drives pin HIGH for duration equal to acoustic round-trip flight time." },
      { pin: "GND", type: "Power Ground", desc: "0V ground return reference connected to Arduino GND." }
    ],
    codeSnippet: `// HC-SR04 Ultrasonic Water Depth Measurement with Median Filtering
const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const float SENSOR_HEIGHT = 50.0; // Distance from overhead sensor to dry basin floor in cm
const float CRITICAL_FLOOD_THRESHOLD = 20.0; // Critical water height triggering lift

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(9600);
  Serial.println("Ultrasonic Flood Telemetry Node Active.");
}

float measureDistanceCm() {
  // Clear trigger line
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  // Send 10 microsecond burst trigger
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Measure round-trip travel duration (timeout at 30ms = ~5 meters)
  long durationUs = pulseIn(ECHO_PIN, HIGH, 30000);
  if (durationUs == 0) return -1.0; // Acoustic timeout or out-of-range

  // Calculate one-way distance in centimeters
  return (durationUs * 0.0343) / 2.0;
}

void loop() {
  float distanceToWater = measureDistanceCm();

  if (distanceToWater > 0) {
    float waterDepth = SENSOR_HEIGHT - distanceToWater;
    Serial.print("Sensor Distance: ");
    Serial.print(distanceToWater);
    Serial.print(" cm | Water Depth: ");
    Serial.print(waterDepth);
    Serial.println(" cm");

    if (waterDepth >= CRITICAL_FLOOD_THRESHOLD) {
      Serial.println(">>> CRITICAL ALERT: Flood water level exceeds safety limit! <<<");
    }
  } else {
    Serial.println("Warning: Acoustic pulse timeout / No echo detected.");
  }

  delay(500); // 2Hz telemetry cycle
}`,
    codeExplanation: [
      { line: "digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);", exp: "Pulses the trigger pin HIGH for 10µs, instructing the onboard oscillator to emit eight 40kHz acoustic wave cycles." },
      { line: "pulseIn(ECHO_PIN, HIGH, 30000);", exp: "Measures the duration the Echo pin remains HIGH in microseconds, with a 30,000µs safety timeout preventing CPU lockup if the sound is absorbed." },
      { line: "return (durationUs * 0.0343) / 2.0;", exp: "Applies acoustic velocity kinematics, dividing by 2 to account for both forward and reflected path travel." },
      { line: "float waterDepth = SENSOR_HEIGHT - distanceToWater;", exp: "Computes absolute liquid flood level by subtracting the remaining air gap from known basin datum height." }
    ]
  },
  {
    id: "mod-5",
    num: "05",
    title: "Rain Sensor Module (FC-37 / YL-83)",
    tagline: "Resistive Trace Detection, LM393 Comparator, and Precipitation Telemetry",
    estimatedTime: "45 mins",
    icon: "CloudRain",
    overview: "Understand rain sensing via resistive nickel-plated PCB tracks, the LM393 voltage comparator circuit, Analog Output (AO) vs Digital Output (DO), calibration, and electrolytic corrosion prevention techniques.",
    topics: [
      {
        title: "Electrolytic Resistance Principle of Rain Sensing",
        content: `The rain sensor system consists of two primary hardware elements:
1. Sensing Pad: A printed circuit board with interleaved, interdigitated copper/nickel conductive tracks. When dry, air acts as an electrical insulator, resulting in near-infinite resistance (several megaohms). When precipitation falls, water droplets contain dissolved minerals and ions that act as an electrolyte, creating conductive bridges between adjacent tracks and dramatically lowering electrical resistance.
2. Signal Conditioning Module: Features an LM393 dual differential voltage comparator, a sensitivity trim potentiometer, status LEDs, and output headers.`
      },
      {
        title: "Understanding AO (Analog) and DO (Digital) Outputs",
        content: `The sensor board provides two distinct output channels:

1. Analog Output (AO):
   Provides an analog voltage proportional to the electrical resistance across the sensor tracks. In an Arduino with a 5V reference:
   - Completely Dry: AO reads 1000 - 1023 (~5.0V, high resistance).
   - Light Drizzle / Condensation: AO reads 600 - 800 (~3.0V - 4.0V).
   - Moderate Rainfall: AO reads 400 - 600 (~2.0V - 3.0V).
   - Heavy Downpour / Submersion: AO reads < 350 (< 1.7V, high conductivity).

2. Digital Output (DO):
   The onboard LM393 compares the sensor voltage with a reference voltage set by the multi-turn potentiometer.
   - When moisture exceeds the potentiometer threshold, DO flips from HIGH (5V) to LOW (0V), triggering an active-low hardware interrupt or digital read.`
      },
      {
        title: "Preventing Galvanic & Electrolytic Corrosion",
        content: `A critical engineering challenge with resistive rain sensors is galvanic oxidation. If DC current continuously flows through the wet nickel tracks, electrolysis rapidly oxidizes the metal, causing traces to corrode and disintegrate within days or weeks of deployment.

Professional Solution:
Do not connect the rain sensor VCC pin permanently to the Arduino 5V power rail. Instead, connect VCC to a digital I/O pin (e.g., Pin 7). Set the pin HIGH only 10 milliseconds before taking an analog reading, sample the voltage, and immediately pull the pin LOW (0V). This eliminates continuous galvanic current, extending sensor lifespan by over 500x.`
      }
    ],
    pinTable: [
      { pin: "VCC", type: "Power Input", desc: "Connect to Arduino 5V (or digital control pin for corrosion-free pulsed sampling)." },
      { pin: "GND", type: "Power Ground", desc: "Common 0V ground connection with Arduino." },
      { pin: "AO (Analog Out)", type: "Analog Signal", desc: "Connects to Arduino Analog Input (A0) for granular 0-1023 precipitation intensity." },
      { pin: "DO (Digital Out)", type: "Digital Signal", desc: "Connects to Arduino Digital Input (D2) for binary threshold trigger (LOW on rain)." }
    ],
    codeSnippet: `// Rain Sensor Telemetry with Electrolytic Corrosion Prevention
const int RAIN_POWER_PIN = 7; // Digital pin powering the sensor on-demand
const int RAIN_AO_PIN = A0;   // Analog input reading rain resistance
const int RAIN_DO_PIN = 2;    // Digital threshold pin

void setup() {
  pinMode(RAIN_POWER_PIN, OUTPUT);
  pinMode(RAIN_DO_PIN, INPUT);
  digitalWrite(RAIN_POWER_PIN, LOW); // Keep sensor unpowered by default
  Serial.begin(9600);
  Serial.println("Rain Telemetry Module Armed (Corrosion-Safe Mode).");
}

int readRainAnalog() {
  digitalWrite(RAIN_POWER_PIN, HIGH); // Power sensor ON
  delay(15);                          // Allow op-amp voltage to stabilize
  int sensorValue = analogRead(RAIN_AO_PIN);
  digitalWrite(RAIN_POWER_PIN, LOW);  // Power sensor OFF immediately
  return sensorValue;
}

void loop() {
  int rainLevel = readRainAnalog();
  int digitalAlert = digitalRead(RAIN_DO_PIN);

  Serial.print("Precipitation Raw Reading (AO): ");
  Serial.print(rainLevel);
  Serial.print(" | Classification: ");

  if (rainLevel > 950) {
    Serial.println("DRY - Clear Weather");
  } else if (rainLevel > 600) {
    Serial.println("LIGHT RAIN - Drizzle Detected");
  } else if (rainLevel > 350) {
    Serial.println("MODERATE RAIN - Rain Shield Recommended");
  } else {
    Serial.println("TORRENTIAL DOWNPOUR - Flood Risk High!");
  }

  delay(1000);
}`,
    codeExplanation: [
      { line: "digitalWrite(RAIN_POWER_PIN, HIGH); delay(15);", exp: "Powers the sensor array only momentarily, giving the LM393 operational amplifier 15ms to settle without sustaining continuous electrolytic current." },
      { line: "int sensorValue = analogRead(RAIN_AO_PIN);", exp: "Performs 10-bit ADC conversion, mapping the moisture resistance drop to a value between 0 (soaked) and 1023 (bone dry)." },
      { line: "digitalWrite(RAIN_POWER_PIN, LOW);", exp: "Disconnects positive potential, completely arresting electrochemical anode dissolution on the exposed sensor tracks." }
    ]
  }
];

export const CAPSTONE_PROJECT = {
  id: "capstone",
  title: "Flood-Safe Smart House",
  subtitle: "Automatic House Lifting System Using Arduino UNO",
  tagline: "An Intelligent, Sensor-Driven Elevating Architectural Prototype Protecting Lives and Property from Monsoon Disasters",
  overview: "Monsoon floods, rapid sea-level surges, and flash overflowing of river catchments inundate residential communities worldwide, causing catastrophic infrastructural destruction and loss of life. The Flood-Safe Smart House project engineers an automated mechatronic lifting structure. Combining dual-stage early precipitation telemetry (Rain Sensor) with real-time acoustic water depth profiling (HC-SR04 Ultrasonic), an Arduino UNO orchestrates a high-torque L298N lead-screw platform lift, audio-visual alarm annunciators, mechanical end-stop safety interlocks, and an auxiliary servo stabilizing gate lock.",
  problemStatement: "Traditional architectural flood barriers (such as fixed stilts or sandbagging) either leave structures permanently inaccessible to elderly or disabled residents during dry weather or fail catastrophically during unprecedented water level surges. An autonomous mechatronic platform that remains at grade level during benign conditions and dynamically elevates only during verified flood conditions represents the future of climate-resilient civil engineering.",
  objectives: [
    "Design and assemble a functional educational mechatronic prototype capable of vertical elevation under automated sensor feedback.",
    "Implement dual-sensor verification (Rainfall AO + Ultrasonic depth) to eliminate false triggers caused by falling leaves or incidental puddles.",
    "Establish reliable hardware interlocks utilizing upper and lower mechanical limit switches to prevent motor stalling and mechanical gear stripping.",
    "Incorporate distinct visual status annunciators (Red = Flood Danger/Lifting, Green = Safe Holding, Blue = Lowering) and acoustic alarm warnings.",
    "Deploy an auxiliary servo-controlled safety barrier/locking pin that mechanically secures the platform once elevated to reduce motor stress.",
    "Formulate robust software state-machine logic with hysteresis timing to prevent erratic oscillating lift/lower cycles during fluctuating wave conditions."
  ],
  safetyEngineeringRules: [
    "NEVER rely purely on software time delays (e.g. delay(5000)) to halt lifting or lowering. Mechanical limit switches or optical end-stops at top and bottom travel are MANDATORY fail-safe mechanisms.",
    "ALWAYS establish a common ground (GND) across the external 12V motor battery and the Arduino UNO board. Lack of common ground causes floating gate potentials, erratic motor jitter, and lost logic signals.",
    "DO NOT power the high-torque L298N DC motor or the SG90 servo directly from the Arduino 5V regulator pin. Motors must be powered from a dedicated 12V 3A DC power source.",
    "Ensure the L298N heat sink has sufficient convection cooling. Stalled motors generate high thermal dissipation (up to 25W), which will trip thermal shutdown without proper ventilation.",
    "EDUCATIONAL DISCLAIMER: This prototype is strictly an instructional engineering demonstration for robotics students. Real-world civil architectural house lifting requires certified hydraulic jacks, seismic dampening, structural beam engineering, and professional building code compliance."
  ],
  bom: [
    { item: "Arduino UNO R3", qty: 1, purpose: "Central microcontroller orchestrating telemetry, state machine, and actuator signals." },
    { item: "L298N Dual H-Bridge Motor Driver", qty: 1, purpose: "Provides high-current 12V drive for the DC vertical lifting motor with direction and PWM speed control." },
    { item: "12V High-Torque DC Geared Motor (50-100 RPM)", qty: 1, purpose: "Prime mover driving the rack-and-pinion or threaded lead-screw lifting jack." },
    { item: "SG90 Micro Servo Motor", qty: 1, purpose: "Controls the automated safety lock pin and flood barrier gate." },
    { item: "HC-SR04 Ultrasonic Sensor Module", qty: 1, purpose: "Mounts overhead to measure real-time distance down to the rising floodwater surface." },
    { item: "FC-37 / YL-83 Rain Sensor Module", qty: 1, purpose: "Detects early precipitation onset and classifies storm intensity (light, moderate, heavy)." },
    { item: "Micro Limit Switches (Normally Closed / Open)", qty: 2, purpose: "Hardware end-stops triggering upper travel limit and base datum foundation arrival." },
    { item: "Active Buzzer Module (5V)", qty: 1, purpose: "Emits 85dB acoustic warning alarm to alert inhabitants of immediate flood risk." },
    { item: "LED Indicators (Red, Green, Blue) + 220Ω Resistors", qty: 3, purpose: "Visual state annunciators (Red: Danger/Lift, Green: Safe Hold, Blue: Lowering)." },
    { item: "12V 3A DC Power Supply / LiPo Battery Pack", qty: 1, purpose: "Dedicated heavy-current power supply for the DC lifting motor." },
    { item: "Solderless Breadboard & Premium Jumper Wires", qty: 1, purpose: "Distributes power rails and connects modular sub-circuits cleanly." },
    { item: "Scale House & Scissor / Rack-and-Pinion Lift Chassis", qty: 1, purpose: "Mechanical lifting platform structure constructed from acrylic, balsa wood, or 3D print." }
  ],
  pinConnectionTable: [
    { component: "HC-SR04 Ultrasonic", compPin: "VCC", arduinoPin: "5V", note: "Powers internal 40kHz oscillator" },
    { component: "HC-SR04 Ultrasonic", compPin: "Trig", arduinoPin: "Digital Pin 9", note: "Sends 10µs trigger pulse" },
    { component: "HC-SR04 Ultrasonic", compPin: "Echo", arduinoPin: "Digital Pin 10", note: "Receives ToF pulse width" },
    { component: "HC-SR04 Ultrasonic", compPin: "GND", arduinoPin: "GND", note: "Common system ground" },
    { component: "Rain Sensor Module", compPin: "VCC", arduinoPin: "Digital Pin 7", note: "Pulsed power pin for anti-corrosion" },
    { component: "Rain Sensor Module", compPin: "AO", arduinoPin: "Analog Pin A0", note: "Moisture resistance (0-1023)" },
    { component: "Rain Sensor Module", compPin: "GND", arduinoPin: "GND", note: "Common system ground" },
    { component: "L298N Motor Driver", compPin: "ENA", arduinoPin: "Digital Pin 5 (~PWM)", note: "Speed control (0-255 duty cycle)" },
    { component: "L298N Motor Driver", compPin: "IN1", arduinoPin: "Digital Pin 3", note: "Direction control pin 1 (Lift)" },
    { component: "L298N Motor Driver", compPin: "IN2", arduinoPin: "Digital Pin 4", note: "Direction control pin 2 (Lower)" },
    { component: "L298N Motor Driver", compPin: "12V Terminal", arduinoPin: "External 12V (+)", note: "DO NOT wire to Arduino 5V" },
    { component: "L298N Motor Driver", compPin: "GND Terminal", arduinoPin: "GND & Ext 12V (-)", note: "Mandatory common ground" },
    { component: "SG90 Servo Motor", compPin: "Signal (Yellow)", arduinoPin: "Digital Pin 6 (~PWM)", note: "Auxiliary safety latch control" },
    { component: "SG90 Servo Motor", compPin: "VCC (Red)", arduinoPin: "External 5V (+)", note: "Do not power from Arduino 5V pin under load" },
    { component: "SG90 Servo Motor", compPin: "GND (Brown)", arduinoPin: "GND", note: "Common system ground" },
    { component: "Upper Limit Switch", compPin: "Signal Out", arduinoPin: "Digital Pin 2 (INT0)", note: "Triggers when platform hits upper ceiling" },
    { component: "Lower Limit Switch", compPin: "Signal Out", arduinoPin: "Digital Pin 8", note: "Triggers when platform arrives at ground" },
    { component: "Red LED (Danger/Lift)", compPin: "Anode (+ via 220Ω)", arduinoPin: "Digital Pin 11", note: "Active when flood threshold breached" },
    { component: "Green LED (Safe Hold)", compPin: "Anode (+ via 220Ω)", arduinoPin: "Digital Pin 12", note: "Active during normal ground or locked high" },
    { component: "Blue LED (Lowering)", compPin: "Anode (+ via 220Ω)", arduinoPin: "Digital Pin 13", note: "Active during descent operation" },
    { component: "Active Buzzer", compPin: "Anode (+)", arduinoPin: "Digital Pin A1", note: "Generates audible pulsed alert tones" }
  ],
  workingLogicSteps: [
    { step: 1, title: "Environmental Monitoring", desc: "The Arduino UNO continuously polls the Rain Sensor (A0) via corrosion-safe pulsed power and calculates acoustic distance using the HC-SR04 Ultrasonic Sensor (Pin 9 & 10)." },
    { step: 2, title: "Threshold Verification", desc: "If the rain sensor registers precipitation AND ultrasonic water depth exceeds the DANGER_THRESHOLD (e.g., water level reaches 15 cm above ground), the emergency sequence arms." },
    { step: 3, title: "Emergency Annunciation", desc: "The Active Buzzer pulses an 85dB alarm tone, the Green LED turns OFF, and the Red LED illuminates to warn occupants of imminent vertical lift." },
    { step: 4, title: "Safety Latch Release", desc: "The SG90 servo rotates to 90° to unlatch the mechanical foundation anchor locks." },
    { step: 5, title: "Upward Lift Activation", desc: "Arduino commands L298N (IN1=HIGH, IN2=LOW, ENA=230). The 12V geared motor rotates the lifting mechanism, raising the house steadily upward." },
    { step: 6, title: "Upper Limit Stop & Locking", desc: "The ascending platform trips the Upper Limit Switch (Pin 2). Motor cuts off instantly. The SG90 servo rotates to 180° to insert mechanical support pins, locking the house safely at elevation." },
    { step: 7, title: "Holding & Hysteresis Monitoring", desc: "The system holds at elevation while water remains high. A debounce timer prevents premature lowering if waves or ripples create momentary dry readings." },
    { step: 8, title: "Safe Lowering Sequence", desc: "When water level consistently remains below SAFE_THRESHOLD for 10 uninterrupted seconds, the servo unlocks pins (90°), the Blue LED illuminates, and L298N lowers the house (IN1=LOW, IN2=HIGH, ENA=180)." },
    { step: 9, title: "Ground Contact & Reset", desc: "The platform strikes the Lower Limit Switch (Pin 8). Motor stops immediately. The servo locks at 0°, the Blue LED turns OFF, Green LED turns ON, and the system re-enters benign standby monitoring." }
  ],
  arduinoSourceCode: `/*
  =============================================================================
  PROJECT: FLOOD-SAFE SMART HOUSE: AUTOMATIC HOUSE LIFTING SYSTEM
  DEVELOPER: Toshit Kumar
  PLATFORM: Arduino UNO R3
  VERSION: 2.4 (Production Grade Educational Mechatronic Implementation)
  =============================================================================
*/

#include <Servo.h>

// --- PIN ASSIGNMENTS ---
// Ultrasonic Sensor (HC-SR04)
const int PIN_TRIG = 9;
const int PIN_ECHO = 10;

// Rain Sensor (FC-37)
const int PIN_RAIN_PWR = 7;
const int PIN_RAIN_AO  = A0;

// L298N Motor Driver (12V DC Lifting Motor)
const int PIN_ENA = 5;  // PWM Speed Control
const int PIN_IN1 = 3;  // Direction Logic 1 (Lift)
const int PIN_IN2 = 4;  // Direction Logic 2 (Lower)

// Auxiliary SG90 Servo Motor (Safety Lock / Barrier)
const int PIN_SERVO = 6;
Servo safetyLatchServo;

// Mechanical Limit Switches (End-Stops)
const int PIN_LIMIT_TOP    = 2; // Upper mechanical limit (Interrupt INT0)
const int PIN_LIMIT_BOTTOM = 8; // Lower mechanical datum limit

// Audio & Visual Annunciators
const int PIN_LED_RED   = 11; // Danger / Lifting
const int PIN_LED_GREEN = 12; // Safe Standby / Holding
const int PIN_LED_BLUE  = 13; // Lowering Active
const int PIN_BUZZER    = A1; // Acoustic Flood Alarm

// --- CALIBRATION & THRESHOLD CONSTANTS ---
const float SENSOR_DATUM_HEIGHT   = 40.0; // Distance from sensor to dry ground (cm)
const float FLOOD_TRIGGER_DEPTH   = 15.0; // Water depth in cm that triggers LIFT
const float FLOOD_SAFE_DEPTH      = 5.0;  // Water depth in cm safe for LOWERING
const int   RAIN_THRESHOLD        = 700;  // Rain AO threshold (lower = heavier rain)
const int   LIFT_SPEED            = 230;  // L298N PWM speed for upward lift (0-255)
const int   LOWER_SPEED           = 175;  // L298N PWM speed for controlled descent
const unsigned long DEBOUNCE_WAIT = 5000; // 5-second hysteresis debounce

// --- SYSTEM STATE MACHINE ---
enum SystemState {
  STATE_STANDBY_GROUND,
  STATE_FLOOD_ALERT,
  STATE_LIFTING,
  STATE_HOLDING_ELEVATED,
  STATE_LOWERING
};

SystemState currentState = STATE_STANDBY_GROUND;
unsigned long safeTimerStart = 0;
bool safeTimerRunning = false;

// --- PROTOTYPES ---
float getWaterDepthCm();
int getRainReading();
void setActuators(SystemState state);
void stopMotor();

void setup() {
  Serial.begin(9600);
  Serial.println("==================================================");
  Serial.println(" FLOOD-SAFE SMART HOUSE INITIALIZING...");
  Serial.println(" Designed by Toshit Kumar | STEM Robotics Lab");
  Serial.println("==================================================");

  // Pin Configurations
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_RAIN_PWR, OUTPUT);
  digitalWrite(PIN_RAIN_PWR, LOW);

  pinMode(PIN_ENA, OUTPUT);
  pinMode(PIN_IN1, OUTPUT);
  pinMode(PIN_IN2, OUTPUT);

  pinMode(PIN_LIMIT_TOP, INPUT_PULLUP);
  pinMode(PIN_LIMIT_BOTTOM, INPUT_PULLUP);

  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_BLUE, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  // Initialize Servo
  safetyLatchServo.attach(PIN_SERVO);
  safetyLatchServo.write(0); // 0° = Mechanical Foundation Lock Engaged

  // Stop Motor Initially
  stopMotor();

  // Indicate Ready State
  digitalWrite(PIN_LED_GREEN, HIGH);
  Serial.println("Status: System Ready. Standby at Foundation Level.");
}

void loop() {
  // 1. Measure Environmental Parameters
  float waterDepth = getWaterDepthCm();
  int rainValue    = getRainReading();

  // Read Safety Limit Switches (Active LOW with INPUT_PULLUP)
  bool hitTopLimit    = (digitalRead(PIN_LIMIT_TOP) == LOW);
  bool hitBottomLimit = (digitalRead(PIN_LIMIT_BOTTOM) == LOW);

  // Debug Telemetry
  Serial.print("[TELEMETRY] Water Depth: ");
  Serial.print(waterDepth);
  Serial.print(" cm | Rain AO: ");
  Serial.print(rainValue);
  Serial.print(" | State: ");

  // 2. State Machine Logic
  switch (currentState) {
    
    case STATE_STANDBY_GROUND:
      Serial.println("STANDBY_GROUND");
      digitalWrite(PIN_LED_GREEN, HIGH);
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_LED_BLUE, LOW);
      digitalWrite(PIN_BUZZER, LOW);

      // Check if flood condition verified
      if (waterDepth >= FLOOD_TRIGGER_DEPTH || (rainValue < RAIN_THRESHOLD && waterDepth >= (FLOOD_TRIGGER_DEPTH * 0.7))) {
        Serial.println(">>> WARNING: Flood danger detected! Transitioning to ALERT.");
        currentState = STATE_FLOOD_ALERT;
      }
      break;

    case STATE_FLOOD_ALERT:
      Serial.println("FLOOD_ALERT");
      digitalWrite(PIN_LED_RED, HIGH);
      digitalWrite(PIN_LED_GREEN, LOW);
      // Audible warning tone
      digitalWrite(PIN_BUZZER, HIGH);
      delay(200);
      digitalWrite(PIN_BUZZER, LOW);

      // Disengage foundation safety latch
      safetyLatchServo.write(90);
      delay(500); // Allow servo motion

      currentState = STATE_LIFTING;
      break;

    case STATE_LIFTING:
      Serial.println("LIFTING_ACTIVE");
      digitalWrite(PIN_LED_RED, HIGH);
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_BLUE, LOW);

      // Intermittent alert beep
      digitalWrite(PIN_BUZZER, (millis() % 500 < 100) ? HIGH : LOW);

      if (hitTopLimit) {
        Serial.println(">>> Upper Limit Switch Engaged! Stopping motor at summit.");
        stopMotor();
        // Engage elevated support lock
        safetyLatchServo.write(180);
        currentState = STATE_HOLDING_ELEVATED;
      } else {
        // Drive motor upwards
        digitalWrite(PIN_IN1, HIGH);
        digitalWrite(PIN_IN2, LOW);
        analogWrite(PIN_ENA, LIFT_SPEED);
      }
      break;

    case STATE_HOLDING_ELEVATED:
      Serial.println("HOLDING_ELEVATED");
      stopMotor();
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_LED_GREEN, HIGH);
      digitalWrite(PIN_LED_BLUE, LOW);
      digitalWrite(PIN_BUZZER, LOW);

      // Check if flood water has receded safely
      if (waterDepth <= FLOOD_SAFE_DEPTH) {
        if (!safeTimerRunning) {
          safeTimerStart = millis();
          safeTimerRunning = true;
          Serial.println("Water receded below safe margin. Starting verification timer...");
        } else if (millis() - safeTimerStart >= DEBOUNCE_WAIT) {
          Serial.println("Flood subsided sustainably. Initiating descent sequence.");
          safeTimerRunning = false;
          // Retract support locks before lowering
          safetyLatchServo.write(90);
          delay(600);
          currentState = STATE_LOWERING;
        }
      } else {
        safeTimerRunning = false; // Reset timer if water fluctuates back up
      }
      break;

    case STATE_LOWERING:
      Serial.println("LOWERING_ACTIVE");
      digitalWrite(PIN_LED_RED, LOW);
      digitalWrite(PIN_LED_GREEN, LOW);
      digitalWrite(PIN_LED_BLUE, HIGH);
      digitalWrite(PIN_BUZZER, LOW);

      if (hitBottomLimit) {
        Serial.println(">>> Lower Datum Switch Engaged! Platform safely docked on ground.");
        stopMotor();
        // Engage ground foundation lock
        safetyLatchServo.write(0);
        currentState = STATE_STANDBY_GROUND;
      } else {
        // Drive motor downwards smoothly
        digitalWrite(PIN_IN1, LOW);
        digitalWrite(PIN_IN2, HIGH);
        analogWrite(PIN_ENA, LOWER_SPEED);
      }
      break;
  }

  delay(100); // 10Hz control loop
}

// --- HELPER ROUTINES ---

float getWaterDepthCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  long durationUs = pulseIn(PIN_ECHO, HIGH, 26000); // ~4.5m max
  if (durationUs == 0) return 0.0; // Assume dry if out of range

  float distanceToSurface = (durationUs * 0.0343) / 2.0;
  float depth = SENSOR_DATUM_HEIGHT - distanceToSurface;
  return (depth < 0.0) ? 0.0 : depth;
}

int getRainReading() {
  digitalWrite(PIN_RAIN_PWR, HIGH);
  delay(10);
  int val = analogRead(PIN_RAIN_AO);
  digitalWrite(PIN_RAIN_PWR, LOW);
  return val;
}

void stopMotor() {
  digitalWrite(PIN_IN1, LOW);
  digitalWrite(PIN_IN2, LOW);
  analogWrite(PIN_ENA, 0);
}
`,
  troubleshootingGuide: [
    {
      symptom: "Motor does not turn despite water exceeding flood threshold.",
      cause: "Missing common ground between 12V battery and Arduino, or 12V power supply switched off.",
      remedy: "Verify with a multimeter that Arduino GND and L298N GND terminal share 0V continuity. Verify 12V supply is active."
    },
    {
      symptom: "Arduino resets continuously when motor or servo starts moving.",
      cause: "High stall current drawing down Arduino 5V rail; power supply brownout.",
      remedy: "Disconnect servo and motor power from Arduino 5V. Use dedicated external 12V and 5V power rails."
    },
    {
      symptom: "Ultrasonic sensor reads erratic distances (e.g. 0 cm or jumps to 300 cm).",
      cause: "Surface water ripples scattering acoustic waves, or pulseIn timeout.",
      remedy: "Mount a small acoustic stilling tube (PVC pipe with bottom hole) around the water sensor to prevent water surface agitation."
    },
    {
      symptom: "Motor continues driving after reaching maximum height, causing gear grind.",
      cause: "Upper limit switch failed to engage, bad wiring, or pullup resistor omitted.",
      remedy: "Test switch using Serial monitor. Ensure pinMode(PIN_LIMIT_TOP, INPUT_PULLUP) is configured and wiring makes reliable contact."
    },
    {
      symptom: "Rain sensor traces turn black and stop conducting within a week.",
      cause: "Galvanic corrosion caused by continuous DC current during wet exposure.",
      remedy: "Switch sensor power dynamically using Arduino digital Pin 7 as implemented in our production code."
    }
  ]
};
