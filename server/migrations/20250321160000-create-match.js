'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      match_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      tournament_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tournaments',
          key: 'tournament_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      team1_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      team2_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      winner_team_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'team_id',
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      man_of_the_match: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "players",
          key: "player_id",
        },
      },
      format: {
        type: Sequelize.ENUM("T20", "ODI", "TEST"),
        allowNull: true,
        defaultValue: "T20",
      },
      match_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      score_team1: {
        type: Sequelize.STRING,
        allowNull: true, // "180/5"
      },
      score_team2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      overs_team1: {
        type: Sequelize.FLOAT,
        allowNull: true, // "15.5"
      },
      overs_team2: {
        type: Sequelize.FLOAT,
        allowNull: true,
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