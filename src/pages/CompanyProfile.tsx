import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { StageBadge } from '@/components/companies/StageBadge';
import { ArrowLeft, ExternalLink, Globe, Users, Calendar, MapPin, Banknote, Compass, CheckCircle2, AlertTriangle, MinusCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = ['Overview', 'Signals', 'Enrichment', 'Notes'] as const;

export default function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = useStore((s) => s.companies.find((c) => c.id === id));
  const updateNote = useStore((s) => s.updateNote);
  const companyNotes = useStore((s) => s.companyNotes);
  const lists = useStore((s) => s.lists);
  const addCompanyToList = useStore((s) => s.addCompanyToList);
  const removeCompanyFromList = useStore((s) => s.removeCompanyFromList);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview');

  if (!company) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Company not found</p>
      </div>
    );
  }

  const signalTypeColors: Record<string, string> = {
    hiring: 'text-info', funding: 'text-success', product: 'text-stage-preseed',
    press: 'text-muted-foreground', partnership: 'text-primary', exec_move: 'text-warning',
  };

  const allCompanies = useStore((s) => s.companies);
  const similarCompanies = allCompanies.filter((c) => c.id !== company.id && c.sector === company.sector).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/companies')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Discover
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <img src={company.logo} alt="" className="h-16 w-16 rounded-lg bg-secondary object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
                <p className="text-muted-foreground mt-0.5">{company.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <StageBadge stage={company.stage} />
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{company.hq}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Founded {company.founded}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{company.employees}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <a href={company.website} target="_blank" rel="noopener" className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Globe className="h-3 w-3" /> Website <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="text-center shrink-0">
                <div className="relative h-16 w-16">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray={`${company.thesisMatch} ${100 - company.thesisMatch}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{company.thesisMatch}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Thesis Match</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                  activeTab === t ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-foreground'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Founders</h3>
                <div className="grid grid-cols-2 gap-3">
                  {company.founders.map((f) => (
                    <div key={f.name} className="flex items-center gap-3 p-3 rounded-md bg-secondary/30">
                      <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary">
                        {f.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Financials</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Raised</p>
                    <p className="text-lg font-semibold text-foreground">{company.totalRaised}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Round</p>
                    <p className="text-lg font-semibold text-foreground">{company.lastRound}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Round Date</p>
                    <p className="text-lg font-semibold text-foreground">{company.lastRoundDate}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Investors</h3>
                <div className="flex flex-wrap gap-2">
                  {company.investors.map((inv) => (
                    <span key={inv} className="px-2.5 py-1 rounded-md bg-secondary text-xs text-secondary-foreground font-medium">{inv}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {company.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-primary/10 text-xs text-primary font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Signals' && (
            <div className="space-y-3">
              {company.signals.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">No signals recorded</div>
              ) : (
                company.signals.map((s) => (
                  <div key={s.id} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                    <span className="text-xl">{s.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-medium uppercase', signalTypeColors[s.type])}>{s.type.replace('_', ' ')}</span>
                        <span className="text-xs text-muted-foreground">{s.date}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                      {s.source && (
                        <a href={`https://${s.source}`} target="_blank" rel="noopener" className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
                          {s.source} <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Enrichment' && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Enrich this company</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Fetch public website, about page, blog, and careers page to extract structured insights with AI.
              </p>
              <button className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                🔍 Enrich Now
              </button>
              <p className="text-xs text-muted-foreground mt-3">Requires backend connection</p>
            </div>
          )}

          {activeTab === 'Notes' && (
            <div className="rounded-lg border border-border bg-card p-5">
              <textarea
                value={companyNotes[company.id] || company.notes || ''}
                onChange={(e) => updateNote(company.id, e.target.value)}
                placeholder="Add your investment thesis notes, meeting summaries, or follow-up items..."
                className="w-full min-h-[200px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Save to list */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Save to List</h3>
            <div className="space-y-2">
              {lists.map((list) => {
                const inList = list.companyIds.includes(company.id);
                return (
                  <button
                    key={list.id}
                    onClick={() => inList ? removeCompanyFromList(company.id, list.id) : addCompanyToList(company.id, list.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                      inList ? 'bg-primary/10 text-primary' : 'bg-secondary/30 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {list.name}
                    <span className="text-xs">{inList ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Signal Score</span>
                <span className="font-mono text-foreground">{company.signalScore}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Signals</span>
                <span className="font-mono text-foreground">{company.signals.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sector</span>
                <span className="text-foreground">{company.sector}</span>
              </div>
            </div>
          </div>

          {/* Similar companies */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Similar Companies</h3>
            <div className="space-y-2">
              {similarCompanies.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => navigate(`/companies/${sc.id}`)}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-secondary/30 transition-colors text-left"
                >
                  <img src={sc.logo} alt="" className="h-6 w-6 rounded bg-secondary object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">{sc.name}</p>
                    <p className="text-xs text-muted-foreground">{sc.stage}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{sc.thesisMatch}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
