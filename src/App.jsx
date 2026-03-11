import { useEffect, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, rtdb } from './firebase';
import { ref, set, push, serverTimestamp as rtdbTimestamp } from 'firebase/database';

const navLinks = ['Home', 'About', 'Services', 'Technologies', 'Contact'];

const companyInfo = {
  email: 'sbb202122005@gmail.com',
  phone: '+91 73588 63290',
  location: 'Salem, Tamil Nadu, India',
  brand: 'A6B Engineering'
};

const services = [
  ['🌐', 'Scalable Web Platforms', 'High-performance web platforms built with React and Node.js. Our expertise in web development helps Indian startups go global with lightning-fast, production-ready applications. Guaranteed 50ms response times.'],
  ['📱', 'iOS & Android Apps', 'Native-quality iOS and Android apps using React Native and Flutter. We build offline-first mobile solutions tailored for India\'s connectivity challenges, ensuring users stay engaged everywhere.'],
  ['🖥️', 'Desktop Productivity', 'Custom desktop software development for enterprise operations. High-performance tools for manufacturing and data processing using modern frameworks and secure cloud integration.'],
  ['☁️', 'SaaS Product Engineering', 'Complete SaaS development services from MVP to scaling. We architect subscription-ready cloud software with multi-tenant security, robust billing systems, and automated DevOps pipelines.'],
  ['🤖', 'AI-First Applications', 'Leading AI application development company in India. We integrate OpenAI GPT-4, custom LLM fine-tuning, and intelligent workflow automation to give your startup a competitive edge.'],
  ['🧠', 'Autonomous AI Agents', 'Advanced AI agent development using LangChain and CrewAI. We build agents that reason, plan, and execute complex business tasks autonomously, reducing operational costs by up to 60%.'],
];

const portfolio = [
  {
    name: "Sarvam AI Assistant",
    category: "AI / Mobile",
    desc: "A multilingual AI assistant for rural India, supporting 12+ regional languages with offline voice support.",
    tech: ["React Native", "OpenAI", "AWS", "Python"],
    metric: "1M+ Active Users"
  },
  {
    name: "SaaSFlow ERP",
    category: "SaaS / Web",
    desc: "Scalable ERP solution for Indian manufacturing units, automating inventory and supply chain tracking.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    metric: "40% Cost Reduction"
  },
  {
    name: "FinTrack India",
    category: "Fintech",
    desc: "Real-time investment tracking platform integrated with Indian stock exchanges and mutual fund APIs.",
    tech: ["React", "Firebase", "TypeScript", "GCP"],
    metric: "INR 10Cr+ Assets Tracked"
  },
  {
    name: "QuickLogistics App",
    category: "Mobile / Logistics",
    desc: "Offline-first delivery tracking app with route optimization for tier-2 and tier-3 Indian cities.",
    tech: ["Flutter", "FastAPI", "Redis", "Azure"],
    metric: "30% Faster Deliveries"
  }
];

const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Experience", value: "10+ Yrs" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Funding Raised", value: "₹25Cr+" }
];

const testimonials = [
  {
    quote: "A6B transformed our manual process into a lightning-fast SaaS platform. Their understanding of the Indian market is unmatched.",
    author: "Rajesh Kumar",
    role: "Founder, AgriTech India",
    logo: "🌿"
  },
  {
    quote: "The mobile app they built works perfectly even in low-signal areas. Authentic product thinking from day one.",
    author: "Sneha Patil",
    role: "CTO, LogisticPro",
    logo: "🚚"
  }
];

const team = [
  {
    name: "abc",
    role: "CEO & Product Architect",
    exp: "10+ Years Startup Experience",
    avatar: "👨‍💻",
    alt: "CEO and Product Architect with 10+ years startup experience in India"
  },
  {
    name: "defg hik",
    role: "Head of Engineering",
    exp: "12+ Years SaaS & Cloud Specialist",
    avatar: "👩‍🔬",
    alt: "Head of Engineering and SaaS Cloud Specialist at A6B"
  }
];

