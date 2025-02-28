import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import "./BillPayment.css";

const BillPayment = () => {
  const navigate = useNavigate();
  const [providerConfirmed, setProviderConfirmed] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    address: "",
    date: "",
    time: "",
  });

  // List of at least 10 water providers
  const waterProviders = [
    "Manila Water",
    "Maynilad Water Services",
    "Boracay Water",
    "Laguna Water",
    "Clark Water",
    "Cebu Water",
    "Davao Water",
    "Iloilo Water",
    "Cagayan de Oro Water",
    "Baguio Water District",
  ];

  // Handle provider selection
  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  // Confirm provider selection
  const confirmProvider = () => {
    if (selectedProvider) {
      setProviderConfirmed(true);
    }
  };

  // Cancel provider selection and return to home
  const cancelProviderSelection = () => {
    navigate("/");
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate QR Code Data
  const generateQRCodeData = () => {
    return `Account Number: ${formData.accountNumber}\nAccount Name: ${formData.accountName}\nAddress: ${formData.address}\nDate: ${formData.date}\nTime: ${formData.time}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create jsPDF instance
    const doc = new jsPDF();

    // Add text details
    doc.setFont("helvetica", "bold");
    doc.text("Bill Payment Confirmation", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Provider: ${selectedProvider}`, 20, 30);
    doc.text(`Account Number: ${formData.accountNumber}`, 20, 40);
    doc.text(`Account Name: ${formData.accountName}`, 20, 50);
    doc.text(`Address: ${formData.address}`, 20, 60);
    doc.text(`Date: ${formData.date}`, 20, 70);
    doc.text(`Time: ${formData.time}`, 20, 80);

    // Generate QR Code Data
    const qrCanvas = document.getElementById("qrCodeCanvas");
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");

      // Add QR Code to PDF
      doc.addImage(qrImage, "PNG", 20, 90, 50, 50);
    } else {
      alert("Error generating QR Code. Please try again.");
      return;
    }

    // Save and display PDF
    doc.save("BillPayment_Confirmation.pdf");

    alert("Payment Confirmed! PDF Generated.");
    navigate("/");
  };

  return (
    <div
      className={`bill-payment-container ${providerConfirmed ? "" : "blurred"}`}
    >
      {/* Water Provider Selection Modal */}
      {!providerConfirmed && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ color: "#0057b8", fontSize: "19px" }}>
              Select Your Water Provider
            </h2>
            <select
              className="provider-dropdown"
              value={selectedProvider}
              onChange={handleProviderChange}
            >
              <option value="" disabled>
                Select a provider...
              </option>
              {waterProviders.map((provider, index) => (
                <option key={index} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button
                className="confirm-button"
                onClick={confirmProvider}
                disabled={!selectedProvider}
              >
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={cancelProviderSelection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Payment Form */}
      <div className="header-section">
        <h1>Book Your Service Online</h1>
        <p>
          Schedule your visit and submit your service details ahead for a faster
          and more convenient process.
        </p>
      </div>
      <div className="bill-payment-card">
        <h2>Enter Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Account Name</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                max={
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                } // Limit to 30 days
                required
              />
            </div>
            <div className="form-group">
              <label>Select Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Time --</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="8:30 AM">8:30 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:30 AM">9:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="" disabled>
                  -- Break Time (12:00 PM - 12:59 PM) --
                </option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="3:30 PM">3:30 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="4:30 PM">4:30 PM</option>
              </select>
            </div>
          </div>

          <div style={{ display: "none" }}>
            <QRCodeCanvas
              id="qrCodeCanvas"
              value={generateQRCodeData()}
              size={128}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="confirm-button">
              Confirm
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillPayment;
