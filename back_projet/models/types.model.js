export default (connection, DataTypes) => {
    connection.define(
        'Types',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}