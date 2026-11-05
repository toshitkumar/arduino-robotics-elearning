// Scenario-based engineering decision challenges
// Author: Toshit Kumar

export const SCENARIOS = [
  {
    id: "sc-1",
    num: "Scenario 01",
    title: "Rain Starts but Water Level Remains Safe",
    context: "A heavy monsoon thunderstorm begins in the catchment zone. The rain sensor AO drops sharply to 320 (indicating intense downpour). However, the overhead HC-SR04 ultrasonic sensor reports a distance of 38 cm (indicating only 2 cm of ground moisture in the drainage gutter, well below the 15 cm danger threshold).",
    dilemma: "As the automation control engineer, how should the Arduino control algorithm respond?",
    options: [
      {
        id: "opt-a",
        text: "Immediately trigger full motor lift to maximum height to prepare early.",
        correct: false,
        feedback: "Incorrect. Lifting prematurely on rain detection alone causes unnecessary mechanical wear, consumes power, locks residents out of ground access, and violates dual-sensor confirmation logic."
      },
      {
        id: "opt-b",
        text: "Sound a pre-warning status, keep the house on the ground, and increase ultrasonic polling frequency to monitor depth trends.",
        correct: true,
        feedback: "Correct! Dual-stage flood monitoring requires verification. Rainfall indicates threat onset, so entering an alert-standby state while keeping the house secured until depth confirmation prevents expensive false alarms."
      },
      {
        id: "opt-c",
        text: "Shut down the entire system to protect the electronics from water ingress.",
        correct: false,
        feedback: "Incorrect. Shutting down during precipitation renders the automated flood-safety system completely useless when protection is needed most."
      },
      {
        id: "opt-d",
        text: "Disengage the servo safety latch and turn ON the Blue lowering LED.",
        correct: false,
        feedback: "Incorrect. The house is already at ground level; lowering or unlatching without reason destabilizes the foundation."
      }
    ],
    engineeringExplanation: "Modern civil flood barriers implement multi-sensor redundancy. Rain sensors provide early weather awareness, but actual physical elevation should only occur when hydrological accumulation (water level depth) is verified by the acoustic or hydrostatic depth sensor."
  },
  {
    id: "sc-2",
    num: "Scenario 02",
    title: "Water Level Suddenly Surges Past Critical Threshold",
    context: "A flash flood surge occurs following a riverbank breach. The ultrasonic sensor detects water rising rapidly from 4 cm to 18 cm within 20 seconds, exceeding the 15 cm critical threshold.",
    dilemma: "What sequence of operations must execute to guarantee passenger safety and mechanical integrity?",
    options: [
      {
        id: "opt-a",
        text: "Engage motor full power upwards immediately without sounding alarms or retracting latches.",
        correct: false,
        feedback: "Incorrect. Powering the motor while physical foundation latch pins are still engaged will shear the mechanical pins or stall and burn out the L298N driver."
      },
      {
        id: "opt-b",
        text: "Sound buzzer & illuminate Red LED -> Disengage servo safety locks -> Command L298N forward lifting -> Monitor upper limit switch.",
        correct: true,
        feedback: "Correct! The protocol requires: (1) audible warning to occupants, (2) releasing mechanical foundation locks to prevent mechanical binding, (3) commanding motor upward, and (4) cutting power once upper limit switch is tripped."
      },
      {
        id: "opt-c",
        text: "Wait 10 minutes to verify if the water level will recede on its own.",
        correct: false,
        feedback: "Incorrect. Flash floods inundate homes within minutes. Waiting 10 minutes risks submerging the chassis, motors, and electrical distribution."
      },
      {
        id: "opt-d",
        text: "Reverse the motor polarity to lower the house into the ground.",
        correct: false,
        feedback: "Incorrect. Reversing into the ground will cause catastrophic mechanical collision against foundation footings."
      }
    ],
    engineeringExplanation: "Sequential interlock control is fundamental to mechatronics. Actuators must follow a strict non-conflicting dependency graph: Annunciation -> Unlock -> Drive -> Limit Stop -> Lock."
  },
  {
    id: "sc-3",
    num: "Scenario 03",
    title: "Ultrasonic Sensor Detects Erroneous Distance During Waves",
    context: "Violent wind causes turbulent waves in the flood basin. Over 5 seconds, the ultrasonic sensor returns: [14cm, 0cm, 15cm, 298cm, 14.5cm]. The 0cm and 298cm readings are acoustic reflection timeouts caused by wave tilt reflecting sound away from the receiver.",
    dilemma: "How should the Arduino software filter out this noisy telemetry to prevent erratic motor activation?",
    options: [
      {
        id: "opt-a",
        text: "Rely solely on single raw readings without any sanity checks.",
        correct: false,
        feedback: "Incorrect. A single 298cm reading would trick the system into thinking the water disappeared, potentially triggering sudden descent into the flood."
      },
      {
        id: "opt-b",
        text: "Implement a median filter (e.g. sample 5 values, discard min/max outliers, sort and take median) before passing to the state machine.",
        correct: true,
        feedback: "Correct! Median filtering completely eliminates impulse outliers (0cm timeout or 298cm ceiling bounce) and yields a smooth, robust true water depth."
      },
      {
        id: "opt-c",
        text: "Increase trigger pulse duration from 10µs to 5000µs to overpower the waves.",
        correct: false,
        feedback: "Incorrect. The HC-SR04 internal ASIC only requires a 10µs trigger. Lengthening the trigger will not alter the 40kHz transducer acoustic output and will cause microcontroller timing issues."
      },
      {
        id: "opt-d",
        text: "Replace ultrasonic with an uninsulated bare copper wire pair submerged in the water.",
        correct: false,
        feedback: "Incorrect. Bare submerged copper wires corrode rapidly and cannot measure continuous analog water height with precision."
      }
    ],
    engineeringExplanation: "Digital signal processing (DSP) techniques such as running median filters, moving averages, and range-clamping are mandatory when fielding ultrasonic sensors over liquid surfaces subject to turbulence."
  },
  {
    id: "sc-4",
    num: "Scenario 04",
    title: "House Reaches its Upper Lifting Limit",
    context: "The house has elevated 25 cm above datum. The platform chassis makes contact with the physical Upper Limit Switch, driving digital Pin 2 LOW. However, the ultrasonic sensor still detects 22 cm of water depth.",
    dilemma: "How should the control system handle the motor command?",
    options: [
      {
        id: "opt-a",
        text: "Keep driving the motor upwards because water is still present.",
        correct: false,
        feedback: "Incorrect! Continuing to drive past the mechanical travel limit will strip gears, bend the lead-screw, overheat the L298N driver, or snap drive cables."
      },
      {
        id: "opt-b",
        text: "Immediately deactivate motor drive (IN1=LOW, IN2=LOW, ENA=0), apply dynamic brake, and engage servo support pins.",
        correct: true,
        feedback: "Correct! The limit switch defines the immutable boundary of physical travel. Once engaged, the motor MUST halt immediately, transferring platform weight onto mechanical support locks."
      },
      {
        id: "opt-c",
        text: "Reverse the motor and drop the house back down into the flood.",
        correct: false,
        feedback: "Incorrect. Lowering the house back into active 22 cm floodwaters defeats the entire purpose of the flood protection system."
      },
      {
        id: "opt-d",
        text: "Ignore the limit switch and wait for a fixed 10-second timer to expire.",
        correct: false,
        feedback: "Incorrect. Relying exclusively on timed operation without hard limit switch stops is a severe engineering hazard."
      }
    ],
    engineeringExplanation: "Hardware limit switches provide definitive physical datum points. In industrial robotics, limit switch inputs are often routed directly to hardware interrupts (such as Arduino INT0 on Pin 2) to ensure sub-millisecond motor cutoff."
  },
  {
    id: "sc-5",
    num: "Scenario 05",
    title: "Water Level Returns to Normal (Subsided)",
    context: "The storm has passed, flood gates downstream open, and water depth drops to 3 cm (below the 5 cm SAFE_THRESHOLD). The house is currently held at the upper summit.",
    dilemma: "What is the safest procedure to lower the house back to the foundation?",
    options: [
      {
        id: "opt-a",
        text: "Instantly drop the platform the millisecond water depth reaches 4.9 cm without confirmation.",
        correct: false,
        feedback: "Incorrect. Transient wave troughs could dip below 5 cm momentarily. Instant descent without hysteresis causes the house to oscillate up and down repeatedly."
      },
      {
        id: "opt-b",
        text: "Start a hysteresis timer (e.g. 10 continuous seconds below safe margin) -> Retract servo lock pins -> Lower at moderate speed with Blue LED -> Stop when lower limit switch trips.",
        correct: true,
        feedback: "Correct! Hysteresis ensures the recession is permanent and stable. Retracting locks prior to descent prevents mechanical collision, and the bottom limit switch guarantees a soft landing."
      },
      {
        id: "opt-c",
        text: "Leave the house elevated forever because it might rain again next year.",
        correct: false,
        feedback: "Incorrect. Leaving the house permanently elevated restricts ground access, puts prolonged strain on lifting columns, and ignores the dual-mode operational design."
      },
      {
        id: "opt-d",
        text: "Cut all power to the L298N motor driver so gravity drops the house freely.",
        correct: false,
        feedback: "Incorrect. Free-fall descent will smash the house onto the concrete slab, destroying the structure and injuring simulated occupants."
      }
    ],
    engineeringExplanation: "Hysteresis timing prevents 'chattering' in control systems. When transitioning between states across dynamic environmental variables (like flood recession), requiring sustained safe conditions prevents erratic actuator oscillation."
  }
];
