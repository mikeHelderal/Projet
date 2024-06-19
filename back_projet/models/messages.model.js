export default (connection, DataTypes) => {
    connection.define(
        'Messages',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_message: {
                type: DataTypes.DATE,
                allowNull: false
            }

        }, { timestamps: true }
    );
}