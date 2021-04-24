new Vue({
	el: '#app',
	data: {
		running: false,
		lifePlayer: 100,
		lifeMonster: 100,
		countSpecial: 2,
		countHeal: 3,
	},
	computed: {
		hasResult() {
			return this.lifePlayer == 0 || this.lifeMonster == 0
		}
	},
	methods: {
		start() {
			this.lifePlayer = 100
			this.lifeMonster = 100
			this.countHeal = 5
			this.countSpecial = 5
			return this.running = true
		},

		attack(special) {
			this.damage('lifePlayer', 7, 12, false)

			if (this.countSpecial > 0 && special == true) {
			this.damage('lifeMonster', 5, 10, special)
			this.countSpecial = this.countSpecial - 1
			} 
			else if (special == true) {
				this.damage('lifeMonster', 0, 0, false)
			} 
			else {
				this.damage('lifeMonster', 5, 10, false)
			}
		},

		damage(prop, min, max, special) {
			const plus = special ? 5 : 0
			const damage = this.getRandom(min + plus, max + plus)
			this[prop] = Math.max(this[prop] - damage, 0)
		},

		healAndDamage() {
			if (this.countHeal > 0) {
				this.heal(10, 15)
				this.countHeal = this.countHeal - 1
				console.log(this.countHeal)
			}
			this.damage('lifePlayer', 7, 12, false)
		},

		heal(min, max) {
			const heal = this.getRandom(min, max)
			this.lifePlayer = Math.min(this.lifePlayer + heal, 100)
		},

		getRandom(min, max) {
			const value = Math.random() * (max - min) + min
			return Math.round(value)
		},

		giveUp() {
			return this.running = false
		},
	},
	watch: {
		hasResult(value) {
			if (value) this.running = false
		}
	}
})
