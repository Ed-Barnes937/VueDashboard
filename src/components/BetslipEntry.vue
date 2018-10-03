<template>
    <v-card color="#d4d4d6">
        <v-layout row>
            <v-flex xs6>
                <v-card-title primary-title class="pa-0">
                    <div>
                        <div class="headline">{{BetName}}</div>
                        <div class="eventName">{{EventName}}</div>
                        <div>{{BettingType}}</div>
                    </div>
                </v-card-title>
            </v-flex>
            <v-flex xs6>
                <v-layout column fill-height align-center justify-center text-xs-center>
                    <v-flex offset-xs3>
                        <span><b>{{Odds}}</b></span>
                        <v-text-field
                                placeholder="0.00"
                                step="0.01"
                                type="number"
                                prefix="£"
                                v-model="betStake"
                                solo flat
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-btn fab dark small absolute top right @click.stop="removeBet"><v-icon>fa-times</v-icon></v-btn>
    </v-card>
</template>

<script>
	export default {
		name: "BetslipEntry",
        props: ['id','BetName', 'EventName', 'BettingType', 'Odds'],
        computed: {
			betStake: {
				get: function() {return this.$store.getters.getStake(this.id)},
                set: function(stake) {
					let betID = this.id
                    let payload = {betID, stake}
					this.$store.commit('setStake', payload)
				}
            }
        },
        methods: {
			removeBet() {
				this.$store.commit('removeBet', this.id)
                this.$store.commit('decrement')
            }
        }
	}
</script>

<style scoped>

</style>