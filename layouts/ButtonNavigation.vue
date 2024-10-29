<template>
  <div>
    <button-nav
      :items="[
        {
          title: 'Inicio',
          route: '',
          icon: 'mdi-home-outline',
          active: true,
        },
        {
          title: 'Mis Eventos',
          route: '/my-events',
          icon: 'mdi-calendar-blank-multiple',
        },
        {
          title: 'Pagos',
          route: '/my-payments',
          icon: 'mdi-credit-card-outline',
        },
        {
          title: 'Mi Perfil',
          route: '/my-profile',
          icon: 'mdi-account-circle',
        },
        {
          title: 'Admin',
          route: '/users',
          icon: 'mdi-account-circle',
        },
      ]"
    />
  </div>
</template>
