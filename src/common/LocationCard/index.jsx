const LocationCard = ({ title, services, industries, description, isHQ = false, className = "", style = {} }) => (
    <div
        className={`bg-[#0A120F]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-5.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#2AB182]/50 hover:shadow-[0_14px_36px_rgba(42,177,130,0.12)] hover:-translate-y-1 ${className}`}
        style={style}
    >
        <div className="flex items-center justify-between gap-3 mb-2.5">
            <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                {title}
            </h3>
            {isHQ && (
                <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#2AB182] bg-[#2AB182]/15 border border-[#2AB182]/30 px-2.5 py-0.5 rounded-full shrink-0">
                    HQ
                </span>
            )}
        </div>

        {description && (
            <p className="font-body text-xs md:text-sm text-[var(--text-muted)] mb-3.5 leading-relaxed">
                {description}
            </p>
        )}

        <div className="mb-3">
            <h4 className="font-body text-[11px] uppercase tracking-widest text-[#2AB182] font-bold mb-2">
                Our work includes:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 font-body text-xs text-[var(--text-primary)]/90">
                {services.map((service, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2AB182] shrink-0" />
                        <span className="truncate">{service}</span>
                    </li>
                ))}
            </ul>
        </div>

        {industries && (
            <div className="pt-2.5 mt-2 border-t border-white/[0.08]">
                <h4 className="font-body text-[11px] uppercase tracking-widest text-[#2AB182] font-bold mb-1">
                    Industries Served:
                </h4>
                <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                    {industries}
                </p>
            </div>
        )}
    </div>
);

export default LocationCard;
