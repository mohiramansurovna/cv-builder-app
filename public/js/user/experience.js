function experienceFormSubmit(event) {
    const form = document.querySelector('.experiencesForm');
    event.preventDefault();
    const formData = new FormData(form);
    const { user_id, job_title, company_name, start_date, end_date, description } = Object.fromEntries(formData.entries());
    if (!user_id || !job_title || !company_name || !start_date || !end_date || !description) {
        console.log('Please fill in all required fields', user_id, job_title, company_name, start_date, end_date, description);
        document.getElementById('errorExperience').innerHTML = 'Please fill in all required fields';
        return;
    }
    if (new Date(start_date) > new Date(end_date)) {
        console.log("Start date cannot be after end date", start_date, end_date);
        document.getElementById('errorExperience').innerHTML = 'Start date cannot be after end date';
        return;
    }

    const startTransition = (callback) => {
        try {
            document.getElementById('loadingExperience').innerHTML = 'Loading...';
            document.getElementById('submitButtonExperience').disabled = true;
            callback();
        } finally {
            document.getElementById('loadingExperience').innerHTML = '';
            document.getElementById('submitButtonExperience').disabled = false;
        }
    };

    startTransition(async () => {
        await fetch('/api/user/experience', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                job_title,
                company_name,
                start_date,
                end_date,
                description,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const ul = document.getElementById('experiencesList');
                    const li = document.createElement('li');
                    const data = await res.json();
                    li.id = data.id;
                    li.innerHTML = `
                    <h3>${job_title}</h3>
                    <h4>at <strong>${company_name}</strong></h4>
                    <p><span>${start_date}</span> to <span>${end_date}</span></p>
                    <p>${description}</p>
                    <div>
                        <button data-id="${data.id}" onclick="editExperience(this)">Edit</button>
                        <button data-id="${data.id}" onclick="deleteExperience(this)">Delete</button>
                    </div> 
                    `;
                    ul.appendChild(li);
                    form.reset();
                    form.style.display = 'none';
                    document.getElementById('notFound').innerHTML="";
                } else {
                    document.getElementById('errorExperience').innerHTML = await res.text();
                }
            })
            .catch((err) => {
                console.error(err);
                document.getElementById('errorExperience').innerHTML = 'Internal server error';
            });
    });
}
function addExperience() {
    const form = document.querySelector('.experiencesForm');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}
function cancelAddExperience() {
    const form = document.querySelector('.userDataForm.experiencesForm');
    form.style.display = 'none';
}
function deleteExperience(button) {
    const id = button.getAttribute('data-id');
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingExperience').innerHTML = 'Loading...';
            button.disabled = true;
            callback();
        } finally {
            document.getElementById('loadingExperience').innerHTML = '';
            button.disabled = false;
        }
    };
    startTransition(async () => {
        await fetch(`/api/user/experience/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            if (res.ok) {
                document.getElementById(id).remove();
                const ul = document.getElementById('experiencesList');
                if (ul.children.length === 0) {
                    const notFound = document.createElement('p');
                    notFound.id = 'notFound';
                    notFound.innerText = 'No experience found.';
                    ul.appendChild(notFound);
                }
            } else {
                document.getElementById('errorExperience').innerHTML = await res.text();
            }
        });
    });
}

function editExperience(button) {
    const id = button.getAttribute('data-id');
    const li = document.getElementById(id);
    const job_title = li.querySelector('h3').innerText;
    const company_name = li.querySelector('h4 strong').innerText;
   const start_date = li.querySelector('p:nth-of-type(1) span:nth-of-type(1)').innerText;
    const end_date = li.querySelector('p:nth-of-type(1) span:nth-of-type(2)').innerText;
    const description = li.querySelector('p:nth-of-type(2)').innerText;

    const form = document.querySelector('.experiencesForm');
    form.style.display = 'flex';
    form.job_title.value = job_title;
    form.company_name.value = company_name;
    form.start_date.value = start_date;
    form.end_date.value = end_date;
    form.description.value = description;

    form.onsubmit = function (event) {
        event.preventDefault();
        const startTransition = (callback) => {
            try {
                document.getElementById('loadingExperience').innerHTML = 'Loading...';
                button.disabled = true;
                callback();
            } finally {
                document.getElementById('loadingExperience').innerHTML = '';
                button.disabled = false;
            }
        };

        startTransition(async () => {
            const formData = new FormData(form);
            const { user_id, job_title, company_name, start_date, end_date, description } = Object.fromEntries(formData.entries());
            if (!user_id || !job_title || !company_name || !start_date || !end_date|| !description) {
                document.getElementById('errorExperience').innerHTML = 'Please fill in all required fields';
                return;
            }
            if (new Date(start_date) > new Date(end_date)) {
                document.getElementById('errorExperience').innerHTML = 'Start date cannot be after end date';
                return;
            }
            await fetch(`/api/user/experience/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user_id, 
                    job_title, 
                    company_name, 
                    start_date, 
                    end_date, 
                    description
                }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        li.querySelector('h3').innerText = job_title;
                        li.querySelector('h4 strong').innerText = company_name;
                        li.querySelector('p:nth-of-type(1) span:nth-of-type(1)').innerText = start_date;
                        li.querySelector('p:nth-of-type(1) span:nth-of-type(2)').innerText = end_date;
                        li.querySelector('p:nth-of-type(2)').innerText = description;

                        form.reset();
                        form.style.display = 'none';
                    } else {
                        document.getElementById('errorExperience').innerHTML = await res.text();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById('errorExperience').innerHTML = 'Internal server error';
                });
        });
    };
}
