const {Router}= require ('express');
const {Activity, Country } = require ('../db');
const {Op} = require ('sequelize');

const router = Router();

const postActivity = async (name, difficulty, duration, season, countries) => {
    try {
        const newActivity = await Activity.create({
            name, 
            difficulty,
            duration,
            season
        });

        const selectCountries = await Country.findAll({
            where : {
                name: countries
            }
        });
        return newActivity.addCountry(selectCountries)
    } catch (error) {
        console.log('No se pudo crear la actividad')
    }
};

const searchActivities = async () => {
    try {
        const getActivities = await Activity.findAll();
        return getActivities;
    } catch (error) {
        console.log('No existen actividades')
    }
}

router.post('/activities', async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;
        const newActivity = await postActivity(name, difficulty, duration, season, countries)
        res.status(201).send(newActivity)
    } catch (error) {
        console.log('No se pudo crear la actividad')
    }
});


router.get('/activities', async (req, res) => {
    try {
        const getActivities = await searchActivities();
        res.status(200).json(getActivities);
    } catch (error) {
        console.log('No existen actividades')
    }
})


module.exports = router;