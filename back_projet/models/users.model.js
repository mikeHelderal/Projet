// Je recup ma connexion dans la variable sequilize
// et mes types de champs SQL dans DataTypes
export default (connection, DataTypes) => {
    connection.define(
        'Users',
        {
            // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            born: {
                type: DataTypes.DATE,
                allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: O
            },
            isSuperAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            }
        },
        { timestamps: true }
    );
}