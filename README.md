
# Task Manager App

**Task Manager App** is a simple yet powerful task management system built using **Vue.js** and **Laravel**. It allows authenticated users to manage task lists and individual tasks with intuitive drag-and-drop functionality.

## 🗂️ Project Structure

The project is divided into two main folders:

- **`task-manager-app-laravel/`** – Laravel Backend (API and authentication using Sanctum)
- **`task-manager-app-vue/`** – Vue Frontend (drag-and-drop UI and task views)

The Vue frontend is compiled and placed inside the Laravel `public/` directory for seamless integration.

---

## ⚙️ Features

- ✅ User Authentication (via Laravel Sanctum)  
- ➕ Add Task Lists  
- 📝 Add and Edit Tasks  
- 🔁 Drag-and-Drop Reordering of Tasks  
- ❌ Delete Tasks  
- 🔐 Secure API with Laravel Sanctum

---

## 📁 Laravel Backend: `task-manager-app-laravel/`

This is the backend API built with Laravel.

### Setup

1. Navigate to the Laravel backend:

   ```bash
   cd task-manager-app-laravel
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Configure the `.env` file:
   - Set up your **database** connection
   - Set `APP_URL=http://127.0.0.1:8000`
   - Ensure `SANCTUM_STATEFUL_DOMAINS=localhost:5173` for development

4. Install PHP dependencies:

   ```bash
   composer install
   ```

5. Generate the application key and run migrations:

   ```bash
   php artisan key:generate
   php artisan migrate
   ```

6. Install Sanctum and publish config:

   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

7. Serve the Laravel app:

   ```bash
   php artisan serve
   ```

---

## 🖼️ Vue Frontend: `task-manager-app-vue/`

This is the frontend built using Vue 3 and supports drag-and-drop task management.

### Setup

1. Navigate to the Vue frontend:

   ```bash
   cd task-manager-app-vue
   ```

2. Install JavaScript dependencies:

   ```bash
   npm install
   ```

3. Build the app to generate production-ready files:

   ```bash
   npm run build
   ```

4. After building, copy the contents of the `dist/` folder into the Laravel `public/` directory:

   ```bash
   cp -r dist/* ../task-manager-app-laravel/public/
   ```

---

## 🚀 Running the App

1. Start the Laravel server:

   ```bash
   php artisan serve
   ```

2. Visit:

   ```
   http://127.0.0.1:8000
   ```

   You will see the Vue frontend served by Laravel.

3. To use the app in **development mode**, run the Vue development server:

   ```bash
   cd task-manager-app-vue
   npm run dev
   ```

   Then access:

   ```
   http://localhost:5173
   ```

   Ensure the frontend API requests target the Laravel backend (e.g., `http://127.0.0.1:8000/api/...`), which can be configured in your `.env` or `axios` setup.

---

## 📜 License

This project is licensed under the MIT License.
