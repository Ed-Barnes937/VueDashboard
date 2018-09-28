<template>
    <v-layout row wrap>
        <v-flex md10>
            <v-card v-for="(event, i) in eventList" key="i" class="mb-2">
                <v-card-text :class="['pa-0']">
                    <v-toolbar card dark dense class="eventBar">
                        <v-toolbar-title v-html="event.name"/>
                        <v-spacer/>
                        <v-btn>1</v-btn>
                        <v-btn>x</v-btn>
                        <v-btn>2</v-btn>
                    </v-toolbar>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex md2>
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
				eventList: [],
				errors: []
			}
		},
		name: "betslip-test",

		//fetch events when created
		created() {
			axios.get('http://sports-events-ms-stg.catena.media/events')
				.then(response => {
					console.log(response.data.data.items)
					//json responses parsed
					this.eventList = response.data.data.items
				})
				.catch( e => {
					this.errors.push(e)
				})
		}
	}
</script>

<style scoped>

</style>