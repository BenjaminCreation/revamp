/**
 * Dhandha School · Google Apps Script Web App
 *
 * SETUP (one-time, ~5 minutes):
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file, replacing any existing code
 * 3. Click Save (💾)
 * 4. Click Deploy → New deployment
 *    · Type: Web App
 *    · Execute as: Me
 *    · Who has access: Anyone
 * 5. Click Deploy → Authorise → Allow
 * 6. Copy the Web App URL
 * 7. In your terminal: wrangler secret put SHEETS_WEBHOOK_URL
 *    Then paste the URL when prompted
 *
 * COLUMNS (in order — matches live form exactly):
 * A: Submission ID  | B: Timestamp      | C: Full Name    | D: Age
 * E: Email          | F: WhatsApp       | G: City         | H: Current Role
 * I: Track          | J: What Sold      | K: Time Cut     | L: Background Story
 * M: Why Apply      | N: How Found      | O: Attend Commit| P: Checkpoint Commit
 * Q: Status
 */

const SHEET_NAME = 'Applications';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        'Submission ID',
        'Timestamp',
        'Full Name',
        'Age',
        'Email',
        'WhatsApp',
        'City',
        'Current Role',
        'Track',
        "What You've Sold",
        'Time Cut (10 hrs/week)',
        'Background Story',
        'Why This Cohort?',
        'How Found',
        'Attend Commit',
        'Checkpoint Commit',
        'Status',
      ];
      sheet.appendRow(headers);

      // Style header row to match site colours
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1C1B17');
      headerRange.setFontColor('#F6F4EE');
      headerRange.setFontFamily('Courier New');
      sheet.setFrozenRows(1);

      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    }

    // how_found arrives as a JSON array — flatten to comma-separated string
    let howFoundStr = '';
    if (Array.isArray(data.how_found)) {
      howFoundStr = data.how_found.join(', ');
    } else if (typeof data.how_found === 'string') {
      // already a string (e.g. if stored as JSON in D1 and re-forwarded)
      try {
        const parsed = JSON.parse(data.how_found);
        howFoundStr = Array.isArray(parsed) ? parsed.join(', ') : data.how_found;
      } catch {
        howFoundStr = data.how_found;
      }
    }

    sheet.appendRow([
      data.submission_id     || '',
      data.created_at        || new Date().toISOString(),
      data.full_name         || '',
      data.age               || '',
      data.email             || '',
      data.whatsapp          || '',
      data.city              || '',
      data.current_role      || '',
      data.track             || '',
      data.sold_story        || '',
      data.time_commitment   || '',
      data.background_story  || '',
      data.why_apply         || '',
      howFoundStr,
      data.attend_commit     ? 'Yes' : 'No',
      data.checkpoint_commit ? 'Yes' : 'No',
      'pending',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health-check: open the Web App URL in your browser to confirm it's live
function doGet() {
  return ContentService
    .createTextOutput(
      JSON.stringify({ ok: true, service: 'Dhandha School · Sheets Webhook v2' })
    )
    .setMimeType(ContentService.MimeType.JSON);
}
