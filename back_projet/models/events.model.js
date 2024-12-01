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
                allowNull: false,
                defaultValue: 0
            },
            adresse: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ville: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            heure_debut: {
                type: DataTypes.STRING,
                allowNull: false
            },
            heure_fin: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, { timestamps: true }
    );
}