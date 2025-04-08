function skillsFormSubmit(event) {
    const form = document.querySelector('.skillsForm');
    document.getElementById('errorSkills').innerHTML = '';
    event.preventDefault();
    const formData = new FormData(form);
    const { user_id, skill_name, skill_level } = Object.fromEntries(formData.entries());
    if (!user_id || !skill_name || !skill_level) {
        document.getElementById('errorSkills').innerHTML = 'Please fill in all required fields';
        return;
    }
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingSkills').innerHTML = 'Loading...';
            document.getElementById('submitButtonSkills').disabled = true;
            callback();
        } finally {
            document.getElementById('loadingSkills').innerHTML = '';
            document.getElementById('submitButtonSkills').disabled = false;
        }
    };

    startTransition(async () => {
        await fetch('/api/user/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                skill_name,
                skill_level,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const ul = document.getElementById('skillsList');
                    const li = document.createElement('li');
                    const data = await res.json();
                    li.id = data.id;
                    li.innerHTML = `
                    <h3>${skill_name}</h3>
                    <h4>level: <strong>${skill_level}</strong></h4>
                    <div>
                        <button data-id="${data.id}" onclick="editSkill(this)">Edit</button>
                        <button data-id="${data.id}" onclick="deleteSkill(this)">Delete</button>
                    </div> 
                    `;
                    ul.appendChild(li);
                    form.reset();
                    form.style.display = 'none';
                    document.getElementById('notFound').remove();
                } else {
                    document.getElementById('errorSkills').innerHTML = await res.text();
                }
            })
            .catch((err) => {
                console.error(err);
                document.getElementById('errorSkills').innerHTML = 'Internal server error';
            });
    });
}
function addSkill() {
    const form = document.querySelector('.skillsForm');
    console.log("add skill button");
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}
function cancelAddSkill() {
    const form = document.querySelector('.userDataForm.skillsForm');
    form.style.display = 'none';
}
function deleteSkill(button) {
    const id = button.getAttribute('data-id');

    document.getElementById('errorSkills').innerHTML = '';
    const startTransition = (callback) => {
        try {
            document.getElementById('loadingSkills').innerHTML = 'Loading...';
            button.disabled = true;
            callback();
        } finally {
            document.getElementById('loadingSkills').innerHTML = '';
            button.disabled = false;
        }
    };
    startTransition(async () => {
        await fetch(`/api/user/skills/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            if (res.ok) {
                document.getElementById(id).remove();
                const ul = document.getElementById('skillsList');
                if (ul.children.length === 0) {
                    const notFound = document.createElement('p');
                    notFound.id = 'notFound';
                    notFound.innerText = 'No skill found.';
                    ul.appendChild(notFound);
                }
            } else {
                document.getElementById('errorSkills').innerHTML = await res.text();
            }
        });
    });
}

function editSkill(button) {
    const id = button.getAttribute('data-id');
    const li = document.getElementById(id);
    const skill_name = li.querySelector('h3').innerText;
    const skill_level = li.querySelector('h4 strong').innerText;
    const form = document.querySelector('.skillsForm');

    document.getElementById('errorSkills').innerHTML = '';
    form.style.display = 'flex';
    form.skill_name.value = skill_name;
    form.skill_level.value = skill_level;

    form.onsubmit = function (event) {
        event.preventDefault();

        const startTransition = (callback) => {
            try {
                document.getElementById('loadingSkills').innerHTML = 'Loading...';
                button.disabled = true;
                callback();
            } finally {
                document.getElementById('loadingSkills').innerHTML = '';
                button.disabled = false;
            }
        };

        startTransition(async () => {
            const formData = new FormData(form);
            const { user_id, skill_name, skill_level } = Object.fromEntries(formData.entries());
            if (!user_id || !skill_name || !skill_level) {
                document.getElementById('errorSkills').innerHTML = 'Please fill in all required fields';
                return;
            }
            await fetch(`/api/user/skills/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user_id,
                    skill_name,
                    skill_level,
                }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        li.querySelector('h3').innerText = skill_name;
                        li.querySelector('h4 strong').innerText = skill_level;
                        form.reset();
                        form.style.display = 'none';
                    } else {
                        document.getElementById('errorSkills').innerHTML = await res.text();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById('errorSkills').innerHTML = 'Internal server error';
                });
        });
    };
}
