function languagesFormSubmit(event) {
    const form = document.querySelector('.languageForm');
    document.getElementById('errorLanguage').innerHTML = '';
    event.preventDefault();
    const formData = new FormData(form);
    const { user_id, language_name, language_level } = Object.fromEntries(formData.entries());
    if (!user_id || !language_name || !language_level) {
        document.getElementById('errorLanguage').innerHTML = 'Please fill in all required fields';
        return;
    }
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingLanguage').innerHTML = 'Loading...';
            document.getElementById('submitButtonLanguage').disabled = true;
            callback();
        } finally {
            document.getElementById('loadingLanguage').innerHTML = '';
            document.getElementById('submitButtonLanguage').disabled = false;
        }
    };

    startTransition(async () => {
        await fetch('/api/user/language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                language_name,
                language_level,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const ul = document.getElementById('languageList');
                    const li = document.createElement('li');
                    const data = await res.json();
                    li.id = data.id;
                    li.innerHTML = `
                    <h3>${language_name}</h3>
                    <h4>level: <strong>${language_level}</strong></h4>
                    <div>
                        <button data-id="${data.id}" onclick="editLanguage(this)">Edit</button>
                        <button data-id="${data.id}" onclick="deleteLanguage(this)">Delete</button>
                    </div> 
                    `;
                    ul.appendChild(li);
                    form.reset();
                    form.style.display = 'none';
                    document.getElementById('notFound')?.remove();
                } else {
                    document.getElementById('errorLanguage').innerHTML = await res.text();
                }
            })
            .catch((err) => {
                console.error(err);
                document.getElementById('errorLanguage').innerHTML = 'Internal server error';
            });
    });
}
function addLanguage() {
    const form = document.querySelector('.languageForm');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}
function cancelAddLanguage() {
    const form = document.querySelector('.userDataForm.languageForm');
    form.style.display = 'none';
}
function deleteLanguage(button) {

    document.getElementById('errorLanguage').innerHTML = '';
    const id = button.getAttribute('data-id');
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingLanguage').innerHTML = 'Loading...';
            button.disabled = true;
            callback();
        } finally {
            document.getElementById('loadingLanguage').innerHTML = '';
            button.disabled = false;
        }
    };
    startTransition(async () => {
        await fetch(`/api/user/language/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            if (res.ok) {
                document.getElementById(id).remove();
                const ul = document.getElementById('languageList');
                if (ul.children.length === 0) {
                    const notFound = document.createElement('p');
                    notFound.id = 'notFound';
                    notFound.innerText = 'No language found.';
                    ul.appendChild(notFound);
                }
            } else {
                document.getElementById('errorLanguage').innerHTML = await res.text();
            }
        });
    });
}

function editLanguage(button) {

    document.getElementById('errorLanguage').innerHTML = '';
    const id = button.getAttribute('data-id');
    const li = document.getElementById(id);
    const language_name = li.querySelector('h3').innerText;
    const language_level = li.querySelector('h4 strong').innerText;
    const form = document.querySelector('.languageForm');
    form.style.display = 'flex';
    form.language_name.value = language_name;
    form.language_level.value = language_level;

    form.onsubmit = function (event) {
        event.preventDefault();
        const startTransition = (callback) => {

            try {
                document.getElementById('loadingLanguage').innerHTML = 'Loading...';
                button.disabled = true;
                callback();
            } finally {
                document.getElementById('loadingLanguage').innerHTML = '';
                button.disabled = false;
            }
        };

        startTransition(async () => {
            const formData = new FormData(form);
            const { user_id, language_name, language_level } = Object.fromEntries(formData.entries());
            if (!user_id || !language_name || !language_level) {
                document.getElementById('errorLanguage').innerHTML = 'Please fill in all required fields';
                return;
            }
            await fetch(`/api/user/language/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user_id,
                    language_name,
                    language_level,
                }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        li.querySelector('h3').innerText = language_name;
                        li.querySelector('h4 strong').innerText = language_level;
                        form.reset();
                        form.style.display = 'none';
                    } else {
                        document.getElementById('errorLanguage').innerHTML = await res.text();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById('errorLanguage').innerHTML = 'Internal server error';
                });
        });
    };
}
