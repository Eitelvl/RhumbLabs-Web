import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';

export default function DeleteAccountPage() {
  useEffect(() => {
    document.title = "Account & Data Deletion | RhumbLabs Apps";
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <TopBar />
      
      <main className="flex-1 pt-32 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/contact" className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors text-sm font-medium mb-10 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Contact
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 text-center max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-text-primary">
              Account &amp; Data Deletion Requests
            </h1>
            <p className="text-lg text-text-secondary font-light leading-relaxed">
              RhumbLabs (Rhumb Labs) provides simple and transparent account and data deletion for all of our mobile applications. Please select your application below:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* RhumbNav Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="linear-card p-8 rounded-3xl bg-bg-primary border border-card-border flex flex-col justify-between shadow-[0_10px_30px_var(--shadow-subtle)] hover:border-sky-500/40 transition-colors group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#11A8FD]/10 border border-[#11A8FD]/20 overflow-hidden mb-6">
                  <img src="/images/rhumbnav-app-icon.png" alt="RhumbNav app icon" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3">RhumbNav</h2>
                <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                  Flight planning, VFR navigation, pilot logbook, and weather platform.
                </p>
                <div className="space-y-2 text-xs text-text-secondary mb-8">
                  <p>• Delete flight plans, logbook entries, &amp; pilot profile</p>
                  <p>• In-app deletion: <strong>Settings &gt; Account &amp; Security</strong></p>
                  <p>• Processing time: Immediate (in-app) or 30 days (email)</p>
                </div>
              </div>

              <Link 
                to="/rhumbnav/delete-account"
                className="linear-button-primary w-full h-12 flex items-center justify-center gap-2 text-sm font-medium rounded-xl"
              >
                RhumbNav Deletion Instructions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Pogo Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="linear-card p-8 rounded-3xl bg-bg-primary border border-card-border flex flex-col justify-between shadow-[0_10px_30px_var(--shadow-subtle)] hover:border-purple-500/40 transition-colors group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 overflow-hidden mb-6">
                  <img src="/images/pogo-app-icon.png" alt="Pogo app icon" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-3">Pogo</h2>
                <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                  Bouldering, climbing logbook, and route tracking app.
                </p>
                <div className="space-y-2 text-xs text-text-secondary mb-8">
                  <p>• Delete climbing logs, route stats, &amp; account info</p>
                  <p>• In-app deletion: <strong>Settings &gt; Account &amp; Security</strong></p>
                  <p>• Processing time: Immediate (in-app) or 30 days (email)</p>
                </div>
              </div>

              <Link 
                to="/pogo/delete-account"
                className="linear-button-primary w-full h-12 flex items-center justify-center gap-2 text-sm font-medium rounded-xl"
              >
                Pogo Deletion Instructions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Email fallback section */}
          <section className="linear-card p-8 rounded-3xl bg-bg-primary border border-card-border text-center">
            <h3 className="text-xl font-bold text-text-primary mb-2">Need General Assistance?</h3>
            <p className="text-sm text-text-secondary font-light mb-6 max-w-xl mx-auto">
              You can also request account and data deletion for any RhumbLabs app directly by sending an email to our support team:
            </p>
            <a 
              href="mailto:support@rhumblabs.com?subject=Account%20and%20Data%20Deletion%20Request&body=Hello%20RhumbLabs%20Support%2C%0A%0AI%20would%20like%20to%20request%20the%20deletion%20of%20my%20account%20and%20data.%0A%0AApp%20Name%3A%20%0AAccount%20Email%3A%20%0A%0AThank%20you."
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card-element border border-card-border text-sm font-medium text-text-primary hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              <Mail className="w-4 h-4" />
              Email support@rhumblabs.com
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
