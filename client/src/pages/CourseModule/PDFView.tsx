//import { useState } from 'react';
//import { Document, Page } from 'react-pdf';
//import testpdf from "./test.pdf";




//function PDFViewer() {
//  const [numPages, setNumPages] = useState<number>();
//  const [pageNumber, setPageNumber] = useState<number>(1);

//  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//    setNumPages(numPages);
//  }

//  return (
//    <div>
//      <Document file={testpdf} onLoadSuccess={onDocumentLoadSuccess}>
//        <Page pageNumber={pageNumber} />
//      </Document>
//      <p>
//        Page {pageNumber} of {numPages}
//      </p>
//    </div>
//  );
//}

//export default PDFViewer

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF from './test.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function PDFViewer() {
  const [pageCount, setPageCount] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: {numPages: number}) {
    setPageCount(numPages);
  }

  return (
    <div style={{ width: '1050px', height: '490px', overflow: 'auto' }}>
        <Document
            file={samplePDF}
            onLoadSuccess={onDocumentLoadSuccess}
        >
        {Array.from(
            new Array(pageCount),
            (_, index) => (
            <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
            />
            ),
        )}
        </Document>
    </div>
  );
}