import { CheckCircle } from 'lucide-react';

const LocationCard = ({ title, services, industries, description, isHQ = false }) => (
    <div className="p-8 md:p-12 border-b lg:border-r border-[#333] last:border-r-0 last:border-b-0 hover:bg-[#0E0E0E] active:bg-[#0E0E0E] transition-colors duration-300">
        <h3 className="font-display text-3xl font-bold mb-4 text-white">
            {title}
            {isHQ && <span className="text-[#2AB182] text-sm align-top ml-2">(HQ)</span>}
        </h3>
        {description && <p className="font-body text-[#888] mb-6">{description}</p>}

        <div className="mb-6">
            <h4 className="font-body text-xs uppercase tracking-widest text-[#2AB182] font-bold mb-3">Our work includes:</h4>
            <ul className="space-y-2 font-body text-sm text-white/90">
                {services.map((service, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 shrink-0 text-[#2AB182]" />
                        <span>{service}</span>
                    </li>
                ))}
            </ul>
        </div>

        {industries && (
            <div>
                <h4 className="font-body text-xs uppercase tracking-widest text-[#2AB182] font-bold mb-3">Industries Served:</h4>
                <p className="font-body text-sm text-[#888]">{industries}</p>
            </div>
        )}
    </div>
);

export default LocationCard;
