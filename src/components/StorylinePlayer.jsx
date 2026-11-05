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
  Award,
  ShieldCheck,
  Zap,
  Activity,
  Bot
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export const GREYORANGE_SLIDES = [
  {
    id: 'go-1',
    scene: 'Scene 1: GreyOrange Enterprise Welcome',
    title: 'Autonomous Mobile Robots (AMRs) & GreyMatter™',
    subtitle: 'Enterprise Warehouse Automation Masterclass | Designed by Toshit Kumar',
    type: 'cover',
    brand: 'greyorange',
    content: {
      tagline: 'GREYORANGE ENTERPRISE ROBOTICS E-LEARNING CERTIFICATION PROGRAM',
      lead: 'A role-based, production-grade training curriculum designed for warehouse operators, deployment engineers, and operations supervisors. Covers autonomous navigation (SLAM), safety LiDAR zones, GreyMatter™ AI orchestration, maintenance SOPs, and Kirkpatrick/LTEM training evaluation frameworks.',
      author: 'Toshit Kumar',
      role: 'Senior Training Content Creator & Instructional Designer',
    },
    voiceover: 'Welcome to the GreyOrange Autonomous Mobile Robots and GreyMatter Orchestration Masterclass, developed by Toshit Kumar. This training program enables customers, deployment engineers, warehouse supervisors, and maintenance technicians to safely operate and master automated fulfillment ecosystems.',
    storylineNotes: {
      triggers: 'When timeline starts: Play audio VO_Intro_GreyOrange. Set variable v_CourseProgress = 0. Set variable v_Brand = "GreyOrange".',
      variables: 'v_CourseProgress (Number: 0), v_LearnerRole (Text: "Unassigned"), v_LMS_Platform (Text: "Courseplay")',
      layers: 'Base Layer, Layer_GreyOrangeWelcomeAudio',
      pedagogy: 'Kirkpatrick Level 1 & LTEM Tier 1 (Attendance Tracking) / Tier 2 (Activity Logging via SCORM 2004).'
    }
  },
  {
    id: 'go-2',
    scene: 'Scene 1: Architecture Blueprint',
    title: 'Training Program Blueprint: 6 Role-Based Modules',
    subtitle: 'Curriculum Aligned with GreyOrange Field Operations & Engineering Standards',
    type: 'blueprint',
    brand: 'greyorange',
    content: {
      cards: [
        { num: '01', title: 'GreyOrange Ecosystem', desc: 'AMR fleet (Ranger series) vs legacy AGVs, GreyMatter™ AI brain, and WES/WMS integration.' },
        { num: '02', title: 'Hardware Anatomy & Sensors', desc: 'LiDAR scanners, 3D ToF cameras, barcode ground navigation, and ISO 3691-4 safety exclusion fields.' },
        { num: '03', title: 'GreyMatter™ Fleet AI', desc: 'Dynamic traffic routing, multi-agent path planning (MAPF), and opportunity charging management.' },
        { num: '04', title: 'Role-Based Workstation SOPs', desc: 'Goods-to-Person (G2P) pick/put workflows, tactile scanning, and supervisor E-Stop recovery protocols.' },
        { num: '05', title: 'Preventive Maintenance (PM)', desc: 'Daily optical cleaning, 250-hour drive wheel wear audits, and field diagnostic fault codes.' },
        { num: '06', title: 'Kirkpatrick & LTEM Pedagogy', desc: 'Kirkpatrick 4 Levels of Evaluation, LTEM 8-Tier transfer metrics, and LMS SCORM/xAPI packaging.' },
      ]
    },
    voiceover: 'Our modular training architecture is structured to support every stakeholder in modern fulfillment centers—from floor operators to senior operations directors. Each module bridges technical engineering specs with role-based operational tasks.',
    storylineNotes: {
      triggers: 'Clicking any module card branches to the respective scene; updates variable v_ActiveModule.',
      variables: 'v_ActiveModule (Text: "Mod1" to "Mod6")',
      layers: 'Base Layer, Layer_RoleSelectionModal',
      pedagogy: 'LTEM Tier 3 (Learner Perception): Evaluates perceived relevance and cognitive load.'
    }
  },
  {
    id: 'go-3',
    scene: 'Scene 2: Ecosystem Overview',
    title: 'Module 01: GreyOrange Automation Ecosystem',
    subtitle: 'Autonomous Mobile Robots (AMRs) vs AGVs & GreyMatter™ WES Integration',
    type: 'two-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Autonomous Mobile Robots (AMRs) vs AGVs',
      col1Items: [
        'Dynamic SLAM Navigation: AMRs use natural feature LiDAR mapping without fixed floor magnetic tape or optical wires.',
        'Intelligent Obstacle Avoidance: Dynamically calculates real-time detours around temporary obstacles rather than halting lines.',
        'High-Payload Ranger Series: Transports Mobile Storage Units (MSUs), pallets, and conveyor payloads up to 1,600 kg.',
        'High Fleet Density: Supports hundreds of concurrent robots collaborating in high-throughput fulfillment corridors.'
      ],
      col2Title: 'GreyMatter™ AI Robotic Orchestration & WES',
      col2Items: [
        'Predictive Task Allocation: Continuously analyzes SKU velocity, order pick waves, and operator locations.',
        'Goods-to-Person (G2P) Delivery: Directs AMRs to bring inventory racks directly to ergonomic workstation pickers.',
        'WMS & ERP Interoperability: Seamless high-throughput REST/WebSocket hooks into Manhattan, SAP EWM, and Blue Yonder.',
        'Real-Time Telemetry: Streams robot health, motor temperature, battery SOC, and travel velocities to central dashboards.'
      ]
    },
    voiceover: 'In Module 1, we establish how GreyOrange Autonomous Mobile Robots pair with the GreyMatter AI orchestration engine to transform high-throughput e-commerce fulfillment centers.',
    storylineNotes: {
      triggers: 'Hovering over GreyMatter icon highlights real-time data packets flowing to the AMR fleet.',
      variables: 'v_EcosystemViewed (Boolean: True)',
      layers: 'Layer_DataFlowDiagram',
      pedagogy: 'LTEM Tier 4 (Knowledge Retention): Recall of SLAM navigation vs fixed-track AGVs.'
    }
  },
  {
    id: 'go-4',
    scene: 'Scene 3: AMR Anatomy & Safety',
    title: 'Module 02: AMR Hardware Anatomy & Safety Subsystems',
    subtitle: 'Sensors, Actuation, and ISO 3691-4 Safety Exclusion Zone Compliance',
    type: 'three-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Perception Suite',
      col1Items: [
        'Dual Safety LiDAR Scanners: 360° obstacle sweep up to 25 meters.',
        '3D Time-of-Flight (ToF): Detects pallet overhangs and low debris.',
        'Downward Optical Camera: Reads 2D DataMatrix floor fiducials.',
        '6-Axis IMU: Tracks angular velocity and wheel slip.'
      ],
      col2Title: 'Drive & Lift Actuation',
      col2Items: [
        'Differential Drive Wheels: Brushless DC servos with optical encoders.',
        'Electric Screw Jack Lift: Elevates 1,600 kg racks in < 2.5 seconds.',
        'Electromagnetic Brakes: Failsafe holding brakes lock on power loss.',
        'All-Direction Castors: Polyurethane stabilizing castors.'
      ],
      col3Title: 'ISO 3691-4 Safety',
      col3Items: [
        'Certified Compliance: ISO 3691-4 & ANSI/RIA R15.08 safety standards.',
        'Dynamic Safety Fields: Warning Zone (slows) and Protective Zone (halts).',
        'Dual E-Stop Buttons: Cuts motor power via SIL-3 safety relays.',
        '360° Perimeter Halo LEDs: Visual status and audible warning beepers.'
      ]
    },
    voiceover: 'Every GreyOrange AMR integrates industrial-grade safety sensors certified to ISO 3691-4. Notice the dynamic safety fields: as robot velocity increases, the laser warning envelope automatically expands.',
    storylineNotes: {
      triggers: 'Interactive 3D hotspots rotate AMR chassis and trigger safety exclusion field visualization.',
      variables: 'v_SafetyZoneInspected (Boolean: True)',
      layers: 'Layer_LiDAR_Exclusion_Visualizer',
      pedagogy: 'LTEM Tier 5 (Decision-Making Competence): Scenario distinguishing Warning vs Protective Stop zones.'
    }
  },
  {
    id: 'go-5',
    scene: 'Scene 4: Fleet Management',
    title: 'Module 03: GreyMatter™ Fleet Management & Routing',
    subtitle: 'Multi-Agent Path Planning (MAPF), Congestion Mitigation & Opportunity Charging',
    type: 'two-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Dynamic Traffic & Congestion Prevention',
      col1Items: [
        'Multi-Agent Path Planning (MAPF): Solves space-time trajectories for hundreds of robots simultaneously.',
        'Dynamic Intersection Priority: Assigns right-of-way based on priority outbound orders vs replenishment.',
        'Corridor Congestion Bypass: Reroutes AMRs through alternate aisles if primary path encounters human obstruction.',
        'Deadlock Resolution: Autonomous algorithms detect and resolve head-to-head gridlocks without human dispatchers.'
      ],
      col2Title: 'Autonomous Opportunity Charging',
      col2Items: [
        'Battery Chemistry: High-cycle lithium-ion packs monitored for cell voltage, temperature, and State-of-Charge (SOC).',
        'Floor Contact Charging: AMRs autonomously dock onto floor contact plates during micro-breaks between pick waves.',
        'Fast 15-Minute Boost: Delivers over 3 hours of continuous full-load operational duty.',
        'Predictive Charge Scheduling: Ensures peak wave robots are maintained at > 80% State-of-Charge.'
      ]
    },
    voiceover: 'GreyMatter is not just a dispatcher; it is an intelligent orchestrator. By balancing charge cycles and eliminating corridor bottlenecks, it maintains over 99 percent fleet utilization during peak shifts.',
    storylineNotes: {
      triggers: 'Dragging an obstacle onto the virtual grid causes GreyMatter to compute a dynamic alternate path in real time.',
      variables: 'v_TrafficRerouted (Boolean)',
      layers: 'Layer_PathOptimizationDemo',
      pedagogy: 'LTEM Tier 6 (Task Competence): Simulated dispatch and charge scheduling test.'
    }
  },
  {
    id: 'go-6',
    scene: 'Scene 5: Workstation SOPs',
    title: 'Module 04: Role-Based Standard Operating Procedures (SOPs)',
    subtitle: 'Goods-to-Person (G2P) Workstation Operations & Supervisor E-Stop Recovery',
    type: 'two-col',
    brand: 'greyorange',
    content: {
      col1Title: 'G2P Workstation Pick/Put SOP',
      col1Items: [
        'Step 1: Shift Login: Operator logs in and performs tactile barcode scanner check.',
        'Step 2: Rack Presentation: AMR rotates exact target SKU cubby toward operator.',
        'Step 3: Pick-to-Light: Laser and LED bar indicate bin and required quantity.',
        'Step 4: Scan Verification: Operator scans item UPC; green chime confirms match.',
        'Step 5: Put Confirmation: Item placed into order tote; press button to release rack.'
      ],
      col2Title: 'Supervisor E-Stop Recovery SOP',
      col2Items: [
        'Step 1: Alarm Recognition: Dashboard flags E-Stop Triggered with grid coordinate.',
        'Step 2: Zone Inspection: Check AMR path for pallet wrap, debris, or personnel.',
        'Step 3: Mechanical E-Stop Reset: Rotate mushroom E-Stop clockwise to release latch.',
        'Step 4: Safety Controller Acknowledgment: Hold blue Safety Reset button for 3s.',
        'Step 5: GreyMatter Software Resume: Confirm clear perimeter and resume mission.'
      ]
    },
    voiceover: 'Clear SOPs prevent costly warehouse downtime. In this module, operators master rapid pick-to-light workflows, while supervisors practice the strict 5-step safety recovery procedure following an emergency stop.',
    storylineNotes: {
      triggers: 'Sequential clickable workflow: User must perform all 5 steps in order to unlock verification badge.',
      variables: 'v_EStopSOP_Passed (Boolean)',
      layers: 'Layer_EStopSimulationModal',
      pedagogy: 'Kirkpatrick Level 3 & LTEM Tier 5: Direct simulation of physical safety recovery protocol.'
    }
  },
  {
    id: 'go-7',
    scene: 'Scene 6: Maintenance & PM',
    title: 'Module 05: Preventive Maintenance (PM) & Troubleshooting',
    subtitle: 'Daily Optical Cleaning, 250-Hr Service Protocols, and Diagnostic Fault Codes',
    type: 'three-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Daily PM Protocol',
      col1Items: [
        'LiDAR Optical Cleaning: 70% isopropyl wipe on scanner windows.',
        'Downward Camera Check: Clean fiducial lens from dust and grease.',
        'E-Stop Button Test: Confirm immediate mechanical actuator cut off.',
        'Bumper & LED Halo Audit: Check perimeter seals for impact damage.'
      ],
      col2Title: 'Weekly / 250-Hr Service',
      col2Items: [
        'Tire Tread Measurement: Polyurethane depth check (min 3.5mm limit).',
        'Lift Mechanism Lubrication: Synthetic grease applied to lead screws.',
        'Charging Shoe Burnishing: Clean copper pads to prevent oxidation.',
        'Floor Grid Fiducial Audit: Replace torn QR tiles in high-traffic zones.'
      ],
      col3Title: 'Diagnostic Fault Codes',
      col3Items: [
        'Error E-201 (Localization Lost): Clean camera; manual jog to grid.',
        'Error E-304 (Motor Over-Current): Debris entangled in wheel axle.',
        'Error E-410 (Charge Pad Resistance): Burnish contacts & check tension.',
        'Error E-505 (Safety Zone Mismatch): Re-flash certified safety config.'
      ]
    },
    voiceover: 'Proper maintenance directly drives fleet uptime. Technicians must strictly follow daily optical cleaning routines and reference standardized diagnostic fault codes to resolve issues in under five minutes.',
    storylineNotes: {
      triggers: 'Interactive Fault Simulator: Learner is given Error E-201 and must execute the proper diagnostic steps.',
      variables: 'v_FaultDiagnosticScore (Number: 0-100)',
      layers: 'Layer_ServiceManualLookup',
      pedagogy: 'LTEM Tier 6 (Task Competence): Measures diagnostic troubleshooting accuracy.'
    }
  },
  {
    id: 'go-8',
    scene: 'Scene 7: Evaluation Frameworks',
    title: 'Module 06: Kirkpatrick 4-Level & LTEM 8-Tier Evaluation',
    subtitle: 'Demonstrating Training Efficacy, ROI, and Operational Adoption',
    type: 'two-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Kirkpatrick 4 Levels of Evaluation',
      col1Items: [
        'Level 1: Reaction: Post-training feedback on content clarity and relevance (Target: >= 90% positive sentiment).',
        'Level 2: Learning: Objective assessments measuring technical and safety mastery (Target: >= 80% passing score).',
        'Level 3: Behavior: On-floor auditing confirming operators follow SOPs during live shifts (Target: 95% compliance).',
        'Level 4: Results (Business ROI): Measurable impact—accelerated customer onboarding time and 40% reduction in support tickets.'
      ],
      col2Title: 'LTEM (Learning Transfer Evaluation Model — 8 Tiers)',
      col2Items: [
        'Tier 1 & 2 (Attendance & Activity): LMS tracking of module completion and time-on-task.',
        'Tier 3 (Perception): Validated feedback assessing task utility and cognitive load.',
        'Tier 4 (Knowledge): Objective recall of technical specs, error codes, and safety interlocks.',
        'Tier 5 & 6 (Competence): Branching scenario simulations and task performance in GreyMatter.',
        'Tier 7 & 8 (Transfer & Results): Quantifiable reduction in warehouse downtime and long-term customer success.'
      ]
    },
    voiceover: 'As a Senior Training Content Creator, measuring training efficacy is mandatory. We employ Kirkpatrick\'s 4 Levels and Will Thalheimer\'s 8-Tier Learning Transfer Evaluation Model to prove measurable business impact to customer executive leadership.',
    storylineNotes: {
      triggers: 'Clicking Level 4 displays live telemetry dashboard correlating training adoption with reduced support tickets.',
      variables: 'v_KirkpatrickLevel (Number: 1 to 4)',
      layers: 'Layer_BusinessMetricsGraph',
      pedagogy: 'LTEM Tier 8 (Transfer Effects): Enterprise-wide operational safety and robot adoption metrics.'
    }
  },
  {
    id: 'go-9',
    scene: 'Scene 8: LMS Governance',
    title: 'LMS Administration, SCORM/xAPI & Courseplay Delivery',
    subtitle: 'Enterprise Platform Governance, Content Packaging, and Version Control',
    type: 'three-col',
    brand: 'greyorange',
    content: {
      col1Title: 'LMS Platforms',
      col1Items: [
        'Courseplay Integration: Automated user enrollment and badge automation.',
        'Proprietary Enterprise LMS: REST API synchronization with customer portals.',
        'Articulate Rise Mobile: Fluid responsive training for floor supervisors.'
      ],
      col2Title: 'Packaging Standards',
      col2Items: [
        'SCORM 2004 4th Edition: Advanced sequencing and multi-SCO progress tracking.',
        'xAPI (Tin Can API): Granular statement streaming (e.g. "Operator resolved E-Stop #104").',
        'CMI5 Compliance: Enterprise standard for secure LMS/LRS communication.'
      ],
      col3Title: 'Continuous Revision',
      col3Items: [
        'Release Alignment: Updating learning concurrent with GreyMatter bi-monthly releases.',
        'Git-Based Content Control: Version tagging ensuring obsolete SOPs are archived.',
        'Data-Informed Revisions: Support ticket analytics directly informing training updates.'
      ]
    },
    voiceover: 'Enterprise training requires robust platform delivery. We package all modules adhering to SCORM 2004 and xAPI protocols, enabling granular data logging into platforms like Courseplay.',
    storylineNotes: {
      triggers: 'Code block demonstrates sending xAPI statement to LRS upon completing simulation.',
      variables: 'v_xAPI_Logged (Boolean)',
      layers: 'Layer_xAPISyntaxViewer',
      pedagogy: 'LTEM Tier 1 & 2: Real-time telemetry monitoring course adoption and user progression.'
    }
  },
  {
    id: 'go-10',
    scene: 'Scene 9: Executive Alignment',
    title: 'Success Metrics & Enterprise ROI Alignment',
    subtitle: 'Role Alignment for Senior Training Content Creator | Developed by Toshit Kumar',
    type: 'two-col',
    brand: 'greyorange',
    content: {
      col1Title: 'Measurable Success Metrics (Job Spec Alignment)',
      col1Items: [
        'Accelerated Time-to-Productivity: Reduces customer operator onboarding ramp-up from 14 days down to 4 days.',
        '> 95% LMS Completion & Certification: Interactive branching and scenario simulations maximize learner retention.',
        '40% Reduction in Support Tickets: Clear troubleshooting SOPs empower warehouse staff to resolve minor faults locally.',
        'Zero Preventable Safety Incidents: Strict adherence to ISO 3691-4 safety protocols and exclusion field training.',
        'Release-Aligned Training Delivery: Synchronized deployments with GreyMatter bi-monthly software sprints.'
      ],
      col2Title: 'Portfolio Credentials & Author Verification',
      col2Items: [
        'Target Role: Senior Training Content Creator | GreyOrange (Gurugram)',
        'Author & Instructional Engineer: Toshit Kumar',
        'Key Competencies Demonstrated:\n• E-Learning Suite: Articulate Storyline 360, Rise 360, Adobe Captivate\n• Robotics Domain: AMRs, AGVs, GreyMatter FMS, WES, WMS\n• Pedagogy: Kirkpatrick 4 Levels, LTEM 8 Tiers, ADDIE, Bloom\'s Taxonomy\n• LMS Administration: Courseplay, SCORM 2004, xAPI LRS Integration',
        'Live Interactive Platform: https://toshitkumar.github.io/arduino-robotics-elearning/'
      ]
    },
    voiceover: 'This masterclass proves the value of professional instructional design in high-stakes warehouse robotics. Designed and engineered by Toshit Kumar to exceed all qualifications for the Senior Training Content Creator role at GreyOrange.',
    storylineNotes: {
      triggers: 'Awards GreyOrange Certified AMR Operations Specialist Digital Badge via Courseplay API.',
      variables: 'v_Certified (Boolean: True)',
      layers: 'Layer_CertificateAward',
      pedagogy: 'LTEM Tier 7 & 8: Validated behavioral transfer and long-term organizational ROI.'
    }
  }
];

