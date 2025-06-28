# A2 Developers - Full Stack Assignment

A modern, full-stack web application showcasing a unified data platform solution with React frontend, Node.js/Express backend, and PostgreSQL database integration.

## 🌟 Features

### Frontend Features
- **Modern React Application** with functional components and hooks
- **Responsive Design** with TailwindCSS
- **Video Background** with smooth transitions between multiple videos
- **Interactive Contact Form** with real-time validation
- **Dynamic Header Layout** with horizontal contact info alignment
- **Mobile-First Design** with hamburger menu and touch-friendly interface
- **Accessibility Features** including keyboard navigation and screen reader support
- **Smooth Animations** and micro-interactions for enhanced UX

### Backend Features
- **RESTful API** built with Express.js
- **PostgreSQL Database** integration with Prisma ORM
- **Input Validation** with express-validator
- **Security Features** including CORS, Helmet, and SQL injection prevention
- **Email Uniqueness** validation
- **Error Handling** with detailed error messages
- **API Documentation** with comprehensive endpoint descriptions
- **Health Check** endpoint for monitoring

### Database Features
- **Dockerized PostgreSQL** for easy setup and deployment
- **Prisma ORM** for type-safe database operations
- **Database Migrations** and schema management
- **Contact Management** with full CRUD operations
- **Data Export** functionality (CSV format)
- **Statistics** and analytics endpoints

## 🏗️ Project Structure

```
assignment/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Header.jsx      # Navigation and contact info
│   │   │   ├── ContactForm.jsx # Contact form with API integration
│   │   │   └── Home.jsx        # Main landing page
│   │   ├── services/          # API service layer
│   │   │   └── api.js         # Backend API integration
│   │   ├── config/            # Configuration files
│   │   │   └── api.js         # API endpoints configuration
│   │   ├── App.jsx            # Main App component
│   │   ├── main.jsx           # React entry point
│   │   ├── App.css            # Custom styles and animations
│   │   └── index.css          # TailwindCSS imports
│   ├── public/                # Static assets
│   │   ├── logo.png           # Company logo
│   │   ├── 1.mp4, 2.mp4, 3.mp4 # Background videos
│   │   └── vite.svg           # Vite icon
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── index.html             # HTML template
│
├── backend/                    # Node.js/Express backend
│   ├── controllers/           # Business logic
│   │   └── contactController.js # Contact CRUD operations
│   ├── routes/                # API routes
│   │   └── contacts.js        # Contact routes with validation
│   ├── scripts/               # Utility scripts
│   │   ├── setup-db.js        # Database setup and seeding
│   │   └── test-db.js         # Database connection testing
│   ├── prisma/                # Database schema and migrations
│   │   └── schema.prisma      # Database schema definition
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   ├── docker-compose.yml     # PostgreSQL Docker setup
│   ├── init.sql               # Database initialization
│   ├── start-db.bat          # Windows database startup script
│   ├── start-db.sh           # Linux/Mac database startup script
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   └── README.md              # Backend documentation
│
├── start.bat                   # Windows full-stack startup script
├── start.sh                   # Linux/Mac full-stack startup script
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose** (recommended for database)
- **npm** package manager

### Option 1: Automated Setup (Recommended)

#### Windows:
```cmd
# Clone and navigate to project
cd assignment

# Run automated setup
start.bat
```

#### Linux/Mac:
```bash
# Clone and navigate to project
cd assignment

# Make script executable and run
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

#### 1. Database Setup
```bash
# Start PostgreSQL with Docker
cd backend
docker compose up -d postgres

# Or use the provided scripts
# Windows: start-db.bat
# Linux/Mac: ./start-db.sh
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials if needed

# Generate Prisma client and set up database
npm run db:generate
npm run db:push

# Test database connection
node scripts/test-db.js

# Start backend server
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Application URLs

Once running, access the application at:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Database**: localhost:5433 (PostgreSQL)

## 🔧 Configuration

### Environment Variables

The backend uses the following environment variables (see `.env.example`):

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/assignment_db?schema=public"
FRONTEND_URL=http://localhost:5173
```

### Database Configuration

- **Host**: localhost
- **Port**: 5433 (to avoid conflicts with local PostgreSQL)
- **Database**: assignment_db
- **Username**: postgres
- **Password**: postgres123

## 📊 API Endpoints

