export default (connection, DataTypes) => {
    connection.define(
        'Subject',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { timestamps: true }
    );
}