function setCurrent(name) {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('experienceSection').style.display = 'none';
    document.getElementById('educationSection').style.display = 'none';
    document.getElementById('skillsSection').style.display = 'none';
    document.getElementById('languagesSection').style.display = 'none';
    document.getElementById(name + 'Section').style.display = 'block';
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`nav button[onclick="setCurrent('${name}')"]`).classList.add('active');
}