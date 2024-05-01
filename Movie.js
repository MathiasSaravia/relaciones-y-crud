module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.INTEGER.UNSIGNED,

        genre_id: dataTypes.INTEGER.UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,{
            as:"genres",
            foreignKey:"genre_id"
        })

        Movie.belongsToMany(models.Actor,{
            as:"actores",
            through:"actor_movie",
            foreignKey:"movie_id",
            otherKey:"actor_id",
            timestamps:false
        })
    }

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    return Movie
};