const pricing = [
  {
    tier: "Startup MVP",
    price: "Custom",
    time: "4-6 Weeks",
    features: ["Core Product Logic", "MVP Design", "Firebase Integration", "Deployment", "2 Months Support"]
  },
  {
    tier: "Scaling SaaS",
    price: "Custom",
    featured: true,
    time: "3-4 Months",
    features: ["Scalable Architecture", "Advanced AI", "Payment Gateway", "Performance Tuning", "Dedicated Team"]
  },
  {
    tier: "Enterprise",
    price: "Custom",
    time: "Timeline Varies",
    features: ["Cloud-Native Setup", "Security Audits", "Legacy Integration", "Internal Training", "24/7 Priority Support"]
  }
];

const techCategories = [
  {
    category: '🖥️ Frontend Frameworks',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS', 'TypeScript']
  },
  {
    category: '⚙️ Backend Services',
    items: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'Django', 'GraphQL', 'REST APIs', 'WebSockets']
  },
  {
    category: '🧠 AI & Machine Learning',
    items: ['OpenAI GPT-4', 'LangChain', 'LlamaIndex', 'Hugging Face', 'TensorFlow', 'PyTorch', 'scikit-learn', 'AI Agents', 'RAG Pipelines', 'Vector Search']
  },
  {
    category: '🗄️ Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase Firestore', 'Redis', 'Supabase', 'Pinecone', 'Weaviate', 'SQLite', 'DynamoDB']
  },
  {
    category: '☁️ Cloud Services',
    items: ['AWS (EC2, S3, Lambda, RDS, ECS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Firebase', 'Vercel', 'Netlify', 'Cloudflare', 'DigitalOcean']
  },
  {
    category: '🔧 DevOps & Tools',
    items: ['Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform', 'Nginx', 'Linux', 'Git', 'Jest', 'Postman']
  },
  {
    category: '📱 Mobile Development',
    items: ['React Native', 'Flutter', 'Expo', 'Android (Kotlin)', 'iOS (Swift)']
  }
];

const techStack = techCategories.flatMap(c => c.items);

