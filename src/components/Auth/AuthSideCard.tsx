'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { THEME } from '../../styles/theme';

interface AuthSideCardProps {
    topButtonText: string;
    topButtonLink: string;
}

const testimonials = [
    {
        name: "Dipali pune",
        role: "Ui designer in Google",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Rahul Delhi",
        role: "Frontend Dev in Amazon",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Priya Mumbai",
        role: "Product Manager in Microsoft",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
    }
];

const AuthSideCard: React.FC<AuthSideCardProps> = ({ topButtonText, topButtonLink }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-slider effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div
            className={`relative w-full h-full min-h-[600px] rounded-[40px] p-10 text-white flex flex-col overflow-hidden group/card`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-gradient-end/90 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-gradient-end/80" />
                    </div>
                ))}
            </div>

            {/* Top Button */}
            <div className="absolute top-8 right-8 z-10">
                <Link href={topButtonLink} className="bg-white text-primary px-6 py-2 rounded-full font-semibold text-base hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 shadow-sm">
                    {topButtonText}
                </Link>
            </div>

            {/* Content */}
            <div className="mt-16 max-w-lg relative z-10">
                <h2 className="text-4xl font-bold mb-4 leading-tight drop-shadow-md">What Our<br />Jobseekers said.</h2>
                <div className="relative mb-6 min-h-[100px]">
                    <span className="absolute -left-5 -top-2 text-3xl opacity-50">❝</span>
                    <p className="text-base opacity-95 leading-relaxed transition-opacity duration-300 drop-shadow-sm font-medium">
                        {testimonials[currentIndex].text}
                    </p>
                </div>

                <div className="mb-6">
                    <p className="font-bold text-xl drop-shadow-sm">{testimonials[currentIndex].name}</p>
                    <p className="opacity-90 text-base font-medium drop-shadow-sm">{testimonials[currentIndex].role}</p>
                </div>

                <div className="flex gap-3 items-center">
                    <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white hover:text-primary transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 flex items-center justify-center bg-[#333333] text-white rounded-xl hover:bg-black transition-colors shadow-lg"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Bottom Floating Card */}
            <div className={`absolute bottom-10 right-8 bg-white text-black p-5 ${THEME.components.card.radius} max-w-xs shadow-xl z-20 group`}>
                {/* Star Icon Badge */}
                <div className="absolute -top-6 right-6 bg-white p-1.5 rounded-full shadow-sm">
                    <div className="bg-black text-white p-2 rounded-full">
                        <Star size={16} fill="white" />
                    </div>
                </div>

                <h3 className="font-bold text-lg mb-2 leading-tight">Get your right job and right place aplly now</h3>
                <p className="text-xs text-gray-500 mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                </p>
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden transition-transform duration-300 hover:scale-150 hover:z-10 cursor-pointer">
                            <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-[10px] flex items-center justify-center border-2 border-white transition-transform duration-300 hover:scale-150 hover:z-10 cursor-pointer">
                        +2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSideCard;
