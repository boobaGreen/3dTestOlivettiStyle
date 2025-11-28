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
                {/* Section 1: Intro */}
                <Section className="items-start">
                    <TypewriterText text="Visione" className="text-7xl md:text-9xl mb-2 text-red font-black tracking-tighter" />
                    <TypewriterText text="Radicale" className="text-7xl md:text-9xl mb-8 text-grey font-black tracking-tighter" delay={0.5} />

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="text-xl md:text-3xl bg-white/90 p-8 border-l-8 border-teal max-w-2xl shadow-2xl backdrop-blur-sm"
                    >
                        <p>
                            Adriano Olivetti ha costruito una visione radicale e utopica per l’impresa e la società.
                            Dal 1933 al 1960, ha trasformato una fabbrica di macchine da scrivere in un faro di avanguardia tecnologica e culturale.
                        </p>
                    </motion.div>
                </Section>

                {/* Section 2: Comunità */}
                <Section className="items-end text-right justify-start pt-32">
                    <TypewriterText text="Comunità" className="text-6xl md:text-8xl mb-6 text-teal font-bold" />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/90 p-8 max-w-xl border-r-8 border-red shadow-xl backdrop-blur-sm"
                    >
                        <p className="text-2xl mb-6 font-bold text-grey">
                            La fabbrica non solo come luogo di produzione, ma come una piccola società.
                        </p>
                        <p className="text-lg text-grey/80">
                            Mense, asili, biblioteche e cultura accessibili a tutti. Il benessere fisico e sociale come motore della produttività.
                        </p>
                    </motion.div>
                </Section>

                {/* Section 3: Lavoro */}
                <Section className="items-start">
                    <TypewriterText text="Lavoro" className="text-6xl md:text-8xl text-grey font-bold" />
                    <TypewriterText text="Partecipativo" className="text-6xl md:text-8xl mb-8 text-orange font-bold" delay={0.3} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-olivetti-cream p-8 border-4 border-grey shadow-lg"
                        >
                            <p className="text-xl font-mono">
                                Settimana corta, salari alti, maternità lunga.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-red p-8 text-white shadow-lg"
                        >
                            <p className="text-xl font-bold italic">
                                "Far lavorare le persone in ruoli preferiti incrementa produttività e soddisfazione."
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* Section 4: Cultura & Innovazione */}
                <Section className="items-center text-center justify-center py-20">
                    <TypewriterText text="Cultura & Innovazione" className="text-5xl md:text-8xl mb-20 text-grey font-black" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-5xl w-full">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/80 p-8 border-t-4 border-teal hover:shadow-2xl transition-all backdrop-blur-md"
                        >
                            <h3 className="text-3xl mb-4 text-teal font-bold">Educazione</h3>
                            <p className="text-lg">Corsi di storia, politica, arte. L'educazione come chiave per il futuro.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/80 p-8 border-t-4 border-orange hover:shadow-2xl transition-all backdrop-blur-md"
                        >
                            <h3 className="text-3xl mb-4 text-orange font-bold">Design</h3>
                            <p className="text-lg">Eccellenza tecnica e bellezza. Dal computer Elea alle iconiche macchine da scrivere.</p>
                        </motion.div>
                    </div>
                </Section>

                {/* Section 5: Urbanistica */}
                <Section className="items-start text-left justify-center pb-20">
                    <TypewriterText text="Città Ideale" className="text-6xl md:text-8xl mb-6 text-yellow font-bold" />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-2xl md:text-4xl max-w-3xl bg-white/90 p-8 border-b-8 border-grey leading-tight backdrop-blur-sm"
                    >
                        Fabbriche luminose, aperte, integrate nel paesaggio. Un sistema industriale che unisce industria, lavoro e società.
                    </motion.p>
                </Section>

                {/* Section 6: Web3 Vision */}
                <Section className="items-center text-center justify-center py-20">
                    <TypewriterText text="Il Futuro Web3" className="text-6xl md:text-9xl mb-16 text-red font-black" />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className="bg-grey/95 text-cream p-12 font-mono text-lg md:text-xl max-w-4xl shadow-2xl w-full backdrop-blur-sm border-4 border-cream"
                    >
                        <p className="mb-8 border-b border-cream/20 pb-4 text-center">
                            &gt; ISPIRAZIONE: OLIVETTI<br />
                            &gt; OBIETTIVO: ORACLE WEB3 SOSTENIBILE<br />
                            &gt; CAPITALE: COMUNITÀ
                        </p>
                        <ul className="space-y-6 text-left pl-4 md:pl-10">
                            <li className="flex items-center"><span className="text-teal mr-4 text-2xl">●</span> Sfruttare il capitale della comunità (Time, Skills, Ideas).</li>
                            <li className="flex items-center"><span className="text-yellow mr-4 text-2xl">●</span> Open Source & Trasparenza totale.</li>
                            <li className="flex items-center"><span className="text-orange mr-4 text-2xl">●</span> Token Economy per governance e partecipazione reale.</li>
                            <li className="flex items-center"><span className="text-red mr-4 text-2xl">●</span> Smart Contracts semplici e sicuri come base.</li>
                        </ul>
                    </motion.div>
                </Section>

                {/* Section 7: Roadmap */}
                <Section className="items-center">
                    <div className="text-center mb-16">
                        <TypewriterText text="Roadmap" className="text-5xl md:text-7xl mb-4 text-teal font-bold" />
                        <p className="text-xl font-mono text-grey">Fase 1 -&gt; Fase 2 -&gt; Fase 3</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Phase 1 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="border-4 border-grey p-6 bg-white hover:bg-yellow transition-colors group h-full flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Fase 1: Fondazione</h3>
                                <p className="text-sm font-mono mb-4 group-hover:text-white/80">0-6 Mesi</p>
                            </div>
                            <p className="text-lg group-hover:text-white">MVP, Angel NFT, Community Building.</p>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="border-4 border-grey p-6 bg-white hover:bg-teal transition-colors group h-full flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Fase 2: Crescita</h3>
                                <p className="text-sm font-mono mb-4 group-hover:text-white/80">6-18 Mesi</p>
                            </div>
                            <p className="text-lg group-hover:text-white">Lancio pubblico, Servizi Oracle, Monetizzazione.</p>
                        </motion.div>

                        {/* Phase 3 */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="border-4 border-grey p-6 bg-white hover:bg-red transition-colors group h-full flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Fase 3: Leadership</h3>
                                <p className="text-sm font-mono mb-4 group-hover:text-white/80">18-36+ Mesi</p>
                            </div>
                            <p className="text-lg group-hover:text-white">Ecosistema autonomo, DAO matura.</p>
                        </motion.div>
                    </div>
                </Section>

                <div className="h-screen"></div> {/* Extra space for final scroll */}
            </div>
        </div>
    );
});
