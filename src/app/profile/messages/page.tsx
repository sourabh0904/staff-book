"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMessageCircle,
  FiSend,
  FiPaperclip,
  FiSearch,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiStar,
  FiArchive,
  FiTrash2,
  FiCheck,
  FiChevronRight,
  FiBriefcase,
} from "react-icons/fi";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "PS",
      lastMessage: "Thanks for connecting! Looking forward to collaborating.",
      timestamp: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "1",
          content:
            "Hi! I saw your profile and I'm impressed with your React expertise.",
          timestamp: "10:30 AM",
          isOwn: false,
          status: "read",
        },
        {
          id: "2",
          content:
            "Thank you! I'd love to learn more about your projects at Microsoft.",
          timestamp: "10:32 AM",
          isOwn: true,
          status: "read",
        },
        {
          id: "3",
          content: "Thanks for connecting! Looking forward to collaborating.",
          timestamp: "10:35 AM",
          isOwn: false,
          status: "delivered",
        },
      ],
    },
    {
      id: "2",
      name: "Rahul Kumar",
      avatar: "RK",
      lastMessage: "Are you available for a quick call tomorrow?",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "1",
          content:
            "Hey! I have an exciting opportunity at Google that might interest you.",
          timestamp: "9:15 AM",
          isOwn: false,
          status: "read",
        },
        {
          id: "2",
          content: "That sounds interesting! Could you share more details?",
          timestamp: "9:20 AM",
          isOwn: true,
          status: "read",
        },
        {
          id: "3",
          content: "Are you available for a quick call tomorrow?",
          timestamp: "9:25 AM",
          isOwn: false,
          status: "read",
        },
      ],
    },
    {
      id: "3",
      name: "Anita Patel",
      avatar: "AP",
      lastMessage: "Great work on the design system!",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "1",
          content: "I loved your recent post about design systems.",
          timestamp: "2:45 PM",
          isOwn: false,
          status: "read",
        },
        {
          id: "2",
          content: "Great work on the design system!",
          timestamp: "2:50 PM",
          isOwn: false,
          status: "delivered",
        },
      ],
    },
  ];

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation,
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <FiCheck size={14} className="text-[#666]" />;
      case "delivered":
        return <FiCheck size={14} className="text-[#666]" />;
      case "read":
        return <FiCheck size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 mt-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <nav
            className="flex items-center text-sm font-medium"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-1">
              <li>
                <Link
                  href="/"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-light-bg hover:to-light-bg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight
                  className="mx-2 text-gray-400 group-hover:text-primary transition-colors duration-200"
                  size={16}
                />
              </li>
              <li>
                <Link
                  href="/profile"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-light-bg hover:to-light-bg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Profile
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight className="mx-2 text-gray-400" size={16} />
              </li>
              <li>
                <span className="flex items-center px-4 py-2.5 rounded-lg text-primary bg-gradient-to-r from-light-bg to-light-bg font-semibold shadow-sm border border-[#E5E3FF]">
                  <FiBriefcase className="mr-2" size={16} />
                  Messages
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-Montserrat text-primary mb-2">
            Messages
          </h1>
          <p className="text-lg text-[#666] font-Montserrat">
            Connect and communicate with your professional network
          </p>
        </div>

        {/* Messages Interface */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-[#E8E4FF] overflow-hidden"
          style={{ height: "600px" }}
        >
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-[#E8E4FF] flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-[#E8E4FF]">
                <div className="relative">
                  <FiSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-[#E8E4FF] rounded-lg focus:outline-none focus:border-gradient-end transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-[#F3EFFF] cursor-pointer hover:bg-light-bg transition-colors duration-300 ${
                      selectedConversation === conversation.id
                        ? "bg-light-bg border-l-4 border-l-[#5B5BE7]"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end text-white font-bold flex items-center justify-center">
                          {conversation.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-[#222] truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-[#666] whitespace-nowrap ml-2">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-[#666] truncate mb-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <div className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-bold rounded-full">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-[#E8E4FF] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end text-white font-bold flex items-center justify-center">
                          {currentConversation.avatar}
                        </div>
                        {currentConversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#222]">
                          {currentConversation.name}
                        </h3>
                        <p className="text-sm text-[#666]">
                          {currentConversation.isOnline
                            ? "Online"
                            : "Last seen 2 hours ago"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-light-bg transition-colors duration-300">
                        <FiPhone size={18} className="text-[#666]" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-light-bg transition-colors duration-300">
                        <FiVideo size={18} className="text-[#666]" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-light-bg transition-colors duration-300">
                        <FiMoreVertical size={18} className="text-[#666]" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white"
                              : "bg-light-bg text-[#222]"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              message.isOwn ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span
                              className={`text-xs ${
                                message.isOwn ? "text-white/70" : "text-[#666]"
                              }`}
                            >
                              {message.timestamp}
                            </span>
                            {message.isOwn &&
                              getMessageStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-[#E8E4FF]">
                    <div className="flex gap-3 items-end">
                      <button className="p-2 rounded-lg hover:bg-light-bg transition-colors duration-300">
                        <FiPaperclip size={18} className="text-[#666]" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full px-4 py-3 border border-[#E8E4FF] rounded-xl focus:outline-none focus:border-gradient-end transition-colors duration-300"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        className="p-3 bg-gradient-to-r from-gradient-start to-gradient-end hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <FiSend size={18} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end text-white flex items-center justify-center">
                      <FiMessageCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#222] mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-[#666]">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
