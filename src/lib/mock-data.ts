import { Company, Signal, Stage } from './types';

let companyCounter = 0;
let signalCounter = 0;
const uid = () => `co_${++companyCounter}`;
const sid = () => `s_${++signalCounter}`;

const signalIcons: Record<string, string> = {
  hiring: '👥', funding: '💰', product: '🚀', press: '📰', partnership: '🤝', exec_move: '👤',
};

function sig(type: Signal['type'], title: string, desc: string, date: string, source?: string): Signal {
  return { id: sid(), type, title, description: desc, date, source, icon: signalIcons[type] };
}

function co(
  name: string, domain: string, tagline: string, desc: string,
  stage: Stage, sector: string, subSector: string, hq: string, country: string,
  founded: number, employees: string, totalRaised: string, lastRound: string, lastRoundDate: string,
  investors: string[], founders: { name: string; role: string }[],
  tags: string[], signalScore: number, signals: Signal[]
): Company {
  return {
    id: uid(), name, domain, website: `https://${domain}`, logo: `https://logo.clearbit.com/${domain}`,
    tagline, description: desc, stage, sector, subSector, hq, country, founded, employees,
    totalRaised, lastRound, lastRoundDate, investors, founders, tags,
    signalScore, thesisMatch: Math.floor(Math.random() * 60) + 40,
    signals, notes: '', savedToLists: [], enriched: null,
    createdAt: `2024-0${Math.floor(Math.random() * 9) + 1}-15`,
  };
}

