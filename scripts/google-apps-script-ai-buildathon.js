/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO AI BUILDATHON 2026
 * - TAB 1: Đăng ký đội thi & Cá nhân (Đăng ký AI Buildathon 2026)
 * - TAB 2: Nộp bài Vòng 1 Solution Proposal (Vòng 1 - Nộp bài (Proposal))
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT / CẬP NHẬT:
 * 1. Mở file Google Sheets đang dùng trên Google Drive.
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) > Apps Script.
 * 3. Dán toàn bộ nội dung file này thay thế mã cũ trong file Code.gs.
 * 4. Nhấn nút "Lưu" (Ctrl + S / Cmd + S).
 * 5. Nhấn nút "Triển khai" (Deploy) > "Quản lý bản triển khai" (Manage deployments)
 *    > Nhấn biểu tượng Bút chì (Edit) > Chọn Phiên bản: "Phiên bản mới" (New version) > Nhấn "Triển khai" (Deploy).
 * =========================================================================
 */

// Tên 2 Sheet trong cùng file Google Spreadsheet
var REGISTRATION_SHEET_NAME = "Đăng ký AI Buildathon 2026";
var PHASE1_SHEET_NAME = "Vòng 1 - Nộp bài (Proposal)";

// ID Google Sheet (Để trống nếu mở Apps Script trực tiếp từ file Google Sheets)
var SPREADSHEET_ID = "";

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Không tìm thấy bảng tính liên kết. Vui lòng điền SPREADSHEET_ID nếu dùng script độc lập.");
  }
  return ss;
}

// -------------------------------------------------------------------------
// CẤU TRÚC TAB 1: ĐĂNG KÝ
// -------------------------------------------------------------------------
var REG_HEADERS = [
  "STT",
  "Thời gian đăng ký",
  "Mã đăng ký",
  "Tên đội thi",
  "Số lượng thành viên",
  "Giảng viên / Mentor",
  "Trưởng nhóm - Họ và tên",
  "Trưởng nhóm - MSSV",
  "Trưởng nhóm - Email",
  "Trưởng nhóm - SĐT",
  "Lớp / Ngành / Kỳ học",
  "Thành viên 2 - Họ tên",
  "Thành viên 2 - MSSV",
  "Thành viên 3 - Họ tên",
  "Thành viên 3 - MSSV",
  "Thành viên 4 - Họ tên",
  "Thành viên 4 - MSSV",
  "Trạng thái xác nhận"
];

var REG_COLUMN_WIDTHS = [
  60, 175, 165, 210, 160, 240, 220, 140, 250, 140, 300, 200, 135, 200, 135, 200, 135, 170
];

// -------------------------------------------------------------------------
// CẤU TRÚC TAB 2: NỘP BÀI VÒNG 1 (SOLUTION PROPOSAL)
// -------------------------------------------------------------------------
var PHASE1_HEADERS = [
  "STT",
  "Thời gian nộp lần đầu",
  "Thời gian cập nhật cuối",
  "Mã đăng ký",
  "Tên đội thi / Thí sinh",
  "Hình thức",
  "Họ và tên Trưởng nhóm / Thí sinh",
  "MSSV Trưởng nhóm",
  "Email Trưởng nhóm",
  "Số điện thoại",
  "Giảng viên / Mentor",
  "Tên đề tài / Pain Point HR",
  "Link Pitch Deck (Slide)",
  "Link Video thuyết trình",
  "Mô tả tóm tắt giải pháp",
  "Số lần nộp",
  "Trạng thái hồ sơ",
  "Điểm / Ghi chú của BGK"
];

