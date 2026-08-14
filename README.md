# 💬 Messenger API V1

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, secure, and scalable REST API for real-time chat applications**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Docs](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 🚀 Features

- ✅ **JWT Authentication** - Secure token-based authentication with 1-hour expiry
- ✅ **Real-time Messaging** - Send and receive messages instantly
- ✅ **Conversation Management** - View all conversations with user details
- ✅ **Secure Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Clean Architecture** - Service/Controller/Route pattern with async/await
- ✅ **Input Validation** - Comprehensive validation on all endpoints
- ✅ **Error Handling** - Structured error responses
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Environment Configuration** - Secure environment variable management

---

## 🛠️ Tech Stack

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### **Database**
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![mysql2](https://img.shields.io/badge/mysql2-Driver-blue?style=flat)

### **Authentication & Security**
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-green?style=flat)
![CORS](https://img.shields.io/badge/CORS-Enabled-blue?style=flat)

### **Development Tools**
![Nodemon](https://img.shields.io/badge/Nodemon-Development-blue?style=flat&logo=nodemon)
![dotenv](https://img.shields.io/badge/dotenv-Environment-green?style=flat)

---

## 📋 Requirements

```
✓ Node.js v18 or higher
✓ npm v9 or higher
✓ MySQL 8.0 or higher
```

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mehrshd/messenger-api-v1.git
cd messenger-api-v1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=chat_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=1h
NODE_ENV=development
SIGNATURE_KEY=your_signature_key
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

---

## 🌐 API Endpoints

### **Authentication**

```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

---

### **Messaging**

**Send Message:**
```http
POST /sendMessage
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "receiver_id": 2,
  "content": "Hello! How are you?"
}
```

**Get Conversations:**
```http
GET /conversation
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "conversations": [
    {
      "id": 1,
      "user1_id": 1,
      "user2_id": 2,
      "last_message": "Hello!",
      "created_at": "2026-08-14T12:00:00Z"
    }
  ]
}
```

---

### **Account Management**

**Update Password:**
```http
POST /updatePassword
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Get Profile:**
```http
GET /profile
Authorization: Bearer YOUR_TOKEN
```

---

## 📁 Project Structure

```
messenger-api-v1/
├── src/
│   ├── server.js                     # Entry point
│   ├── app.js                        # Express configuration
│   ├── db.js                         # Database connection
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT verification
│   ├── routes/
│   │   ├── users/
│   │   │   ├── auth/                 # Login routes
│   │   │   ├── updatePassword/       # Password management
│   │   │   └── profile/              # User profile
│   │   └── chats/
│   │       ├── messages/             # Message routes
│   │       └── Conversation/         # Conversation routes
│   ├── controllers/
│   │   ├── messageController.js
│   │   ├── conversationController.js
│   │   └── updatePasswordController.js
│   └── services/
│       ├── messageService.js
│       ├── conversationService.js
│       └── updatePasswordService.js
├── .env.example                      # Environment template
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Conversations Table
```sql
CREATE TABLE conversations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id),
  FOREIGN KEY (user2_id) REFERENCES users(id),
  UNIQUE KEY unique_conversation (user1_id, user2_id)
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
```

---

## 🔒 Security Features

| Feature | Implementation |
|---------|-----------------|
| **Password Hashing** | bcrypt with 10 salt rounds |
| **Token Authentication** | JWT with 1-hour expiry |
| **CORS Protection** | Enabled and configured |
| **Input Validation** | All endpoints validated |
| **Code Signature** | Encrypted author verification |
| **Environment Security** | Variables stored in .env |

---

## 🧪 Testing

Use **Postman** or **cURL** to test endpoints:

```bash
# Test Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Conversations (requires token)
curl -X GET http://localhost:3000/conversation \
  -H "Authorization: Bearer YOUR_TOKEN"

# Send Message (requires token)
curl -X POST http://localhost:3000/sendMessage \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"receiver_id":2,"content":"Hello!"}'
```

---

## 🐛 Known Issues & Roadmap

### Known Issues
- ⚠️ Plaintext passwords supported for backward compatibility (migrate to bcrypt-hashed)
- ⚠️ Fixed token expiry (consider implementing refresh tokens)
- ⚠️ No rate limiting (recommended for production)

### Roadmap
- [ ] Input validation middleware layer
- [ ] Rate limiting implementation
- [ ] Unit & integration tests
- [ ] Swagger API documentation
- [ ] Message search functionality
- [ ] Message deletion feature
- [ ] WebSocket real-time updates
- [ ] File upload support
- [ ] Redis caching layer
- [ ] Docker containerization

---

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**mehrshd**

- 🐙 GitHub: [@mehrshd](https://github.com/mehrshd)
- 💼 Portfolio: [mehrshd.com](https://github.com/mehrshd)

---

## 🙋 Support

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/mehrshd/messenger-api-v1/issues)
2. Create a new [Issue](https://github.com/mehrshd/messenger-api-v1/issues/new)
3. Join discussions in [Discussions](https://github.com/mehrshd/messenger-api-v1/discussions)

---

<div align="center">

**Built with ❤️ using Node.js and Express**

⭐ If you found this helpful, please consider giving it a star!

</div>
