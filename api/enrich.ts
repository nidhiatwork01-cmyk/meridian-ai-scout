const FETCH_TIMEOUT_MS = 10000;
const MAX_PAGES = 3;
const MIN_TEXT_LENGTH = 120;
const MAX_PAGE_CHARS = 6000;
const MAX_COMBINED_CHARS = 14000;

type SignalType = 'positive' | 'neutral' | 'warning';

type EnrichPayload = {
  website?: string;
  companyName?: string;
};

type FetchedPage = {
  url: string;
  text: string;
};

type EnrichResult = {
  summary: string;
  bullets: string[];
  keywords: string[];
  signals: { label: string; description: string; type: SignalType }[];
  sources: { url: string; fetchedAt: string }[];
  enrichedAt: string;
};

function normalizeWebsite(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error('Website is required');
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  parsed.hash = '';
  return parsed.toString().replace(/\/$/, '');
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim();
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'MeridianScoutBot/1.0 (+https://vercel.com)',
        accept: 'text/html,application/xhtml+xml,text/plain',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchLivePages(website: string): Promise<FetchedPage[]> {
  const normalized = normalizeWebsite(website);
  const base = new URL(normalized);
  const candidates = [
    normalized,
    `${base.origin}/about`,
    `${base.origin}/about-us`,
    `${base.origin}/company`,
    `${base.origin}/blog`,
    `${base.origin}/careers`,
  ];

  const unique = [...new Set(candidates)];
  const pages: FetchedPage[] = [];

  for (const url of unique) {
    if (pages.length >= MAX_PAGES) break;
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('text/html') && !contentType.includes('text/plain')) continue;
      const raw = await res.text();
      const text = stripHtml(raw).slice(0, MAX_PAGE_CHARS);
      if (text.length < MIN_TEXT_LENGTH) continue;
      pages.push({ url, text });
    } catch {
      // Skip pages that fail and continue enrichment from other sources.
    }
  }

  return pages;
}

function uniqueSentences(input: string): string[] {
  const chunks = input
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 45 && s.length < 220);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const sentence of chunks) {
    const key = sentence.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(sentence);
  }
  return out;
}

function keywordCandidates(input: string): string[] {
  const stopwords = new Set([
    'about', 'after', 'also', 'been', 'being', 'from', 'have', 'into', 'more', 'most',
    'that', 'their', 'there', 'these', 'this', 'those', 'with', 'your', 'will', 'than',
    'such', 'they', 'them', 'over', 'under', 'when', 'where', 'which', 'what', 'were',
    'while', 'across', 'platform', 'solution', 'company', 'team', 'customers',
  ]);
  const words = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && w.length < 24 && !stopwords.has(w));

  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
}

function inferSignals(input: string): { label: string; description: string; type: SignalType }[] {
  const lower = input.toLowerCase();
  const candidates: { label: string; description: string; type: SignalType; re: RegExp }[] = [
    { label: 'Hiring Momentum', description: 'Evidence of active team expansion.', type: 'positive', re: /\b(careers|hiring|open roles|join our team)\b/i },
    { label: 'Product Velocity', description: 'Signals of frequent launches or product updates.', type: 'positive', re: /\b(launch|released|new feature|changelog|roadmap)\b/i },
    { label: 'Enterprise Focus', description: 'Positioning suggests B2B/enterprise go-to-market.', type: 'neutral', re: /\b(enterprise|platform|workflow|security|compliance)\b/i },
    { label: 'Funding Signal', description: 'References to raise/investment activity.', type: 'positive', re: /\b(raised|funding|series|seed|investors?)\b/i },
    { label: 'Execution Risk', description: 'Very limited public signal density from website content.', type: 'warning', re: /\b(coming soon|stealth|under construction)\b/i },
  ];

  const signals = candidates.filter((c) => c.re.test(lower)).map(({ re, ...rest }) => rest);
  if (signals.length > 0) return signals.slice(0, 5);

  return [
    {
      label: 'Limited Public Signals',
      description: 'Website provides broad positioning but few concrete operating signals.',
      type: 'neutral',
    },
  ];
}

