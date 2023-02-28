const {DataTypes}= require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id:{
           type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement: true 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            validate:{
                min : 1,
                max: 5
            }
        },
            duration:{
                type: DataTypes.INTEGER,
                allowNull:false,
                validate :{
                    min: 1,
                    max: 24
                }
              
            },
            season:{
                type: DataTypes.ENUM('Summer', 'Winter', 'Autumn', 'Spring'),
                aloowNull:false
            }
        },
    {
        timestamps:false
    });
}