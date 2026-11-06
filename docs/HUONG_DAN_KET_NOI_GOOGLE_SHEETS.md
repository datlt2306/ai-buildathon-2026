# HƯỚNG DẪN KẾT NỐI TỰ ĐỘNG ĐIỀN FORM VÀO FILE GOOGLE DRIVE EXCEL (GOOGLE SHEETS)
## Cuộc thi: "AI Buildathon 2026" — FPT Polytechnic Hà Nội

Tài liệu này hướng dẫn chi tiết cách thiết lập để mỗi khi sinh viên nhấn nút **"Xác nhận đăng ký đội thi"** trên website, dữ liệu sẽ ngay lập tức được gửi và tự động điền vào một hàng mới trong file Excel / Google Sheets trên Google Drive theo thời gian thực.

---

### TỔNG QUAN GIẢI PHÁP

- **Kiến trúc:** Frontend React/Vite gửi dữ liệu HTTP POST trực tiếp tới **Google Apps Script Web App** được gắn với Google Sheet trên Google Drive.
- **Ưu điểm:**
  1. **Hoàn toàn miễn phí**, không cần thuê server trung gian hay backend riêng.
  2. **Bảo mật:** Không để lộ mật khẩu, Service Account Private Key hay quyền truy cập Drive cá nhân trên trình duyệt.
  3. **Tự động định dạng:** Tự động tạo dòng tiêu đề đẹp mắt, giữ nguyên số 0 ở đầu số điện thoại & MSSV (ví dụ `0912...`, `PH12345`).
  4. **Sao lưu kép (Dual Backup):** Dữ liệu vừa được lưu trên Google Drive Excel, vừa được lưu dự phòng vào LocalStorage của trình duyệt và có nút "Xuất danh sách ra file Excel (.csv UTF-8)" tức thì.

---

### BƯỚC 1: TẠO FILE GOOGLE SHEETS TRÊN GOOGLE DRIVE

1. Mở [Google Drive](https://drive.google.com).
2. Nhấn nút **Mới (+ New)** > Chọn **Google Trang tính (Google Sheets)** (hoặc tải lên file Excel `.xlsx` rồi mở bằng Google Sheets).
3. Đổi tên file bảng tính thành:  
   `AI Buildathon 2026 - Danh Sách Đăng Ký Đội Thi`

---

### BƯỚC 2: MỞ APPS SCRIPT VÀ DÁN MÃ NGUỒN

1. Trên menu của file Google Sheets vừa tạo, chọn:  
   **Tiện ích mở rộng (Extensions)** > **Apps Script**.
2. Một tab trình duyệt mới sẽ mở ra trình soạn thảo mã nguồn Google Apps Script.
3. Xóa toàn bộ đoạn code mặc định trong file `Code.gs`.
4. Mở file [scripts/google-apps-script-ai-buildathon.js](file:///Users/ken/Folders/Projects/ai-inovation-challenge/scripts/google-apps-script-ai-buildathon.js) trong dự án này, sao chép toàn bộ nội dung và dán vào `Code.gs`.
5. Nhấn biểu tượng đĩa mềm **Lưu dự án (Save project)** hoặc phím `Ctrl + S` / `Cmd + S`.

---

### BƯỚC 3: TRIỂN KHAI THÀNH WEB APP (DEPLOY)

1. Ở góc trên cùng bên phải của trang Apps Script, nhấn nút màu xanh: **Triển khai (Deploy)** > Chọn **Tùy chọn triển khai mới (New deployment)**.
2. Tại mục bánh răng (Select type), chọn: **Ứng dụng web (Web app)**.
3. Thiết lập các thông số như sau:
   - **Mô tả (Description):** `AI Buildathon 2026 Webhook v1`
   - **Thực thi dưới dạng (Execute as):** `Tôi (email_cua_ban@gmail.com)` *(Me)*
   - **Ai có quyền truy cập (Who has access):** `Bất kỳ ai (Anyone)`  
     *(⚠️ Lưu ý: Bắt buộc chọn "Bất kỳ ai" để form từ website gửi dữ liệu vào mà không yêu cầu thí sinh phải đăng nhập Google cá nhân)*.
4. Nhấn nút **Triển khai (Deploy)**.
5. Nếu Google hiển thị hộp thoại yêu cầu cấp quyền *(Authorization required)*:
   - Nhấn **Xem lại quyền (Authorize access / Review permissions)**.
   - Chọn tài khoản Google của bạn.
   - Nếu thấy cảnh báo "Google chưa xác minh ứng dụng này", nhấn **Nâng cao (Advanced)** ở góc dưới > Nhấn **Đi tới [Tên dự án] (không an toàn)**.
   - Nhấn **Cho phép (Allow)**.
6. Sau khi triển khai xong, bạn sẽ nhận được **URL ứng dụng web (Web app URL)**, có định dạng:  
   `https://script.google.com/macros/s/AKfycbx.../exec`
7. Hãy sao chép (Copy) đường link này!

---

### BƯỚC 4: KẾT NỐI VÀO ỨNG DỤNG

Bạn có 2 cách cực kỳ đơn giản để kích hoạt:

#### Cách 1: Cấu hình trực tiếp trên giao diện website (Khuyên dùng khi demo / kiểm thử)
1. Mở trang web tại phần form **"Đăng ký tham gia AI Buildathon 2026"**.
2. Nhấn vào nút nhỏ **"⚙️ Cấu hình Google Drive Excel"** ở góc trên bên phải khung đăng ký.
3. Dán đường link Web App vừa copy vào ô nhập.
4. Nhấn **"Kiểm tra kết nối"** -> Hệ thống sẽ gửi tín hiệu test và thông báo kết quả.
5. Nhấn **"Lưu cấu hình"**. Từ thời điểm này, mọi đơn submit sẽ tự động điền vào Google Sheets!

#### Cách 2: Lưu vào biến môi trường `.env` (Khuyên dùng khi đưa lên máy chủ / hosting)
1. Tạo hoặc mở file `.env` tại thư mục gốc của dự án.
2. Thêm dòng sau:
   ```env
   VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Chạy `npm run build` hoặc khởi động lại dev server `npm run dev`.

---

### BƯỚC 5: KIỂM THỬ THỰC TẾ

1. Điền thông tin thử nghiệm vào form:
   - Tên đội: `Team AI Innovators`
   - Số lượng thành viên: `3 thành viên`
   - Giảng viên hướng dẫn / Mentor: chọn 1 trong 11 thầy (ví dụ: `Hoàng Nhật Minh - Minhnh31`)
   - Trưởng nhóm: `Nguyễn Văn A`, MSSV `PH12345`, Email `anvph12345@fpt.edu.vn`, SĐT `0912345678`, Lớp `WD18301 - Lập trình Web Kỳ 4`
   - Thành viên 2: `Trần Thị B`, MSSV `PH23456`
   - Thành viên 3: `Lê Văn C`, MSSV `PH34567`
2. Bấm nút **"Xác nhận đăng ký đội thi"**.
3. Mở tab Google Sheets trên Google Drive -> Một hàng mới với đầy đủ 18 cột (bao gồm cột Giảng viên / Mentor) sẽ lập tức xuất hiện với ngày giờ, mã đăng ký và toàn bộ thông tin đội thi!
