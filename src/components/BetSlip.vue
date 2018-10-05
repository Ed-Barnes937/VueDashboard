<template>
    <v-container fluid pa-0>
        <v-card>
            <v-toolbar color="red" dark>
                <v-toolbar-title>Labrokes</v-toolbar-title>
                <v-spacer/>
                jacksrptest123<br>£312.07
            </v-toolbar>
            <v-divider light/>
            <BetEntry v-for="(bet, i) in betList" :key="i"
                :id="bet.storeID" :BetName="bet.betName" :EventName="bet.name" :BettingType="bet.betType" :Odds="bet.odds"
            />
            <v-divider/>
            <v-divider light/>
            <v-layout column>
                <v-flex>
                    <div>Total Stakes: £{{totalStake}}</div>
                </v-flex>
                <v-flex>
                    <div><strong>Potential return: £0.00</strong></div>
                </v-flex>
            </v-layout>
            <v-divider/>
            <v-card-actions class="justify-center">
                <v-btn color="success" large @click.stop="placeBet">Place Bet</v-btn>
            </v-card-actions>
            <v-layout column text-xs-center style="font-size: 12px;" px-2>
                <v-flex pa-0 py-1 pt-3>
                    <div>Bets are accepted in accordance with the operator's <a href="">rules</a></div>
                </v-flex>
                <v-flex pa-0 py-1>
                    <div>Ladbrokes is licensed in the UK (<a href="">number-000-001611-R-319348-007</a>) and Gibraltar (<a href="">RGL Nos, 010 & 012</a>) full details <a href="">here</a></div>
                </v-flex>
                <v-flex pa-0 py-1>
                    <div>Registered office - Suites 6-8, 5th Floor, Europort, Gibraltar</div>
                </v-flex>
                <v-flex pa-0 py-1>
                    <v-img :src="compliance"></v-img>
                </v-flex>
                <v-flex pa-0 py-1>
                    <div>Underage gambling is an offence</div>
                </v-flex>
            </v-layout>
        </v-card>
        <v-snackbar
            v-model="snackbar"
            top success>
            {{text}}
            <v-btn flat @click.stop="snackbar = false">close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import BetEntry from '../components/BetslipEntry'
    import axios from 'axios'

	export default {
		name: "BetSlip",
        components: {
			BetEntry
        },
        data() {
			return {
				snackbar: false,
                compliance: require('../assets/compliance.png')
            }
        },
        computed: {
			betList() {
				return this.$store.state.betslip
            },
            totalStake() {
				return this.$store.getters.getStakeTotal
            },
            text(){
				return 'Bet '+ this.betReceipt.receiptID + ' placed with potential return of: £'+this.betReceipt.potentialReturn
            },
            betReceipt() {return this.$store.getters.getReceipt},
            betToken() {return this.$store.getters.getToken || ""}
        },
        methods: {
			placeBet() {
				let test = false;
				let mockData = {
					singleBet: {
						acceptanceStatus: "Success",
						betKey: 1750100704,
						betNo: 1,
						betPlacedDateTime: "2018-10-04T09:09:02Z",
						betReceipt: "O/154524014/0001619",
						currencyCode: "GBP",
						denPrice: 5,
						ipAddress: "31.24.216.3",
						isEachWay: false,
        				numLines: 1,
		        		numPrice: 16,
				        potentialPayout: 0.21,
				        selectionKey: 774849067,
				        totalBetStake: 0.05
                    }
				}
				if (!test) {
					axios.post("http://dashboard.catena.media:5000/bets", this.$store.getters.getBets, {headers: {'X-ACCESS-TOKEN': "Bearer " + this.betToken}})
						.then(response => {
							let betData = response.data.data.items[0].betslip.singleBet
							let payload = {
								receiptID: betData.betReceipt,
								potentialPayout: betData.potentialPayout,
								betDate: betData.betPlacedDateTime.substring(0,10)
							}
							this.$store.commit('setreceiptData', payload)
                            this.snackbar = true
							this.$store.commit('makeBetDone')
						})
						.catch(e => {
							console.log(e)
						})
				}
				else {
					let payload = {
						receiptID: mockData.singleBet.betReceipt,
                        potentialPayout: mockData.singleBet.potentialPayout,
                        betDate: mockData.singleBet.betPlacedDateTime
                    }
                    this.snackbar = true;
					this.$store.commit('setreceiptData', payload)
					this.$store.commit('makeBetDone')
                }
            }
        },
	}
</script>

<style scoped>

</style>