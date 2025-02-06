import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Finance() {
    const [language, setLanguage] = useState('en');

    const loanPrograms = [
        {
            bank: "SBI",
            program: {
                en: "Kisan Credit Card",
                hi: "किसान क्रेडिट कार्ड"
            },
            description: {
                en: "Provides farmers timely credit for cultivation, emergencies, and related activities through a simple process.",
                hi: "किसानों को खेती, आपात स्थिति और संबंधित गतिविधियों के लिए समय पर ऋण सरल प्रक्रिया के माध्यम से प्रदान करता है।"
            },
            link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuoN4G7U9xIqP5XCTiKvzwFgEyot3qhFUviA&s"
        },
        {
            bank: "PNB",
            program: {
                en: "Kisan Credit Card",
                hi: "किसान क्रेडिट कार्ड"
            },
            description: {
                en: "Provides farmers timely credit for cultivation, emergencies, and related activities through a simple process.",
                hi: "किसानों को खेती, आपात स्थिति और संबंधित गतिविधियों के लिए समय पर ऋण सरल प्रक्रिया के माध्यम से प्रदान करता है।"
            },
            link: "https://www.pnbindia.in/kcc-eligibility-calculator.aspx",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEVvhCbReaVLyNPYE-cVo_JVYQloPCzLAMw&s"
        },
        {
            bank: "Bank of India",
            program: {
                en: "Kisan Credit Card",
                hi: "किसान क्रेडिट कार्ड"
            },
            description: {
                en: "Provides farmers timely credit for cultivation, emergencies, and related activities through a simple process.",
                hi: "किसानों को खेती, आपात स्थिति और संबंधित गतिविधियों के लिए समय पर ऋण सरल प्रक्रिया के माध्यम से प्रदान करता है।"
            },
            link: "https://bankofindia.co.in/kisan-credit-card",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43yJqWeZwLAeMhZvwXoip65bGTT6bOK8BIw&s"
        }
    ];

    const translations = {
        en: {
            title: "Check Your Loan Eligibility",
            description: "Explore loan options from various banks tailored for your needs.",
            checkEligibility: "Check Eligibility",
        },
        hi: {
            title: "अपनी ऋण पात्रता जांचें",
            description: "अपनी आवश्यकताओं के अनुरूप विभिन्न बैंकों के ऋण विकल्पों का अन्वेषण करें।",
            checkEligibility: "पात्रता जांचें",
        },
    };

    return (
        <>
            <Navbar />
            <div className="relative bg-gradient-to-r from-green-200 to-blue-300 py-6 sm:py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <button
                            className={`px-4 py-2 rounded-md ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setLanguage('en')}
                        >
                            English
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ml-2 ${language === 'hi' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setLanguage('hi')}
                        >
                            हिंदी
                        </button>
                    </div>

                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                            {translations[language].title}
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            {translations[language].description}
                        </p>
                    </div>

                    <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-8">
                        {loanPrograms.map((loan, index) => (
                            <div key={index} className="group relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 sm:max-w-sm sm:rounded-lg sm:mx-auto">
                                <div className="relative z-10 mx-auto max-w-md">
                                    <div className="grid h-20 w-20 place-items-center rounded-full transition-all duration-300">
                                        <img src={loan.icon} alt={loan.bank} className="h-20 w-20 rounded-full" />
                                    </div>
                                    <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300">
                                        <p>
                                            <span className='text-[20px] font-bold'>{loan.bank} {loan.program[language]}</span><br />
                                            {loan.description[language]}
                                        </p>
                                    </div>
                                    <div className="pt-5 text-base font-semibold leading-7">
                                        <p>
                                            <a
                                                href={loan.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sky-500 transition-all duration-300 flex items-center"
                                            >
                                                {translations[language].checkEligibility} <FaExternalLinkAlt className="ml-2 h-4 w-4" />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
