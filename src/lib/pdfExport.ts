import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TeamLeaderboardEntry, EventConfig } from '../types';

export function exportLeaderboardPDF(
  entries: TeamLeaderboardEntry[],
  eventConfig: EventConfig,
  logoSrc?: string
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Dark chocolate / maroon theme background header
  doc.setFillColor(22, 12, 14); // #160c0e
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Electric purple and orange cyber accent bar
  doc.setFillColor(157, 78, 221); // #9d4edd Electric Purple
  doc.rect(0, 42, pageWidth * 0.5, 2.5, 'F');
  doc.setFillColor(255, 107, 0); // #ff6b00 Vibrant Orange
  doc.rect(pageWidth * 0.5, 42, pageWidth * 0.5, 2.5, 'F');

  // Gold indicator strip
  doc.setFillColor(255, 209, 102); // #ffd166 Gold
  doc.rect(0, 44.5, 18, 1, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('BVB EVALUATION', 14, 18);

  doc.setTextColor(255, 133, 0); // Vibrant orange
  doc.setFontSize(11);
  doc.text('BUILD vs BREAK // OFFICIAL HACKATHON LEADERBOARD', 14, 26);

  doc.setTextColor(180, 160, 180);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleString();
  doc.text(`Official Standing Report • Generated: ${dateStr}`, 14, 34);

  // Top Summary Metrics on right side
  doc.setTextColor(255, 209, 102); // Gold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Min. Required Judges: ${eventConfig.minRequiredJudges}`, pageWidth - 14, 18, { align: 'right' });
  doc.setTextColor(230, 230, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Total Ranked Teams: ${entries.length} | 15 Problem Statements`, pageWidth - 14, 26, { align: 'right' });
  doc.text(`Evaluation Standard: 5 Criteria (Max 25 pts)`, pageWidth - 14, 34, { align: 'right' });

  // Prepare table data with Lab and Role
  const tableRows = entries.map(entry => [
    entry.rank === 1 ? '★ #1' : `#${entry.rank}`,
    entry.teamName,
    entry.teamRole || '—',
    entry.problemStatementId,
    entry.lab || '—',
    `${entry.evaluationsCount}/${entry.requiredEvaluations}`,
    entry.isComplete ? 'Complete' : `Pending (${entry.evaluationsCount}/${entry.requiredEvaluations})`,
    entry.evaluationsCount > 0 ? `${entry.averageScore.toFixed(2)} / 25` : '—',
    entry.evaluationsCount > 0 ? `${entry.percentage.toFixed(2)}%` : '—'
  ]);

  // Generate AutoTable
  autoTable(doc, {
    startY: 52,
    head: [['Rank', 'Team Name', 'Role', 'PS', 'Lab', 'Judges', 'Status', 'Avg Score', 'Percentage']],
    body: tableRows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.5,
      lineColor: [230, 220, 230],
      lineWidth: 0.15,
      textColor: [30, 20, 25]
    },
    headStyles: {
      fillColor: [24, 13, 16], // Dark chocolate
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      lineColor: [157, 78, 221], // Purple border
      lineWidth: 0.3
    },
    columnStyles: {
      0: { halign: 'center', fontStyle: 'bold', cellWidth: 14 },
      1: { fontStyle: 'bold' },
      2: { halign: 'center', cellWidth: 18 },
      3: { halign: 'center', fontStyle: 'bold', cellWidth: 16, textColor: [157, 78, 221] },
      4: { halign: 'center', fontStyle: 'bold', cellWidth: 18, textColor: [255, 107, 0] },
      5: { halign: 'center', cellWidth: 18 },
      6: { halign: 'center', cellWidth: 24 },
      7: { halign: 'right', fontStyle: 'bold', cellWidth: 22 },
      8: { halign: 'right', fontStyle: 'bold', cellWidth: 20, textColor: [220, 90, 0] }
    },
    alternateRowStyles: {
      fillColor: [250, 246, 248]
    },
    didParseCell: (data) => {
      // Highlight Top 3
      if (data.section === 'body') {
        const rowIndex = data.row.index;
        if (rowIndex === 0) {
          data.cell.styles.fillColor = [255, 248, 230]; // Soft gold
          if (data.column.index === 0) {
            data.cell.styles.textColor = [190, 120, 0];
          }
        } else if (rowIndex === 1) {
          data.cell.styles.fillColor = [246, 242, 250]; // Soft purple
        } else if (rowIndex === 2) {
          data.cell.styles.fillColor = [255, 242, 235]; // Soft orange
        }
      }
    },
    didDrawPage: (data) => {
      // Footer on every page
      const footerY = pageHeight - 8;
      doc.setFillColor(22, 12, 14);
      doc.rect(0, footerY - 4, pageWidth, 12, 'F');
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 160, 180);
      doc.text('BVB EVALUATION // BUILD vs BREAK HACKATHON • CONFIDENTIAL EVENT RECORDS', 14, footerY + 2);
      
      const pageNumStr = `Page ${doc.getNumberOfPages()}`;
      doc.text(pageNumStr, pageWidth - 14, footerY + 2, { align: 'right' });
    }
  });

  // Save/Download the PDF directly
  const filename = `BvB_Evaluation_Leaderboard_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
