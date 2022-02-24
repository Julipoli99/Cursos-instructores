module.exports = (sequelize, dataTypes) => {
    let alias = "Estudiante";
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
            type: dataTypes.STRING(50)
        }
        
    }

    let config = {
        tableName: "estudiante",
        timestamps: false
    }

    const Estudiante = sequelize.define(alias, cols, config);

    Estudiante.associate = function(models) {
        Estudiante.belongsToMany(models.Curso, {
            as: "cursos",
            through: "curso_estudiante",
            foreignKey: "id_estudiante",
            otherKey: "id_curso",
            timestamps: false
        })
    }

    return Estudiante;

}