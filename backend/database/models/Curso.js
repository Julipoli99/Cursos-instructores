module.exports = (sequelize, dataTypes) => {
    let alias = "Curso";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre_curso: {
            type: dataTypes.STRING(100),
        },
        Duracion: {
            type: dataTypes.INTEGER(250)
        },
        DiaHora: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: "curso",
        timestamps: false
    }

    const Curso = sequelize.define(alias, cols, config)

    /*Curso.associate = function(models) {
        Curso.hasMany(models.InstructorCurso, {
            as: "curso_instructor",
            foreignKey: "id_curso"
        })
    }*/

    Curso.associate = function(models){
        Curso.belongsToMany(models.Estudiante, {
            as: "estudiantes",
            through: "curso_estudiante",
            foreignKey: "id_curso",
            otherKey: "id_estudiante",
            timestamps: false
        })
    }

    Curso.associate = function(models){
        Curso.belongsToMany(models.Instructor, {
            as: "curso_instructor",
            through: "instructor_curso",
            foreignKey: "id_curso",
            otherKey: "id_instructor",
            timestamps: false
        })
    }

    return Curso;

}