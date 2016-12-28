new Vue({
    el: '#desktop',
    data: {
        now: '',
        date: moment().format("ddd D MMM h:mm A"),
    },
/*ready: function() {
    this.now = moment().format("ddd D MMM h:mm:ss A");
},
computed: {
    currentTimeStamp: function() {
        return this.now;
    }
}*/
});