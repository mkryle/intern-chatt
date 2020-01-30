new Vue({

    data: {
        name: null,
        textad: null,
        currenttext: null,
        currentname: null,
    },

    created() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(result => {
                this.name = result
                let check = this.name.length
                if (check > 500) {
                    fetch('http://localhost:3000', {
                            method: 'DELETE'
                        })
                        .then(response => response.json())
                        .then(result => {
                            this.name = result
                        })
                }
            })
    },

    methods: {
        saveText() {
            let stringText = JSON.stringify(this.currenttext)
            let stringName = JSON.stringify(this.currentname)
            fetch('http://localhost:3000', {
                body: '{  "text": ' + stringText + ', "name": ' + stringName + '}',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(function (response) {
                return response.json()
            }).then(function (reasult) {
                this.name = reasult

            })
        },
    },
    el: '#app',
})