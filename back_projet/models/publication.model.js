export default (connection, DataTypes) => {
    connection.define(
        'Publication',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
        }, { timestamps: true }
    );
}