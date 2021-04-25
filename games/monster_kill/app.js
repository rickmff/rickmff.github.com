new Vue({
	el: '#app',
	data: {
		running: false,
		lifePlayer: 100,
		lifeMonster: 100,
		countAttack: 5,
		countSpecial: 5,
		countHeal: 5,
		logs: [],
		starMonster: 1,
		level: "nivel 1",
		congratulations: false
	},
	computed: {
		hasResult() {
			if (this.countAttack == 0 && this.countSpecial == 0 && this.lifeMonster > 0) {
				this.lifePlayer = 0
			}
			return this.lifePlayer == 0 || this.lifeMonster == 0
		}

	},
	methods: {
		start() {

			if (this.starMonster == 1) {
				this.lifePlayer = 100
				this.lifeMonster = 100
				this.countAttack = 12
				this.countHeal = 7
				this.countSpecial = 7
				this.logs = []
				return this.running = true
			}
			else if (this.starMonster == 2) {
				this.lifePlayer = 100
				this.lifeMonster = 100
				this.countAttack = 7
				this.countHeal = 5
				this.countSpecial = 5
				this.logs = []
				return this.running = true
			}
			else if (this.starMonster == 3) {
				this.lifePlayer = 100
				this.lifeMonster = 100
				this.countAttack = 8
				this.countHeal = 3
				this.countSpecial = 3
				this.logs = []
				return this.running = true
			}
		},

		healAndDamage() {
			if (this.countHeal > 0 && this.lifePlayer > 0 && this.lifeMonster > 0) {
				this.heal(10, 15)
				this.countHeal = this.countHeal - 1
				console.log(this.countHeal)
			}
			if (this.lifePlayer > 0 && this.lifeMonster > 0) {
				this.damage('lifePlayer', 7, 12, false, 'Monstro', 'Herói', 'monster')
			}
		},

		heal(min, max) {
			const heal = this.getRandom(min, max)
			this.lifePlayer = Math.min(this.lifePlayer + heal, 100)
			this.registerLog(`Herói recuperou ${heal} de vida.`, 'heal')
		},

		attack(special) {
			if (this.lifePlayer > 0 && this.lifeMonster > 0) {
				if (this.countSpecial > 0 && special == true) {
					this.damage('lifeMonster', 5, 10, special, 'Herói', 'Monstro', 'special')
					this.countSpecial = this.countSpecial - 1
				}
				else if (special == true) {
					this.damage('lifeMonster', 0, 0, false, 'Herói', 'Monstro', 'attack')
				}
				else if (this.countAttack > 0) {
					this.damage('lifeMonster', 5, 10, false, 'Herói', 'Monstro', 'attack')
					this.countAttack = this.countAttack - 1
				}
				if (this.lifeMonster > 0) {
					this.damage('lifePlayer', 7, 12, false, 'Monstro', 'Herói', 'monster')
				}
			}
		},

		damage(prop, min, max, special, source, target, classe) {
			const plus = special ? 5 : 0
			const damage = this.getRandom(min + plus, max + plus)
			this[prop] = Math.max(this[prop] - damage, 0)
			this.registerLog(`${source} atacou o ${target} com ${damage}.`, classe)
		},

		getRandom(min, max) {
			const value = Math.random() * (max - min) + min
			return Math.round(value)
		},

		registerLog(text, classe) {
			this.logs.unshift({ text, classe })
		},

		giveUp() {
			return this.running = false
		},
	},
	watch: {
		hasResult(value) {
			if (value) {
				setTimeout(() => {

					if (this.lifeMonster == 0 && this.starMonster == 1) {
						this.starMonster = 2
						this.level = "nivel 2"
					}
					else if (this.lifeMonster == 0 && this.starMonster == 2) {
						this.starMonster = 3
						this.level = "nivel 3"
					}
					else if (this.lifePlayer == 0) {
						this.starMonster = 1
						this.level = "novamente"
					}
					else if (this.lifeMonster == 0 && this.starMonster == 3) {
						this.congratulations = true
						this.level = "novamente"
					}
					this.running = false
				}, 1000)
			}
		}
	}
})
