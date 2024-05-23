export default (connection, DataTypes) => {
    connection.define(
        'City',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}