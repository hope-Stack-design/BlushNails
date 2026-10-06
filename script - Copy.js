// CONFIGURATION: Customize your WhatsApp number here
// Use international format code numbers without a "+" symbol or spaces.
const HOSTEL_WHATSAPP_PHONE = "254707456838"; 

// Local variables to temporarily hold modal target states
let currentChosenDay = "";
let currentChosenTime = "";

// Document Node elements mapping queries
const interactiveOpenSlots = document.querySelectorAll('.time-slot.open-slot');
const bookingModalOverlay = document.getElementById('bookingModalWindow');
const closeModalButton = document.querySelector('.close-modal-trigger');
const modalTimeTextDisplay = document.getElementById('modalActiveTimeLabel');
const appointmentForm = document.getElementById('appointmentBookingForm');
const footerWhatsAppLink = document.getElementById('mainFooterWhatsAppBtn');

// Bind standard quick chat link to the footer button element layout
if (footerWhatsAppLink) {
    const defaultFooterText = encodeURIComponent("Hello I have a question regarding your campus nail services.");
    footerWhatsAppLink.href = `https://wa.me/${HOSTEL_WHATSAPP_PHONE}?text=${defaultFooterText}`;
}

// Click handler to open the registration dialogue layout window
interactiveOpenSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        currentChosenDay = slot.getAttribute('data-day') || "";
        currentChosenTime = slot.getAttribute('data-time') || "";
        
        // Update contextual description parameters inside the popup view
       if (modalTimeTextDisplay) {
           modalTimeTextDisplay.textContent = `${currentChosenDay} at ${currentChosenTime}`;
       }
        
        // Toggle absolute visible layout settings trigger
        if (bookingModalOverlay) {
            bookingModalOverlay.classList.add('display-active');
    }
    });
});

// Dismiss popup via exit close button click actions
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
    bookingModalOverlay.classList.remove('display-active');
});
}

// Dismiss popup window if the user hits grey background zones
window.addEventListener('click', (event) => {
    if (event.target === bookingModalOverlay) {
        bookingModalOverlay.classList.remove('display-active');
    }
});

// Listen for submission actions inside forms to trigger external WhatsApp window paths
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Halt default browser document reload sequence behaviors
    
    // Read clean structural parameters from text fields inside forms
    const nameInputEl = document.getElementById('studentFullName');
    const nameInput = nameInputEl ? nameInputEl.value.trim() : "";

    // --- STRICT NAME VALIDATION --- 
    if (!nameInput || nameInput.length <2) {
        alert("Please enter a valid full name (at least 2 characters).");
        if (nameInputEl) nameInput.focus();
        return;
    }
    
    // Collect all checked treatments into an array
    const selectedCheckboxes = document.querySelectorAll('input[name="treatment"]:checked');
    const selectedservices = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (selectedservices.length === 0) {
        alert("please select at least one treatment service!");
        return;
    }

    //Format selected treatments nicely
    const servicesListText = selectedservices.map(s => ` . ${s}`).join('\n');
    
    // Format custom message string structures for business requests
    // Build clean string with natural line breaks
    const rawMessage = `Hello Campus Blush & Bloom! ♡\n\n` +
    `I would like to book an appointment:\n` + 
    `. Client Name: ${nameInput}\n` +
    `. Time Window: ${currentChosenDay} (${currentChosenTime})\n\n` +
    `. Service(s) Chosen: ${servicesListText}\n` +
    `Please let me know if this works! `;

    const encodedMessage = encodeURIComponent(rawMessage);
    
    // Execute secure redirect windows targeting global API components
    window.open(`https://wa.me/${HOSTEL_WHATSAPP_PHONE}?text=${encodedMessage}`, '_blank');
    
    // Conceal popup framework context parameters and flush existing inputs
    bookingModalOverlay.classList.remove('display-active');
    appointmentForm.reset();
});

}

// --- GALLERY VIEW MORE TOGGLE ---
const viewMoreBtn = document.querySelector('.btn-view-more');

if(viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        const hiddenPhotos = document.querySelectorAll('.gallery-photo-card.hidden-photo');
        hiddenPhotos.forEach(photo => photo.classList.remove('hidden-photo'));

        //Hide the button after expanding all photos
        viewMoreBtn.style.display = 'none';
    });
}