### Contact Management
- `POST /api/contacts` - Create new contact
- `GET /api/contacts` - Get all contacts (with pagination)
- `GET /api/contacts/:id` - Get specific contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `POST /api/contacts/bulk-delete` - Delete multiple contacts
- `GET /api/contacts/stats` - Get contact statistics
- `GET /api/contacts/export` - Export contacts as CSV

### System
- `GET /api/health` - API health check

### Example API Usage

```javascript
// Create a new contact
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "institution": "Example University",
  "requirements": "Web development services"
}
```

## 🎨 Design Features

### Header Layout
- **Responsive Design**: Adapts to different screen sizes
- **Contact Information**: Phone and email displayed horizontally
- **Call-to-Action**: "Book A Demo" button prominently positioned
- **Mobile Menu**: Hamburger menu for mobile devices

### Hero Section
- **Video Background**: Rotating background videos (3-second intervals)
- **Smooth Transitions**: Fade effects between video changes
- **Responsive Typography**: Scales appropriately on all devices
- **Loading States**: Elegant loading indicators

### Contact Form
- **Modal Interface**: Slides in from the right
- **Real-time Validation**: Immediate feedback on form inputs
- **API Integration**: Direct connection to backend services
- **Error Handling**: User-friendly error messages
- **Success States**: Clear confirmation of successful submissions

## 🔒 Security Features

- **CORS Protection**: Configured for specific origins
- **Helmet Security**: HTTP security headers
- **Input Validation**: Server-side validation with express-validator
- **SQL Injection Prevention**: Prisma ORM provides protection
- **Email Uniqueness**: Prevents duplicate registrations
- **Error Handling**: Sanitized error messages in production

## 🧪 Testing

### Database Connection Test
```bash
cd backend
node scripts/test-db.js
```

### API Health Check
```bash
curl http://localhost:5000/api/health
```

### Frontend Build Test
```bash
cd frontend
npm run build
```

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- **Mobile-first design** approach
- **Touch-friendly interfaces**
- **Optimized performance** for mobile devices
- **Responsive typography** and spacing
- **Mobile-specific navigation** patterns

## 🐳 Docker Support

The project includes Docker support for the PostgreSQL database:

```bash
# Start database
docker compose up -d postgres

# Check status
docker compose ps

# View logs
docker compose logs postgres

# Stop database
docker compose down
```

## 🚀 Production Deployment

### Frontend (Vite Build)
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend (Node.js)
```bash
cd backend
npm start
# Ensure NODE_ENV=production
# Use PM2 or similar for process management
```

### Database
- Use managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
- Update DATABASE_URL in production environment
- Run database migrations: `npm run db:migrate`

## 🛠️ Development Scripts

### Root Level
- `start.bat` / `start.sh` - Full stack startup scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:setup` - Setup and test database
- `npm run db:seed` - Seed database with test data

## 🎯 Key Achievements

### Frontend Enhancements
✅ **Component Refactoring**: Separated Header and ContactForm into reusable components  
✅ **Dynamic Background**: Implemented rotating video backgrounds with smooth transitions  
✅ **Header Alignment**: Positioned contact details horizontally in line with "Book A Demo" button  
✅ **Responsive Design**: Mobile-first approach with touch-friendly interfaces  
✅ **Form Integration**: Connected contact form to backend API with error handling  

### Backend Development
✅ **RESTful API**: Complete CRUD operations for contact management  
✅ **Database Integration**: PostgreSQL with Prisma ORM  
✅ **Input Validation**: Comprehensive validation with express-validator  
✅ **Error Handling**: Robust error handling with user-friendly messages  
✅ **Security**: CORS, Helmet, and SQL injection protection  
✅ **Docker Support**: Containerized PostgreSQL database  

### DevOps & Setup
✅ **Automated Scripts**: One-click setup for Windows and Linux/Mac  
✅ **Environment Configuration**: Comprehensive .env setup  
✅ **Documentation**: Detailed setup and usage instructions  
✅ **Testing Tools**: Database connection and API health checks  

## 📞 Contact Information

For questions about this project, please contact:
- **Phone**: +91 83038 37930
- **Email**: contactus@a2developers.org

## 📄 License

This project is for assignment purposes and demonstration of full-stack development capabilities.

---

**Built with ❤️ by A2 Developers Team**
