 <!--lẹnh 1 tạo ra Prisma Client, giúp tương tác với database bằng mã TypeScript -->
 1.npx prisma generate
 <!-- lệnh 2 khởi chạy giao diện đồ họa giúp quản lý dữ liệu trong database bằng giao diện, sau khi chạy vào http://localhost:5555/ để tùy chỉnh dữ liệu trong database, cái này chỉ chỉnh dữ liệu khi cần thiết, không liên quan đến trang web -->
 2.npx prisma studio
 <!-- lệnh 3 giúp chạy trang web, sau khi chạy truy cập http://localhost:3000/ để vào trang -->
 3.pnpm dev
 4. pnpm build 
 <!-- lệnh sửa code trên web -->



 <!-- 2.npx prisma migrate dev --name init, -->

 * Hệ thống: 
 -Bệnh Nhân:
 1. Bệnh nhân đăng kí lịch khám, chọn bác sĩ.
 2. Nhân viên xác nhận lịch khám
- Bác sĩ: 
1. Hiện danh sách lịch khám được chỉ định đã dc nhân viên xác nhận


git add . 
<!-- thêm code toàn bộ -->
git commit -m "Ver1" 
<!-- commit + comment -->
git push origin main