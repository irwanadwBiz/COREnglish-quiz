# 📚 COREnglish Quiz API

A backend service for managing COREnglish quiz data using [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), and PostgreSQL.

---

## 🚀 How to Run the Project from Scratch

### 1️⃣ Follow All Steps in Order
```bash
# Clone the repository
git clone git@github.com:irwanadwBiz/COREnglish-quiz.git
cd COREnglish-quiz

# Install dependencies
npm install

# Create .env file
cat <<EOF > .env
DATABASE_HOST=DB_HOST
DATABASE_PORT=DB_PORT
DATABASE_USER=DB_USER
DATABASE_PASSWORD=DB_PASSWORD
DATABASE_NAME=DB_NAME

NODE_ENV=development
PORT=3000
EOF

# Run PostgreSQL using Docker
docker run -d \
  --name core-english-db \
  -e POSTGRES_USER=DB_USER \
  -e POSTGRES_PASSWORD=DB_PASSWORD \
  -e POSTGRES_DB=DB_NAME \
  -p 5432:5432 \
  postgres:14

# Generate migration (change name as needed)
npm run migration:generate --name=create-task-schema

# Run migration
npm run mr

# Revert Migration
npm run mrv

# Run tests
npm run test

# Run the application (development mode)
npm run start:dev

# For production
npm run build
npm run start:prod