var PHASE1_COLUMN_WIDTHS = [
  60,  // 1: STT
  175, // 2: Nộp lần đầu
  175, // 3: Cập nhật cuối
  165, // 4: Mã đăng ký
  210, // 5: Tên đội thi
  130, // 6: Hình thức
  220, // 7: Trưởng nhóm
  140, // 8: MSSV
  250, // 9: Email
  140, // 10: SĐT
  240, // 11: Mentor
  260, // 12: Tên đề tài
  280, // 13: Link Pitch Deck
  280, // 14: Link Video
  350, // 15: Mô tả tóm tắt
  110, // 16: Số lần nộp
  160, // 17: Trạng thái
  200  // 18: Ghi chú BGK
];

/**
 * Xử lý yêu cầu HTTP POST từ Frontend
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Hệ thống đang xử lý nhiều yêu cầu, vui lòng thử lại sau giây lát." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = getSpreadsheet();
    var rawData = e.postData.contents;
    var data;
    try {
      data = JSON.parse(rawData);
    } catch (parseErr) {
      data = e.parameter;
    }

    if (data.isTest) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "Kết nối Google Apps Script Web App thành công! Sẵn sàng nhận đăng ký và bài nộp Vòng 1."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ĐIỀU PHỐI THEO ACTION
    if (data.action === "verifyTeam") {
      var verifyResult = handleVerifyTeam(ss, data);
      return ContentService
        .createTextOutput(JSON.stringify(verifyResult))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === "submitPhase1") {
      var submitResult = handleSubmitPhase1(ss, data);
      return ContentService
        .createTextOutput(JSON.stringify(submitResult))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // MẶC ĐỊNH: ĐĂNG KÝ MỚI (TAB 1)
    var regResult = handleStudentRegistration(ss, data);
    return ContentService
      .createTextOutput(JSON.stringify(regResult))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: "Lỗi ghi dữ liệu: " + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý HTTP GET (cho phép kiểm tra webhook hoặc xác thực qua GET không bị CORS preflight)
 */
function doGet(e) {
  if (e.parameter && e.parameter.action === "verifyTeam") {
    try {
      var ss = getSpreadsheet();
      var result = handleVerifyTeam(ss, e.parameter);
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Webhook Google Sheets cho AI Buildathon 2026 đang hoạt động bình thường!",
      timestamp: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss")
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 1. Xử lý ghi nhận Đăng ký sinh viên vào Tab 1
 */
function handleStudentRegistration(ss, data) {
  var sheet = getOrCreateRegistrationSheet(ss);
  var lastRow = sheet.getLastRow();
  var stt = lastRow;

  var newRow = [
    stt,
    data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss"),
    "'" + (data.registrationId || ""),
    data.teamName || "",
    data.teamSize || "",
    data.mentor || "",
    data.leaderName || "",
    "'" + (data.leaderStudentId || ""),
    data.leaderEmail || "",
    "'" + (data.leaderPhone || ""),
    data.majorClass || "",
    data.member2Name || "",
    "'" + (data.member2StudentId || ""),
    data.member3Name || "",
    "'" + (data.member3StudentId || ""),
    data.member4Name || "",
    "'" + (data.member4StudentId || ""),
    data.status || "Đã tiếp nhận"
  ];

  sheet.appendRow(newRow);

  var currentRowIndex = sheet.getLastRow();
  var rowRange = sheet.getRange(currentRowIndex, 1, 1, REG_HEADERS.length);
  rowRange.setVerticalAlignment("middle");
  
  sheet.getRange(currentRowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 2).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 3).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 8).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 10).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 13).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 15).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 17).setHorizontalAlignment("center");
  sheet.getRange(currentRowIndex, 18).setHorizontalAlignment("center");

  return {
    status: "success",
    message: "Đã lưu thông tin đăng ký thành công vào Google Drive Excel!",
    registrationId: data.registrationId
  };
}

/**
 * 2. Xác thực đội thi: Kiểm tra MSSV + Email có phải Trưởng nhóm hoặc Cá nhân đã đăng ký
 */
