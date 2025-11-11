import React, { useState } from 'react';
import type { NDAFormData } from '../types';
import { generateNDAText } from '../services/NDATemplate';

interface NDAGeneratorProps {
    onGuideClick: () => void;
}

const NDAGenerator: React.FC<NDAGeneratorProps> = ({ onGuideClick }) => {
    const [formData, setFormData] = useState<NDAFormData>({
        type: 'one-way',
        disclosingParty: '',
        receivingParty: '',
        effectiveDate: new Date().toISOString().split('T')[0],
        duration: '2 years',
        confidentialInfoScope: 'Business plans, financial information, customer lists, and trade secrets.',
    });
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = generateNDAText(formData);
        setGeneratedText(text);
    };

    const handleCopy = () => {
        if (generatedText) {
            navigator.clipboard.writeText(generatedText).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleDownload = () => {
        if (generatedText) {
            const blob = new Blob([generatedText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'NDA.docx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
    
    const inputStyles = "w-full bg-slate-900/50 border border-slate-700 rounded-lg shadow-sm py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors";

    return (
        <section id="generator" className="bg-slate-900/70 border border-white/10 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-lg">
            <div className="text-center mb-10">
                <div className="flex justify-center items-center gap-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Non-Disclosure Agreement Generator</h1>
                    <button 
                        onClick={onGuideClick} 
                        className="text-gray-400 hover:text-white transition-colors"
                        title="How to use the generator"
                        aria-label="How to use the generator"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                    </button>
                </div>
                <p className="text-indigo-300 mt-3 text-lg">Fill in the details below to generate your NDA instantly.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">NDA Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} className={inputStyles}>
                        <option value="one-way">One-Way NDA</option>
                        <option value="mutual">Mutual NDA</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="disclosingParty" className="block text-sm font-medium text-gray-300 mb-2">Disclosing Party Name</label>
                    <input type="text" id="disclosingParty" name="disclosingParty" value={formData.disclosingParty} onChange={handleChange} required className={inputStyles} placeholder="e.g., Acme Corporation" />
                </div>
                <div>
                    <label htmlFor="receivingParty" className="block text-sm font-medium text-gray-300 mb-2">Receiving Party Name</label>
                    <input type="text" id="receivingParty" name="receivingParty" value={formData.receivingParty} onChange={handleChange} required className={inputStyles} placeholder="e.g., Beta Innovations LLC" />
                </div>
                <div>
                    <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-300 mb-2">Effective Date</label>
                    <input type="date" id="effectiveDate" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} required className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">Duration of Confidentiality</label>
                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required className={inputStyles} placeholder="e.g., 5 years, Perpetual" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="confidentialInfoScope" className="block text-sm font-medium text-gray-300 mb-2">Definition of Confidential Information</label>
                    <textarea id="confidentialInfoScope" name="confidentialInfoScope" rows={4} value={formData.confidentialInfoScope} onChange={handleChange} required className={inputStyles} placeholder="Describe the scope of information to be kept confidential."></textarea>
                </div>

                <div className="md:col-span-2 text-center mt-4">
                    <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                        Generate NDA Text
                    </button>
                </div>
            </form>

            {generatedText && (
                <div className="mt-10 pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-4 text-center">Your Generated NDA is Ready</h2>
                    <div className="relative">
                        <textarea readOnly value={generatedText} className="w-full h-96 bg-slate-950/70 border border-slate-700 rounded-lg p-4 text-gray-300 font-mono text-sm leading-relaxed focus:outline-none" />
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleCopy} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-300">
                            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                        </button>
                        <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors duration-300">
                            Download as .DOCX
                        </button>
                    </div>
                </div>
            )}
            
            <div className="mt-10 text-center text-xs text-gray-500 p-4 bg-slate-950/50 rounded-lg">
                <p><span className="font-bold">Disclaimer:</span> This tool generates a basic NDA template for informational purposes only and does not constitute legal advice. You should consult with a qualified attorney for your specific legal needs.</p>
            </div>
        </section>
    );
};

export default NDAGenerator;