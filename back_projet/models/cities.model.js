export default (connection, DataTypes) => {
    connection.define(
        'Cities',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}