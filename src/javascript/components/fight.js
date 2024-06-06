import controls from '../../constants/controls';
import { arrayHasAllElementsOfArr, canCriticalHit, isEqualKeys, throttle } from '../helpers/utils';

export function getHitPower(fighter, critical) {
    // return hit power
    if (critical) {
        return fighter.attack * 2;
    }
    return fighter.attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
    // return block power
    return fighter.defense * (Math.random() + 1);
}

export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const healthBarsContainer = document.getElementsByClassName('arena___health-bar');
        const healthBars = [...healthBarsContainer];
        // const statusViewContainer = document.getElementsByClassName('arena___health-indicator');
        // const statusViews = [...statusViewContainer];
        const statusInfo = {
            block: false,
            criticalHitTime: Date.now(),
            firstCriticalHit: true
        };

        const playerOne = {
            ...firstFighter,
            ...statusInfo,
            currentHealth: firstFighter.health,
            healthBar: healthBars[0],
            // statusView: statusViews[0],
            position: 'left'
        };

        const playerTwo = {
            ...secondFighter,
            ...statusInfo,
            currentHealth: secondFighter.health,
            healthBar: healthBars[1],

            // statusView: statusViews[1],
            position: 'right'
        };

        let presedKeysComb = [];

        function onKeyDown(event) {
            if (!event.repeat) {
                switch (event.code) {
                    case controls.PlayerOneAttack: {
                        presedKeysComb.push(event.code);
                        attackRelease(playerOne, playerTwo);

                        break;
                    }

                    case controls.PlayerTwoAttack: {
                        presedKeysComb.push(event.code);
                        attackRelease(playerTwo, playerOne);

                        break;
                    }

                    case controls.PlayerOneBlock: {
                        presedKeysComb.push(event.code);
                        playerOne.block = true;

                        break;
                    }

                    case controls.PlayerTwoBlock: {
                        presedKeysComb.push(event.code);
                        playerTwo.block = true;
                        break;
                    }
                    default:
                        presedKeysComb.push(event.code);

                        break;
                }
                if (
                    arrayHasAllElementsOfArr(presedKeysComb, controls.PlayerOneCriticalHitCombination) &&
                    (playerOne.firstCriticalHit || canCriticalHit(playerOne.criticalHitTime))
                ) {
                    playerOne.firstCriticalHit = false;
                    playerOne.criticalHitTime = Date.now();
                    attackRelease(playerOne, playerTwo, true);
                }
                if (
                    arrayHasAllElementsOfArr(presedKeysComb, controls.PlayerTwoCriticalHitCombination) &&
                    (playerTwo.firstCriticalHit || canCriticalHit(playerTwo.criticalHitTime))
                ) {
                    playerTwo.firstCriticalHit = false;
                    playerTwo.criticalHitTime = Date.now();
                    attackRelease(playerTwo, playerOne, true);
                }
            }
            if (playerOne.currentHealth <= 0 || playerTwo.currentHealth <= 0) {
                document.removeEventListener('keydown', onKeyDown);
                document.removeEventListener('keyup', onKeyUp);
                resolve(playerOne.currentHealth <= 0 ? playerTwo : playerOne);
            }
        }

        function onKeyUp(event) {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    presedKeysComb = presedKeysComb.filter(keyCode => event.code !== keyCode);
                    playerOne.block = false;
                    break;
                case controls.PlayerTwoBlock:
                    presedKeysComb = presedKeysComb.filter(keyCode => event.code !== keyCode);
                    playerTwo.block = false;
                    break;
                default:
                    presedKeysComb = presedKeysComb.filter(keyCode => event.code !== keyCode);
                    break;
            }
        }

        function attackRelease(attacker, defender, critical) {
            if (defender.block && !critical) {
                return;
            }

            const damage = critical ? getHitPower(attacker, critical) : getDamage(attacker, defender);

            defender.currentHealth -= damage;

            defender.healthPercent = (defender.currentHealth / defender.health) * 100;

            defender.healthBar.style.width = defender.healthPercent > 0 ? `${defender.healthPercent}%` : '0%';
        }

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    });
}
