/*
|--------------------------------------------------------------------------
| Vue Object
|--------------------------------------------------------------------------
|
| Authors: Kamarool Karim
| Email: kamarool@coolcode.my
| Date Created: 28 December 2016
|
 */

new Vue({
    el: '#vm-date',
    data: {
        date: moment().format("ddd D MMM h:mm:ss A"),
        dateDetail: moment().format("dddd, DD MMMM YYYY")
    },

});

new Vue({
    el: '#vm-wifi',
    data: {
        wifiEnabled: true,
    },
    methods: {
        toggleWifi: function() {
            console.log('lol');
            if (this.wifiEnabled === true) {
                this.wifiEnabled = false;
            } else {
                this.wifiEnabled = true;
            }
        }
    }
});