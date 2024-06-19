export default (connection, DataTypes) => {
    connection.define(
        'Response',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_response: {
                type: DataTypes.DATE,
                allowNull: false
            }

        }, { timestamps: true }
    );
}