function buildHeuristicResult(companyName: string, pages: FetchedPage[], nowIso: string): EnrichResult {
  const combined = pages.map((p) => p.text).join('\n').slice(0, MAX_COMBINED_CHARS);
  const sentences = uniqueSentences(combined);
  const summary =
    sentences[0] ||
    `${companyName} appears active with publicly available product and company information.`;

  const bullets = (sentences.length ? sentences : [summary]).slice(0, 5);
  const keywords = keywordCandidates(combined);
  const signals = inferSignals(combined);

  return {
    summary,
    bullets,
    keywords,
    signals,
    sources: pages.map((p) => ({ url: p.url, fetchedAt: nowIso })),
    enrichedAt: nowIso,
  };
}

function parseJsonBlock(content: string): unknown {
  const trimmed = content.trim();
  if (trimmed.startsWith('```')) {
    const cleaned = trimmed
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '')
      .trim();
    return JSON.parse(cleaned);
  }
  return JSON.parse(trimmed);
}

async function summarizeWithOpenAI(companyName: string, pages: FetchedPage[]): Promise<EnrichResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const nowIso = new Date().toISOString();
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const sourceText = pages
    .map((p, i) => `Source ${i + 1}: ${p.url}\n${p.text}`)
    .join('\n\n')
    .slice(0, MAX_COMBINED_CHARS);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You are a venture research analyst. Use only supplied source text. Return concise factual output as JSON.',
        },
        {
          role: 'user',
          content: [
            `Company: ${companyName}`,
            'Build an enrichment payload with:',
            '- summary: one short paragraph',
            '- bullets: 3 to 5 concrete findings',
            '- keywords: 5 to 8 relevant keywords',
            '- signals: 2 to 5 derived signals with {label, description, type} and type in [positive, neutral, warning]',
            'Use only evidence from provided text. Avoid speculation.',
            '',
            sourceText,
          ].join('\n'),
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'enrichment_payload',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['summary', 'bullets', 'keywords', 'signals'],
            properties: {
              summary: { type: 'string' },
              bullets: {
                type: 'array',
                minItems: 3,
                maxItems: 5,
                items: { type: 'string' },
              },
              keywords: {
                type: 'array',
                minItems: 5,
                maxItems: 8,
                items: { type: 'string' },
              },
              signals: {
                type: 'array',
                minItems: 2,
                maxItems: 5,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['label', 'description', 'type'],
                  properties: {
                    label: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string', enum: ['positive', 'neutral', 'warning'] },
                  },
                },
              },
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const details = await res.text();
    throw new Error(`OpenAI error (${res.status}): ${details}`);
  }

  const payload = await res.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error('OpenAI response did not include JSON content');
  }

  const parsed = parseJsonBlock(content) as Omit<EnrichResult, 'sources' | 'enrichedAt'>;
  return {
    summary: parsed.summary,
    bullets: parsed.bullets,
    keywords: parsed.keywords,
    signals: parsed.signals,
    sources: pages.map((p) => ({ url: p.url, fetchedAt: nowIso })),
    enrichedAt: nowIso,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = (req.body || {}) as EnrichPayload;
    const website = body.website?.trim();
    if (!website) return res.status(400).json({ error: 'Missing required field: website' });

    const companyName = body.companyName?.trim() || 'Company';
    const pages = await fetchLivePages(website);
    if (pages.length === 0) {
      return res.status(502).json({ error: 'Could not fetch enough public content from the website.' });
    }

    try {
      const aiResult = await summarizeWithOpenAI(companyName, pages);
      if (aiResult) return res.status(200).json(aiResult);
    } catch (err) {
      console.error('AI enrichment failed, returning heuristic fallback:', err);
    }

    const nowIso = new Date().toISOString();
    return res.status(200).json(buildHeuristicResult(companyName, pages, nowIso));
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Enrichment failed' });
  }
}