export default function StorylinePlayer() {
  const [activeDeck, setActiveDeck] = useState('greyorange'); // 'greyorange' or 'arduino'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const slides = GREYORANGE_SLIDES;
  const currentSlide = slides[currentSlideIndex];

  // Speech Synthesis setup
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
    if (currentSlideIndex < slides.length - 1) {
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

  const downloadGreyOrangePPTX = () => {
    playClickSound();
    const link = document.createElement('a');
    link.href = './GreyOrange_Robotics_Training_Storyline.pptx';
    link.download = 'GreyOrange_Robotics_Training_Storyline.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-4">
      {/* Top Header & Brand Switcher */}
      <div className="bg-[#1A1D24] border border-[#F37021]/30 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F37021] to-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-[#F37021]/20">
            GO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#F37021] uppercase tracking-wider bg-[#F37021]/10 px-2.5 py-0.5 rounded border border-[#F37021]/30">
                GreyOrange Official Style
              </span>
              <span className="text-xs text-slate-400 font-mono">Articulate Storyline 360</span>
            </div>
            <h2 className="text-base font-bold text-white">GreyOrange AMR & GreyMatter™ Masterclass</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showNotes ? 'bg-[#F37021]/20 text-[#F37021] border-[#F37021]/50' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Storyline Specs & LTEM</span>
          </button>

          <button
            onClick={downloadGreyOrangePPTX}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#F37021] to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-[#F37021]/30 cursor-pointer transition-all"
            title="Download GreyOrange PowerPoint Deck for Articulate Storyline 360"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download GreyOrange PPTX</span>
          </button>
        </div>
      </div>

      {/* Main Articulate Storyline 360 Player (Grey & Orange Theme) */}
      <div className="bg-[#1A1D24] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">
        {/* Left Side: Slide Menu */}
        <div className="w-full md:w-64 bg-[#20242D] border-r border-slate-800 p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-3">
            <div className="px-2 pt-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Module Index</span>
              <span className="text-[10px] font-mono text-[#F37021] font-bold">
                {currentSlideIndex + 1} / {slides.length}
              </span>
            </div>

            <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
              {slides.map((slide, idx) => {
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
                        ? 'bg-[#F37021] text-white font-bold shadow-md shadow-[#F37021]/30'
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

          <div className="p-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Author: Toshit Kumar</span>
            <span className="text-[#F37021] font-bold">GreyOrange AMR</span>
          </div>
        </div>

        {/* Right Side: Stage Slide Area */}
        <div className="flex-1 flex flex-col justify-between bg-[#14171E] p-6 md:p-8 relative overflow-hidden">
          {/* Slide Header */}
          <div className="border-b border-slate-800 pb-3 flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#F37021] uppercase tracking-widest block font-mono">
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
              <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-[#F37021] animate-ping' : 'bg-slate-600'}`} />
              <span className="text-[10px] font-mono text-slate-400">
                {isSpeaking ? 'TTS Narrator Playing...' : 'Audio Ready'}
              </span>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="my-auto py-6">
            {/* TYPE 1: COVER SLIDE */}
            {currentSlide.type === 'cover' && (
              <div className="space-y-6 text-center max-w-2xl mx-auto">
                <div className="inline-block px-3 py-1 bg-[#F37021]/10 border border-[#F37021]/30 rounded-full text-xs font-bold text-[#F37021]">
                  {currentSlide.content.tagline}
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                  Autonomous Mobile Robots (AMRs) & GreyMatter™
                </h1>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentSlide.content.lead}
                </p>

                <div className="p-4 bg-[#1F232D] border border-[#F37021]/40 rounded-2xl max-w-md mx-auto text-left flex items-center gap-3 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#F37021] flex items-center justify-center font-bold text-white text-sm shadow">
                    TK
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#F37021] tracking-wider">Candidate & Author</span>
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
                  <div key={i} className="p-3.5 bg-[#1F232D] rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#F37021]">Module {c.num}</span>
                    <h4 className="text-xs font-bold text-white">{c.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE 3: TWO-COLUMN CARDS */}
            {currentSlide.type === 'two-col' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#1F232D] rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-[#F37021] uppercase tracking-wider">{currentSlide.content.col1Title}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSlide.content.col1Items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#F37021] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-[#1F232D] rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">{currentSlide.content.col2Title}</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSlide.content.col2Items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
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
                  { title: currentSlide.content.col1Title, items: currentSlide.content.col1Items, color: 'text-[#F37021]' },
                  { title: currentSlide.content.col2Title, items: currentSlide.content.col2Items, color: 'text-sky-400' },
                  { title: currentSlide.content.col3Title, items: currentSlide.content.col3Items, color: 'text-emerald-400' },
                ].map((col, i) => (
                  <div key={i} className="p-3.5 bg-[#1F232D] rounded-xl border border-slate-800 space-y-2">
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
          </div>

          {/* Voiceover Script Subtitle Banner */}
          <div className="bg-[#1F232D] border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <Volume2 className="w-4 h-4 text-[#F37021] shrink-0" />
              <p className="text-slate-300 italic truncate font-sans">
                "{currentSlide.voiceover}"
              </p>
            </div>
            <button
              onClick={handleTogglePlay}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                isPlaying ? 'bg-amber-600 text-white' : 'bg-[#F37021] hover:bg-orange-500 text-white'
              }`}
            >
              {isPlaying ? 'Pause' : 'Play Narration'}
            </button>
          </div>

          {/* Bottom Player Controls */}
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
                className="p-2 rounded-xl bg-[#F37021] hover:bg-orange-500 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentSlideIndex === slides.length - 1}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Seekbar */}
            <div className="flex-1 max-w-md mx-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#F37021] to-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
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

      {/* Storyline Notes & LTEM Specs Drawer */}
      {showNotes && (
        <div className="bg-[#1F232D] border border-[#F37021]/30 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-[#F37021] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Articulate Storyline 360 Specs & LTEM Evaluation (Slide {currentSlideIndex + 1})
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">SCORM 2004 / xAPI Courseplay Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#14171E] rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Interactive Triggers:</span>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.triggers}</p>
            </div>

            <div className="p-3 bg-[#14171E] rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Storyline Variables:</span>
              <p className="text-sky-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.variables}</p>
            </div>

            <div className="p-3 bg-[#14171E] rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Slide Layers:</span>
              <p className="text-purple-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.layers}</p>
            </div>

            <div className="p-3 bg-[#14171E] rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-[#F37021] block">LTEM / Kirkpatrick:</span>
              <p className="text-amber-300 leading-relaxed font-mono text-[11px]">{currentSlide.storylineNotes.pedagogy}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
