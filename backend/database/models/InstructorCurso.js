module.exports = (sequelize, dataTypes) => {
    let alias = "InstructorCurso";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_instructor: {
            type: dataTypes.INTEGER,
            
        },
        id_curso: {
            type: dataTypes.INTEGER,
            
        }
    }

    let config = {
        tableName: "instructor_curso",
        timestamps: false
    }

    const InstructorCurso = sequelize.define(alias, cols, config);

    InstructorCurso.associate = function(models) {
        InstructorCurso.belongsTo(models.Instructor, {
            as: "instructor",
            foreignKey: "id_instructor"
        })
    }

    InstructorCurso.associate = function(models) {
        InstructorCurso.belongsTo(models.Curso, {
            as: "curso",
            foreignKey: "id_curso"
        })
    }

    return InstructorCurso;

}