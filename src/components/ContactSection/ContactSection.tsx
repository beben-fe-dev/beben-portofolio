import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, MessageSquare, Check } from "lucide-react";
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
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20 md:scroll-mt-24">
      {/* Standard Apple Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-14 md:mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 inline-block">
          Initiate Conversation
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground tracking-[-0.02em]">
          Let's <span className="text-gradient-primary">Connect</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Currently open for senior engineering roles, architecture consulting, and exciting venture collaborations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-border/80 relative overflow-hidden shadow-xl"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-6 sm:space-y-8 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 sm:mb-3 text-foreground">
                Get in Touch Directly
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Whether you have an ambitious platform to scale, need architectural consultation, or just want to discuss frontend craft, reach out directly via the channels below.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div 
                onClick={copyEmail}
                className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group select-none min-w-0"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">Email Address (Click to Copy)</span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm md:text-base break-all sm:break-normal block">bentoputrahermanto@gmail.com</span>
                </div>
              </div>

              <a 
                href="https://wa.me/62859106530700" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground hover:text-emerald-400 transition-colors group min-w-0"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">WhatsApp Instant Chat</span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm md:text-base block">+62 859-1065-30700</span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground group min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-rose-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">Location</span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm md:text-base block">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Message Action Card - Seamless Integrated Form */}
          <div className="flex-1 p-0 sm:p-6 md:p-8 rounded-2xl md:bg-card/40 md:border md:border-border/40 relative text-left">
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSendWhatsApp}>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                <Input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground text-base focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="e.g. Bento Putra Hermanto"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5">Brief Message / Project Scope</label>
                <Textarea 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground text-base focus-visible:ring-primary placeholder:text-muted-foreground/50 min-h-[120px]"
                  placeholder="Tell me about the engineering challenge, timeline, or role..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full rounded-xl h-12 bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-[0.98]"
              >
                <span>Send via WhatsApp</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
