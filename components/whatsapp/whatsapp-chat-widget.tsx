'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  CheckCheck, 
  ShieldCheck, 
  ShoppingBag, 
  HelpCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_CONFIG, getWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowNotificationBadge(false);
      }
      return next;
    });
    setHasInteracted(true);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = message.trim() || WHATSAPP_CONFIG.greetings.general;
    const url = getWhatsAppLink(textToSend);
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  const handleQuickPrompt = (promptText: string) => {
    const url = getWhatsAppLink(promptText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Popover Live Chat Dialog */}
      {isOpen && (
        <div 
          id="whatsapp-chat-popup"
          className="mb-4 w-[92vw] max-w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-200 flex flex-col"
          style={{ maxHeight: 'min(620px, 85vh)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white border-2 border-white/40">
                  RP
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-700 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-base">
                  <span>{WHATSAPP_CONFIG.businessName}</span>
                  <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-medium tracking-wide uppercase">
                    Official
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>{WHATSAPP_CONFIG.responseNotice}</span>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Background & Message Area */}
          <div className="p-4 bg-slate-50 flex-grow overflow-y-auto space-y-3.5 text-sm">
            {/* Agent Greeting Bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs">
                RP
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-slate-100 max-w-[88%] text-slate-800 space-y-2">
                <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span>Support Team</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </p>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                  Welcome to <strong>{WHATSAPP_CONFIG.businessName}</strong>! 👋
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  How can we help you today? You can ask product questions, check batch testing certificates, or place your order directly via WhatsApp.
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span>Customer Support</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCheck className="w-3.5 h-3.5" /> Sent
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Quick Options:
              </p>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickPrompt(WHATSAPP_CONFIG.greetings.orderHelp)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl transition flex items-center justify-between text-xs text-slate-800 font-medium group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Place an Order via WhatsApp</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPrompt(WHATSAPP_CONFIG.greetings.general)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl transition flex items-center justify-between text-xs text-slate-800 font-medium group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Ask a Product or Technical Question</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPrompt(WHATSAPP_CONFIG.greetings.batchCOA)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl transition flex items-center justify-between text-xs text-slate-800 font-medium group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Request Batch Purity & COA Data</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPrompt(WHATSAPP_CONFIG.greetings.paymentShipping)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl transition flex items-center justify-between text-xs text-slate-800 font-medium group shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Payment & UK Shipping Inquiries</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message or order request..."
                  rows={2}
                  className="w-full text-xs sm:text-sm p-2.5 pr-10 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-slate-50 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className={`absolute right-2 bottom-3 p-1.5 rounded-lg transition-colors ${
                    message.trim()
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'text-slate-300 bg-slate-100 cursor-not-allowed'
                  }`}
                  aria-label="Send WhatsApp message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span className="flex items-center gap-1 font-mono font-medium">
                  {WHATSAPP_CONFIG.displayPhone}
                </span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                >
                  Open WhatsApp <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        id="whatsapp-chat-widget-trigger"
        onClick={toggleOpen}
        className="relative group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 focus:outline-hidden focus:ring-3 focus:ring-emerald-400"
        aria-label="Open WhatsApp Live Chat"
      >
        {/* Animated Ripple Pulse */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-50 animate-ping -z-10 duration-1000"></span>

        {/* Custom WhatsApp Icon */}
        <div className="w-7 h-7 flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-90" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-white" />
          )}
        </div>

        {/* Text Label on larger screens */}
        <div className="hidden sm:flex flex-col items-start pr-1 text-left leading-tight">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Live Support</span>
          <span className="text-sm font-semibold">Chat &amp; Order</span>
        </div>

        {/* Unread Alert Dot */}
        {showNotificationBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            1
          </span>
        )}
      </button>
    </div>
  );
}
