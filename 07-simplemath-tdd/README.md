# 07 - Test-Driven Development สำหรับ SimpleMath

Hardhat 3 + Mocha + Ethers + Chai

## รันงาน
```bash
npm install      # ครั้งแรกครั้งเดียว
npx hardhat test # รัน test ทั้งหมด (ควรผ่าน 10 เคส)
```

## สิ่งที่ต้องส่ง
- [ ] Source code SimpleMath → `contracts/SimpleMath.sol`
- [ ] Source code test case → `test/SimpleMath.ts`
- [ ] Link video อธิบาย test case แต่ละ function + การทำงานของ `assert.equal` → ใส่ link ที่นี่: ______

---

## สคริปต์สำหรับอัดวิดีโอ (ใช้เป็นโน้ตตอนพูด)

> บทพูดแบบละเอียด แยกตามไฟล์และบรรทัด → [video-script.md](./video-script.md)

### 1. โครงสร้างไฟล์ test
- `import { assert, expect } from "chai"` – ใช้ library chai สำหรับตรวจผลลัพธ์
- `const { ethers } = await network.create()` – สร้าง blockchain จำลองในเครื่อง แล้วเอา `ethers` มาใช้ deploy/เรียก contract
- `describe("SimpleMath", ...)` – จัดกลุ่ม test ของ contract นี้, ข้างในแบ่ง `describe` ย่อยตาม function
- `it("...", ...)` – 1 test case99jv
- `beforeEach` – deploy contract ใหม่ก่อนทุกเคส ทำให้แต่ละเคสไม่กระทบกัน

### 2. `assert.equal` ทำงานอย่างไร
`assert.equal(actual, expected)`
- `actual` = ค่าที่ได้จริงจาก contract, `expected` = ค่าที่เราคาดหวัง
- ถ้าเท่ากัน → test ผ่าน (✔) ถ้าไม่เท่ากัน → โยน `AssertionError` ทำให้ test fail และแสดงว่าคาดหวังค่าอะไรแต่ได้ค่าอะไร
- ใช้การเปรียบเทียบแบบ `==` (non-strict)
- ค่าที่ contract คืนมาเป็น `uint256` → ethers แปลงเป็น `BigInt` ใน JS จึงเขียนค่าคาดหวังเป็น `5n`, `20n` (ตัว `n` = BigInt)
- ลองสาธิตในวิดีโอ: แก้ `assert.equal(result, 5n)` เป็น `6n` แล้วรัน → จะเห็น test fail พร้อมข้อความ `expected 5 to equal 6`

### 3. อธิบาย test แต่ละ function
| Function | Test case | ทดสอบอะไร |
|---|---|---|
| `add` | `add(2, 3)` → `5` | บวกปกติ |
| | `add(7, 0)` → `7` | บวกด้วย 0 ได้ค่าเดิม |
| `subtract` | `subtract(10, 4)` → `6` | ลบปกติ |
| | `subtract(5, 5)` → `0` | ลบเลขเท่ากันได้ 0 |
| | `subtract(3, 5)` → revert | `uint256` ติดลบไม่ได้ contract จึง `require` แล้ว revert (ใช้ `expect(...).to.be.revertedWith(...)` เพราะ `assert.equal` ใช้ตรวจ error ไม่ได้) |
| `multiply` | `multiply(4, 5)` → `20` | คูณปกติ |
| | `multiply(9, 0)` → `0` | คูณด้วย 0 ได้ 0 |
| `divide` | `divide(20, 4)` → `5` | หารลงตัว |
| | `divide(7, 2)` → `3` | Solidity ไม่มีทศนิยม ปัดเศษทิ้ง |
| | `divide(1, 0)` → revert | ห้ามหารด้วย 0 |

### 4. แนวคิด TDD (Red → Green → Refactor)
1. **Red** – เขียน test ก่อน รันแล้ว fail เพราะยังไม่มี function
2. **Green** – เขียน code ใน contract ให้น้อยที่สุดที่ทำให้ test ผ่าน
3. **Refactor** – ปรับ code ให้ดีขึ้นโดย test ยังผ่านอยู่
