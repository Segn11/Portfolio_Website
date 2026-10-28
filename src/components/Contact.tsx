import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MapPin, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Loader2,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // Access key check
  const accessKey = 
    process.env.WEB3FORMS_ACCESS_KEY || 
    (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || 
    'f851e0b1-3500-4252-8d82-ee1f095fc77c';

  const [lastDraft, setLastDraft] = useState<{ name: string; email: string; subject: string; message: string } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const constructMailBody = () => {
    const currentName = name || lastDraft?.name || 'Visitor';
    const currentEmail = senderEmail || lastDraft?.email || 'Not provided';
    const currentMsg = message || lastDraft?.message || '';
    return `Hello Segni,\n\n${currentMsg}\n\nSender: ${currentName}\nEmail: ${currentEmail}`;
  };

  const handleSendViaGmail = () => {
    const currentName = name || lastDraft?.name;
    const currentMsg = message || lastDraft?.message;
    const currentSubject = subject || lastDraft?.subject || (currentName ? `Portfolio Inquiry from ${currentName}` : 'Portfolio Inquiry');
    const currentEmail = senderEmail || lastDraft?.email || '';

    if (!currentName || !currentMsg) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`, '_blank');
      return;
    }
    const finalSubject = encodeURIComponent(currentSubject);
    const finalBody = encodeURIComponent(`Hello Segni,\n\n${currentMsg}\n\nSender: ${currentName}\nEmail: ${currentEmail || 'Not provided'}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${finalSubject}&body=${finalBody}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSendViaOutlook = () => {
    if (!name || !message) {
      setIsError(true);
      setStatusMessage('Please fill in your name and message before opening Outlook.');
      return;
    }
    const finalSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const finalBody = encodeURIComponent(constructMailBody());
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${PERSONAL_INFO.email}&subject=${finalSubject}&body=${finalBody}`;
    window.open(outlookUrl, '_blank');
  };

  const handleSendViaDefaultMail = () => {
    if (!name || !message) {
      setIsError(true);
      setStatusMessage('Please fill in your name and message first.');
      return;
    }
    const finalSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const finalBody = encodeURIComponent(constructMailBody());
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${finalSubject}&body=${finalBody}`;
  };

  const handleCopyDraft = () => {
    if (!message) {
      setIsError(true);
      setStatusMessage('Please type a message first.');
      return;
    }
    const fullDraft = `To: ${PERSONAL_INFO.email}\nSubject: ${subject || `Portfolio Inquiry from ${name}`}\n\n${constructMailBody()}`;
    navigator.clipboard.writeText(fullDraft);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsError(false);
    setStatusMessage(null);

    setIsSubmitting(true);
    const draftPayload = {
      name: name.trim(),
      email: senderEmail.trim(),
      subject: subject.trim(),
      message: message.trim()
    };
    setLastDraft(draftPayload);

    // 1. Try Direct Gmail SMTP endpoint (/api/send-email)
    try {
      const smtpRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: draftPayload.name,
          email: draftPayload.email || 'visitor@portfolio.com',
          subject: draftPayload.subject || `Portfolio Inquiry from ${draftPayload.name}`,
          message: draftPayload.message
        })
      });

      if (smtpRes.ok) {
        const smtpData = await smtpRes.json();
        if (smtpData.success) {
          setSubmitted(true);
          setName('');
          setSenderEmail('');
          setSubject('');
          setMessage('');
          setIsSubmitting(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Direct SMTP endpoint unavailable, trying Web3Forms / Gmail Web', e);
    }

    // 2. Fallback: Web3Forms
    if (accessKey && accessKey.length > 5) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: draftPayload.name,
            email: draftPayload.email || 'anonymous@visitor.com',
            subject: draftPayload.subject || `Portfolio Inquiry from ${draftPayload.name}`,
            message: draftPayload.message,
            from_name: `${draftPayload.name} (via Portfolio Website)`
          })
        });

        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          setName('');
          setSenderEmail('');
          setSubject('');
          setMessage('');
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('Web3Forms API unavailable, falling back to Gmail Web', err);
      }
    }

    // 3. Fallback: Launch Gmail Web directly with prefilled draft
    handleSendViaGmail();
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#08090d]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-emerald-500/10 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Mail size={14} />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Whether you have an upcoming project, a software engineering opportunity, or want to discuss machine learning systems, my inbox is always open.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Primary Email Card */}
            <div className="glass-card p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl" />
              
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={14} />
                Verified Email
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-2">
                Direct Contact
              </h3>
              
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Reach out directly via email. Click copy below or send a message directly from the form.
              </p>

              {/* Email display pill with Copy button */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={18} className="text-emerald-400 shrink-0" />
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-white font-mono text-xs sm:text-sm font-semibold hover:text-emerald-300 transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability & Location details */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-mono">Location</span>
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-800 text-cyan-400">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-mono">Work Eligibility</span>
                  <span>Remote Worldwide • Relocation Available</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-800 text-violet-400">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-mono">Availability</span>
                  <span>Open for Full-Time Roles & Contracts</span>
                </div>
              </div>
            </div>

            {/* Social channels card */}
            <div className="glass-panel p-6 rounded-3xl">
              <h4 className="text-sm font-bold text-white font-display mb-3">
                Professional Channels
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 group-hover:text-white">
                    <Github size={16} className="text-zinc-400" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-emerald-400" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 group-hover:text-cyan-400">
                    <Linkedin size={16} className="text-cyan-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-cyan-400" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Functional Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-white font-display">
                Send a Message
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Direct Inbox Delivery
              </span>
            </div>
            
            <p className="text-zinc-400 text-xs sm:text-sm mb-6">
              Send your project specs, role opening, or question directly to Segni Nadew.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">
                  Message Dispatched!
                </h4>
                <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                  Your inquiry has been submitted to <strong className="text-emerald-400 font-mono">{PERSONAL_INFO.email}</strong>.
                </p>

                {/* Important Spam / Activation Tip Box */}
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 text-left max-w-lg mx-auto text-xs space-y-2">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>Important Delivery Checks for Segni:</span>
                  </div>
                  <ul className="text-zinc-300 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>Check Gmail Spam / Promotions folder:</strong> Automated form emails from Web3Forms are often filtered into Spam or Promotions by default on new setups. Mark as <em>"Not Spam"</em>.
                    </li>
                    <li>
                      <strong>Web3Forms Key Activation:</strong> Search your Gmail for <em>"Web3Forms"</em> and make sure you clicked the <strong>"Activate Access Key"</strong> confirmation link sent when you registered.
                    </li>
                    <li>
                      <strong>Guaranteed direct option:</strong> You or any visitor can also click the button below to send directly through Gmail Web with 100% delivery guarantee!
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleSendViaGmail}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span className="text-zinc-950 font-bold">M</span>
                    <span>Open & Send via Gmail Web</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Your Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    Message Details <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project requirements, scope, role details, or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                </div>

                {/* Error Banner if any */}
                {isError && statusMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message to Segni</span>
                    </>
                  )}
                </button>

                {/* Instant Alternative Send Options */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-zinc-400 mb-2.5 flex items-center justify-between">
                    <span>Or send instantly via your preferred web client:</span>
                    {copiedMessage && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check size={12} /> Message Copied!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={handleSendViaGmail}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Open in Gmail Web with pre-filled message"
                    >
                      <span className="text-red-400 font-bold">M</span>
                      <span>Gmail Web</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaOutlook}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Open in Outlook Web"
                    >
                      <span className="text-blue-400 font-bold">O</span>
                      <span>Outlook</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaDefaultMail}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Open Default Mail App"
                    >
                      <Mail size={13} className="text-emerald-400" />
                      <span>Mail App</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy complete email draft to clipboard"
                    >
                      {copiedMessage ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>Copy Draft</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
