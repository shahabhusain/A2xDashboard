import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical, Paperclip, Image, Send } from 'lucide-react';

const MessagingInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      time: "6:30 pm",
      sender: "other"
    },
    {
      id: 2,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      time: "6:34 pm",
      sender: "user"
    },
    {
      id: 3,
      text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
      time: "6:38 pm",
      sender: "other"
    }
  ]);

  const [contacts, setContacts] = useState([
    { id: 1, name: "Kathryn Murphy", status: "Available", time: "12:30 PM", preview: "hey! there I'm...", unread: true, admin: true },
    { id: 2, name: "Alex Johnson", status: "Away", time: "11:45 AM", preview: "About the project...", unread: false, admin: false },
    { id: 3, name: "Sam Wilson", status: "Available", time: "10:20 AM", preview: "Meeting at 3pm", unread: true, admin: false },
    { id: 4, name: "Taylor Swift", status: "Busy", time: "Yesterday", preview: "Check this out!", unread: false, admin: false },
    { id: 5, name: "Chris Evans", status: "Available", time: "Yesterday", preview: "Files attached", unread: true, admin: true },
    { id: 6, name: "Emma Stone", status: "Offline", time: "Monday", preview: "Thanks for your help", unread: false, admin: false },
    { id: 7, name: "Robert Downey", status: "Available", time: "Monday", preview: "Let's catch up soon", unread: true, admin: false },
    { id: 8, name: "Scarlett Johansson", status: "Away", time: "Sunday", preview: "Did you see that?", unread: false, admin: false },
    { id: 9, name: "Tom Holland", status: "Available", time: "Sunday", preview: "Spider-Man stuff", unread: true, admin: false }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "user"
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate reply after 1-3 seconds
      setTimeout(() => {
        const replies = [
          "Thanks for your message!",
          "I'll get back to you soon.",
          "Interesting point!",
          "Can we discuss this later?",
          "I'm currently busy, will reply properly soon."
        ];
        const replyMessage = {
          id: messages.length + 2,
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: "other"
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    // Mark as read when selected
    setContacts(contacts.map(c => 
      c.id === contact.id ? {...c, unread: false} : c
    ));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedContact.id === contact.id ? 'bg-blue-50' : ''}`}
              onClick={() => handleContactSelect(contact)}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium text-sm">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-white ${
                  contact.status === "Available" ? "bg-green-500" : 
                  contact.status === "Away" ? "bg-yellow-500" :
                  contact.status === "Busy" ? "bg-red-500" : "bg-gray-500"
                }`}></div>
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                    {contact.admin && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Admin</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{contact.preview}</p>
                  {contact.unread && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full ml-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 font-medium text-sm">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-white ${
                selectedContact.status === "Available" ? "bg-green-500" : 
                selectedContact.status === "Away" ? "bg-yellow-500" :
                selectedContact.status === "Busy" ? "bg-red-500" : "bg-gray-500"
              }`}></div>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{selectedContact.name}</h2>
              <p className={`text-sm ${
                selectedContact.status === "Available" ? "text-green-600" : 
                selectedContact.status === "Away" ? "text-yellow-600" :
                selectedContact.status === "Busy" ? "text-red-600" : "text-gray-600"
              }`}>
                {selectedContact.status}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-end space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write message"
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="1"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-2 rounded-full transition-colors ${
                message.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;