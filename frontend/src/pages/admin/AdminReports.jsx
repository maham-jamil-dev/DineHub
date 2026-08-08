import { useEffect, useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAdminReportsData } from '../../api/api';

function AdminReports() {
  const [data, setData] = useState({
    users: [],
    restaurants: [],
    orders: [],
    reservations: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Financial");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const res = await getAdminReportsData();
      if (res.data?.success) {
        setData(res.data.reportData || {});
      }
    } catch (error) {
      toast.error("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  const generatePDFReport = (type) => {
    try {
      const doc = new jsPDF();
      const todayStr = new Date().toLocaleDateString();

      // Brand Header
      doc.setFillColor(229, 57, 53);
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text("DineHub - Platform Official Report", 14, 16);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated Date: ${todayStr}`, 14, 33);
      doc.text(`Report Category: ${type}`, 14, 39);

      let tableHead = [];
      let tableRows = [];
      let reportTitle = "";

      if (type === "Financial" || type === "Monthly Revenue Report" || type === "Order Summary Report") {
        reportTitle = "Financial & Order Revenue Summary";
        tableHead = [["Order ID", "Customer", "Restaurant", "Amount", "Status", "Date"]];
        tableRows = (data.orders || []).map(o => [
          o._id.substring(o._id.length - 8),
          o.customer?.fullName || "Guest",
          o.restaurant?.name || "N/A",
          `Rs. ${o.totalAmount || 0}`,
          o.orderStatus,
          new Date(o.createdAt).toLocaleDateString()
        ]);
      } else if (type === "Analytics" || type === "User Activity Report") {
        reportTitle = "User Activity & Platform Accounts";
        tableHead = [["User ID", "Full Name", "Email", "Role", "Joined Date"]];
        tableRows = (data.users || []).map(u => [
          u._id.substring(u._id.length - 8),
          u.fullName,
          u.email,
          u.role,
          new Date(u.createdAt).toLocaleDateString()
        ]);
      } else if (type === "Performance" || type === "Restaurant Performance") {
        reportTitle = "Restaurant Performance Overview";
        tableHead = [["Restaurant Name", "Owner", "Location", "Rating", "Status"]];
        tableRows = (data.restaurants || []).map(r => [
          r.name,
          r.owner?.fullName || "N/A",
          r.location,
          r.rating ? `⭐ ${r.rating}` : "N/A",
          r.status
        ]);
      } else if (type === "Feedback" || type === "Customer Feedback Report") {
        reportTitle = "Customer Feedback & Ratings";
        tableHead = [["Customer", "Restaurant", "Rating", "Comment", "Date"]];
        tableRows = (data.reviews || []).map(rv => [
          rv.customer?.fullName || "Anonymous",
          rv.restaurant?.name || "N/A",
          `⭐ ${rv.rating}`,
          rv.comment,
          new Date(rv.createdAt).toLocaleDateString()
        ]);
      } else {
        reportTitle = `${type} Summary`;
        tableHead = [["ID", "Details", "Date"]];
        tableRows = [["1", "System Activity Report", todayStr]];
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(reportTitle, 14, 48);

      autoTable(doc, {
        startY: 53,
        head: tableHead,
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [229, 57, 53], textColor: 255 },
        styles: { fontSize: 9 }
      });

      doc.save(`DineHub_${type.replace(/\s+/g, '_')}_Report.pdf`);
      toast.success(`${type} PDF report downloaded successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF report");
    }
  };

  const reportsList = [
    { id: 1, title: 'Monthly Revenue Report', type: 'Financial', desc: 'Delivered orders revenue and payment analysis' },
    { id: 2, title: 'User Activity Report', type: 'Analytics', desc: 'Registered customers, owners, and user roles' },
    { id: 3, title: 'Restaurant Performance', type: 'Performance', desc: 'Active, pending & approved restaurant listings' },
    { id: 4, title: 'Order Summary Report', type: 'Financial', desc: 'Complete breakdown of all system orders' },
    { id: 5, title: 'Customer Feedback Report', type: 'Feedback', desc: 'Ratings and written reviews submitted by diners' },
  ];

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading system report data...</div>
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-dark mb-2">Reports</h1>
      <p className="text-gray-500 mb-8">Generate and download live DineHub database reports as PDF</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reportsList.map((report) => (
          <div key={report.id} className="card p-6 hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gold/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <FileText className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg font-medium">{report.type}</span>
            </div>
            <h3 className="font-display font-bold text-dark mb-1">{report.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{report.desc}</p>
            <button 
              onClick={() => generatePDFReport(report.title)}
              className="flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-display font-bold text-dark mb-4">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field pl-10"
            >
              <option value="Financial">Financial Report</option>
              <option value="Analytics">User Activity Report</option>
              <option value="Performance">Restaurant Performance</option>
              <option value="Feedback">Customer Feedback</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field pl-10" 
            />
          </div>
          <button 
            onClick={() => generatePDFReport(selectedType)}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" /> Generate PDF Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminReports;