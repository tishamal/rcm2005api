import React, { useEffect, useState } from "react";
import axios from "axios";
import '../container/memberDetails.css';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import mainImg from '../../src/images/mc-main.png';
import qrCode from '../../src/images/qr.png';
import rahalLogo from '../../src/images/logo.png';




const MemberDetails = ({ match }) => {
    const memberId = match.params.id;
    const [memberDetails, setMemberDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                // const response = await axios.get(`https://l0qhsrip30.execute-api.us-east-1.amazonaws.com/Staging/api/item/${memberId}`);
                const response = await axios.get("https://l0qhsrip30.execute-api.us-east-1.amazonaws.com/Staging/api/item");
                let member = response.data.body.filter(u => u.id == memberId);
                console.log(member[0]);
                setMemberDetails(member[0]); 

            } catch (error) {
                console.error("Error fetching member details:", error);
                setError("An error occurred while fetching member details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, [memberId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const imgSrc = 'https://2005-rcm-photos.s3.amazonaws.com/'+memberId+'.jpeg';  
    const fileNm = 'rcm2005_'+memberDetails.Fname+'.pdf';

    const captureScreenshot = () => {
        const element = document.getElementById("memberCard");
        if (element) {
          html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg");
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 size: 210mm x 297mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(fileNm);
          });
        } else {
          console.error('Element with id "pdf-content" not found.');
        }
      };
    
      const onDownloadClick = () => {
        setTimeout(captureScreenshot, 1000);
      };

    // Render the detailed member information here
    return (
        <div id="memberCardWapper">
            <div id="memberCard" className="member-card">
                <div className="pdf-pg pg-1">
                    <img src={mainImg} alt="" />
                </div>
                {memberDetails ? (
                    <>
                        <div className="pdf-pg pg-2">
                            <div className="row-1">
                                <div className="main-details">
                                    <p><span className="label">Name</span> <span>{memberDetails.Fname} {memberDetails.Lname}</span></p>
                                    <p><span className="label">NIC Number</span> <span>{memberDetails.nic}</span></p>
                                    <p><span className="label">Date of Issue</span> <span>03-02-2024</span></p>
                                    <p><span className="label">Membership Number</span> <span>{memberDetails.id}</span></p>
                                </div>
                                <div className="prof-img-wrapper">
                                    <div className="prof-img">
                                        <img src={imgSrc} alt={memberDetails.Fname} />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row-2">
                                <div className="note">
                                    <p>This card certifies the holder's membership in the Rahula COllege Old Boys Association, class of 2005. It grants access to the full range of privileges associated with the designated membership level for the duration specified herein. Issuance of this card is sanctioned by the committee. Any loss of the card must be reported to the association immidiately.</p>
                                </div>
                            </div>
                            <div className="row-3">
                                <div className="contact">
                                    <div className="qr">
                                        <img src={qrCode} alt="qr-code" />
                                    </div>
                                    <div className="cont-details">
                                        <ul>
                                            <li>Rahula College Old Boys Association of 2005</li>
                                            <li>No 294, Akuressa Road, Hiththatiya Central, Matara</li>
                                            <li>+94 77 3 759 060 / +94 71 6 883 656</li>
                                            <li>rahulaoba2005@gmail.com</li>
                                            <li>www.rahalapi2005.lk</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="logo">
                                    <img src={rahalLogo} alt="rahalapi 2005" />
                                </div>
                            </div>
                            
                        </div>
                    </>
                ) : (
                    <p>No details available for this member.</p>
                )}
            </div>
            
            <div className="button-wrapper">
                <button onClick={onDownloadClick} className="btn">Download</button>
            </div>
            

        </div>
        
    );
};


export default MemberDetails;
