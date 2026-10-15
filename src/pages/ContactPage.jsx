import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="bg-[#F7F9F6] text-[#1E3F20] font-['Geist'] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        
        {/* Hero Header */}
        <div className="bg-[#1A2E1C] text-white rounded-3xl p-8 sm:p-12 mb-10 text-center shadow-xl">
          <span className="text-[10px] font-['Geist_Mono'] font-bold text-[#84BD3A] uppercase tracking-widest block mb-2">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white mb-3">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
            Our clinical experts and customer care team are here to support your foot health and answer any sizing questions.
          </p>
        </div>

        {/* Message Form & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EDDF] shadow-xs">
            <h3 className="font-['Outfit'] font-bold text-xl text-[#1E3F20] mb-4">
              Send us a Message
            </h3>

            {submitted ? (
              <div className="bg-[#E8F3D6] text-[#1E3F20] p-6 rounded-2xl text-center border border-[#D5E5BC]">
                <CheckCircle2 size={32} className="mx-auto mb-2 text-[#2D5A30]" />
                <h4 className="font-['Outfit'] font-bold text-base mb-1">Inquiry Received!</h4>
                <p className="text-xs text-[#2D5A30]">
                  Thank you, {formData.name}. Our foot care specialist will respond to {formData.email} within 2-4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E3F20] mb-1.5 font-['Geist_Mono']">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-[#FAFBF9] border border-[#E8EDDF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E3F20] focus:outline-none focus:border-[#1E3F20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3F20] mb-1.5 font-['Geist_Mono']">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full bg-[#FAFBF9] border border-[#E8EDDF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E3F20] focus:outline-none focus:border-[#1E3F20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3F20] mb-1.5 font-['Geist_Mono']">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your feet?"
                    className="w-full bg-[#FAFBF9] border border-[#E8EDDF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E3F20] focus:outline-none focus:border-[#1E3F20] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white font-bold py-3.5 rounded-full text-xs font-['Outfit'] uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#E8EDDF] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F3D6] text-[#1E3F20] flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                  Customer Support
                </h4>
              </div>
              <p className="text-xs text-[#667360] leading-relaxed mb-1">
                Mon - Sat: 9:00 AM - 7:00 PM IST
              </p>
              <p className="font-['Geist_Mono'] text-xs font-bold text-[#1E3F20]">
                Phone: +91 1800 123 4567
              </p>
              <p className="font-['Geist_Mono'] text-xs text-[#667360]">
                Email: support@medifeet.in
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E8EDDF] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F3D6] text-[#1E3F20] flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <h4 className="font-['Outfit'] font-bold text-base text-[#1E3F20]">
                  Experience Centers
                </h4>
              </div>
              <p className="text-xs text-[#667360] leading-relaxed mb-3">
                Visit our physical diagnostic fit studios for computerized 3D pressure mapping and custom arch evaluations:
              </p>
              <ul className="text-xs text-[#1E3F20] font-medium space-y-1">
                <li>📍 <strong>Mumbai:</strong> Bandra West & Lower Parel</li>
                <li>📍 <strong>Delhi NCR:</strong> DLF CyberHub & Khan Market</li>
                <li>📍 <strong>Bengaluru:</strong> Indiranagar & Koramangala</li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EDDF] shadow-xs">
          <h3 className="font-['Outfit'] font-bold text-xl text-[#1E3F20] mb-4">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {[
              {
                q: 'What size should I order?',
                a: 'Review our Size Guide. If in between half-sizes, order a size up for perfect orthotic bone alignment and heel cradle space.'
              },
              {
                q: 'Are the insoles removable?',
                a: 'In the CloudWalk Sandal, the anatomic footbed is integrated directly into the sole system for maximum structural integrity. In our closed sneakers and runners, insoles are removable for custom orthotics.'
              },
              {
                q: 'How long does shipping take?',
                a: 'Orders are dispatched within 24-48 hours. Metro deliveries arrive in 2-3 business days, and other regions within 4-5 business days.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E8EDDF] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-['Outfit'] font-bold text-sm text-[#1E3F20] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#84BD3A]' : 'text-gray-400'}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#667360] leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
