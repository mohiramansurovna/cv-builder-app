function educationFormSubmit(event) {
    const form = document.querySelector('.educationForm');
    document.getElementById('errorEducation').innerHTML = '';
    event.preventDefault();
    const formData = new FormData(form);
    const { user_id, degree, field_of_study, institution, location, start_date, end_date, description } = Object.fromEntries(formData.entries());
    if (!user_id || !degree || !field_of_study || !institution || !location || !start_date || !end_date || !description) {
        document.getElementById('errorEducation').innerHTML = 'Please fill in all required fields';
        return;
    }
    if (new Date(start_date) > new Date(end_date)) {
        document.getElementById('errorEducation').innerHTML = 'Start date cannot be after end date';
        return;
    }

    const startTransition = (callback) => {
        try {
            document.getElementById('loadingEducation').innerHTML = 'Loading...';
            document.getElementById('submitButtonEducation').disabled = true;
            callback();
        } finally {
            document.getElementById('loadingEducation').innerHTML = '';
            document.getElementById('submitButtonEducation').disabled = false;
        }
    };

    startTransition(async () => {
        await fetch('/api/user/education', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                degree,
                field_of_study,
                institution,
                location,
                start_date,
                end_date,
                description,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const ul = document.getElementById('educationList');
                    const li = document.createElement('li');
                    const data = await res.json();
                    li.id = data.id;
                    li.innerHTML = `
                    <h3>${degree}</h3>
                    <h4>in <strong>${field_of_study}</strong></h4>
                    <p><span>in ${location}</span></p>
                    <p>from <strong>${institution}</strong></p>
                    <p><span>${start_date}</span> to <span>${end_date}</span></p>
                    <p>${description}</p>
                    <div>
                        <button data-id="${data.id}" onclick="editEducation(this)">Edit</button>
                        <button data-id="${data.id}" onclick="deleteEducation(this)">Delete</button>
                    </div> 
                    `;
                    ul.appendChild(li);
                    form.reset();
                    form.style.display = 'none';
                    document.getElementById('notFound').remove();
                } else {
                    document.getElementById('errorEducation').innerHTML = await res.text();
                }
            })
            .catch((err) => {
                console.error(err);
                document.getElementById('errorEducation').innerHTML = 'Internal server error';
            });
    });
}
function addEducation() {
    const form = document.querySelector('.educationForm');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}
function cancelAddEducation() {
    const form = document.querySelector('.userDataForm.educationForm');
    form.style.display = 'none';
}
function deleteEducation(button) {
    const id = button.getAttribute('data-id');
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingEducation').innerHTML = 'Loading...';
            button.disabled = true;
            callback();
        } finally {
            document.getElementById('loadingEducation').innerHTML = '';
            button.disabled = false;
        }
    };
    startTransition(async () => {
        await fetch(`/api/user/education/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            if (res.ok) {
                document.getElementById(id).remove();
                if (document.getElementById('educationList').children.length === 0) {
                    const notFound = document.createElement('p');
                    notFound.id = 'notFound';
                    notFound.innerText = 'No education found.';
                    document.getElementById('educationList').appendChild(notFound);
                }
            } else {
                document.getElementById('errorEducation').innerHTML = await res.text();
            }
        });
    });
}

function editEducation(button) {
    const id = button.getAttribute('data-id');
    const li = document.getElementById(id);
    const degree = li.querySelector('h3').innerText;
    const field_of_study = li.querySelector('h4 strong').innerText;
    const location = li.querySelector('p:nth-of-type(1) span').innerText;
    const institution = li.querySelector('p:nth-of-type(2) strong').innerText;
    const start_date = li.querySelector('p:nth-of-type(3) span:nth-of-type(1)').innerText;
    const end_date = li.querySelector('p:nth-of-type(3) span:nth-of-type(2)').innerText;
    const description = li.querySelector('p:nth-of-type(4)').innerText;
    
    document.getElementById('errorEducation').innerHTML = '';
    const form = document.querySelector('.educationForm');
    form.style.display = 'flex';
    form.degree.value = degree;
    form.field_of_study.value = field_of_study;
    form.location.value = location;
    form.institution.value = institution;
    form.start_date.value = start_date;
    form.end_date.value = end_date;
    form.description.value = description;

    form.onsubmit = function (event) {
        event.preventDefault();

        const startTransition = (callback) => {
            try {
                document.getElementById('loadingEducation').innerHTML = 'Loading...';
                button.disabled = true;
                callback();
            } finally {
                document.getElementById('loadingEducation').innerHTML = '';
                button.disabled = false;
            }
        };

        startTransition(async () => {
            const formData = new FormData(form);
            const { user_id, degree, field_of_study, institution, location, start_date, end_date, description } = Object.fromEntries(formData.entries());
            if (!user_id || !degree || !field_of_study || !institution || !location || !start_date || !end_date || !description) {
                document.getElementById('errorEducation').innerHTML = 'Please fill in all required fields';
                return;
            }
            if (new Date(start_date) > new Date(end_date)) {
                document.getElementById('errorEducation').innerHTML = 'Start date cannot be after end date';
                return;
            }
            await fetch(`/api/user/education/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user_id,
                    degree,
                    field_of_study,
                    institution,
                    location,
                    start_date,
                    end_date,
                    description,
                }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        li.querySelector('h3').innerText = degree;
                        li.querySelector('h4 strong').innerText = field_of_study;
                        li.querySelector('p:nth-of-type(1) span').innerText = location;
                        li.querySelector('p:nth-of-type(2) strong').innerText = institution;
                        li.querySelector('p:nth-of-type(3) span:nth-of-type(1)').innerText = start_date;
                        li.querySelector('p:nth-of-type(3) span:nth-of-type(2)').innerText = end_date;
                        li.querySelector('p:nth-of-type(4)').innerText = description;

                        form.reset();
                        form.style.display = 'none';
                    } else {
                        document.getElementById('errorEducation').innerHTML = await res.text();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById('errorEducation').innerHTML = 'Internal server error';
                });
        });
    };
}
