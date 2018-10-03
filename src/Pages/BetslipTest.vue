<template>
    <v-layout row wrap>
        <v-flex xs9>
            <v-card>
                <v-card-text :class="['pa-0']">
                    <v-toolbar card dense dark>
                        <v-toolbar-title>Event List</v-toolbar-title>
                        <v-spacer/>
                        <v-btn color="#909293">1</v-btn>
                        <v-btn color="#909293">X</v-btn>
                        <v-btn color="#909293">2</v-btn>
                    </v-toolbar>
                </v-card-text>
            </v-card>
            <v-card v-for="(event, i) in eventList" :key="i" class="mb-2">
                <v-card-text :class="['pa-0']">
                    <v-toolbar card dark dense class="eventBar">
                        <v-toolbar-title v-html="event.name"/>
                        <v-spacer/>
                        <v-btn @click.stop="addBet(event,homeOdds,'home')" ripple>{{homeOdds}}</v-btn>
                        <v-btn @click.stop="addBet(event,drawOdds,'draw')" ripple>{{drawOdds}}</v-btn>
                        <v-btn @click.stop="addBet(event,awayOdds,'away')" ripple>{{awayOdds}}</v-btn>
                    </v-toolbar>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs3>
            <bet-slip>

            </bet-slip>
        </v-flex>
    </v-layout>
</template>

<script>
	import axios from 'axios';
	import BetSlip from "../components/BetSlip"

	export default {
		components: {
			BetSlip
        },
		data() {
			return {
				eventList: [{
					name: "Man Utd V Newcastle",
                    home: "Man Utd",
                    away: "Newcastle",
                    draw: "Draw"
				}],
                oddsList: [],
				errors: []
			}
		},
		name: "betslip-test",

		//fetch events when created
		created() {
			// axios.get('http://sports-events-ms-stg.catena.media/events')
			// 	.then(response => {
			// 		//json responses parsed
			// 		this.eventList = response.data.data.items
            //         console.log(this.eventList)
			// 	})
			// 	.catch( e => {
			// 		this.errors.push(e)
			// 	})
            axios.get('http://localhost:5000/events/227491812')
                .then(response => {
                	this.oddsList = response.data.data.items[0].event.markets.market.filter(function(market){
						return market.marketKey === 361859299
					})[0].selections.selection
                })
		},
        computed: {
		    count() {
		    	return this.$store.state.count
            },
            homeOdds() {
		    	if (this.oddsList.length != 0) {
					return this.oddsList[2].currentPrice.numPrice + "/" + this.oddsList[2].currentPrice.denPrice
				}else{
		    		return "0/0"
                }
            },
            awayOdds() {
				if (this.oddsList.length != 0) {
					return this.oddsList[1].currentPrice.numPrice + "/" + this.oddsList[1].currentPrice.denPrice
				}else{
					return "0/0"
                }
			},
            drawOdds() {
				if (this.oddsList.length != 0) {
					return this.oddsList[0].currentPrice.numPrice + "/" + this.oddsList[0].currentPrice.denPrice
				}else{
					return "0/0"
                }
			}
        },
        methods: {
			addBet(event,odds,type) {
				let betNum = (type === "home") ? 2 : (type==="away" ? 1 : 0)
                betNum += 774849067
				let bet = {
					storeID: this.count,
                    name: event.name,
                    betName: event[type],
                    betType: "match betting",
                    odds: odds,
                    selectionID: betNum,
                    stake: 0
                }
				this.$store.commit('addBet', bet)
                this.$store.commit('increment')
            },
        }
	}
</script>

<style scoped>

</style>