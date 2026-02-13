# 🚀 How to Host Your Node.js App on cPanel (Git + Terminal)

Deploying a Node.js application to cPanel using Git and the Terminal is a robust workflow.

## 🔥 Prerequisites

1.  **Git Repository**: Your code must be pushed to a remote repository (GitHub, GitLab, Bitbucket).
2.  **SSH Access**: Your cPanel account must have SSH enabled (check "Terminal" in dashboard).
3.  **Node.js Selector**: Ensure "Setup Node.js App" is available in cPanel.

## Step 1: Prepare Your Database (cPanel GUI)

1.  Log into cPanel.
2.  Go to **MySQL® Databases**.
3.  **Create a New Database** (e.g., `yourusername_ems_db`).
4.  **Create a New User** (e.g., `yourusername_ems_user`) and generate a strong password.
5.  **Add User to Database**: Scroll down to "Add User to Database", select the user and database. Click "Add" and **Grant All Privileges**.
6.  Go to **phpMyAdmin**, select your new database, click **Import**, and upload `sql/schema.sql`.

## Step 2: Clone Code via Terminal

1.  Open **Terminal** in your cPanel dashboard.
2.  Navigate to where you want the app (usually outside accessing public_html for security):
    ```bash
    cd ~
    # This goes to /home/yourusername/
    ```
3.  Clone your repository:

    ```bash
    git clone https://github.com/yourusername/ems_api.git
    cd ems_api
    ```

    - _Note:_ If your repo is Private, you must setup SSH keys in "SSH Access" -> "Manage Keys" and add the public key to GitHub.

## Step 3: Configure Node.js Environment

1.  Go to **"Setup Node.js App"** in cPanel.
2.  Click **Create Application**.
3.  **Node.js Version**: Select the latest stable version (e.g., 20.x).
4.  **Application Mode**: Select **Production**.
5.  **Application Root**: Enter the path to your cloned folder (e.g., `ems_api`).
6.  **Application URL**: Select your domain/subdomain.
7.  **Application Startup File**: Enter `src/server.js`.
8.  Click **Create**.

## Step 4: Install Dependencies & Build

1.  Once the app is created, copy the "Command to enter to virtual environment" shown at the top of the page. It looks like:
    ```bash
    source /home/user/nodevenv/ems_api/20/bin/activate && cd /home/user/ems_api
    ```
2.  Paste that command into your **Terminal**.
3.  Now run:
    ```bash
    npm install
    ```

## Step 5: Configure Environment Variables (.env)

1.  In the Terminal (inside your app folder), create the `.env` file:
    ```bash
    nano .env
    ```
2.  Paste your production configuration:
    ```env
    DB_HOST=localhost
    DB_USER=yourusername_ems_user
    DB_PASSWORD=your_strong_password
    DB_NAME=yourusername_ems_db
    JWT_SECRET=complex_secret_key_here
    PORT=3000
    NODE_ENV=production
    ```
3.  Press `Ctrl+O` (Enter) into save, then `Ctrl+X` to exit.

## Step 6: Start the Application

1.  Go back to **"Setup Node.js App"** in cPanel.
2.  Click the **Restart Application** button.
3.  Visit your URL to test!

## Maintenance: How to Update

When you make changes locally and push to GitHub:

1.  Open cPanel Terminal.
2.  Enter the virtual environment (command from Step 4.1).
3.  Run:
    ```bash
    git pull origin main
    npm install  # Only if you added new packages
    ```
4.  Restart the app in cPanel so the new code takes effect.
