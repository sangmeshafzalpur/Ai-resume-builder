import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import SidebarTemplate from './templates/SidebarTemplate'
import TechnicalTemplate from './templates/TechnicalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
    const [scale, setScale] = React.useState(1);
    const contentRef = React.useRef(null);
    const paperRef = React.useRef(null);

    // Auto-scale to fit logic
    React.useEffect(() => {
        const checkScaling = () => {
            if (!contentRef.current || !paperRef.current) return;

            const paperHeight = 297 * 3.7795275591; // 297mm in pixels at 96dpi
            const contentHeight = contentRef.current.offsetHeight;

            if (contentHeight > paperHeight) {
                const newScale = (paperHeight - 40) / contentHeight; // 40px buffer
                setScale(Math.max(newScale, 0.65)); // Don't shrink below 65% for readability
            } else {
                setScale(1);
            }
        };

        const observer = new ResizeObserver(checkScaling);
        if (contentRef.current) observer.observe(contentRef.current);

        // Initial check
        setTimeout(checkScaling, 100);

        return () => observer.disconnect();
    }, [data, template]);

    const renderTemplate = () => {
        const props = { data, accentColor };
        switch (template || 'classic') {
            case "modern":
                return <ModernTemplate {...props} />
            case "minimal":
                return <MinimalTemplate {...props} />
            case "minimal-image":
                return <MinimalImageTemplate {...props} />
            case "executive":
                return <ExecutiveTemplate {...props} />
            case "creative":
                return <CreativeTemplate {...props} />
            case "sidebar":
                return <SidebarTemplate {...props} />
            case "technical":
                return <TechnicalTemplate {...props} />
            case "classic":
            default:
                return <ClassicTemplate {...props} />
        }
    }

    return (
        <div className={`w-full h-full flex flex-col items-center overflow-auto bg-slate-50/50 p-4 lg:p-12 ${classes}`}>
            {/* Paper Container */}
            <div
                ref={paperRef}
                id="resume-content-paper"
                className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] print:shadow-none print:border-none origin-top transition-all duration-500 ease-out overflow-hidden"
                style={{
                    width: '210mm',
                    height: '297mm',
                    margin: '0 auto',
                    position: 'relative'
                }}
            >
                {/* Scalable Content Wrapper */}
                <div
                    ref={contentRef}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                        width: '100%',
                        transition: 'transform 0.3s ease'
                    }}
                >
                    {renderTemplate()}
                </div>

                {/* Print Overlay */}
                <div className="absolute inset-0 pointer-events-none border border-slate-100/50 print:hidden z-20" />
            </div>

            <style>
                {`
                @media print {
                    @page {
                        margin: 0;
                        size: A4;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #resume-content-paper, #resume-content-paper * {
                        visibility: visible;
                    }
                    #resume-content-paper {
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        transform: none !important;
                        background: white !important;
                        z-index: 9999;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default ResumePreview
