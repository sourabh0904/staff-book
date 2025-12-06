'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMessageSquare, FiX, FiMinus, FiMessageCircle } from 'react-icons/fi';
import { mockChats } from '@/data/chats';

import { THEME } from '@/styles/theme';



export default function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const recentChats = useMemo(() => mockChats.slice(0, 5), []);

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {/* Always visible buttons */}
      <div className="flex gap-2 mb-2">
        {/* Messages Toggle Button - Only when widget is closed */}
        {!open && (
          <button
            aria-label="Open messages"
            className="group flex items-center gap-2 px-6 py-3 rounded-full shadow-xl bg-white/80 backdrop-blur-xl border border-white/60 text-sm font-bold text-[#6366f1] hover:bg-white hover:scale-105 transition-all duration-300 ring-1 ring-white/50"
            onClick={() => setOpen(true)}
          >
            <div className="p-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#d946ef] text-white shadow-sm group-hover:rotate-12 transition-transform duration-300">
              <FiMessageSquare className="w-4 h-4" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] to-[#d946ef]">Messages</span>
          </button>
        )}
      </div>

      {/* Widget Panel */}
      {open && (
        <div className={`w-[90vw] md:w-[380px] bg-white/60 backdrop-blur-2xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-white/50 ring-1 ring-white/60 transform transition-all duration-300 origin-bottom-right animation-fade-in-up`}>
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-[#6366f1] to-[#d946ef]">
            <div className="absolute inset-0 bg-white/10 pattern-dots opacity-20" />
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/30">
                  <span className="font-bold text-sm">SB</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Messages</h3>
                  <p className="text-xs text-white/80 font-medium">Recent Conversations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm" 
                  onClick={() => setMinimized(m => !m)}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm" 
                  onClick={() => setOpen(false)}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          {!minimized ? (
            <div className="max-h-[450px] overflow-y-auto bg-gradient-to-b from-white/40 to-white/80 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {recentChats.map(chat => (
                <Link href="/profile/messages" key={chat.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/50 transition-colors border-b border-white/40 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      <Image src={chat.avatar} alt={chat.name} width={42} height={42} className="rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-[#6366f1]/50 transition-all duration-300" />
                      {chat.unreadCount && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-[#6366f1] transition-colors">{chat.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[180px] font-medium">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-end gap-1">
                    <span className="text-[10px] text-gray-400 font-medium">{chat.lastMessageTime}</span>
                    {chat.unreadCount ? (
                      <div className="min-w-[1.25rem] h-5 px-1.5 bg-gradient-to-r from-[#6366f1] to-[#d946ef] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                        {chat.unreadCount}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
              <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-white/50 sticky bottom-0">
                <Link 
                  href="/profile/messages" 
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-gray-200 text-[#6366f1] font-bold text-sm hover:bg-[#6366f1] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  Open full messages 
                  <FiMessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-md flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Messages minimized
            </div>
          )}
        </div>
      )}
    </div>
  );
}