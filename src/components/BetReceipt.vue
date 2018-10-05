<template>
    <v-container fluid pa-0>
        <v-card>
            <v-toolbar color="red" dark>
                <v-toolbar-title>Labrokes</v-toolbar-title>
                <v-spacer/>
                jacksrptest123<br>£312.07
            </v-toolbar>
            <v-divider light/>
            <v-flex><h3>Bet Receipt - Single </h3></v-flex>

            <v-divider light/>
            <v-card color="#d4d4d6">
                <v-layout row>
                    <v-flex xs6>
                        <v-card-title primary-title class="pa-0">
                            <div>
                                <div class="headline">{{betList.betName}}</div>
                                <div class="eventName">{{betList.name}}</div>
                                <div class="eventName">{{betList.betType}}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs6>
                        <v-layout column fill-height text-xs-center>
                            <v-flex>
                                <span><b>{{betList.odds}}</b></span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card>

            <v-divider light/>
            <v-layout column>
                <v-layout row pa-1>
                    <v-flex xs6 pa-0 text-xs-left><div>Receipt ID</div></v-flex>
                    <v-flex xs6 pa-0 text-xs-right><div>{{betList.receiptID}}</div></v-flex>
                </v-layout>
                <v-layout row pa-1>
                    <v-flex xs6 pa-0 text-xs-left><div>Time Bet Placed</div></v-flex>
                    <v-flex xs6 pa-0 text-xs-right><div>{{betList.betDate}}</div></v-flex>
                </v-layout>
                <v-layout row pa-1>
                    <v-flex xs6 pa-0 text-xs-left><div>Bet Type</div></v-flex>
                    <v-flex xs6 pa-0 text-xs-right><div>{{betList.betType}}</div></v-flex>
                </v-layout>
                <v-layout row pa-1>
                    <v-flex xs6 pa-0 text-xs-left><div>Total Stake</div></v-flex>
                    <v-flex xs6 pa-0 text-xs-right><div>{{betList.stake}}</div></v-flex>
                </v-layout>
                <v-layout row pa-1>
                    <v-flex xs6 pa-0 text-xs-left><div>Potential Returns</div></v-flex>
                    <v-flex xs6 pa-0 text-xs-right><div>{{betList.potentialPayout}}</div></v-flex>
                </v-layout>
            </v-layout>
            <v-divider light/>
            <v-card-actions class="justify-center">
                <v-btn color="success" large @click.stop="Accept">Done</v-btn>
            </v-card-actions>
            <!--compliance info-->
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
    </v-container>
</template>

<script>
	export default {
		name: "BetReceipt",
        data() {
			return {
				compliance: require('../assets/compliance.png')
			}
        },
        computed: {
			betList() {
				return this.$store.state.betslip[0] || {
					receiptID: 0,
                    betData: "",
                    betType: "match betting",
                    betStake: 0.05,
                    potentialPayout: 0.28
                }
            }
        },
        methods: {
			Accept() {
				this.$store.commit('clearBets')
            }
        }
	}
</script>

<style scoped>

</style>