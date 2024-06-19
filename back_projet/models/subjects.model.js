export default (connection, DataTypes) => {
    connection.define(
        'Subjects',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { timestamps: true }
    );
}