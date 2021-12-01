// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP  this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // If yes (true), leave fight.
            if(confirmSkip){
                window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                // Subtract money from playerInfo.money for skipping
                playerInfo.money = playerInfo.money - 10;
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        // if player chooses fight.
        if (promptFight === "fight" || promptFight === "FIGHT") {
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            //Subtract the value of 'playerInfo.attack from the value of 'enemy.health and us that result to update the value in the 'enemy.health' variable
            enemy.health = Math.max(0, enemy.health - damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            )
            // Check enemy's health.
            if (enemy.health <= 0) {
                window.alert(enemy.name + " had died!");
                // Reward player
                playerInfo.money = Math.max(0, playerInfo.money + 10);
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            )
            // Check player's health.
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
}
var startGame = function() {
    // Resets player stats
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(49, 60);
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
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

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 30 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

// Start the game when the page loads
startGame();