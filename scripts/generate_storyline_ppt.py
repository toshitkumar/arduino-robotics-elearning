import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen (13.333 x 7.5 inches)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors
    BG_DARK = RGBColor(11, 15, 25)       # #0B0F19
    CARD_BG = RGBColor(17, 24, 39)       # #111827
    CARD_BORDER = RGBColor(30, 41, 59)   # #1E293B
    BLUE_ACCENT = RGBColor(37, 99, 235)  # #2563EB
    CYAN_ACCENT = RGBColor(6, 182, 212)  # #06B6D4
    AMBER_ACCENT = RGBColor(245, 158, 11)# #F59E0B
    EMERALD_ACC = RGBColor(16, 185, 129) # #10B981
    RED_ACCENT = RGBColor(239, 68, 68)   # #EF4444
    TEXT_WHITE = RGBColor(248, 250, 252) # #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184) # #94A3B8

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.color.rgb = BG_DARK
        return bg

    def add_header(slide, title_text, category_text="ARDUINO ROBOTICS & FLOOD-SAFE SMART HOUSE"):
        # Header category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.name = "Arial"
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = CYAN_ACCENT

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = "Arial"
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        # Divider line
        div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(0.02))
        div.fill.solid()
        div.fill.fore_color.rgb = CARD_BORDER
        div.line.color.rgb = CARD_BORDER

    def add_card(slide, left, top, width, height, title, items, badge="", accent_color=BLUE_ACCENT):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        # Top Accent stripe
        stripe = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(0.08))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = accent_color
        stripe.line.color.rgb = accent_color

        tb = slide.shapes.add_textbox(Inches(left + 0.25), Inches(top + 0.15), Inches(width - 0.5), Inches(height - 0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.name = "Arial"
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = TEXT_WHITE

        if badge:
            p_badge = tf.add_paragraph()
            p_badge.text = badge.upper()
            p_badge.font.name = "Arial"
            p_badge.font.size = Pt(9)
            p_badge.font.bold = True
            p_badge.font.color.rgb = accent_color
            p_badge.space_after = Pt(8)

        for item in items:
            p = tf.add_paragraph()
            p.text = f"• {item}"
            p.font.name = "Arial"
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_MUTED
            p.space_before = Pt(4)

    def add_storyline_notes(slide, scene_id, triggers, variables, audio_script):
        notes_slide = slide.notes_slide
        tf = notes_slide.notes_text_frame
        tf.text = (
            f"=== ARTICULATE STORYLINE 360 INSTRUCTIONAL DESIGN SPECIFICATION ===\n"
            f"SCENE / SLIDE ID: {scene_id}\n\n"
            f"SLIDE VARIABLES:\n{variables}\n\n"
            f"INTERACTIVE TRIGGERS & CONDITIONS:\n{triggers}\n\n"
            f"AUDIO VOICEOVER NARRATION SCRIPT:\n\"{audio_script}\"\n\n"
            f"DEVELOPER & ACCESSIBILITY NOTES:\n"
            f"- Master Layout: Dark Navy Modern Clean 16:9.\n"
            f"- Tab Order: Title -> Content Cards -> Interactive Triggers -> Navigation Next/Prev.\n"
            f"- Author & Course Designer: Toshit Kumar"
        )

    # ==========================================
    # SLIDE 1: COVER SLIDE (Scene 1 - Slide 1.1)
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    add_background(s1)

    # Accent decorative strip
    dec = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.4), Inches(7.5))
    dec.fill.solid()
    dec.fill.fore_color.rgb = BLUE_ACCENT
    dec.line.color.rgb = BLUE_ACCENT

    # Title box
    tbox = s1.shapes.add_textbox(Inches(1.2), Inches(1.6), Inches(11.0), Inches(2.2))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p_badge = tf1.paragraphs[0]
    p_badge.text = "INTERACTIVE STEM ROBOTICS & MECHATRONICS E-LEARNING MODULE"
    p_badge.font.name = "Arial"
    p_badge.font.size = Pt(12)
    p_badge.font.bold = True
    p_badge.font.color.rgb = CYAN_ACCENT
    p_badge.space_after = Pt(10)

    p_main = tf1.add_paragraph()
    p_main.text = "Arduino Robotics &\nFlood-Safe Smart House"
    p_main.font.name = "Arial"
    p_main.font.size = Pt(36)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_WHITE

    p_sub = tf1.add_paragraph()
    p_sub.text = "Automatic House Lifting System Using Arduino UNO, L298N, SG90, and Multi-Sensor Telemetry"
    p_sub.font.name = "Arial"
    p_sub.font.size = Pt(15)
    p_sub.font.color.rgb = TEXT_MUTED
    p_sub.space_before = Pt(10)

    # Author Credentials Panel
    auth_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(4.5), Inches(8.5), Inches(1.9))
    auth_card.fill.solid()
    auth_card.fill.fore_color.rgb = CARD_BG
    auth_card.line.color.rgb = BLUE_ACCENT
    auth_card.line.width = Pt(1.5)

    atb = s1.shapes.add_textbox(Inches(1.5), Inches(4.7), Inches(8.0), Inches(1.5))
    atf = atb.text_frame
    atf.word_wrap = True

    ap1 = atf.paragraphs[0]
    ap1.text = "PROJECT LEAD & INSTRUCTIONAL DESIGNER:"
    ap1.font.name = "Arial"
    ap1.font.size = Pt(10)
    ap1.font.bold = True
    ap1.font.color.rgb = CYAN_ACCENT

    ap2 = atf.add_paragraph()
    ap2.text = "Toshit Kumar"
    ap2.font.name = "Arial"
    ap2.font.size = Pt(20)
    ap2.font.bold = True
    ap2.font.color.rgb = TEXT_WHITE
    ap2.space_before = Pt(2)

    ap3 = atf.add_paragraph()
    ap3.text = "Lead Robotics Engineer & Educational Technology Developer | Articulate Storyline 360 Edition"
    ap3.font.name = "Arial"
    ap3.font.size = Pt(11)
    ap3.font.color.rgb = TEXT_MUTED

    add_storyline_notes(
        s1,
        "Scene 1 - Slide 1.1: Course Title & Welcome",
        "Trigger 1: When timeline starts -> Execute JavaScript: initializeAudioContext();\n"
        "Trigger 2: Set variable v_CourseProgress = 0;\n"
        "Trigger 3: When user clicks 'Start Course' -> Jump to Slide 1.2 (Course Blueprint).",
        "v_CourseProgress (Number, Default: 0)\nv_SystemState (Text, Default: 'STANDBY')\nv_WaterDepth (Number, Default: 0)",
        "Welcome to Arduino Robotics and the Flood-Safe Smart House e-learning experience, developed by Toshit Kumar. In this module, you will master the fundamentals of the Arduino UNO, actuator mechanisms, and sensor telemetry, culminating in building an automated house lifting system that protects lives and infrastructure from severe flooding."
    )

    # ==========================================
    # SLIDE 2: CURRICULUM BLUEPRINT (Scene 1 - Slide 1.2)
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_background(s2)
    add_header(s2, "Curriculum Architecture & Interactive Scenes")

    modules_meta = [
        ("Mod 01: Arduino UNO", ["ATmega328P architecture", "16MHz clock & memory map", "Digital, Analog & PWM pins", "First LED blink sketch"], CYAN_ACCENT),
        ("Mod 02: Servo Motor", ["SG90 closed-loop feedback", "50Hz PWM pulse train", "Power isolation rules", "Automated safety gate"], BLUE_ACCENT),
        ("Mod 03: Motor Driver", ["L298N Dual H-Bridge", "Inductive flyback protection", "Common ground reference", "Vertical lifting winch"], EMERALD_ACC),
        ("Mod 04: Ultrasonic", ["HC-SR04 acoustic ToF", "40kHz piezo transducers", "Distance kinematics formula", "Water level calibration"], AMBER_ACCENT),
        ("Mod 05: Rain Sensor", ["FC-37 resistive PCB tracks", "LM393 analog & digital out", "Galvanic corrosion prevention", "Precipitation classification"], CYAN_ACCENT),
        ("Capstone Project", ["Flood-Safe Smart House", "Automatic platform lifting", "Dual-sensor validation", "Full Arduino C++ master code"], RED_ACCENT),
    ]

    for idx, (m_title, m_items, m_color) in enumerate(modules_meta):
        col = idx % 3
        row = idx // 3
        left = 0.8 + col * 4.0
        top = 1.8 + row * 2.6
        add_card(s2, left, top, 3.75, 2.4, m_title, m_items, badge=f"Scene {idx + 2}", accent_color=m_color)

    add_storyline_notes(
        s2,
        "Scene 1 - Slide 1.2: Course Architecture & Learning Menu",
        "Trigger: Each module card contains a clickable button.\n"
        "When user clicks Module 1 -> Jump to Scene 2 Slide 2.1;\n"
        "When user clicks Capstone -> Jump to Scene 7 Slide 7.1.",
        "v_Module1_Done, v_Module2_Done, v_Module3_Done, v_Module4_Done, v_Module5_Done, v_Capstone_Done (Booleans)",
        "Here is your roadmap for the course. We will progress through five foundational engineering modules covering the Arduino UNO, servo motors, motor drivers, ultrasonic sensing, and rain detection, before integrating everything into the final Capstone Project: the Flood-Safe Smart House."
    )

    # ==========================================
    # SLIDE 3: MODULE 1 - ARDUINO UNO (Scene 2 - Slide 2.1)
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_background(s3)
    add_header(s3, "Module 01: Arduino UNO Architecture & Fundamentals", "SCENE 2: MICROCONTROLLER ARCHITECTURE")

    add_card(s3, 0.8, 1.8, 5.7, 5.0, "ATmega328P Core Architecture", [
        "Microcontroller vs Microprocessor: Integrates CPU, Flash, SRAM, and I/O peripherals onto a single monolithic die.",
        "Clock Speed: 16 MHz quartz crystal oscillator providing 16 million clock cycles per second.",
        "Flash Program Memory: 32 KB (0.5 KB reserved for the Optiboot bootloader).",
        "SRAM: 2 KB volatile runtime memory for variables and dynamic memory stack.",
        "EEPROM: 1 KB non-volatile memory for persistent parameter storage across resets.",
        "Operating Voltage: 5.0V DC regulated logic level."
    ], badge="Microcontroller Anatomy", accent_color=CYAN_ACCENT)

    add_card(s3, 6.8, 1.8, 5.7, 5.0, "Execution Lifecycle: setup() & loop()", [
        "void setup(): Invoked exactly once upon power-on or hardware reset pin toggle.",
        "Initializes pin modes via pinMode(), sets up hardware UART baud rate, and attaches libraries.",
        "void loop(): Executes continuously in an infinite while(true) cycle.",
        "Handles continuous sensor polling, state machine transitions, and actuator outputs.",
        "Practical Exercise: Precision LED blinking on Pin 13 using digitalWrite() and delay().",
        "Instructional Safety: Never execute blocking delay() inside mission-critical safety loops."
    ], badge="C++ Execution Lifecycle", accent_color=BLUE_ACCENT)

    add_storyline_notes(
        s3,
        "Scene 2 - Slide 2.1: Arduino UNO Architecture",
        "Trigger 1: Hover over ATmega328P card -> Show Layer 'Chip_Die_Breakdown'.\n"
        "Trigger 2: Play click sound on tab selection.",
        "v_UnoExplored (Boolean, Default: False)",
        "In Module 1, we dissect the heart of our embedded system: the Arduino UNO R3 and its ATmega328P microcontroller. Operating at 16 megahertz with 32 kilobytes of flash memory, it coordinates our sensory inputs and motor drivers."
    )

    # ==========================================
    # SLIDE 4: ARDUINO UNO PIN TAXONOMY (Scene 2 - Slide 2.2)
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_background(s4)
    add_header(s4, "Arduino UNO Header Pinout & Electrical Constraints", "SCENE 2: ELECTRICAL SPECIFICATIONS")

    add_card(s4, 0.8, 1.8, 3.75, 5.0, "Digital I/O & UART", [
        "Digital Pins D0 - D13: 5V logic inputs and outputs.",
        "D0 (RX) & D1 (TX): Hardware UART communication shared with USB bridge. Must leave disconnected during USB sketch upload.",
        "D13: Connected in parallel with onboard surface-mount test LED through an op-amp buffer.",
        "Maximum Current: 20 mA continuous per pin (40 mA absolute maximum)."
    ], badge="Digital Channels", accent_color=BLUE_ACCENT)

    add_card(s4, 4.8, 1.8, 3.75, 5.0, "PWM & External Interrupts", [
        "PWM Pins (~3, ~5, ~6, ~9, ~10, ~11): 8-bit Pulse Width Modulation (0 to 255).",
        "Frequencies: ~490 Hz (Pins 3, 9, 10, 11) and ~980 Hz (Pins 5 and 6).",
        "Hardware Interrupts: INT0 (Pin 2) and INT1 (Pin 3).",
        "Pin 2 is dedicated to our Upper Limit Switch for instant sub-microsecond motor cutoff."
    ], badge="PWM & Timers", accent_color=CYAN_ACCENT)

    add_card(s4, 8.8, 1.8, 3.75, 5.0, "Analog Inputs & Power Rails", [
        "Analog Channels A0 - A5: 10-bit Successive Approximation ADC.",
        "Resolution: 1024 discrete steps (0-1023), equaling ~4.88 mV per unit step at 5V AREF.",
        "VIN Pin: 7V - 12V DC input fed into onboard NCP1117 linear regulator.",
        "5V & 3.3V Pins: Regulated power rails for external sensor and logic modules."
    ], badge="Analog & Rails", accent_color=EMERALD_ACC)

    add_storyline_notes(
        s4,
        "Scene 2 - Slide 2.2: Pinout Map & Electrical Boundaries",
        "Interactive Hotspot Trigger: Clicking Pin 2 reveals callout 'Hardware Interrupt INT0 used for Upper Limit Switch'.",
        "v_SelectedPin (Text)",
        "Understanding pin taxonomy is crucial. Notice pins with the tilde mark: these are our 8-bit PWM channels. Analog pins A0 through A5 convert real-world voltages into digital values from 0 to 1023."
    )

    # ==========================================
    # SLIDE 5: MODULE 2 - SERVO MOTOR (Scene 3 - Slide 3.1)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_background(s5)
    add_header(s5, "Module 02: Servo Motor (SG90) Closed-Loop Actuation", "SCENE 3: ACTUATOR MECHANICS")

    add_card(s5, 0.8, 1.8, 5.7, 5.0, "Closed-Loop Servomechanism Anatomy", [
        "DC Coreless Motor: High-speed, low-torque prime rotational mover.",
        "Reduction Gearbox: Exponentially increases torque while reducing shaft rotational velocity.",
        "Rotary Potentiometer: Mechanically geared to the output horn, producing continuous position feedback voltage.",
        "Control Board & Error Amplifier: Continuously compares target PWM pulse width with feedback voltage to maintain commanded angle.",
        "Holding Torque: The servo actively resists external displacement loads as long as the 50Hz PWM stream is maintained."
    ], badge="Closed-Loop Mechanism", accent_color=AMBER_ACCENT)

    add_card(s5, 6.8, 1.8, 5.7, 5.0, "50Hz Pulse Train & Power Isolation Rules", [
        "Frame Frequency: Strict 50 Hz PWM protocol (one 20 millisecond frame).",
        "Pulse Durations: 1.0 ms = 0° | 1.5 ms = 90° (neutral) | 2.0 ms = 180°.",
        "Wiring Standard: Brown/Black = GND, Red = +5V/6V, Orange/Yellow = PWM Signal (Pin 6).",
        "MANDATORY POWER ISOLATION RULE:\nNever power high-torque servos from the Arduino 5V pin! Stall currents spike up to 800mA - 2.5A, dropping the 5V rail and tripping MCU Brown-Out Resets.",
        "Role in Capstone: Actuates mechanical foundation locking pins and emergency flood gates."
    ], badge="Control Protocol & Safety", accent_color=RED_ACCENT)

    add_storyline_notes(
        s5,
        "Scene 3 - Slide 3.1: Servo Motor Closed-Loop Actuation",
        "Storyline Slider Interaction: Moving slider from 0 to 180 changes image rotation of servo horn in real time.\n"
        "Variable: v_ServoAngle.",
        "v_ServoAngle (Number, Range: 0 to 180)",
        "In Module 2, we explore closed-loop actuation with the SG90 micro-servo. Unlike basic DC motors, servos rotate to an exact commanded angle using an internal feedback potentiometer. Notice the critical safety rule: always isolate servo power to prevent Arduino brown-out resets."
    )

    # ==========================================
    # SLIDE 6: MODULE 3 - MOTOR DRIVER L298N (Scene 4 - Slide 4.1)
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_background(s6)
    add_header(s6, "Module 03: Motor Driver (L298N Dual H-Bridge)", "SCENE 4: POWER ELECTRONICS")

    add_card(s6, 0.8, 1.8, 5.7, 5.0, "Why We Need Motor Drivers", [
        "Current Capacity Mismatch: Arduino pins supply max 20-40 mA; DC lifting motors draw 300 mA idle to 2.5 A under load.",
        "Connecting a motor directly to an Arduino pin will instantly destroy the ATmega328P output transistors.",
        "Back-EMF Spikes: Collapsing magnetic fields in inductive coils generate massive voltage spikes (V = -L * di/dt) reaching hundreds of volts.",
        "L298N Internal IC: High-voltage, high-current dual full-bridge driver rated up to 35V DC and 2A peak per channel.",
        "Flyback Diodes: Fast-recovery diodes safely route inductive reverse voltage surges safely away from control logic."
    ], badge="Inductive Power Drive", accent_color=BLUE_ACCENT)

    add_card(s6, 6.8, 1.8, 5.7, 5.0, "H-Bridge Truth Table & Speed Control", [
        "Forward (Lift Platform): IN1 = HIGH, IN2 = LOW -> Current flows OUT1 to OUT2.",
        "Reverse (Lower Platform): IN1 = LOW, IN2 = HIGH -> Current flows OUT2 to OUT1.",
        "Dynamic Magnetic Braking: IN1 = LOW, IN2 = LOW (or both HIGH) -> Shorts motor terminals, dissipating kinetic energy to prevent platform drift.",
        "Speed Regulation: Modulate ENA pin with 8-bit PWM (analogWrite(ENA, speed) 0-255).",
        "Removing ENA jumper enables dynamic acceleration and deceleration curves."
    ], badge="Direction & PWM Truth Table", accent_color=CYAN_ACCENT)

    add_storyline_notes(
        s6,
        "Scene 4 - Slide 4.1: Motor Driver Architecture",
        "Trigger: Click 'Forward' button -> Set state of motor animation to 'Spin_Clockwise'.\n"
        "Click 'Brake' -> Stop animation immediately.",
        "v_MotorState (Text), v_PwmSpeed (Number)",
        "Module 3 tackles heavy power electronics with the L298N Dual H-Bridge. An H-bridge lets an Arduino control both the direction and speed of high-current DC motors while isolating sensitive microcontroller pins from dangerous back-EMF spikes."
    )

    # ==========================================
    # SLIDE 7: L298N WIRING & COMMON GROUND (Scene 4 - Slide 4.2)
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    add_background(s7)
    add_header(s7, "L298N Power Isolation & Common Ground Topology", "SCENE 4: ELECTRICAL SAFETY")

    add_card(s7, 0.8, 1.8, 5.7, 5.0, "Mandatory Common Ground (0V Reference)", [
        "CRITICAL WIRING RULE:\nThe external 12V motor battery ground (-) MUST be tied directly to the Arduino GND pin.",
        "Why is Common Ground Essential?\nVoltage is a relative potential difference. Without a shared 0V reference, logic signals (IN1, IN2, ENA) float unpredictably, causing severe motor jitter, missed stop commands, or destroyed driver gates.",
        "Never connect the external +12V positive terminal to the Arduino 5V pin! This results in catastrophic overvoltage."
    ], badge="Grounding Principle", accent_color=RED_ACCENT)

    add_card(s7, 6.8, 1.8, 5.7, 5.0, "Onboard 5V Regulator & Terminal Setup", [
        "12V Power Screw Terminal: Wired directly to external 12V 3A DC power source.",
        "5V Logic Terminal & Jumper Cap:\n- When 5V jumper is ON (Supply <= 12V): Onboard 78M05 regulator generates +5V for internal logic gates.\n- When 5V jumper is REMOVED (Supply > 12V): Onboard regulator is disconnected; you must feed +5V from Arduino 5V to this pin.",
        "Heatsink Thermal Dissipation: High current generates up to 25W of heat; ensure proper convective airflow during vertical lift."
    ], badge="Terminal Rules", accent_color=AMBER_ACCENT)

    add_storyline_notes(
        s7,
        "Scene 4 - Slide 4.2: Common Ground Architecture",
        "Drag & Drop Activity in Storyline: Learner must drag the Black Ground Wire from Battery (-) to Arduino GND to complete the circuit.",
        "v_GroundConnected (Boolean)",
        "Pay close attention to this engineering principle: Common Ground. An external motor battery and your Arduino must share a single zero-volt reference line. Without it, your control logic will float, leading to erratic or unresponsive motor operation."
    )

    # ==========================================
    # SLIDE 8: MODULE 4 - ULTRASONIC SENSOR (Scene 5 - Slide 5.1)
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    add_background(s8)
    add_header(s8, "Module 04: Ultrasonic Sensor (HC-SR04) Acoustic Telemetry", "SCENE 5: DISTANCE TELEMETRY")

    add_card(s8, 0.8, 1.8, 5.7, 5.0, "Piezo Acoustic Echolocation & Physics", [
        "Acoustic Transducers: Transmitter (T) emits 40,000 Hz ultrasound bursts; Receiver (R) detects the reflected wave.",
        "Trigger Burst: Microcontroller sends a 10-microsecond HIGH TTL pulse to the Trig pin.",
        "Echo Flight Time: Sensor drives the Echo pin HIGH for a duration exactly equal to round-trip sound travel time.",
        "Kinematic Distance Formula:\nDistance = (Echo Time in µs * Speed of Sound) / 2\nDistance (cm) = (Duration in µs * 0.0343) / 2\nSimplified: Distance (cm) = Duration / 58.3",
        "Dividing by 2 is essential because sound travels to the surface and bounces back."
    ], badge="Acoustic Kinematics", accent_color=CYAN_ACCENT)

    add_card(s8, 6.8, 1.8, 5.7, 5.0, "Flood Depth Profiling & Signal Filtering", [
        "Overhead Mounting Strategy: The sensor faces downward into the foundation drainage basin.",
        "Water Depth Formula:\nFlood Level = Baseline Datum Height - Measured Distance Gap.",
        "As floodwater rises, the measured acoustic distance decreases proportionally.",
        "Wave Ripple Mitigation: Wind-induced surface ripples can reflect sound waves away. We implement a software median filter discarding outlier spikes.",
        "Safety Timeout: Using pulseIn(ECHO, HIGH, 30000) prevents CPU lockup if sound is absorbed."
    ], badge="Flood Telemetry", accent_color=EMERALD_ACC)

    add_storyline_notes(
        s8,
        "Scene 5 - Slide 5.1: Ultrasonic Depth Telemetry",
        "Interactive Dial: Turning dial updates calculated water depth on an LCD gauge object.",
        "v_MeasuredEcho (Number), v_CalculatedDepth (Number)",
        "Module 4 covers non-contact liquid level sensing with the HC-SR04 ultrasonic sensor. By emitting 40 kilohertz acoustic pulses and measuring the round-trip flight time, our Arduino computes water depth in real time with millimeter precision."
    )

    # ==========================================
    # SLIDE 9: MODULE 5 - RAIN SENSOR (Scene 6 - Slide 6.1)
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    add_background(s9)
    add_header(s9, "Module 05: Rain Sensor Module (FC-37 / YL-83)", "SCENE 6: PRECIPITATION SENSING")

    add_card(s9, 0.8, 1.8, 5.7, 5.0, "Resistive Trace Detection & LM393", [
        "Interleaved Collector Tracks: Interdigitated nickel-plated PCB traces.",
        "Electrolytic Conductivity: Dry air provides near-infinite resistance (AO ~ 1023). Rainwater contains dissolved ions that bridge tracks, dropping resistance sharply.",
        "LM393 Comparator IC: Compares moisture voltage divider against a sensitivity trimpot threshold.",
        "Dual Output Channels:\n- Analog Output (AO): Continuous 0-1023 moisture level.\n- Digital Output (DO): Active-low binary threshold (transitions from 5V to 0V upon heavy rain)."
    ], badge="Sensor Operation", accent_color=CYAN_ACCENT)

    add_card(s9, 6.8, 1.8, 5.7, 5.0, "Galvanic Corrosion Mitigation Protocol", [
        "The Galvanic Corrosion Threat:\nContinuous DC current passing through wet nickel traces causes rapid electrochemical oxidation, dissolving sensor tracks within days.",
        "The Professional Software Solution:\nDo NOT connect sensor VCC permanently to 5V power! Connect VCC to Arduino Digital Pin 7.",
        "Pulsed Power Sequence:\n1. digitalWrite(PIN_RAIN_PWR, HIGH);\n2. delay(10); // Allow LM393 to stabilize\n3. int val = analogRead(A0);\n4. digitalWrite(PIN_RAIN_PWR, LOW); // Depower immediately\nThis extends outdoor sensor lifespan by over 500x!"
    ], badge="Anti-Corrosion Architecture", accent_color=EMERALD_ACC)

    add_storyline_notes(
        s9,
        "Scene 6 - Slide 6.1: Rain Sensor Telemetry",
        "Layer Trigger: Clicking 'Inspect Corrosion' displays an animation comparing continuous DC corrosion vs pulsed digital power.",
        "v_RainAO (Number), v_RainDO (Boolean)",
        "Module 5 introduces the FC-37 rain sensor module. Notice the advanced engineering technique implemented here: pulsed digital power gating, which prevents galvanic anode corrosion on exposed sensor tracks."
    )

    # ==========================================
    # SLIDE 10: CAPSTONE OVERVIEW (Scene 7 - Slide 7.1)
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    add_background(s10)
    add_header(s10, "Capstone Project: Flood-Safe Smart House Overview", "SCENE 7: MASTER MECHATRONICS PROJECT")

    add_card(s10, 0.8, 1.8, 5.7, 5.0, "Civil Problem & Automated Solution", [
        "The Global Challenge: Monsoonal river overflows and flash floods submerge residential structures, causing billions in property loss and endangering human lives.",
        "Why Fixed Stilts Fall Short: Permanent high stilts isolate elderly and mobility-impaired residents during dry weather.",
        "The Smart Mechatronic Solution: A dynamic scissor-lift or rack-and-pinion platform that rests at ground level during normal conditions, but automatically elevates above flood waters when water depth is verified.",
        "Redundant Telemetry: Combines early rain detection with acoustic water depth profiling to eliminate false lifting triggers."
    ], badge="Problem & Objectives", accent_color=AMBER_ACCENT)

    add_card(s10, 6.8, 1.8, 5.7, 5.0, "Complete Bill of Materials (BOM)", [
        "Arduino UNO R3: Central microcontroller orchestrator.",
        "L298N Motor Driver: 12V Dual H-Bridge motor controller.",
        "12V High-Torque DC Geared Motor: Lead-screw lifting prime mover.",
        "SG90 Micro Servo: Auxiliary foundation locking pins and flood barrier.",
        "HC-SR04 Ultrasonic Sensor: Overhead water depth profiler.",
        "FC-37 Rain Sensor Module: Early storm onset detector.",
        "Micro Limit Switches (x2): Mandatory upper and lower travel end-stops.",
        "Annunciators: 5V Active Buzzer + Red, Green, Blue LEDs.",
        "External Power: Dedicated 12V 3A DC power supply."
    ], badge="Hardware Bill of Materials", accent_color=BLUE_ACCENT)

    add_storyline_notes(
        s10,
        "Scene 7 - Slide 7.1: Capstone Project Introduction",
        "Storyline Branching: Button 'Enter Simulation' jumps to Slide 7.4 (Interactive Simulation Scene).",
        "v_CapstoneActive (Boolean)",
        "Now we arrive at our final Capstone Project: The Flood-Safe Smart House. Toshit Kumar has engineered this system to unite all five modules into an automated civil defense prototype that lifts structures automatically when floodwater is detected."
    )

    # ==========================================
    # SLIDE 11: SAFETY ENGINEERING RULES (Scene 7 - Slide 7.2)
    # ==========================================
    s11 = prs.slides.add_slide(blank_layout)
    add_background(s11)
    add_header(s11, "Mandatory Safety Engineering Protocols", "SCENE 7: SAFETY STANDARDS")

    rules = [
        ("Hardware Limit Switches are Non-Negotiable", "Never rely exclusively on timed software delays (e.g. delay(5000)) to halt lifting. Mechanical or optical end-stops at top and bottom travel are mandatory fail-safe interlocks.", RED_ACCENT),
        ("Strict Common Ground Discipline", "The external 12V motor battery negative (-) MUST connect to Arduino GND to prevent floating logic states and catastrophic misfires.", BLUE_ACCENT),
        ("Isolated Actuator Power Supplies", "Never power the L298N motor or SG90 servo directly from the Arduino 5V pin. Dedicated high-current power rails are mandatory.", AMBER_ACCENT),
        ("Educational Demonstration Status", "This prototype is an instructional STEM robotics demonstration. Full-scale civil house lifting requires certified hydraulic jacks, seismic dampening, and building code approval.", CYAN_ACCENT)
    ]

    for idx, (r_title, r_desc, r_color) in enumerate(rules):
        col = idx % 2
        row = idx // 2
        left = 0.8 + col * 6.0
        top = 1.8 + row * 2.6
        add_card(s11, left, top, 5.75, 2.4, r_title, [r_desc], badge=f"Safety Rule 0{idx + 1}", accent_color=r_color)

    add_storyline_notes(
        s11,
        "Scene 7 - Slide 7.2: Mandatory Safety Protocols",
        "Layer Alert: If student attempts to run code without limit switches defined, trigger Storyline Modal 'Safety Violation Warning'.",
        "v_SafetyPassed (Boolean)",
        "Safety is paramount in robotics engineering. Review these four rules carefully: physical limit switches must govern motion boundaries, grounds must be common, power rails must be isolated, and the prototype is strictly an educational demonstration model."
    )

    # ==========================================
    # SLIDE 12: CIRCUIT CONNECTION MATRIX (Scene 7 - Slide 7.3)
    # ==========================================
    s12 = prs.slides.add_slide(blank_layout)
    add_background(s12)
    add_header(s12, "Complete System Pin Connection Matrix", "SCENE 7: SCHEMATIC SPECIFICATIONS")

    # Table of Pin Connections
    rows, cols = 9, 4
    table_shape = s12.shapes.add_table(rows, cols, Inches(0.8), Inches(1.8), Inches(11.733), Inches(5.0))
    table = table_shape.table

    table.columns[0].width = Inches(3.2)
    table.columns[1].width = Inches(2.2)
    table.columns[2].width = Inches(2.4)
    table.columns[3].width = Inches(3.933)

    headers = ["Hardware Module", "Component Pin", "Arduino UNO Pin", "Operational Role & Safety Function"]
    for c_idx, h_text in enumerate(headers):
        cell = table.cell(0, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = CARD_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h_text
        p.font.name = "Arial"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = CYAN_ACCENT

    pin_matrix_data = [
        ("HC-SR04 Ultrasonic", "Trig / Echo", "Digital Pin 9 / Pin 10", "10µs acoustic burst trigger & round-trip flight duration"),
        ("FC-37 Rain Sensor", "VCC / AO", "Pin 7 (Pulsed) / Pin A0", "Pulsed digital anti-corrosion power & analog moisture level"),
        ("L298N Motor Driver", "ENA / IN1 / IN2", "~Pin 5 / Pin 3 / Pin 4", "PWM speed duty cycle & directional H-bridge lift/lower drive"),
        ("L298N Power", "12V / GND", "Ext 12V (+) / Ext GND & Arduino GND", "Dedicated high-current supply with mandatory common ground"),
        ("SG90 Micro Servo", "Signal (PWM)", "Digital Pin 6 (~PWM)", "Auxiliary mechanical foundation lock (0°) & summit support (180°)"),
        ("Upper Limit Switch", "Signal Out", "Digital Pin 2 (INT0)", "Sub-millisecond hardware interrupt cutoff at maximum elevation"),
        ("Lower Datum Switch", "Signal Out", "Digital Pin 8", "Mechanical datum end-stop confirming ground docking"),
        ("Annunciator LEDs & Buzzer", "Red / Green / Blue / Buzzer", "Pins 11 / 12 / 13 / Pin A1", "Red: Danger/Lift | Green: Standby/Hold | Blue: Lowering | Buzzer Alert")
    ]

    for r_idx, row_vals in enumerate(pin_matrix_data):
        for c_idx, val in enumerate(row_vals):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = RGBColor(15, 23, 42) if r_idx % 2 == 0 else CARD_BG
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.name = "Arial"
            p.font.size = Pt(9.5)
            p.font.color.rgb = TEXT_WHITE if c_idx < 3 else TEXT_MUTED
            if c_idx == 2:
                p.font.bold = True
                p.font.color.rgb = CYAN_ACCENT

    add_storyline_notes(
        s12,
        "Scene 7 - Slide 7.3: Circuit Connection Table",
        "Storyline Interactive Table: Hovering over any row highlights the corresponding wire on the virtual schematic.",
        "v_ActiveRow (Number)",
        "This master connection table defines all 20 electrical paths. Notice how pins are partitioned: Pin 2 handles the urgent upper limit interrupt, PWM pins 5 and 6 govern speed and servo angle, and Pin 7 switches rain sensor power dynamically."
    )

    # ==========================================
    # SLIDE 13: STATE MACHINE & WORKING LOGIC (Scene 7 - Slide 7.4)
    # ==========================================
    s13 = prs.slides.add_slide(blank_layout)
    add_background(s13)
    add_header(s13, "Mechatronic State Machine & Sequence of Operations", "SCENE 7: CONTROL ALGORITHMS")

    steps = [
        ("1. STANDBY_GROUND", "System monitors rain (A0) and water depth (HC-SR04). Green LED is ON. Foundation lock engaged at 0°.", CYAN_ACCENT),
        ("2. FLOOD_ALERT", "Water level exceeds 15cm threshold. Red LED illuminates, buzzer pulses, and servo unlatches to 90°.", AMBER_ACCENT),
        ("3. LIFTING_ACTIVE", "L298N commands motor upward (IN1=HIGH, IN2=LOW, ENA=230). Platform rises steadily.", BLUE_ACCENT),
        ("4. HOLDING_ELEVATED", "Upper limit switch engages (INT0). Motor halts. Servo rotates to 180° to insert mechanical support pins.", EMERALD_ACC),
        ("5. DEBOUNCE RECESSION", "Water recedes below 5cm. A 10-second hysteresis timer ensures the flood has genuinely subsided.", CYAN_ACCENT),
        ("6. CONTROLLED DESCENT", "Servo retracts pins (90°), Blue LED turns ON, L298N lowers platform smoothly (IN1=LOW, IN2=HIGH, ENA=175).", BLUE_ACCENT),
        ("7. GROUND DOCKING", "Platform strikes bottom limit switch (Pin 8). Motor brakes, servo locks at 0°, Green LED lights, system resets.", EMERALD_ACC),
        ("FAIL-SAFE OVERRIDE", "Emergency stop cuts all motor drive signals within 5 milliseconds if any sensor returns impossible data.", RED_ACCENT)
    ]

    for idx, (st_title, st_desc, st_color) in enumerate(steps):
        col = idx % 4
        row = idx // 4
        left = 0.8 + col * 2.95
        top = 1.8 + row * 2.6
        add_card(s13, left, top, 2.8, 2.4, st_title, [st_desc], badge=f"Phase 0{idx + 1}", accent_color=st_color)

    add_storyline_notes(
        s13,
        "Scene 7 - Slide 7.4: Mechatronic State Machine Flow",
        "Storyline State Diagram: Clicking any phase triggers state animation on the visual house model.",
        "v_SystemState (Text: 'STANDBY_GROUND' | 'FLOOD_ALERT' | 'LIFTING' | 'HOLDING_ELEVATED' | 'LOWERING')",
        "Here is the autonomous operational cycle. Notice the strict sequence: Annunciation, Unlatching, Lifting, Upper Limit Stop, Summit Locking, Hysteresis Debounce, and Controlled Descent."
    )

    # ==========================================
    # SLIDE 14: CODE & MECHANICS (Scene 7 - Slide 7.5)
    # ==========================================
    s14 = prs.slides.add_slide(blank_layout)
    add_background(s14)
    add_header(s14, "Master Arduino Source Code Architecture", "SCENE 7: SOFTWARE ARCHITECTURE")

    add_card(s14, 0.8, 1.8, 6.0, 5.0, "Core C++ Production Architecture", [
        "#include <Servo.h>: Hardware timer interrupt pulse generation.",
        "enum SystemState: Implements an explicit finite-state machine (FSM).",
        "INPUT_PULLUP Configuration: Internal 30kΩ pull-up resistors on limit switch pins 2 and 8 guarantee noise-free Active-LOW triggers.",
        "getWaterDepthCm(): Generates 10µs trigger pulse, measures echo round-trip with 26ms timeout, and computes depth gap.",
        "getRainReading(): Powers pin 7 for 10ms only during analogRead(A0) to eliminate galvanic anode corrosion.",
        "stopMotor(): Sets IN1=LOW, IN2=LOW, ENA=0 to apply magnetic dynamic braking."
    ], badge="Production Structure", accent_color=BLUE_ACCENT)

    add_card(s14, 7.1, 1.8, 5.4, 5.0, "State Machine Loop Snippet", [
        "switch (currentState) {",
        "  case STATE_STANDBY_GROUND:",
        "    if (waterDepth >= FLOOD_TRIGGER_DEPTH) currentState = STATE_FLOOD_ALERT;",
        "    break;",
        "  case STATE_LIFTING:",
        "    if (hitTopLimit) { stopMotor(); safetyServo.write(180); currentState = STATE_HOLDING; }",
        "    else { driveMotorUp(LIFT_SPEED); }",
        "    break;",
        "  case STATE_HOLDING_ELEVATED:",
        "    if (waterDepth <= SAFE_DEPTH && safeTimerDebounced()) currentState = STATE_LOWERING;",
        "    break;",
        "}"
    ], badge="C++ Logic Matrix", accent_color=CYAN_ACCENT)

    add_storyline_notes(
        s14,
        "Scene 7 - Slide 7.5: Production Source Code",
        "Storyline Code Copy Trigger: Clicking 'Copy Code' copies full sketch to clipboard and displays notification banner.",
        "v_CodeCopied (Boolean)",
        "The software architecture uses an explicit finite state machine. Notice how limit switches and sensor readings trigger clean transitions without blocking delay loops, ensuring the microcontroller remains responsive at all times."
    )

    # ==========================================
    # SLIDE 15: SCENARIOS & TROUBLESHOOTING (Scene 8 - Slide 8.1)
    # ==========================================
    s15 = prs.slides.add_slide(blank_layout)
    add_background(s15)
    add_header(s15, "Scenario Decision Challenges & Troubleshooting", "SCENE 8: ENGINEERING DIAGNOSTICS")

    add_card(s15, 0.8, 1.8, 5.7, 5.0, "5 Real-World Scenario Challenges", [
        "Scenario 1: Rain starts but water depth is 2cm -> Enter alert-standby; do not lift prematurely.",
        "Scenario 2: Water level surges from 4cm to 18cm -> Sound buzzer -> Unlatch foundation -> Drive motor up -> Trip limit switch.",
        "Scenario 3: Turbulent water waves return 0cm or 298cm outliers -> Apply software median filter over 5 samples.",
        "Scenario 4: Platform reaches upper summit -> Sub-millisecond motor halt via Pin 2 limit switch -> Engage servo locks.",
        "Scenario 5: Water recedes to 3cm -> Run 10-second debounce timer -> Unlock pins -> Lower smoothly -> Stop at bottom datum."
    ], badge="Decision Matrix", accent_color=CYAN_ACCENT)

    add_card(s15, 6.8, 1.8, 5.7, 5.0, "Troubleshooting & Rectification Guide", [
        "Symptom: Motor does not turn despite flood danger.\n-> Fix: Check common ground between 12V battery and Arduino GND.",
        "Symptom: Arduino resets when motor or servo activates.\n-> Fix: Power isolation failure. Do not draw high current from 5V pin; add external 12V supply.",
        "Symptom: Ultrasonic distance jumps between 0cm and 300cm.\n-> Fix: Acoustic waves deflecting on ripples. Install a stilling tube around sensor.",
        "Symptom: Motor grinds past maximum summit height.\n-> Fix: Check upper limit switch wiring and verify INPUT_PULLUP mode."
    ], badge="Diagnostics Matrix", accent_color=RED_ACCENT)

    add_storyline_notes(
        s15,
        "Scene 8 - Slide 8.1: Scenarios & Troubleshooting",
        "Interactive Branching Scenario: Articulate Storyline presents student with Scenario 1 dilemma and evaluates their response with customized feedback layers.",
        "v_ScenarioScore (Number)",
        "Engineering involves diagnosing real-world edge cases. These five scenarios test your judgment against false triggers, turbulent wave reflections, limit switch engages, and power isolation brownouts."
    )

    # ==========================================
    # SLIDE 16: ARTICULATE STORYLINE 360 BLUEPRINT (Scene 9 - Slide 9.1)
    # ==========================================
    s16 = prs.slides.add_slide(blank_layout)
    add_background(s16)
    add_header(s16, "Articulate Storyline 360 Authoring Architecture", "SCENE 9: STORYLINE DEVELOPER BLUEPRINT")

    add_card(s16, 0.8, 1.8, 3.75, 5.0, "Storyline Project Variables", [
        "v_WaterDepth (Number, 0 to 40 cm): Governs flood level and triggers.",
        "v_RainIntensity (Number, 0 to 100%): Governs precipitation animation.",
        "v_SystemState (Text): Tracks active state machine phase.",
        "v_TopLimitTripped (Boolean): True when platform reaches summit.",
        "v_BottomLimitTripped (Boolean): True at base datum.",
        "v_UserScore (Number): Aggregates quiz and scenario scores."
    ], badge="Variables Blueprint", accent_color=CYAN_ACCENT)

    add_card(s16, 4.8, 1.8, 3.75, 5.0, "Slide Layers & Triggers", [
        "Layer_EmergencyAlert: Displays flashing red banner and triggers alarm sound when v_WaterDepth >= 15.",
        "Layer_LiftingMotion: Plays 4-second motion path elevating house platform.",
        "Layer_SupportLocked: Shows servo pin sliding into locking column.",
        "Trigger Condition: 'When v_WaterDepth changes -> If >= 15 AND v_SystemState == STANDBY -> Show Layer_EmergencyAlert'."
    ], badge="Layers & Triggers", accent_color=BLUE_ACCENT)

    add_card(s16, 8.8, 1.8, 3.75, 5.0, "Media, Audio & Accessibility", [
        "Audio Narration: Synchronized voiceover tracks linked to slide timeline cues.",
        "Closed Captions: Built-in VTT captions for all narration segments.",
        "Tab Navigation Order: Strict WCAG 2.1 AA accessibility tab hierarchy.",
        "SCORM / xAPI Export: Package configured for LMS gradebook tracking (SCORM 2004 4th Edition).",
        "Mobile Responsive: Player scales dynamically across tablets and phones."
    ], badge="Media & Compliance", accent_color=EMERALD_ACC)

    add_storyline_notes(
        s16,
        "Scene 9 - Slide 9.1: Storyline 360 Technical Specs",
        "Instructional Designer Reference: This slide provides the exact variables, trigger conditions, layers, and audio cues for authoring the course directly in Articulate Storyline 360.",
        "v_StorylineReady (Boolean)",
        "For instructional designers and e-learning developers, this slide details the exact Articulate Storyline 360 variable dictionary, trigger logic, and layer architecture required to import or build this module in Storyline."
    )

    # ==========================================
    # SLIDE 17: CONCLUSION & CERTIFICATION (Scene 9 - Slide 9.2)
    # ==========================================
    s17 = prs.slides.add_slide(blank_layout)
    add_background(s17)
    add_header(s17, "Assessment, Certification & Deliverables", "SCENE 9: GRADUATION")

    add_card(s17, 0.8, 1.8, 5.7, 5.0, "Course Competency & Assessment Summary", [
        "60 Comprehensive MCQs: 10 standardized evaluation questions per module + 10 Capstone questions.",
        "Passing Criterion: 70% proficiency across all technical competencies.",
        "Drag-and-Drop Component Matcher: Assesses architectural understanding of sensors and actuators.",
        "Live Interactive Platform: Experience the full simulation online with audio alarms and real-time physics.",
        "Downloadable PDF Manual: 12-page professional laboratory guide with watermark 'Created by Toshit Kumar'."
    ], badge="Assessment Center", accent_color=EMERALD_ACC)

    add_card(s17, 6.8, 1.8, 5.7, 5.0, "Official Accreditation & Links", [
        "Project Author: Toshit Kumar | Lead Robotics Engineer",
        "Live Website: https://toshitkumar.github.io/arduino-robotics-elearning/",
        "GitHub Repository: https://github.com/toshitkumar/arduino-robotics-elearning",
        "PowerPoint Deck (.pptx): Fully editable and ready for 'File > Import > PowerPoint' in Articulate Storyline 360.",
        "Credential Certificate: Officially generated upon scoring >= 70% in the Assessment Center."
    ], badge="Accreditation & Resources", accent_color=AMBER_ACCENT)

    add_storyline_notes(
        s17,
        "Scene 9 - Slide 9.2: Course Graduation & Certificate",
        "Trigger: When v_UserScore >= 70 -> Show Layer 'Certificate_Award' and trigger confetti animation.",
        "v_CertificateUnlocked (Boolean)",
        "Congratulations on completing the Arduino Robotics and Flood-Safe Smart House curriculum. You have demonstrated rigorous mastery of microcontroller architectures, actuator physics, and autonomous flood mitigation engineering. Authored and engineered by Toshit Kumar."
    )

    # Save Deck
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public"))
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, "Arduino_Robotics_Flood_Safe_Smart_House_Storyline.pptx")
    prs.save(out_path)
    print(f"Presentation successfully saved to: {out_path} ({os.path.getsize(out_path) / 1024:.1f} KB)")

    # Also save to artifact directory
    artifact_dir = r"C:\Users\Toshit Kumar\.gemini\antigravity\brain\abeafffa-65f7-4ccb-b6ea-3351dba21f4a"
    if os.path.exists(artifact_dir):
        art_path = os.path.join(artifact_dir, "Arduino_Robotics_Flood_Safe_Smart_House_Storyline.pptx")
        prs.save(art_path)
        print(f"Artifact copy saved to: {art_path}")

if __name__ == "__main__":
    create_deck()
