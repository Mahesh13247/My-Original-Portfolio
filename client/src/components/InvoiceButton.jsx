import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileText } from 'lucide-react';

const InvoiceButton = ({ payment, project }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add content
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Payment ID: ${payment.paymentId}`, 20, 50);
    doc.text(`Order ID: ${payment.orderId}`, 20, 60);

    const tableColumn = ["Project", "Amount", "Status"];
    const tableRows = [
      [project.title, `INR ${payment.amount}`, "Paid"]
    ];

    doc.autoTable(tableColumn, tableRows, { startY: 80 });
    
    doc.text('Thank you for your purchase!', 105, doc.lastAutoTable.finalY + 20, { align: 'center' });
    
    doc.save(`Invoice_${payment.paymentId}.pdf`);
  };

  return (
    <button 
      onClick={generatePDF}
      className="flex items-center gap-2 text-primary hover:underline text-sm"
    >
      <FileText size={16} /> Get Invoice
    </button>
  );
};

export default InvoiceButton;
