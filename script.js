document.getElementsById('contactForm').addEventListener('submit', saveContact);

function contactForm(e) {
    alert('hey')
    e.preventDefault();
}