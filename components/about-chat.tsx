"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronRight, History, MessageCircle, MessageSquarePlus, Send, Sparkles, X } from "lucide-react";

type Topic = "about" | "projects" | "technologies" | "education" | "experience" | "contact" | "location";
type Message = { role: "visitor" | "kevin"; text: string };
type ChatSession = { id: string; title: string; topic: Topic | null; messages: Message[] };
const emptyMessages: Message[] = [];

const suggestions = [
  "Tell me about yourself",
  "What projects have you built?",
  "What technologies do you use?",
  "How can I contact you?",
];

const answers: Array<{ topic: Topic; match: string[]; text: string; followUp: string }> = [
  {
    topic: "about",
    match: ["about", "yourself", "who are", "introduce", "background"],
    text: "I am an Information Technology student at Davao del Norte State College and an aspiring software engineer. I enjoy building web applications, mobile experiences, and practical digital solutions.",
    followUp: "I am especially interested in full-stack web development, mobile applications, and IoT systems. I use academic and personal projects to keep learning and improving.",
  },
  {
    topic: "projects",
    match: ["project", "built", "portfolio", "work on"],
    text: "Some projects I have worked on are SukiSave, a Flutter app for discounted local goods; Furnara, a furniture e-commerce system; KuyaKevs StreetFade, a barbershop app; and AquaSense, an IoT water-quality monitoring project.",
    followUp: "SukiSave and KuyaKevs StreetFade are mobile app projects. Furnara is a web e-commerce system, and AquaSense focuses on IoT water-quality monitoring. Their repository links are in the Projects section.",
  },
  {
    topic: "technologies",
    match: ["technolog", "skill", "stack", "language", "framework", "tool"],
    text: "My listed technologies include PHP, Laravel, Python, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Flutter, Dart, Firebase, MySQL, and Git. I develop these skills through coursework and projects.",
    followUp: "My tools span web development, mobile apps, databases, and version control. The Skills section groups the technologies by area; I do not assign myself skill percentages.",
  },
  {
    topic: "education",
    match: ["educat", "school", "college", "degree", "study"],
    text: "I am studying for a Bachelor of Science in Information Technology at Davao del Norte State College. I have been enrolled since 2023.",
    followUp: "My studies include software development, databases, systems analysis, networking, web technologies, and technical documentation.",
  },
  {
    topic: "experience",
    match: ["experience", "job", "employment", "work history"],
    text: "My experience so far is academic software development and ongoing self-directed practice in web, mobile, IT, and IoT projects. I present these as learning and project work, not professional employment.",
    followUp: "The timeline describes academic software projects at Davao del Norte State College, plus ongoing self-directed practice in full-stack web, mobile, and IoT development.",
  },
  {
    topic: "contact",
    match: ["contact", "email", "reach", "linkedin", "github", "hire", "collaborat"],
    text: "You can email me at kevalcaide23@gmail.com, or reach me through LinkedIn and GitHub. The Contact section has direct links.",
    followUp: "My email is kevalcaide23@gmail.com. You can also open the LinkedIn and GitHub links in the Contact section.",
  },
  {
    topic: "location",
    match: ["location", "where", "country", "live"],
    text: "I am based in the Philippines.",
    followUp: "My listed location is the Philippines.",
  },
];

function answerQuestion(question: string, previousTopic: Topic | null) {
  const normalized = question.toLowerCase().trim();
  const isFollowUp = /^(tell me more|more details|what else|what about (it|that|them)|which one|can you elaborate|and then)\b/.test(normalized);
  if (isFollowUp && previousTopic) {
    const previousAnswer = answers.find(({ topic }) => topic === previousTopic);
    if (previousAnswer) return { topic: previousTopic, text: previousAnswer.followUp };
  }

  const answer = answers.find(({ match }) => match.some((word) => normalized.includes(word)));
  return answer
    ? { topic: answer.topic, text: answer.text }
    : {
        topic: previousTopic,
        text: "I can answer questions about Kevin's background, projects, technologies, education, experience, or contact details. You can also ask a follow-up about this conversation.",
      };
}

