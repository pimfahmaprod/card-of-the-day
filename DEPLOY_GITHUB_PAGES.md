# 🚀 Deploy to GitHub Pages

## ขั้นตอนการ Deploy

### 1. สร้าง GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Valentine Tarot app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/love-tarot.git
git push -u origin main
```

### 2. เปิดใช้งาน GitHub Pages

1. ไปที่ GitHub repository ของคุณ
2. คลิก **Settings** (ด้านบน)
3. คลิก **Pages** (เมนูซ้าย)
4. ที่ **Source** เลือก **GitHub Actions**

### 3. รอ Deploy เสร็จ

- GitHub Actions จะ build และ deploy อัตโนมัติ
- ดูความคืบหน้าที่แท็บ **Actions**
- รอประมาณ 2-3 นาที

### 4. เข้าเว็บไซต์

เว็บจะอยู่ที่:
```
https://YOUR_USERNAME.github.io/love-tarot/
```

---

## 🔧 การตั้งค่าที่เพิ่มเข้ามา

### 1. `next.config.js`
```javascript
output: 'export',           // Export static files
basePath: '/love-tarot',    // GitHub Pages subpath
assetPrefix: '/love-tarot/' // Asset path prefix
```

### 2. `.github/workflows/deploy.yml`
- GitHub Actions workflow
- Build และ deploy อัตโนมัติทุกครั้งที่ push to main

### 3. `public/.nojekyll`
- ป้องกัน GitHub จาก process files ด้วย Jekyll

---

## 🧪 ทดสอบ Build ก่อน Deploy

```bash
npm run build
```

ถ้า build สำเร็จ จะเห็นโฟลเดอร์ `out/` ถูกสร้างขึ้น

---

## 🔄 Update เว็บไซต์

แก้ไขโค้ด แล้ว:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Actions จะ deploy ให้อัตโนมัติ!

---

## ⚠️ หมายเหตุสำคัญ

### เปลี่ยนชื่อ Repository

ถ้าชื่อ repo ไม่ใช่ `love-tarot` ต้องแก้ไข:

**ใน `next.config.js`:**
```javascript
basePath: '/YOUR_REPO_NAME',
assetPrefix: '/YOUR_REPO_NAME/',
```

### ใช้ Custom Domain

1. เพิ่มไฟล์ `public/CNAME`:
   ```
   yourdomain.com
   ```

2. ตั้งค่า DNS:
   ```
   Type: CNAME
   Name: www (or @)
   Value: YOUR_USERNAME.github.io
   ```

3. แก้ไข `next.config.js`:
   ```javascript
   basePath: '',  // Remove basePath
   assetPrefix: '', // Remove assetPrefix
   ```

---

## 🐛 Troubleshooting

### Build ไม่ผ่าน
- เช็ค Actions tab เพื่อดู error log
- ลองรัน `npm run build` locally
- ตรวจสอบ dependencies ใน package.json

### เว็บขึ้น 404
- ตรวจสอบว่า GitHub Pages เปิดใช้งานแล้ว
- เช็คว่า Source เป็น "GitHub Actions"
- ตรวจสอบ basePath ใน next.config.js

### รูปภาพไม่โหลด
- ตรวจสอบ path ของรูป
- ใช้ leading slash: `/images/tarot/card.png`
- เช็ค assetPrefix configuration

### CSS/Fonts ไม่โหลด
- ตรวจสอบ assetPrefix
- เคลียร์ browser cache
- ลองเปิด Incognito mode

---

## 📊 GitHub Actions Status

ดูสถานะการ deploy ที่:
```
https://github.com/YOUR_USERNAME/love-tarot/actions
```

---

## ✅ Checklist

- [ ] สร้าง GitHub repository
- [ ] Push code ขึ้น GitHub
- [ ] เปิดใช้งาน GitHub Pages (Source: GitHub Actions)
- [ ] รอ Actions เสร็จ (2-3 นาที)
- [ ] ทดสอบเว็บไซต์
- [ ] แชร์ URL กับเพื่อนๆ!

---

**เว็บไซต์พร้อมแล้ว!** 🎉

URL: `https://YOUR_USERNAME.github.io/love-tarot/`
