import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export const downloadResumeAsPDF = async () => {
  try {
    // Find the resume preview element
    const resumeElement = document.querySelector('[data-resume-preview]') as HTMLElement;
    
    if (!resumeElement) {
      throw new Error('Resume preview not found');
    }

    // Wait for fonts to load
    await document.fonts.ready;

    // Temporarily modify the element for better PDF rendering
    const originalTransform = resumeElement.style.transform;
    const originalMaxWidth = resumeElement.style.maxWidth;
    const originalWidth = resumeElement.style.width;
    
    // Set fixed dimensions for consistent PDF output
    resumeElement.style.transform = 'none';
    resumeElement.style.maxWidth = '210mm'; // A4 width
    resumeElement.style.width = '210mm';
    resumeElement.style.minHeight = '297mm'; // A4 height
    
      // Add a small delay to ensure all elements are rendered
      await new Promise(resolve => setTimeout(resolve, 500));

      // Ensure all images in the preview are loaded
      const images = Array.from(resumeElement.querySelectorAll('img')) as HTMLImageElement[];
      if (images.length) {
        await Promise.all(
          images.map((img) =>
            img.complete
              ? Promise.resolve(true)
              : new Promise((res) => {
                  img.onload = () => res(true);
                  img.onerror = () => res(true);
                })
          )
        );
      }

      // Create canvas with optimized settings for full-width PDF
    let canvas = await html2canvas(resumeElement, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794, // A4 width in pixels at 96 DPI (210mm)
      height: 1123, // A4 height in pixels at 96 DPI (297mm)
      scrollX: 0,
      scrollY: 0,
      
      foreignObjectRendering: false, // Use DOM rendering for better text stability
      imageTimeout: 0,
      removeContainer: true,
      onclone: (clonedDoc) => {
        // Ensure proper styling in the cloned document
        const clonedElement = clonedDoc.querySelector('[data-resume-preview]') as HTMLElement;
        if (clonedElement) {
          // Apply consistent base styling without altering layout semantics
          clonedElement.style.boxSizing = 'border-box';
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.color = '#111827';
          clonedElement.style.margin = '0';
          clonedElement.style.padding = '20mm';
          clonedElement.style.maxWidth = '210mm';
          clonedElement.style.width = '210mm';
          clonedElement.style.minHeight = '297mm';
          clonedElement.style.overflow = 'visible';

          // Remove transforms from ancestors in the cloned tree to avoid scaled captures
          let parent: HTMLElement | null = clonedElement.parentElement;
          while (parent) {
            parent.style.transform = 'none';
            parent = parent.parentElement;
          }

          // Ensure images load correctly with CORS in the cloned tree
          const imgs = clonedElement.querySelectorAll('img');
          imgs.forEach((img: any) => {
            img.setAttribute('crossorigin', 'anonymous');
            // Force eager load in the cloned DOM
            (img as HTMLImageElement).loading = 'eager';
          });

          // Reduce page breaks inside common blocks when printing
          clonedElement.querySelectorAll('section, h2, h3, ul, li, div').forEach((el: any) => {
            (el as HTMLElement).style.breakInside = 'avoid';
            (el as HTMLElement).style.pageBreakInside = 'avoid';
            (el as HTMLElement).style.boxSizing = 'border-box';
          });
        }
      }
    });

    // Restore original styles
    resumeElement.style.transform = originalTransform;
    resumeElement.style.maxWidth = originalMaxWidth;
    resumeElement.style.width = originalWidth;

    // Create PDF using actual page size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate dimensions to fill the full PDF width with margins
    const margin = 10; // 10mm margin on each side
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    let heightLeft = imgHeight;
    let position = 0;

    // First page - center the content horizontally
    pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position -= pageHeight; // move up for the next slice
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    pdf.save('resume.pdf');

    // Show success confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']
    });

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const autoSaveToLocalStorage = (data: any) => {
  try {
    localStorage.setItem('resume-builder-data', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem('resume-builder-data');
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};