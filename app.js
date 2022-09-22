Vue.component('product-item', {
    props: {
        "product": Object,
        required: true
    },
    template: `
        <div id="product">
            <h3>{{ product.name }} <rate-item :rate="product.rate"></rate-item></h3>
            <img :src="product.img" alt="image du produit">
            <p> {{ product.description}} </p>
            <div id="price"> {{ product.price }} € </div>
        </div>
    `
})

Vue.component('rate-item', {
    props: {
        "rate": Number,
    },
    data() {
        return {
            imgHTML: "<img class='star' src='https://img.icons8.com/fluency/48/000000/star.png'>",
        }
    },
    computed: {
        html: function() {
            let html = ""
            for (let i = 0; i < this.rate; i++) {
                html += this.imgHTML
            }
            return html
        }
    },
    template: `<div v-html="html"></div>`,
})

let app = new Vue({
    el: "#app",
    data: {
        "products": []
    },
    created: function () {
        fetch("http://127.0.0.1:5500/products.json")
            .then(response => response.json())
            .then(data => {
                this.products = data
                console.log(this.products)
            })
            .catch(error => { throw error })
    }
})