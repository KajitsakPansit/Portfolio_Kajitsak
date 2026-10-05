# ขจิตศักดิ์ พันธิ์สิทธิ์ — Portfolio

พอร์ตโฟลิโอสมัครสหกิจศึกษา โทนขาวครีม เส้นสีดำ รองรับมือถือ

## เนื้อหา
- รูปนักศึกษา getstudentimage และข้อมูลส่วนตัว / การศึกษาปัจจุบัน
- Hard Skills และ Soft Skills ตาม Resume
- ระบบจัดการพัสดุและแจ้งเตือนลูกค้า วิชา RPA พร้อมวิดีโอ YouTube
- ประกาศนียบัตร 4 ใบ พร้อมภาพตัวอย่าง ชื่อหลักสูตร และ PDF
- กิจกรรม Cloud Native Bangkok AI พร้อมหัวข้อบรรยายทั้ง 4 หัวข้อ

## เปิดดู
ดับเบิลคลิก index.html เพื่อดูในเครื่องได้ หรือใช้ npm start แล้วเปิด http://127.0.0.1:4173
วิดีโอ YouTube และฟอนต์ออนไลน์ต้องใช้อินเทอร์เน็ต

## เผยแพร่บน GitHub Pages
1. เข้าสู่ระบบบัญชี KajitsakPansit ที่ GitHub
2. สร้าง repository สาธารณะชื่อ KajitsakPansit.github.io
3. แตก ZIP แล้วอัปโหลดไฟล์ index.html, style.css, .nojekyll, README.md และโฟลเดอร์ Photo, assets ที่ระดับบนสุดของ repository (ไม่อัปโหลด ZIP ทั้งไฟล์)
4. เปิด Settings → Pages → Source เลือก Deploy from a branch
5. เลือก branch main และโฟลเดอร์ / (root) แล้ว Save
6. รอเผยแพร่สำเร็จ แล้วเปิด https://kajitsakpansit.github.io/ ตรวจสอบก่อนนำไปใส่ Resume

ลิงก์ข้างต้นเป็นที่อยู่ที่จะใช้งานหลังเผยแพร่สำเร็จ ยังไม่ใช่การยืนยันว่าเว็บออนไลน์แล้ว

## ทางเลือก GitHub Actions
หากอัปโหลดโฟลเดอร์ .github ไปด้วย ให้เลือก Settings → Pages → Source: GitHub Actions แทนการเผยแพร่จาก branch
ไฟล์ .github/workflows/pages.yml เตรียมการเผยแพร่จาก branch main ไว้แล้ว

## แก้ไขเนื้อหา
index.html: ข้อมูลส่วนตัว ทักษะ ผลงานและประกาศนียบัตร
style.css: สี ตัวอักษรและการจัดหน้า
Photo/: รูปและไฟล์ประกาศนียบัตรต้นฉบับ
assets/: Resume และภาพตัวอย่างประกาศนียบัตร
