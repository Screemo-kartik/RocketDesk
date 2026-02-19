'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs?: FAQItem[];
  className?: string;
  accentColor?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is Framer?",
    answer: "Framer is a no-code tool for building and publishing responsive websites—perfect for anyone creating modern, high-performance pages without coding."
  },
  {
    question: "Do I need to know how to code to use Framer?",
    answer: "Framer is fully visual with no code needed, but you can still add custom code and components for more control if you're a designer or developer."
  },
  {
    question: "What is this FAQ component?",
    answer: "This is a free, responsive FAQ section for Framer. Drop it into any project, customize styles and text, and use it to save time on support or info pages."
  },
  {
    question: "How do I add this FAQ component to my project?",
    answer: "After duplicating, copy and paste the component into your Framer project. Then edit the questions, answers, styles, and animations as needed."
  },
  {
    question: "Can I customize the design of this component?",
    answer: "Yes, absolutely. The component is built using native Framer tools, so you can tweak fonts, colors, spacing, animations, and layout however you like."
  },
  {
    question: "Is this component responsive?",
    answer: "Yes, the FAQ component is fully responsive and adapts seamlessly to desktop, tablet, and mobile screen sizes."
  }
];

const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs = defaultFAQs,
  className = "",
  accentColor = "rgba(255, 255, 255, 0.08)"
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      className={`faq-container ${className}`}
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: accentColor,
        borderRadius: '26px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}
    >
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen 
          ? 'rgba(255, 255, 255, 0.12)' 
          : 'rgba(255, 255, 255, 0.05)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <motion.button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '20px 24px',
          border: 'none',
          background: 'transparent',
          color: 'white',
          fontSize: '18px',
          fontWeight: '600',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <span>{question}</span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.3,
                  ease: 'easeInOut'
                },
                opacity: {
                  duration: 0.2,
                  delay: 0.1
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: 'easeInOut'
                },
                opacity: {
                  duration: 0.15
                }
              }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 24px 20px 24px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '16px',
                lineHeight: '1.6'
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQAccordion;