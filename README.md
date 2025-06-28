# A2 Developers 

A modern full-stack web application built with React, Node.js, and PostgreSQL, featuring a responsive design with video backgrounds and contact management system.




## 🛠️ Tech Stack

| Frontend | Backend | Database | DevOps |
|----------|---------|----------|--------|
| React 19 | Node.js | PostgreSQL | Docker |
| TailwindCSS | Express.js | Prisma ORM | Docker Compose |
| Vite | Helmet | - | Nginx |

## ⚡ Quick Start

### 🐳 Docker Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd assignment

# Start all services
docker compose up --build -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Database: localhost:5432
```

### 💻 Local Development

#### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

#### Setup Steps

1. **Clone & Install**
```bash
git clone <repository-url>
cd assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. **Database Setup**
```bash
# Start PostgreSQL (or use Docker)
docker run --name postgres -e POSTGRES_PASSWORD=postgres123 -p 5432:5432 -d postgres:15

# Setup database
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm run db:generate
npm run db:push
```

3. **Start Services**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
assignment/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── config/        # Configuration
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend container
│   └── nginx.conf         # Nginx configuration
├── backend/               # Node.js API
│   ├── controllers/       # Business logic
│   ├── routes/           # API routes
│   ├── prisma/           # Database schema
│   └── Dockerfile        # Backend container
├── docker-compose.yml    # Multi-service orchestration
└── README.md            # Documentation
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contacts` | Create new contact |
| `GET` | `/api/contacts` | Get all contacts (paginated) |
| `GET` | `/api/contacts/:id` | Get contact by ID |
| `PUT` | `/api/contacts/:id` | Update contact |
| `DELETE` | `/api/contacts/:id` | Delete contact |
| `GET` | `/api/health` | Health check |

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend
```bash
npm run dev          # Start with nodemon
npm run start        # Production start
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Run database migrations
```

### Docker
```bash
docker compose up -d              # Start all services
docker compose down               # Stop all services
docker compose logs -f            # View logs
docker compose ps                 # Check status
```

## 🚀 Deployment

The application is fully containerized and ready for deployment on any Docker-compatible platform:

- **Development**: `docker compose up --build -d`
- **Production**: Update environment variables and deploy with Docker Compose
- **Cloud**: Compatible with AWS ECS, Google Cloud Run, Azure Container Instances

## 📱 Mobile Support

- Responsive design with mobile-first approach
- Touch-friendly interface
- Optimized performance on mobile devices
- Progressive Web App features

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Input Validation**: Server-side validation with express-validator
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Environment Variables**: Sensitive data protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Kartikey Katyal**

- 🔗 LinkedIn: [kartikey-katyal-164870239](https://www.linkedin.com/in/kartikey-katyal-164870239/)
- 🐙 GitHub: [KARTIKEY-KATYAL](https://github.com/KARTIKEY-KATYAL)
- 📧 Email: [Contact via LinkedIn](https://www.linkedin.com/in/kartikey-katyal-164870239/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

Built with ❤️ using React, Node.js, PostgreSQL, and Docker