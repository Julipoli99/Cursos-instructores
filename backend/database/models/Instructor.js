module.exports = (sequelize, dataTypes) => {
    let alias = "Instructor";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: dataTypes.STRING(50),
        },
        Apellido: {
            type: dataTypes.STRING(50),
        }
    }

    let config = {
        tableName: "instructor",
        timestamps: false
    }

    const Instructor = sequelize.define(alias, cols, config);

    Instructor.associate = function(models) {
        Instructor.belongsToMany(models.Curso, {
            as: "cursos",
            through: "instructor_curso",
            foreignKey: "id_instructor",
            otherKey: "id_curso",
            timestamps: false
        })
    }

    return Instructor;

}