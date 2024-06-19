export default (connection, DataTypes) => {
    connection.define(
        'Neighbordhoods',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}