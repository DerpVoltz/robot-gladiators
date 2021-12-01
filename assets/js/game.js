var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP  this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // If yes (true), leave fight.
            if(confirmSkip){
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        // if player chooses fight.
        if (promptFight === "fight" || promptFight === "FIGHT") {
            var damage = randomNumber(playerAttack - 3, playerAttack);
            //Subtract the value of 'playerAttack from the value of 'enemyHealth and us that result to update the value in the 'enemyHealth' variable
            enemyHealth = Math.max(0, enemyHealth - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            )
            // Check enemy's health.
            if (enemyHealth <= 0) {
                window.alert(enemyName + " had died!");
                // Reward player
                playerMoney = Math.max(0, playerMoney + 10);
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
            var damage = randomNumber(enemyAttack - 3, enemyAttack);

            playerHealth = Math.max(0, playerHealth - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            )
            // Check player's health.
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
}
var startGame = function() {
    // Resets player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(49, 60);
            fight(pickedEnemyName);
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
}

// Function to end the entire game
var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // Restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    console.log("entered the shop");
    // Ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, Upgrade your attack, or LEAVE? Please enter one: 'Refill', 'Upgrade', or 'Leave' to make a choice."
    );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // Increase health and devrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // Increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

// Start the game when the page loads
startGame();