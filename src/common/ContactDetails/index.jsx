import React from 'react';

const ContactDetail = ({ icon: Icon, title, details }) => {
    const getHref = (text) => {
        if (title === 'Email') return `mailto:${text}`;
        if (title === 'Phone') return `tel:${text.replace(/[^0-9+]/g, '')}`;
        return null;
    };

    return (
        <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-[#2AB182] font-bold mb-2">{title}</h4>
            {details.map((detail, index) => {
                const href = getHref(detail);
                return href ? (
                    <a
                        key={index}
                        href={href}
                        className="flex items-center gap-2 text-white text-lg hover:text-[#2AB182] transition-colors mb-1"
                    >
                        <Icon className="w-4 h-4 text-[#2AB182]" />
                        {detail}
                    </a>
                ) : (
                    <p key={index} className="flex items-center gap-2 text-white text-lg mb-1">
                        <Icon className="w-4 h-4 text-[#2AB182]" />
                        {detail}
                    </p>
                );
            })}
        </div>
    );
};

export default ContactDetail;
