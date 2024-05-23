export default (connection, DataTypes) => {
    connection.define(
        'Evenement',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            information: {
                type: DataTypes.STRING,
                allowNull: false
            },
            organizer: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { timestamps: true }
    );
}