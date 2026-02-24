import React from "react";

const TeamMember = ({ name, image, rotation = 0, className = "", onClick }) => {
    return (
        <div
            className={`inline-block transform cursor-pointer group hover:z-[50] transition-all duration-500 ${className}`}
            style={{
                transform: `rotate(${rotation}deg)`,
                width: "clamp(120px, 15vw, 200px)",
            }}
            onClick={onClick}
        >
            <div className="w-full aspect-square overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:shadow-4xl group-hover:-translate-y-4 group-hover:scale-125">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />

                {/* Subtle paper texture overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
            </div>
        </div>
    );
};

export default TeamMember;
