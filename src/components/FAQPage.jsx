import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { trackPhoneConversion } from '../utils/gtag';
import {
  ChevronDown,
  ArrowLeft,
  Droplets,
  Clock,
  Beaker,
  Shield,
  Truck,
  DollarSign,
  FlaskConical,
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';
import themesConfig from '../theme/themes';

// Theme configuration
const themes = themesConfig;

// FAQ Data organized by category
const faqCategories = [
  {
    title: 'Product & Technology',
    icon: FlaskConical,
    faqs: [
      {
        question: 'What are nanoemulsified mushroom extracts?',
        answer: 'Our nanoemulsified mushroom extracts use ultrasonic processing to reduce functional mushroom particles to <25 nm. This dramatically increases the surface area available for absorption, enabling faster uptake pathways and more consistent dosing compared to traditional mushroom powders or tinctures.'
      },
      {
        question: 'Which mushroom varieties do you offer?',
        answer: 'We currently offer three flagship nanoemulsified extracts: (1) Lion\'s Mane — optimized for focus and cognitive clarity, (2) Reishi — formulated for calm and daily balance, and (3) Cordyceps — engineered for performance and natural energy. Each extract is processed to achieve consistent particle size and dispersion.'
      },
      {
        question: 'How does nanoemulsification improve mushroom extracts?',
        answer: 'Traditional mushroom extracts are poorly water-soluble and inconsistent in absorption. Nanoemulsification encapsulates active compounds in ultra-small droplets that disperse uniformly in water-based formulations. The result: faster uptake, more predictable consumer experience, and clean integration into beverages without cloudiness or settling.'
      },
      {
        question: 'What processing technology do you use?',
        answer: 'We use proprietary ultrasonic liquid processing equipment in partnership with QSonica, the leading manufacturer of ultrasonic processors. Combined with our food-grade surfactant system, this achieves stable nanoemulsions with particle sizes under 25 nm and consistent distribution across production runs.'
      }
    ]
  },
  {
    title: 'Benefits & Applications',
    icon: Droplets,
    faqs: [
      {
        question: 'What are the benefits of each mushroom extract?',
        answer: 'Lion\'s Mane supports cognitive function, focus, and mental clarity — ideal for nootropic and productivity-focused products. Reishi promotes relaxation, stress adaptation, and immune support — perfect for wellness and wind-down beverages. Cordyceps supports natural energy, endurance, and performance — great for pre-workout and active lifestyle products.'
      },
      {
        question: 'How quickly do consumers notice effects?',
        answer: 'Because nanoemulsification supports faster uptake pathways compared to traditional mushroom supplements, consumers may notice effects more quickly. Onset timing varies by individual, product format, and serving size. We work with each client to optimize dosing for their target consumer experience.'
      },
      {
        question: 'Can I combine multiple mushroom extracts in one product?',
        answer: 'Yes. Our nanoemulsified extracts are designed to be stackable. Many formulation teams blend Lion\'s Mane with Cordyceps for a focus-plus-energy profile, or combine all three for a comprehensive functional mushroom product. We can help you dial in ratios for your target use case.'
      }
    ]
  },
  {
    title: 'Formulation & Integration',
    icon: Beaker,
    faqs: [
      {
        question: 'What product formats work with your mushroom extracts?',
        answer: 'Our nanoemulsified mushroom extracts integrate smoothly into: functional beverages and sparkling waters, RTD (ready-to-drink) wellness shots, coffee and tea blends, smoothie and juice products, energy drinks, and any water-based formulation requiring consistent mushroom actives.'
      },
      {
        question: 'Will nanoemulsified mushrooms affect my beverage\'s clarity?',
        answer: 'Our processing achieves particle sizes under 25 nm, small enough to maintain clear or near-clear formulations depending on concentration. Traditional mushroom powders create cloudy, gritty beverages. Our nanoemulsions stay uniformly dispersed with no settling, giving your products a clean, premium appearance.'
      },
      {
        question: 'How do your extracts taste?',
        answer: 'Nanoemulsification significantly reduces the earthy, bitter taste associated with traditional mushroom extracts. The flavor profile is mild enough to work in most beverage formulations with standard flavoring. We can also advise on flavor-masking strategies for more sensitive palates.'
      },
      {
        question: 'What is the shelf stability of your emulsions?',
        answer: 'Our nanoemulsified mushroom extracts offer 12+ months of shelf stability when stored properly. The emulsion system prevents particle re-aggregation, so there\'s no separation, settling, or sedimentation over time. Your products maintain consistent appearance and dosing throughout their shelf life.'
      }
    ]
  },
  {
    title: 'Ordering & Partnership',
    icon: Truck,
    faqs: [
      {
        question: 'What is the minimum order quantity?',
        answer: (
          <>
            We work with brands of all sizes, from startups to established beverage companies. Minimum order quantities vary based on your needs and extract type. <Link to="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors underline">Contact our sales team</Link> to discuss your specific requirements — we are flexible and want to help you succeed.
          </>
        )
      },
      {
        question: 'Can I get samples before ordering?',
        answer: 'Absolutely. We encourage all potential partners to evaluate our nanoemulsified mushroom extracts in their formulations before committing to an order. Contact us to request samples of any or all three extracts and we\'ll get them shipped to you promptly.'
      },
      {
        question: 'What\'s the process to get started?',
        answer: 'Getting started is straightforward: (1) Schedule a discovery call to discuss your product vision and target market, (2) Receive samples to test in your formulations, (3) Work with our team to refine dosing and integration, (4) Place your order and scale production. We work directly with every client to ensure your formulation succeeds.'
      },
      {
        question: 'Do you offer white-label or private-label services?',
        answer: 'We primarily supply nanoemulsified mushroom extracts as bulk ingredients for your own branded products. We don\'t currently offer finished product manufacturing, but we can recommend trusted co-packers and formulators who have experience working with our ingredients.'
      }
    ]
  },
  {
    title: 'Quality & Compliance',
    icon: Shield,
    faqs: [
      {
        question: 'What quality certifications do you have?',
        answer: 'We maintain strict quality control standards and provide Certificates of Analysis (COA) for all batches. Our facility follows GMP (Good Manufacturing Practice) guidelines. Every batch is tested for potency, purity, heavy metals, and microbial contamination to ensure consistent, safe ingredients.'
      },
      {
        question: 'Where are your mushrooms sourced?',
        answer: 'We source our functional mushroom raw materials from verified, quality-controlled suppliers who specialize in Lion\'s Mane, Reishi, and Cordyceps cultivation. All source materials are tested for identity, purity, and contaminants before processing. We can provide full traceability documentation upon request.'
      },
      {
        question: 'Can you provide documentation for regulatory compliance?',
        answer: 'Yes. We provide full documentation including COAs, specification sheets, allergen statements, and safety data for each extract. We can work with your regulatory team to ensure you have everything needed for compliance in your target markets.'
      }
    ]
  }
];

/**
 * FAQ Accordion Item Component
 */
function FAQItem({ question, answer, isOpen, onClick, theme }) {
  return (
    <div className={`border-b ${theme.borderCard}`}>
      <h3 className="m-0">
        <button
          onClick={onClick}
          className={`w-full py-5 px-6 flex items-center justify-between text-left ${theme.text} hover:${theme.accentText} transition-colors`}
        >
          <span className="font-medium pr-8">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 ${theme.textMuted}`} />
          </motion.div>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`px-6 pb-5 ${theme.textSecondary} leading-relaxed`}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FAQ Category Section Component
 */
function FAQCategory({ category, openItems, toggleItem, theme }) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-slate-900" />
        </div>
        <h2 className={`text-2xl font-bold ${theme.text}`}>{category.title}</h2>
      </div>

      <div className={`${theme.bgCard} rounded-2xl border ${theme.borderCard} overflow-hidden`}>
        {category.faqs.map((faq, index) => {
          const itemKey = `${category.title}-${index}`;
          return (
            <FAQItem
              key={itemKey}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(itemKey)}
              onClick={() => toggleItem(itemKey)}
              theme={theme}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Main FAQ Page Component
 */
export default function FAQPage() {
  const { isDark, setIsDark } = useTheme();
  const [openItems, setOpenItems] = useState([]);

  const theme = isDark ? themes.dark : themes.light;

  const toggleItem = (itemKey) => {
    setOpenItems(prev =>
      prev.includes(itemKey)
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  return (
    <div className={`min-h-screen ${theme.text} transition-colors duration-500`}>
      <Helmet>
        <title>Nano Mushroom FAQ | Nanoemulsified Functional Mushroom Questions — EnjoyNano</title>
        <meta name="description" content="Frequently asked questions about nanoemulsified mushroom extracts — Lion's Mane, Reishi, and Cordyceps — technology, formulation, dosing, and B2B partnership." />
        <link rel="canonical" href="https://enjoynano.com/mushrooms/faq" />
        <meta property="og:title" content="Nano Mushroom FAQ — Functional Mushroom Questions Answered" />
        <meta property="og:description" content="Get answers about nanoemulsified mushroom extracts, formulation integration, dosing, and partnership opportunities." />
        <meta property="og:url" content="https://enjoynano.com/mushrooms/faq" />
      </Helmet>

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 ${theme.bgNav} border-b ${theme.border}/50 transition-colors duration-500`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 ${theme.textSecondary} hover:${theme.text} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="hidden sm:block w-px h-6 bg-slate-700" />
            <Link to="/" className="flex items-center gap-3">
              <img
                src={theme.logo}
                alt="Cannasol Technologies Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${theme.toggleBg} ${theme.toggleText} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <Link
              to="/contact"
              className={`btn-shine hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r ${theme.accent} text-slate-900 font-semibold rounded-full`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.text}`}>
              Frequently Asked
              <span className={`bg-gradient-to-r ${theme.accentGradientAlt} bg-clip-text text-transparent`}> Questions</span>
              <span className="sr-only"> — Nanoemulsified Functional Mushrooms</span>
            </h1>
            <p className={`text-xl ${theme.textSecondary} max-w-2xl mx-auto`}>
              Everything you need to know about our nanoemulsified mushroom extracts, formulation integration, and partnership opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {faqCategories.map((category, index) => (
          <FAQCategory
            key={category.title}
            category={category}
            openItems={openItems}
            toggleItem={toggleItem}
            theme={theme}
          />
        ))}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 ${theme.bgCard} rounded-3xl border ${theme.borderCard} p-8 md:p-12 text-center`}
        >
          <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center`}>
            <MessageCircle className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme.text}`}>
            Still Have Questions?
          </h2>
          <p className={`${theme.textSecondary} mb-8 max-w-xl mx-auto`}>
            Can't find what you're looking for? Our team is happy to answer any questions about our nanoemulsified mushroom extracts, formulation support, or partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className={`btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${theme.accent} text-slate-900 font-bold rounded-full text-lg`}
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </Link>
            <a
              href="tel:+12169212240"
              onClick={() => trackPhoneConversion()}
              className={`btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 ${theme.bgCard} ${theme.text} font-semibold rounded-full text-lg border ${theme.borderCard}`}
            >
              Call: (216) 921-2240
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={`border-t ${theme.border}/50 py-8`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`${theme.textMuted} text-sm`}>
            © {new Date().getFullYear()} Cannasol Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