function handleVerifyTeam(ss, data) {
  var regSheet = ss.getSheetByName(REGISTRATION_SHEET_NAME);
  if (!regSheet) {
    return {
      status: "error",
      valid: false,
      message: "Chưa tìm thấy Sheet đăng ký để đối soát dữ liệu."
    };
  }

  var searchId = String(data.studentId || "").trim().toUpperCase();
  var searchEmail = String(data.email || "").trim().toLowerCase();

  if (!searchId || !searchEmail) {
    return {
      status: "error",
      valid: false,
      message: "Vui lòng cung cấp cả MSSV và Email của Trưởng nhóm/Thí sinh để xác thực."
    };
  }

  var values = regSheet.getDataRange().getValues();
  if (values.length <= 1) {
    return {
      status: "error",
      valid: false,
      message: "Chưa có dữ liệu đội thi nào được ghi nhận trong hệ thống."
    };
  }

  var matchedLeaderRow = null;
  var matchedMemberInfo = null;

  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var regId = String(row[2] || "").trim();
    var teamName = String(row[3] || "").trim();
    var teamSizeStr = String(row[4] || "").trim();
    var mentor = String(row[5] || "").trim();
    var leaderName = String(row[6] || "").trim();
    var leaderId = String(row[7] || "").trim().toUpperCase();
    var leaderEmail = String(row[8] || "").trim().toLowerCase();
    var leaderPhone = String(row[9] || "").trim();
    var majorClass = String(row[10] || "").trim();

    var m2Id = String(row[12] || "").trim().toUpperCase();
    var m3Id = String(row[14] || "").trim().toUpperCase();
    var m4Id = String(row[16] || "").trim().toUpperCase();

    // Kiểm tra nếu là Trưởng nhóm hoặc Thí sinh cá nhân
    if (leaderId === searchId) {
      if (leaderEmail === searchEmail) {
        matchedLeaderRow = {
          registrationId: regId,
          teamName: teamName,
          teamSize: teamSizeStr,
          mentor: mentor,
          leaderName: leaderName,
          leaderStudentId: leaderId,
          leaderEmail: leaderEmail,
          leaderPhone: leaderPhone,
          majorClass: majorClass,
          registrationType: teamSizeStr.indexOf("1") !== -1 ? "individual" : "team"
        };
        break;
      } else {
        // MSSV trùng nhưng email sai
        var maskedEmail = leaderEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3");
        return {
          status: "error",
          valid: false,
          message: "MSSV chính xác nhưng Email không khớp với email Trưởng nhóm đã đăng ký (" + maskedEmail + "). Vui lòng kiểm tra lại!"
        };
      }
    }

    // Kiểm tra nếu là thành viên thường (không phải trưởng nhóm)
    if (searchId === m2Id || searchId === m3Id || searchId === m4Id) {
      matchedMemberInfo = {
        teamName: teamName,
        leaderName: leaderName
      };
    }
  }

  // Nếu là thành viên nhập vào -> Cảnh báo quyền nộp bài
  if (!matchedLeaderRow && matchedMemberInfo) {
    return {
      status: "error",
      valid: false,
      isMember: true,
      message: "MSSV " + searchId + " là thành viên của đội \"" + matchedMemberInfo.teamName + "\". Theo thể lệ, chỉ Trưởng nhóm (" + matchedMemberInfo.leaderName + ") mới có quyền đại diện đội nộp bài thi!"
    };
  }

  // Không tìm thấy
  if (!matchedLeaderRow) {
    return {
      status: "error",
      valid: false,
      message: "Không tìm thấy hồ sơ đăng ký của Trưởng nhóm với MSSV " + searchId + " và Email " + searchEmail + ". Vui lòng kiểm tra lại hoặc đăng ký trước khi nộp bài."
    };
  }

  // Kiểm tra xem đội này đã từng nộp bài Vòng 1 chưa trong Tab 2
  var phase1Sheet = ss.getSheetByName(PHASE1_SHEET_NAME);
  var existingSubmission = null;
  var alreadySubmitted = false;

  if (phase1Sheet) {
    var pValues = phase1Sheet.getDataRange().getValues();
    for (var i = 1; i < pValues.length; i++) {
      var pRow = pValues[i];
      var pLeaderId = String(pRow[7] || "").trim().toUpperCase();
      var pRegId = String(pRow[3] || "").trim();

      if (pLeaderId === searchId || (matchedLeaderRow.registrationId && pRegId === matchedLeaderRow.registrationId)) {
        alreadySubmitted = true;
        existingSubmission = {
          submittedAt: String(pRow[1] || ""),
          updatedAt: String(pRow[2] || ""),
          projectTitle: String(pRow[11] || ""),
          pitchDeckUrl: String(pRow[12] || ""),
          videoUrl: String(pRow[13] || ""),
          summaryDescription: String(pRow[14] || ""),
          submissionCount: Number(pRow[15] || 1)
        };
        break;
      }
    }
  }

  return {
    status: "success",
    valid: true,
    isLeader: true,
    teamData: matchedLeaderRow,
    alreadySubmitted: alreadySubmitted,
    existingSubmission: existingSubmission,
    message: alreadySubmitted
      ? "Đội \"" + matchedLeaderRow.teamName + "\" đã nộp bài trước đó. Bạn có thể nộp lại để cập nhật bản mới nhất."
      : "Xác thực đội thi \"" + matchedLeaderRow.teamName + "\" thành công!"
  };
}

