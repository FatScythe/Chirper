## Chirper

![Chirper](/image/Chirper.png "Chirper")
#### Description:  Real-time chat web application, built with the PERN stack. Users can create chat with other users, get real time feedback such as if other chat particpant is typing, sent a message, editted a message, deleted a message, or left the chat.
___

### ✨ Built With:
1. React TypeScript
2. Context API
3. Tailwind
4. Vite
5. NodeJS
6. ExpressJs
7. PostgresSQL
8. Sequellize
9. SocketIO
___

### 📚 Getting Started

#### 🛠️ Installation
1. Clone the project or download zip file
2. Navigate to the project directory
   ```bash
   cd Chirper
   ```
3. Navigate to the respective client and server directory
   ```bash
   cd client
   ```
   ```bash
   cd .
   ```
4. Install dependencies with ``` npm install ```
5. Use ```.env_sample``` to configure the ```.env``` 
6. Run ```npm run dev ``` in the client directory and server directory
> NB: In client directory ``` vite.config.ts ```, it's been proxied to localhost:5000, change depending on backend PORT number
   
### Client Side
1. Pages - 3
2. Icons - 10
3. Components - >= 10 

### Server Side / API
#### NB:
1. "*" -- compulsory field
2. "?" -- optional field
### Authentication
Authentication is enabled in this app using JWT and cookies.
Token is sent with each request, that requires authentication and it's verified on the server.

1. Endpoint to register user
```JSON
POST: {{DOMAIN}}/api/v1/auth/register
{
    "name" *: "your name",
    "email" *: "youremail@something.com",
    "password" *: "yourpassword"
}
```
2. Endpoint to login user
```JSON
POST: {{DOMAIN}}/api/v1/auth/login
{
   "email" *: "your email",
   "password" *: "uour password",
}
```
3. Endpoint to logout
```JSON
GET:{{DOMAIN}} /api/v1/auth/logout
    {}
```

### Users
1. Endpoint to get users
```JSON
GET: {{DOMAIN}}/api/v1/user/users/:username
NB: :id represent a string for the username, get alls user that starts with the username
    {}
```
2. Endpoint to show current user
```JSON
GET: {{DOMAIN}}/api/v1/user/showMe
    {}
```

### Chat
1. Endpoint to get create chat
```JSON
POST: {{DOMAIN}}/api/v1/chat
{   
    "name" ?: "Chat Name"(Required for groups only),    
    "chatType" *: "private | group",   
    "membersIDs" *: "[Array of chat participant user id]"
}
```
2. Endpoint to get my chats: Get all the current user chats
```JSON
GET: {{DOMAIN}}/api/v1/chat
    {}
```
3. Endpoint to get single chat
```JSON
GET: {{DOMAIN}}/api/v1/chat/:chatId
    {}
```
4. Endpoint to delete chat
```JSON
DELETE: {{DOMAIN}}/api/v1/chat/:chatId
    {}
```
5. Endpoint to add group member
```JSON
PATCH: {{DOMAIN}}/api/v1/chat/add
{
    "chatId" *: "Chat ID",    
    "memberId" ?: "Chat participant ID"
}
```
6. Endpoint to for group member to leave chat
```JSON
PATCH: {{DOMAIN}}/api/v1/chat/leave
{
    "chatId" *: "Chat ID",    
}
```

### Message
1. Endpoint to get create message
```JSON
POST: {{DOMAIN}}/api/v1/message
{   
    "text" *: "Message...",    
    "chatId" *: "Chat Id",
}
```

2. Endpoint to edit message
```JSON
PATCH: {{DOMAIN}}/api/v1/message/chatId
    {
        "text": "New Message..."
    }
```

3. Endpoint to delete message
```JSON
DELETE: {{DOMAIN}}/api/v1/message/chatId
    {}
```
#### Future Feature
1. Add new user to group on the client side
2. Search for chats and messages