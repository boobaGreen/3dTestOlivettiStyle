import React, { forwardRef } from 'react';
import { TypewriterText } from './TypewriterText';
import { motion } from 'framer-motion';

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <section className={`min-h-screen flex flex-col justify-center p-8 md:p-20 max-w-6xl mx-auto ${className}`}>
        {children}
    </section>
);

export const Overlay = forwardRef<HTMLDivElement, any>((_props, ref) => {
    return (
        <div ref={ref} className="overlay-container">
            <div className="w-full">
                {/* 1. The Thesis (Monolith) */}
                <Section className="items-start">
                    <TypewriterText text="Oracle" className="text-7xl md:text-9xl mb-2 text-red font-black tracking-tighter" />
                    <TypewriterText text="Supercycle" className="text-7xl md:text-9xl mb-8 text-grey font-black tracking-tighter" delay={0.5} />

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="text-xl md:text-2xl bg-white/90 p-8 border-l-8 border-teal max-w-2xl shadow-2xl backdrop-blur-sm"
                    >
                        <p>
                            Oracles are the "TCP/IP" of the new financial internet.
                            As Real World Assets (RWA) move on-chain, data infrastructure becomes the most valuable asset.
                            <br /><br />
                            <strong>The Problem:</strong> The sector is fragmented. Investing in single tokens is risky and volatile.
                        </p>
                    </motion.div>
                </Section>

                {/* 2. The Solution (Typewriter) */}
                <Section className="items-end text-right justify-center">
                    <TypewriterText text="Kiasma" className="text-6xl md:text-9xl mb-4 text-teal font-bold" />
                    <TypewriterText text="Index" className="text-5xl md:text-7xl mb-8 text-grey font-light" delay={0.3} />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/90 p-8 max-w-xl border-r-8 border-red shadow-xl backdrop-blur-sm"
                    >
                        <p className="text-2xl mb-4 font-bold text-grey">
                            One token (KZM) to capture the entire sector.
                        </p>
                        <p className="text-lg text-grey/80">
                            Automated <strong>ERC-4626</strong> Protocol. Aggregates top Oracle tokens into a single liquid, productive asset.
                        </p>
                    </motion.div>
                </Section>

                {/* 3. The Basket (Composition) */}
                <Section className="items-end text-right justify-center max-w-none w-full">
                    <TypewriterText text="The Basket" className="text-6xl md:text-8xl mb-8 text-orange font-bold" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white/80 p-6 border-t-4 border-blue-600 shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-2 text-blue-800">80% Oracles</h3>
                            <ul className="space-y-2 font-mono text-sm">
                                <li>● LINK (The King) - 50%</li>
                                <li>● PYTH (Challenger) - 20%</li>
                                <li>● BAND, API3, UMA - 10%</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/80 p-6 border-t-4 border-green-600 shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-2 text-green-800">20% Strategic Reserve</h3>
                            <p className="text-sm">
                                USDC & Stablecoin yield.
                                <br />
                                <strong>Function:</strong> Automatic "Buy the Dip" during market crashes.
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* 4. Rebalancing (Gyroscope) */}
                <Section className="items-end text-right justify-center">
                    <TypewriterText text="Smart" className="text-6xl md:text-8xl text-grey font-bold" />
                    <TypewriterText text="Rebalancing" className="text-6xl md:text-8xl mb-8 text-yellow font-bold" delay={0.3} />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-grey text-cream p-8 max-w-2xl shadow-2xl border-4 border-cream"
                    >
                        <p className="text-xl font-mono mb-4">
                            &gt; EXECUTE_PROFIT_CHECK()
                        </p>
                        <p className="text-lg">
                            We don't rebalance blindly. Permissionless Keepers execute trades only when deviation &gt; 5% AND profit covers gas costs.
                            <br /><br />
                            <span className="text-yellow">Maximum efficiency, zero waste.</span>
                        </p>
                    </motion.div>
                </Section>

                {/* 5. Sustainability (Glass Vault) */}
                <Section className="items-end text-right justify-center pt-20 max-w-none w-full">
                    <TypewriterText text="Radical" className="text-6xl md:text-9xl mb-2 text-red font-black" />
                    <TypewriterText text="Truth" className="text-5xl md:text-7xl mb-12 text-grey font-light" />

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/90 p-10 border-8 border-teal shadow-2xl max-w-3xl backdrop-blur-md"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-teal">The "Sustainability Tax"</h3>
                        <p className="text-xl mb-6">
                            Most protocols die because they pay out too much yield. We don't.
                        </p>
                        <div className="bg-grey/10 p-6 rounded text-left font-mono text-sm md:text-base">
                            <p><strong>Dynamic Fee Switch:</strong></p>
                            <p>If Staking &gt; 90%, we activate a yield tax (up to 25%) to fund the Treasury.</p>
                            <p className="mt-4 text-red font-bold">We prefer taxing yield today than letting the protocol die tomorrow.</p>
                        </div>
                    </motion.div>
                </Section>

                {/* 6. The Work (Ladder) - NEW SECTION */}
                <Section className="items-end text-right justify-center max-w-none w-full">
                    <TypewriterText text="Web3 Work" className="text-5xl md:text-8xl mb-4 text-grey font-bold" />
                    <TypewriterText text="Reimagined" className="text-5xl md:text-8xl mb-8 text-orange font-bold" delay={0.3} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-olivetti-cream p-8 border-l-8 border-grey shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-grey">Not Just Bounties. Careers.</h3>
                            <p className="text-lg mb-4">
                                We reject the "gig economy" of low-quality bounties. We offer structured, managed roles with clear deliverables.
                            </p>
                            <ul className="space-y-2 font-mono text-sm">
                                <li>● Paid in Stablecoins (Living Wage)</li>
                                <li>● + KZM Equity (Long-term upside)</li>
                                <li>● Monthly Grants, not one-off tasks</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 border-r-8 border-orange shadow-lg"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-orange">Meritocratic Growth</h3>
                            <p className="text-lg">
                                Start as a Contributor. Prove your value. Become a Core Member.
                            </p>
                            <p className="mt-4 text-sm text-grey italic">
                                "The factory is not just a place of production, but a community." - A. Olivetti
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* 7. Governance (City) */}
                <Section className="items-end text-right justify-center">
                    <TypewriterText text="Humanistic" className="text-5xl md:text-8xl mb-4 text-grey font-bold" />
                    <TypewriterText text="Governance" className="text-5xl md:text-8xl mb-8 text-teal font-bold" />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white/90 p-8 border-r-8 border-grey shadow-lg max-w-2xl backdrop-blur-sm"
                    >
                        <ul className="space-y-6 text-lg text-left">
                            <li className="flex items-start">
                                <span className="text-teal font-bold mr-4">01.</span>
                                <div>
                                    <strong>Quadratic Voting:</strong> 1 vote = 1 token. 2 votes = 4 tokens. Whales cannot dominate.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-teal font-bold mr-4">02.</span>
                                <div>
                                    <strong>Founder Sunset:</strong> Founder power decays over 4 years (5x -&gt; 1x). Planned decentralization.
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </Section>

                {/* 8. Future (Network) */}
                <Section className="items-center text-center justify-center">
                    <TypewriterText text="The Future" className="text-6xl md:text-9xl mb-16 text-teal font-black" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        <motion.div className="bg-white p-6 border-t-4 border-grey shadow-md">
                            <h4 className="font-bold text-xl mb-2">Phase 1: Genesis</h4>
                            <p className="text-sm text-grey">Mainnet Launch, Audits, Angel NFTs.</p>
                        </motion.div>
                        <motion.div className="bg-white p-6 border-t-4 border-teal shadow-md transform scale-110 z-10">
                            <h4 className="font-bold text-xl mb-2">Phase 2: Growth</h4>
                            <p className="text-sm text-grey">$5M TVL, Trading Council, Marketing.</p>
                        </motion.div>
                        <motion.div className="bg-white p-6 border-t-4 border-orange shadow-md">
                            <h4 className="font-bold text-xl mb-2">Phase 3: Leadership</h4>
                            <p className="text-sm text-grey">B2B Data Products, L2 Expansion.</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-20"
                    >
                        <button className="bg-red text-white text-2xl font-bold py-4 px-12 hover:bg-grey transition-colors shadow-xl">
                            JOIN GENESIS
                        </button>
                    </motion.div>
                </Section>

                <div className="h-screen"></div>
            </div>
        </div>
    );
});
