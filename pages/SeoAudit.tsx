import React from 'react';
import { SeoAuditForm } from '../components/SeoAuditForm';
import { SEO } from '../components/SEO';

export const SeoAudit: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900 text-base leading-relaxed break-words">
            <SEO title="Free SEO Audit | Optimantix Global" description="Get Your Free SEO Audit — Know Exactly Why You're Not Ranking" />
            <style dangerouslySetInnerHTML={{__html: `
            h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; line-height: 1.2; }
            .hero-bg { background: #1a1a2e; }
            `}} />
            
            {/* HERO + FORM */}
            <section className="hero-bg pt-14 pb-14 px-6 md:px-10 lg:pl-16 lg:pr-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="hero-left pb-8 lg:pb-14">
                        <div className="hero-badge inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded px-3.5 py-1.5 mb-5">
                            <div className="hero-badge-dot w-2 h-2 rounded-full bg-[#e8531a]"></div>
                            <span className="hero-badge-text text-[11px] font-medium tracking-widest uppercase text-orange-500">Free — No Obligation</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white mb-4">
                            Get Your <em className="text-[#e8531a] not-italic">Free SEO Audit</em> — Know Exactly Why You're Not Ranking
                        </h1>
                        <p className="hero-sub text-sm text-white/60 leading-loose mb-7 max-w-md">
                            In under 48 hours, our SEO experts will analyse your website and send you a personalised report showing what's holding you back — and exactly how to fix it.
                        </p>
                        <div className="what-you-get flex flex-col gap-3 mb-8">
                            <div className="wg-item flex items-start gap-2.5">
                                <div className="wg-check w-[18px] h-[18px] rounded-full bg-[#0f6e56]/25 border border-[#0f6e56]/50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-[#5dcaa5] font-bold">✓</span></div>
                                <div className="wg-text text-[13px] text-white/75 leading-relaxed"><strong className="text-white font-medium">Technical SEO health check</strong> — speed, crawl errors, Core Web Vitals</div>
                            </div>
                            <div className="wg-item flex items-start gap-2.5">
                                <div className="wg-check w-[18px] h-[18px] rounded-full bg-[#0f6e56]/25 border border-[#0f6e56]/50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-[#5dcaa5] font-bold">✓</span></div>
                                <div className="wg-text text-[13px] text-white/75 leading-relaxed"><strong className="text-white font-medium">Keyword gap analysis</strong> — opportunities your competitors are stealing</div>
                            </div>
                            <div className="wg-item flex items-start gap-2.5">
                                <div className="wg-check w-[18px] h-[18px] rounded-full bg-[#0f6e56]/25 border border-[#0f6e56]/50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-[#5dcaa5] font-bold">✓</span></div>
                                <div className="wg-text text-[13px] text-white/75 leading-relaxed"><strong className="text-white font-medium">On-page SEO score</strong> — titles, meta, headers, content structure</div>
                            </div>
                            <div className="wg-item flex items-start gap-2.5">
                                <div className="wg-check w-[18px] h-[18px] rounded-full bg-[#0f6e56]/25 border border-[#0f6e56]/50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-[#5dcaa5] font-bold">✓</span></div>
                                <div className="wg-text text-[13px] text-white/75 leading-relaxed"><strong className="text-white font-medium">Backlink profile overview</strong> — domain authority & link quality</div>
                            </div>
                            <div className="wg-item flex items-start gap-2.5">
                                <div className="wg-check w-[18px] h-[18px] rounded-full bg-[#0f6e56]/25 border border-[#0f6e56]/50 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] text-[#5dcaa5] font-bold">✓</span></div>
                                <div className="wg-text text-[13px] text-white/75 leading-relaxed"><strong className="text-white font-medium">Top 3 quick-win recommendations</strong> — actionable fixes you can start today</div>
                            </div>
                        </div>
                        <div className="hero-trust flex gap-5 flex-wrap border-t border-white/10 pt-6">
                            <div className="ht-item flex flex-col"><div className="ht-num font-syne text-[22px] font-extrabold text-[#e8531a]">500+</div><div className="ht-label text-[11px] text-white/40 mt-px">Audits delivered</div></div>
                            <div className="ht-item flex flex-col"><div className="ht-num font-syne text-[22px] font-extrabold text-[#e8531a]">48hr</div><div className="ht-label text-[11px] text-white/40 mt-px">Turnaround time</div></div>
                            <div className="ht-item flex flex-col"><div className="ht-num font-syne text-[22px] font-extrabold text-[#e8531a]">100%</div><div className="ht-label text-[11px] text-white/40 mt-px">Free, no strings</div></div>
                        </div>
                    </div>

                    {/* FORM */}
                    <SeoAuditForm />
                </div>
            </section>

            {/* WHAT'S INCLUDED IN THE AUDIT */}
            <section className="included py-[60px] px-6 md:px-10 bg-[#f7f5f0]">
                <div className="max-w-6xl mx-auto">
                    <div className="sec-label text-[11px] tracking-[0.13em] uppercase text-[#e8531a] font-medium mb-2.5">What You'll Receive</div>
                    <h2 className="sec-title font-syne text-[clamp(20px,2.8vw,30px)] font-bold text-[#1a1a2e] mb-2.5">Your Free SEO Audit Covers 6 Critical Areas</h2>
                    <p className="sec-sub text-sm text-[#6b6b7a] max-w-2xl leading-relaxed mb-9">This isn't a generic automated report. Our SEO specialists manually review your site across every factor that impacts your Google rankings.</p>
                    <div className="audit-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">01</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">Technical SEO Health</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Site speed, mobile-friendliness, Core Web Vitals, crawl errors, XML sitemap, robots.txt, and indexation issues.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#e6f1fb] text-[#185fa5] mt-2.5">Technical</span>
                        </div>
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">02</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">On-Page Optimisation</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Title tags, meta descriptions, H1–H3 structure, keyword usage, image alt text, internal linking, and schema markup.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#fff0e8] text-[#993c1d] mt-2.5">On-Page</span>
                        </div>
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">03</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">Keyword Gap Analysis</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Which high-value keywords your competitors rank for that you're missing — and the traffic opportunity each represents.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#eaf3de] text-[#3b6d11] mt-2.5">Keywords</span>
                        </div>
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">04</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">Backlink Profile</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Your current domain authority, quality of existing backlinks, toxic link risks, and comparison to top 3 competitors.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#fff0e8] text-[#993c1d] mt-2.5">Authority</span>
                        </div>
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">05</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">Content Quality Score</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Thin content, duplicate pages, content gaps, and whether your existing pages match the search intent of target keywords.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#e6f1fb] text-[#185fa5] mt-2.5">Content</span>
                        </div>
                        <div className="audit-card bg-white border border-[#e2e0da] rounded-xl p-5">
                            <div className="audit-num font-syne text-[28px] font-extrabold text-[#e8531a]/25 mb-2 leading-none">06</div>
                            <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1.5 font-syne">Top 3 Quick Wins</h4>
                            <p className="text-xs text-[#6b6b7a] leading-relaxed">Specific, prioritised action items your team can implement immediately to start moving rankings within 30 days.</p>
                            <span className="audit-tag inline-block text-[10px] font-medium tracking-[0.07em] uppercase px-2.5 py-1 rounded bg-[#eaf3de] text-[#3b6d11] mt-2.5">Action Plan</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="process py-[60px] px-6 md:px-10 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="sec-label text-[11px] tracking-[0.13em] uppercase text-[#e8531a] font-medium mb-2.5 text-center md:text-left">How It Works</div>
                    <h2 className="sec-title font-syne text-[clamp(20px,2.8vw,30px)] font-bold text-[#1a1a2e] mb-2.5 text-center md:text-left">From Request to Report in 4 Simple Steps</h2>
                    <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                        <div className="hidden md:block absolute top-[20px] left-[10%] right-[10%] h-[0.5px] bg-[#e2e0da] z-0"></div>
                        <div className="p-step flex flex-col items-center text-center relative z-10 px-2 active">
                            <div className="p-circle w-10 h-10 rounded-full bg-[#e8531a] text-white flex items-center justify-center font-syne text-sm font-bold mb-3.5 shadow-md">1</div>
                            <h5 className="font-semibold text-[13px] text-[#1a1a2e] mb-1 font-syne">Submit the Form</h5>
                            <p className="text-[11px] text-[#6b6b7a] leading-relaxed max-w-[160px]">Share your website URL and business details above</p>
                        </div>
                        <div className="p-step flex flex-col items-center text-center relative z-10 px-2">
                            <div className="p-circle w-10 h-10 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center font-syne text-sm font-bold mb-3.5">2</div>
                            <h5 className="font-semibold text-[13px] text-[#1a1a2e] mb-1 font-syne">We Analyse Your Site</h5>
                            <p className="text-[11px] text-[#6b6b7a] leading-relaxed max-w-[160px]">Our SEO team audits your website across all 6 areas</p>
                        </div>
                        <div className="p-step flex flex-col items-center text-center relative z-10 px-2">
                            <div className="p-circle w-10 h-10 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center font-syne text-sm font-bold mb-3.5">3</div>
                            <h5 className="font-semibold text-[13px] text-[#1a1a2e] mb-1 font-syne">Receive Your Report</h5>
                            <p className="text-[11px] text-[#6b6b7a] leading-relaxed max-w-[160px]">Personalised audit report delivered to your inbox in 48hrs</p>
                        </div>
                        <div className="p-step flex flex-col items-center text-center relative z-10 px-2">
                            <div className="p-circle w-10 h-10 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center font-syne text-sm font-bold mb-3.5">4</div>
                            <h5 className="font-semibold text-[13px] text-[#1a1a2e] mb-1 font-syne">Free Strategy Call</h5>
                            <p className="text-[11px] text-[#6b6b7a] leading-relaxed max-w-[160px]">Our expert walks you through findings — no obligation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testi py-[60px] px-6 md:px-10 bg-[#1a1a2e]">
                <div className="max-w-6xl mx-auto">
                    <div className="sec-label text-[11px] tracking-[0.13em] uppercase text-[#e8531a]/90 font-medium mb-2.5">What Clients Say</div>
                    <h2 className="sec-title font-syne text-[clamp(20px,2.8vw,30px)] font-bold text-white mb-2.5">Businesses That Started With a Free Audit</h2>
                    <div className="testi-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-9">
                        <div className="testi-card bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="t-stars text-[#e8531a] text-[13px] tracking-widest mb-3">★★★★★</div>
                            <p className="t-quote text-[13px] text-white/70 leading-[1.75] italic mb-4">"The free audit Optimantix sent us was more detailed than reports we paid agencies for. It clearly showed why our traffic had dropped and gave us a roadmap to fix it."</p>
                            <div className="t-author text-xs font-medium text-white font-syne">Sunita Kapoor</div>
                            <div className="t-role text-[11px] text-white/35 mt-0.5">CEO, Fashion ecommerce — Mumbai</div>
                        </div>
                        <div className="testi-card bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="t-stars text-[#e8531a] text-[13px] tracking-widest mb-3">★★★★★</div>
                            <p className="t-quote text-[13px] text-white/70 leading-[1.75] italic mb-4">"I filled the form expecting a generic checklist. Instead I got a 12-page personalised report with competitor data and exact fixes. Signed up for their SEO service the same week."</p>
                            <div className="t-author text-xs font-medium text-white font-syne">Karan Malhotra</div>
                            <div className="t-role text-[11px] text-white/35 mt-0.5">Founder, B2B SaaS — Bangalore</div>
                        </div>
                        <div className="testi-card bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="t-stars text-[#e8531a] text-[13px] tracking-widest mb-3">★★★★★</div>
                            <p className="t-quote text-[13px] text-white/70 leading-[1.75] italic mb-4">"The strategy call after the audit was genuinely eye-opening. They identified 3 technical issues killing our rankings that we had no idea about. Highly recommend requesting this."</p>
                            <div className="t-author text-xs font-medium text-white font-syne">Deepak Nair</div>
                            <div className="t-role text-[11px] text-white/35 mt-0.5">Marketing Manager, Real Estate — Delhi</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq py-[60px] px-6 md:px-10 bg-[#f7f5f0]">
                <div className="max-w-4xl mx-auto">
                    <div className="sec-label text-[11px] tracking-[0.13em] uppercase text-[#e8531a] font-medium mb-2.5">Common Questions</div>
                    <h2 className="sec-title font-syne text-[clamp(20px,2.8vw,30px)] font-bold text-[#1a1a2e] mb-2.5">FAQ About the Free SEO Audit</h2>
                    <div className="faq-list flex flex-col mt-9">
                        <div className="faq-item border-b border-[#e2e0da] py-5">
                            <p className="faq-q font-syne text-sm font-semibold text-[#1a1a2e] mb-2">Is this audit really free? What's the catch?</p>
                            <p className="faq-a text-[13px] text-[#6b6b7a] leading-[1.75]">Yes, completely free — no credit card, no commitment. We offer free audits because we're confident that once you see the depth of our analysis and the quality of our recommendations, you'll want to work with us. There is zero obligation to sign up for any paid service.</p>
                        </div>
                        <div className="faq-item border-b border-[#e2e0da] py-5">
                            <p className="faq-q font-syne text-sm font-semibold text-[#1a1a2e] mb-2">How long does the audit take to deliver?</p>
                            <p className="faq-a text-[13px] text-[#6b6b7a] leading-[1.75]">We deliver your personalised audit report within 24–48 hours of receiving your request. You'll get an email confirmation immediately after submitting, and the full report shortly after.</p>
                        </div>
                        <div className="faq-item border-b border-[#e2e0da] py-5">
                            <p className="faq-q font-syne text-sm font-semibold text-[#1a1a2e] mb-2">Is this an automated tool report or a manual audit?</p>
                            <p className="faq-a text-[13px] text-[#6b6b7a] leading-[1.75]">It's a manual audit by our SEO specialists — not a generic automated scan. We use professional tools alongside human analysis to give you insights that actually reflect your specific business situation and competitive landscape.</p>
                        </div>
                        <div className="faq-item border-b border-[#e2e0da] py-5">
                            <p className="faq-q font-syne text-sm font-semibold text-[#1a1a2e] mb-2">What happens after I receive the audit?</p>
                            <p className="faq-a text-[13px] text-[#6b6b7a] leading-[1.75]">We'll schedule a free 30-minute strategy call to walk you through the findings, answer your questions, and recommend the right next steps — whether that's hiring us or implementing fixes yourself. No pressure either way.</p>
                        </div>
                        <div className="faq-item border-b border-[#e2e0da] py-5">
                            <p className="faq-q font-syne text-sm font-semibold text-[#1a1a2e] mb-2">My website is on Shopify / WordPress — does that matter?</p>
                            <p className="faq-a text-[13px] text-[#6b6b7a] leading-[1.75]">Not at all. We audit websites on any platform — Shopify, WordPress, Wix, custom builds, or anything else. If anything, knowing your platform helps us give more specific, actionable recommendations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="bottom-cta py-14 px-6 bg-[#e8531a] text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-syne text-[clamp(20px,3vw,32px)] font-extrabold text-white mb-3">Still Thinking? Your Competitors Aren't.</h2>
                    <p className="text-white/80 text-sm max-w-[420px] mx-auto mb-7 leading-relaxed">Every day without an SEO strategy is traffic — and revenue — going to someone else. Request your free audit now.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button className="bg-white text-[#e8531a] font-syne font-bold text-sm py-3.5 px-7 rounded-md hover:bg-gray-100 transition-colors" onClick={() => document.getElementById('audit-form')?.scrollIntoView({behavior:'smooth'})}>Get My Free SEO Audit</button>
                        <a href="https://wa.me/919910343016?text=Hi%2C%20I%27d%20like%20a%20free%20SEO%20audit" target="_blank" rel="noreferrer" className="bg-white/15 text-white border border-white/30 font-syne font-semibold text-sm py-3.5 px-7 rounded-md hover:bg-white/20 transition-colors">Chat on WhatsApp</a>
                    </div>
                </div>
            </section>
        </div>
    );
};
