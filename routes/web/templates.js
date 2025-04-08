const templateRouter = require('express').Router();
const getUserData = require('../../controllers/user.js');

templateRouter.get('/',(req,res)=>{
    res.render('templates/index.ejs', {user:req.user,title:'Templates'});
})

templateRouter.get('/:templateName', async(req, res) => {

    const templateName = req.params.templateName;
    const templates = ['modernFlow', 'crimsonRed', 'blueDragon'];
    
    if (!templates.includes(templateName)) {
        return res.status(404).send('Template not found');
    }
    const responce = await getUserData(req.user, {title:templateName})

    if (!responce) return res.status(500).send('Internal Server Error');

    return res.render(`templates/${templateName}.ejs`, { ...responce, noLayout: true, });

    
})

module.exports = templateRouter;