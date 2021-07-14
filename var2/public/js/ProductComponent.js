Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
            // imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgProduct = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="card_el">
                <img :src="img" alt="Some img" class="card__img">
                
                    <h4 class="head4">{{product.product_name}}</h4>
                    <p class="text">{{product.price}}</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                
            </div>
    `
})