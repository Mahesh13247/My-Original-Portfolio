import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
      <p className="text-sm text-slate-500 mb-8 font-mono italic">Last Updated: April 25, 2026</p>

      <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 space-y-8 leading-relaxed">
        <section className="space-y-4">
          <p>
            Welcome to <span className="text-blue-400">kmaheshkumarachary.onrender.com</span>. By accessing this website, you agree to the following terms.
          </p>
        </section>

        <hr className="border-slate-800" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Use of Website</h2>
          <p className="text-slate-400">
            You agree to use this website only for lawful purposes. You must not misuse or attempt to disrupt the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. User Accounts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
            <li>You are responsible for maintaining your account credentials.</li>
            <li>You must provide accurate information.</li>
            <li>We reserve the right to suspend accounts if misuse is detected.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Digital Products & Premium Content</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
            <li>Some projects on this website are premium and require payment.</li>
            <li>After successful payment, access will be granted to the user account.</li>
            <li>Access is for personal use only and must not be redistributed.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Payments</h2>
          <p className="text-slate-400 mb-2">All payments are processed securely via <span className="text-blue-400">Razorpay</span>.</p>
          <p className="text-slate-500 text-sm italic">We are not responsible for payment failures caused by:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Network issues</li>
            <li>Payment gateway errors</li>
            <li>User mistakes</li>
          </ul>
        </section>

        <section className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-4">5. Refund Policy</h2>
          <p className="text-slate-400 mb-4 italic">Due to the nature of digital products, all sales are final. Refunds will only be provided in cases of:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400 mb-6">
            <li>Duplicate payment</li>
            <li>Technical failure from our side</li>
          </ul>
          <p className="text-sm font-bold text-slate-100">For refund requests, contact:</p>
          <p className="text-blue-400 font-bold">kmaheshachary34@gmail.com</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Intellectual Property</h2>
          <p className="text-slate-400">All content on this website (projects, code, design) is owned by <span className="text-white font-bold tracking-tight">K Mahesh Kumar Achary</span>.</p>
          <p className="text-slate-100 font-bold mb-2">You may NOT:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-red-400/80">
            <li>Copy</li>
            <li>Resell</li>
            <li>Distribute without permission</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. Limitation of Liability</h2>
          <p className="text-slate-400 mb-2">We are not liable for:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Any loss caused by use of our projects</li>
            <li>Misuse of downloaded content</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">8. Termination</h2>
          <p className="text-slate-400 mb-2">We reserve the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Suspend or terminate accounts</li>
            <li>Remove access to content in case of misuse</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">9. Changes to Terms</h2>
          <p className="text-slate-400">We may update these Terms at any time. Continued use means acceptance of updated terms.</p>
        </section>

        <section className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">10. Contact Information</h2>
          <p className="text-blue-400 font-bold">Email: kmaheshachary34@gmail.com</p>
        </section>

        <p className="text-center text-slate-500 text-sm italic pt-8 border-t border-slate-800">
          By using this website, you agree to these Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
