function handleNext() {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const { first_name, last_name, email, password } = Object.fromEntries(formData.entries());
    if (!first_name || !last_name || !email || !password) {
        const error = document.getElementById('error1');
        error.innerHTML = 'Please fill in all fields';
        return;
    }
    form.classList.add('animate-scroll');
    form.classList.remove('animate-scroll-back');
}

function handleBack() {
    const form = document.getElementById('registerForm');
    form.classList.remove('animate-scroll');
    form.classList.add('animate-scroll-back');
}


async function handleRegister() {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const { first_name, last_name, email, password, phone, address } = Object.fromEntries(formData.entries());
    if (!phone || !address) {
        const error = document.getElementById('error');
        error.innerHTML = 'Please fill in all fields';
        return;
    }
    const loading = document.querySelector('.loading');
    const registerButton = document.getElementById('registerButton');
    const startTransaction = async (callback) => {
        try {
            loading.style.filter = 'saturate(0.1)';
            registerButton.onclick = null;
            await callback();
        } finally {
            registerButton.onclick = handleRegister;
            loading.style.filter = 'saturate(0.6)';
        }
    }
    startTransaction(async () => {
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                phone,
                address
            }),
            credentials: 'include'
        }).then(async (res) => {
            if (res.ok) {
                const { id } = await res.json();
                window.location.href = '/user/';
            } else {
                const error = document.getElementById('error');
                console.error(res.status);
                error.innerHTML = await res.text();
            }
        }).catch(
            (error) => {
                const errorElement = document.getElementById('error');
                errorElement.innerHTML = 'An error occurred. Please try again.';
                console.error('Error:', error);
            })
    })
};
