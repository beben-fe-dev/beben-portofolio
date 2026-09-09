import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, MessageSquare, Check, Copy } from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText("bentoputrahermanto@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Bento, my name is ${name || "a visitor"}. ${message || "I would like to discuss a project / role with you."}`;
    window.open(`https://wa.me/62859106530700?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8 text-left">
            <div>
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 inline-block">
                Initiate Conversation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                Currently open for senior engineering roles, architecture consulting, and exciting venture collaborations. 
                Whether you have an ambitious platform to scale or just want to discuss frontend craft, reach out directly!
              </p>
            </div>

            <div className="space-y-5">
              <div 
                onClick={copyEmail}
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">Email Address (Click to Copy)</span>
                  <span className="font-semibold text-foreground">bentoputrahermanto@gmail.com</span>
                </div>
              </div>

              <a 
                href="https://wa.me/62859106530700" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-emerald-400 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">WhatsApp Instant Chat</span>
                  <span className="font-semibold text-foreground">+62 859-1065-30700</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">Location</span>
                  <span className="font-semibold text-foreground">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Message Action Card */}
          <div className="flex-1 glass-panel p-8 rounded-[2rem] border border-foreground/10 relative text-left">
            <form className="space-y-5" onSubmit={handleSendWhatsApp}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="e.g. Bento Putra Hermanto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Brief Message / Project Scope</label>
                <Textarea 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="Tell me about the engineering challenge, timeline, or role..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full rounded-xl h-12 bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                Send via WhatsApp <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
