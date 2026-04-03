// Web3Forms Configuration
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Replace with your actual key

async function submitToWeb3Forms(formData, formName) {
    const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New ${formName} Submission from KidHope Website`,
        ...formData
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Web3Forms submission error:', error);
        return { success: false, error: error.message };
    }
}

// Usage in forms
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const result = await submitToWeb3Forms(formData, 'Contact Form');

    if (result.success) {
        alert('Thank you for your message! We\'ll get back to you soon.');
        e.target.reset();
    } else {
        alert('Submission failed. Please try again.');
    }
});