# บทพูดอัดวิดีโอ – งาน 07 SimpleMath TDD

> วิธีใช้: แต่ละฉากบอกว่าต้อง **เปิดไฟล์ไหน**, **ชี้บรรทัดไหน** และ **พูดอะไร**
> เปิด VS Code ไว้ 2 แท็บ: `contracts/SimpleMath.sol` และ `test/SimpleMath.ts`
> ความยาวโดยประมาณ 5–7 นาที

---

## ฉาก 0 – เปิดตัว
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| (หน้า Explorer ด้านซ้าย) | – | "สวัสดีครับ ผม ______ รหัส ______ วันนี้จะอธิบายงาน 07 Test-Driven Development สำหรับ SimpleMath ครับ โปรเจกต์นี้ใช้ Hardhat มีโฟลเดอร์ `contracts` สำหรับ smart contract และโฟลเดอร์ `test` สำหรับ test case ครับ" |

---

## ฉาก 1 – ดู contract ก่อน (`contracts/SimpleMath.sol`)
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `contracts/SimpleMath.sol` | 5 | "นี่คือ contract ชื่อ SimpleMath มีทั้งหมด 4 function คือ บวก ลบ คูณ หาร" |
| `contracts/SimpleMath.sol` | 7–9 | "function `add` รับเลข a กับ b แล้วคืนค่า a บวก b" |
| `contracts/SimpleMath.sol` | 12–15 | "function `subtract` คืนค่า a ลบ b แต่บรรทัด 13 มี `require(a >= b)` เพราะ `uint256` เป็นเลขที่ไม่มีค่าติดลบ ถ้า a น้อยกว่า b จะ revert พร้อมข้อความ subtraction underflow" |
| `contracts/SimpleMath.sol` | 18–20 | "function `multiply` คืนค่า a คูณ b" |
| `contracts/SimpleMath.sol` | 23–26 | "function `divide` คืนค่า a หาร b บรรทัด 24 มี `require(b != 0)` กันการหารด้วยศูนย์ครับ" |

---

## ฉาก 2 – โครงสร้างไฟล์ test (`test/SimpleMath.ts`)
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 1 | "บรรทัดแรก import `assert` กับ `expect` จาก library chai ซึ่งใช้ตรวจว่าผลลัพธ์ถูกต้องหรือไม่" |
| `test/SimpleMath.ts` | 2 | "import `network` จาก hardhat" |
| `test/SimpleMath.ts` | 4 | "`network.create()` สร้าง blockchain จำลองขึ้นมาในเครื่อง แล้วดึง `ethers` ออกมาใช้ deploy และเรียก contract" |
| `test/SimpleMath.ts` | 6 | "`describe` ใช้จัดกลุ่ม test ครับ กลุ่มใหญ่ชื่อ SimpleMath ข้างในจะแบ่งกลุ่มย่อยตาม function" |
| `test/SimpleMath.ts` | 10–12 | "`beforeEach` จะทำงานก่อนทุก test case โดย deploy contract ใหม่ทุกครั้ง แต่ละเคสจะได้ไม่กระทบกันครับ" |

---

## ฉาก 3 – อธิบาย `assert.equal` (สำคัญ ⭐)
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 17 | "ต่อไปจะอธิบาย `assert.equal` ครับ รูปแบบคือ `assert.equal(actual, expected)` ค่าแรกคือค่าที่ได้จริงจาก contract ค่าที่สองคือค่าที่เราคาดหวัง" |
| `test/SimpleMath.ts` | 17 | "ถ้าสองค่าเท่ากัน test จะผ่านและขึ้นเครื่องหมายถูก ถ้าไม่เท่ากันจะโยน AssertionError ออกมา test จะ fail และบอกว่าเราคาดหวังค่าอะไร แต่ได้ค่าอะไร" |
| `test/SimpleMath.ts` | 17 | "`assert.equal` เปรียบเทียบแบบ `==` และที่ต้องเขียน `5n` มีตัว n ต่อท้าย เพราะค่า `uint256` ที่ contract ส่งกลับมา ethers จะแปลงเป็น BigInt ใน JavaScript ครับ" |