/**
 * 3. Xử lý Nộp bài Vòng 1 (Có cơ chế Upsert: Tạo mới hoặc Cập nhật đè dòng cũ)
 */
function handleSubmitPhase1(ss, data) {
  var verify = handleVerifyTeam(ss, data);
  if (!verify.valid) {
    return {
      status: "error",
      message: "Từ chối tiếp nhận bài thi: " + verify.message
    };
  }

  var phase1Sheet = getOrCreatePhase1Sheet(ss);
  var pValues = phase1Sheet.getDataRange().getValues();
  var searchId = String(data.studentId || "").trim().toUpperCase();
  var nowFormatted = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

  var existingRowIndex = -1;
  var previousCount = 0;
  var originalSubmittedAt = nowFormatted;

  for (var i = 1; i < pValues.length; i++) {
    var row = pValues[i];
    var rowLeaderId = String(row[7] || "").trim().toUpperCase();
    var rowRegId = String(row[3] || "").trim();

    if (rowLeaderId === searchId || (data.registrationId && rowRegId === data.registrationId)) {
      existingRowIndex = i + 1; // 1-based index cho Google Sheet
      originalSubmittedAt = String(row[1] || nowFormatted);
      previousCount = Number(row[15] || 1);
      break;
    }
  }

  var teamInfo = verify.teamData;
  var finalTeamName = data.teamName || teamInfo.teamName || "";
  var finalLeaderName = data.leaderName || teamInfo.leaderName || "";
  var finalPhone = data.phone || teamInfo.leaderPhone || "";
  var finalMentor = data.mentor || teamInfo.mentor || "Chưa chỉ định";
  var finalRegId = data.registrationId || teamInfo.registrationId || "";
  var finalType = teamInfo.registrationType === "individual" ? "Cá nhân" : "Đội thi";

  // NẾU ĐÃ NỘP RỒI -> CẬP NHẬT ĐÈ VÀO DÒNG CŨ (UPSERT)
  if (existingRowIndex > 0) {
    var newCount = previousCount + 1;

    phase1Sheet.getRange(existingRowIndex, 3).setValue(nowFormatted); // Cột 3: Cập nhật cuối
    phase1Sheet.getRange(existingRowIndex, 12).setValue(data.projectTitle || ""); // Cột 12: Tên đề tài
    phase1Sheet.getRange(existingRowIndex, 13).setValue(data.pitchDeckUrl || ""); // Cột 13: Link Pitch Deck
    phase1Sheet.getRange(existingRowIndex, 14).setValue(data.videoUrl || ""); // Cột 14: Link Video
    phase1Sheet.getRange(existingRowIndex, 15).setValue(data.summaryDescription || ""); // Cột 15: Mô tả tóm tắt
    phase1Sheet.getRange(existingRowIndex, 16).setValue(newCount); // Cột 16: Số lần nộp
    phase1Sheet.getRange(existingRowIndex, 17).setValue("Đã cập nhật (Lần " + newCount + ")"); // Cột 17: Trạng thái

    return {
      status: "success",
      action: "updated",
      submissionCount: newCount,
      teamName: finalTeamName,
      message: "Đã cập nhật bài thi Vòng 1 thành công (Lần " + newCount + ") cho đội \"" + finalTeamName + "\"!"
    };
  }

  // NẾU LẦN ĐẦU NỘP -> THÊM DÒNG MỚI
  var lastRow = phase1Sheet.getLastRow();
  var stt = lastRow;

  var newRow = [
    stt,
    nowFormatted,
    nowFormatted,
    "'" + finalRegId,
    finalTeamName,
    finalType,
    finalLeaderName,
    "'" + searchId,
    data.email || teamInfo.leaderEmail || "",
    "'" + finalPhone,
    finalMentor,
    data.projectTitle || "",
    data.pitchDeckUrl || "",
    data.videoUrl || "",
    data.summaryDescription || "",
    1,
    "Đã tiếp nhận",
    ""
  ];

  phase1Sheet.appendRow(newRow);

  var curRow = phase1Sheet.getLastRow();
  var rowRange = phase1Sheet.getRange(curRow, 1, 1, PHASE1_HEADERS.length);
  rowRange.setVerticalAlignment("middle");

  phase1Sheet.getRange(curRow, 1).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 2).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 3).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 4).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 6).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 8).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 10).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 16).setHorizontalAlignment("center");
  phase1Sheet.getRange(curRow, 17).setHorizontalAlignment("center");

  return {
    status: "success",
    action: "created",
    submissionCount: 1,
    teamName: finalTeamName,
    message: "Nộp bài thi Vòng 1 thành công cho đội \"" + finalTeamName + "\"!"
  };
}

