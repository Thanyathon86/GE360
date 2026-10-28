# GE360 – รวมงาน

แต่ละงานแยกเป็นโฟลเดอร์ของตัวเอง (มี `package.json` / `node_modules` แยกกัน) เพื่อให้งานไม่ปนกัน

| งาน | โฟลเดอร์ | หัวข้อ |
|----|---------|-------|
| 07 | [`07-simplemath-tdd`](./07-simplemath-tdd) | Test-Driven Development สำหรับ SimpleMath |

## เพิ่มงานใหม่
1. สร้างโฟลเดอร์ชื่อ `<เลขงาน>-<ชื่อสั้น>` เช่น `08-token-erc20`
2. ถ้าเป็นงาน Hardhat เหมือนกัน ให้ copy ไฟล์ `package.json`, `hardhat.config.ts`, `tsconfig.json`, `.gitignore` จากงานก่อนหน้าไป แล้วรัน `npm install`
3. เพิ่มบรรทัดในตารางด้านบน
