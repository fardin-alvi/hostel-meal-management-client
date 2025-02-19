import React from 'react';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import Lottie from 'lottie-react';
import 'react-accessible-accordion/dist/fancy-example.css';

import faqAnimation from '../../assets/FAQ.json';

const FAQ = () => {
    return (
        <div className=" px-10 mx-auto py-4 flex flex-col md:flex-row items-center gap-4">
            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion allowZeroExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>How to book a meal?</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>You can book a meal by logging into your account, navigating to the meal section, and selecting your desired meal plan.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>What happens if I miss my meal?</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>If you miss your meal, it will not be carried forward or refunded. However, you can check with the admin for any alternative arrangements.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>How can I change my meal preference?</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>You can change your meal preference by visiting the settings page in your account and updating your meal preferences.</p>
                        </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>Can I customize my meal preferences?</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>Yes, you can customize your meal preferences by selecting specific meal options available in the customization section of your profile.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Lottie Animation */}
            <div className="md:w-1/2 flex justify-center">
                <Lottie animationData={faqAnimation} className="w-80 h-80" />
            </div>
        </div>
    );
};

export default FAQ;
