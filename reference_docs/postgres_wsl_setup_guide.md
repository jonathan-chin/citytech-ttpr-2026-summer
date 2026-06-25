# PostgreSQL WSL Setup Guide (for pgAdmin on Windows)

This guide walks you through installing PostgreSQL inside WSL (Windows Subsystem for Linux) and connecting it to pgAdmin on Windows. No prior Linux experience needed.

---

## Step 1: Install PostgreSQL

Open your WSL terminal and run:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

Once the install finishes, start the PostgreSQL service (it doesn't always start automatically):

```bash
sudo service postgresql start
```

Confirm it installed correctly by checking the version:

```bash
psql --version
```

You should see something like `psql (PostgreSQL) 14.x` or similar.

---

## Step 2: Set Up the Postgres User Password

Log into the PostgreSQL shell as the default `postgres` user:

```bash
sudo -u postgres psql
```

You should see a `postgres=#` prompt. Run this command to verify everything is working:

```
\du
```

This lists all your users. If you see a table of users, you're good.

Now set a password for the `postgres` user. **Replace `your_password_here` with whatever password you want to use:**

```sql
ALTER USER postgres WITH PASSWORD 'your_password_here';
```

> **Tip:** Use the same password you use for your `sudo` commands to keep things simple.

When you're done, exit the PostgreSQL shell:

```
\q
```

---

## Step 3: Find Your Config File Paths

You need to edit two config files. First, find where they are:

```bash
sudo -u postgres psql -c "SHOW config_file;"
```

This will output a path that looks something like:

```
/etc/postgresql/14/main/postgresql.conf
```

Your two config files are in the same folder. Write down both of these paths (your version number may differ):

- **postgresql.conf** -- `/etc/postgresql/14/main/postgresql.conf`
- **pg_hba.conf** -- `/etc/postgresql/14/main/pg_hba.conf`

---

## Step 4: Edit postgresql.conf

You need to change one setting in this file: tell PostgreSQL to listen for connections from any address, not just `localhost`.

Pick **one** of the three editing options below (whichever you're most comfortable with):

### Option A: Using Nano (in the terminal)

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

- Use the arrow keys to scroll down until you find the line that says `#listen_addresses = 'localhost'`
- Remove the `#` at the beginning and change `localhost` to `*`
- The line should now read: `listen_addresses = '*'`
- Press `Ctrl + O` then `Enter` to save
- Press `Ctrl + X` to exit

### Option B: Using VS Code

If you have VS Code installed with the WSL extension, you can open the file in a full editor:

```bash
sudo code /etc/postgresql/14/main/postgresql.conf --no-sandbox --user-data-dir=/tmp/vscode-root
```

> **Note:** If `code` doesn't work, you may need to install the "Remote - WSL" extension in VS Code first. Open VS Code on Windows, go to Extensions (Ctrl+Shift+X), search for "WSL", and install it. Then restart your WSL terminal and try again.

- Use `Ctrl + F` to search for `listen_addresses`
- Remove the `#` at the beginning and change `localhost` to `*`
- The line should now read: `listen_addresses = '*'`
- Press `Ctrl + S` to save, then close the file

### Option C: Using Notepad (Windows)

You can copy the file to your Windows desktop, edit it in Notepad, then copy it back:

```bash
# Copy the file to your Windows desktop (replace YourWindowsUsername with your actual username)
sudo cp /etc/postgresql/14/main/postgresql.conf /mnt/c/Users/YourWindowsUsername/Desktop/postgresql.conf
```

Now open the file from your Windows desktop with Notepad (or any text editor). Use `Ctrl + F` to find `listen_addresses`, make the same edit as above, then save and close. Finally, copy the edited file back:

```bash
sudo cp /mnt/c/Users/YourWindowsUsername/Desktop/postgresql.conf /etc/postgresql/14/main/postgresql.conf
```

---

## Step 5: Edit pg_hba.conf

You need to add one line to the bottom of this file to allow connections from your Windows machine.

### Option A: Using Nano

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

- Scroll all the way to the bottom of the file
- Add this line at the very end:

```
host    all             all             0.0.0.0/0               scram-sha-256
```

- Press `Ctrl + O` then `Enter` to save
- Press `Ctrl + X` to exit

### Option B: Using VS Code

```bash
sudo code /etc/postgresql/14/main/pg_hba.conf --no-sandbox --user-data-dir=/tmp/vscode-root
```

- Scroll to the bottom and add this line at the very end:

```
host    all             all             0.0.0.0/0               scram-sha-256
```

- Press `Ctrl + S` to save, then close the file

### Option C: Using Notepad (Windows)

```bash
# Copy the file to your desktop
sudo cp /etc/postgresql/14/main/pg_hba.conf /mnt/c/Users/YourWindowsUsername/Desktop/pg_hba.conf
```

Open it from your desktop in Notepad, scroll to the bottom, and add this line at the very end:

```
host    all             all             0.0.0.0/0               scram-sha-256
```

Save and close, then copy it back:

```bash
sudo cp /mnt/c/Users/YourWindowsUsername/Desktop/pg_hba.conf /etc/postgresql/14/main/pg_hba.conf
```

### Option D: Skip the Editor Entirely

If you just want to append the line without opening any editor at all, run this single command:

```bash
echo "host    all             all             0.0.0.0/0               scram-sha-256" | sudo tee -a /etc/postgresql/14/main/pg_hba.conf
```

---

## Step 6: Restart PostgreSQL

After editing both config files, restart PostgreSQL so the changes take effect:

```bash
sudo service postgresql restart
```

---

## Step 7: Get Your WSL IP Address

pgAdmin on Windows needs to know the IP address of your WSL instance. Run this in your WSL terminal:

```bash
hostname -I (this is an upper i incase your font makes it hard to tell.)
```

Copy the first IP address from the output (it will look something like `172.21.47.255`).

> **Heads up:** This IP address can change every time you restart WSL. If pgAdmin stops connecting later, come back and run this command again to get the new IP.

---

## Step 8: Connect pgAdmin to WSL

1. Open **pgAdmin** on Windows
2. In the left sidebar, find your server
3. Right-click the server and choose **Disconnect Server**
4. Right-click the server again and choose **Properties**
5. Go to the **Connection** tab
6. Change the **Host name/address** to the IP address you copied in Step 7
7. Make sure the **Password** matches what you set in Step 2
8. Click **Save**

You should now be connected to your PostgreSQL instance running in WSL.

---

## Quick Reference: Commands You'll Use Often

| What you want to do                  | Command                            |
| ------------------------------------ | ---------------------------------- |
| Start PostgreSQL                     | `sudo service postgresql start`    |
| Stop PostgreSQL                      | `sudo service postgresql stop`     |
| Restart PostgreSQL                   | `sudo service postgresql restart`  |
| Check if PostgreSQL is running       | `sudo service postgresql status`   |
| Open the PostgreSQL shell            | `sudo -u postgres psql`           |
| Get your WSL IP (for pgAdmin)        | `hostname -I`                      |