function Header({ page, setPage, theme, setTheme }) {
  return (
    <header className="header">
      <div className="brand">A6B</div>
      <nav>
        {navLinks.map((link) => (
          <button key={link} className={page === link ? 'active' : ''} onClick={() => setPage(link)}>
            {link}
          </button>
        ))}
      </nav>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <div className="fade-in">
      {/* ── Hero Section ── */}
      <section className="hero">
        <span className="eyebrow">The Partner for Indian Startups</span>
        <h1>From MVP to Scale: Complete Digital Solutions</h1>
        <p className="hero-subtext">
          A6B builds high-performance software for startups and enterprises across India. 
          We specialize in web, mobile, SaaS, and AI solutions that are built to scale globally.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage('Contact')}>Start Your Project</button>
          <button className="btn-secondary" onClick={() => setPage('Technologies')}>View Tech Stack</button>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="stats-container">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── Services Overview ── */}
      <section className="section">
        <div className="section-header">
          <h2>Premium Services</h2>
          <p>End-to-end engineering from concept to deployment.</p>
        </div>
        <div className="grid-3">
          {services.map(([icon, title, desc]) => (
            <article key={title} className="card">
              <span className="card-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Portfolio Section ── */}
      <section className="section">
        <div className="section-header">
          <h2>Our Portfolio</h2>
          <p>Real-world impact across diverse industries.</p>
        </div>
        <div className="grid-3">
          {portfolio.map((p, i) => (
            <article key={i} className="card portfolio-card">
              <div className="portfolio-img" />
              <div className="portfolio-content">
                <div className="tag-list">
                  <span className="tag">{p.category}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="project-metric">{p.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="section">
        <div className="section-header">
          <h2>What Clients Say</h2>
          <p>Trust built through delivered results.</p>
        </div>
        <div className="grid-3">
          {testimonials.map((t, i) => (
            <article key={i} className="card testimonial-card">
              <blockquote>"{t.quote}"</blockquote>
              <div className="author">
                <div className="author-info">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Quick CTA ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="card" style={{ padding: '4rem', background: 'var(--brand-gradient)' }}>
          <h2 style={{ color: 'white' }}>Ready to build something iconic?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Join 50+ startups who scaled with A6B.</p>
          <button className="btn-secondary" style={{ background: 'white', color: 'var(--brand)', border: 'none' }} onClick={() => setPage('Contact')}>
            Book a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

function About() {
  const values = [
    { icon: '🎯', title: 'Mission', desc: 'To empower 1,000 Indian startups with world-class engineering that doesn\'t break the bank.' },
    { icon: '🚀', title: 'Vision', desc: 'Pioneering global software leadership from the heart of India\'s tech ecosystem.' },
    { icon: '💎', title: 'Culture', desc: 'Product-first thinking, obsession with performance, and absolute technical transparency.' }
  ];

  return (
    <div className="page fade-in">
      {/* ── Story Section ── */}
      <section className="story-header section">
        <div className="story-content">
          <h1>The A6B <span className="brand">Story</span></h1>
          <p>
            Founded in the heart of Tamil Nadu, A6B Engineering was born from a simple observation: 
            startups shouldn't have to choose between speed and quality. 
            We bridge the gap between bold ambition and technical reality, 
            delivering production-ready software that scales as fast as your ideas.
          </p>
        </div>
        <div className="story-image">
          <img src="/about_story_graphic_1773249170719.png" alt="A6B Engineering Vision" />
        </div>
      </section>

      {/* ── Values Section ── */}
      <div className="values-grid">
        {values.map((v, i) => (
          <article key={i} className="value-card">
            <span className="value-icon">{v.icon}</span>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </article>
        ))}
      </div>

      {/* ── Leadership Section ── */}
      <section className="section">
        <div className="section-header">
          <h2>Our Leadership</h2>
          <p>The visionaries driving technical excellence at A6B.</p>
        </div>
        <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {team.map((m, i) => (
            <article key={i} className="card team-card">
              <div className="team-avatar" role="img" aria-label={m.alt} title={m.alt}>{m.avatar}</div>
              <div className="role">{m.role}</div>
              <h3>{m.name}</h3>
              <p className="exp">{m.exp}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Services() {
  return (
    <div className="page fade-in">
      <section className="section-header">
        <h1>Cloud, Mobile & AI Services</h1>
        <p>Expert software development company in India specializing in React, SaaS architectures, and custom AI application development.</p>
      </section>

      <div className="grid-3">
        {services.map(([icon, title, desc]) => (
          <article key={title} className="card">
            <span className="card-icon" role="img" aria-label={title}>{icon}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Technologies() {
  return (
    <div className="page fade-in">
      <section className="section-header">
        <h1>Our Technology Stack</h1>
        <p>A comprehensive ecosystem of modern frameworks, tools, and services built for scale.</p>
      </section>

      <div className="tech-container">
        {techCategories.map(({ category, items }) => (
          <div key={category} className="tech-category">
            <h3 className="tech-category-title">{category}</h3>
            <div className="chips">
              {items.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function Contact() {
  const initialForm = { name: '', email: '', message: '', type: 'Web App' };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!rtdb) {
      setStatus('Database not connected. Please check configuration.');
      return;
    }
    setStatus('Submitting...');
    try {
      // Store in Realtime Database at /contectus using direct push data
      const submissionsRef = ref(rtdb, 'contectus');
      await push(submissionsRef, { 
        ...form, 
        timestamp: rtdbTimestamp(),
        site: 'A6B Portfolio'
      });
      
      setForm(initialForm);
      setStatus('Message sent! We\'ll get back to you within 24 hours.');
    } catch (err) {
      console.error("Firebase RTDB Error:", err);
      setStatus(`Failed to send: ${err.message || 'Please check your DB rules'}`);
    }
  };

  return (
    <div className="page fade-in">
      <div className="contact-container">
        <div className="contact-details">
          <h1>Let's build the future.</h1>
          <p className="hero-subtext" style={{ textAlign: 'left' }}>
            Whether you need an MVP in 4 weeks or a dedicated SaaS engineering team, we're ready to scale with you.
          </p>
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Quick Support</h3>
            <p>📧 {companyInfo.email}</p>
            <p>📱 {companyInfo.phone}</p>
            <p>📍 {companyInfo.location}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="card contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Work Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Project Type</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
              A comprehensive ecosystem of modern frameworks, tools, and services built for scale.
            </p>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <optgroup label="🔥 Main Categories">
                <option>Web Application</option>
                <option>Mobile App</option>
                <option>SaaS Platform</option>
                <option>AI / Machine Learning</option>
              </optgroup>
              {techCategories.map((cat) => (
                <optgroup key={cat.category} label={cat.category}>
                  {cat.items.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
              <optgroup label="✨ Others">
                <option>Custom Software</option>
                <option>IT Consultation</option>
                <option>Others</option>
              </optgroup>
            </select>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} required />
          </div>
          <button type="submit" className="btn-primary">Send Request</button>
          {status && <p style={{ marginTop: '1rem', color: 'var(--brand)' }}>{status}</p>}
        </form>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="page fade-in">
      <section className="section-header">
        <h1>Transparent Packages</h1>
        <p>No hidden costs. Built to scale with your startup journey.</p>
      </section>
      <div className="pricing-grid">
        {pricing.map((p, i) => (
          <div key={i} className={`card pricing-card ${p.featured ? 'featured' : ''}`}>
            <h3>{p.tier}</h3>
            <div className="price">{p.price}<span> /project</span></div>
            <p><strong>Timeline:</strong> {p.time}</p>
            <ul className="features">
              {p.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
            <button className={p.featured ? 'btn-primary' : 'btn-secondary'}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Namaste! I’m A6B Assistant. Looking to build an MVP or scale your SaaS?' }]);

  const answer = (text) => {
    const p = text.toLowerCase();
    if (p.includes('price')) return 'Our MVP packages start at affordable tiers. Check our Pricing page for details!';
    if (p.includes('mobile')) return 'We build high-performance React Native & Flutter apps with offline-first features.';
    if (p.includes('time')) return 'MVPs typically take 4-6 weeks. Custom SaaS platforms take 3-4 months.';
    if (p.includes('contact') || p.includes('email') || p.includes('location')) 
      return `You can reach us at ${companyInfo.email} or visit us in ${companyInfo.location}.`;
    return 'We specialize in building world-class tech for Indian startups. Shall I book a consult for you?';
  };

  const onSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input.trim() }, { role: 'bot', text: answer(input) }]);
    setInput('');
  };

  return (
    <div className="chatbot-wrap">
      <button className="chatbot-trigger" onClick={() => setOpen(!open)}>
        {open ? '×' : '💬'}
      </button>
      {open && (
        <div className="chat-window fade-in">
          <div className="chat-header">A6B Assistant</div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-footer">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && onSend()} placeholder="Ask anything..." />
            <button className="btn-primary" onClick={onSend} style={{ padding: '0.5rem 1rem' }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    return navLinks.includes(hash) ? hash : 'Home';
  };

  const [page, setPage] = useState(getInitialPage);
  const [theme, setTheme] = useState(localStorage.getItem('a6b-theme') || 'dark');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('a6b-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.location.hash = page === 'Home' ? '' : page;
  }, [page]);

  // Sync site contact details to Realtime Database as requested
  useEffect(() => {
    const infoRef = ref(rtdb, 'contectus/info');
    set(infoRef, companyInfo).catch(console.error);
  }, []);

  const currentPage = useMemo(() => {
    switch (page) {
      case 'About':
        return <About />;
      case 'Services':
        return <Services />;
      case 'Technologies':
        return <Technologies />;
      case 'Pricing':
        return <PricingPage />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home setPage={setPage} />;
    }
  }, [page]);

  const getPageSEO = () => {
    switch(page) {
      case 'About': return {
        title: "About A6B | Startup Software Solutions India",
        desc: "Founded in Tamil Nadu, A6B empowers 1000+ startups with production-ready software. Leading tech partner with 10+ years experience in SaaS and AI.",
        url: "https://a6b.in/about"
      };
      case 'Services': return {
        title: "Web, Mobile & SaaS Development Services | A6B Engineering",
        desc: "Professional web platforms, mobile apps, SaaS products & AI solutions. Custom software engineering for Indian startups looking to scale globally.",
        url: "https://a6b.in/services"
      };
      case 'Technologies': return {
        title: "Modern Tech Stack: React, Node.js, AI, AWS | A6B Engineering",
        desc: "Full-stack expertise in React, Next.js, OpenAI, AWS, and DevOps. We use a comprehensive ecosystem of modern frameworks built for scale.",
        url: "https://a6b.in/technologies"
      };
      case 'Pricing': return {
        title: "Transparent Startup MVP & SaaS Pricing | A6B Engineering",
        desc: "Affordable startup MVP packages and enterprise SaaS solutions. Transparent pricing with clear timelines for Indian digital leaders.",
        url: "https://a6b.in/pricing"
      };
      case 'Contact': return {
        title: "Contact A6B | Hire Best Software Team in India",
        desc: "Get a free consultation for your startup. Discuss your web, mobile, or AI project. We respond within 24 hours. Located in Salem, Tamil Nadu.",
        url: "https://a6b.in/contact"
      };
      default: return {
        title: "A6B Engineering | Premium Software Solutions for Startups",
        desc: "Build MVPs to scalable apps. A6B delivers high-performance SaaS, mobile & AI solutions for Indian startups. 50+ projects delivered successfully.",
        url: "https://a6b.in"
      };
    }
  };

  const seo = getPageSEO();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.desc} />
        <meta name="keywords" content="A6B Engineering, software development startup, AI agents India, SaaS development India, web development for startups, mobile app development India, custom software solutions" />
        <link rel="canonical" href={seo.url} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Science Social */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.desc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:image" content="https://a6b.in/og-preview.png" />
        <meta property="og:site_name" content="A6B Engineering" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.desc} />
        <meta name="twitter:image" content="https://a6b.in/og-preview.png" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "A6B Engineering",
              "url": "https://a6b.in",
              "logo": "https://a6b.in/logo.png",
              "sameAs": [
                "https://linkedin.com/company/a6b",
                "https://twitter.com/a6b",
                "https://github.com/a6b"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "A6B Engineering",
              "image": "https://a6b.in/logo.png",
              "@id": "https://a6b.in",
              "url": "https://a6b.in",
              "telephone": companyInfo.phone,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Salem",
                "addressLocality": "Salem",
                "addressRegion": "Tamil Nadu",
                "postalCode": "636201",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.6643,
                "longitude": 78.1460
              }
            },
            ...services.map(s => ({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": s[1],
              "description": s[2],
              "provider": {
                "@type": "Organization",
                "name": "A6B Engineering"
              },
              "areaServed": "IN"
            }))
          ])}
        </script>
      </Helmet>

      <Header page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      <main>{currentPage}</main>
      <footer>
        <span className="brand">A6B</span>
        <p>© {new Date().getFullYear()} A6B Engineering — Professional Startup Solutions</p>
        <div className="social-links">
          <a href="#">LinkedIn</a>
          <a href="#">X / Twitter</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
      <Chatbot />
    </HelmetProvider>
  );
}
