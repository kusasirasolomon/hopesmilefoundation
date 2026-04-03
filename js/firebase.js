// Firebase Configuration and Integration
// IMPORTANT: You need to replace these config values with your own Firebase project settings

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Form Submission Handler for Firebase
async function submitToFirebase(formData, collectionName) {
    try {
        const docRef = await db.collection(collectionName).add(formData);
        console.log('Document written with ID: ', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding document: ', error);
        return { success: false, error: error.message };
    }
}

// Newsletter Subscription Handler
async function handleNewsletterSubscription(email) {
    const subscriptionData = {
        email: email,
        subscribedAt: new Date(),
        source: 'website',
        active: true
    };

    return await submitToFirebase(subscriptionData, 'newsletterSubscribers');
}

// Contact Form Handler
async function handleContactForm(formData) {
    const contactData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        submittedAt: new Date(),
        status: 'new'
    };

    return await submitToFirebase(contactData, 'contactSubmissions');
}

// Donation Intent Handler
async function handleDonationIntent(formData) {
    const donationData = {
        name: formData.name,
        email: formData.email,
        amount: formData.amount,
        message: formData.message || '',
        method: formData.method || 'unknown',
        submittedAt: new Date(),
        status: 'pending'
    };

    return await submitToFirebase(donationData, 'donationIntents');
}

// Initialize Firebase Forms
function initFirebaseForms() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            const result = await handleNewsletterSubscription(email);
            if (result.success) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                alert('Subscription failed. Please try again.');
            }
        });
    }

    // Similar handlers for contact and donation forms
}