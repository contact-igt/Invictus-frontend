import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, MessageSquare, X } from 'lucide-react';
import CustomCursor from '@/common/Cursor';

export default function ChatGPTAdsPopup({ isOpen, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const dialog = dialogRef.current;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} aria-labelledby="chatgpt-ads-title" aria-describedby="chatgpt-ads-description"
            onCancel={onClose}
            onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
            className="fixed inset-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-md font-body">
            {isOpen && <CustomCursor />}
            <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
                className="flex min-h-full items-center justify-center p-4 sm:p-6">
                <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#2AB182]/40 bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-[0_0_80px_rgba(42,177,130,0.2)]">
                    <button autoFocus onClick={onClose} aria-label="Close announcement" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 hover:bg-[#2AB182]/10 focus-visible:outline-2 focus-visible:outline-[#2AB182] cursor-pointer"><X size={18} /></button>
                    <div className="relative p-7 pt-14 sm:p-10 sm:pt-14 bg-gradient-to-br from-[#2AB182]/10 via-transparent to-transparent">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2AB182]/30 bg-[#2AB182]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2AB182]">
                            <span className="h-2 w-2 rounded-full bg-[#2AB182]" /> Now live in India
                        </div>
                        <MessageSquare className="mb-3.5 text-[#2AB182]" size={32} aria-hidden="true" />
                        <h2 id="chatgpt-ads-title" className="font-display text-2xl sm:text-4xl font-bold uppercase leading-tight">ChatGPT Ads.<br /><span className="text-[#2AB182]">Your next growth channel.</span></h2>
                        <p id="chatgpt-ads-description" className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">Reach potential customers as they explore, compare, and decide. Invictus brings specialist ChatGPT Ads management to your brand, from strategy and setup to ongoing optimisation.</p>
                        <div className="my-5 grid gap-3 sm:grid-cols-2">
                            {['Campaign strategy & setup', 'Ad copy & creative', 'Landing page optimisation', 'Performance tracking & reporting'].map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]"><Check size={16} className="shrink-0 text-[#2AB182]" />{feature}</div>
                            ))}
                        </div>
                        <Link href="/services#chatgpt-ads" onClick={onClose} className="flex items-center justify-center gap-3 rounded-lg bg-[#2AB182] px-5 py-3.5 text-center font-bold text-black hover:bg-[#35c795]">Explore ChatGPT Ads <ArrowRight size={18} className="shrink-0" /></Link>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                            <Link href="/contact" onClick={onClose} className="text-[var(--text-primary)] underline underline-offset-4">Talk to our team</Link>
                            <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">Maybe later</button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
