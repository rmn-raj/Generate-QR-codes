document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeDiv = document.getElementById('qr-code');
    const downloadLink = document.getElementById('download-link');
    
    generateBtn.addEventListener('click', generateQRCode);
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
    
    function generateQRCode() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter text or URL');
            return;
        }
        
        // Clear previous QR code
        qrCodeDiv.innerHTML = '';
        
        // Generate QR code
        QRCode.toCanvas(document.createElement('canvas'), text, {
            width: 250,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error, canvas) {
            if (error) {
                console.error(error);
                alert('Error generating QR code');
                return;
            }
            
            // Add canvas to DOM
            qrCodeDiv.appendChild(canvas);
            
            // Update download link
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.classList.remove('hidden');
                
                // Add event listener to revoke object URL after download
                downloadLink.addEventListener('click', function() {
                    setTimeout(function() {
                        URL.revokeObjectURL(url);
                    }, 100);
                });
            });
        });
    }
}); 