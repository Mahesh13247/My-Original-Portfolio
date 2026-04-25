import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8 font-mono italic">Last Updated: April 25, 2026</p>

      <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 space-y-8 leading-relaxed">
        <section className="space-y-4">
          <p>
            Welcome to <span className="text-blue-400">kmaheshkumarachary.onrender.com</span> ("we", "our", "us"). Your privacy is important to us.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and protect your information when you use our website: 
            <a href="https://kmaheshkumarachary.onrender.com/" className="text-blue-400 hover:underline ml-1">https://kmaheshkumarachary.onrender.com/</a>.
          </p>
        </section>

        <hr className="border-slate-800" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">a. Personal Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                <li>Name</li>
                <li>Email address</li>
                <li>Account login details</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">b. Payment Information</h3>
              <p className="text-slate-400">
                We do <span className="text-white font-bold">NOT</span> store your payment details. All payments are processed securely through <span className="text-blue-400">Razorpay</span>.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">c. Usage Data</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                <li>Pages visited</li>
                <li>Time spent on site</li>
                <li>Device/browser information</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
            <li>Create and manage user accounts</li>
            <li>Provide access to purchased premium projects</li>
            <li>Process payments via Razorpay</li>
            <li>Improve website performance and user experience</li>
            <li>Communicate updates or support responses</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Payment Processing</h2>
          <p className="text-slate-400">
            All payments are handled by <span className="text-blue-400">Razorpay</span>. We do not store your card or banking details on our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
          <p className="text-slate-400 mb-2">We implement reasonable security measures to protect your data, including:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Encrypted passwords</li>
            <li>Secure APIs</li>
            <li>Token-based authentication</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Cookies</h2>
          <p className="text-slate-400">We may use cookies to maintain login sessions and improve user experience. You can disable cookies in your browser settings.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Third-Party Services</h2>
          <p className="text-slate-400 mb-2">We may use third-party tools such as:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Razorpay (payments)</li>
            <li>Hosting providers</li>
          </ul>
          <p className="text-xs text-slate-500 italic mt-2">These services have their own privacy policies.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. User Rights</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
            <li>Request access to your data</li>
            <li>Request deletion of your account</li>
            <li>Contact us for any concerns</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">8. Changes to This Policy</h2>
          <p className="text-slate-400">We may update this Privacy Policy from time to time. Updates will be posted on this page.</p>
        </section>

        <section className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">9. Contact Us</h2>
          <p className="text-slate-400">If you have any questions, contact us:</p>
          <p className="text-blue-400 font-bold mt-2">Email: kmaheshachary34@gmail.com</p>
        </section>

        <p className="text-center text-slate-500 text-sm italic pt-8 border-t border-slate-800">
          By using this website, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
