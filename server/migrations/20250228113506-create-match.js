'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      match_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tournament_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tournaments',
          key: 'tournament_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      team1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      team2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      winner_team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      status: {
        type: Sequelize.ENUM('Upcoming', 'Completed', 'Live'),
        allowNull: false,
        defaultValue: 'Upcoming',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};