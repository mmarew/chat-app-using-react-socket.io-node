### Chat Application with Socket.IO and React

This project is a real-time chat application built with **Socket.IO**, **React**, and **Node.js**. Users can join rooms, send messages, and interact in real-time with other users in the same room.

---

## Features

- **Real-Time Communication**: Built using **Socket.IO** for low-latency message transfer.
- **Room-Based Chat**: Users can join specific rooms and interact only with users in the same room.
- **Admin Messages**: The server can send admin messages, such as welcome messages and user activity notifications.
- **User Management**: Tracks connected users and provides real-time updates for room participants.
- **Responsive UI**: Built with React to ensure seamless and responsive user experience.
- **Error Handling**: Validates user inputs and manages errors effectively.

---

## Technologies Used

### Backend

- **Node.js**: Server-side runtime for handling requests and managing connections.
- **Express**: Lightweight web framework for routing.
- **Socket.IO**: Handles WebSocket communication for real-time chat.
- **Cors**: Enables cross-origin requests.
- **Custom Modules**:
  - `users.js`: Manages users joining, leaving, and retrieving room data.

### Frontend

- **React**: Provides a dynamic user interface.
- **Socket.IO Client**: Establishes real-time communication with the server.
- **CSS**: For styling components.
- **React Router**: Handles navigation and routes.

---

## Installation and Setup

### Prerequisites

- Node.js installed on your system.
- Basic knowledge of JavaScript and React.

### Steps to Run the Application

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Start the Backend Server**

   ```bash
   node index.js
   ```

   The backend server runs on `http://localhost:5000`.

4. **Install Frontend Dependencies**

   ```bash
   cd client
   npm install
   ```

5. **Start the Frontend**
   ```bash
   npm start
   ```
   The frontend runs on `http://localhost:3000`.

---

## Project Structure

### Backend (`/server`):

```
/server
├── index.js          # Main server file
├── users.js          # Manages user data for rooms
├── router.js         # Handles basic routes
```

### Frontend (`/client`):

```
/client
├── src
│   ├── components
│   │   ├── Chat       # Main chat page
│   │   ├── InfoBar    # Room info header
│   │   ├── Input      # Input for sending messages
│   │   ├── Messages   # Displays chat messages
│   │   ├── TextContainer # Displays active users in the room
│   ├── App.js         # App component with routing
│   ├── index.js       # Entry point for React
```

---

## Key Functionalities

### Backend

1. **Socket Connection**:

   - Listens for client connections and disconnections.
   - Emits messages and updates room data.

   ```javascript
   io.on("connection", (socket) => {
     console.log("User connected:", socket.id);
     socket.on("disconnect", () => {
       console.log("User disconnected:", socket.id);
     });
   });
   ```

2. **Join Room**:

   - Handles user joining a specific room.
   - Sends welcome messages and notifies other users in the room.

   ```javascript
   socket.on("join", ({ name, room }, callback) => {
     socket.join(room);
     socket.emit("message", { user: "admin", text: `Welcome, ${name}` });
     callback();
   });
   ```

3. **Send Message**:

   - Broadcasts messages to all users in the room.

   ```javascript
   socket.on("sendMessage", (message, callback) => {
     io.to(room).emit("message", { user: name, text: message });
     callback();
   });
   ```

### Frontend

1. **React Components**:

   - `Messages`: Displays the list of chat messages.
   - `Input`: Textbox and button for sending messages.
   - `InfoBar`: Shows the current room name.
   - `TextContainer`: Displays active users in the room.

2. **Socket.IO Integration**:

   - Establishes a connection to the server.
   - Sends and receives messages.

   ```javascript
   useEffect(() => {
     socket = io(ENDPOINT);
     socket.emit("join", { name, room }, (error) => {
       if (error) alert(error);
     });

     return () => {
       socket.disconnect();
     };
   }, [ENDPOINT]);
   ```

---

## How It Works

1. **User Joins**:

   - The client sends a `join` event with the username and room name.
   - The server adds the user to the room and sends a welcome message.

2. **Messaging**:

   - The client emits a `sendMessage` event with the message.
   - The server broadcasts the message to all users in the room.

3. **User Leaves**:
   - On disconnection, the server removes the user from the room and notifies others.

---

## Future Enhancements

- Add user authentication for secure chat rooms.
- Store chat history using a database (e.g., MongoDB).
- Enhance UI/UX with animations and themes.
- Add media support for sending images or files.

---

## Contributions

Contributions are welcome! If you find a bug or have a feature request, feel free to create an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to use this as a template and customize it further based on your specific implementation details! 🚀
