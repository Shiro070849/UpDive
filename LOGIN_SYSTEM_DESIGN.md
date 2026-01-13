# 🎯 ระบบ Login - แผนการออกแบบ (Design Plan)

## 📋 สารบัญ
1. [ภาพรวมระบบ](#ภาพรวมระบบ)
2. [สถาปัตยกรรม Backend](#สถาปัตยกรรม-backend)
3. [สถาปัตยกรรม Frontend](#สถาปัตยกรรม-frontend)
4. [Flow การทำงาน](#flow-การทำงาน)
5. [โครงสร้างไฟล์](#โครงสร้างไฟล์)
6. [Hardcoded Data (ชั่วคราว)](#hardcoded-data-ชั่วคราว)
7. [Database Schema (อนาคต)](#database-schema-อนาคต)

---

## 🎨 ภาพรวมระบบ

### ระบบ Authentication ที่จะสร้าง:
- ✅ Login ด้วย Username/Password
- ✅ JWT Token สำหรับ Authentication
- ✅ Protected Routes (Frontend + Backend)
- ✅ Session Management ด้วย Pinia Store
- ✅ Auto-logout เมื่อ Token หมดอายุ
- 🔄 Hardcoded Users (ชั่วคราว) → พร้อมเปลี่ยนเป็น Database

---

## 🖥️ สถาปัตยกรรม Backend

### 1. **Dependencies ที่ต้องติดตั้ง:**
```json
{
  "jsonwebtoken": "^9.0.0",    // สำหรับสร้าง JWT token
  "bcryptjs": "^2.4.3"         // สำหรับ hash password (เตรียมไว้สำหรับ DB)
}
```

### 2. **โครงสร้าง Backend:**

```
backend/
├── services/
│   └── auth.service.js        # Business logic: login, verify token, hash password
├── controllers/
│   └── auth.controller.js     # ✅ มีอยู่แล้ว (แต่เป็น Google OAuth) → จะเพิ่ม Login
├── routes/
│   └── auth.routes.js         # ✅ มีอยู่แล้ว → จะเพิ่ม POST /api/auth/login
├── middleware/
│   └── auth.middleware.js     # 🆕 ตรวจสอบ JWT token สำหรับ protected routes
└── utils/
    └── jwt.utils.js           # 🆕 Helper functions สำหรับ JWT
```

### 3. **API Endpoints:**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login และรับ JWT token | ❌ |
| POST | `/api/auth/logout` | Logout (optional) | ✅ |
| GET | `/api/auth/me` | ดูข้อมูล user ปัจจุบัน | ✅ |
| GET | `/api/auth/verify` | ตรวจสอบว่า token ยังใช้ได้ | ✅ |

### 4. **Response Format:**

**Login Success:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

**Login Error:**
```json
{
  "success": false,
  "message": "Invalid username or password",
  "error": "AUTH_ERROR"
}
```

### 5. **Hardcoded Users (ชั่วคราว):**

```javascript
// backend/services/auth.service.js
const HARDCODED_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',  // จะ hash เมื่อมี DB
    email: 'admin@example.com',
    role: 'admin',
    name: 'Administrator'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    role: 'user',
    name: 'Regular User'
  }
];
```

---

## 🎨 สถาปัตยกรรม Frontend

### 1. **โครงสร้าง Frontend:**

```
frontend/src/
├── views/
│   └── LoginView.vue          # 🆕 หน้า Login
├── components/
│   └── LoginForm.vue          # 🆕 (optional) Component สำหรับฟอร์ม Login
├── stores/
│   └── auth.store.js          # 🆕 Pinia store สำหรับจัดการ auth state
├── services/
│   └── auth.service.js        # 🆕 API calls สำหรับ authentication
└── router/
    └── index.js               # ✅ มีอยู่แล้ว → จะเพิ่ม route guards
```

### 2. **Auth Store (Pinia):**

**State:**
```javascript
{
  user: null,              // ข้อมูล user ที่ login
  token: null,             // JWT token
  isAuthenticated: false,   // สถานะ login
  loading: false           // กำลัง login/logout
}
```

**Actions:**
- `login(username, password)` - Login
- `logout()` - Logout
- `checkAuth()` - ตรวจสอบ token จาก localStorage
- `fetchUser()` - ดึงข้อมูล user ปัจจุบัน

### 3. **Router Guards:**

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Routes ที่ต้อง login
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
```

### 4. **Routes:**

```javascript
{
  path: '/login',
  name: 'login',
  component: LoginView,
  meta: { requiresAuth: false }
},
{
  path: '/',
  name: 'home',
  component: HomeView,
  meta: { requiresAuth: true }  // ต้อง login
}
```

---

## 🔄 Flow การทำงาน

### **Login Flow:**

```
1. User กรอก username/password
   ↓
2. Frontend: auth.store.login(username, password)
   ↓
3. Frontend: auth.service.login() → POST /api/auth/login
   ↓
4. Backend: auth.controller.login()
   ↓
5. Backend: auth.service.authenticate() → ตรวจสอบ hardcoded users
   ↓
6. Backend: jwt.utils.generateToken() → สร้าง JWT
   ↓
7. Backend: ส่ง token + user data กลับ
   ↓
8. Frontend: เก็บ token ใน localStorage + Pinia store
   ↓
9. Frontend: Redirect ไปหน้า home หรือ redirect path
```

### **Protected Route Flow:**

```
1. User เข้าถึง protected route
   ↓
2. Router Guard ตรวจสอบ authStore.isAuthenticated
   ↓
3. ถ้าไม่ login → Redirect ไป /login
   ↓
4. ถ้า login → ตรวจสอบ token ยังใช้ได้ไหม
   ↓
5. ถ้า token หมดอายุ → Logout และ redirect
   ↓
6. ถ้า token ใช้ได้ → อนุญาตให้เข้าถึง
```

### **API Request Flow (with Token):**

```
1. Frontend: API call ผ่าน api.service.js
   ↓
2. Request Interceptor: เพิ่ม Authorization header
   ↓
3. Backend: auth.middleware.verifyToken()
   ↓
4. ถ้า token valid → อนุญาต request
   ↓
5. ถ้า token invalid → ส่ง 401 Unauthorized
   ↓
6. Frontend: Response Interceptor จับ 401 → Logout
```

---

## 📁 โครงสร้างไฟล์

### **Backend Files:**

#### `backend/services/auth.service.js`
```javascript
// Business logic สำหรับ authentication
- authenticate(username, password)  // ตรวจสอบ credentials
- findUserByUsername(username)      // หา user จาก hardcoded data
- generateToken(user)               // สร้าง JWT token
- verifyToken(token)                // ตรวจสอบ JWT token
```

#### `backend/utils/jwt.utils.js`
```javascript
// Helper functions สำหรับ JWT
- signToken(payload)                // สร้าง token
- verifyToken(token)                // ตรวจสอบ token
- decodeToken(token)                // decode token (ไม่ verify)
```

#### `backend/middleware/auth.middleware.js`
```javascript
// Middleware สำหรับ protect routes
- verifyToken(req, res, next)       // ตรวจสอบ token จาก header
```

#### `backend/controllers/auth.controller.js`
```javascript
// ✅ มีอยู่แล้ว → เพิ่ม:
- login(req, res)                   // POST /api/auth/login
- logout(req, res)                  // POST /api/auth/logout (optional)
- getMe(req, res)                   // GET /api/auth/me
- verifyToken(req, res)             // GET /api/auth/verify
```

#### `backend/routes/auth.routes.js`
```javascript
// ✅ มีอยู่แล้ว → เพิ่ม:
app.post('/api/auth/login', authController.login)
app.post('/api/auth/logout', authController.logout)
app.get('/api/auth/me', authMiddleware.verifyToken, authController.getMe)
app.get('/api/auth/verify', authController.verifyToken)
```

### **Frontend Files:**

#### `frontend/src/stores/auth.store.js`
```javascript
// Pinia store สำหรับ auth state management
```

#### `frontend/src/services/auth.service.js`
```javascript
// API calls สำหรับ authentication
- login(username, password)
- logout()
- getMe()
- verifyToken()
```

#### `frontend/src/views/LoginView.vue`
```javascript
// หน้า Login UI
```

---

## 💾 Hardcoded Data (ชั่วคราว)

### **Users:**
```javascript
const HARDCODED_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    role: 'admin',
    name: 'Administrator'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    role: 'user',
    name: 'Regular User'
  }
];
```

### **Migration Plan (เมื่อมี Database):**
1. สร้าง table `users` ตาม schema ด้านล่าง
2. Import hardcoded users เข้า database
3. แก้ไข `auth.service.js` ให้ query จาก database แทน hardcoded array
4. เพิ่ม password hashing ด้วย bcrypt

---

## 🗄️ Database Schema (อนาคต)

### **Table: users**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- bcrypt hashed
  role ENUM('admin', 'user') DEFAULT 'user',
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT TRUE
);
```

### **Table: refresh_tokens (Optional - สำหรับ refresh token)**
```sql
CREATE TABLE refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## ✅ Checklist การพัฒนา

### **Phase 1: Backend Setup**
- [ ] ติดตั้ง dependencies (jsonwebtoken, bcryptjs)
- [ ] สร้าง `backend/utils/jwt.utils.js`
- [ ] สร้าง `backend/services/auth.service.js` (hardcoded users)
- [ ] สร้าง `backend/middleware/auth.middleware.js`
- [ ] เพิ่ม login endpoint ใน `auth.controller.js`
- [ ] เพิ่ม routes ใน `auth.routes.js`
- [ ] ทดสอบ API ด้วย Postman/Thunder Client

### **Phase 2: Frontend Setup**
- [ ] สร้าง `frontend/src/stores/auth.store.js`
- [ ] สร้าง `frontend/src/services/auth.service.js`
- [ ] สร้าง `frontend/src/views/LoginView.vue`
- [ ] เพิ่ม route `/login` ใน router
- [ ] เพิ่ม router guards
- [ ] อัพเดท `api.service.js` ให้ใช้ token จาก auth store

### **Phase 3: Integration & Testing**
- [ ] ทดสอบ login flow
- [ ] ทดสอบ protected routes
- [ ] ทดสอบ token expiration
- [ ] ทดสอบ logout
- [ ] UI/UX improvements

### **Phase 4: Database Migration (อนาคต)**
- [ ] สร้าง database schema
- [ ] Migrate hardcoded users
- [ ] อัพเดท auth.service.js ให้ใช้ database
- [ ] เพิ่ม password hashing

---

## 🔐 Security Considerations

1. **JWT Secret:** เก็บใน `.env` file
2. **Token Expiration:** ตั้งค่า 24 ชั่วโมง (หรือตามต้องการ)
3. **Password:** เมื่อมี DB จะ hash ด้วย bcrypt
4. **Rate Limiting:** ใช้ express-rate-limit (มีอยู่แล้ว)
5. **HTTPS:** ใช้ใน production
6. **CORS:** ตั้งค่าให้ถูกต้อง (มีอยู่แล้ว)

---

## 📝 Notes

- ตอนนี้ใช้ hardcoded users แต่โครงสร้างพร้อมสำหรับ database
- Password ยังไม่ hash (จะ hash เมื่อมี database)
- JWT token เก็บใน localStorage (สามารถเปลี่ยนเป็น httpOnly cookie ได้)
- Router guards จะป้องกัน routes ที่ต้อง login
- API interceptor จะส่ง token อัตโนมัติ

---

**พร้อมเริ่มพัฒนาแล้ว! 🚀**


