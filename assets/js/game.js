var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP  this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // if player chooses fight.
    if (promptFight === "fight" || promptFight === "FIGHT"){
        //Subtract the value of 'playerAttack from the value of 'enemyHealth and us that result to update the value in the 'enemyHealth' variable
        enemyHealth = enemyHealth - playerAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        // Check enemy's health.
        if (enemyHealth <= 0) {
            window.alert(enemyName + " had died!");
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        };
        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        // Check player's health.ß
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        };
    // if player chooses to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        // Confirm player wants to skip.
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        // If yes (true), leave fight.
        if(confirmSkip){
            window.alert(playerName + " has decided to skip the fight. Goodbye!");
            // Subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
        } else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    };
};

fight();
