import React from 'react';
import BackButton from '../components/BackButton';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-on-surface-variant">
      <div className="mb-8">
        <BackButton text="Go Back" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-on-background mb-3">Terms & Conditions</h1>
      <p className="text-sm text-on-surface-variant opacity-70 mb-8 font-mono italic">Last Updated: April 25, 2026</p>

      <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-outline space-y-7 leading-relaxed shadow-xl">
        <section className="space-y-4">
          <p className="text-on-surface-variant break-words">
            Welcome to <span className="text-primary font-bold break-all">kmaheshkumarachary.onrender.com</span>. By accessing this website, you agree to the following terms.
          </p>
        </section>

        <hr className="border-outline" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">1. Use of Website</h2>
          <p className="text-on-surface-variant">
            You agree to use this website only for lawful purposes. You must not misuse or attempt to disrupt the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">2. User Accounts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-on-surface-variant">
            <li>You are responsible for maintaining your account credentials.</li>
            <li>You must provide accurate information.</li>
            <li>We reserve the right to suspend accounts if misuse is detected.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">3. Digital Products & Premium Content</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-on-surface-variant">
            <li>Some projects on this website are premium and require payment.</li>
            <li>After successful payment, access will be granted to the user account.</li>
            <li>Access is for personal use only and must not be redistributed.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">4. Payments</h2>
          <p className="text-on-surface-variant mb-2">All payments are processed securely via <span className="text-primary font-bold">Razorpay</span>.</p>
          <p className="text-on-surface-variant opacity-70 text-sm italic">We are not responsible for payment failures caused by:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-on-surface-variant">
            <li>Network issues</li>
            <li>Payment gateway errors</li>
            <li>User mistakes</li>
          </ul>
        </section>

        <section className="p-6 bg-surface-variant/30 rounded-2xl border border-outline shadow-inner">
          <h2 className="text-2xl font-bold text-on-background mb-4">5. Refund Policy</h2>
          <p className="text-on-surface-variant mb-4 italic">Due to the nature of digital products, all sales are final. Refunds will only be provided in cases of:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-on-surface-variant mb-6">
            <li>Duplicate payment</li>
            <li>Technical failure from our side</li>
          </ul>
          <p className="text-sm font-bold text-on-background">For refund requests, contact:</p>
          <p className="text-primary font-black neon-text-blue">kmaheshachary34@gmail.com</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">6. Intellectual Property</h2>
          <p className="text-on-surface-variant">All content on this website (projects, code, design) is owned by <span className="text-on-background font-bold tracking-tight">K Mahesh Kumar Achary</span>.</p>
          <p className="text-on-background font-bold mb-2">You may NOT:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-neon-red/80">
            <li>Copy</li>
            <li>Resell</li>
            <li>Distribute without permission</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">7. Limitation of Liability</h2>
          <p className="text-on-surface-variant mb-2">We are not liable for:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-on-surface-variant">
            <li>Any loss caused by use of our projects</li>
            <li>Misuse of downloaded content</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">8. Termination</h2>
          <p className="text-on-surface-variant mb-2">We reserve the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-on-surface-variant">
            <li>Suspend or terminate accounts</li>
            <li>Remove access to content in case of misuse</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-background">9. Changes to Terms</h2>
          <p className="text-on-surface-variant">We may update these Terms at any time. Continued use means acceptance of updated terms.</p>
        </section>

        <section className="p-6 bg-surface-variant/30 rounded-2xl border border-outline shadow-inner">
          <h2 className="text-xl font-bold text-on-background mb-4">10. Contact Information</h2>
          <p className="text-primary font-black neon-text-blue">Email: kmaheshachary34@gmail.com</p>
        </section>

        <p className="text-center text-on-surface-variant opacity-60 text-sm italic pt-8 border-t border-outline">
          By using this website, you agree to these Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