---

## ฉาก 4 – test ของ `add`
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 14 | "กลุ่มแรกเป็น test ของ function add" |
| `test/SimpleMath.ts` | 15–18 | "เคสแรก should add two numbers correctly เรียก `add(2, 3)` แล้วใช้ `assert.equal` ตรวจว่าได้ 5" |
| `test/SimpleMath.ts` | 20–23 | "เคสที่สอง บวกด้วยศูนย์ `add(7, 0)` ต้องได้ 7 เท่าเดิม" |

## ฉาก 5 – test ของ `subtract`
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 27–30 | "`subtract(10, 4)` ตรวจว่าได้ 6" |
| `test/SimpleMath.ts` | 32–35 | "`subtract(5, 5)` ลบเลขที่เท่ากัน ต้องได้ 0" |
| `test/SimpleMath.ts` | 37–41 | "เคสนี้ `subtract(3, 5)` ผลลัพธ์จะติดลบ contract ต้อง revert ตรงนี้ใช้ `assert.equal` ไม่ได้ เพราะไม่มีค่าคืนกลับมา เลยใช้ `expect(...).to.be.revertedWith(...)` ตรวจว่า revert ด้วยข้อความ subtraction underflow ตรงกับใน contract บรรทัด 13" |

## ฉาก 6 – test ของ `multiply`
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 45–48 | "`multiply(4, 5)` ตรวจว่าได้ 20" |
| `test/SimpleMath.ts` | 50–53 | "`multiply(9, 0)` คูณด้วยศูนย์ต้องได้ 0" |

## ฉาก 7 – test ของ `divide`
| ไฟล์ | บรรทัด | พูด |
|---|---|---|
| `test/SimpleMath.ts` | 57–60 | "`divide(20, 4)` หารลงตัว ได้ 5" |
| `test/SimpleMath.ts` | 62–65 | "`divide(7, 2)` คำตอบจริงคือ 3.5 แต่ Solidity ไม่มีทศนิยม เลยปัดเศษทิ้ง ได้ 3" |
| `test/SimpleMath.ts` | 67–71 | "`divide(1, 0)` หารด้วยศูนย์ ต้อง revert ด้วยข้อความ division by zero ตรงกับ contract บรรทัด 24" |

---

## ฉาก 8 – รัน test
| ที่ไหน | ทำอะไร | พูด |
|---|---|---|
| Terminal | พิมพ์ `npx hardhat test` | "ต่อไปลองรัน test ครับ" |
| Terminal (ผลลัพธ์) | ชี้ `10 passing` | "ผ่านครบทั้ง 10 เคส" |

## ฉาก 9 – สาธิต test fail (ให้เห็นว่า `assert.equal` ทำงานจริง)
| ไฟล์ | บรรทัด | ทำ / พูด |
|---|---|---|
| `test/SimpleMath.ts` | 17 | **แก้** `5n` → `6n` แล้วเซฟ พูดว่า "ลองแก้ค่าที่คาดหวังให้ผิดเป็น 6" |
| Terminal | – | รัน `npx hardhat test` แล้วพูดว่า "test ขึ้น fail และบอกว่า expected 5 to equal 6 แปลว่า contract คืนค่า 5 แต่เราคาดหวัง 6 นี่คือการทำงานของ `assert.equal` ครับ" |
| `test/SimpleMath.ts` | 17 | **แก้กลับ** เป็น `5n` แล้วรันอีกครั้งให้ผ่าน |

## ฉาก 10 – ปิดท้าย
| พูด |
|---|
| "สรุปคือ TDD เริ่มจากเขียน test ก่อน รันแล้ว fail (Red) จากนั้นเขียน contract ให้ test ผ่าน (Green) แล้วค่อยปรับ code ให้ดีขึ้น (Refactor) ขอบคุณครับ" |
