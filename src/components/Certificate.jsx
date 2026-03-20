import React, { useRef, useEffect } from "react";

const Certificate = ({ participantName, contestName, date, logoUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#fdfdfd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.font = "bold 48px serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Participation", canvas.width / 2, 120);

    // Contest Name
    ctx.font = "24px serif";
    ctx.fillText(`Presented for ${contestName}`, canvas.width / 2, 200);

    // Participant Name
    ctx.font = "italic 36px 'Playfair Display'";
    ctx.fillText(participantName, canvas.width / 2, 300);

    // Date
    ctx.font = "20px serif";
    ctx.fillText(`Date: ${date}`, canvas.width / 2, 380);

    // Logo (optional)
    if (logoUrl) {
      const logo = new Image();
      logo.src = logoUrl;
      logo.onload = () => {
        ctx.drawImage(logo, canvas.width - 200, 40, 120, 120);
      };
    }
  }, [participantName, contestName, date, logoUrl]);

  // Export as PNG
  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${participantName}-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={1123} height={794} />
      <button onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default Certificate;
