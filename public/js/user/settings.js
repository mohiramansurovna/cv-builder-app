function settingsFormSubmit(event) {
    const form = document.querySelector('#settingsForm');
    event.preventDefault();
    const formData = new FormData(form);
    const { id, first_name, last_name, email, password, new_password, confirm_password } = Object.fromEntries(formData.entries());
    if (!id || !first_name || !last_name || !email) {
        document.getElementById('error').innerHTML = 'Please fill in all required fields';
        return;
    }
    if (new_password && new_password !== confirm_password && confirm_password) {
        document.getElementById('error').innerHTML = 'New password and confirm password do not match';
        return;
    }
    if (new_password && new_password.length < 6) {
        document.getElementById('error').innerHTML = 'New password must be at least 6 characters long';
        return;
    }

    const startTransition = (callback) => {
        try {
            document.getElementById('loading').innerHTML = 'Loading...';
            document.getElementById('submitButton').disabled = true;
            callback();
        } finally {
            document.getElementById('loading').innerHTML = '';
            document.getElementById('submitButton').disabled = false;
        }
    };

    startTransition(async () => {
        await fetch('/api/user/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                first_name,
                last_name,
                email,
                password,
                new_password,
                confirm_password,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    alert('Settings saved successfully');
                    window.location.reload();
                } else {
                    document.getElementById('error').innerHTML = await res.text();
                }
            })
            .catch((err) => {
                console.error(err);
                document.getElementById('error').innerHTML = 'Internal server error';
            });
    });
}
