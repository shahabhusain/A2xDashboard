import React, { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Inbox,
  Star,
  Send,
  FileText,
  AlertTriangle,
  Trash2,
  Edit3,
  ArrowLeft,
  Reply,
  ReplyAll,
  Forward,
  Archive,
  X
} from 'lucide-react';

const EmailInterface = () => {
  const [currentView, setCurrentView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [starredEmails, setStarredEmails] = useState([2, 5, 8]);
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });

  const allEmails = {
    inbox: [
      { id: 1, sender: "Kathryn Murphy", email: "kathryn@company.com", subject: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibu...", time: "6:07 AM", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra veniam sit amet lacus cursus.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nBest regards,\nKathryn Murphy" },
      { id: 2, sender: "Jerome Bell", email: "jerome@company.com", subject: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibu...", time: "6:07 AM", body: "Hi there,\n\nI wanted to follow up on our previous conversation about the project timeline. Jerome Bell here, and I think we need to discuss the deliverables in more detail.\n\nPlease let me know when you're available for a call.\n\nThanks,\nJerome" },
      { id: 3, sender: "Kristin Watson", email: "kristin@company.com", subject: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibu...", time: "6:07 AM", body: "Hello,\n\nKristin Watson writing to update you on the latest developments. The project is progressing well and we should have updates soon.\n\nLooking forward to hearing from you.\n\nBest,\nKristin Watson" },
      { id: 4, sender: "Cody Fisher", email: "cody@company.com", subject: "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus bl", time: "6:07 AM", body: "Dear Team,\n\nCody Fisher here with an important update regarding our upcoming meeting. Vestibulum eu quam nec neque pellentesque efficitur id eget nisl.\n\nPlease review the attached documents before our call.\n\nRegards,\nCody" },
      { id: 5, sender: "Dianne Russell", email: "dianne@company.com", subject: "In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo", time: "6:07 AM", body: "Hi everyone,\n\nDianne Russell checking in about the quarterly review. In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.\n\nLet's schedule a meeting to discuss.\n\nThanks,\nDianne" }
    ],
    starred: [
      { id: 2, sender: "Jerome Bell", email: "jerome@company.com", subject: "Important: Project Timeline Discussion", time: "6:07 AM", body: "This is a starred email from Jerome Bell..." },
      { id: 5, sender: "Dianne Russell", email: "dianne@company.com", subject: "Quarterly Review Meeting", time: "6:07 AM", body: "This is a starred email from Dianne Russell..." }
    ],
    sent: [
      { id: 101, sender: "You", email: "you@company.com", subject: "Re: Project Update", time: "5:45 AM", body: "Thanks for the update. I'll review the documents and get back to you by tomorrow.\n\nBest regards" },
      { id: 102, sender: "You", email: "you@company.com", subject: "Meeting Confirmation", time: "4:30 AM", body: "I can confirm our meeting for tomorrow at 2 PM. Looking forward to discussing the project details.\n\nThanks" }
    ],
    draft: [
      { id: 201, sender: "Draft", email: "", subject: "Draft: Follow up on presentation", time: "Draft", body: "Hi team,\n\nI wanted to follow up on yesterday's presentation..." }
    ],
    spam: [
      { id: 301, sender: "Spam Sender", email: "spam@example.com", subject: "You've won a million dollars!", time: "Yesterday", body: "Congratulations! You've won our lottery..." }
    ],
    bin: [
      { id: 401, sender: "Deleted Email", email: "deleted@example.com", subject: "This email was deleted", time: "2 days ago", body: "This email has been moved to bin..." }
    ]
  };

  const sidebarItems = [
    { icon: Edit3, label: "Compose", count: null, primary: true, key: 'compose' },
    { icon: Inbox, label: "Inbox", count: allEmails.inbox.length, key: 'inbox' },
    { icon: Star, label: "Starred", count: allEmails.starred.length, key: 'starred' },
    { icon: Send, label: "Sent", count: allEmails.sent.length, key: 'sent' },
    { icon: FileText, label: "Draft", count: allEmails.draft.length, key: 'draft' },
    { icon: AlertTriangle, label: "Spam", count: allEmails.spam.length, key: 'spam' },
    { icon: Trash2, label: "Bin", count: allEmails.bin.length, key: 'bin' }
  ];

  const getCurrentEmails = () => {
    return allEmails[currentView] || [];
  };

  const handleSidebarClick = (key) => {
    if (key === 'compose') {
      setShowCompose(true);
      setSelectedEmail(null);
    } else {
      setCurrentView(key);
      setSelectedEmail(null);
      setSelectedEmails([]);
      setShowCompose(false);
    }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowCompose(false);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleEmailSelect = (emailId) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    const currentEmails = getCurrentEmails();
    if (selectedEmails.length === currentEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(currentEmails.map(email => email.id));
    }
  };

  const handleStarToggle = (emailId) => {
    setStarredEmails(prev => 
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleComposeSend = () => {
    // Add to sent emails (in a real app, this would be an API call)
    const newEmail = {
      id: Date.now(),
      sender: "You",
      email: "you@company.com",
      subject: composeData.subject,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      body: composeData.body
    };
    
    allEmails.sent.unshift(newEmail);
    setComposeData({ to: '', subject: '', body: '' });
    setShowCompose(false);
    alert('Email sent successfully!');
  };

  const renderEmailList = () => {
    const emails = getCurrentEmails();
    
    return (
      <div className="flex-1 bg-white overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No emails in {currentView}</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center px-6 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleEmailClick(email)}
            >
              <input
                type="checkbox"
                checked={selectedEmails.includes(email.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  handleEmailSelect(email.id);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-4"
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarToggle(email.id);
                }}
                className="mr-4 p-1 hover:bg-gray-200 rounded"
              >
                <Star 
                  className={`w-4 h-4 ${
                    starredEmails.includes(email.id) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="font-medium text-gray-900 mr-4 flex-shrink-0 w-40 truncate">
                      {email.sender}
                    </span>
                    <span className="text-gray-600 truncate">
                      {email.subject}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
                    {email.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const renderEmailDetail = () => {
    return (
      <div className="flex-1 bg-white flex flex-col">
        {/* Email Detail Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToList}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {currentView}
            </button>
            
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Archive className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{selectedEmail.subject}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 font-medium text-sm">
                  {selectedEmail.sender.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedEmail.sender}</p>
                <p className="text-sm text-gray-500">{selectedEmail.email}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{selectedEmail.time}</span>
          </div>
        </div>
        
        {/* Email Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {selectedEmail.body}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <ReplyAll className="w-4 h-4 mr-2" />
              Reply All
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCompose = () => {
    return (
      <div className="flex-1 bg-white flex flex-col">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Compose Email</h1>
            <button
              onClick={() => setShowCompose(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="email"
                value={composeData.to}
                onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipient email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={composeData.subject}
                onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={composeData.body}
                onChange={(e) => setComposeData({...composeData, body: e.target.value})}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message here..."
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <button
              onClick={handleComposeSend}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={!composeData.to || !composeData.subject}
            >
              Send
            </button>
            <button
              onClick={() => setShowCompose(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Emails</h1>
        </div>
        
        <div className="flex-1 px-4">
          {sidebarItems.map((item, index) => (
            <div
              key={item.key}
              onClick={() => handleSidebarClick(item.key)}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                item.primary && showCompose
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                  : currentView === item.key
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className="text-sm text-gray-500">{item.count}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {showCompose ? (
          renderCompose()
        ) : selectedEmail ? (
          renderEmailDetail()
        ) : (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEmails.length === getCurrentEmails().length && getCurrentEmails().length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span>1-{getCurrentEmails().length} of {getCurrentEmails().length}</span>
                    <button className="ml-3 p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {renderEmailList()}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailInterface;