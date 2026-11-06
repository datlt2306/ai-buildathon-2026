/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO FORM "ĐĂNG KÝ THAM GIA AI BUILDATHON 2026"
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH (3 PHÚT):
 * 1. Mở Google Drive, tạo một file Google Sheets mới (hoặc mở file Excel trên Drive).
 * 2. Đổi tên file thành: "AI Buildathon 2026 - Danh Sách Đăng Ký Đội Thi".
 * 3. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) > Apps Script.
 * 4. Xóa hết mã có sẵn trong file Code.gs, dán toàn bộ nội dung file này vào.
 * 5. Nhấn nút "Lưu" (biểu tượng đĩa mềm hoặc Ctrl + S / Cmd + S).
 * 6. Nhấn nút "Triển khai" (Deploy) ở góc trên bên phải > chọn "Tùy chọn triển khai mới" (New deployment).
 * 7. Chọn loại tiện ích là "Ứng dụng web" (Web app):
 *    - Mô tả: "AI Buildathon 2026 Webhook"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me - địa chỉ email Google của bạn)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG để form gửi được dữ liệu.
 * 8. Nhấn "Triển khai" (Deploy). Google sẽ hỏi cấp quyền truy cập bảng tính (Review Permissions) -> Cấp quyền cho script.
 * 9. Sao chép "URL ứng dụng web" (Web App URL có dạng: https://script.google.com/macros/s/.../exec).
 * 10. Dán URL này vào file `.env` (VITE_GOOGLE_SHEETS_SCRIPT_URL=...) hoặc dán vào giao diện web tại nút "Cấu hình Google Sheets".
 * 
 * =========================================================================
 */

// Tên trang tính lưu trữ danh sách đăng ký
var SHEET_NAME = "Đăng ký AI Buildathon 2026";

// (TÙY CHỌN) ID của Google Sheet: Nếu bạn mở Apps Script trực tiếp từ menu "Tiện ích mở rộng > Apps Script"
// trong file Google Sheets thì CỨ ĐỂ TRỐNG "".
// Nếu tạo Script độc lập từ script.google.com, hãy dán ID file Google Sheets vào đây (chuỗi ký tự nằm giữa /d/ và /edit trên thanh địa chỉ).
var SPREADSHEET_ID = "";

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Không tìm thấy bảng tính liên kết. Vui lòng điền SPREADSHEET_ID vào dòng 31 của script.");
  }
  return ss;
}

// Danh sách các cột tiêu đề
var HEADERS = [
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

/**
 * Xử lý yêu cầu HTTP POST khi sinh viên submit form từ website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa script tối đa 30 giây để tránh trường hợp nhiều sinh viên submit cùng một mili-giây
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Hệ thống đang bận, vui lòng thử lại sau giây lát." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = getSpreadsheet();
    var sheet = getOrCreateRegistrationSheet(ss);

    var rawData = e.postData.contents;
    var data;
    try {
      data = JSON.parse(rawData);
    } catch (parseErr) {
      data = e.parameter;
    }

    // Nếu là payload kiểm tra kết nối từ website
    if (data.isTest) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          message: "Kết nối Google Apps Script Web App thành công! Sẵn sàng nhận đơn đăng ký."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Tính STT
    var lastRow = sheet.getLastRow();
    var stt = lastRow; // lastRow đã tính dòng tiêu đề, nên hàng tiếp theo stt = lastRow

    // Chuẩn bị hàng dữ liệu mới
    var newRow = [
      stt,
      data.timestamp || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss"),
      "'" + (data.registrationId || ""),
      data.teamName || "",
      data.teamSize || "",
      data.mentor || "",
      data.leaderName || "",
      "'" + (data.leaderStudentId || ""), // Dấu ' giúp giữ nguyên số 0 hoặc định dạng chuỗi
      data.leaderEmail || "",
      "'" + (data.leaderPhone || ""),    // Dấu ' giữ nguyên số 0 ở đầu số điện thoại
      data.majorClass || "",
      data.member2Name || "",
      "'" + (data.member2StudentId || ""),
      data.member3Name || "",
      "'" + (data.member3StudentId || ""),
      data.member4Name || "",
      "'" + (data.member4StudentId || ""),
      data.status || "Đã tiếp nhận"
    ];

    // Thêm hàng vào Google Sheet
    sheet.appendRow(newRow);

    // Định dạng các ô vừa thêm: căn giữa các cột ngày tháng, mã, MSSV, SĐT
    var currentRowIndex = sheet.getLastRow();
    var rowRange = sheet.getRange(currentRowIndex, 1, 1, HEADERS.length);
    rowRange.setVerticalAlignment("middle");
    
    // Căn giữa cột STT, Ngày tháng, Mã, MSSV, SĐT, Trạng thái
    sheet.getRange(currentRowIndex, 1).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 2).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 3).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 8).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 10).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 13).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 15).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 17).setHorizontalAlignment("center");
    sheet.getRange(currentRowIndex, 18).setHorizontalAlignment("center");

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Đã lưu thông tin đăng ký thành công vào Google Drive Excel!",
        registrationId: data.registrationId
      }))
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
 * Xử lý yêu cầu HTTP GET (dùng khi kiểm tra Webhook URL trên trình duyệt)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Webhook Google Sheets cho AI Buildathon 2026 đang hoạt động bình thường!",
      timestamp: Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss")
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hàm hỗ trợ lấy hoặc tự động khởi tạo Sheet với giao diện đẹp mắt
 */
function getOrCreateRegistrationSheet(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    // Tạo dòng Header
    sheet.appendRow(HEADERS);

    // Định dạng dòng tiêu đề
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#0F172A"); // Màu xanh đậm hiện đại
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    headerRange.setWrap(true);
    sheet.setRowHeight(1, 38);

    // Cố định dòng tiêu đề
    sheet.setFrozenRows(1);

    // Tự động căn chỉnh độ rộng các cột
    for (var col = 1; col <= HEADERS.length; col++) {
      sheet.autoResizeColumn(col);
    }
  } else {
    // Tự động kiểm tra nếu sheet cũ chưa có cột "Giảng viên / Mentor" thì tự động chèn thêm
    var lastCol = sheet.getLastColumn();
    if (lastCol > 0) {
      var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      if (currentHeaders.indexOf("Giảng viên / Mentor") === -1) {
        sheet.insertColumnAfter(5);
        var mentorHeaderCell = sheet.getRange(1, 6);
        mentorHeaderCell.setValue("Giảng viên / Mentor");
        mentorHeaderCell.setBackground("#0F172A");
        mentorHeaderCell.setFontColor("#FFFFFF");
        mentorHeaderCell.setFontWeight("bold");
        mentorHeaderCell.setFontSize(10);
        mentorHeaderCell.setHorizontalAlignment("center");
        mentorHeaderCell.setVerticalAlignment("middle");
        sheet.autoResizeColumn(6);
      }
    }
  }
  return sheet;
}
