        document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Collect form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // WhatsApp API URL
      const phoneNumber = '+243897520168'; // Replace with your WhatsApp number
           const whatsappURL = `https://wa.me/${phoneNumber}?text=%0AMessage:%20${encodeURIComponent(message)}`;
      
      // Redirect user to WhatsApp chat
      window.open(whatsappURL, '_blank');
    });
