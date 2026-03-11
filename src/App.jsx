import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const navLinks = ['Home', 'About', 'Services', 'Technologies', 'Pricing', 'Blog', 'Contact'];

const services = [
  ['🌐', 'Web Application Development', 'Scalable, fast web platforms tailored to your business workflows.'],
  ['📱', 'Mobile Application Development', 'Cross-platform mobile apps with polished UX and secure APIs.'],
  ['🖥️', 'Desktop Application Development', 'Powerful desktop tools for internal operations and productivity.'],
  ['☁️', 'SaaS Application Development', 'Subscription-ready cloud software with analytics and billing support.'],
  ['🤖', 'AI Application Development', 'AI-powered features like automation, assistants, and smart insights.'],
  ['🧩', 'Custom Software Solutions', 'End-to-end product engineering built around your unique goals.']
];

const techStack = ['React.js', 'Firebase', 'JavaScript', 'AI / Machine Learning', 'Cloud Technologies'];

function Header({ page, setPage, theme, setTheme }) {
  return (
    <header className="header">
      <div className="brand">AB</div>
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
    <>
      <section className="hero fade-up">
        <p className="eyebrow">Startup Software Development Company</p>
        <h1>Building Powerful Digital Solutions</h1>
        <p>
          AB crafts modern software products for startups and enterprises across web, mobile, SaaS, desktop, and AI
          domains.
        </p>
        <button onClick={() => setPage('Contact')}>Start Your Project</button>
      </section>

      <section className="grid fade-up">
        {services.map(([icon, title, desc]) => (
          <article key={title} className="card">
            <span>{icon}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <section className="panel fade-up">
        <h2>Technologies We Use</h2>
        <div className="chips">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      <section className="panel fade-up">
        <h2>Quick Contact</h2>
        <p>Need an MVP, a full product team, or AI integration support? Let’s talk.</p>
        <button onClick={() => setPage('Contact')}>Contact AB</button>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="page fade-up">
      <h1>About AB</h1>
      <h3>Mission</h3>
      <p>Deliver practical, high-performing software that helps companies grow faster.</p>
      <h3>Vision</h3>
      <p>Become a globally trusted digital engineering startup known for innovation and quality.</p>
      <h3>Why Choose AB</h3>
      <ul>
        <li>Startup speed + enterprise-grade engineering discipline</li>
        <li>Transparent communication and iterative delivery</li>
        <li>Product-thinking approach focused on measurable outcomes</li>
      </ul>
      <h3>Core Technologies</h3>
      <p>React, Firebase, AI systems, and modern cloud-first architecture.</p>
      <h3>Future Goals</h3>
      <p>Launch advanced AI accelerators and expand global software partnerships.</p>
    </section>
  );
}

function Services() {
  const allServices = [
    'Website Development',
    'Mobile App Development',
    'Desktop Software Development',
    'SaaS Product Development',
    'AI Solutions',
    'API Development',
    'Custom Software Development'
  ];

  return (
    <section className="page fade-up">
      <h1>Services</h1>
      <div className="grid">
        {allServices.map((service) => (
          <article className="card" key={service}>
            <span>⚙️</span>
            <h3>{service}</h3>
            <p>Professional delivery with scalable architecture and clean code quality.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Technologies() {
  return (
    <section className="page fade-up">
      <h1>Technologies</h1>
      <div className="chips large">
        {techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    ['Starter Package', '$1,500+', 'Best for MVPs and landing products.'],
    ['Business Package', '$5,000+', 'Ideal for production-ready applications.'],
    ['Enterprise Package', 'Custom', 'For large platforms with advanced integrations.']
  ];

  return (
    <section className="page fade-up">
      <h1>Pricing</h1>
      <div className="grid">
        {plans.map(([name, price, text]) => (
          <article key={name} className="card pricing-card">
            <h3>{name}</h3>
            <h2>{price}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="page fade-up">
      <h1>Blog</h1>
      {loading ? <p>Loading blog posts from Firebase...</p> : null}
      <div className="grid">
        {posts.map((post) => (
          <article key={post.id} className="card">
            {post.image ? <img src={post.image} alt={post.title} className="blog-img" /> : null}
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <small>{post.date || 'Recent'}</small>
          </article>
        ))}
      </div>
      {!loading && posts.length === 0 ? <p className="empty">No posts found yet in Firestore `blogs`.</p> : null}
    </section>
  );
}

function Contact() {
  const initialForm = { name: '', email: '', message: '', projectDetails: '' };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...form,
        createdAt: serverTimestamp()
      });
      setForm(initialForm);
      setStatus('Thank you! Your request has been submitted.');
    } catch {
      setStatus('Submission failed. Check Firestore rules/project setup.');
    }
  };

  return (
    <section className="page fade-up">
      <h1>Contact</h1>
      <form onSubmit={onSubmit} className="contact-form">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} required />
        <textarea
          placeholder="Project request details"
          value={form.projectDetails}
          onChange={(e) => setForm({ ...form, projectDetails: e.target.value })}
          rows={5}
          required
        />
        <button type="submit">Send Request</button>
        {status ? <p>{status}</p> : null}
      </form>
    </section>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! I’m AB Assistant. Ask me about services or pricing.' }]);

  const answer = (text) => {
    const prompt = text.toLowerCase();
    if (prompt.includes('price')) return 'We offer Starter, Business, and Enterprise packages.';
    if (prompt.includes('mobile')) return 'Yes, AB builds high-performance mobile applications.';
    if (prompt.includes('ai')) return 'AB delivers AI integrations, assistants, and workflow automation.';
    return 'We build web, mobile, desktop, SaaS, AI, and custom software solutions.';
  };

  const onSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input.trim() }, { role: 'bot', text: answer(input) }]);
    setInput('');
  };

  return (
    <div className="chatbot-wrap">
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        💬 AI Assistant
      </button>
      {open ? (
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <p key={i} className={m.role === 'user' ? 'user' : 'bot'}>
                {m.text}
              </p>
            ))}
          </div>
          <div className="chatbot-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." />
            <button onClick={onSend}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    return navLinks.includes(hash) ? hash : 'Home';
  };

  const [page, setPage] = useState(getInitialPage);
  const [theme, setTheme] = useState(localStorage.getItem('ab-theme') || 'dark');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('ab-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.location.hash = page === 'Home' ? '' : page;
  }, [page]);

  const currentPage = useMemo(() => {
    switch (page) {
      case 'About':
        return <About />;
      case 'Services':
        return <Services />;
      case 'Technologies':
        return <Technologies />;
      case 'Pricing':
        return <Pricing />;
      case 'Blog':
        return <Blog />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home setPage={setPage} />;
    }
  }, [page]);

  return (
    <>
      <Header page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      <main>{currentPage}</main>
      <footer>© {new Date().getFullYear()} AB Company — Built with React + Firebase.</footer>
      <Chatbot />
    </>
  );
}
