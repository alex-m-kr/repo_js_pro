Vue.component('products', {
   props: ['products', 'img'],
   template: `<div class="card">
                <product v-for="item of products" 
                :key="item.id_product" 
                :img="img"
                :product="item"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="card_el">
                <img :src="img" class="card__img" alt="Some img">
                <h4 class="head4">{{product.product_name}}</h4>
                <p class="text">{{product.price}}</p>                    
                <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                
            </div>
    `
});