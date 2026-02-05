# การตั้งค่า Firebase สำหรับ Card Counter

## ขั้นตอนการตั้งค่า Firebase (ฟรี)

### 1. สร้าง Firebase Project
1. ไปที่ https://console.firebase.google.com/
2. คลิก "Create a project" หรือ "Add project"
3. ตั้งชื่อโปรเจค เช่น "love-tarot-counter"
4. ปิด Google Analytics (ไม่จำเป็น) แล้วคลิก "Create project"

### 2. เปิดใช้งาน Realtime Database
1. ในหน้า Firebase Console เลือก "Build" > "Realtime Database"
2. คลิก "Create Database"
3. เลือก Region: `asia-southeast1` (Singapore) สำหรับความเร็วในไทย
4. เลือก "Start in test mode" แล้วคลิก "Enable"

### 3. ตั้งค่า Security Rules
1. ไปที่แท็บ "Rules" ใน Realtime Database
2. เปลี่ยน rules เป็น:
```json
{
  "rules": {
    "cardPicks": {
      ".read": true,
      ".write": true
    },
    "userPicks": {
      ".read": true,
      ".write": true
    },
    "buttonClicks": {
      ".read": true,
      ".write": true
    },
    "comments": {
      ".read": true,
      ".write": true
    },
    "replies": {
      ".read": true,
      ".write": true
    }
  }
}
```
3. คลิก "Publish"

### 4. สร้าง Web App
1. ไปที่ Project Settings (ไอคอนเกียร์) > General
2. เลื่อนลงไปที่ "Your apps" แล้วคลิกไอคอน Web (</>)
3. ตั้งชื่อ App เช่น "love-tarot-web"
4. **ไม่ต้อง** เลือก Firebase Hosting
5. คลิก "Register app"

### 5. คัดลอก Config
หลังจาก Register app จะได้ config แบบนี้:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "love-tarot-counter.firebaseapp.com",
  databaseURL: "https://love-tarot-counter-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "love-tarot-counter",
  storageBucket: "love-tarot-counter.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 6. อัพเดท counter.js
เปิดไฟล์ `js/counter.js` แล้วแทนที่ `firebaseConfig` ด้วยค่าที่คัดลอกมา

### 7. Deploy ไป GitHub Pages
```bash
git add .
git commit -m "Add Firebase counter"
git push
```

## ทดสอบ
1. เปิดเว็บไซต์
2. จับไพ่ 1 ใบ
3. ควรเห็นตัวเลขนับแสดงขึ้นมา
4. เปิดในอีก browser/device แล้วจับไพ่ใบเดียวกัน
5. ตัวเลขควรเพิ่มขึ้น

## Free Tier Limits
Firebase Free tier มีให้ใช้:
- 1 GB storage
- 10 GB/เดือน download
- 100 connections พร้อมกัน

เพียงพอสำหรับเว็บขนาดเล็กถึงกลาง!

## หมายเหตุ
- ถ้ายังไม่ได้ตั้งค่า Firebase ระบบจะซ่อน counter ไว้
- Counter จะแสดงเฉพาะเมื่อเชื่อมต่อ Firebase สำเร็จ
