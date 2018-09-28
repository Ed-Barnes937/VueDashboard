<template>
    <v-card color="#d4d4d6">
        <v-layout row>
            <v-flex xs6>
                <v-card-title primary-title class="pa-0">
                    <div>
                        <div class="headline">Team</div>
                        <div>Team vs Team</div>
                        <div>match betting</div>
                    </div>
                </v-card-title>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
                <span><b>6/4</b></span>
                <v-text-field
                        placeholder="0.00"
                        type="number"
                        prefix="£"
                        solo flat
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
	export default {
		name: "BetslipEntry"
	}
</script>

<style scoped>

</style>