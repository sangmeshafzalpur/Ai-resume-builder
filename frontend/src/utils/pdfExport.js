import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Hardened PDF Export utility with oklch color compatibility.
 */
export const exportPDF = async (element, filename = 'resume.pdf') => {
    if (!element) {
        throw new Error('Capture element not found');
    }

    try {
        // Settle phase to ensure DOM rendering is complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // To ensure the BEST capture, we search for the actual resume paper inside the element
        // This avoids capturing background padding or external wrappers
        let target = element.querySelector('#resume-content-paper') || element.querySelector('#resume-preview') || element;

        // Get true dimensions of the content
        const width = target.scrollWidth;
        const height = target.scrollHeight;

        console.log(`PDF Export: Target is ${target.id || 'unknown'}, dimensions ${width}x${height}`);

        const canvas = await html2canvas(target, {
            scale: 2, // Standard High DPI
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: width,
            height: height,
            windowWidth: width,
            windowHeight: height,
            onclone: (clonedDoc) => {
                const clonedTarget = clonedDoc.querySelector('#resume-content-paper') || clonedDoc.querySelector('#resume-preview') || clonedDoc.body.firstChild;
                if (clonedTarget) {
                    // Force standard A4 framing for the capture
                    clonedTarget.style.transform = 'none';
                    clonedTarget.style.margin = '0 auto';
                    clonedTarget.style.padding = '0';
                    clonedTarget.style.width = '210mm';
                    clonedTarget.style.minHeight = '297mm';
                    clonedTarget.style.boxShadow = 'none';
                    clonedTarget.style.border = 'none';
                    clonedTarget.style.display = 'block';
                }

                // Normalizing any remaining modern CSS that might break canvas
                const elements = clonedDoc.querySelectorAll('*');
                elements.forEach(el => {
                    const styles = clonedDoc.defaultView.getComputedStyle(el);

                    // Fix for tailwind v4 colors
                    ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
                        const val = styles[prop];
                        if (val && val.includes('oklch')) {
                            // Fallback to simple RGB if oklch detected
                            el.style[prop] = val.replace(/oklch\([^)]+\)/, '#000000');
                        }
                    });
                });
            }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);

    } catch (err) {
        console.error('PDF Export Error:', err);
        throw err;
    }
};
