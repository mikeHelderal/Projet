export default (connection, DataTypes) => {
    connection.define(
        'News',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            information: {
                type: DataTypes.STRING,
            },
        },
        { timestamps: true }
    );
}