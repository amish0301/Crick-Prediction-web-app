"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable("tournaments", {
        tournament_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        schedule: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tournament_type: {
          type: Sequelize.ENUM("T20", "ODI", "TEST"),
          allowNull: false,
        },
        pointsTable: {
          type: Sequelize.ARRAY(Sequelize.JSONB),
          defaultValue: [],
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

     // Add Foreign Key Constraint for Matches
    // await queryInterface.addConstraint("Match", {
    //   fields: ["tournament_id"],
    //   type: "foreign key",
    //   name: "fk_matches_tournament",
    //   references: {
    //     table: "tournaments",
    //     field: "tournament_id",
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });

    },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tournaments");
  },
};
