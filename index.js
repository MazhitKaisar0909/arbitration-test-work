const form = document.getElementById('form');

const phoneInput = document.querySelector("#phone");
window.intlTelInput(phoneInput, {
    separateDialCode: true,
    preferredCountries: ["ua", "pl", "us"]
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e)

    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Дополнительная проверка для email
        if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value.trim())) {
            isValid = false;
            input.classList.add('error');
        }
    });

    if (isValid) {
        const code = form.querySelector('.iti__selected-dial-code').textContent;
        const formData = [...inputs].reduce((acc, cur) => {
            if (cur.name === 'phoneNumber') {
                acc[cur.name] = code + cur.value;
                return acc
            }
            acc[cur.name] = cur.value;
            return acc;
        }, {});
        localStorage.setItem('from', JSON.stringify(formData)) 
        window.location.href = './thanks.html'
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
