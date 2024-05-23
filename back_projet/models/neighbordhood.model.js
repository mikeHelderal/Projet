export default (connection, DataTypes) => {
    connection.define(
        'Neighbordhood',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}