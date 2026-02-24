import React from "react";

const TeamCard = ({ name, role, isSlider = false }) => {
    // Map names to the teamscroll images, removing "DR. " prefix for the filename
    const fileName = name.toLowerCase().replace("dr. ", "").trim();
    const imagePath = `/assets/team/teamscroll/${fileName}.png`;

    return (
        <div
            className={`relative flex items-center justify-center ${isSlider ? 'h-[50vh] min-h-[300px] max-h-[600px] w-full max-w-[280px] md:max-w-[350px]' : 'h-[300px] md:h-[400px] w-full max-w-[220px] md:max-w-[280px]'} group mx-auto`}
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover:scale-110">
                <img
                    src={imagePath}
                    alt={name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
            </div>
        </div>
    );
};

export default TeamCard;
