<template>
    <v-container fluid pa-0>
        <v-card>
            <v-toolbar color="red" dark>
                <v-toolbar-title>Labrokes</v-toolbar-title>
                <v-spacer/>
                Betslip
            </v-toolbar>
            <v-divider light/>
            <!--<BetEntry BetName="Liverpool" EventName="Chelsea v Man Utd" BettingType="match betting" Odds="6/4"></BetEntry>-->
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
                betReceipt: 0,
                returnAmount: 0,
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
				return 'Bet '+ this.betReceipt + ' placed with potential return of: £'+this.returnAmount
            }
        },
        methods: {
			placeBet() {
				let me = this
                let token = "a2V0L1hGY1NOV3ZSOElQRlNiTUd6b3dSRGRLSUphY0pVKzlFZWVRd3E0eUVhNFJ1UzVOWmZFVTNzS3ZDRUlUd1FrMVBDL1hFemcxcQ0KNzJ3TFdyUTBPV2daalo3UEdITkQ4UGpIeGY1Ry9JanR6a0MwZlIybDVvWlZYVGs3V01zdjNEOWpOVERPS2ZQbVJINW10Q21oeUZmdw0KVi9jTjl0ZmRsSGU0QTd4SzM4OE54VERlL3Vka01YeTJnRzlSY0tDSmkvM2sycnNuL0ttbVZBRzFVWXpobzYyMGMydGhobHNVNnBPMQ0KNkFCdjY2a2Z0YWpQN2hFQ1R3eThLM0x2V0xiVEJCWnpXU3gwQUpDdmJUSWt0aFhLNlV1L0pHN1h0djNoL3IrQWhBUEpFTG0xeGg2Sg0KOUdZZTVhN0ViZWRXSHlVYk9xempkRDR5ZEJ5Z0pNeHRwMmgwcjBCYnNzYTgyWGNsTkRaL25Rb1lYUlVHdHh0WHNNTnFSVlMvZEY4Ng0KVG1NVWlDT0tWTHJaa01ab2QzT05SZXZEM1ljSmFTS3BlN2YzWG9jTEVpeERJODYyNmhXK1QwU0tNVHJWWnBJZkFQNW4"
				axios.defaults.headers.common['Authorization'] = "Bearer " + token
				axios.post("http://dashboard.catena.media:5000/bets", me.$store.getters.getBets)
                    .then(response => {
                    	console.log(response.data.data.items[0].betslip.singleBet.potentialPayout)
                        this.betReceipt = response.data.data.items[0].betslip.singleBet.betReceipt
                        this.returnAmount = response.data.data.items[0].betslip.singleBet.potentialPayout
                        this.snackbar = true
                    })
                    .catch(e => {
                    	console.log(e)
                    })
            }
        }
	}
</script>

<style scoped>

</style>