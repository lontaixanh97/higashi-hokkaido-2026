# Đông Hokkaido 12/2026 — website chuyến đi

Website tĩnh, không cần build. Mở `index.html` qua một web server bất kỳ là chạy.

## Cấu trúc

```
docs/
├── index.html            Trang chính
├── assets/
│   ├── data.js           ← DỮ LIỆU: sửa file này để cập nhật nội dung
│   ├── images.js         Ảnh minh hoạ (Wikimedia Commons) và tên tác giả
│   ├── app.js            Bản đồ, lịch trình, checklist
│   ├── style.css
│   └── icon.svg
├── manifest.webmanifest  Cho phép "Thêm vào màn hình chính"
└── sw.js                 Lưu trang để xem khi mất sóng
```

## Cập nhật nội dung (`assets/data.js`)

- **Tên khách sạn**: trong `STAYS`, điền `name:'Tên khách sạn'` và `url:'https://link-đặt-phòng'`.
- **Ảnh**: trong `images.js`, mỗi điểm một danh sách ảnh. Ảnh Wikimedia cần giữ tên tác giả và giấy phép.
- **Đã đặt xong một mục**: trong `BOOKINGS`, đổi `done:false` thành `done:true`.
- **Giờ bay về**: tìm `[Điền giờ bay về]` và thay bằng giờ bay.
- Sau khi sửa, tăng số phiên bản `CACHE` trong `sw.js` (ví dụ `v1` → `v2`) để máy bạn bè tải bản mới.

## Xem thử trên máy

```bash
python3 -m http.server 8765 --directory docs
```

Rồi mở http://localhost:8765

## Đưa lên mạng

Trang được đăng bằng GitHub Pages từ thư mục `docs` trên nhánh `main`. Sửa file, rồi:

```bash
git add -A && git commit -m "Cập nhật lịch trình" && git push
```

Khoảng 1 phút sau trang tự cập nhật. Nhớ tăng số phiên bản `CACHE` trong `docs/sw.js`.

Ảnh minh hoạ lấy từ Wikimedia Commons, tên tác giả và giấy phép ghi ngay dưới mỗi ảnh.

Lưu ý: trang có tên thành viên và giờ bay. Ai có link đều xem được.
