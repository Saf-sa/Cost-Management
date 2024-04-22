// PDFGeneratorHook.js
import { useEffect, useState } from "react";
import moment from "moment";
 import { PDFDocument, rgb } from "pdf-lib"; 

const usePDFGenerator = () => {
  const [pdfData, setPdfData] = useState(null);

  const generatePDF = async (filteredExpenses) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 15;
    const textWidth = page.getFont("Helvetica").widthOfTextAtSize(
      "Filtered Expenses",
      fontSize
    );

    page.drawText("Filtered Expenses", {
      x: width / 2 - textWidth / 2,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    let textY = height - 80;
    filteredExpenses.forEach((expense) => {
      page.drawText(
        `Date: ${moment(expense.date, "DD/MM/YYYY").format(
          "DD/MM/YYYY"
        )} - Category: ${expense.category} - Amount: ${expense.amount}`,
        {
          x: 50,
          y: textY,
          size: fontSize - 2,
          color: rgb(0, 0, 0),
        }
      );
      textY -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    setPdfData(pdfBytes);
  };

  return { pdfData, generatePDF };
};

export default usePDFGenerator;
