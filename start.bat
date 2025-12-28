@echo off
echo Starting CipherSQLStudio...
start "CipherSQL Server" cmd /k "cd server && npm start"
start "CipherSQL Client" cmd /k "cd client && npm run dev"
echo Both services started in separate windows.
