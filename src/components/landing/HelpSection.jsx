import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Truck, Banknote, RefreshCw, Mail } from 'lucide-react';
import { FREE_SHIPPING_LABEL } from '../../config';
import SectionHeading from './SectionHeading';

const EMAIL = 'info@medifeetcare.com';

// Answers use only what MediFeet states publicly (see docs/brand-content-brief.md).
const FAQS = [
  {
    q: 'How do I choose my size?',
    a: 'MediFeet uses UK sizes: women 3 to 12 and men 4 to 12. Each product shows the sizes it comes in, and sold-out sizes are marked. If a style runs small, its page says so. Between sizes? Pick the larger one.',
  },
  {
    q: 'When will my order arrive?',
    a: 'Orders are dispatched within 24 hours and usually delivered in 2 to 7 days, anywhere in India.',
  },
  {
    q: 'Is delivery free?',
    a: `Yes, delivery is free on orders above ${FREE_SHIPPING_LABEL}.`,
  },
  {
    q: 'Can I pay cash on delivery?',
    a: 'Yes. Cash on delivery is available across India, alongside secure online payment.',
  },
  {
    q: "What if they don't fit?",
    a: `Exchanges and returns are easy. Write to ${EMAIL} with your order number and we'll help you swap sizes or send them back.`,
  },
  {
    q: 'What makes MediFeet comfortable?',
    a: 'Every pair is built on the same comfort system: an anatomic footbed that follows the arch, cushioning made with BASF materials that springs back with each step, and an anti-skid sole.',
  },
];

const PROMISES = [
  { icon: Truck, title: 'Dispatched in 24 hours', text: 'Delivered in 2–7 days across India.' },
  { icon: Banknote, title: 'Cash on delivery', text: 'Pay when your pair arrives.' },
  { icon: RefreshCw, title: 'Easy exchange', text: "Wrong size? We'll swap it." },
];

const FaqItem = ({ item, open, onToggle, id }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-[#1E3F20]/10">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
        >
          <span className="font-['Outfit'] text-lg sm:text-xl tracking-[-0.01em] text-[#1E3F20]">{item.q}</span>
          <span
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-[transform,background-color,color,border-color] duration-200 ease-out ${
              open ? 'rotate-45 bg-[#1E3F20] text-white border-[#1E3F20]' : 'border-[#1E3F20]/15 text-[#1E3F20] group-hover:border-[#1E3F20]'
            }`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.18 } }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-[15px] sm:text-base leading-relaxed text-[#4A5D4E] max-w-[60ch]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// "Here to help": the promises that matter before buying, and plain answers
// to the questions people ask most.
export const HelpSection = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F2F5EE] py-24 sm:py-32" aria-label="Help and questions">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid lg:grid-cols-[1fr_1.25fr] gap-14 lg:gap-24">
        <div>
          <SectionHeading eyebrow="Here to help" title="Questions before you step in?" />
          <p className="mt-6 text-base sm:text-lg text-[#4A5D4E] leading-relaxed max-w-[40ch]">
            Straight answers on sizing, delivery and exchanges. Still unsure? Write to us and a person will reply.
          </p>

          <ul className="mt-10 space-y-5">
            {PROMISES.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="flex items-center gap-4"
              >
                <span className="w-11 h-11 rounded-full bg-[#E8F3D6] flex items-center justify-center text-[#1E3F20] shrink-0">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-[#1E3F20]">{title}</span>
                  <span className="block text-sm text-[#667360]">{text}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-flex items-center gap-2.5 bg-[#1E3F20] hover:bg-[#285424] text-white text-sm font-medium px-6 py-3.5 rounded-full transition-[background-color,transform] duration-150 active:scale-[0.97]"
          >
            <Mail size={16} /> Write to us
          </a>
          <p className="mt-3 text-sm text-[#667360]">{EMAIL}</p>
        </div>

        <div className="border-t border-[#1E3F20]/10">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} id={`faq-${i}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
