import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_greyorange_deck():
    prs = Presentation()
    # 16:9 Widescreen standard for Articulate Storyline 360
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # GreyOrange Official Brand Color Palette
    GO_ORANGE = RGBColor(243, 112, 33)   # Signature GreyOrange Orange (#F37021)
    GO_ORANGE_LIGHT = RGBColor(255, 140, 66)
    GO_DARK_GREY = RGBColor(26, 29, 36)  # Deep Charcoal (#1A1D24)
    GO_SLATE_GREY = RGBColor(44, 48, 59) # Industrial Card Slate (#2C303B)
    GO_BORDER = RGBColor(60, 66, 80)     # Panel Outline (#3C4250)
    GO_ACCENT_BLUE = RGBColor(56, 189, 248) # Telemetry Cyan/Blue
    GO_SUCCESS_GREEN = RGBColor(34, 197, 94)
    GO_ALERT_RED = RGBColor(239, 68, 68)
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(170, 178, 192)

    def add_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = GO_DARK_GREY
        bg.line.color.rgb = GO_DARK_GREY
        return bg

    def add_header(slide, title_text, category_text="GREYORANGE ENTERPRISE ROBOTICS TRAINING SYSTEM"):
        # Brand Tag & Category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = f"GREYORANGE AUTOMATION | {category_text.upper()}"
        p_cat.font.name = "Arial"
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = GO_ORANGE

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

        # Orange Accent Divider
        div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(0.03))
        div.fill.solid()
        div.fill.fore_color.rgb = GO_ORANGE
        div.line.color.rgb = GO_ORANGE

    def add_card(slide, left, top, width, height, title, items, badge="", accent_color=GO_ORANGE):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = GO_SLATE_GREY
        card.line.color.rgb = GO_BORDER
        card.line.width = Pt(1)

        # Accent top bar
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

    def add_storyline_notes(slide, scene_id, triggers, variables, audio_script, ltem_layer):
        notes_slide = slide.notes_slide
        tf = notes_slide.notes_text_frame
        tf.text = (
            f"=== ARTICULATE STORYLINE 360 ENTERPRISE SPECIFICATION (GREYORANGE) ===\n"
            f"SCENE / SLIDE ID: {scene_id}\n\n"
            f"INSTRUCTIONAL DESIGN & LTEM TIER:\n{ltem_layer}\n\n"
            f"STORYLINE PROJECT VARIABLES:\n{variables}\n\n"
            f"INTERACTIVE TRIGGERS & ACTIONS:\n{triggers}\n\n"
            f"AUDIO NARRATION SCRIPT (VOICEOVER / TTS):\n\"{audio_script}\"\n\n"
            f"LMS COMPLIANCE: SCORM 2004 4th Edition / xAPI (Courseplay & Enterprise LMS Ready)\n"
            f"DEVELOPED BY: Toshit Kumar | Senior Training Content Creator Portfolio"
        )

    # ==========================================
    # SLIDE 1: COVER SLIDE (Scene 1 - Slide 1.1)
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1)

    # Orange Brand Edge Bar
    dec = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.4), Inches(7.5))
    dec.fill.solid()
    dec.fill.fore_color.rgb = GO_ORANGE
    dec.line.color.rgb = GO_ORANGE

    tbox = s1.shapes.add_textbox(Inches(1.2), Inches(1.3), Inches(11.0), Inches(2.6))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p_badge = tf1.paragraphs[0]
    p_badge.text = "GREYORANGE ENTERPRISE ROBOTICS E-LEARNING CERTIFICATION PROGRAM"
    p_badge.font.name = "Arial"
    p_badge.font.size = Pt(12)
    p_badge.font.bold = True
    p_badge.font.color.rgb = GO_ORANGE
    p_badge.space_after = Pt(8)

    p_main = tf1.add_paragraph()
    p_main.text = "Autonomous Mobile Robots (AMRs) &\nGreyMatter™ Orchestration Masterclass"
    p_main.font.name = "Arial"
    p_main.font.size = Pt(34)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_WHITE

    p_sub = tf1.add_paragraph()
    p_sub.text = "Comprehensive Role-Based Operations, Safety Compliance, Maintenance SOPs & Kirkpatrick/LTEM Framework"
    p_sub.font.name = "Arial"
    p_sub.font.size = Pt(14)
    p_sub.font.color.rgb = TEXT_MUTED
    p_sub.space_before = Pt(8)

    # Author Credentials Card
    auth_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(4.3), Inches(9.5), Inches(2.2))
    auth_card.fill.solid()
    auth_card.fill.fore_color.rgb = GO_SLATE_GREY
    auth_card.line.color.rgb = GO_ORANGE
    auth_card.line.width = Pt(1.5)

    atb = s1.shapes.add_textbox(Inches(1.5), Inches(4.5), Inches(9.0), Inches(1.8))
    atf = atb.text_frame
    atf.word_wrap = True

    ap1 = atf.paragraphs[0]
    ap1.text = "DESIGNED & AUTHORED FOR GREYORANGE SENIOR TRAINING CONTENT CREATOR ROLE:"
    ap1.font.name = "Arial"
    ap1.font.size = Pt(9.5)
    ap1.font.bold = True
    ap1.font.color.rgb = GO_ORANGE

    ap2 = atf.add_paragraph()
    ap2.text = "Toshit Kumar"
    ap2.font.name = "Arial"
    ap2.font.size = Pt(20)
    ap2.font.bold = True
    ap2.font.color.rgb = TEXT_WHITE
    ap2.space_before = Pt(2)

    ap3 = atf.add_paragraph()
    ap3.text = "Expertise: Articulate 360 (Storyline/Rise), AMR Warehouse Automation, GreyMatter WES/FMS, Kirkpatrick & LTEM Frameworks"
    ap3.font.name = "Arial"
    ap3.font.size = Pt(10.5)
    ap3.font.color.rgb = TEXT_MUTED

    add_storyline_notes(
        s1,
        "Scene 1 - Slide 1.1: GreyOrange Enterprise Welcome",
        "Trigger: When timeline starts -> Play voiceover track 'VO_Intro_GreyOrange'; Set variable v_CourseProgress = 0.",
        "v_CourseProgress (Number: 0), v_LearnerRole (Text: 'Unassigned'), v_LMS_Platform (Text: 'Courseplay')",
        "Welcome to the GreyOrange Autonomous Mobile Robots and GreyMatter Orchestration Masterclass, developed by Toshit Kumar. This training program enables customers, deployment engineers, warehouse supervisors, and maintenance technicians to safely operate and master automated fulfillment ecosystems.",
        "LTEM Tier 1 (Attendance) & Tier 2 (Activity): Tracks course enrollment and active learner engagement via SCORM 2004."
    )

    # ==========================================
    # SLIDE 2: PROGRAM BLUEPRINT & ROLE MATRIX
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2)
    add_header(s2, "Training Program Blueprint: 6 Role-Based Modules", "CURRICULUM ARCHITECTURE")

    modules_go = [
        ("Mod 01: Ecosystem Overview", ["GreyOrange fulfillment architecture", "AMRs (Ranger Series) vs Legacy AGVs", "GreyMatter™ AI robotic orchestration", "Warehouse Execution Systems (WES)"], GO_ORANGE),
        ("Mod 02: Hardware Anatomy", ["LiDAR scanner navigation (SLAM)", "3D Time-of-Flight (ToF) obstacle sensors", "Drive train, steer motors, lift jacks", "Lithium battery & opportunity charging"], GO_ACCENT_BLUE),
        ("Mod 03: GreyMatter AI Engine", ["Dynamic traffic routing & congestion bypass", "Order batching & robotic task allocation", "Real-time fleet telemetry & status maps", "WMS & ERP enterprise integration"], GO_SUCCESS_GREEN),
        ("Mod 04: Role-Based Operations", ["SOP: Pick/Put-to-Light workstation workflows", "Supervisor fleet dashboard monitoring", "E-Stop release & incident escalation", "Shift handover & KPI tracking"], GO_ORANGE),
        ("Mod 05: Maintenance & SOPs", ["Daily, weekly, and 250-hour PM schedules", "LiDAR optical window cleaning protocol", "Drive wheel tire inspection & wear limits", "Battery health diagnostics & calibration"], GO_ALERT_RED),
        ("Mod 06: Evaluation & Pedagogy", ["Kirkpatrick 4 Levels of Evaluation", "LTEM 8-Tier transfer metrics", "LMS SCORM/xAPI packaging (Courseplay)", "Support ticket error-reduction analytics"], GO_ORANGE),
    ]

    for idx, (m_title, m_items, m_color) in enumerate(modules_go):
        col = idx % 3
        row = idx // 3
        left = 0.8 + col * 4.0
        top = 1.8 + row * 2.6
        add_card(s2, left, top, 3.75, 2.4, m_title, m_items, badge=f"Module 0{idx + 1}", accent_color=m_color)

    add_storyline_notes(
        s2,
        "Scene 1 - Slide 1.2: Role-Based Curriculum Navigation",
        "Trigger: Clicking any module card routes learner to the targeted technical scene; updates variable v_ActiveModule.",
        "v_ActiveModule (Text: 'Mod1' to 'Mod6')",
        "Our modular training architecture is structured to support every stakeholder in modern fulfillment centers—from floor operators to senior operations directors.",
        "LTEM Tier 3 (Learner Perception): Pre-assessment survey evaluates role alignment and perceived relevance."
    )

    # ==========================================
    # SLIDE 3: MODULE 1 - GREYORANGE ECOSYSTEM
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3)
    add_header(s3, "Module 01: GreyOrange Automation Ecosystem", "AMRs, ORCHESTRATION & WES INTEGRATION")

    add_card(s3, 0.8, 1.8, 5.7, 5.0, "Autonomous Mobile Robots (AMRs) vs AGVs", [
        "Dynamic Navigation: Unlike legacy AGVs that rely on magnetic floor tape or fixed optical lines, GreyOrange AMRs utilize natural feature navigation via LiDAR-based SLAM (Simultaneous Localization and Mapping).",
        "Autonomous Obstacle Avoidance: If a forklift or human steps into an AMR transit corridor, the robot dynamically computes a real-time detour rather than halting the entire production line.",
        "Payload & Modular Attachments: Ranger series AMRs carry Mobile Storage Units (MSUs), pallets, or integrated tote conveyors up to 1,600 kg with millimetric docking precision.",
        "High Fleet Density: Supports hundreds of concurrent robots operating safely within tight distribution center aisles."
    ], badge="Robotic Hardware Fleet", accent_color=GO_ORANGE)

    add_card(s3, 6.8, 1.8, 5.7, 5.0, "GreyMatter™ Robotic Orchestration & WES", [
        "AI Decision Engine: GreyMatter acts as the central brain, continuously analyzing order profiles, SKU velocity (fast-movers vs slow-movers), and picker locations.",
        "Predictive Task Allocation: Intelligently routes AMRs to bring required inventory to ergonomic Goods-to-Person (G2P) pick stations right when the operator needs them.",
        "WMS / ERP Integration: Seamlessly hooks into Manhattan, Blue Yonder, SAP EWM, and proprietary customer WMS platforms via high-throughput REST and WebSocket APIs.",
        "Continuous Telemetry: Streams robot health, motor temperature, battery SOC, and travel speeds to the central operations control center."
    ], badge="GreyMatter™ AI Engine", accent_color=GO_ACCENT_BLUE)

    add_storyline_notes(
        s3,
        "Scene 2 - Slide 2.1: Ecosystem Architecture",
        "Interactive Hotspot: Hovering over GreyMatter logo shows data packet flow between WMS and AMR fleet.",
        "v_EcosystemViewed (Boolean: True)",
        "In Module 1, we establish how GreyOrange Autonomous Mobile Robots pair with the GreyMatter AI orchestration engine to transform high-throughput e-commerce fulfillment centers.",
        "LTEM Tier 4 (Knowledge): Tests understanding of dynamic SLAM navigation versus fixed magnetic track AGVs."
    )

    # ==========================================
    # SLIDE 4: MODULE 2 - AMR SENSORS & SAFETY
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4)
    add_header(s4, "Module 02: AMR Hardware Anatomy & Safety Subsystems", "ROBOT ARCHITECTURE & SENSING SUITE")

    add_card(s4, 0.8, 1.8, 3.75, 5.0, "Navigation & Perception Suite", [
        "Safety LiDAR Scanners: Front and rear dual safety laser scanners providing 360-degree obstacle detection up to 25 meters.",
        "3D Time-of-Flight (ToF) Cameras: Detects overhangs, pallet fork tips, and low-profile debris on the floor.",
        "Downward Optical Barcode Camera: Reads 2D DataMatrix floor grid fiducials for absolute position correction.",
        "Inertial Measurement Unit (IMU): 6-axis gyro/accelerometer tracking angular velocity and wheel slip compensation."
    ], badge="Sensor Telemetry", accent_color=GO_ORANGE)

    add_card(s4, 4.8, 1.8, 3.75, 5.0, "Drive & Lifting Actuation", [
        "Dual Differential Drive: Independent high-torque brushless DC servo drive wheels with precision optical encoders.",
        "Electric Screw Jack Lift: High-load motorized lift mechanism that raises and lowers Mobile Storage Units (MSUs) in < 2.5 seconds.",
        "Electromagnetic Holding Brakes: Automatically engage upon power interruption or E-Stop activation to prevent payload drift.",
        "All-Direction Castor Wheels: Heavy-duty polyurethane stabilizing castors for smooth turning transitions."
    ], badge="Motion & Lifting", accent_color=GO_ACCENT_BLUE)

    add_card(s4, 8.8, 1.8, 3.75, 5.0, "Safety Compliance & E-Stops", [
        "ISO 3691-4 & ANSI/RIA R15.08: Certified industrial mobile robot safety compliance standard.",
        "Safety Exclusion Fields: Configured dynamic safety zones (Warning Zone: slows robot; Protective Stop Zone: halts robot).",
        "Emergency Stop Buttons: Dual mushroom-head E-Stops on chassis cutting actuator power via SIL-3 rated safety relays.",
        "Visual & Audio Status: 360° LED halo perimeter lights and multi-tone audible alert beepers."
    ], badge="ISO Safety Protocols", accent_color=GO_ALERT_RED)

    add_storyline_notes(
        s4,
        "Scene 3 - Slide 3.1: Hardware Anatomy & Sensors",
        "Storyline 3D Viewer Simulation: Clicking on LiDAR rotates AMR 3D model and highlights active safety exclusion zones.",
        "v_SafetyZoneActive (Boolean)",
        "Every GreyOrange AMR integrates industrial-grade safety sensors certified to ISO 3691-4. Notice the dynamic safety fields: as robot velocity increases, the laser warning envelope automatically expands.",
        "LTEM Tier 5 (Decision-Making Competence): Scenario challenge on recognizing warning vs protective stop zone breaches."
    )

    # ==========================================
    # SLIDE 5: MODULE 3 - GREYMATTER FLEET MANAGEMENT
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5)
    add_header(s5, "Module 03: GreyMatter™ Fleet Management & Routing", "AI ORCHESTRATION & TRAFFIC CONTROL")

    add_card(s5, 0.8, 1.8, 5.7, 5.0, "Dynamic Traffic & Congestion Prevention", [
        "Multi-Agent Path Planning (MAPF): Computes collision-free time-space trajectories for hundreds of robots simultaneously.",
        "Dynamic Intersection Prioritization: Assigns right-of-way based on mission urgency (e.g. express outbound orders vs replenishments).",
        "Aisle Congestion Avoidance: If an aisle experiences heavy traffic or temporary human blockage, GreyMatter reroutes following robots via secondary arterial corridors.",
        "Deadlock Resolution: Autonomous algorithms detect and resolve head-to-head gridlocks without operator intervention."
    ], badge="Traffic Management", accent_color=GO_ORANGE)

    add_card(s5, 6.8, 1.8, 5.7, 5.0, "Opportunity Charging & Fleet Utilization", [
        "Intelligent Battery Management: Lithium-ion battery packs monitored for cell voltage, temperature, and State-of-Charge (SOC).",
        "Autonomous Opportunity Charging: AMRs autonomously dock into high-amperage floor contact charge plates during micro-breaks (idle periods between pick waves).",
        "Fast 30-Minute Charge: 15-minute quick-charge delivers over 3 hours of continuous full-load operational duty.",
        "Predictive Shift Sizing: GreyMatter ensures that robots needed for upcoming peak order spikes remain at > 80% SOC."
    ], badge="Battery & Telemetry", accent_color=GO_SUCCESS_GREEN)

    add_storyline_notes(
        s5,
        "Scene 4 - Slide 4.1: Fleet Management & Routing",
        "Interactive Simulation: Learner drags obstacle onto virtual map; GreyMatter recalculates path dynamically.",
        "v_RerouteTriggered (Boolean)",
        "GreyMatter is not just a dispatcher; it is an intelligent orchestrator. By balancing charge cycles and eliminating corridor bottlenecks, it maintains over 99 percent fleet utilization during peak shifts.",
        "LTEM Tier 6 (Task Competence): Learner performs simulated fleet dispatch and charging scheduling in the authoring tool."
    )

    # ==========================================
    # SLIDE 6: MODULE 4 - WORKSTATION SOPS
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6)
    add_header(s6, "Module 04: Role-Based Standard Operating Procedures (SOPs)", "OPERATOR & SUPERVISOR WORKFLOWS")

    add_card(s6, 0.8, 1.8, 5.7, 5.0, "Goods-to-Person (G2P) Pick Station SOP", [
        "Step 1: Shift Login & Station Calibration: Operator logs into the terminal and performs tactile barcode scanner check.",
        "Step 2: Robotic Rack Arrival: AMR brings Mobile Storage Unit (MSU) and rotates exact target cubby toward operator.",
        "Step 3: Pick-to-Light Guidance: Laser pointer and LED light bar illuminate exact bin and required quantity.",
        "Step 4: Scan Verification: Operator scans item UPC; green confirmation chime sounds on terminal screen.",
        "Step 5: Put Wall Confirmation: Item placed into illuminated order tote; button pressed to dispatch AMR to next queue."
    ], badge="Operator Work Instruction", accent_color=GO_ORANGE)

    add_card(s6, 6.8, 1.8, 5.7, 5.0, "Supervisor Escalation & E-Stop Recovery SOP", [
        "Step 1: Alarm Recognition: Dashboard alerts supervisor of 'E-Stop Triggered on Robot #104' with GPS grid location.",
        "Step 2: Physical Zone Inspection: Inspect robot path for foreign debris, pallet wrap entanglement, or human presence.",
        "Step 3: Mechanical E-Stop Reset: Rotate mushroom E-Stop clockwise to release mechanical latch.",
        "Step 4: Safety Controller Acknowledgment: Hold blue illuminated 'Safety Reset' button for 3 seconds until status LED turns Amber.",
        "Step 5: Software Resume in GreyMatter: Confirm clear perimeter on tablet; click 'Resume Mission'. Robot re-verifies localization and resumes travel."
    ], badge="Supervisor Escalation SOP", accent_color=GO_ALERT_RED)

    add_storyline_notes(
        s6,
        "Scene 5 - Slide 5.1: Workstation & Supervisor SOPs",
        "Step-by-Step Interactive Guide: Learner must click through all 5 steps in exact sequential order to advance.",
        "v_SOP_Completed (Boolean)",
        "Clear SOPs prevent costly warehouse downtime. In this module, operators master rapid pick-to-light workflows, while supervisors practice the strict 5-step safety recovery procedure following an emergency stop.",
        "LTEM Tier 5 & 6 (Competence): Scenario-based simulation verifying error-free execution of the E-Stop recovery SOP."
    )

    # ==========================================
    # SLIDE 7: MODULE 5 - MAINTENANCE & PM SCHEDULES
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7)
    add_header(s7, "Module 05: Preventive Maintenance (PM) & Troubleshooting", "TECHNICAL SERVICES & RELIABILITY")

    add_card(s7, 0.8, 1.8, 3.75, 5.0, "Daily Inspection SOP (Shift 1)", [
        "LiDAR Optical Cleaning: Wipe optical windows with microfiber cloth and 70% isopropyl alcohol; check for scratches.",
        "Fiducial Camera Lens Check: Ensure downward camera lens is free from warehouse dust, grease, or debris.",
        "E-Stop Functionality Test: Depress both E-stops; verify instant motor cut off and dashboard alarm propagation.",
        "Visual Chassis Inspection: Inspect perimeter LED halo and bumper seals for physical impact damage."
    ], badge="Daily PM Protocol", accent_color=GO_ORANGE)

    add_card(s7, 4.8, 1.8, 3.75, 5.0, "Weekly / 250-Hr Maintenance", [
        "Drive Wheel Tread Measurement: Check polyurethane tire wear using depth gauge (minimum limit: 3.5mm tread depth).",
        "Lift Screw Greasing: Apply food-grade / synthetic grease to motorized lead-screw elevating mechanism.",
        "Ground Contact Pad Burnishing: Clean copper opportunity charging shoes with Scotch-Brite pad to remove carbon buildup.",
        "Fiducial Floor Grid Audit: Replace torn or faded DataMatrix QR grid floor tiles in high-traffic zones."
    ], badge="Weekly PM Protocol", accent_color=GO_ACCENT_BLUE)

    add_card(s7, 8.8, 1.8, 3.75, 5.0, "Field Diagnostics & Fault Codes", [
        "Error E-201 (Localization Lost): Robot cannot match LiDAR scan to map -> Clean downward camera; manual jog to nearest fiducial.",
        "Error E-304 (Motor Over-Current): Drive wheel stalled by pallet strapping debris -> Inspect wheel axle and clear debris.",
        "Error E-410 (Charge Contact High Resistance): Opportunity charging aborted -> Clean contact shoes and check charger plate spring tension.",
        "Error E-505 (Safety Field Mismatch): Safety zone corrupted -> Re-upload certified safety configuration file."
    ], badge="Diagnostic Fault Matrix", accent_color=GO_ALERT_RED)

    add_storyline_notes(
        s7,
        "Scene 6 - Slide 6.1: Maintenance & Field Diagnostics",
        "Diagnostic Tree Simulator: Learner is given Error E-201 and must select the proper troubleshooting sequence from the service manual.",
        "v_TroubleshootScore (Number: 0-100)",
        "Proper maintenance directly drives fleet uptime. Technicians must strictly follow daily optical cleaning routines and reference standardized diagnostic fault codes to resolve issues in under five minutes.",
        "LTEM Tier 6 (Task Competence): Technical troubleshooting simulation measuring diagnostic accuracy."
    )

    # ==========================================
    # SLIDE 8: KIRKPATRICK & LTEM EVALUATION
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8)
    add_header(s8, "Module 06: Kirkpatrick 4-Level & LTEM 8-Tier Evaluation", "INSTRUCTIONAL DESIGN & PEDAGOGY")

    add_card(s8, 0.8, 1.8, 5.7, 5.0, "Kirkpatrick’s 4 Levels of Training Evaluation", [
        "Level 1: Reaction: Post-training surveys measuring learner engagement, content clarity, and material relevance (Target: >= 90% positive sentiment).",
        "Level 2: Learning: Objective knowledge and scenario simulation assessments measuring factual and conceptual mastery (Target: >= 80% first-attempt score).",
        "Level 3: Behavior: On-the-floor observation measuring whether operators adhere to SOPs and safety protocols during active warehouse shifts (Target: 95% audit compliance).",
        "Level 4: Results (Business Impact): Direct operational ROI—accelerated customer onboarding time, reduced operator error support tickets, and zero preventable AMR collision incidents."
    ], badge="Kirkpatrick 4 Levels", accent_color=GO_ORANGE)

    add_card(s8, 6.8, 1.8, 5.7, 5.0, "LTEM (Learning Transfer Evaluation Model — 8 Tiers)", [
        "Tier 1 (Attendance) & Tier 2 (Activity): LMS tracking of module completion rates and active time-on-task.",
        "Tier 3 (Learner Perception): Validated feedback assessing task utility and cognitive load.",
        "Tier 4 (Knowledge Retrieval): Objective recall of technical specs, error codes, and safety interlocks.",
        "Tier 5 (Decision-Making Competence): Branching scenario simulations testing judgment in complex edge cases.",
        "Tier 6 (Task Competence): Performance testing in full simulated software environments (e.g. GreyMatter dispatch).",
        "Tier 7 (Transfer) & Tier 8 (Transfer Effects): Measured reduction in warehouse downtime and long-term customer satisfaction."
    ], badge="LTEM 8-Tier Framework", accent_color=GO_SUCCESS_GREEN)

    add_storyline_notes(
        s8,
        "Scene 7 - Slide 7.1: Training Evaluation & ROI Analytics",
        "Interactive Metric Dashboard: Clicking Kirkpatrick Level 4 displays live telemetry charts tracking support ticket reduction.",
        "v_KirkpatrickLevel (Number: 1 to 4)",
        "As a Senior Training Content Creator, measuring training efficacy is mandatory. We employ Kirkpatrick's 4 Levels and Will Thalheimer's 8-Tier Learning Transfer Evaluation Model to prove measurable business impact to customer executive leadership.",
        "LTEM Tier 8 (Transfer Effects): Direct measurement of enterprise-wide operational safety and robot adoption metrics."
    )

    # ==========================================
    # SLIDE 9: LMS ADMINISTRATION & SCORM/XAPI
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9)
    add_header(s9, "LMS Administration, SCORM/xAPI & Release Management", "PLATFORM DELIVERY & GOVERNANCE")

    add_card(s9, 0.8, 1.8, 3.75, 5.0, "LMS & Delivery Platforms", [
        "Courseplay LMS Integration: Automated user enrollment, role-based learning tracks, and completion badge automation.",
        "Custom Enterprise LMS: REST API synchronization with customer proprietary learning portals.",
        "Mobile Offline Delivery: Mobile-responsive responsive publishing via Articulate Rise for floor supervisors on ruggedized tablets."
    ], badge="LMS Ecosystem", accent_color=GO_ORANGE)

    add_card(s9, 4.8, 1.8, 3.75, 5.0, "Packaging Standard Protocols", [
        "SCORM 2004 4th Edition: Advanced sequencing, bookmarking, and multi-SCO progress tracking.",
        "xAPI (Experience API / Tin Can): Rich verb tracking (e.g. 'Operator resolved E-Stop #104 in 14.2s') streaming statements to Learning Record Stores (LRS).",
        "AICC & CMI5: High-security compliance for enterprise logistics partners."
    ], badge="SCORM & xAPI Tracking", accent_color=GO_ACCENT_BLUE)

    add_card(s9, 8.8, 1.8, 3.75, 5.0, "Version Control & Release Cycles", [
        "Software Release Alignment: Updating learning content concurrent with GreyMatter bi-monthly sprint deployments.",
        "Git-Based Content Repository: Strict version tagging (v2.4.0) ensuring obsolete SOPs are automatically archived.",
        "Feedback Loop Analytics: Support ticket trend analysis directly informing quarterly training revisions."
    ], badge="Continuous Optimization", accent_color=GO_SUCCESS_GREEN)

    add_storyline_notes(
        s9,
        "Scene 8 - Slide 8.1: LMS Governance & SCORM/xAPI",
        "Storyline xAPI Trigger: Code block demonstrates sending custom xAPI statement to LRS upon simulation completion.",
        "v_xAPI_StatementSent (Boolean)",
        "Enterprise training requires robust platform delivery. We package all modules adhering to SCORM 2004 and xAPI protocols, enabling granular data logging into platforms like Courseplay.",
        "LTEM Tier 1 & 2: Real-time telemetry monitoring course adoption and user progression."
    )

    # ==========================================
    # SLIDE 10: CONCLUSION & SUCCESS METRICS
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10)
    add_header(s10, "Success Metrics & Enterprise ROI Alignment", "EXECUTIVE SUMMARY")

    add_card(s10, 0.8, 1.8, 5.7, 5.0, "Measurable Success Metrics (Job Spec Alignment)", [
        "Accelerated Time-to-Productivity: Reduces new customer operator onboarding ramp-up time from 14 days down to 4 days.",
        "> 95% LMS Completion & Certification Rates: Interactive branching and scenario simulations maximize learner retention.",
        "40% Reduction in Operational Support Tickets: Clear troubleshooting SOPs empower warehouse staff to resolve minor faults locally.",
        "Zero Preventable Safety Incidents: Strict adherence to ISO 3691-4 safety protocols and exclusion field training.",
        "Timely Release-Aligned Content Delivery: Training updates deploy concurrently with GreyMatter major releases."
    ], badge="Business Impact KPIs", accent_color=GO_ORANGE)

    add_card(s10, 6.8, 1.8, 5.7, 5.0, "Portfolio Credentials & Author Verification", [
        "Role Alignment: Senior Training Content Creator | GreyOrange (Gurugram)",
        "Author & Instructional Engineer: Toshit Kumar",
        "Key Competencies Demonstrated:\n• E-Learning Suite: Articulate Storyline 360, Rise 360, Adobe Captivate\n• Robotics Domain: AMRs, AGVs, GreyMatter FMS, WES, WMS\n• Pedagogy: Kirkpatrick 4 Levels, LTEM 8 Tiers, ADDIE, Bloom's Taxonomy\n• LMS Administration: Courseplay, SCORM 2004, xAPI LRS Integration",
        "Live Interactive Platform: https://toshitkumar.github.io/arduino-robotics-elearning/"
    ], badge="Professional Accreditation", accent_color=GO_ACCENT_BLUE)

    add_storyline_notes(
        s10,
        "Scene 9 - Slide 9.1: Course Completion & ROI Summary",
        "Trigger: Award GreyOrange Certified AMR Operations Specialist Digital Badge via Courseplay API.",
        "v_Certified (Boolean: True)",
        "This masterclass proves the value of professional instructional design in high-stakes warehouse robotics. Designed and engineered by Toshit Kumar to exceed all qualifications for the Senior Training Content Creator role at GreyOrange.",
        "LTEM Tier 7 & 8: Validated behavioral transfer and long-term organizational ROI."
    )

    # Output directory
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public"))
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, "GreyOrange_Robotics_Training_Storyline.pptx")
    prs.save(out_path)
    print(f"GreyOrange Presentation successfully saved to: {out_path} ({os.path.getsize(out_path) / 1024:.1f} KB)")

    # Artifact directory
    artifact_dir = r"C:\Users\Toshit Kumar\.gemini\antigravity\brain\abeafffa-65f7-4ccb-b6ea-3351dba21f4a"
    if os.path.exists(artifact_dir):
        art_path = os.path.join(artifact_dir, "GreyOrange_Robotics_Training_Storyline.pptx")
        prs.save(art_path)
        print(f"Artifact copy saved to: {art_path}")

if __name__ == "__main__":
    create_greyorange_deck()
