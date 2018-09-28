<template>
    <v-container fluid pa-0>
        <v-card>
            <v-toolbar color="red" dark>
                <v-toolbar-title>Labrokes</v-toolbar-title>
                <v-spacer/>
                Betslip
            </v-toolbar>
            <v-divider light/>
            <BetEntry></BetEntry>
            <v-divider/>
            <BetEntry></BetEntry>
            <v-divider light/>
            <div>Total Stakes: £0.00</div>
            <div>Potential return: £0.00</div>
            <v-card-actions class="justify-center">
                <v-btn color="success" large>Place Bet</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import BetEntry from '../components/BetslipEntry'

	export default {
		name: "BetSlip",
        components: {
			BetEntry
        },
        computed: {

        },
        methods: {

        }
	}
</script>

<style scoped>

</style>