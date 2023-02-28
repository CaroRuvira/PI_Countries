const Router = require('express');
const axios = require('axios')
const { Country, Activity} = require ('../db');
const {Op} = require ('sequelize')


const router = Router();

const getApiData = async() => {
    const apiData = await axios.get('https://restcountries.com/v3/all');
    const mapeo =  apiData.data.map(country => {
       const countryProp ={
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[1],
            continent: country.continents[0], 
            capital: country.capital ? country.capital[0] : 'This country does not have Capital',
            subregion: country.subregion,
            area: country.area,
            population : country.population
        }
        return countryProp
        
     });
     return mapeo
};
  
  
     

const saveApiData = async() => {
    try {
        const countries= await Country.findAll();
        if(!countries.length){
     
        const allCountries = await getApiData();
        await Country.bulkCreate(allCountries);
        }
        
    } catch (error) {
        console.log(error)
    }
}
 const chargeDb = async () =>{
    await saveApiData();

 }
 chargeDb();


router.get('/countries', async (req, res) => {
    const  name  = req.query.name;
    try {
        if(!name){
            const allCountries = await Country.findAll({
                include:[{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through:{attributes:[]}
                }]
            })

            if(allCountries){
                return res.status(200).json(allCountries);
            } else{
                return res.status(404).send('Countries not found')
            }
        } else {
            const countryName = await Country.findAll({
                where:{
                    name : {[Op.iLike] : name}
                },
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through:{attributes:[]}
                }]
            })
            if(countryName){
                return res.status(200).json(countryName);
            } else {
                return res.status(404).send('Country noy found')
            }
        }
    } catch (error) {
        console.log(error)
    }
           
});


router.get('/countries/:idPais', async (req, res) => {
    const idPais = req.params.idPais

    try {
        const country = await Country.findOne({
            where: {
                id: idPais.toUpperCase()
            },
            include :[{
                model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through:{attributes:[]}
            }]
        })
        if (country) {
            return res.status(200).json(country)
        } else {
            return res.status(404).send('Country not found')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;