export const companies: Company[] = [
  co('Linear', 'linear.app', 'The issue tracking tool you\'ll enjoy using', 'Linear is a better way to build software. Meet the system designed for modern software development. Streamline issues, projects, and product roadmaps.', 'Series B', 'Developer Tools', 'Project Management', 'San Francisco, CA', 'US', 2019, '51-200', '$52M', '$35M Series B', '2022-06', ['Accel', 'Sequoia Capital', 'DST Global'], [{ name: 'Karri Saarinen', role: 'CEO' }, { name: 'Tuomas Artman', role: 'CTO' }], ['developer-tools', 'project-management', 'saas', 'productivity'], 92, [
    sig('product', 'Linear Initiatives launched', 'New strategic planning layer for long-term product roadmaps', '2024-09-15', 'linear.app/blog'),
    sig('hiring', 'Hiring Senior Engineers', '15 open engineering roles across frontend and backend', '2024-08-20'),
    sig('press', 'Featured in TechCrunch', 'Named one of top 10 developer tools of 2024', '2024-07-10', 'techcrunch.com'),
    sig('partnership', 'GitHub Deep Integration', 'Bi-directional sync with GitHub Issues and PRs', '2024-06-05'),
  ]),
  co('Vercel', 'vercel.com', 'Develop. Preview. Ship.', 'Vercel provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.', 'Series C+', 'Developer Tools', 'Cloud Infrastructure', 'San Francisco, CA', 'US', 2015, '501-1000', '$563M', '$150M Series D', '2022-11', ['GV', 'Bedrock Capital', 'Greenoaks Capital'], [{ name: 'Guillermo Rauch', role: 'CEO' }], ['developer-tools', 'infrastructure', 'frontend', 'edge-computing'], 88, [
    sig('product', 'v0 AI Code Generation', 'Launched AI-powered UI generation tool', '2024-10-01', 'vercel.com/blog'),
    sig('hiring', 'Expanding AI Team', '30+ AI/ML roles posted', '2024-09-10'),
    sig('funding', 'Revenue growth 3x YoY', 'Enterprise segment driving acceleration', '2024-08-15'),
  ]),
  co('Anthropic', 'anthropic.com', 'AI safety and research company', 'Anthropic is an AI safety startup building reliable, interpretable, and steerable AI systems. Creators of Claude.', 'Series C+', 'AI Infrastructure', 'Foundation Models', 'San Francisco, CA', 'US', 2021, '501-1000', '$7.3B', '$2B Series C', '2024-03', ['Google', 'Spark Capital', 'Salesforce Ventures'], [{ name: 'Dario Amodei', role: 'CEO' }, { name: 'Daniela Amodei', role: 'President' }], ['ai', 'foundation-models', 'safety', 'research'], 95, [
    sig('product', 'Claude 3.5 Sonnet Released', 'State-of-the-art performance across benchmarks', '2024-06-20', 'anthropic.com'),
    sig('funding', '$2B Series C', 'Led by Google with participation from Spark Capital', '2024-03-01'),
    sig('hiring', 'Research Scientists Hiring Sprint', '50+ research roles open', '2024-08-01'),
    sig('partnership', 'Amazon Bedrock Integration', 'Claude available through AWS marketplace', '2024-04-15'),
  ]),
  co('Stripe', 'stripe.com', 'Financial infrastructure for the internet', 'Stripe is a financial infrastructure platform for businesses. Millions of companies use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.', 'Series C+', 'FinTech', 'Payments', 'San Francisco, CA', 'US', 2010, '5001-10000', '$8.7B', '$6.5B Series I', '2023-03', ['Sequoia Capital', 'Andreessen Horowitz', 'General Catalyst'], [{ name: 'Patrick Collison', role: 'CEO' }, { name: 'John Collison', role: 'President' }], ['fintech', 'payments', 'infrastructure', 'developer-tools'], 90, [
    sig('product', 'Stripe Billing v3', 'Complete rewrite of subscription management', '2024-09-20'),
    sig('press', '$65B Valuation Confirmed', 'Secondary market transactions show recovery', '2024-07-15'),
  ]),
  co('Resend', 'resend.com', 'Email for developers', 'Resend is the email API for developers. Build, test, and send transactional emails at scale.', 'Seed', 'Developer Tools', 'Email Infrastructure', 'San Francisco, CA', 'US', 2022, '11-50', '$5.5M', '$3M Seed', '2023-08', ['Y Combinator', 'SV Angel', 'Dylan Field'], [{ name: 'Zeno Rocha', role: 'CEO' }, { name: 'Bu Kinoshita', role: 'CTO' }], ['developer-tools', 'email', 'api', 'saas'], 78, [
    sig('product', 'React Email 2.0', 'Component-based email framework major update', '2024-08-10', 'resend.com'),
    sig('hiring', 'Growing Engineering Team', '5 new roles across infrastructure', '2024-07-20'),
    sig('press', 'YC Top Company 2024', 'Featured in Y Combinator top companies list', '2024-06-01'),
  ]),
  co('Supabase', 'supabase.com', 'The open source Firebase alternative', 'Supabase is an open source Firebase alternative providing database, auth, storage, and edge functions.', 'Series B', 'Developer Tools', 'Backend-as-a-Service', 'Singapore', 'SG', 2020, '51-200', '$116M', '$80M Series B', '2022-08', ['Felicis Ventures', 'Coatue Management', 'Y Combinator'], [{ name: 'Paul Copplestone', role: 'CEO' }, { name: 'Ant Wilson', role: 'CTO' }], ['developer-tools', 'database', 'open-source', 'backend'], 85, [
    sig('product', 'Supabase Branching', 'Git-like branching for database development', '2024-09-01'),
    sig('hiring', 'Remote Engineers Wanted', '20+ positions globally', '2024-08-05'),
    sig('partnership', 'Vercel Integration', 'One-click deploy with Vercel projects', '2024-07-01'),
  ]),
  co('Neon', 'neon.tech', 'Serverless Postgres', 'Neon is serverless Postgres with branching, bottomless storage, and scale-to-zero.', 'Series B', 'Data Infrastructure', 'Database', 'San Francisco, CA', 'US', 2021, '51-200', '$104M', '$46M Series B', '2023-06', ['Menlo Ventures', 'GGV Capital', 'Founders Fund'], [{ name: 'Nikita Shamgunov', role: 'CEO' }], ['database', 'serverless', 'postgres', 'infrastructure'], 82, [
    sig('product', 'Neon Autoscaling GA', 'Production-ready autoscaling for all plans', '2024-09-25'),
    sig('funding', 'Series B extension rumored', 'Market sources indicate additional funding', '2024-08-15'),
    sig('partnership', 'Prisma Partnership', 'Optimized driver for Prisma ORM', '2024-06-20'),
  ]),
  co('Mistral AI', 'mistral.ai', 'Frontier AI lab from Europe', 'Mistral AI is a French AI company developing efficient open-source and commercial large language models.', 'Series B', 'AI Infrastructure', 'Foundation Models', 'Paris', 'FR', 2023, '51-200', '$528M', '$415M Series B', '2024-06', ['Andreessen Horowitz', 'General Catalyst', 'Lightspeed'], [{ name: 'Arthur Mensch', role: 'CEO' }], ['ai', 'llm', 'open-source', 'european'], 88, [
    sig('product', 'Mistral Large 2 Released', 'Competitive with GPT-4 at lower cost', '2024-07-24'),
    sig('funding', '€600M Series B', 'Largest European AI raise to date', '2024-06-11'),
    sig('partnership', 'Microsoft Azure Partnership', 'Models available on Azure AI', '2024-05-01'),
    sig('press', 'EU AI Act Consultation', 'Advising on European AI regulation', '2024-04-20'),
  ]),
  co('Warp', 'warp.dev', 'The terminal for the 21st century', 'Warp is a blazingly fast, Rust-based terminal with AI built in so you and your team can build great software faster.', 'Series B', 'Developer Tools', 'Terminal', 'San Francisco, CA', 'US', 2020, '51-200', '$73M', '$50M Series B', '2023-02', ['Figma Ventures', 'GV', 'Y Combinator'], [{ name: 'Zach Lloyd', role: 'CEO' }], ['developer-tools', 'terminal', 'rust', 'ai'], 75, [
    sig('product', 'Warp for Linux GA', 'Full Linux support launched', '2024-09-05'),
    sig('hiring', 'Rust Engineers Needed', '8 Rust-focused engineering roles', '2024-07-15'),
    sig('press', 'Product Hunt #1', 'Top product of the day on launch', '2024-06-10'),
  ]),
  co('Clerk', 'clerk.com', 'Authentication and user management', 'Clerk provides embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.', 'Series B', 'Developer Tools', 'Auth & Identity', 'San Francisco, CA', 'US', 2020, '51-200', '$55M', '$30M Series B', '2023-05', ['Madrona', 'Bessemer Venture Partners', 'a16z'], [{ name: 'Colin Sidoti', role: 'CEO' }], ['auth', 'developer-tools', 'identity', 'saas'], 80, [
    sig('product', 'Organizations Feature', 'B2B multi-tenant auth launched', '2024-08-20'),
    sig('partnership', 'Next.js App Router Support', 'First-class server component support', '2024-07-01'),
  ]),
  co('Liveblocks', 'liveblocks.io', 'Real-time collaboration infrastructure', 'Liveblocks provides tools to add collaborative experiences to any product in days, not months.', 'Series A', 'Developer Tools', 'Collaboration', 'Paris', 'FR', 2020, '11-50', '$18M', '$12M Series A', '2023-03', ['a16z', 'Y Combinator'], [{ name: 'Guillaume Salles', role: 'CEO' }], ['collaboration', 'real-time', 'developer-tools', 'multiplayer'], 73, [
    sig('product', 'AI Comments Feature', 'AI-powered comment resolution', '2024-09-10'),
    sig('hiring', 'Expanding to US', '6 US-based roles open', '2024-08-01'),
  ]),
  co('Cal.com', 'cal.com', 'Scheduling infrastructure for everyone', 'Cal.com is the open-source Calendly alternative for individuals, businesses, and platforms.', 'Series A', 'B2B SaaS', 'Scheduling', 'San Francisco, CA', 'US', 2021, '51-200', '$32M', '$25M Series A', '2023-01', ['Dick Costolo', 'Seven Seven Six', 'Y Combinator'], [{ name: 'Peer Richelsen', role: 'CEO' }, { name: 'Bailey Pumfleet', role: 'CTO' }], ['scheduling', 'open-source', 'saas', 'productivity'], 70, [
    sig('product', 'Cal.com Platform v3', 'Complete API rewrite for platforms', '2024-08-15'),
    sig('press', 'Open Source Award', 'Won best open-source SaaS 2024', '2024-06-20'),
    sig('hiring', 'Go-to-Market Lead', 'First enterprise sales hire', '2024-07-10'),
  ]),
  co('Replit', 'replit.com', 'Build software faster with AI', 'Replit is a software creation platform that makes it easy to build, share, and deploy software using AI.', 'Series B', 'Developer Tools', 'IDE & AI', 'San Francisco, CA', 'US', 2016, '201-500', '$222M', '$97M Series B', '2023-04', ['a16z', 'Khosla Ventures', 'Coatue'], [{ name: 'Amjad Masad', role: 'CEO' }], ['ai', 'developer-tools', 'ide', 'education'], 83, [
    sig('product', 'Replit Agent GA', 'AI agent that builds full apps', '2024-09-20'),
    sig('funding', 'Revenue doubled', 'ARR crossed $50M milestone', '2024-08-01'),
    sig('partnership', 'Google Cloud Partnership', 'Free credits for Replit users', '2024-06-15'),
  ]),
  co('Unkey', 'unkey.dev', 'API key management for developers', 'Unkey is an open-source API key management platform with built-in rate limiting and analytics.', 'Pre-Seed', 'Developer Tools', 'API Management', 'Austin, TX', 'US', 2023, '1-10', '$1.5M', '$1.5M Pre-Seed', '2024-01', ['Y Combinator', 'Guillermo Rauch'], [{ name: 'James Perkins', role: 'CEO' }, { name: 'Andreas Thomas', role: 'CTO' }], ['api', 'developer-tools', 'open-source', 'security'], 65, [
    sig('product', 'Rate Limiting v2', 'Sliding window and token bucket algorithms', '2024-08-10'),
    sig('press', 'YC W24 Demo Day', 'Presented at Y Combinator Demo Day', '2024-03-15'),
  ]),
  co('Posthog', 'posthog.com', 'Open source product analytics', 'PostHog is an all-in-one platform for product analytics, feature flags, session replays, and A/B testing.', 'Series B', 'Developer Tools', 'Analytics', 'San Francisco, CA', 'US', 2020, '51-200', '$27M', '$15M Series B', '2021-06', ['Y Combinator', 'GV', '1984 Ventures'], [{ name: 'James Hawkins', role: 'CEO' }, { name: 'Tim Glaser', role: 'CTO' }], ['analytics', 'open-source', 'product', 'developer-tools'], 77, [
    sig('product', 'Data Warehouse Feature', 'Query external data sources directly', '2024-09-15'),
    sig('hiring', 'Marketing Team Growth', '5 new marketing roles', '2024-08-01'),
    sig('press', 'Open Source Leader', 'Top 50 open-source projects on GitHub', '2024-07-01'),
  ]),
  co('Inngest', 'inngest.com', 'Durable workflow engine for developers', 'Inngest is the reliability layer for modern applications. Ship durable functions, queues, and workflows without infrastructure.', 'Series A', 'Developer Tools', 'Workflow Engine', 'San Francisco, CA', 'US', 2021, '11-50', '$18M', '$14M Series A', '2024-02', ['a16z', 'GV', 'Guillermo Rauch'], [{ name: 'Tony Holdstock-Brown', role: 'CEO' }, { name: 'Dan Farrelly', role: 'CTO' }], ['workflow', 'developer-tools', 'serverless', 'infrastructure'], 72, [
    sig('product', 'Flow Control Features', 'Concurrency, throttling, debouncing for functions', '2024-09-01'),
    sig('funding', '$14M Series A', 'Led by a16z for durable execution platform', '2024-02-15'),
    sig('partnership', 'Vercel Integration', 'Native integration with Vercel Functions', '2024-05-01'),
  ]),
  co('Lago', 'getlago.com', 'Open source metering and billing', 'Lago is an open-source metering and usage-based billing platform for product-led SaaS.', 'Series A', 'FinTech', 'Billing', 'Paris', 'FR', 2021, '11-50', '$22M', '$15M Series A', '2023-09', ['FirstMark Capital', 'Y Combinator', 'SignalFire'], [{ name: 'Anh-Tho Chuong', role: 'CEO' }, { name: 'Raffi Sarkissian', role: 'CTO' }], ['billing', 'open-source', 'fintech', 'usage-based'], 68, [
    sig('product', 'Real-time Metering', 'Sub-second event ingestion pipeline', '2024-08-20'),
    sig('hiring', 'US Sales Team', 'Building first US go-to-market team', '2024-07-15'),
    sig('press', 'Gartner Cool Vendor', 'Named Gartner Cool Vendor in FinTech', '2024-06-01'),
  ]),
  co('Trigger.dev', 'trigger.dev', 'Background jobs for modern apps', 'Trigger.dev is an open-source platform for creating long-running background jobs with no timeouts.', 'Seed', 'Developer Tools', 'Background Jobs', 'London', 'GB', 2022, '11-50', '$3.5M', '$3M Seed', '2023-06', ['Y Combinator', 'Sentry'], [{ name: 'Matt Aitken', role: 'CEO' }, { name: 'Eric Allam', role: 'CTO' }], ['developer-tools', 'background-jobs', 'open-source', 'serverless'], 67, [
    sig('product', 'v3 Major Release', 'Complete platform rewrite with new SDK', '2024-09-01'),
    sig('partnership', 'Supabase Integration', 'Trigger jobs from Supabase webhooks', '2024-07-10'),
  ]),
  co('Tinybird', 'tinybird.co', 'Real-time data platform', 'Tinybird is a real-time data analytics platform that lets you ingest, query, and publish data via APIs.', 'Series B', 'Data Infrastructure', 'Real-time Analytics', 'Madrid', 'ES', 2019, '51-200', '$51M', '$30M Series B', '2023-01', ['CRV', 'Balderton Capital', 'Y Combinator'], [{ name: 'Jorge Gomez Sancha', role: 'CEO' }], ['data', 'analytics', 'real-time', 'api'], 76, [
    sig('product', 'Time Series Support', 'Native time-series functions added', '2024-08-25'),
    sig('hiring', 'US Engineering Hub', 'Opening NYC office with 10 roles', '2024-07-20'),
    sig('press', 'SOC 2 Certification', 'Achieved SOC 2 Type II compliance', '2024-06-15'),
  ]),
  co('Dub', 'dub.co', 'Open source link management', 'Dub.co is the open-source link management infrastructure for modern marketing teams.', 'Seed', 'B2B SaaS', 'Marketing Tools', 'San Francisco, CA', 'US', 2022, '1-10', '$2.4M', '$2M Seed', '2023-08', ['Y Combinator', 'Vercel'], [{ name: 'Steven Tey', role: 'CEO' }], ['marketing', 'open-source', 'links', 'analytics'], 64, [
    sig('product', 'Dub Conversions', 'Track conversions from short links', '2024-09-15'),
    sig('press', 'Vercel Showcase', 'Featured in Vercel customer showcase', '2024-08-01'),
    sig('hiring', 'First Sales Hire', 'Looking for founding AE', '2024-07-10'),
  ]),
  co('Ramp', 'ramp.com', 'The corporate card that saves you money', 'Ramp is the finance automation platform designed to save businesses time and money.', 'Series C+', 'FinTech', 'Corporate Finance', 'New York, NY', 'US', 2019, '501-1000', '$990M', '$300M Series D', '2024-03', ['Founders Fund', 'Stripe', 'Goldman Sachs'], [{ name: 'Eric Glyman', role: 'CEO' }, { name: 'Karim Atiyeh', role: 'CTO' }], ['fintech', 'corporate-finance', 'automation', 'expense-management'], 86, [
    sig('funding', '$300M Series D', 'Valuation reaches $7.65B', '2024-03-15'),
    sig('product', 'Ramp Intelligence', 'AI-powered spend insights', '2024-08-20'),
    sig('partnership', 'NetSuite Integration', 'Deep ERP integration launched', '2024-06-01'),
    sig('hiring', '200+ Open Roles', 'Massive hiring across all departments', '2024-09-01'),
  ]),
  co('Mercury', 'mercury.com', 'Banking for startups', 'Mercury is a fintech company providing banking services for startups and scaling companies.', 'Series B', 'FinTech', 'Banking', 'San Francisco, CA', 'US', 2017, '201-500', '$163M', '$120M Series B', '2023-05', ['a16z', 'Coatue Management', 'CRV'], [{ name: 'Immad Akhund', role: 'CEO' }], ['fintech', 'banking', 'startups', 'saas'], 81, [
    sig('product', 'Mercury Raise', 'Fundraising intelligence dashboard', '2024-09-10'),
    sig('press', 'SVB Migration Wave', 'Largest beneficiary of SVB collapse migration', '2024-01-15'),
    sig('partnership', 'Carta Integration', 'Cap table sync with Mercury', '2024-07-01'),
  ]),
  co('Tempus AI', 'tempus.com', 'AI-powered precision medicine', 'Tempus is a technology company advancing precision medicine through the practical application of artificial intelligence in healthcare.', 'Series C+', 'HealthTech', 'Precision Medicine', 'Chicago, IL', 'US', 2015, '5001-10000', '$1.3B', '$200M Series G', '2023-08', ['Google', 'New Enterprise Associates', 'Franklin Templeton'], [{ name: 'Eric Lefkofsky', role: 'CEO' }], ['healthtech', 'ai', 'precision-medicine', 'genomics'], 79, [
    sig('product', 'Tempus ONE Platform', 'Unified AI-powered clinical assistant', '2024-08-20'),
    sig('press', 'IPO Filing', 'Filed S-1 with SEC for public listing', '2024-06-01'),
    sig('partnership', 'AstraZeneca Deal', 'Multi-year clinical data partnership', '2024-04-15'),
  ]),
  co('Carbon Health', 'carbonhealth.com', 'Modern healthcare for everyone', 'Carbon Health is a technology-enabled healthcare provider operating clinics and virtual care services.', 'Series C+', 'HealthTech', 'Primary Care', 'San Francisco, CA', 'US', 2015, '1001-5000', '$350M', '$100M Series C', '2022-04', ['BlackRock', 'Dragoneer', 'DCVC'], [{ name: 'Eren Bali', role: 'CEO' }], ['healthtech', 'clinics', 'virtual-care', 'primary-care'], 60, [
    sig('exec_move', 'New CFO Appointed', 'Former Uber finance exec joins as CFO', '2024-08-15'),
    sig('product', 'AI Charting', 'AI-powered clinical documentation', '2024-07-01'),
    sig('press', 'Profitability Milestone', 'First quarter of clinic-level profitability', '2024-09-01'),
  ]),
  co('Pachama', 'pachama.com', 'Carbon credit verification with AI', 'Pachama uses satellite data and AI to verify carbon credits from forest conservation and restoration projects.', 'Series B', 'Climate', 'Carbon Markets', 'San Francisco, CA', 'US', 2018, '51-200', '$55M', '$30M Series B', '2022-09', ['Lowercase Capital', 'Breakthrough Energy Ventures', 'Y Combinator'], [{ name: 'Diego Saez-Gil', role: 'CEO' }], ['climate', 'carbon', 'ai', 'satellite'], 71, [
    sig('product', 'Enhanced Monitoring v2', 'Real-time satellite-based forest monitoring', '2024-08-10'),
    sig('partnership', 'Microsoft Carbon Credits', 'Verified credits for Microsoft carbon negative goal', '2024-06-20'),
    sig('press', 'TIME Climate Leader', 'Named to TIME\'s climate leaders list', '2024-05-15'),
  ]),
  co('Watershed', 'watershed.com', 'Enterprise climate platform', 'Watershed helps companies measure, reduce, remove, and report on their carbon emissions.', 'Series B', 'Climate', 'Carbon Accounting', 'San Francisco, CA', 'US', 2019, '201-500', '$100M', '$70M Series B', '2022-02', ['Sequoia Capital', 'Kleiner Perkins', 'Iconiq'], [{ name: 'Taylor Francis', role: 'CEO' }], ['climate', 'carbon-accounting', 'enterprise', 'sustainability'], 74, [
    sig('product', 'Supply Chain Module', 'Scope 3 emissions tracking for suppliers', '2024-09-15'),
    sig('hiring', 'Climate Scientists', 'Hiring PhD-level climate researchers', '2024-08-01'),
    sig('partnership', 'Stripe Climate', 'Integration with Stripe Climate for carbon removal', '2024-07-10'),
  ]),
  co('Wiz', 'wiz.io', 'Cloud security platform', 'Wiz provides full-stack cloud security across clouds, containers, and workloads with zero agents.', 'Series C+', 'Security', 'Cloud Security', 'New York, NY', 'US', 2020, '1001-5000', '$900M', '$300M Series D', '2024-05', ['a16z', 'Lightspeed', 'Greenoaks'], [{ name: 'Assaf Rappaport', role: 'CEO' }], ['security', 'cloud', 'devsecops', 'cnapp'], 91, [
    sig('funding', '$300M at $12B', 'Fastest growing cybersecurity company ever', '2024-05-01'),
    sig('press', 'Google Acquisition Talks', 'Rejected $23B acquisition offer from Google', '2024-07-15'),
    sig('product', 'Wiz Code', 'Shift-left security for CI/CD pipelines', '2024-08-20'),
    sig('hiring', 'Global Expansion', '500+ open positions worldwide', '2024-09-01'),
  ]),
  co('Snyk', 'snyk.io', 'Developer-first security', 'Snyk helps developers find and fix vulnerabilities in open-source dependencies, containers, and infrastructure as code.', 'Series C+', 'Security', 'Application Security', 'Boston, MA', 'US', 2015, '1001-5000', '$1.1B', '$196M Series G', '2022-12', ['Accel', 'Tiger Global', 'GV'], [{ name: 'Peter McKay', role: 'CEO' }], ['security', 'developer-tools', 'open-source', 'devsecops'], 73, [
    sig('product', 'Snyk AppRisk', 'Application risk management platform', '2024-08-15'),
    sig('exec_move', 'New CRO Hired', 'Former Datadog CRO joins leadership team', '2024-06-01'),
    sig('press', 'Gartner Magic Quadrant', 'Leader in application security testing', '2024-07-20'),
  ]),
  co('1Password', 'onepassword.com', 'The world\'s most-loved password manager', '1Password is a security platform that keeps individuals, families, and businesses safe online.', 'Series C+', 'Security', 'Identity & Access', 'Toronto', 'CA', 2005, '501-1000', '$920M', '$620M Series C', '2022-01', ['Iconiq Growth', 'Tiger Global', 'Lightspeed'], [{ name: 'Jeff Shiner', role: 'CEO' }], ['security', 'passwords', 'identity', 'enterprise'], 66, [
    sig('product', 'Passkey Support', 'Full passkey creation and management', '2024-09-01'),
    sig('partnership', 'Fastmail Integration', 'Email aliasing with password manager', '2024-07-15'),
  ]),
  co('Planetscale', 'planetscale.com', 'The MySQL-compatible serverless database', 'PlanetScale is a MySQL-compatible serverless database platform based on Vitess.', 'Series C+', 'Data Infrastructure', 'Database', 'San Francisco, CA', 'US', 2018, '201-500', '$105M', '$50M Series C', '2022-03', ['a16z', 'Kleiner Perkins', 'SignalFire'], [{ name: 'Sam Lambert', role: 'CEO' }], ['database', 'mysql', 'serverless', 'infrastructure'], 69, [
    sig('product', 'Metal - Bare Metal DBs', 'New bare metal database offering', '2024-09-20'),
    sig('press', 'Strategy Pivot', 'Pivoting to focus on enterprise metal offering', '2024-08-01'),
  ]),
  co('Materialize', 'materialize.com', 'The operational data warehouse', 'Materialize is an operational data warehouse that delivers incremental view maintenance for streaming SQL.', 'Series C+', 'Data Infrastructure', 'Streaming SQL', 'New York, NY', 'US', 2019, '51-200', '$102M', '$60M Series C', '2022-09', ['Kleiner Perkins', 'Lightspeed', 'Redpoint'], [{ name: 'Arjun Narayan', role: 'CEO' }], ['data', 'streaming', 'sql', 'real-time'], 63, [
    sig('product', 'Materialize v0.60', 'Major performance improvements', '2024-08-15'),
    sig('hiring', 'Database Kernel Engineers', '3 senior kernel engineering roles', '2024-07-01'),
  ]),
  co('Brex', 'brex.com', 'The AI-powered spend platform', 'Brex is the AI-powered spend platform that helps companies spend with confidence.', 'Series C+', 'FinTech', 'Expense Management', 'San Francisco, CA', 'US', 2017, '1001-5000', '$1.2B', '$150M Series D', '2023-01', ['Y Combinator', 'Greenoaks Capital', 'Tiger Global'], [{ name: 'Henrique Dubugras', role: 'CEO' }, { name: 'Pedro Franceschi', role: 'Co-CEO' }], ['fintech', 'expense-management', 'corporate-cards', 'ai'], 78, [
    sig('product', 'Brex AI Assistant', 'AI-powered expense policy enforcement', '2024-09-10'),
    sig('exec_move', 'New CTO from Meta', 'Former Meta infrastructure VP joins', '2024-07-15'),
    sig('hiring', 'AI/ML Team Expansion', '15 ML engineering roles', '2024-08-01'),
  ]),
  co('Notion', 'notion.so', 'The connected workspace', 'Notion is the connected workspace where better, faster work happens. It combines notes, docs, and project management.', 'Series C+', 'B2B SaaS', 'Productivity', 'San Francisco, CA', 'US', 2013, '501-1000', '$343M', '$275M Series C', '2021-10', ['Sequoia Capital', 'Coatue', 'Index Ventures'], [{ name: 'Ivan Zhao', role: 'CEO' }], ['productivity', 'collaboration', 'docs', 'saas'], 84, [
    sig('product', 'Notion AI Q&A', 'AI that answers questions about your workspace', '2024-09-01'),
    sig('press', 'Calendar App Launch', 'Standalone calendar product released', '2024-01-18'),
    sig('partnership', 'Slack Deep Integration', 'Bi-directional Notion-Slack workflows', '2024-07-01'),
  ]),
  co('Vanta', 'vanta.com', 'Automated security compliance', 'Vanta automates up to 90% of the work required for SOC 2, HIPAA, ISO 27001, and more.', 'Series B', 'Security', 'Compliance', 'San Francisco, CA', 'US', 2018, '201-500', '$203M', '$150M Series B', '2023-07', ['Sequoia Capital', 'Y Combinator', 'Craft Ventures'], [{ name: 'Christina Cacioppo', role: 'CEO' }], ['security', 'compliance', 'automation', 'enterprise'], 80, [
    sig('product', 'Vanta AI Risk', 'AI-powered risk assessment', '2024-09-20'),
    sig('hiring', 'Enterprise Sales Team', '20+ enterprise AE roles', '2024-08-15'),
    sig('press', '$2.45B Valuation', 'Valued at $2.45B in latest round', '2024-01-01'),
  ]),
  co('Grafana Labs', 'grafana.com', 'The open observability platform', 'Grafana Labs is the company behind Grafana, the open-source visualization and analytics software.', 'Series C+', 'Developer Tools', 'Observability', 'New York, NY', 'US', 2014, '501-1000', '$465M', '$240M Series D', '2022-04', ['GIC', 'Sequoia Capital', 'Lightspeed'], [{ name: 'Raj Dutt', role: 'CEO' }], ['observability', 'open-source', 'monitoring', 'developer-tools'], 76, [
    sig('product', 'Grafana 11', 'Major visualization platform update', '2024-06-18'),
    sig('funding', 'Revenue exceeds $300M ARR', 'Strong growth trajectory continues', '2024-08-01'),
    sig('partnership', 'AWS Marketplace', 'Available as managed service on AWS', '2024-05-15'),
  ]),
  co('Airbyte', 'airbyte.com', 'Open-source data integration', 'Airbyte is an open-source data integration platform that helps consolidate data from APIs, databases, and files.', 'Series B', 'Data Infrastructure', 'ETL/ELT', 'San Francisco, CA', 'US', 2020, '51-200', '$181M', '$150M Series B', '2023-09', ['Benchmark', 'Coatue', 'Accel'], [{ name: 'Michel Tricot', role: 'CEO' }, { name: 'John Lafleur', role: 'Co-founder' }], ['data', 'etl', 'open-source', 'integration'], 74, [
    sig('product', 'Airbyte Cloud GA', 'Managed cloud service general availability', '2024-08-10'),
    sig('hiring', 'Platform Engineers', '12 platform engineering roles', '2024-07-20'),
    sig('press', 'Gartner Recognition', 'Named in Gartner MQ for data integration', '2024-06-01'),
  ]),
  co('Weights & Biases', 'wandb.ai', 'The AI developer platform', 'Weights & Biases is the AI developer platform, helping ML teams build better models faster with experiment tracking and model management.', 'Series C+', 'AI Infrastructure', 'MLOps', 'San Francisco, CA', 'US', 2017, '201-500', '$250M', '$50M Series C', '2023-01', ['Insight Partners', 'Trinity Ventures', 'Bloomberg Beta'], [{ name: 'Lukas Biewald', role: 'CEO' }], ['ai', 'mlops', 'experiment-tracking', 'developer-tools'], 82, [
    sig('product', 'W&B Weave', 'LLM evaluation and monitoring platform', '2024-09-01'),
    sig('partnership', 'OpenAI Integration', 'Official fine-tuning dashboard partner', '2024-07-15'),
    sig('hiring', 'LLM Research Team', '8 LLM-focused research roles', '2024-08-10'),
  ]),
  co('Groq', 'groq.com', 'Fast AI inference', 'Groq designs LPU inference engines that deliver exceptional compute speed, quality, and energy efficiency.', 'Series C+', 'AI Infrastructure', 'Inference Hardware', 'Mountain View, CA', 'US', 2016, '201-500', '$360M', '$300M Series D', '2024-08', ['BlackRock', 'Samsung', 'Tiger Global'], [{ name: 'Jonathan Ross', role: 'CEO' }], ['ai', 'hardware', 'inference', 'llm'], 87, [
    sig('funding', '$300M Series D', 'Valued at $2.8B for AI inference chips', '2024-08-05'),
    sig('product', 'GroqCloud Public API', 'Fastest LLM inference API available', '2024-02-20'),
    sig('press', 'LPU Speed Records', 'Achieving 500+ tokens/sec on Llama 3', '2024-07-01'),
    sig('partnership', 'Meta AI Partnership', 'Official Llama inference partner', '2024-06-15'),
  ]),
  co('Together AI', 'together.ai', 'The AI cloud for open models', 'Together AI provides a cloud platform for running, training, and fine-tuning open-source AI models.', 'Series A', 'AI Infrastructure', 'AI Cloud', 'San Francisco, CA', 'US', 2022, '51-200', '$225M', '$106M Series A', '2024-02', ['Salesforce Ventures', 'Kleiner Perkins', 'Emergence Capital'], [{ name: 'Vipul Prakash', role: 'CEO' }], ['ai', 'cloud', 'open-source', 'inference'], 80, [
    sig('funding', '$106M Series A', 'Massive Series A for AI infrastructure', '2024-02-01'),
    sig('product', 'Together Inference Engine', '3x faster inference than competitors', '2024-08-20'),
    sig('partnership', 'Databricks Integration', 'Deploy models from Databricks to Together', '2024-06-10'),
  ]),
];
