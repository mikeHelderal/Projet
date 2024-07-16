export default (connection, DataTypes) => {
    connection.define(
        'Events',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_event: {
                type: DataTypes.DATE,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_valid: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        }, { timestamps: true }
    );
}