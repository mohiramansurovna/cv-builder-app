
async function handleLogin() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());
    if (!email || !password) {
        const error = document.getElementById('error');
        error.innerHTML = 'Please fill in all fields';
        return;
    }
    const loading = document.querySelector('.loading');

    const startTransaction = async (callback) => {
        try {
            loading.style.display = 'block';
            await callback();
        } finally {
            loading.style.display = 'none';
        }
    }
    startTransaction(async () => {
        await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include'
        }).then(async (res) => {
            if (res.ok) {
                const { id } = await res.json()
                window.location.href = '/user/';
            } else {
                const error = document.getElementById('error');
                console.log(res.status);
                error.innerHTML = await res.text();
            }
        }).catch(
            (error) => {
                const errorElement = document.getElementById('error');
                errorElement.innerHTML = 'An error occurred. Please try again.';
                console.error('Error:', error);
            }
        )
    })
}