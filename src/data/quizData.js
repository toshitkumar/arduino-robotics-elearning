// Comprehensive Assessment Bank
// 10 MCQs per module (5 modules = 50 MCQs) + 10 Capstone MCQs = 60 MCQs Total
// Author: Toshit Kumar

export const QUIZZES = {
  "mod-1": [
    {
      q: "What is the primary microcontroller chip found on the official Arduino UNO R3?",
      options: ["ATmega2560", "ATmega328P", "ESP32-WROOM", "PIC16F877A"],
      answer: 1,
      explanation: "The Arduino UNO R3 is powered by the Microchip (Atmel) ATmega328P 8-bit AVR RISC microcontroller."
    },
    {
      q: "What is the clock operating frequency of the quartz crystal oscillator on the Arduino UNO?",
      options: ["8 MHz", "16 MHz", "48 MHz", "100 MHz"],
      answer: 1,
      explanation: "The Arduino UNO operates at a standard system clock frequency of 16 MHz."
    },
    {
      q: "How many 10-bit Analog Input channels are available on the standard Arduino UNO?",
      options: ["4 (A0 to A3)", "6 (A0 to A5)", "8 (A0 to A7)", "16 (A0 to A15)"],
      answer: 1,
      explanation: "The UNO standard DIP package features 6 analog input pins (A0 through A5)."
    },
    {
      q: "Which group of digital pins on the Arduino UNO supports 8-bit hardware PWM output?",
      options: ["Pins 0, 1, 2, 4, 7, 8", "Pins 3, 5, 6, 9, 10, 11", "Pins 2, 4, 7, 8, 12, 13", "Pins A0, A1, A2, A3, A4, A5"],
      answer: 1,
      explanation: "PWM pins on the UNO are marked with a tilde (~) and include pins 3, 5, 6, 9, 10, and 11."
    },
    {
      q: "What is the recommended DC input voltage range when powering the Arduino UNO via its 2.1mm DC barrel jack?",
      options: ["3.3V to 5V", "7V to 12V", "15V to 24V", "100V to 240V AC"],
      answer: 1,
      explanation: "The onboard NCP1117 linear voltage regulator operates reliably and avoids overheating with an input between 7V and 12V DC."
    },
    {
      q: "What is the maximum continuous DC current that a single Arduino UNO digital I/O pin should source?",
      options: ["5 mA", "20 mA", "200 mA", "1000 mA"],
      answer: 1,
      explanation: "The recommended continuous current limit is 20 mA per pin (with an absolute maximum rating of 40 mA)."
    },
    {
      q: "What is the function of the setup() function in an Arduino sketch?",
      options: [
        "It runs repeatedly in an infinite loop while powered.",
        "It executes exactly once at startup or after reset to initialize configurations.",
        "It stores variables permanently into EEPROM.",
        "It compiles C++ source code into hex machine code."
      ],
      answer: 1,
      explanation: "setup() is called once when the sketch starts to configure pin modes, initialize serial communications, or start libraries."
    },
    {
      q: "What is the voltage resolution per step of the Arduino UNO 10-bit ADC when using the default 5V reference?",
      options: ["~4.88 mV", "~19.5 mV", "~1.22 mV", "~0.05 V"],
      answer: 0,
      explanation: "Resolution = 5.0V / 1024 steps ≈ 0.0048828 V ≈ 4.88 mV per least significant bit (LSB)."
    },
    {
      q: "Which onboard pin is connected in parallel with the built-in test LED marked 'L'?",
      options: ["Digital Pin 0", "Digital Pin 9", "Digital Pin 13", "Analog Pin A0"],
      answer: 2,
      explanation: "Digital Pin 13 drives the onboard surface-mount LED through an internal op-amp buffer."
    },
    {
      q: "Why should you unplug wiring from Digital Pins 0 (RX) and 1 (TX) when uploading a sketch via USB?",
      options: [
        "To prevent damaging the 16MHz crystal.",
        "Because pins 0 and 1 are shared with the onboard USB-to-UART communication bridge.",
        "Because analogRead() cannot function if pins 0 and 1 are connected.",
        "To prevent high voltage AC backfeed into the PC."
      ],
      answer: 1,
      explanation: "Pins 0 and 1 are wired directly to the ATmega16U2 USB-to-serial converter; external devices on these pins cause upload packet contention."
    }
  ],

  "mod-2": [
    {
      q: "What standard control signal frequency is required by standard analog RC servo motors (e.g. SG90)?",
      options: ["10 Hz", "50 Hz (20 ms period)", "490 Hz", "40 kHz"],
      answer: 1,
      explanation: "Standard RC servos require a 50 Hz PWM control signal, with one pulse occurring every 20 milliseconds."
    },
    {
      q: "What pulse width corresponds to the 90-degree center neutral position on a standard servo?",
      options: ["0.5 ms (500 µs)", "1.5 ms (1500 µs)", "2.5 ms (2500 µs)", "5.0 ms (5000 µs)"],
      answer: 1,
      explanation: "A 1.5 millisecond (1500 microsecond) pulse width holds a standard servo at its 90-degree center position."
    },
    {
      q: "What are the standard wire colors for GND, VCC, and Signal on an SG90 micro-servo?",
      options: [
        "Brown (GND), Red (VCC), Orange (Signal)",
        "Black (Signal), White (VCC), Red (GND)",
        "Blue (GND), Yellow (VCC), Green (Signal)",
        "Red (GND), Black (VCC), Yellow (Signal)"
      ],
      answer: 0,
      explanation: "Standard hobby servo pinout: Brown or Black = Ground, Red = +5V/6V Power, Orange or Yellow = PWM Control Signal."
    },
    {
      q: "What internal feedback sensor allows a closed-loop positional servo to know its shaft angle?",
      options: ["Thermistor", "Rotary Potentiometer", "Hall Effect Tachometer", "Strain Gauge"],
      answer: 1,
      explanation: "A rotary potentiometer mechanically linked to the output shaft generates a feedback voltage proportional to angle."
    },
    {
      q: "Why is it dangerous to power high-torque servos directly from the Arduino UNO 5V header pin?",
      options: [
        "The servo will reverse polarity and fry.",
        "Stall current spikes drop 5V rail voltage, tripping the MCU Brown-Out Detector (BOD) and causing resets.",
        "The Arduino digital clock speed drops from 16MHz to 8MHz.",
        "Servos only operate on AC alternating current."
      ],
      answer: 1,
      explanation: "Sudden motor acceleration or stalling draws up to 800mA - 2.5A, starving the MCU of voltage and causing unpredictable reset cycles."
    },
    {
      q: "Which Arduino library method binds a servo object to a specific hardware pin?",
      options: ["servo.connect(pin);", "servo.attach(pin);", "servo.bind(pin);", "servo.pinMode(pin, OUTPUT);"],
      answer: 1,
      explanation: "The Servo library uses the attach(pin) method to designate the output control pin."
    },
    {
      q: "What happens if the control signal wire to an analog servo is disconnected while power remains applied?",
      options: [
        "The servo maintains maximum holding torque at its current position.",
        "The internal motor spins continuously at maximum RPM.",
        "The servo loses active holding torque and the horn can be moved freely by hand.",
        "The servo generates an audible alarm tone."
      ],
      answer: 2,
      explanation: "Without a valid 50Hz pulse train, the internal controller depowers the H-bridge, removing holding torque."
    },
    {
      q: "What is the typical angular travel range of standard hobby positional micro-servos?",
      options: ["0° to 90°", "0° to 180°", "0° to 360° continuous", "0° to 720°"],
      answer: 1,
      explanation: "Standard positional RC servos are restricted by physical mechanical stop tabs to approximately 180 degrees of rotation."
    },
    {
      q: "In our Flood-Safe Smart House, what role does the servo motor perform?",
      options: [
        "It pumps water out of the basement.",
        "It controls the auxiliary foundation locking pins and safety barrier gate.",
        "It replaces the main 12V high-torque vertical lifting motor.",
        "It rotates the ultrasonic sensor 360 degrees."
      ],
      answer: 1,
      explanation: "The servo functions as an auxiliary safety locking latch and gate barrier, securing the house once lifted."
    },
    {
      q: "If an Arduino sketch calls servo.write(180), how does the library communicate this command to the servo?",
      options: [
        "It sends an I2C packet over pins A4 and A5.",
        "It transmits a UART byte at 9600 baud.",
        "It generates a continuous stream of ~2000-2400 microsecond pulses every 20 milliseconds.",
        "It outputs a steady analog DC voltage of 5.0V."
      ],
      answer: 2,
      explanation: "The library timer interrupt modulates pulse width to ~2.0-2.4ms, which the servo electronics decode as 180°."
    }
  ],

  "mod-3": [
    {
      q: "Why can an Arduino I/O pin NOT drive a DC motor directly?",
      options: [
        "DC motors require alternating sine waves.",
        "Arduino pins are limited to 20-40 mA, while DC motors draw 300 mA to multiple amperes under load.",
        "Arduino pins only output negative voltage.",
        "The ATmega328P operates in hexadecimal rather than binary."
      ],
      answer: 1,
      explanation: "Motors draw high inductive currents that will instantly destroy the microcontroller output stage transistors."
    },
    {
      q: "What circuit topology is used inside the L298N to provide bidirectional motor rotation?",
      options: ["Wien Bridge", "Full H-Bridge", "Voltage Doubler", "Wheatstone Bridge"],
      answer: 1,
      explanation: "An H-bridge uses 4 electronic switches to reverse the polarity of voltage applied across the motor terminals."
    },
    {
      q: "What phenomenon occurs when current through an inductive motor coil is abruptly switched off?",
      options: ["Galvanic corrosion", "Back-EMF inductive voltage spike", "Frequency doubling", "Thermal runaway"],
      answer: 1,
      explanation: "Lenz's Law dictates that collapsing magnetic fields generate high-voltage reverse EMF spikes, which flyback diodes safely clamp."
    },
    {
      q: "On an L298N motor driver, which pins control the rotational direction of Motor A?",
      options: ["ENA and ENB", "IN1 and IN2", "OUT1 and OUT2", "5V and GND"],
      answer: 1,
      explanation: "IN1 and IN2 accept digital logic signals from Arduino to select forward, reverse, or brake states."
    },
    {
      q: "What happens if IN1 is set HIGH and IN2 is set HIGH simultaneously on an L298N driver?",
      options: [
        "The motor spins at double speed.",
        "The driver experiences shoot-through and explodes.",
        "Dynamic braking is applied, braking the motor rapidly.",
        "The motor reverses direction."
      ],
      answer: 2,
      explanation: "Setting both inputs HIGH (or both LOW) shorts both motor terminals to the same voltage rail, creating magnetic dynamic braking."
    },
    {
      q: "What is the function of the ENA jumper on the L298N module?",
      options: [
        "When fitted, it ties ENA to 5V (100% full speed); when removed, Arduino PWM controls speed.",
        "It switches between 12V and 24V supply.",
        "It inverts motor polarity.",
        "It enables Bluetooth communication."
      ],
      answer: 0,
      explanation: "Removing the jumper allows an Arduino PWM pin to modulate the enable pin to control rotational speed."
    },
    {
      q: "What is the MOST critical electrical connection when using an external 12V battery with an L298N and Arduino?",
      options: [
        "Connecting 12V directly to Arduino 5V pin.",
        "Connecting the 12V battery negative terminal to the Arduino GND pin (Common Ground).",
        "Adding a 10k resistor in series with the motor.",
        "Grounding the aluminum chassis to earth ground."
      ],
      answer: 1,
      explanation: "A common ground provides a shared 0V reference potential; without it, logic signals from Arduino will float unpredictably."
    },
    {
      q: "When can the onboard 5V regulator jumper on the L298N safely remain installed?",
      options: [
        "When motor input voltage is 7V to 12V DC.",
        "When motor input voltage exceeds 35V.",
        "When no battery is connected.",
        "When driving AC synchronous motors."
      ],
      answer: 0,
      explanation: "The onboard 78M05 linear regulator operates efficiently when motor supply is between 7V and 12V."
    },
    {
      q: "Which Arduino function is used to supply variable speed commands to the L298N ENA pin?",
      options: ["digitalWrite()", "analogWrite()", "pulseIn()", "tone()"],
      answer: 1,
      explanation: "analogWrite(pin, 0-255) generates PWM duty cycles that regulate effective motor voltage and speed."
    },
    {
      q: "In our house lifting mechanism, why is dynamic braking or a worm-gear drive beneficial?",
      options: [
        "It reduces motor heat dissipation.",
        "It prevents the mechanical platform from back-driving or dropping under gravity when power is removed.",
        "It increases the maximum lifting speed.",
        "It eliminates the need for limit switches."
      ],
      answer: 1,
      explanation: "A self-locking lead-screw or active dynamic braking prevents gravity from back-driving the platform downward."
    }
  ],

  "mod-4": [
    {
      q: "What frequency of acoustic sound waves does the HC-SR04 ultrasonic sensor emit?",
      options: ["20 Hz", "1 kHz", "40 kHz", "2.4 GHz"],
      answer: 2,
      explanation: "The piezoelectric crystal transducer oscillates at 40,000 Hz (40 kHz), well above human hearing."
    },
    {
      q: "What trigger pulse is required by the HC-SR04 Trigger pin to initiate distance measurement?",
      options: ["A 10-microsecond HIGH pulse", "A 1-second LOW pulse", "A continuous 490Hz PWM signal", "A 5V DC steady signal"],
      answer: 0,
      explanation: "The sensor requires a minimum 10 µs logic HIGH pulse on the Trig pin to transmit its 8-cycle sonic burst."
    },
    {
      q: "What physical property does the Echo pin output represent?",
      options: [
        "An analog voltage between 0V and 5V proportional to distance.",
        "A logic HIGH pulse width whose duration equals the round-trip travel time of the sound wave.",
        "The frequency of the returning acoustic reflection.",
        "The temperature of the surrounding air."
      ],
      answer: 1,
      explanation: "Echo goes HIGH when the burst leaves and returns LOW when the reflection is detected; duration = round-trip flight time."
    },
    {
      q: "What is the approximate speed of sound in dry air at room temperature (20°C)?",
      options: ["300,000 km/s", "343 m/s (0.0343 cm/µs)", "1500 m/s", "100 m/s"],
      answer: 1,
      explanation: "Sound travels at approximately 343 meters per second, or 0.0343 centimeters per microsecond, in 20°C air."
    },
    {
      q: "Why must the duration measured by pulseIn() be divided by 2 in the distance formula?",
      options: [
        "Because the Arduino operates on binary math.",
        "Because sound waves travel out to the target and reflect back, covering twice the one-way distance.",
        "Because the sensor has two transducer cylinders.",
        "Because the ADC resolution is 10-bit."
      ],
      answer: 1,
      explanation: "The acoustic pulse covers the target distance twice (transmitter to water surface, then surface back to receiver)."
    },
    {
      q: "If pulseIn(ECHO, HIGH) returns 1166 microseconds, what is the distance to the target?",
      options: ["~10 cm", "~20 cm", "~40 cm", "~80 cm"],
      answer: 1,
      explanation: "Distance = (1166 µs * 0.0343 cm/µs) / 2 = 39.99 / 2 ≈ 20.0 cm."
    },
    {
      q: "In an overhead flood monitoring tank with 50 cm datum height, if the sensor reads 15 cm, what is the floodwater depth?",
      options: ["15 cm", "35 cm", "50 cm", "65 cm"],
      answer: 1,
      explanation: "Water Depth = Datum Height - Measured Distance = 50 cm - 15 cm = 35 cm."
    },
    {
      q: "What physical condition can cause an HC-SR04 ultrasonic sensor to produce false or timeout readings over water?",
      options: [
        "Clear clean water reflecting sunlight.",
        "Turbulent surface waves deflecting acoustic pulses at sharp angles away from the receiver cylinder.",
        "Operating in complete darkness.",
        "Using 5V instead of 3.3V."
      ],
      answer: 1,
      explanation: "Tilted water ripples act as angled acoustic mirrors, deflecting pulses away from the receiver and causing pulseIn timeouts."
    },
    {
      q: "What is the recommended timeout argument in pulseIn(ECHO, HIGH, timeout) to prevent CPU hang?",
      options: ["50 µs", "30,000 µs (~30 ms)", "1,000,000 µs", "No timeout needed"],
      answer: 1,
      explanation: "A 30,000 µs timeout corresponds to ~5 meters of range and prevents the program from freezing if no echo returns."
    },
    {
      q: "How does ambient temperature affect ultrasonic distance measurements?",
      options: [
        "Sound velocity increases as air temperature rises, causing uncompensated sensors to underestimate distance.",
        "Temperature has zero effect on the speed of sound.",
        "Higher temperature reduces the piezoelectric crystal frequency to 20kHz.",
        "Sound cannot travel in hot air."
      ],
      answer: 0,
      explanation: "Speed of sound increases by ~0.6 m/s per degree Celsius, so temperature compensation ensures millimeter accuracy."
    }
  ],

  "mod-5": [
    {
      q: "What physical mechanism allows the rain sensor collector plate to detect moisture?",
      options: [
        "Capacitive dielectric shifts in glass.",
        "Conductive water droplets bridging interleaved metal tracks and dropping electrical resistance.",
        "Infrared light refraction through water droplets.",
        "Piezoelectric vibration generated by falling raindrop impacts."
      ],
      answer: 1,
      explanation: "Water containing minerals forms an electrolyte that bridges the copper tracks, lowering electrical resistance."
    },
    {
      q: "What type of integrated circuit is typically mounted on the rain sensor signal conditioning board?",
      options: ["555 Timer", "LM393 Dual Differential Comparator", "ATmega328P", "L298N H-Bridge"],
      answer: 1,
      explanation: "The LM393 voltage comparator compares the sensor resistance divider voltage against an onboard potentiometer threshold."
    },
    {
      q: "When the rain sensor plate is completely bone dry, what analog reading (AO) is typically expected on Arduino?",
      options: ["0 - 50", "200 - 400", "500 - 600", "950 - 1023"],
      answer: 3,
      explanation: "Dry air has near-infinite resistance, keeping the pull-up voltage near 5V (approaching 1023 on the 10-bit ADC)."
    },
    {
      q: "How does the rain sensor Digital Output (DO) pin behave when rain intensity exceeds the set potentiometer threshold?",
      options: [
        "It transitions from logic HIGH (+5V) to logic LOW (0V).",
        "It outputs a 40 kHz sine wave.",
        "It increases continuously from 0V to 12V.",
        "It disconnects from ground."
      ],
      answer: 0,
      explanation: "The LM393 has an open-collector output pulled HIGH; when triggered, it drives DO LOW (active-low output)."
    },
    {
      q: "What severe degradation occurs if a resistive rain sensor is powered continuously by 5V DC in wet conditions?",
      options: [
        "Thermal meltdown of the PCB substrate.",
        "Galvanic/electrolytic corrosion that oxidizes and disintegrates the conductive nickel tracks.",
        "The comparator permanently flips polarity.",
        "The Arduino USB port shuts down."
      ],
      answer: 1,
      explanation: "Continuous direct current passing through liquid electrolytes rapidly accelerates anode electro-dissolution."
    },
    {
      q: "What instructional software technique prevents galvanic corrosion on the rain sensor?",
      options: [
        "Pulsing power via an Arduino digital pin only for milliseconds during analog sampling.",
        "Applying silicone glue over all conductive tracks.",
        "Running the Arduino at 3.3V instead of 5V.",
        "Submerging the sensor in mineral oil."
      ],
      answer: 0,
      explanation: "Powering the sensor only for 10-15 ms per sample eliminates continuous current and extends lifespan by over 500x."
    },
    {
      q: "What is the primary difference between the AO and DO pins on the rain sensor module?",
      options: [
        "AO provides granular continuous moisture readings (0-1023); DO provides a binary threshold trigger (HIGH/LOW).",
        "AO is for AC current; DO is for DC current.",
        "AO powers the module; DO grounds the module.",
        "AO connects to motors; DO connects to LEDs."
      ],
      answer: 0,
      explanation: "Analog Output (AO) provides continuous moisture intensity, while Digital Output (DO) switches on threshold."
    },
    {
      q: "Which onboard adjustment alters the switching threshold for the rain sensor DO pin?",
      options: ["A rotary encoder", "A multi-turn trimming potentiometer (trimpot)", "A jumper shunt", "A dip switch"],
      answer: 1,
      explanation: "Adjusting the onboard potentiometer sets the reference comparison voltage on the LM393 comparator."
    },
    {
      q: "In an automated flood prevention system, why is rain detection used alongside water depth sensing?",
      options: [
        "To provide advance weather awareness before floodwater physically accumulates at the foundation.",
        "Because ultrasonic sensors cannot measure liquid water.",
        "To calculate wind speed.",
        "Because rain sensors can lift the house by themselves."
      ],
      answer: 0,
      explanation: "Rain sensing provides early meteorological warning, allowing systems to prime alarms before water levels surge."
    },
    {
      q: "What analog value range typically represents a moderate to heavy monsoon downpour?",
      options: ["950 - 1023", "700 - 850", "150 - 450", "1024 - 2048"],
      answer: 2,
      explanation: "Heavy rain creates high surface conductivity, pulling the analog reading down into the 150-450 range."
    }
  ],

  "capstone": [
    {
      q: "In the Flood-Safe Smart House system, what is the mandatory primary fail-safe that stops upward motor travel?",
      options: [
        "A delay(5000) command in the Arduino loop.",
        "A physical mechanical upper limit switch that disconnects or signals motor cutoff.",
        "Waiting for the rain sensor to dry out.",
        "The student manually unplugging the USB cable."
      ],
      answer: 1,
      explanation: "Never rely purely on software timing; mechanical limit switches provide immutable physical safety boundaries."
    },
    {
      q: "What visual indicator is illuminated when the house is actively lowering back down to its foundation?",
      options: ["Red LED", "Green LED", "Blue LED", "All LEDs flashing simultaneously"],
      answer: 2,
      explanation: "As specified in system requirements: Red = Danger/Lifting, Green = Safe Holding, Blue = Lowering operation."
    },
    {
      q: "Why is a hysteresis timing delay (e.g. 10 continuous seconds below safe threshold) implemented before lowering the house?",
      options: [
        "To allow the L298N motor driver heat sink to cool completely.",
        "To prevent water wave troughs and surface ripples from causing erratic, rapid oscillating lift/lower cycles.",
        "To allow the Arduino EEPROM to finish writing.",
        "Because the servo motor cannot rotate while it is raining."
      ],
      answer: 1,
      explanation: "Hysteresis ensures the flood has genuinely and permanently subsided, avoiding dangerous mechanical chatter."
    },
    {
      q: "What auxiliary function does the SG90 servo motor perform once the house reaches its elevated summit?",
      options: [
        "It drives a cooling fan for the Arduino.",
        "It deploys a mechanical support pin or flood barrier latch, securing the structure and relieving motor strain.",
        "It tilts the rain sensor to shake off raindrops.",
        "It sounds an ultrasonic audio frequency."
      ],
      answer: 1,
      explanation: "The servo engages a mechanical locking pin that bears the physical weight, eliminating prolonged motor load."
    },
    {
      q: "What safety requirement must be strictly observed regarding the power supply of the 12V DC lifting motor?",
      options: [
        "It must be powered directly from the Arduino 5V pin.",
        "It must use an appropriately rated external 12V supply with a common ground shared with the Arduino.",
        "It should be connected directly to 230V AC mains wall outlets.",
        "It should never share a ground connection with the Arduino."
      ],
      answer: 1,
      explanation: "Heavy DC motors require dedicated high-current supplies with a common ground to prevent MCU damage and ground loops."
    },
    {
      q: "Which Arduino pin is wired to the upper limit switch to trigger immediate motor halt?",
      options: ["Analog Pin A5", "Digital Pin 2 (Hardware Interrupt INT0)", "Digital Pin 1 (TX)", "AREF Pin"],
      answer: 1,
      explanation: "Pin 2 on the UNO supports external hardware interrupts (INT0), enabling immediate sub-millisecond safety cutoff."
    },
    {
      q: "If the rain sensor detects moisture but the ultrasonic sensor reports 0 cm water depth, what state should the system maintain?",
      options: [
        "Emergency maximum lifting state.",
        "Alert / standby state at ground level, polling sensors without premature lifting.",
        "Lowering state.",
        "System shutdown."
      ],
      answer: 1,
      explanation: "Dual-sensor confirmation avoids false alarms; the system warns of weather without executing premature platform lifts."
    },
    {
      q: "What is the educational status of this Flood-Safe Smart House prototype?",
      options: [
        "It is a certified civil engineering architectural blueprint ready for occupied high-rise construction.",
        "It is an educational STEM robotics demonstration illustrating sensor-actuator principles, not a certified life-safety civil installation.",
        "It is an industrial pump controller.",
        "It is an experimental medical device."
      ],
      answer: 1,
      explanation: "The project is explicitly an instructional robotics demonstration model for STEM education and research."
    },
    {
      q: "What acoustic device alerts local residents when the automated flood mitigation system activates?",
      options: ["Piezo Active Buzzer", "Stereo Subwoofer", "FM Radio Transmitter", "Hydrophone"],
      answer: 0,
      explanation: "A 5V active buzzer emits an urgent 85dB audible pulsing warning when flood danger thresholds are breached."
    },
    {
      q: "Which state machine transition occurs when the descending platform trips the lower limit switch?",
      options: [
        "Transition from STATE_LOWERING to STATE_STANDBY_GROUND, stopping the motor and re-engaging foundation locks.",
        "Transition from STATE_LOWERING directly to STATE_LIFTING.",
        "System enters an infinite while(true) freeze.",
        "The Arduino wipes its flash memory."
      ],
      answer: 0,
      explanation: "Engaging the lower limit switch confirms the platform has docked safely on its foundation footings."
    }
  ]
};

export const COMPONENT_MATCHING_DATA = [
  { id: "comp-1", name: "Arduino UNO R3", category: "Microcontroller", match: "Executes state machine logic, reads sensors, drives control signals" },
  { id: "comp-2", name: "L298N Motor Driver", category: "Power Actuation", match: "High-current dual H-bridge driving 12V vertical lifting motor" },
  { id: "comp-3", name: "HC-SR04 Ultrasonic", category: "Telemetry", match: "Emits 40kHz acoustic pulses to measure flood depth via Time-of-Flight" },
  { id: "comp-4", name: "Rain Sensor Module", category: "Telemetry", match: "Resistive nickel traces detecting precipitation intensity with LM393" },
  { id: "comp-5", name: "SG90 Micro Servo", category: "Auxiliary Actuation", match: "Closed-loop 50Hz PWM actuator engaging safety locks and flood gates" },
  { id: "comp-6", name: "Micro Limit Switches", category: "Safety Interlock", match: "Hardware end-stops preventing motor overtravel at upper/lower limits" }
];
