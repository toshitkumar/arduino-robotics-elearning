import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COURSE_INFO, MODULES, CAPSTONE_PROJECT } from '../data/courseData';
import { SCENARIOS } from '../data/scenariosData';
import { QUIZZES } from '../data/quizData';

export function generateCoursePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper to add watermark, header, footer
  function addPageDecorations(docInstance, pageNum, totalPages) {
    // Watermark (subtle diagonal)
    docInstance.saveGraphicsState();
    docInstance.setTextColor(220, 225, 235);
    docInstance.setFontSize(36);
    docInstance.setFont('helvetica', 'bold');
    docInstance.text('Created by Toshit Kumar', pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45,
    });
    docInstance.restoreGraphicsState();

    // Top Header
    docInstance.setFontSize(8);
    docInstance.setTextColor(100, 116, 139);
    docInstance.setFont('helvetica', 'normal');
    docInstance.text('Arduino Robotics & Flood-Safe Smart House | Toshit Kumar', 14, 10);
    docInstance.setDrawColor(226, 232, 240);
    docInstance.setLineWidth(0.3);
    docInstance.line(14, 12, pageWidth - 14, 12);

    // Bottom Footer
    docInstance.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);
    docInstance.text('STEM Robotics E-Learning Curriculum - Developed by Toshit Kumar', 14, pageHeight - 8);
    docInstance.text(`Page ${pageNum}`, pageWidth - 14, pageHeight - 8, { align: 'right' });
  }

  // --- COVER PAGE ---
  doc.setFillColor(11, 15, 25); // Dark navy
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Accent band
  doc.setFillColor(37, 99, 235); // Electric Blue
  doc.rect(0, 0, 8, pageHeight, 'F');

  // Title Box
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('ARDUINO ROBOTICS &', 24, 60);
  doc.setTextColor(56, 189, 248); // Cyan
  doc.text('FLOOD-SAFE SMART HOUSE', 24, 72);

  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('Automatic House Lifting System Using Arduino UNO', 24, 84);

  // Decorative Rule
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(1);
  doc.line(24, 92, 140, 92);

  // Course Overview block
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  const overviewLines = doc.splitTextToSize(
    'A complete interactive STEM robotics and embedded systems curriculum covering microcontrollers, closed-loop servo actuation, L298N H-bridge motor drivers, ultrasonic time-of-flight acoustic ranging, precipitation telemetry, and an automated mechatronic flood protection architecture.',
    160
  );
  doc.text(overviewLines, 24, 105);

  // Author & Credentials Box
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(24, 150, 160, 55, 3, 3, 'F');
  doc.setDrawColor(59, 130, 246);
  doc.roundedRect(24, 150, 160, 55, 3, 3, 'S');

  doc.setTextColor(59, 130, 246);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('AUTHOR & PROJECT DESIGNER:', 32, 162);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Toshit Kumar', 32, 172);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Lead Robotics Engineer, Instructional Designer & Full-Stack Developer', 32, 180);
  doc.text('STEM Robotics Education & Mechatronic Systems Architecture', 32, 186);
  doc.text('Document Version: 2.4 | Academic & Laboratory Edition', 32, 194);

  // Subtle Watermark on cover
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Created by Toshit Kumar', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // --- PAGE 2: TABLE OF CONTENTS & SYSTEM OVERVIEW ---
  doc.addPage();
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Table of Contents', 14, 25);

  const tocData = [
    ['01', 'Module 01: Introduction to Arduino UNO Architecture & First Sketch', '3'],
    ['02', 'Module 02: Servo Motor (SG90) Closed-Loop PWM Actuation', '4'],
    ['03', 'Module 03: Motor Driver (L298N Dual H-Bridge) & High-Torque Lifting', '5'],
    ['04', 'Module 04: HC-SR04 Ultrasonic Acoustic Time-of-Flight Telemetry', '6'],
    ['05', 'Module 05: Rain Sensor Module (FC-37) & Corrosion Prevention', '7'],
    ['06', 'Capstone Project: Flood-Safe Smart House Overview & Safety Rules', '8'],
    ['07', 'Capstone Project: Bill of Materials & Complete Connection Table', '9'],
    ['08', 'Capstone Project: Full Production Arduino Source Code', '10'],
    ['09', 'Scenario-Based Engineering Challenges & Decision Matrix', '11'],
    ['10', 'Comprehensive Assessment Key & Troubleshooting Guide', '12'],
  ];

  autoTable(doc, {
    startY: 32,
    head: [['Section', 'Curriculum Topic & Engineering Specification', 'Page']],
    body: tocData,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 18 }, 2: { cellWidth: 15, halign: 'center' } },
  });

  // --- MODULE PAGES ---
  MODULES.forEach((mod) => {
    doc.addPage();
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Module ${mod.num}: ${mod.title}`, 14, 24);

    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.setFont('helvetica', 'italic');
    doc.text(mod.tagline, 14, 30);

    let currentY = 38;

    mod.topics.forEach((topic) => {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 24;
      }
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text(topic.title, 14, currentY);
      currentY += 5;

      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(topic.content, 180);
      doc.text(lines, 14, currentY);
      currentY += lines.length * 4.2 + 6;
    });

    if (mod.pinTable && mod.pinTable.length > 0) {
      if (currentY > pageHeight - 60) {
        doc.addPage();
        currentY = 24;
      }
      autoTable(doc, {
        startY: currentY,
        head: [['Pin / Terminal', 'Signal Type', 'Functional Engineering Description']],
        body: mod.pinTable.map((p) => [p.pin, p.type, p.desc]),
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42], fontSize: 8 },
        styles: { fontSize: 8, cellPadding: 2.5 },
      });
      currentY = doc.lastAutoTable.finalY + 8;
    }
  });

  // --- CAPSTONE PROJECT SECTION ---
  doc.addPage();
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CAPSTONE PROJECT: FLOOD-SAFE SMART HOUSE', 14, 24);

  doc.setFontSize(10);
  doc.setTextColor(59, 130, 246);
  doc.text('Automatic House Lifting System Using Arduino UNO | Designed by Toshit Kumar', 14, 30);

  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  const capOverview = doc.splitTextToSize(CAPSTONE_PROJECT.overview, 180);
  doc.text(capOverview, 14, 38);

  let capY = 38 + capOverview.length * 4.5 + 4;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28); // Alert Red
  doc.text('Mandatory Safety Engineering Rules:', 14, capY);
  capY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  CAPSTONE_PROJECT.safetyEngineeringRules.forEach((rule, idx) => {
    const ruleLines = doc.splitTextToSize(`${idx + 1}. ${rule}`, 175);
    doc.text(ruleLines, 16, capY);
    capY += ruleLines.length * 4.2 + 2;
  });

  // BOM Table
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill of Materials (BOM) & Hardware Specifications', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['Component', 'Qty', 'Engineering Role in Flood-Safe House']],
    body: CAPSTONE_PROJECT.bom.map((b) => [b.item, b.qty.toString(), b.purpose]),
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], fontSize: 8 },
    styles: { fontSize: 8, cellPadding: 2.5 },
  });

  // Pin Connections Table
  doc.text('Complete Circuit Connection Matrix', 14, doc.lastAutoTable.finalY + 10);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 14,
    head: [['Hardware Module', 'Module Pin', 'Arduino UNO Pin', 'Operational Function / Protection']],
    body: CAPSTONE_PROJECT.pinConnectionTable.map((p) => [p.component, p.compPin, p.arduinoPin, p.note]),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], fontSize: 8 },
    styles: { fontSize: 7.5, cellPadding: 2 },
  });

  // Source Code Page
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Full Arduino Production Source Code', 14, 24);

  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('courier', 'normal');
  const codeLines = doc.splitTextToSize(CAPSTONE_PROJECT.arduinoSourceCode, 180);
  
  // Print code with page splits
  let printY = 30;
  for (let i = 0; i < codeLines.length; i++) {
    if (printY > pageHeight - 20) {
      doc.addPage();
      printY = 24;
    }
    doc.text(codeLines[i], 14, printY);
    printY += 3.5;
  }

  // Scenarios Page
  doc.addPage();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('Scenario-Based Decision Exercises & Engineering Matrix', 14, 24);

  let scY = 32;
  SCENARIOS.forEach((sc) => {
    if (scY > pageHeight - 50) {
      doc.addPage();
      scY = 24;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sc.num}: ${sc.title}`, 14, scY);
    scY += 5;

    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    const ctxLines = doc.splitTextToSize(`Context: ${sc.context}`, 180);
    doc.text(ctxLines, 14, scY);
    scY += ctxLines.length * 3.8 + 2;

    const correctOpt = sc.options.find((o) => o.correct);
    doc.setTextColor(22, 101, 52); // Green
    doc.setFont('helvetica', 'bold');
    doc.text(`Optimal Protocol: ${correctOpt?.text}`, 14, scY);
    scY += 5;

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'italic');
    const expLines = doc.splitTextToSize(`Rationale: ${sc.engineeringExplanation}`, 180);
    doc.text(expLines, 14, scY);
    scY += expLines.length * 3.8 + 6;
  });

  // Troubleshooting & Key Page
  doc.addPage();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('Troubleshooting & Diagnostics Reference', 14, 24);

  autoTable(doc, {
    startY: 30,
    head: [['Fault Symptom', 'Probable Root Cause', 'Field Remedy & Rectification']],
    body: CAPSTONE_PROJECT.troubleshootingGuide.map((t) => [t.symptom, t.cause, t.remedy]),
    theme: 'grid',
    headStyles: { fillColor: [185, 28, 28], fontSize: 8 },
    styles: { fontSize: 8, cellPadding: 3 },
  });

  // Final Certification Note
  const lastY = doc.lastAutoTable.finalY + 12;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, lastY, 182, 35, 3, 3, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Curriculum Accreditation & Author Verification', 20, lastY + 8);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('This documentation is prepared as part of the STEM Robotics Learning Curriculum.', 20, lastY + 16);
  doc.text('Author & Lead Instructional Designer: Toshit Kumar', 20, lastY + 22);
  doc.text('Published for interactive classroom training, robotics laboratories, and self-paced study.', 20, lastY + 28);

  // Apply decorations (header, footer, watermark) to pages 2..N
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    addPageDecorations(doc, p, totalPages);
  }

  // Save the PDF
  doc.save('Arduino_Robotics_Flood_Safe_Smart_House_Guide.pdf');
}
