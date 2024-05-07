class Ability {

    coin_flip() {
        let flip = (Math.floor(Math.random() * 2) == 0);
        let coin;
        if (flip) {
            coin = "heads"

        } else {
            coin = "tails"
        }
        return coin;
    }

    poisoned(targetPkmon) {
        return this.poisoned(targetPkmon)
    }

    paralyzed(targetPkmon) {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            targetPkmon.state = 'Paralyzed';
            return
        } else {
            return "Ability Failed"
        }
    }

    confused(targetPkmon) {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            targetPkmon.state = 'Confused';
            return
        } else {
            return "Ability Failed"
        }
    }

    asleep(targetPkmon) {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            targetPkmon.state = 'Asleep';
            return
        } else {
            return "Ability Failed"
        }
    }

    damage_swap(currentPkmon, newPkmon) {
        if (newPkmon.hp > 10) {
            currentPkmon.hp += 10;
            newPkmon.hp -= 10;
            return
        } else {
            return "Cannot use ability; Pokemons health is to low"
        }
    }

    confuse_ray(targetPkmon) {
        return this.confused(targetPkmon);
    }

    rain_dance(currentPkmon, newPkmon) {
        if (currentPkmon.state != "asleep" && currentPkmon.state != "confused" && currentPkmon.state != "paralyzed") {
            newPkmon.waterEnergy += 1;
            return
        } else {
            return "Cannot use this ability."
        }
    }

    hydro_pump(currentPkmon) {
        if (currentPkmon.waterEnergy > 3) {
            let bonus = currentPkmon.waterEnergy - 3;
            let damage = bonus * 10;
            return damage;
        } else {
            return 0;
        }
    }

    scrunch() {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            return { preventDamage: true, preventEffects: false, turns: 1 }
        }
        return
    }

    energy_burn(currentPkmon) {
        if (currentPkmon.state != "asleep" && currentPkmon.state != "confused" && currentPkmon.state != "paralyzed") {
            currentPkmon.fireEnergy += currentPkmon.colorlessEnergy;
            currentPkmon.fireEnergy += currentPkmon.waterEnergy;
            currentPkmon.fireEnergy += currentPkmon.psychicEnergy;
            currentPkmon.fireEnergy += currentPkmon.lightningEnergy;
            currentPkmon.fireEnergy += currentPkmon.grassEnergy;
            currentPkmon.fireEnergy += currentPkmon.fightingEnergy;
            //TODO: change back after turn ends
            return
        } else {
            return "Cannot use this ability."
        }
    }

    fire_spin(currentPkmon) {
        currentPkmon.fireEnergy -= 2;
        return
    }

    sing(targetPkmon) {
        return this.asleep(targetPkmon);
    }

    metronome(currentPkmon, targetPkmon) {
        currentPkmon.attacks.push(targetPkmon.attacks);
        currentPkmon.attacks.forEach(() => {
            for (let i = 0; i < this.cost.length; i++) {
                this.cost[i] = "Colorless";
            }
        })
        return
    }

    bubblebeam(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    strikes_back(targetPkmon) {
        if (currentPkmon.state != "asleep" && currentPkmon.state != "confused" && currentPkmon.state != "paralyzed") {
            targetPkmon.hp -= 10;
        }
        return
    }

    thunder_wave(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    selfdestruct(currentPkmon, targetPkmon) {
        currentPkmon.hp -= 80;
        targetPkmon.forEach(() => {
            this.hp -= 20;
        })
        return
    }

    psychic(targetPkmon) {
        let damage = 0;
        let mult = targetPkmon.energy.total;
        damage = mult * 10;
        return damage;
    }

    barrier(currentPkmon) {
        currentPkmon.psychicEnergy -= 1;
        return { preventDamage: true, preventEffects: true, turns: 1 }
    }

    thrash(currentPkmon, targetPkmon) {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            targetPkmon.hp -= 10;
            return
        } else {
            currentPkmon.hp -= 10;
            return
        }
    }

    toxic(targetPkmon) {
        targetPkmon.state = 'posioned';
        return
    }

    lure(benchPkmon, targetPkmon) {
        // TODO: If your opponent has any Benched Pokémon, choose 1 of them and switch it with his or her Active Pokémon.
        return
    }

    fire_blast(currentPkmon) {
        currentPkmon.fireEnergy -= 1;
        return
    }

    water_gun(currentPkmon) {
        let bonus = currentPkmon.waterEnergy.length - 3;
        let damage = bonus * 10;
        return damage;
    }

    whirlpool(targetPkmon, energyType) {
        if (targetPkmon.energy >= 0) {
            switch (energyType) {
                case 'Fire':
                    targetPkmon.fireEnergy -= 1;
                    break;
                case 'Water':
                    targetPkmon.waterEnergy -= 1;
                    break;
                case 'Grass':
                    targetPkmon.grassEnergy -= 1;
                    break;
                case 'Lightning':
                    targetPkmon.lightningEnergy -= 1;
                    break;
                case 'Fighting':
                    targetPkmon.fightingEnergy -= 1;
                    break;
                case 'Psychic':
                    targetPkmon.psychicEnergy -= 1;
                    break;
                case 'Colorless':
                    targetPkmon.colorlessEnergy -= 1;
                    break;
            }
        }

        return
    }

    agility(currentPkmon) {
        let flip = this.coin_flip();
        if (flip == 'heads') return currentPkmon.state = { preventDamage: true, preventEffects: true, turns: 1 }

        return
    }

    thunder(currentPkmon) {
        let flip = this.coin_flip();
        if (flip == 'heads') currentPkmon.hp -= 30;

        return
    }

    thunderbolt(currentPkmon) {
        currentPkmon.energy = 0
        return
    }

    twineedle() {
        let mult = 0;
        for (let i = 0; i < 2; i++) {
            let flip = this.coin_flip();
            if (flip == 'heads') {
                mult++;
            }
        }
        let damage = 30 * mult;
        return damage
    }

    poison_sting(targetPkmon) {
        return this.poisoned(targetPkmon);
    }

    slam() {
        let mult = 0;
        for (let i = 0; i < 2; i++) {
            let flip = this.coin_flip();
            if (flip == 'heads') {
                mult++;
            }
        }
        let damage = 30 * mult;
        return damage
    }

    hyper_beam(targetPkmon) {
        if (targetPkmon.energy >= 0) {
            switch (energyType) {
                case 'Fire':
                    targetPkmon.fireEnergy -= 1;
                    break;
                case 'Water':
                    targetPkmon.waterEnergy -= 1;
                    break;
                case 'Grass':
                    targetPkmon.grassEnergy -= 1;
                    break;
                case 'Lightning':
                    targetPkmon.lightningEnergy -= 1;
                    break;
                case 'Fighting':
                    targetPkmon.fightingEnergy -= 1;
                    break;
                case 'Psychic':
                    targetPkmon.psychicEnergy -= 1;
                    break;
                case 'Colorless':
                    targetPkmon.colorlessEnergy -= 1;
                    break;
            }
        }

        return
    }

    earthquake(targetPkmon) {
        targetPkmon.forEach(() => {
            this.hp -= 10
        })
        return
    }

    thundershock(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    thunderpunch(currentPkmon, targetPkmon) {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            targetPkmon.hp -= 10;
            return
        } else {
            currentPkmon.hp -= 10;
            return
        }
    }

    buzzap(currentPkmon, targetPkmon) {
        currentPkmon.hp = 0;
        targetPkmon.energy += 1
    }

    electric_shock(currentPkmon) {
        let flip = this.coin_flip();
        if (flip == 'tails') {
            currentPkmon.hp -= 10;
        }
        return
    }

    whirlwind() {
        // TODO: If your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. (Do the damage before switching the Pokémon.)

        return
    }

    mirror_move() {
        // TODO: If Pidgeotto was attacked last turn, do the final result of that attack on Pidgeotto to the Defending Pokémon.

        return
    }

    flamethrower(currentPkmon) {
        currentPkmon.fireEnergy -= 1;
        return
    }

    take_down(currentPkmon) {
        currentPkmon.hp -= 30;
        return
    }

    ice_beam(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    leek_slap(currentPkmon) {
        let flip = this.coin_flip();
        let damage = 30;
        if (flip == 'tails') {
            damage = 0;
        } else {
            currentPkmon.attacks.forEach(() => {
                if (this.name == 'Leek Slap') this.empty();
            })
        }

        return damage;
    }

    hypnosis(targetPkmon) {
        targetPkmon.state = 'Asleep';
        return
    }

    dream_eater(targetPkmon) {
        if (targetPkmon.state == 'Asleep') {
            return true;
        } else {
            return false;
        }
    }

    poisonpowder(targetPkmon) {
        targetPkmon.state = 'Poisoned';
        return
    }

    doubleslap() {
        let mult = 0;
        for (let i = 0; i < 2; i++) {
            let flip = this.coin_flip();
            if (flip == 'heads') {
                mult++;
            }
        }
        let damage = 10 * mult;
        return damage
    }

    meditate(targetPkmon) {
        let damage = 0;
        let mult = targetPkmon.damageCounter
        damage = 10 * mult;
        return damage;
    }

    recover(currentPkmon) {
        currentPkmon.psychicEnergy -= 1;
        currentPkmon.hp += (currentPkmon.damageCounter * 10);
        currentPkmon.damageCounter = 0
        return
    }

    stiffen() {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            return { preventDamage: true, preventEffects: false, turns: 1 }
        }
        return
    }

    karate_chop(currentPkmon) {
        let mult = currentPkmon.damageCounter;
        let damage = -10 * mult;
        return
    }

    submission(currentPkmon) {
        currentPkmon.hp -= 20;
        return
    }

    flail(currentPkmon) {
        let mult = currentPkmon.damageCounter;
        let damage = 10 * mult;
        return damage;
    }

    double_kick() {
        let mult = 0;
        for (let i = 0; i < 2; i++) {
            let flip = this.coin_flip();
            if (flip == 'heads') {
                mult++;
            }
        }
        let damage = 30 * mult;
        return damage
    }

    amnesia(targetPkmon) {
        // TODO: Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn.

        return
    }

    conversion_1(targetPkmon) {
        // TODO: If the Defending Pokémon has a Weakness, you may change it to a type of your choice other than Colorless.

        return
    }

    conversion_2(targetPkmon) {
        // TODO: Change Porygon's Resistance to a type of your choice other than Colorless.

        return
    }

    super_fang(targetPkmon) {
        let damage = Math.ceil((targetPkmon.hp / 2) / 10) * 10;

        return damage;
    }

    withdraw() {
        let flip = this.coin_flip();
        if (flip === 'heads') {
            return { preventDamage: true, preventEffects: false, turns: 1 }
        }
        return
    }

    psyshock(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    leech_seed(currentPkmon) {
        currentPkmon.damageCounter -= 1;
        return
    }

    string_shot(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    ember(currentPkmon) {
        currentPkmon.fireEnergy -= 1;
    }

    fury_attack() {
        let mult = 0;
        for (let i = 0; i < 2; i++) {
            let flip = this.coin_flip();
            if (flip == 'heads') {
                mult++;
            }
        }
        let damage = 10 * mult;
        return damage
    }

    sleeping_gas(targetPkmon) {
        return this.asleep(targetPkmon);
    }

    destiny_bond(currentPkmon) {
        currentPkmon.psychicEnergy -= 1;
        // If a Pokémon Knocks Out Gastly during your opponent's next turn, Knock Out that Pokémon.
        return
    }

    foul_gas(targetPkmon) {
        let flip = this.coin_flip();
        if (flip == 'heads') {
            targetPkmon.state = 'Poisoned'
        } else {
            targetPkmon.state = 'Confused'
        }

        return
    }

    stun_spore(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    horn_hazard() {
        let flip = this.coin_flip();
        if (flip == 'tails') {
            let damage = 0;
            return damage;
        }

        return
    }

    harden() {
        // TODO: During your opponent's next turn, whenever 30 or less damage is done to Onix (after applying Weakness and Resistance), prevent that damage. (Any other effects of attacks still happen.)

        return
    }

    thunder_jolt(currentPkmon) {
        let flip = this.coin_flip();
        if (flip == 'tails') {
            currentPkmon.hp -= 10;
        }

        return
    }

    sand_attack() {
        // TODO: If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing.

        return
    }

    bubble(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    star_freeze(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }

    bind(targetPkmon) {
        return this.paralyzed(targetPkmon);
    }
}

module.exports = new Ability();