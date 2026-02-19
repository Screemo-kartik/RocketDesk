'use client';

import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setSuccess('Please fill required fields.');
      return;
    }

    setLoading(true);
    setSuccess('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess('Message sent successfully 🚀');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      setSuccess('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative w-full bg-black min-h-screen py-32 border-t border-white/10 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">

        {/* Pill */}
        <div className="flex justify-center mb-10">
          <span className="px-6 py-2 text-xs tracking-widest uppercase text-gray-300 border border-white/15 rounded-full bg-white/5 backdrop-blur">
            Contact
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Get in Touch with Us
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-20 text-lg">
          Have questions or need AI solutions? Let us know by filling out the form.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">

          <div className="group bg-neutral-900/70 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-orange-400" size={20} />
              <h3 className="text-white font-semibold">E-mail</h3>
            </div>
            <p className="text-gray-400 text-sm">admin@youragency.com</p>
          </div>

          <div className="group bg-neutral-900/70 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="text-orange-400" size={20} />
              <h3 className="text-white font-semibold">Phone</h3>
            </div>
            <p className="text-gray-400 text-sm">+91 82118757241</p>
          </div>

        </div>

        {/* Form */}
        <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-10 text-left backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div>
              <label className="block text-sm text-gray-300 mb-2">First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smith"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@mail.com"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (969) 819-8061"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

          </div>

          <div className="mb-10">
            <label className="block text-sm text-gray-300 mb-2">Message *</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Hi, I am Jane and I want help with..."
              className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              block mx-auto px-10 py-4
              bg-orange-500 hover:bg-orange-600
              disabled:opacity-50
              text-white rounded-xl font-semibold text-sm
              transition-all duration-300
              hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)]
            "
          >
            {loading ? 'Sending...' : 'Submit Form'}
          </button>

          {success && (
            <p className="text-center text-sm mt-4 text-green-400">
              {success}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
