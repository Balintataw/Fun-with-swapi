<template>
    <div>
        <!-- Navbars to nowhere!!!! -->
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Swapi</b-navbar-brand>

            <b-navbar-toggle v-if="$user && $user.isAuthenticated" target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content"><em>{{ $user.email ? $user.email : 'User' }}</em></template>
                    <b-dropdown-item href="#" @click="logout">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <router-view></router-view>

    </div>
</template>
<script>
export default {
    methods: {
        logout() {
            this.$user.logout().then((r) => {
                this.$router.replace('/auth');
            })
        }
    }
}
</script>