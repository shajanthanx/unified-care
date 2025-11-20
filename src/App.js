import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Briefcase,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
  Mic,
  MicOff,
  Loader2,
  Smartphone,
  Wifi,
  Tv,
  HeadphonesIcon,
  Globe,
  Zap,
  Shield,
  Bell,
  Plus,
  LogOut,
  ChevronDown,
  Settings
} from 'lucide-react';

// --- Gemini API Configuration ---
const apiKey = ""; // Injected by environment

// --- MOCK DATA & UTILS (Replaces Firebase) ---
const DEMO_USER = {
  uid: 'demo-user-123',
  name: 'Nasar Nufail',
  email: 'nasar@unifiedcare.lk',
  team: 'Team Y4-09'
};

const INITIAL_TICKETS = [];

// --- Components ---

// 1. Navigation / Layout
const Navbar = ({ userType, setUserType, setView, notificationCount, user, onSignOut }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Area */}
            <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-indigo-200">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">UnifiedCare</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">

              {/* View Toggle (Demo Purposes) */}
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                    onClick={() => setUserType('customer')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        userType === 'customer'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  Customer
                </button>
                <button
                    onClick={() => setUserType('provider')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        userType === 'provider'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  Provider
                </button>
              </div>

              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {/* Notification Icon */}
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                {notificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 pl-2 focus:outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt="User Profile"
                        className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-bold text-slate-700 leading-none">{user.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{user.team}</p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm font-medium text-slate-900">Signed in as</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <User size={16} className="mr-2 text-slate-400" /> Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Settings size={16} className="mr-2 text-slate-400" /> Settings
                      </button>
                      <div className="border-t border-slate-50 my-1"></div>
                      <button
                          onClick={onSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium"
                      >
                        <LogOut size={16} className="mr-2" /> Sign out
                      </button>
                    </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </nav>
  );
};

// 2. Enhanced Hero / Home Section
const Hero = ({ onStartChat }) => (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 bg-indigo-50 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
        </span>
          Live Support for All Major Networks
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
          No More Waiting on Hold. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          One Chatbot for Everything.
        </span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Report internet issues, billing disputes, and signal drops for Dialog, SLT, Mobitel, and Hutch instantly using our multilingual AI assistant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <button
              onClick={onStartChat}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1 focus:outline-none"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Start Complaint Assistant
          </button>
          <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 focus:outline-none">
            Check Existing Ticket
          </button>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left">
          <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Multilingual AI</h3>
            <p className="text-slate-600 leading-relaxed">
              Speak comfortably in <span className="font-semibold text-blue-600">Sinhala, Tamil, or English</span>. Our AI understands local nuances and technical terms perfectly.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Ticketing</h3>
            <p className="text-slate-600 leading-relaxed">
              Skip the IVR menus. We generate a formal support ticket instantly and route it directly to the correct provider's dashboard.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Unified Dashboard</h3>
            <p className="text-slate-600 leading-relaxed">
              Track your Fiber, 4G, and TV complaints from different providers in one secure, consolidated view.
            </p>
          </div>
        </div>

        {/* Provider Strip */}
        <div className="mt-20 w-full border-t border-slate-100 pt-10">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Compatible With</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text placeholders for logos */}
            <span className="text-2xl font-black text-slate-800">DIALOG</span>
            <span className="text-2xl font-black text-slate-800">SLT-MOBITEL</span>
            <span className="text-2xl font-black text-slate-800">HUTCH</span>
            <span className="text-2xl font-black text-slate-800">AIRTEL</span>
          </div>
        </div>

      </div>
    </div>
);

// 3. AI Chat Component
const AIChat = ({ userId, onTicketCreated }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Ayubowan! Vanakkam! Hello! I'm your UnifiedCare assistant. \n\nI can help you report issues with Dialog, SLT, Mobitel, or Hutch. \n\nTell me what's wrong? (e.g., 'My SLT router has a red light')"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Voice Input Logic
  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 1. Construct the prompt
      const chatHistory = messages.concat(userMsg).map(m => `${m.role}: ${m.content}`).join('\n');
      const systemPrompt = `
        You are an AI assistant for "UnifiedCare", a Sri Lankan telecom support platform.
        Your goal is to identify three things from the user:
        1. Provider (Dialog, SLT, Mobitel, Hutch, Airtel)
        2. Issue Type (Internet, Billing, Signal, Voice, Other)
        3. A short summary of the problem.

        Conversational Style: Friendly, concise, professional.
        
        CRITICAL INSTRUCTION:
        If the user has provided enough information to file a ticket, you MUST end your response with a JSON block strictly in this format:
        ~~~JSON
        {
          "action": "CREATE_TICKET",
          "provider": "PROVIDER_NAME",
          "issueType": "ISSUE_TYPE",
          "summary": "SUMMARY_OF_ISSUE"
        }
        ~~~
        Do not output the JSON unless you have the Provider and the Issue Type clearly identified. If missing, ask the user for clarification.
      `;

      // 2. Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\nCurrent Conversation:\n" + chatHistory }] }]
        })
      });

      const data = await response.json();
      let botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting. Please try again.";

      // 3. Parse for JSON command
      const jsonMatch = botText.match(/~~~JSON\s*([\s\S]*?)\s*~~~/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1];
        try {
          const ticketData = JSON.parse(jsonStr);
          // Remove the JSON from the visible text
          botText = botText.replace(/~~~JSON[\s\S]*?~~~/, '').trim();

          // Create Ticket locally
          if (ticketData.action === 'CREATE_TICKET') {
            const newTicket = {
              id: Date.now().toString(),
              userId: userId,
              provider: ticketData.provider,
              type: ticketData.issueType,
              description: ticketData.summary,
              status: 'Pending',
              createdAt: new Date(),
              updates: []
            };
            onTicketCreated(newTicket);
            botText += "\n\n✅ I've successfully created a ticket for you! You can track it in your dashboard.";
          }
        } catch (e) {
          console.error("Error parsing AI ticket data", e);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botText }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
      <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <MessageSquare size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Unified Assistant</h3>
              <p className="text-xs text-slate-400">AI • Sinhala • Tamil • English</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm shadow-sm ${
                    msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                </div>
              </div>
          ))}
          {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                </div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening..." : "Describe your issue..."}
                className="flex-1 px-4 py-2 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
            />

            <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                    isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                }`}
                title="Voice Input"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm m-1"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
  );
};

// 4. Ticket List (Customer View)
const TicketList = ({ tickets }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-indigo-600" />
          Recent Tickets
        </h2>
        {tickets.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
              <p className="text-slate-500">No tickets yet. Chat with the assistant to create one!</p>
            </div>
        ) : (
            tickets.map(ticket => (
                <div key={ticket.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Company</span>
                      <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{ticket.provider}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Status</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 inline-block mb-2">{ticket.type}</span>
                    <p className="text-slate-600 text-sm line-clamp-2">{ticket.description}</p>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center border-t border-slate-50 pt-3">
                    <Clock size={12} className="mr-1.5" />
                    {ticket.createdAt.toLocaleString()}
                  </div>
                </div>
            ))
        )}
      </div>
  );
};

// 5. Provider Dashboard (Admin View)
const ProviderDashboard = ({ tickets, onUpdateStatus, onAddDemoTickets }) => {
  const [filter, setFilter] = useState('All');
  const [generating, setGenerating] = useState(false);

  const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.provider === filter);

  const handleDemoGen = async () => {
    setGenerating(true);
    // Simulate network delay
    setTimeout(() => {
      onAddDemoTickets();
      setGenerating(false);
    }, 800);
  };

  return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Provider Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage incoming complaints from UnifiedCare users</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
                onClick={handleDemoGen}
                disabled={generating}
                className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Generate Demo Tickets
            </button>

            <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex shadow-sm">
              {['All', 'Dialog', 'SLT', 'Mobitel'].map(f => (
                  <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${filter === f ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {f}
                  </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-2">Provider</div>
            <div className="col-span-4">Issue Summary</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Quick Actions</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredTickets.map(ticket => (
                <div key={ticket.id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50 transition-colors group">
                  <div className="col-span-2">
                    <span className="font-bold text-slate-900">{ticket.provider}</span>
                    <div className="text-xs text-slate-500 mt-0.5">{ticket.type}</div>
                  </div>
                  <div className="col-span-4 text-sm text-slate-600 pr-4">
                    <p className="truncate" title={ticket.description}>{ticket.description}</p>
                  </div>
                  <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                }`}>
                  {ticket.status}
                </span>
                  </div>
                  <div className="col-span-2 text-xs text-slate-500">
                    {ticket.createdAt.toLocaleDateString()}
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {ticket.status !== 'Resolved' && (
                        <button
                            onClick={() => onUpdateStatus(ticket.id, 'Resolved')}
                            className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                            title="Mark Resolved"
                        >
                          <CheckCircle size={18} />
                        </button>
                    )}
                    {ticket.status === 'Pending' && (
                        <button
                            onClick={() => onUpdateStatus(ticket.id, 'In Progress')}
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Mark In Progress"
                        >
                          <Activity size={18} />
                        </button>
                    )}
                  </div>
                </div>
            ))}
            {filteredTickets.length === 0 && (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                  <Briefcase className="h-12 w-12 mb-3 opacity-20" />
                  <p>No tickets found for this view.</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

// 6. Main App Component
export default function App() {
  const [user, setUser] = useState(DEMO_USER);
  const [userType, setUserType] = useState('customer');
  const [view, setView] = useState('home');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [authLoading, setAuthLoading] = useState(true);

  // Mock Loading Screen
  useEffect(() => {
    setTimeout(() => setAuthLoading(false), 1500);
  }, []);

  const handleSignOut = () => {
    setUser(null);
    setTimeout(() => {
      // Simulate re-login for demo
      setUser(DEMO_USER);
      setView('home');
    }, 1000);
  };

  const addTicket = (ticket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: newStatus } : t
    ));
  };

  const addDemoTickets = () => {
    const demos = [
      { id: 'd1', provider: 'Dialog', type: 'Internet', description: 'Home broadband latency is very high.', status: 'Pending', createdAt: new Date() },
      { id: 'd2', provider: 'SLT', type: 'Voice', description: 'Landline has significant static noise.', status: 'In Progress', createdAt: new Date() },
      { id: 'd3', provider: 'Mobitel', type: 'Billing', description: 'Overcharged for data addon pack.', status: 'Resolved', createdAt: new Date() },
      { id: 'd4', provider: 'Hutch', type: 'Signal', description: 'No 4G coverage in Colombo 03.', status: 'Pending', createdAt: new Date() },
    ];
    setTickets(prev => [...demos, ...prev]);
  };

  if (authLoading) {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
            <p className="text-slate-500 text-sm font-medium">Connecting to UnifiedCare Demo...</p>
          </div>
        </div>
    );
  }

  if (!user) return <div className="p-10 text-center">Signing out...</div>;

  return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
        <Navbar
            userType={userType}
            setUserType={setUserType}
            setView={setView}
            notificationCount={tickets.length}
            user={user}
            onSignOut={handleSignOut}
        />

        {userType === 'provider' ? (
            <div className="pt-8 animate-in fade-in duration-500">
              <ProviderDashboard
                  tickets={tickets}
                  onUpdateStatus={updateTicketStatus}
                  onAddDemoTickets={addDemoTickets}
                  userId={user.uid}
              />
            </div>
        ) : (
            <>
              {view === 'home' && (
                  <Hero onStartChat={() => setView('chat')} />
              )}

              {view === 'chat' && (
                  <div className="max-w-7xl mx-auto pt-8 px-4 pb-20 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="mb-6 flex items-center space-x-2">
                      <button onClick={() => setView('home')} className="text-slate-500 hover:text-indigo-600 transition-colors text-sm flex items-center">
                        ← Back to Home
                      </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <AIChat
                            userId={user.uid}
                            onTicketCreated={addTicket}
                        />
                      </div>
                      <div className="lg:col-span-1">
                        <TicketList tickets={tickets.filter(t => t.userId === user.uid || !t.userId)} />
                      </div>
                    </div>
                  </div>
              )}
            </>
        )}
      </div>
  );
}