/**
 * Tạo hoặc lấy Sheet Đăng ký (Tab 1)
 */
function getOrCreateRegistrationSheet(ss) {
  var sheet = ss.getSheetByName(REGISTRATION_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(REGISTRATION_SHEET_NAME);
    sheet.appendRow(REG_HEADERS);
  }
  applyHeaderDesign(sheet, REG_HEADERS, REG_COLUMN_WIDTHS, "#0F172A");
  return sheet;
}

/**
 * Tạo hoặc lấy Sheet Nộp bài Vòng 1 (Tab 2)
 */
function getOrCreatePhase1Sheet(ss) {
  var sheet = ss.getSheetByName(PHASE1_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(PHASE1_SHEET_NAME);
    sheet.appendRow(PHASE1_HEADERS);
  }
  applyHeaderDesign(sheet, PHASE1_HEADERS, PHASE1_COLUMN_WIDTHS, "#4338CA"); // Màu tím Indigo sang trọng cho Vòng 1
  return sheet;
}

/**
 * Định dạng tiêu đề cột chuyên nghiệp
 */
function applyHeaderDesign(sheet, headers, widths, bgColor) {
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(bgColor);
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrap(false);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  for (var col = 1; col <= widths.length; col++) {
    sheet.setColumnWidth(col, widths[col - 1]);
  }
}

/**
 * Hàm thủ công: Định dạng lại cả 2 Sheet
 */
function dinhDangLaiTatCaBangTinh() {
  var ss = getSpreadsheet();
  var s1 = getOrCreateRegistrationSheet(ss);
  applyHeaderDesign(s1, REG_HEADERS, REG_COLUMN_WIDTHS, "#0F172A");
  var s2 = getOrCreatePhase1Sheet(ss);
  applyHeaderDesign(s2, PHASE1_HEADERS, PHASE1_COLUMN_WIDTHS, "#4338CA");
}
