function profileFormSubmit(event) {
    const form = document.querySelector('.profileForm');
    event.preventDefault();
    const formData = new FormData(form);
    const { user_id, job_title, personal_statement, linkedin, github, portfolio } = Object.fromEntries(formData.entries());
    if (!user_id || !job_title || !personal_statement) {
        document.getElementById('error').innerHTML = 'Please fill in all required fields';
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
        await fetch('/api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                job_title,
                personal_statement,
                linkedin,
                github,
                portfolio,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    const ul = document.getElementById('profileList');
                    const li = document.createElement('li');
                    const data = await res.json();
                    li.id = data.id;
                    li.innerHTML = `
                            <h3> ${job_title} </h3>
                            <h4> <strong>Personal Statement</strong> <br/> <i>${personal_statement}</i> </h4>
                            ${linkedin ? `<h4 id='linkedin'><strong>LinkedIn</strong> <br/> <a href="${linkedin}" target="_blank">${linkedin}</a> </h4>` : ''}
                            ${github ? `<h4 id='github'> <strong>GitHub</strong> <br/> <a href="${github}" target="_blank">${github}</a> </h4>` : ''}
                            ${portfolio ? `<h4 id='portfolio'> <strong>Portfolio</strong> <br/> <a href="${portfolio}" target="_blank">${portfolio}</a> </h4>` : ''}
                    <div>
                        <button data-id="${data.id}" onclick="editProfile(this)">Edit</button>
                        <button data-id="${data.id}" onclick="deleteProfile(this)">Delete</button>
                    </div> 
                    `;
                    ul.appendChild(li);
                    form.reset();
                    form.style.display = 'none';
                    document.getElementById('notFound').remove();
                    const addButton = document.getElementById('addButton');
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
function addProfile() {
    const form = document.querySelector('.userDataForm.profileForm');
    form.style.display = 'flex';
    form.reset();
    document.getElementById('error').innerHTML = '';
}
function cancelAddProfile() {
    const form = document.querySelector('.userDataForm.profileForm');
    form.style.display = 'none';
}
function deleteProfile(button) {
    const id = button.getAttribute('data-id');
    const startTransition = (callback) => {
        try {
            document.getElementById('loading').innerHTML = 'Loading...';
            button.disabled = true;
            callback();
        } finally {
            document.getElementById('loading').innerHTML = '';
            button.disabled = false;
        }
    };
    startTransition(async () => {
        await fetch(`/api/user/profile/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (res) => {
            if (res.ok) {
                document.getElementById(id).remove();
                const ul = document.getElementById('profileList');
                if (ul.children.length === 0) {
                    const notFound = document.createElement('p');
                    notFound.id = 'notFound';
                    notFound.innerText = 'No profile found.';
                    const addButton = document.createElement('button');
                    addButton.id = 'addButton';
                    addButton.innerText = 'Add Profile';
                    addButton.onclick = addProfile;
                    ul.appendChild(addButton);
                    ul.appendChild(notFound);
                }
            } else {
                document.getElementById('error').innerHTML = await res.text();
            }
        });
    });
}

function editProfile(button) {
    const id = button.getAttribute('data-id');
    const li = document.getElementById(id);
    const job_title = li.querySelector('h3').innerText;
    const personal_statement = li.querySelector('h4:nth-of-type(1) i').innerText;
    const linkedin = li.querySelector('#linkedin a')?li.querySelector('#linkedin a').innerText : null;
    const github = li.querySelector('#github a')?li.querySelector('#github a').innerText : null;
    const portfolio = li.querySelector('#portfolio a')?li.querySelector('#portfolio a').innerText : null;

    const form = document.querySelector('.profileForm');
    form.style.display = 'flex';
    form.job_title.value = job_title;
    form.personal_statement.value = personal_statement;
    form.linkedin.value = linkedin;
    form.github.value = github;
    form.portfolio.value = portfolio;

    form.onsubmit = function (event) {
        event.preventDefault();
        const startTransition = (callback) => {
            try {
                document.getElementById('loading').innerHTML = 'Loading...';
                button.disabled = true;
                callback();
            } finally {
                document.getElementById('loading').innerHTML = '';
                button.disabled = false;
            }
        };

        startTransition(async () => {
            const formData = new FormData(form);
            const { user_id, job_title, personal_statement, linkedin, github, portfolio } = Object.fromEntries(formData.entries());
            if (!user_id || !job_title || !personal_statement) {
                document.getElementById('error').innerHTML = 'Please fill in all required fields';
                return;
            }
            await fetch(`/api/user/profile/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user_id,
                    job_title,
                    personal_statement,
                    linkedin,
                    github,
                    portfolio,
                }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        li.querySelector('h3').innerText = job_title;
                        li.querySelector('h4:nth-of-type(1) i').innerText = personal_statement;
                        if(linkedin){ 
                            if(li.querySelector('#linkedin') === null){
                                const linkedinElement = document.createElement('h4');
                                linkedinElement.id = 'linkedin';
                                linkedinElement.innerHTML = `<strong>LinkedIn</strong> <br/> <a href="${linkedin}" target="_blank">${linkedin}</a>`;
                                li.insertBefore(linkedinElement, li.children[li.children.length - 1]);
                            }
                            li.querySelector('#linkedin a').innerText = linkedin;
                            li.querySelector('#linkedin a').href = linkedin;
                        } else li.querySelector('#linkedin')?.remove();

                        if(github){ 
                            if(li.querySelector('#github') === null){
                                const githubElement = document.createElement('h4');
                                githubElement.id = 'github';
                                githubElement.innerHTML = `<strong>GitHub</strong> <br/> <a href="${github}" target="_blank">${github}</a>`;
                                li.insertBefore(githubElement, li.children[li.children.length - 1]);
                            }
                            li.querySelector('#github a').innerText = github;
                            li.querySelector('#github a').href = github;
                        } else li.querySelector('#github')?.remove();

                        if(portfolio){ 
                            if(li.querySelector('#portfolio') === null){
                                const portfolioElement = document.createElement('h4');
                                portfolioElement.id = 'portfolio';
                                portfolioElement.innerHTML = `<strong>Portfolio</strong> <br/> <a href="${portfolio}" target="_blank">${portfolio}</a>`;
                                li.insertBefore(portfolioElement, li.children[li.children.length - 1]);
                            }
                            li.querySelector('#portfolio a').innerText = portfolio;
                            li.querySelector('#portfolio a').href = portfolio;
                        } else li.querySelector('#portfolio')?.remove();

                        form.reset();
                        form.style.display = 'none';
                    } else {
                        document.getElementById('error').innerHTML = await res.text();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    document.getElementById('error').innerHTML = 'Internal server error';
                });
        });
    };
}