export default function AboutChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeSession = sessions.find((session) => session.id === activeSessionId);
  const messages = activeSession?.messages ?? emptyMessages;

  useEffect(() => {
    if (!open || showHistory) return;
    feedRef.current?.scrollTo({
      top: feedRef.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [messages, open, showHistory]);

  function sendQuestion(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const response = answerQuestion(cleanQuestion, activeSession?.topic ?? null);
    const sessionId = activeSession?.id ?? `session-${Date.now()}-${sessions.length}`;
    const nextMessages = [
      ...messages,
      { role: "visitor" as const, text: cleanQuestion },
      { role: "kevin" as const, text: response.text },
    ];
    const nextSession: ChatSession = {
      id: sessionId,
      title: activeSession?.title ?? cleanQuestion.slice(0, 48),
      topic: response.topic,
      messages: nextMessages,
    };

    setSessions((current) => current.some((session) => session.id === sessionId)
      ? current.map((session) => session.id === sessionId ? nextSession : session)
      : [...current, nextSession]);
    setActiveSessionId(sessionId);
    setShowHistory(false);
    setDraft("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function startNewConversation() {
    setActiveSessionId(null);
    setShowHistory(false);
    setDraft("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>
        <button className="chat-launcher" type="button" aria-label="Ask a question about Kevin">
          <MessageCircle size={20} />
          <span>Ask about me</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          className="chat-panel"
          onInteractOutside={(event) => event.preventDefault()}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <header className="chat-header">
            <div className="chat-avatar">K<span>.</span></div>
            <div className="chat-heading">
              <Dialog.Title>Ask about Kevin</Dialog.Title>
              <p><i /> Portfolio assistant</p>
            </div>
            <div className="chat-header-actions">
              <button className="chat-header-button" type="button" onClick={startNewConversation} aria-label="Start a new conversation" title="New conversation">
                <MessageSquarePlus size={17} />
              </button>
              <button className={`chat-header-button${showHistory ? " selected" : ""}`} type="button" onClick={() => setShowHistory((value) => !value)} aria-expanded={showHistory} aria-label={`Conversation history, ${sessions.length} saved in this page session`} title="Conversation history">
                <History size={16} /><span>{sessions.length}</span>
              </button>
              <Dialog.Close className="icon-button chat-close" aria-label="Close chat"><X size={18} /></Dialog.Close>
            </div>
          </header>

          {showHistory ? (
            <div className="chat-history" aria-label="Conversation history">
              <div className="chat-history-heading">
                <strong>Recent conversations</strong>
                <span>Only kept until this page reloads</span>
              </div>
              {sessions.length === 0 ? (
                <p className="chat-history-empty">Your conversations will appear here during this page session.</p>
              ) : sessions.map((session) => (
                <button className={`chat-history-item${session.id === activeSessionId ? " current" : ""}`} type="button" key={session.id} onClick={() => { setActiveSessionId(session.id); setShowHistory(false); }}>
                  <span><strong>{session.title}</strong><small>{session.messages.length / 2} questions</small></span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          ) : (
            <div className="chat-feed" ref={feedRef} aria-live="polite" aria-relevant="additions text">
              <div className="chat-welcome">
                <span className="chat-welcome-icon"><Sparkles size={16} /></span>
                <p>Hi! Ask me about Kevin&apos;s background, projects, skills, or how to get in touch.</p>
              </div>

              {messages.map((message, index) => (
                <div className={`chat-message ${message.role}`} key={`${activeSessionId}-${index}-${message.role}`}>
                  {message.role === "kevin" && <span className="chat-message-avatar">K</span>}
                  <p>{message.text}</p>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="chat-suggestions" aria-label="Suggested questions">
                  <span>COMMON QUESTIONS</span>
                  {suggestions.map((question) => (
                    <button type="button" key={question} onClick={() => sendQuestion(question)}>
                      {question}<ArrowUpRight size={13} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!showHistory && (
            <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendQuestion(draft); }}>
              <label className="sr-only" htmlFor="chat-question">Ask a question about Kevin</label>
              <input
                ref={inputRef}
                id="chat-question"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask a question..."
                autoComplete="off"
              />
              <button type="submit" aria-label="Send question" disabled={!draft.trim()}><Send size={16} /></button>
            </form>
          )}
          <Dialog.Description className="sr-only">
            Ask about Kevin&apos;s background, projects, skills, education, or contact information. Conversations stay in this page session and clear when the page reloads.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
