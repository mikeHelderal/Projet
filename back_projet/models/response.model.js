export default (connection, DataTypes) => {
    connection.define(
        'Response',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }

        }, { timestamps: true }
    );
}