# دليل النشر على GitHub و Vercel

## خطوات رفع المشروع على GitHub

### 1. إنشاء مستودع جديد على GitHub

1. اذهب إلى [GitHub.com](https://github.com)
2. اضغط على زر **"New repository"** أو **"+"** في الأعلى
3. املأ البيانات:
   - **Repository name**: `books-demo-page` (أو أي اسم تريده)
   - **Description**: `Books Demo Page - Islamic Library`
   - **Visibility**: اختر Public أو Private
   - **لا** تضع علامة على "Initialize with README" (لأننا لدينا ملفات بالفعل)
4. اضغط **"Create repository"**

### 2. ربط المشروع المحلي بـ GitHub

بعد إنشاء المستودع، GitHub سيعطيك أوامر. استخدم هذه الأوامر:

```bash
cd Books-Demo-Page

# أضف المستودع البعيد (استبدل YOUR_USERNAME و REPO_NAME بالقيم الصحيحة)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# غير اسم الفرع إلى main (إذا كان GitHub يستخدم main)
git branch -M main

# ارفع الكود
git push -u origin main
```

**ملاحظة**: قد يطلب منك GitHub اسم المستخدم وكلمة المرور (أو Personal Access Token)

---

## خطوات النشر على Vercel

### الطريقة 1: من خلال GitHub (الأسهل)

1. اذهب إلى [Vercel.com](https://vercel.com)
2. سجّل الدخول بحساب GitHub
3. اضغط **"Add New Project"**
4. اختر المستودع `books-demo-page` من قائمة المستودعات
5. Vercel سيكتشف تلقائياً أنه مشروع Next.js
6. اضغط **"Deploy"**
7. انتظر حتى يكتمل البناء (عادة 1-2 دقيقة)
8. ستحصل على رابط مثل: `https://books-demo-page.vercel.app`

### الطريقة 2: من خلال Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# من داخل مجلد المشروع
cd Books-Demo-Page

# تشغيل الأمر
vercel

# اتبع التعليمات:
# - اضغط Enter للربط بحساب Vercel
# - اضغط Enter لاستخدام المشروع الحالي
# - اضغط Enter للاستخدام الافتراضي
```

---

## إعدادات مهمة في Vercel

### Port Configuration
المشروع مضبوط على المنفذ 3004 محلياً، لكن Vercel يستخدم المنفذ الافتراضي تلقائياً.

### Environment Variables
إذا كنت تستخدم متغيرات بيئة، أضفها من:
**Settings → Environment Variables**

### Custom Domain
لإضافة نطاق مخصص:
1. اذهب إلى **Settings → Domains**
2. أضف النطاق الخاص بك
3. اتبع التعليمات لتحديث DNS

---

## تحديثات لاحقة

بعد أي تغييرات في الكود:

```bash
cd Books-Demo-Page

# أضف التغييرات
git add .

# احفظ التغييرات
git commit -m "وصف التغييرات"

# ارفع على GitHub
git push

# Vercel سيبني ويحدث الموقع تلقائياً!
```

---

## ملاحظات

- ✅ Vercel يبني المشروع تلقائياً عند كل push على GitHub
- ✅ لا حاجة لإعدادات خاصة - Vercel يدعم Next.js تلقائياً
- ✅ المشروع يعمل على HTTPS تلقائياً
- ✅ يمكنك إضافة نطاق مخصص مجاناً

